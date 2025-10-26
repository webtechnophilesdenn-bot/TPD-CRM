define("views/notification/record/list", ["exports", "views/record/list-expanded"], function (_exports, _listExpanded) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _listExpanded = _interopRequireDefault(_listExpanded);
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

  /** @module views/notification/record/list */

  class NotificationListRecordView extends _listExpanded.default {
    /**
     * @name collection
     * @type module:collections/note
     * @memberOf NotificationListRecordView#
     */

    setup() {
      super.setup();
      this.listenTo(this.collection, 'sync', (c, r, options) => {
        if (!options.fetchNew) {
          return;
        }
        const lengthBeforeFetch = options.lengthBeforeFetch || 0;
        if (lengthBeforeFetch === 0) {
          this.reRender();
          return;
        }
        const $list = this.$el.find(this.listContainerEl);
        const rowCount = this.collection.length - lengthBeforeFetch;
        for (let i = rowCount - 1; i >= 0; i--) {
          const model = this.collection.at(i);
          $list.prepend($(this.getRowContainerHtml(model.id)));
          this.buildRow(i, model, view => {
            view.render();
          });
        }
      });
      this.events['auxclick a[href][data-scope][data-id]'] = e => {
        const isCombination = e.button === 1 && (e.ctrlKey || e.metaKey);
        if (!isCombination) {
          return;
        }
        const $target = $(e.currentTarget);
        const id = $target.attr('data-id');
        const scope = $target.attr('data-scope');
        e.preventDefault();
        e.stopPropagation();
        this.actionQuickView({
          id: id,
          scope: scope
        });
      };
    }
    getCellSelector(model, item) {
      const current = this.getSelector();
      const row = this.getRowSelector(model.id);
      if (item.field === 'right') {
        return `${current} ${row} > .cell[data-name="${item.field}"]`;
      }
      return `${current} ${row} > .expanded-row > .cell[data-name="${item.field}"]`;
    }

    /**
     * @return {Promise}
     */
    showNewRecords() {
      return this.collection.fetchNew();
    }
  }
  var _default = _exports.default = NotificationListRecordView;
});
//# sourceMappingURL=list.js.map ;