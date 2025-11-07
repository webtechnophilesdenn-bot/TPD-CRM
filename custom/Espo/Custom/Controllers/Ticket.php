<?php

namespace Espo\Custom\Controllers;

use Espo\Core\Controllers\Record;
use Espo\Core\Api\Request;
use Espo\Core\Api\Response;
use Espo\Core\Exceptions\Forbidden;
use stdClass;

class Ticket extends Record
{
    public function getActionList(Request $request, Response $response): stdClass
    {
        if (!$this->acl->check('Ticket', 'read')) {
            throw new Forbidden();
        }

        return parent::getActionList($request, $response);
    }

    public function postActionCreate(Request $request, Response $response): stdClass
    {
        if (!$this->acl->check('Ticket', 'create')) {
            throw new Forbidden();
        }

        return parent::postActionCreate($request, $response);
    }

    public function putActionUpdate(Request $request, Response $response): stdClass
    {
        if (!$this->acl->check('Ticket', 'edit')) {
            throw new Forbidden();
        }

        return parent::putActionUpdate($request, $response);
    }

    public function deleteActionDelete(Request $request, Response $response): bool
    {
        if (!$this->acl->check('Ticket', 'delete')) {
            throw new Forbidden();
        }

        return parent::deleteActionDelete($request, $response);
    }
}