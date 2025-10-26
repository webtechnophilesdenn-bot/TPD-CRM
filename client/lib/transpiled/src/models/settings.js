define("models/settings", ["exports", "model"], function (_exports, _model) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _model = _interopRequireDefault(_model);
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

  /** @module models/settings */

  /**
   * A config.
   */
  class Settings extends _model.default {
    name = 'Settings';
    entityType = 'Settings';
    urlRoot = 'Settings';

    /**
     * Load.
     *
     * @returns {Promise}
     */
    load() {
      return new Promise(resolve => {
        this.fetch().then(() => resolve());
      });
    }

    /**
     * Get a value by a path.
     *
     * @param {string[]} path A path.
     * @returns {*} Null if not set.
     */
    getByPath(path) {
      if (!path.length) {
        return null;
      }
      let p;
      for (let i = 0; i < path.length; i++) {
        const item = path[i];
        if (i === 0) {
          p = this.get(item);
        } else {
          if (item in p) {
            p = p[item];
          } else {
            return null;
          }
        }
        if (i === path.length - 1) {
          return p;
        }
        if (p === null || typeof p !== 'object') {
          return null;
        }
      }
    }
  }
  var _default = _exports.default = Settings;
});
//# sourceMappingURL=settings.js.map ;