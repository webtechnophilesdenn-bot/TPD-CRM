<?php

namespace Espo\Custom\Services;

use Espo\ORM\Entity;
use Espo\Core\Exceptions\BadRequest;
use Espo\Core\Exceptions\Forbidden;

class Ticket extends \Espo\Services\Record
{
    protected $notFilteringAttributeList = ['number'];

    protected function beforeCreateEntity(Entity $entity, $data)
    {
        parent::beforeCreateEntity($entity, $data);
        
        // Validate required fields
        if (!$entity->get('name')) {
            throw new BadRequest('Ticket subject is required');
        }

        // Auto-assign if not set
        if (!$entity->get('assignedUserId')) {
            $entity->set('assignedUserId', $this->getUser()->getId());
        }

        // Set defaults
        if (!$entity->get('status')) {
            $entity->set('status', 'New');
        }

        if (!$entity->get('priority')) {
            $entity->set('priority', 'Normal');
        }

        if (!$entity->get('type')) {
            $entity->set('type', 'Incident');
        }

        // Set source if not provided
        if (!$entity->get('source')) {
            $entity->set('source', 'Web Form');
        }

        // Calculate due date based on priority
        if (!$entity->get('dueDate')) {
            $entity->set('dueDate', $this->calculateDueDate($entity->get('priority')));
        }

        // Initialize counters
        $entity->set('reopenCount', 0);
    }

    protected function beforeUpdateEntity(Entity $entity, $data)
    {
        parent::beforeUpdateEntity($entity, $data);
        
        // Track status changes
        if ($entity->isAttributeChanged('status')) {
            $this->handleStatusChange($entity);
        }

        // Track assignment changes
        if ($entity->isAttributeChanged('assignedUserId')) {
            $this->handleAssignmentChange($entity);
        }

        // Track priority escalation
        if ($entity->isAttributeChanged('priority')) {
            $oldPriority = $entity->getFetched('priority');
            $newPriority = $entity->get('priority');
            if ($this->isPriorityEscalated($oldPriority, $newPriority)) {
                $entity->set('isEscalated', true);
            }
        }
    }

    protected function afterCreateEntity(Entity $entity, $data)
    {
        parent::afterCreateEntity($entity, $data);
        
        // Send notification to assigned user
        try {
            $this->notifyAssignedUser($entity, 'created');
        } catch (\Exception $e) {
            // Log but don't fail
            $GLOBALS['log']->error('Notification error: ' . $e->getMessage());
        }
    }

    protected function afterUpdateEntity(Entity $entity, $data)
    {
        parent::afterUpdateEntity($entity, $data);
        
        if ($entity->isAttributeChanged('assignedUserId')) {
            try {
                $this->notifyAssignedUser($entity, 'assigned');
            } catch (\Exception $e) {
                $GLOBALS['log']->error('Notification error: ' . $e->getMessage());
            }
        }
    }

    protected function handleStatusChange(Entity $entity)
    {
        $newStatus = $entity->get('status');
        $oldStatus = $entity->getFetched('status');
        $now = date('Y-m-d H:i:s');

        // Track first response time
        if (!$entity->get('firstResponseAt') && 
            in_array($newStatus, ['Assigned', 'In Progress', 'On Hold'])) {
            $entity->set('firstResponseAt', $now);
            $createdAt = strtotime($entity->get('createdAt'));
            $responseTime = (strtotime($now) - $createdAt) / 60;
            $entity->set('responseTime', round($responseTime));
        }

        // Track reopens
        if ($newStatus === 'Reopened') {
            $reopenCount = $entity->get('reopenCount') ?? 0;
            $entity->set('reopenCount', $reopenCount + 1);
        }

        // Handle resolution
        if ($newStatus === 'Resolved' && !in_array($oldStatus, ['Resolved', 'Closed'])) {
            $entity->set('resolvedAt', $now);
            $createdAt = strtotime($entity->get('createdAt'));
            $resolutionTime = (strtotime($now) - $createdAt) / 60;
            $entity->set('resolutionTime', round($resolutionTime));
            
            // Send satisfaction survey
            try {
                $this->sendSatisfactionSurvey($entity);
            } catch (\Exception $e) {
                $GLOBALS['log']->error('Survey error: ' . $e->getMessage());
            }
        }

        // Handle closure
        if ($newStatus === 'Closed') {
            $entity->set('closedAt', $now);
        }

        // Prevent reopening closed tickets without permission
        if ($oldStatus === 'Closed' && $newStatus !== 'Closed') {
            if (!$this->getUser()->isAdmin()) {
                throw new Forbidden('Only administrators can reopen closed tickets');
            }
        }
    }

