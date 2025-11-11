<?php

namespace Espo\Custom\Services;

use Espo\ORM\Entity;
use Espo\Core\Exceptions\BadRequest;

class Quote extends \Espo\Services\Record
{
    protected $notFilteringAttributeList = ['number'];

    protected function beforeCreateEntity(Entity $entity, $data)
    {
        parent::beforeCreateEntity($entity, $data);
        
        try {
            // Validate required name field
            if (!$entity->get('name') || trim($entity->get('name')) === '') {
                throw new BadRequest('Quote name is required');
            }

            // Auto-assign to current user
            if (!$entity->get('assignedUserId')) {
                $entity->set('assignedUserId', $this->getUser()->getId());
            }

            // Set default status
            if (!$entity->get('status')) {
                $entity->set('status', 'Draft');
            }

            // Set quote date
            if (!$entity->get('quoteDate')) {
                $entity->set('quoteDate', date('Y-m-d'));
            }

            // Initialize numeric fields
            $entity->set('amount', (float)($entity->get('amount') ?? 0));
            $entity->set('taxAmount', (float)($entity->get('taxAmount') ?? 0));
            $entity->set('discountAmount', (float)($entity->get('discountAmount') ?? 0));

        } catch (BadRequest $e) {
            throw $e;
        } catch (\Exception $e) {
            $GLOBALS['log']->error('Quote beforeCreateEntity error: ' . $e->getMessage());
            throw new BadRequest('Error creating quote: ' . $e->getMessage());
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
            $GLOBALS['log']->error('Quote beforeUpdateEntity error: ' . $e->getMessage());
            throw $e;
        }
    }

    protected function handleStatusChange(Entity $entity)
    {
        $newStatus = $entity->get('status');
        $oldStatus = $entity->getFetched('status');

        if ($newStatus === 'Accepted' && $oldStatus !== 'Accepted') {
            // Add acceptance notification logic
        }

        if ($newStatus !== 'Expired' && $newStatus !== 'Accepted') {
            $expirationDate = $entity->get('expirationDate');
            if ($expirationDate && strtotime($expirationDate) < time()) {
                $entity->set('status', 'Expired');
            }
        }
    }

    protected function calculateGrandTotal(Entity $entity)
    {
        $amount = (float)($entity->get('amount') ?? 0);
        $taxAmount = (float)($entity->get('taxAmount') ?? 0);
        $discountAmount = (float)($entity->get('discountAmount') ?? 0);
        
        return $amount + $taxAmount - $discountAmount;
    }
}
