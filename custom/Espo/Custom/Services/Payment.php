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
        
        // Validate required fields
        if (!$entity->get('name')) {
            throw new BadRequest('Payment name is required');
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
            $entity->set('status', 'Pending');
        }

        // Generate payment number
        if (!$entity->get('number')) {
            $entity->set('number', $this->generateNumber());
        }

        // Set payment date if not provided
        if (!$entity->get('paymentDate')) {
            $entity->set('paymentDate', date('Y-m-d'));
        }
    }

    protected function beforeUpdateEntity(Entity $entity, $data)
    {
        parent::beforeUpdateEntity($entity, $data);
        
        // Track status changes
        if ($entity->isAttributeChanged('status')) {
            $this->handleStatusChange($entity);
        }
    }

    protected function afterCreateEntity(Entity $entity, $data)
    {
        parent::afterCreateEntity($entity, $data);
        
        // Update invoice paid amount if linked
        if ($entity->get('invoiceId') && $entity->get('status') === 'Completed') {
            $this->updateInvoicePaidAmount($entity->get('invoiceId'));
        }
    }

    protected function afterUpdateEntity(Entity $entity, $data)
    {
        parent::afterUpdateEntity($entity, $data);
        
        // Update invoice paid amount when payment status changes
        if ($entity->isAttributeChanged('status') && $entity->get('invoiceId')) {
            $this->updateInvoicePaidAmount($entity->get('invoiceId'));
        }
    }

    protected function handleStatusChange(Entity $entity)
    {
        $newStatus = $entity->get('status');
        $oldStatus = $entity->getFetched('status');

        // When payment is completed, update invoice
        if ($newStatus === 'Completed' && $oldStatus !== 'Completed') {
            if ($entity->get('invoiceId')) {
                $this->updateInvoicePaidAmount($entity->get('invoiceId'));
            }
        }

        // When payment is refunded or failed, update invoice
        if (($newStatus === 'Refunded' || $newStatus === 'Failed') && $oldStatus === 'Completed') {
            if ($entity->get('invoiceId')) {
                $this->updateInvoicePaidAmount($entity->get('invoiceId'));
            }
        }
    }

    protected function updateInvoicePaidAmount($invoiceId)
    {
        $em = $this->getEntityManager();
        $invoice = $em->getEntity('Invoice', $invoiceId);
        
        if (!$invoice) {
            return;
        }

        // Get all completed payments for this invoice
        $payments = $em->getRDBRepository('Payment')
            ->where([
                'invoiceId' => $invoiceId,
                'status' => 'Completed'
            ])
            ->find();

        $totalPaid = 0;
        foreach ($payments as $payment) {
            $totalPaid += $payment->get('amount');
        }

        $invoice->set('paidAmount', $totalPaid);
        
        // Update invoice status based on paid amount
        $amount = $invoice->get('amount') ?? 0;
        $taxAmount = $invoice->get('taxAmount') ?? 0;
        $discountAmount = $invoice->get('discountAmount') ?? 0;
        $grandTotal = $amount + $taxAmount - $discountAmount;

        if ($totalPaid >= $grandTotal) {
            $invoice->set('status', 'Paid');
        } elseif ($totalPaid > 0 && $totalPaid < $grandTotal) {
            $invoice->set('status', 'Partially Paid');
        }

        $em->saveEntity($invoice);
    }

    protected function generateNumber()
    {
        $em = $this->getEntityManager();
        
        $collection = $em->getRDBRepository('Payment')
            ->select(['number'])
            ->where([
                'number*' => 'PAY-%'
            ])
            ->order('number', 'DESC')
            ->limit(0, 1)
            ->find();
        
        $maxNum = 0;
        
        if (count($collection) > 0) {
            $lastPayment = $collection[0];
            $lastNumber = $lastPayment->get('number');
            
            if (preg_match('/PAY-(\d+)/', $lastNumber, $matches)) {
                $maxNum = intval($matches[1]);
            }
        }
        
        $nextNum = $maxNum + 1;
        
        return 'PAY-' . date('Y') . '-' . str_pad($nextNum, 5, '0', STR_PAD_LEFT);
    }
}