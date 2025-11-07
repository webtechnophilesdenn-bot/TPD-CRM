<?php

namespace Espo\Custom\Controllers;

use Espo\Core\Exceptions\Forbidden;
use Espo\Core\Api\Request;
use Espo\Core\Api\Response;
use stdClass;

class Account extends \Espo\Core\Controllers\Record
{
    public function getActionList(Request $request, Response $response): stdClass
    {
        if (!$this->getAcl()->check('Account', 'read')) {
            throw new Forbidden('No access to Account');
        }

        return parent::getActionList($request, $response);
    }
}