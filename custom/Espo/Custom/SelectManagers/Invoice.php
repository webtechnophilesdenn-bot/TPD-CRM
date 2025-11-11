<?php

namespace Espo\Custom\SelectManagers;

class Invoice extends \Espo\Core\SelectManagers\Base
{
    protected function filterDraft(&$result)
    {
        $result['whereClause'][] = [
            'status' => 'Draft'
        ];
    }
    
    protected function filterSent(&$result)
    {
        $result['whereClause'][] = [
            'status' => 'Sent'
        ];
    }
    
    protected function filterUnpaid(&$result)
    {
        $result['whereClause'][] = [
            'status' => ['Sent', 'Overdue', 'Partially Paid']
        ];
    }
    
    protected function filterPaid(&$result)
    {
        $result['whereClause'][] = [
            'status' => 'Paid'
        ];
    }
    
    protected function filterOverdue(&$result)
    {
        $result['whereClause'][] = [
            'status' => 'Overdue'
        ];
    }
    
    protected function filterPartiallyPaid(&$result)
    {
        $result['whereClause'][] = [
            'status' => 'Partially Paid'
        ];
    }
}
