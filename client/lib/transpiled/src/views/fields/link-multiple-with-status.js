define("views/fields/link-multiple-with-status", ["exports", "views/fields/link-multiple"], function (_exports, _linkMultiple) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _linkMultiple = _interopRequireDefault(_linkMultiple);
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

  class LinkMultipleWithStatusFieldView extends _linkMultiple.default {
    /**
     * @protected
     * @type {string[]}
     */
    canceledStatusList;
    setup() {
      super.setup();
      this.columnsName = this.name + 'Columns';
      this.columns = Espo.Utils.cloneDeep(this.model.get(this.columnsName) || {});
      this.listenTo(this.model, 'change:' + this.columnsName, () => {
        this.columns = Espo.Utils.cloneDeep(this.model.get(this.columnsName) || {});
      });
      this.statusField = this.getMetadata().get(['entityDefs', this.model.entityType, 'fields', this.name, 'columns', 'status']);
      this.styleMap = this.getMetadata().get(['entityDefs', this.foreignScope, 'fields', this.statusField, 'style']) || {};
      this.canceledStatusList = [];
    }
    getAttributeList() {
      const list = super.getAttributeList();
      list.push(this.name + 'Columns');
      return list;
    }
    getDetailLinkHtml(id, name) {
      const status = (this.columns[id] || {}).status;
      if (!status) {
        return super.getDetailLinkHtml(id, name);
      }
      const style = this.styleMap[status];
      const targetStyleList = ['success', 'info', 'danger', 'warning'];
      if (!style || !~targetStyleList.indexOf(style)) {
        return super.getDetailLinkHtml(id, name);
      }
      let iconStyle = '';
      if (style === 'success') {
        iconStyle = 'fas fa-check text-success small';
      } else if (this.canceledStatusList.includes(status)) {
        iconStyle = `fas fa-times text-${style} small`;
      }
      return `<span class="${iconStyle}" style="display: inline-block; min-width: 12px"></span> ` + super.getDetailLinkHtml(id, name);
    }
  }

  // noinspection JSUnusedGlobalSymbols
  var _default = _exports.default = LinkMultipleWithStatusFieldView;
});
//# sourceMappingURL=link-multiple-with-status.js.map ;