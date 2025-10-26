define("views/user/detail", ["exports", "views/detail"], function (_exports, _detail) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _detail = _interopRequireDefault(_detail);
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

  class _default extends _detail.default {
    setup() {
      super.setup();
      if (this.getUser().isPortal()) {
        this.rootLinkDisabled = true;
      }
      if (this.model.id === this.getUser().id || this.getUser().isAdmin()) {
        if (this.getUserModel().isRegular() || this.getUserModel().isAdmin() || this.getUserModel().isPortal()) {
          this.addMenuItem('dropdown', {
            name: 'preferences',
            label: 'Preferences',
            action: 'preferences',
            link: `#Preferences/edit/${this.model.id}`,
            onClick: () => this.actionPreferences()
          });
        }
        if (this.getUserModel().isRegular() || this.getUserModel().isAdmin()) {
          if (this.getAcl().check('EmailAccountScope') && this.model.id === this.getUser().id || this.getUser().isAdmin()) {
            this.addMenuItem('dropdown', {
              name: 'emailAccounts',
              label: "Email Accounts",
              action: 'emailAccounts',
              link: `#EmailAccount/list/userId=${this.model.id}` + `&userName=${encodeURIComponent(this.model.attributes.name)}`,
              onClick: () => this.actionEmailAccounts()
            });
          }
          if (this.model.id === this.getUser().id && this.getAcl().checkScope('ExternalAccount')) {
            this.addMenuItem('buttons', {
              name: 'externalAccounts',
              label: 'External Accounts',
              action: 'externalAccounts',
              link: '#ExternalAccount',
              onClick: () => this.actionExternalAccounts()
            });
          }
        }
      }
      if (this.getAcl().checkScope('Calendar') && (this.getUserModel().isRegular() || this.getUserModel().isAdmin())) {
        const showActivities = this.getAcl().checkPermission('userCalendar', this.getUserModel());
        if (!showActivities && this.getAcl().getPermissionLevel('userCalendar') === 'team' && !this.model.has('teamsIds')) {
          this.listenToOnce(this.model, 'sync', () => {
            if (this.getAcl().checkPermission('userCalendar', this.getUserModel())) {
              this.showHeaderActionItem('calendar');
            }
          });
        }
        this.addMenuItem('buttons', {
          name: 'calendar',
          iconHtml: '<span class="far fa-calendar-alt"></span>',
          text: this.translate('Calendar', 'scopeNames'),
          link: `#Calendar/show/userId=${this.model.id}` + `&userName=${encodeURIComponent(this.model.attributes.name)}`,
          hidden: !showActivities
        });
      }
    }

    /**
     * @type {import('models/user').default}
     */
    getUserModel() {
      return /** @type {import('models/user').default} */this.model;
    }
    actionPreferences() {
      this.getRouter().navigate(`#Preferences/edit/${this.model.id}`, {
        trigger: true
      });
    }
    actionEmailAccounts() {
      this.getRouter().navigate(`#EmailAccount/list/userId=${this.model.id}&userName=${encodeURIComponent(this.model.attributes.name)}`, {
        trigger: true
      });
    }
    actionExternalAccounts() {
      this.getRouter().navigate('#ExternalAccount', {
        trigger: true
      });
    }
  }
  _exports.default = _default;
});
//# sourceMappingURL=detail.js.map ;