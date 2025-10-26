define("helpers/action-item-setup", ["exports", "di", "metadata", "view-helper", "acl-manager", "language"], function (_exports, _di, _metadata, _viewHelper, _aclManager, _language) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _metadata = _interopRequireDefault(_metadata);
  _viewHelper = _interopRequireDefault(_viewHelper);
  _aclManager = _interopRequireDefault(_aclManager);
  _language = _interopRequireDefault(_language);
  var _staticBlock;
  let _init_metadata, _init_extra_metadata, _init_viewHelper, _init_extra_viewHelper, _init_acl, _init_extra_acl, _init_language, _init_extra_language;
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
  function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
  function _applyDecs(e, t, n, r, o, i) { var a, c, u, s, f, l, p, d = Symbol.metadata || Symbol.for("Symbol.metadata"), m = Object.defineProperty, h = Object.create, y = [h(null), h(null)], v = t.length; function g(t, n, r) { return function (o, i) { n && (i = o, o = e); for (var a = 0; a < t.length; a++) i = t[a].apply(o, r ? [i] : []); return r ? i : o; }; } function b(e, t, n, r) { if ("function" != typeof e && (r || void 0 !== e)) throw new TypeError(t + " must " + (n || "be") + " a function" + (r ? "" : " or undefined")); return e; } function applyDec(e, t, n, r, o, i, u, s, f, l, p) { function d(e) { if (!p(e)) throw new TypeError("Attempted to access private element on non-instance"); } var h = [].concat(t[0]), v = t[3], w = !u, D = 1 === o, S = 3 === o, j = 4 === o, E = 2 === o; function I(t, n, r) { return function (o, i) { return n && (i = o, o = e), r && r(o), P[t].call(o, i); }; } if (!w) { var P = {}, k = [], F = S ? "get" : j || D ? "set" : "value"; if (f ? (l || D ? P = { get: _setFunctionName(function () { return v(this); }, r, "get"), set: function (e) { t[4](this, e); } } : P[F] = v, l || _setFunctionName(P[F], r, E ? "" : F)) : l || (P = Object.getOwnPropertyDescriptor(e, r)), !l && !f) { if ((c = y[+s][r]) && 7 !== (c ^ o)) throw Error("Decorating two elements with the same name (" + P[F].name + ") is not supported yet"); y[+s][r] = o < 3 ? 1 : o; } } for (var N = e, O = h.length - 1; O >= 0; O -= n ? 2 : 1) { var T = b(h[O], "A decorator", "be", !0), z = n ? h[O - 1] : void 0, A = {}, H = { kind: ["field", "accessor", "method", "getter", "setter", "class"][o], name: r, metadata: a, addInitializer: function (e, t) { if (e.v) throw new TypeError("attempted to call addInitializer after decoration was finished"); b(t, "An initializer", "be", !0), i.push(t); }.bind(null, A) }; if (w) c = T.call(z, N, H), A.v = 1, b(c, "class decorators", "return") && (N = c);else if (H.static = s, H.private = f, c = H.access = { has: f ? p.bind() : function (e) { return r in e; } }, j || (c.get = f ? E ? function (e) { return d(e), P.value; } : I("get", 0, d) : function (e) { return e[r]; }), E || S || (c.set = f ? I("set", 0, d) : function (e, t) { e[r] = t; }), N = T.call(z, D ? { get: P.get, set: P.set } : P[F], H), A.v = 1, D) { if ("object" == typeof N && N) (c = b(N.get, "accessor.get")) && (P.get = c), (c = b(N.set, "accessor.set")) && (P.set = c), (c = b(N.init, "accessor.init")) && k.unshift(c);else if (void 0 !== N) throw new TypeError("accessor decorators must return an object with get, set, or init properties or undefined"); } else b(N, (l ? "field" : "method") + " decorators", "return") && (l ? k.unshift(N) : P[F] = N); } return o < 2 && u.push(g(k, s, 1), g(i, s, 0)), l || w || (f ? D ? u.splice(-1, 0, I("get", s), I("set", s)) : u.push(E ? P[F] : b.call.bind(P[F])) : m(e, r, P)), N; } function w(e) { return m(e, d, { configurable: !0, enumerable: !0, value: a }); } return void 0 !== i && (a = i[d]), a = h(null == a ? null : a), f = [], l = function (e) { e && f.push(g(e)); }, p = function (t, r) { for (var i = 0; i < n.length; i++) { var a = n[i], c = a[1], l = 7 & c; if ((8 & c) == t && !l == r) { var p = a[2], d = !!a[3], m = 16 & c; applyDec(t ? e : e.prototype, a, m, d ? "#" + p : _toPropertyKey(p), l, l < 2 ? [] : t ? s = s || [] : u = u || [], f, !!t, d, r, t && d ? function (t) { return _checkInRHS(t) === e; } : o); } } }, p(8, 0), p(0, 0), p(8, 1), p(0, 1), l(u), l(s), c = f, v || w(e), { e: c, get c() { var n = []; return v && [w(e = applyDec(e, [t], r, e.name, 5, n)), g(n, 1)]; } }; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _setFunctionName(e, t, n) { "symbol" == typeof t && (t = (t = t.description) ? "[" + t + "]" : ""); try { Object.defineProperty(e, "name", { configurable: !0, value: n ? n + " " + t : t }); } catch (e) {} return e; }
  function _checkInRHS(e) { if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (null !== e ? typeof e : "null")); return e; }
  /** @module helpers/action-item-setup */

  class ActionItemSetupHelper {
    constructor() {
      _init_extra_language(this);
    }
    /**
     * @private
     * @type {Metadata}
     */
    metadata = _init_metadata(this);

    /**
     * @private
     * @type {ViewHelper}
     */
    viewHelper = (_init_extra_metadata(this), _init_viewHelper(this));

    /**
     * @private
     * @type {AclManager}
     */
    acl = (_init_extra_viewHelper(this), _init_acl(this));

    /**
     * @private
     * @type {Language}
     */
    language = (_init_extra_acl(this), _init_language(this));

    /**
     * @param {module:view} view
     * @param {string} type
     * @param {function(Promise): void} waitFunc
     * @param {function(Object): void} addFunc
     * @param {function(string): void} showFunc
     * @param {function(string): void} hideFunc
     * @param {{listenToViewModelSync?: boolean}} [options]
     */
    setup(view, type, waitFunc, addFunc, showFunc, hideFunc, options) {
      options = options || {};
      const actionList = [];

      // noinspection JSUnresolvedReference
      const scope = view.scope || view.model.entityType;
      if (!scope) {
        throw new Error();
      }
      const actionDefsList = [...(this.metadata.get(['clientDefs', 'Global', type + 'ActionList']) || []), ...(this.metadata.get(['clientDefs', scope, type + 'ActionList']) || [])];
      actionDefsList.forEach(item => {
        if (typeof item === 'string') {
          item = {
            name: item
          };
        }
        item = Espo.Utils.cloneDeep(item);
        const name = item.name;
        if (!item.label) {
          item.html = this.language.translate(name, 'actions', scope);
        }
        item.data = item.data || {};
        const handlerName = item.handler || item.data.handler;
        if (handlerName && !item.data.handler) {
          item.data.handler = handlerName;
        }
        addFunc(item);
        if (!Espo.Utils.checkActionAvailability(this.viewHelper, item)) {
          return;
        }
        if (!Espo.Utils.checkActionAccess(this.acl, view.model, item, true)) {
          item.hidden = true;
        }
        actionList.push(item);
        if (!handlerName) {
          return;
        }
        if (!item.initFunction && !item.checkVisibilityFunction) {
          return;
        }
        waitFunc(new Promise(resolve => {
          Espo.loader.require(handlerName, Handler => {
            const handler = new Handler(view);
            if (item.initFunction) {
              handler[item.initFunction].call(handler);
            }
            if (item.checkVisibilityFunction) {
              const isNotVisible = !handler[item.checkVisibilityFunction].call(handler);
              if (isNotVisible) {
                hideFunc(item.name);
              }
            }
            item.handlerInstance = handler;
            resolve();
          });
        }));
      });
      if (!actionList.length) {
        return;
      }
      const onSync = () => {
        actionList.forEach(item => {
          if (item.handlerInstance && item.checkVisibilityFunction) {
            const isNotVisible = !item.handlerInstance[item.checkVisibilityFunction].call(item.handlerInstance);
            if (isNotVisible) {
              hideFunc(item.name);
              return;
            }
          }
          if (Espo.Utils.checkActionAccess(this.acl, view.model, item, true)) {
            showFunc(item.name);
            return;
          }
          hideFunc(item.name);
        });
      };
      if (options.listenToViewModelSync) {
        view.listenTo(view, 'model-sync', () => onSync());
        return;
      }
      view.listenTo(view.model, 'sync', () => onSync());
    }
    static #_ = _staticBlock = () => [_init_metadata, _init_extra_metadata, _init_viewHelper, _init_extra_viewHelper, _init_acl, _init_extra_acl, _init_language, _init_extra_language] = _applyDecs(this, [], [[(0, _di.inject)(_metadata.default), 0, "metadata"], [(0, _di.inject)(_viewHelper.default), 0, "viewHelper"], [(0, _di.inject)(_aclManager.default), 0, "acl"], [(0, _di.inject)(_language.default), 0, "language"]]).e;
  }
  _staticBlock();
  var _default = _exports.default = ActionItemSetupHelper;
});
//# sourceMappingURL=action-item-setup.js.map ;