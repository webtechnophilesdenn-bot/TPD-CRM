define("views/working-time-calendar/fields/time-ranges/item-detail", ["exports", "view", "moment"], function (_exports, _view, _moment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _view = _interopRequireDefault(_view);
  _moment = _interopRequireDefault(_moment);
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

  class _default extends _view.default {
    templateContent = `
        {{start}}
        &nbsp;–&nbsp;
        {{end}}
    `;
    data() {
      return {
        start: this.convertTimeToDisplay(this.value[0]),
        end: this.convertTimeToDisplay(this.value[1])
      };
    }
    setup() {
      this.value = this.options.value;
    }
    convertTimeToDisplay(value) {
      if (!value) {
        return '';
      }
      const m = (0, _moment.default)(value, 'HH:mm');
      if (!m.isValid()) {
        return '';
      }
      return m.format(this.getDateTime().timeFormat);
    }
  }
  _exports.default = _default;
});
//# sourceMappingURL=item-detail.js.map ;