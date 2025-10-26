define("views/admin/entity-manager/modals/select-formula", ["exports", "views/modal"], function (_exports, _modal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _modal = _interopRequireDefault(_modal);
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

  class _default extends _modal.default {
    // language=Handlebars
    templateContent = `
        <div class="panel no-side-margin">
            <table class="table table-bordered">
                {{#each typeList}}
                <tr>
                    <td style="width: 40%">
                        <a
                            class="btn btn-default btn-lg btn-full-wide"
                            href="#Admin/entityManager/formula&scope={{../scope}}&type={{this}}"
                        >
                        {{translate this category='fields' scope='EntityManager'}}
                        </a>
                    </td>
                    <td style="width: 60%">
                        <div class="complex-text">{{complexText (translate this category='messages' scope='EntityManager')}}
                    </td>
                </tr>
                {{/each}}
            </table>
        </div>
    `;
    backdrop = true;
    data() {
      return {
        typeList: this.typeList,
        scope: this.scope
      };
    }
    setup() {
      this.scope = this.options.scope;
      this.typeList = ['beforeSaveCustomScript', 'beforeSaveApiScript'];
      this.headerText = this.translate('Formula', 'labels', 'EntityManager');
    }
  }
  _exports.default = _default;
});
//# sourceMappingURL=select-formula.js.map ;