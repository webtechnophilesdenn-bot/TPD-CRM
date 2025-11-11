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
        
        // Only validate required fields - keep it simple
        if (!$entity->get('name')) {
            throw new BadRequest('Name is required');
        }

        if (!$entity->get('accountId')) {
            throw new BadRequest('Account is required');
        }

        if (!$entity->get('amount')) {
            throw new BadRequest('Amount is required');
        }

        // Set defaults
        if (!$entity->get('status')) {
            $entity->set('status', 'Draft');
        }

        if (!$entity->get('assignedUserId')) {
            $entity->set('assignedUserId', $this->getUser()->getId());
        }

        if (!$entity->get('invoiceDate')) {
            $entity->set('invoiceDate', date('Y-m-d'));
        }
    }
}
