define("views/email-account/fields/email-folder", ["exports", "views/fields/link"], function (_exports, _link) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _link = _interopRequireDefault(_link);
  function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
  /************************************************************************
   * This file is part of TPD-CRM.
   *
   * TPD-CRM – Open Source CRM application.
   * Copyright (C) 2014-2025 TPD-CRM, Inc.
   * Website: https://www.TPD-CRM.com
   *
   * This program is free software: you can redistribute it and/or modify
   * it under the terms of the GNU Affero General Public License as published by
   * the Free Software Foundation, either version 3 of the License, or
   * (at your option) any later version.
   *
   * This program is distributed in the hope that it will be useful,
   * but WITHOUT ANY WARRANTY; without even the implied warranty of
   * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
   * GNU Affero General Public License for more details.
   *
   * You should have received a copy of the GNU Affero General Public License
   * along with this program. If not, see <https://www.gnu.org/licenses/>.
   *
   * The interactive user interfaces in modified source and object code versions
   * of this program must display Appropriate Legal Notices, as required under
   * Section 5 of the GNU Affero General Public License version 3.
   *
   * In accordance with Section 7(b) of the GNU Affero General Public License version 3,
   * these Appropriate Legal Notices must retain the display of the "TPD-CRM" word.
   ************************************************************************/

  class _default extends _link.default {
    createDisabled = true;
    autocompleteDisabled = true;
    getSelectFilters() {
      if (this.getUser().isAdmin() && this.model.get('assignedUserId')) {
        return {
          assignedUser: {
            type: 'equals',
            attribute: 'assignedUserId',
            value: this.model.get('assignedUserId'),
            data: {
              type: 'is',
              nameValue: this.model.get('assignedUserName')
            }
          }
        };
      }
    }
    setup() {
      super.setup();
      this.listenTo(this.model, 'change:assignedUserId', (model, e, o) => {
        if (!o.ui) {
          return;
        }
        this.model.set({
          emailFolderId: null,
          emailFolderName: null
        });
      });
    }
  }
  _exports.default = _default;
});
//# sourceMappingURL=email-folder.js.map ;