<?php

namespace Espo\Custom\SelectManagers;

class Quote extends \Espo\Core\SelectManagers\Base
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
    
    protected function filterAccepted(&$result)
    {
        $result['whereClause'][] = [
            'status' => 'Accepted'
        ];
    }
    
    protected function filterRejected(&$result)
    {
        $result['whereClause'][] = [
            'status' => 'Rejected'
        ];
    }
    
    protected function filterExpired(&$result)
    {
        $result['whereClause'][] = [
            'status' => 'Expired'
        ];
    }
    
    protected function filterActive(&$result)
    {
        $result['whereClause'][] = [
            'status' => ['Draft', 'Sent']
        ];
    }
}
