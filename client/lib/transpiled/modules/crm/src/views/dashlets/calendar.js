define("modules/crm/views/dashlets/calendar", ["exports", "views/dashlets/abstract/base"], function (_exports, _base) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _base = _interopRequireDefault(_base);
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

  class CalendarDashletView extends _base.default {
    name = 'Calendar';
    noPadding = true;
    templateContent = `<div class="calendar-container">{{{calendar}}}</div>`;
    afterRender() {
      const mode = this.getOption('mode');
      if (mode === 'timeline') {
        const userList = [];
        const userIdList = this.getOption('usersIds') || [];
        const userNames = this.getOption('usersNames') || {};
        userIdList.forEach(id => {
          userList.push({
            id: id,
            name: userNames[id] || id
          });
        });
        const viewName = this.getMetadata().get(['clientDefs', 'Calendar', 'timelineView']) || 'crm:views/calendar/timeline';
        this.createView('calendar', viewName, {
          selector: '> .calendar-container',
          header: false,
          calendarType: 'shared',
          userList: userList,
          enabledScopeList: this.getOption('enabledScopeList'),
          suppressLoadingAlert: true
        }, view => {
          view.render();
        });
        return;
      }
      let teamIdList = null;
      if (['basicWeek', 'month', 'basicDay'].includes(mode)) {
        teamIdList = this.getOption('teamsIds');
      }
      const viewName = this.getMetadata().get(['clientDefs', 'Calendar', 'calendarView']) || 'crm:views/calendar/calendar';
      this.createView('calendar', viewName, {
        mode: mode,
        selector: '> .calendar-container',
        header: false,
        enabledScopeList: this.getOption('enabledScopeList'),
        containerSelector: this.getSelector(),
        teamIdList: teamIdList,
        scrollToNowSlots: 3,
        suppressLoadingAlert: true
      }, view => {
        this.listenTo(view, 'view', () => {
          if (this.getOption('mode') === 'month') {
            const title = this.getOption('title');
            const $container = $('<span>').append($('<span>').text(title), ' <span class="chevron-right"></span> ', $('<span>').text(view.getTitle()));
            const $headerSpan = this.$el.closest('.panel').find('.panel-heading > .panel-title > span');
            $headerSpan.html($container.get(0).innerHTML);
          }
        });
        view.render();
        this.on('resize', () => {
          setTimeout(() => view.adjustSize(), 50);
        });
      });
    }
    setupActionList() {
      this.actionList.unshift({
        name: 'viewCalendar',
        text: this.translate('View Calendar', 'labels', 'Calendar'),
        url: '#Calendar',
        iconHtml: '<span class="far fa-calendar-alt"></span>',
        onClick: () => this.actionViewCalendar()
      });
    }
    setupButtonList() {
      if (this.getOption('mode') !== 'timeline') {
        this.buttonList.push({
          name: 'previous',
          html: '<span class="fas fa-chevron-left"></span>',
          onClick: () => this.actionPrevious()
        });
        this.buttonList.push({
          name: 'next',
          html: '<span class="fas fa-chevron-right"></span>',
          onClick: () => this.actionNext()
        });
      }
    }

    /**
     * @return {
     *     import('modules/crm/views/calendar/calendar').default |
     *     import('modules/crm/views/calendar/timeline').default
     * }
     */
    getCalendarView() {
      return this.getView('calendar');
    }
    actionRefresh() {
      const view = this.getCalendarView();
      if (!view) {
        return;
      }
      view.actionRefresh();
    }
    autoRefresh() {
      const view = this.getCalendarView();
      if (!view) {
        return;
      }
      view.actionRefresh({
        suppressLoadingAlert: true
      });
    }
    actionNext() {
      const view = this.getCalendarView();
      if (!view) {
        return;
      }
      view.actionNext();
    }
    actionPrevious() {
      const view = this.getCalendarView();
      if (!view) {
        return;
      }
      view.actionPrevious();
    }
    actionViewCalendar() {
      this.getRouter().navigate('#Calendar', {
        trigger: true
      });
    }
  }
  var _default = _exports.default = CalendarDashletView;
});
//# sourceMappingURL=calendar.js.map ;