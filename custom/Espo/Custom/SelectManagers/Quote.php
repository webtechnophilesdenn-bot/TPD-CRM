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
    
    protected function filterActive(&$result)
    {
        $result['whereClause'][] = [
            'status' => ['Draft', 'Sent']
        ];
    }
}