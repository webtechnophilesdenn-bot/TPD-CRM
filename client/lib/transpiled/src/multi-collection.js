define("multi-collection", ["exports", "collection"], function (_exports, _collection) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _collection = _interopRequireDefault(_collection);
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

  /** @module multi-collection */

  /**
   * A collection that can contain entities of different entity types.
   */
  class MultiCollection extends _collection.default {
    /**
     * A model seed map.
     *
     * @public
     * @type {Object.<string, module:model>}
     */
    seeds = null;

    /** @inheritDoc */
    prepareAttributes(response, options) {
      this.total = response.total;
      if (!('list' in response)) {
        throw new Error("No 'list' in response.");
      }

      /** @type {({_scope?: string} & Object.<string, *>)[]} */
      const list = response.list;
      return list.map(attributes => {
        const entityType = attributes._scope;
        if (!entityType) {
          throw new Error("No '_scope' attribute.");
        }
        attributes = _.clone(attributes);
        delete attributes['_scope'];
        const model = this.seeds[entityType].clone();
        model.set(attributes);
        return model;
      });
    }

    /** @inheritDoc */
    clone(options) {
      const collection = super.clone(options);
      collection.seeds = this.seeds;
      return collection;
    }
  }

  // noinspection JSUnusedGlobalSymbols
  var _default = _exports.default = MultiCollection;
});
//# sourceMappingURL=multi-collection.js.map ;