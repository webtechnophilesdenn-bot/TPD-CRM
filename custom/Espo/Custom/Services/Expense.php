<?php

namespace Espo\Custom\Services;

use Espo\ORM\Entity;
use Espo\Core\Exceptions\BadRequest;

class Expense extends \Espo\Services\Record
{
    protected $notFilteringAttributeList = ['number'];

    protected function beforeCreateEntity(Entity $entity, $data)
    {
        parent::beforeCreateEntity($entity, $data);
        
        // Validate required fields
        if (!$entity->get('name')) {
            throw new BadRequest('Expense name is required');
        }

        // Auto-assign to current user if not set
        if (!$entity->get('assignedUserId')) {
            $entity->set('assignedUserId', $this->getUser()->getId());
        }

        // Set default status
        if (!$entity->get('status')) {
            $entity->set('status', 'Draft');
        }

        // Generate expense number
        if (!$entity->get('number')) {
            $entity->set('number', $this->generateNumber());
        }

        // Set expense date if not provided
        if (!$entity->get('expenseDate')) {
            $entity->set('expenseDate', date('Y-m-d'));
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

    protected function handleStatusChange(Entity $entity)
    {
        $newStatus = $entity->get('status');
        $oldStatus = $entity->getFetched('status');

        // When expense is submitted, notify approvers
        if ($newStatus === 'Submitted' && $oldStatus === 'Draft') {
            // Add notification logic here if needed
        }

        // When expense is approved
        if ($newStatus === 'Approved' && $oldStatus === 'Submitted') {
            // Add approval workflow logic here
        }

        // When expense is rejected
        if ($newStatus === 'Rejected') {
            // Add rejection notification logic here
        }
    }

    protected function generateNumber()
    {
        $em = $this->getEntityManager();
        
        $collection = $em->getRDBRepository('Expense')
            ->select(['number'])
            ->where([
                'number*' => 'EXP-%'
            ])
            ->order('number', 'DESC')
            ->limit(0, 1)
            ->find();
        
        $maxNum = 0;
        
        if (count($collection) > 0) {
            $lastExpense = $collection[0];
            $lastNumber = $lastExpense->get('number');
            
            if (preg_match('/EXP-(\d+)/', $lastNumber, $matches)) {
                $maxNum = intval($matches[1]);
            }
        }
        
        $nextNum = $maxNum + 1;
        
        return 'EXP-' . date('Y') . '-' . str_pad($nextNum, 5, '0', STR_PAD_LEFT);
    }

    public function approveExpense(string $id)
    {
        $expense = $this->getEntityManager()->getEntity('Expense', $id);
        
        if (!$expense) {
            throw new BadRequest('Expense not found');
        }

        if ($expense->get('status') !== 'Submitted') {
            throw new BadRequest('Only submitted expenses can be approved');
        }

        $expense->set('status', 'Approved');
        $this->getEntityManager()->saveEntity($expense);

        return $expense;
    }

    public function rejectExpense(string $id, string $reason = '')
    {
        $expense = $this->getEntityManager()->getEntity('Expense', $id);
        
        if (!$expense) {
            throw new BadRequest('Expense not found');
        }

        if ($expense->get('status') !== 'Submitted') {
            throw new BadRequest('Only submitted expenses can be rejected');
        }

        $expense->set('status', 'Rejected');
        if ($reason) {
            $currentNotes = $expense->get('notes') ?? '';
            $expense->set('notes', $currentNotes . "\n\nRejection Reason: " . $reason);
        }
        $this->getEntityManager()->saveEntity($expense);

        return $expense;
    }
}