define("views/modals/auth2fa-required", ["exports", "views/modal"], function (_exports, _modal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _modal = _interopRequireDefault(_modal);
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

  class Auth2faRequiredModalView extends _modal.default {
    noCloseButton = true;
    escapeDisabled = true;
    events = {
      'click [data-action="proceed"]': 'actionProceed',
      'click [data-action="logout"]': 'actionLogout'
    };

    // language=Handlebars
    templateContent = `
        <div class="complex-text">{{complexText viewObject.messageText}}</div>
        <div class="button-container btn-group" style="margin-top: 30px">
        <button class="btn btn-primary" data-action="proceed">{{translate 'Proceed'}}</button>
        <button class="btn btn-default" data-action="logout">{{translate 'Log Out'}}</button></div>
    `;
    setup() {
      this.buttonList = [];
      this.headerText = this.translate('auth2FARequiredHeader', 'messages', 'User');
      // noinspection JSUnusedGlobalSymbols
      this.messageText = this.translate('auth2FARequired', 'messages', 'User');
    }
    actionProceed() {
      this.createView('dialog', 'views/user/modals/security', {
        userModel: this.getUser()
      }, view => {
        view.render();
        this.listenToOnce(view, 'done', () => {
          this.clearView('dialog');
          this.close();
        });
      });
    }
    actionLogout() {
      this.getRouter().logout();
    }
  }
  var _default = _exports.default = Auth2faRequiredModalView;
});
//# sourceMappingURL=auth2fa-required.js.map ;