<?php
namespace Espo\Custom\SelectManagers;

class Expense extends \Espo\Core\SelectManagers\Base
{
    protected function filterDraft(&$result)
    {
        $result['whereClause'][] = [
            'status' => 'Draft'
        ];
    }
    
    protected function filterSubmitted(&$result)
    {
        $result['whereClause'][] = [
            'status' => 'Submitted'
        ];
    }
    
    protected function filterApproved(&$result)
    {
        $result['whereClause'][] = [
            'status' => 'Approved'
        ];
    }
    
    protected function filterPending(&$result)
    {
        $result['whereClause'][] = [
            'status' => 'Submitted'
        ];
    }
    
    protected function filterReimbursable(&$result)
    {
        $result['whereClause'][] = [
            'isReimbursable' => true,
            'status!=' => ['Cancelled', 'Rejected']
        ];
    }
}