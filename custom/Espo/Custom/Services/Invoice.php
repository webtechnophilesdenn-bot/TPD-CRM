<?php

namespace Espo\Custom\Services;

use Espo\ORM\Entity;
use Espo\Core\Exceptions\BadRequest;

class Invoice extends \Espo\Services\Record
{
    protected $notFilteringAttributeList = ['number'];

    protected function beforeCreateEntity(Entity $entity, $data)
    {
        parent::beforeCreateEntity($entity, $data);
        
        // Validate required fields
        if (!$entity->get('name')) {
            throw new BadRequest('Invoice name is required');
        }

        if (!$entity->get('accountId')) {
            throw new BadRequest('Account is required');
        }

        // Auto-assign to current user if not set
        if (!$entity->get('assignedUserId')) {
            $entity->set('assignedUserId', $this->getUser()->getId());
        }

        // Set default status
        if (!$entity->get('status')) {
            $entity->set('status', 'Draft');
        }

        // Generate invoice number
        if (!$entity->get('number')) {
            try {
                $entity->set('number', $this->generateNumber());
            } catch (\Exception $e) {
                $GLOBALS['log']->error('Invoice number generation failed: ' . $e->getMessage());
                $entity->set('number', 'INV-' . time());
            }
        }

        // Set invoice date - ALWAYS set it if not provided
        if (!$entity->get('invoiceDate')) {
            $entity->set('invoiceDate', date('Y-m-d'));
        }

        // Calculate due date (30 days from invoice date)
        if (!$entity->get('dueDate')) {
            $invoiceDate = $entity->get('invoiceDate') ?: date('Y-m-d');
            $dueDate = date('Y-m-d', strtotime($invoiceDate . ' +30 days'));
            $entity->set('dueDate', $dueDate);
        }

        // Initialize paid amount
        if ($entity->get('paidAmount') === null) {
            $entity->set('paidAmount', 0);
        }

        // Initialize tax and discount if not set
        if ($entity->get('taxAmount') === null) {
            $entity->set('taxAmount', 0);
        }
        if ($entity->get('discountAmount') === null) {
            $entity->set('discountAmount', 0);
        }
    }

    protected function beforeUpdateEntity(Entity $entity, $data)
    {
        parent::beforeUpdateEntity($entity, $data);
        
        // Track status changes
        if ($entity->isAttributeChanged('status')) {
            $this->handleStatusChange($entity);
        }

        // Update status based on paid amount
        if ($entity->isAttributeChanged('paidAmount')) {
            $this->updateStatusByPayment($entity);
        }
    }

    protected function afterCreateEntity(Entity $entity, $data)
    {
        parent::afterCreateEntity($entity, $data);
        
        // Copy billing address from account if available
        if ($entity->get('accountId') && !$entity->get('billingAddressStreet')) {
            $this->copyAddressFromAccount($entity);
        }
    }

    protected function handleStatusChange(Entity $entity)
    {
        $newStatus = $entity->get('status');

        // Check if invoice is overdue
        if ($newStatus !== 'Paid' && $newStatus !== 'Cancelled' && $newStatus !== 'Void') {
            $dueDate = $entity->get('dueDate');
            if ($dueDate && strtotime($dueDate) < time()) {
                $entity->set('status', 'Overdue');
            }
        }
    }

    protected function updateStatusByPayment(Entity $entity)
    {
        $grandTotal = $this->calculateGrandTotal($entity);
        $paidAmount = $entity->get('paidAmount') ?? 0;

        if ($paidAmount >= $grandTotal) {
            $entity->set('status', 'Paid');
        } elseif ($paidAmount > 0 && $paidAmount < $grandTotal) {
            $entity->set('status', 'Partially Paid');
        }
    }

    protected function copyAddressFromAccount(Entity $entity)
    {
        try {
            $account = $this->getEntityManager()
                ->getEntity('Account', $entity->get('accountId'));

            if ($account) {
                $entity->set('billingAddressStreet', $account->get('billingAddressStreet'));
                $entity->set('billingAddressCity', $account->get('billingAddressCity'));
                $entity->set('billingAddressState', $account->get('billingAddressState'));
                $entity->set('billingAddressCountry', $account->get('billingAddressCountry'));
                $entity->set('billingAddressPostalCode', $account->get('billingAddressPostalCode'));
                
                $this->getEntityManager()->saveEntity($entity);
            }
        } catch (\Exception $e) {
            $GLOBALS['log']->warning('Could not copy address from account: ' . $e->getMessage());
        }
    }

    protected function generateNumber()
    {
        $em = $this->getEntityManager();
        
        try {
            $collection = $em->getRDBRepository('Invoice')
                ->select(['number'])
                ->where([
                    'number*' => 'INV-%'
                ])
                ->order('createdAt', 'DESC')
                ->limit(0, 1)
                ->find();
            
            $maxNum = 0;
            
            if (count($collection) > 0) {
                $lastInvoice = $collection[0];
                $lastNumber = $lastInvoice->get('number');
                
                if ($lastNumber && preg_match('/INV-\d{4}-(\d+)/', $lastNumber, $matches)) {
                    $maxNum = intval($matches[1]);
                }
            }
            
            $nextNum = $maxNum + 1;
            
            return 'INV-' . date('Y') . '-' . str_pad($nextNum, 5, '0', STR_PAD_LEFT);
        } catch (\Exception $e) {
            $GLOBALS['log']->error('Error in generateNumber: ' . $e->getMessage());
            return 'INV-' . date('Ymd') . '-' . substr(time(), -4);
        }
    }

    protected function calculateGrandTotal(Entity $entity)
    {
        $amount = $entity->get('amount') ?? 0;
        $taxAmount = $entity->get('taxAmount') ?? 0;
        $discountAmount = $entity->get('discountAmount') ?? 0;
        
        return $amount + $taxAmount - $discountAmount;
    }

    public function recalculatePaidAmount(string $invoiceId)
    {
        try {
            $invoice = $this->getEntityManager()->getEntity('Invoice', $invoiceId);
            
            if (!$invoice) {
                throw new BadRequest('Invoice not found');
            }

            $payments = $this->getEntityManager()
                ->getRDBRepository('Invoice')
                ->getRelation($invoice, 'payments')
                ->where([
                    'status' => 'Completed'
                ])
                ->find();

            $totalPaid = 0;
            foreach ($payments as $payment) {
                $totalPaid += $payment->get('amount');
            }

            $invoice->set('paidAmount', $totalPaid);
            $this->getEntityManager()->saveEntity($invoice);

            $this->updateStatusByPayment($invoice);
            $this->getEntityManager()->saveEntity($invoice);

            return $invoice;
        } catch (\Exception $e) {
            $GLOBALS['log']->error('Error recalculating paid amount: ' . $e->getMessage());
            throw $e;
        }
    }
}