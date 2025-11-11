<?php

namespace Espo\Custom\Services;

use Espo\ORM\Entity;
use Espo\Core\Exceptions\BadRequest;

class Payment extends \Espo\Services\Record
{
    protected $notFilteringAttributeList = ['number'];

    protected function beforeCreateEntity(Entity $entity, $data)
    {
        parent::beforeCreateEntity($entity, $data);
        
        try {
            // Validate required name field
            if (!$entity->get('name') || trim($entity->get('name')) === '') {
                throw new BadRequest('Payment name is required');
            }

            // Make account optional - can use invoice account
            if (!$entity->get('accountId') && $entity->get('invoiceId')) {
                $invoice = $this->getEntityManager()->getEntity('Invoice', $entity->get('invoiceId'));
                if ($invoice) {
                    $entity->set('accountId', $invoice->get('accountId'));
                }
            }

            if (!$entity->get('accountId')) {
                throw new BadRequest('Account is required');
            }

            // Validate and cast amount
            $amount = $entity->get('amount');
            if ($amount !== null && $amount !== '') {
                if (!is_numeric($amount)) {
                    throw new BadRequest('Payment amount must be a valid number');
                }
                $entity->set('amount', (float)$amount);
            }

            // Auto-assign to current user
            if (!$entity->get('assignedUserId')) {
                $entity->set('assignedUserId', $this->getUser()->getId());
            }

            // Set default status
            if (!$entity->get('status')) {
                $entity->set('status', 'Pending');
            }

            // Generate payment number
            if (!$entity->get('number')) {
                try {
                    $entity->set('number', $this->generateNumber());
                } catch (\Exception $e) {
                    $GLOBALS['log']->error('Payment number generation failed: ' . $e->getMessage());
                    $entity->set('number', 'PAY-' . time());
                }
            }

            // Set payment date
            if (!$entity->get('paymentDate')) {
                $entity->set('paymentDate', date('Y-m-d'));
            }

        } catch (BadRequest $e) {
            throw $e;
        } catch (\Exception $e) {
            $GLOBALS['log']->error('Payment beforeCreateEntity error: ' . $e->getMessage());
            throw new BadRequest('Error creating payment: ' . $e->getMessage());
        }
    }

    protected function beforeUpdateEntity(Entity $entity, $data)
    {
        parent::beforeUpdateEntity($entity, $data);
        
        try {
            if ($entity->isAttributeChanged('status')) {
                $this->handleStatusChange($entity);
            }
        } catch (\Exception $e) {
            $GLOBALS['log']->error('Payment beforeUpdateEntity error: ' . $e->getMessage());
            throw $e;
        }
    }

    protected function afterCreateEntity(Entity $entity, $data)
    {
        parent::afterCreateEntity($entity, $data);
        
        try {
            if ($entity->get('invoiceId') && $entity->get('status') === 'Completed') {
                $this->updateInvoicePaidAmount($entity->get('invoiceId'));
            }
        } catch (\Exception $e) {
            $GLOBALS['log']->warning('Could not update invoice: ' . $e->getMessage());
        }
    }

    protected function afterUpdateEntity(Entity $entity, $data)
    {
        parent::afterUpdateEntity($entity, $data);
        
        try {
            if ($entity->isAttributeChanged('status') && $entity->get('invoiceId')) {
                $this->updateInvoicePaidAmount($entity->get('invoiceId'));
            }
        } catch (\Exception $e) {
            $GLOBALS['log']->warning('Could not update invoice: ' . $e->getMessage());
        }
    }

    protected function handleStatusChange(Entity $entity)
    {
        $newStatus = $entity->get('status');
        $oldStatus = $entity->getFetched('status');

        if ($newStatus === 'Completed' && $oldStatus !== 'Completed') {
            if ($entity->get('invoiceId')) {
                $this->updateInvoicePaidAmount($entity->get('invoiceId'));
            }
        }

        if (($newStatus === 'Refunded' || $newStatus === 'Failed') && $oldStatus === 'Completed') {
            if ($entity->get('invoiceId')) {
                $this->updateInvoicePaidAmount($entity->get('invoiceId'));
            }
        }
    }

    protected function updateInvoicePaidAmount($invoiceId)
    {
        try {
            $em = $this->getEntityManager();
            $invoice = $em->getEntity('Invoice', $invoiceId);
            
            if (!$invoice) {
                return;
            }

            $payments = $em->getRDBRepository('Payment')
                ->where(['invoiceId' => $invoiceId, 'status' => 'Completed'])
                ->find();

            $totalPaid = 0;
            foreach ($payments as $payment) {
                $totalPaid += (float)$payment->get('amount');
            }

            $invoice->set('paidAmount', $totalPaid);
            
            $amount = (float)($invoice->get('amount') ?? 0);
            $taxAmount = (float)($invoice->get('taxAmount') ?? 0);
            $discountAmount = (float)($invoice->get('discountAmount') ?? 0);
            $grandTotal = $amount + $taxAmount - $discountAmount;

            if ($totalPaid >= $grandTotal) {
                $invoice->set('status', 'Paid');
            } elseif ($totalPaid > 0 && $totalPaid < $grandTotal) {
                $invoice->set('status', 'Partially Paid');
            }

            $em->saveEntity($invoice);
        } catch (\Exception $e) {
            $GLOBALS['log']->error('Error updating invoice paid amount: ' . $e->getMessage());
        }
    }

    protected function generateNumber()
    {
        $em = $this->getEntityManager();
        
        try {
            $collection = $em->getRDBRepository('Payment')
                ->select(['number'])
                ->where(['number*' => 'PAY-%'])
                ->order('number', 'DESC')
                ->limit(0, 1)
                ->find();
            
            $maxNum = 0;
            
            if (count($collection) > 0) {
                $lastPayment = $collection[0];
                $lastNumber = $lastPayment->get('number');
                
                if (preg_match('/PAY-\d{4}-(\d+)/', $lastNumber, $matches)) {
                    $maxNum = intval($matches[1]);
                }
            }
            
            $nextNum = $maxNum + 1;
            
            return 'PAY-' . date('Y') . '-' . str_pad($nextNum, 5, '0', STR_PAD_LEFT);
        } catch (\Exception $e) {
            $GLOBALS['log']->error('Error generating payment number: ' . $e->getMessage());
            return 'PAY-' . date('Ymd') . '-' . substr(time(), -4);
        }
    }
}
