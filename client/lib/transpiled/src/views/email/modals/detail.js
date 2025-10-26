define("views/email/modals/detail", ["exports", "views/modals/detail", "views/email/detail"], function (_exports, _detail, _detail2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _detail = _interopRequireDefault(_detail);
  _detail2 = _interopRequireDefault(_detail2);
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

  class _default extends _detail.default {
    setup() {
      super.setup();
      this.addButton({
        name: 'reply',
        label: 'Reply',
        hidden: this.model && this.model.get('status') === 'Draft',
        style: 'danger',
        position: 'right'
      }, true);
      if (this.model) {
        this.listenToOnce(this.model, 'sync', () => {
          setTimeout(() => {
            this.model.set('isRead', true);
          }, 50);
        });
      }
    }
    controlRecordButtonsVisibility() {
      super.controlRecordButtonsVisibility();
      if (this.model.get('status') === 'Draft' || !this.getAcl().check('Email', 'create')) {
        this.hideActionItem('reply');
        return;
      }
      this.showActionItem('reply');
    }

    // noinspection JSUnusedGlobalSymbols
    actionReply(data, e) {
      _detail2.default.prototype.actionReply.call(this, {}, e, this.getPreferences().get('emailReplyToAllByDefault'));
    }
  }
  _exports.default = _default;
});
//# sourceMappingURL=detail.js.map ;