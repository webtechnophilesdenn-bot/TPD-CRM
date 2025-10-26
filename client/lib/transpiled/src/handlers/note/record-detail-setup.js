define("handlers/note/record-detail-setup", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
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

  class _default {
    /**
     * @param {import('views/record/detail').default} view
     */
    constructor(view) {
      this.view = view;
    }
    process() {
      this.controlFields();
      this.view.listenTo(this.view.model, 'sync', () => this.controlFields());
    }
    controlFields() {
      const attachmentsIds = this.view.model.attributes.attachmentsIds;
      if (!attachmentsIds || !attachmentsIds.length) {
        this.view.hideField('attachments');
        return;
      }
      this.view.showField('attachments');
    }
  }
  _exports.default = _default;
});
//# sourceMappingURL=record-detail-setup.js.map ;