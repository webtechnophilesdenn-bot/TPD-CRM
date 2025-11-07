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
}