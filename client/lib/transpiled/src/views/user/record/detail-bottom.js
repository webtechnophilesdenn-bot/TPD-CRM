define("views/user/record/detail-bottom", ["exports", "views/record/detail-bottom"], function (_exports, _detailBottom) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _detailBottom = _interopRequireDefault(_detailBottom);
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

  class UserDetailBottomRecordView extends _detailBottom.default {
    setupPanels() {
      super.setupPanels();
      const userModel = /** @type {import('models/user').default} */this.model;
      const streamAllowed = this.getAcl().checkPermission('userCalendar', userModel);
      if (!streamAllowed && this.getAcl().getPermissionLevel('userCalendar') === 'team' && !this.model.has('teamsIds')) {
        this.listenToOnce(this.model, 'sync', () => {
          if (this.getAcl().checkPermission('userCalendar', userModel)) {
            this.onPanelsReady(() => {
              this.showPanel('stream', 'acl');
            });
          }
        });
      }
      this.panelList.push({
        "name": "stream",
        "label": "Stream",
        "view": "views/user/record/panels/stream",
        "sticked": false,
        "hidden": !streamAllowed
      });
      if (!streamAllowed) {
        this.recordHelper.setPanelStateParam('stream', 'hiddenAclLocked', true);
      }
    }
  }
  var _default = _exports.default = UserDetailBottomRecordView;
});
//# sourceMappingURL=detail-bottom.js.map ;