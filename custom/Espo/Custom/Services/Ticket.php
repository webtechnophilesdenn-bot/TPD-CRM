<?php

namespace Espo\Custom\Services;

use Espo\ORM\Entity;
use Espo\Core\Exceptions\BadRequest;
use Espo\Core\Exceptions\Error;

class Ticket extends \Espo\Services\Record
{
    protected $notFilteringAttributeList = ['number'];

    protected function beforeCreateEntity(Entity $entity, $data)
    {
        parent::beforeCreateEntity($entity, $data);
        
        // Validate required name field
        if (!$entity->get('name')) {
            throw new BadRequest('Ticket name is required');
        }

        // Auto-assign to current user if not set
        if (!$entity->get('assignedUserId')) {
            $entity->set('assignedUserId', $this->getUser()->getId());
        }

        // Set default status
        if (!$entity->get('status')) {
            $entity->set('status', 'New');
        }

        // Set default priority
        if (!$entity->get('priority')) {
            $entity->set('priority', 'Normal');
        }

        // Don't manually set number - let autoincrement handle it
        // The number field is readOnly and will be generated automatically
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
        
        // Notification is handled automatically by EspoCRM
        // if assignment notifications are enabled
    }

    protected function handleStatusChange(Entity $entity)
    {
        $newStatus = $entity->get('status');
        $oldStatus = $entity->getFetched('status');

        // If ticket is resolved/closed, optionally require resolution
        if (in_array($newStatus, ['Resolved', 'Closed'])) {
            if (!$entity->get('resolution')) {
                // Optional: Uncomment to make resolution required
                // throw new BadRequest('Resolution is required when closing a ticket');
            }
        }

        // Note: Stream notes are handled automatically by the audited flag
    }

    // Access control
    public function checkEntityForMassUpdate(Entity $entity, $data)
    {
        parent::checkEntityForMassUpdate($entity, $data);
        
        // Prevent mass-updating closed tickets
        if ($entity->get('status') === 'Closed') {
            return false;
        }
        
        return true;
    }
}