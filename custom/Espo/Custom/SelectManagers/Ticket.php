<?php

namespace Espo\Custom\SelectManagers;

class Ticket extends \Espo\Core\SelectManagers\Base
{
    protected function filterOpen(&$result)
    {
        $result['whereClause'][] = [
            'status!=' => ['Closed', 'Cancelled', 'Resolved']
        ];
    }

    protected function filterMyOpen(&$result)
    {
        $result['whereClause'][] = [
            'OR' => [
                'assignedUserId' => $this->getUser()->getId(),
                'createdById' => $this->getUser()->getId()
            ]
        ];
        $result['whereClause'][] = [
            'status!=' => ['Closed', 'Cancelled', 'Resolved']
        ];
    }

    protected function filterClosed(&$result)
    {
        $result['whereClause'][] = [
            'status=' => ['Closed', 'Cancelled', 'Resolved']
        ];
    }

    protected function filterNew(&$result)
    {
        $result['whereClause'][] = [
            'status' => 'New'
        ];
    }

    protected function filterUrgent(&$result)
    {
        $result['whereClause'][] = [
            'priority=' => ['Urgent', 'Critical']
        ];
    }

    protected function filterEscalated(&$result)
    {
        $result['whereClause'][] = [
            'isEscalated' => true
        ];
    }

    protected function filterOverdue(&$result)
    {
        $result['whereClause'][] = [
            'dueDate<' => date('Y-m-d H:i:s'),
            'status!=' => ['Closed', 'Cancelled', 'Resolved']
        ];
    }

    protected function filterUnassigned(&$result)
    {
        $result['whereClause'][] = [
            'assignedUserId' => null
        ];
    }

    protected function filterPendingCustomer(&$result)
    {
        $result['whereClause'][] = [
            'status' => 'Waiting for Customer'
        ];
    }
}