define("views/admin/field-manager/fields/link/default", ["exports", "views/fields/link"], function (_exports, _link) {
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
    data() {
      const defaultAttributes = this.model.get('defaultAttributes') || {};
      const nameValue = defaultAttributes[this.options.field + 'Name'] || null;
      const idValue = defaultAttributes[this.options.field + 'Id'] || null;
      const data = super.data();
      data.nameValue = nameValue;
      data.idValue = idValue;
      return data;
    }
    setup() {
      super.setup();
      const entityType = this.options.scope;
      const field = this.options.field;
      this.foreignScope = this.getMetadata().get(['entityDefs', entityType, 'links', field, 'entity']) ?? this.getMetadata().get(`entityDefs.${entityType}.fields.${field}.entity`);
    }
    fetch() {
      const data = super.fetch();
      let defaultAttributes = {};
      defaultAttributes[this.options.field + 'Id'] = data[this.idName];
      defaultAttributes[this.options.field + 'Name'] = data[this.nameName];
      if (data[this.idName] === null) {
        defaultAttributes = null;
      }
      return {
        defaultAttributes: defaultAttributes
      };
    }
  }
  _exports.default = _default;
});
//# sourceMappingURL=default.js.map ;