    protected function handleAssignmentChange(Entity $entity)
    {
        $newUserId = $entity->get('assignedUserId');
        
        // Auto-update status to Assigned if it was New
        if ($entity->get('status') === 'New' && $newUserId) {
            $entity->set('status', 'Assigned');
        }
    }

    protected function calculateDueDate($priority)
    {
        $hours = 24;
        
        switch ($priority) {
            case 'Critical':
                $hours = 2;
                break;
            case 'Urgent':
                $hours = 4;
                break;
            case 'High':
                $hours = 8;
                break;
            case 'Normal':
                $hours = 24;
                break;
            case 'Low':
                $hours = 48;
                break;
        }
        
        return date('Y-m-d H:i:s', strtotime("+{$hours} hours"));
    }

    protected function isPriorityEscalated($oldPriority, $newPriority)
    {
        $levels = ['Low' => 1, 'Normal' => 2, 'High' => 3, 'Urgent' => 4, 'Critical' => 5];
        return ($levels[$newPriority] ?? 0) > ($levels[$oldPriority] ?? 0);
    }

    protected function notifyAssignedUser(Entity $entity, $action)
    {
        $assignedUserId = $entity->get('assignedUserId');
        if (!$assignedUserId) return;

        try {
            $notification = $this->getEntityManager()->getEntity('Notification');
            if ($notification) {
                $notification->set([
                    'type' => 'Assign',
                    'userId' => $assignedUserId,
                    'relatedType' => 'Ticket',
                    'relatedId' => $entity->id,
                    'message' => "Ticket #{$entity->get('number')} has been {$action}"
                ]);
                $this->getEntityManager()->saveEntity($notification);
            }
        } catch (\Exception $e) {
            $GLOBALS['log']->error('Ticket notification error: ' . $e->getMessage());
        }
    }

    protected function sendSatisfactionSurvey(Entity $entity)
    {
        try {
            $contactId = $entity->get('contactId');
            if ($contactId) {
                $contact = $this->getEntityManager()->getEntity('Contact', $contactId);
                if ($contact && $contact->get('emailAddress')) {
                    $GLOBALS['log']->info("Satisfaction survey queued for ticket #{$entity->get('number')}");
                }
            }
        } catch (\Exception $e) {
            $GLOBALS['log']->error('Survey send error: ' . $e->getMessage());
        }
    }

    public function escalateTicket(string $id, string $userId = null, string $reason = '')
    {
        $ticket = $this->getEntityManager()->getEntity('Ticket', $id);
        
        if (!$ticket) {
            throw new BadRequest('Ticket not found');
        }

        $ticket->set('isEscalated', true);
        
        if ($userId) {
            $ticket->set('escalatedToId', $userId);
            $ticket->set('assignedUserId', $userId);
        }

        $currentPriority = $ticket->get('priority');
        if ($currentPriority !== 'Critical') {
            $priorityMap = ['Low' => 'Normal', 'Normal' => 'High', 'High' => 'Urgent', 'Urgent' => 'Critical'];
            $ticket->set('priority', $priorityMap[$currentPriority] ?? 'Urgent');
        }

        if ($reason) {
            $notes = $ticket->get('description') ?? '';
            $ticket->set('description', $notes . "\n\n[ESCALATED] Reason: " . $reason);
        }

        $this->getEntityManager()->saveEntity($ticket);
        
        return $ticket;
    }

    public function mergeTickets(string $masterId, array $duplicateIds)
    {
        $masterTicket = $this->getEntityManager()->getEntity('Ticket', $masterId);
        
        if (!$masterTicket) {
            throw new BadRequest('Master ticket not found');
        }

        foreach ($duplicateIds as $dupId) {
            $dupTicket = $this->getEntityManager()->getEntity('Ticket', $dupId);
            if ($dupTicket) {
                $dupTicket->set('parentTicketId', $masterId);
                $dupTicket->set('status', 'Closed');
                $dupTicket->set('resolution', 'Merged with ticket #' . $masterTicket->get('number'));
                $this->getEntityManager()->saveEntity($dupTicket);
            }
        }

        return $masterTicket;
    }
}