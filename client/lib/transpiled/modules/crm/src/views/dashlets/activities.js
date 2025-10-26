define("modules/crm/views/dashlets/activities", ["exports", "views/dashlets/abstract/base", "multi-collection", "helpers/record-modal"], function (_exports, _base, _multiCollection, _recordModal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _base = _interopRequireDefault(_base);
  _multiCollection = _interopRequireDefault(_multiCollection);
  _recordModal = _interopRequireDefault(_recordModal);
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

  class ActivitiesDashletView extends _base.default {
    name = 'Activities';

    // language=Handlebars
    templateContent = '<div class="list-container">{{{list}}}</div>';
    rowActionsView = 'crm:views/record/row-actions/activities-dashlet';
    defaultListLayout = {
      rows: [[{
        name: 'ico',
        view: 'crm:views/fields/ico',
        params: {
          notRelationship: true
        }
      }, {
        name: 'name',
        link: true
      }], [{
        name: 'dateStart',
        soft: true
      }, {
        name: 'parent'
      }]]
    };
    listLayoutEntityTypeMap = {
      Task: {
        rows: [[{
          name: 'ico',
          view: 'crm:views/fields/ico',
          params: {
            notRelationship: true
          }
        }, {
          name: 'name',
          link: true
        }], [{
          name: 'status'
        }, {
          name: 'dateEnd',
          soft: true
        }, {
          name: 'priority',
          view: 'crm:views/task/fields/priority-for-dashlet'
        }, {
          name: 'parent'
        }]]
      }
    };
    setup() {
      this.seeds = {};
      this.scopeList = this.getOption('enabledScopeList') || [];
      this.listLayout = {};
      this.scopeList.forEach(item => {
        if (item in this.listLayoutEntityTypeMap) {
          this.listLayout[item] = this.listLayoutEntityTypeMap[item];
          return;
        }
        this.listLayout[item] = this.defaultListLayout;
      });
      this.wait(true);
      let i = 0;
      this.scopeList.forEach(scope => {
        this.getModelFactory().create(scope, seed => {
          this.seeds[scope] = seed;
          i++;
          if (i === this.scopeList.length) {
            this.wait(false);
          }
        });
      });
      this.scopeList.slice(0).reverse().forEach(scope => {
        if (this.getAcl().checkScope(scope, 'create')) {
          this.actionList.unshift({
            name: 'createActivity',
            text: this.translate('Create ' + scope, 'labels', scope),
            iconHtml: '<span class="fas fa-plus"></span>',
            url: '#' + scope + '/create',
            data: {
              scope: scope
            }
          });
        }
      });
    }
    afterRender() {
      this.collection = new _multiCollection.default();
      this.collection.seeds = this.seeds;
      this.collection.url = 'Activities/upcoming';
      this.collection.maxSize = this.getOption('displayRecords') || this.getConfig().get('recordsPerPageSmall') || 5;
      this.collection.data.entityTypeList = this.scopeList;
      this.collection.data.futureDays = this.getOption('futureDays');
      if (this.getOption('includeShared')) {
        this.collection.data.includeShared = true;
      }
      this.listenToOnce(this.collection, 'sync', () => {
        this.createView('list', 'crm:views/record/list-activities-dashlet', {
          selector: '> .list-container',
          pagination: false,
          type: 'list',
          rowActionsView: this.rowActionsView,
          checkboxes: false,
          collection: this.collection,
          listLayout: this.listLayout
        }, view => {
          view.render();
        });
      });
      this.collection.fetch();
    }
    actionRefresh() {
      this.refreshInternal();
    }
    autoRefresh() {
      this.refreshInternal({
        skipNotify: true
      });
    }

    /**
     * @private
     * @param {{skipNotify?: boolean}} [options]
     * @return {Promise<void>}
     */
    async refreshInternal() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!options.skipNotify) {
        Espo.Ui.notifyWait();
      }
      await this.collection.fetch({
        previousTotal: this.collection.total,
        previousDataList: this.collection.models.map(model => {
          return Espo.Utils.cloneDeep(model.attributes);
        })
      });
      if (!options.skipNotify) {
        Espo.Ui.notify();
      }
    }

    // noinspection JSUnusedGlobalSymbols
    actionCreateActivity(data) {
      const scope = data.scope;
      const attributes = {};
      this.populateAttributesAssignedUser(scope, attributes);
      const helper = new _recordModal.default();
      helper.showCreate(this, {
        entityType: scope,
        attributes: attributes,
        afterSave: () => {
          this.actionRefresh();
        }
      });
    }

    // noinspection JSUnusedGlobalSymbols
    actionCreateMeeting() {
      const attributes = {};
      this.populateAttributesAssignedUser('Meeting', attributes);
      const helper = new _recordModal.default();
      helper.showCreate(this, {
        entityType: 'Meeting',
        attributes: attributes,
        afterSave: () => {
          this.actionRefresh();
        }
      });
    }

    // noinspection JSUnusedGlobalSymbols
    actionCreateCall() {
      const attributes = {};
      this.populateAttributesAssignedUser('Call', attributes);
      const helper = new _recordModal.default();
      helper.showCreate(this, {
        entityType: 'Call',
        attributes: attributes,
        afterSave: () => {
          this.actionRefresh();
        }
      });
    }
    populateAttributesAssignedUser(scope, attributes) {
      if (this.getMetadata().get(['entityDefs', scope, 'fields', 'assignedUsers'])) {
        attributes['assignedUsersIds'] = [this.getUser().id];
        attributes['assignedUsersNames'] = {};
        attributes['assignedUsersNames'][this.getUser().id] = this.getUser().get('name');
      } else {
        attributes['assignedUserId'] = this.getUser().id;
        attributes['assignedUserName'] = this.getUser().get('name');
      }
    }
  }
  var _default = _exports.default = ActivitiesDashletView;
});
//# sourceMappingURL=activities.js.map ;