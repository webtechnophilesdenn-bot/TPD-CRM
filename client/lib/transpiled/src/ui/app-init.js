define("ui/app-init", ["exports", "jquery"], function (_exports, _jquery) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _jquery = _interopRequireDefault(_jquery);
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

  function uiAppInit() {
    const $document = (0, _jquery.default)(document);
    const topSpaceHeight = 100;
    $document.on('keydown.espo.button', e => {
      if (e.code !== 'Enter' || e.target.tagName !== 'A' || e.target.getAttribute('role') !== 'button' || e.target.getAttribute('href') || e.ctrlKey || e.altKey || e.metaKey) {
        return;
      }
      (0, _jquery.default)(e.target).click();
      e.preventDefault();
    });
    $document.on('hidden.bs.dropdown', e => {
      (0, _jquery.default)(e.target).removeClass('dropup');
    });
    $document.on('show.bs.dropdown', e => {
      let isUp;

      /** @type {HTMLElement} */
      const target = e.target;
      const $dropdown = (0, _jquery.default)(e.target).find('.dropdown-menu');

      /** @type {HTMLElement} */
      const dropdownElement = $dropdown.get(0);
      if (!dropdownElement) {
        return;
      }
      const height = $dropdown.outerHeight();
      const width = $dropdown.outerWidth();
      {
        const $target = (0, _jquery.default)(target);
        const windowHeight = (0, _jquery.default)(window).height();
        const top = e.target.getBoundingClientRect().bottom;
        const spaceBelow = windowHeight - (top + height);
        isUp = spaceBelow < 0 && top - topSpaceHeight > height;
        if ($target.hasClass('more') || $target.hasClass('tab')) {
          return;
        }
        if (isUp) {
          $target.addClass('dropup');
        } else {
          $target.removeClass('dropup');
        }
      }
      if (dropdownElement.classList.contains('pull-right') && target.getBoundingClientRect().left - width < 0) {
        const maxWidth = target.getBoundingClientRect().right - target.getBoundingClientRect().width / 2;
        dropdownElement.style.maxWidth = maxWidth + 'px';
        const $group = (0, _jquery.default)(target);
        $group.one('hidden.bs.dropdown', () => {
          dropdownElement.style.maxWidth = '';
        });
        return;
      }
      const $dashletBody = (0, _jquery.default)(target).closest('.dashlet-body');
      if ($dashletBody.length) {
        const $body = $dashletBody;
        (0, _jquery.default)(target).removeClass('dropup');
        const $group = (0, _jquery.default)(target);
        const rect = target.getBoundingClientRect();
        const $ul = $group.find('.dropdown-menu');
        const isRight = target.classList.contains('pull-right');
        const $toggle = $group.find('.dropdown-toggle');
        $body.on('scroll.dd', () => {
          if ($group.hasClass('open')) {
            // noinspection JSUnresolvedReference
            $toggle.dropdown('toggle');
            $body.off('scroll.dd');
          }
        });
        $group.one('hidden.bs.dropdown', () => {
          $body.off('scroll.dd');
        });
        const left = isRight ? rect.left - $ul.outerWidth() + rect.width : rect.left;
        const top = isUp ? rect.top - height : rect.top + target.getBoundingClientRect().height;
        $ul.css({
          position: 'fixed',
          top: top,
          left: left,
          right: 'auto'
        });
        return;
      }
      if (e.target.parentElement.classList.contains('fix-overflow')) {
        (0, _jquery.default)(target).removeClass('dropup');
        const isRight = e.target.classList.contains('pull-right');
        const $ul = (0, _jquery.default)(e.target.parentElement).find('.dropdown-menu');
        const rect = e.target.getBoundingClientRect();
        const parent = $ul.offsetParent().get(0);
        if (!parent) {
          return;
        }
        const scrollTop = parent === window.document.documentElement ? document.documentElement.scrollTop || document.body.scrollTop : parent.scrollTop;
        const top = isUp ? rect.top + scrollTop - height : rect.top + scrollTop + e.target.getBoundingClientRect().height;
        const left = isRight ? rect.left - $ul.outerWidth() + rect.width : rect.left;
        $ul.css({
          top: top,
          left: left,
          right: 'auto'
        });
      }
    });
  }
  var _default = _exports.default = uiAppInit;
});
//# sourceMappingURL=app-init.js.map ;