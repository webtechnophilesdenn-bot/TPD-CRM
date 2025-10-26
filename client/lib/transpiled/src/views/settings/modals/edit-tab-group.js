define("views/settings/modals/edit-tab-group", ["exports", "views/modal", "model"], function (_exports, _modal, _model) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _modal = _interopRequireDefault(_modal);
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

  class SettingsEditTabGroupModalView extends _modal.default {
    className = 'dialog dialog-record';
    templateContent = `<div class="record no-side-margin">{{{record}}}</div>`;
    setup() {
      super.setup();
      this.headerText = this.translate('Group Tab', 'labels', 'Settings');
      this.buttonList.push({
        name: 'apply',
        label: 'Apply',
        style: 'danger'
      });
      this.buttonList.push({
        name: 'cancel',
        label: 'Cancel'
      });
      this.shortcutKeys = {
        'Control+Enter': () => this.actionApply()
      };
      const detailLayout = [{
        rows: [[{
          name: 'text',
          labelText: this.options.parentType === 'Preferences' ? this.translate('label', 'tabFields', 'Preferences') : this.translate('label', 'fields', 'Admin')
        }, {
          name: 'iconClass',
          labelText: this.options.parentType === 'Preferences' ? this.translate('iconClass', 'tabFields', 'Preferences') : this.translate('iconClass', 'fields', 'EntityManager')
        }, {
          name: 'color',
          labelText: this.options.parentType === 'Preferences' ? this.translate('color', 'tabFields', 'Preferences') : this.translate('color', 'fields', 'EntityManager')
        }], [{
          name: 'itemList',
          labelText: this.options.parentType === 'Preferences' ? this.translate('tabList', 'fields', 'Preferences') : this.translate('tabList', 'fields', 'Settings')
        }, false]]
      }];
      const model = this.model = new _model.default();
      model.name = 'GroupTab';
      model.set(this.options.itemData);
      model.setDefs({
        fields: {
          text: {
            type: 'varchar'
          },
          iconClass: {
            type: 'base',
            view: 'views/admin/entity-manager/fields/icon-class'
          },
          color: {
            type: 'base',
            view: 'views/fields/colorpicker'
          },
          itemList: {
            type: 'array',
            view: 'views/settings/fields/group-tab-list'
          }
        }
      });
      this.createView('record', 'views/record/edit-for-modal', {
        detailLayout: detailLayout,
        model: model,
        selector: '.record'
      });
    }
    actionApply() {
      const recordView = /** @type {import('views/record/edit').default} */this.getView('record');
      if (recordView.validate()) {
        return;
      }
      const data = recordView.fetch();
      this.trigger('apply', data);
    }
  }
  var _default = _exports.default = SettingsEditTabGroupModalView;
});
//# sourceMappingURL=edit-tab-group.js.map ;