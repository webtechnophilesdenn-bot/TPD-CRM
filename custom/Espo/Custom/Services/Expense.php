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
        
        try {
            // Validate required name field
            if (!$entity->get('name') || trim($entity->get('name')) === '') {
                throw new BadRequest('Expense name is required');
            }

            // Validate amount if provided
            $amount = $entity->get('amount');
            if ($amount !== null && $amount !== '') {
                if (!is_numeric($amount) || (float)$amount < 0) {
                    throw new BadRequest('Expense amount must be a valid positive number');
                }
                $entity->set('amount', (float)$amount);
            }

            // Auto-assign to current user
            if (!$entity->get('assignedUserId')) {
                $entity->set('assignedUserId', $this->getUser()->getId());
            }

            // Set default status
            if (!$entity->get('status')) {
                $entity->set('status', 'Draft');
            }

            // Generate expense number
            if (!$entity->get('number')) {
                try {
                    $entity->set('number', $this->generateNumber());
                } catch (\Exception $e) {
                    $GLOBALS['log']->error('Expense number generation failed: ' . $e->getMessage());
                    $entity->set('number', 'EXP-' . time());
                }
            }

            // Set expense date if not provided
            if (!$entity->get('expenseDate')) {
                $entity->set('expenseDate', date('Y-m-d'));
            }

            // Set default category
            if (!$entity->get('category')) {
                $entity->set('category', 'Other');
            }

            // Initialize boolean fields
            if ($entity->get('isBillable') === null) {
                $entity->set('isBillable', false);
            }
            if ($entity->get('isReimbursable') === null) {
                $entity->set('isReimbursable', false);
            }

        } catch (BadRequest $e) {
            throw $e;
        } catch (\Exception $e) {
            $GLOBALS['log']->error('Expense beforeCreateEntity error: ' . $e->getMessage());
            throw new BadRequest('Error creating expense: ' . $e->getMessage());
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
            $GLOBALS['log']->error('Expense beforeUpdateEntity error: ' . $e->getMessage());
            throw $e;
        }
    }

    protected function handleStatusChange(Entity $entity)
    {
        $newStatus = $entity->get('status');
        $oldStatus = $entity->getFetched('status');

        if ($newStatus === 'Submitted' && $oldStatus === 'Draft') {
            // Notification logic here
        }

        if ($newStatus === 'Approved' && $oldStatus === 'Submitted') {
            // Approval workflow logic here
        }

        if ($newStatus === 'Rejected') {
            // Rejection notification logic here
        }
    }

    protected function generateNumber()
    {
        $em = $this->getEntityManager();
        
        try {
            $collection = $em->getRDBRepository('Expense')
                ->select(['number'])
                ->where(['number*' => 'EXP-%'])
                ->order('createdAt', 'DESC')
                ->limit(0, 1)
                ->find();
            
            $maxNum = 0;
            
            if (count($collection) > 0) {
                $lastExpense = $collection[0];
                $lastNumber = $lastExpense->get('number');
                
                if ($lastNumber && preg_match('/EXP-\d{4}-(\d+)/', $lastNumber, $matches)) {
                    $maxNum = intval($matches[1]);
                }
            }
            
            $nextNum = $maxNum + 1;
            
            return 'EXP-' . date('Y') . '-' . str_pad($nextNum, 5, '0', STR_PAD_LEFT);
        } catch (\Exception $e) {
            $GLOBALS['log']->error('Error in generateNumber: ' . $e->getMessage());
            return 'EXP-' . date('Ymd') . '-' . substr(time(), -4);
        }
    }

    public function approveExpense(string $id)
    {
        try {
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
        } catch (\Exception $e) {
            $GLOBALS['log']->error('Error approving expense: ' . $e->getMessage());
            throw $e;
        }
    }

    public function rejectExpense(string $id, string $reason = '')
    {
        try {
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
        } catch (\Exception $e) {
            $GLOBALS['log']->error('Error rejecting expense: ' . $e->getMessage());
            throw $e;
        }
    }
}
