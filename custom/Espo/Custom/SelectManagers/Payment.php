<?php
namespace Espo\Custom\SelectManagers;

class Payment extends \Espo\Core\SelectManagers\Base
{
    protected function filterPending(&$result)
    {
        $result['whereClause'][] = [
            'status' => 'Pending'
        ];
    }
    
    protected function filterCompleted(&$result)
    {
        $result['whereClause'][] = [
            'status' => 'Completed'
        ];
    }
    
    protected function filterFailed(&$result)
    {
        $result['whereClause'][] = [
            'status' => 'Failed'
        ];
    }
    
    protected function filterRecent(&$result)
    {
        $dt = new \DateTime();
        $dt->modify('-30 days');
        
        $result['whereClause'][] = [
            'paymentDate>=' => $dt->format('Y-m-d')
        ];
    }
}