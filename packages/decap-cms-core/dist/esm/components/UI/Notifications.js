"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _injectStyle = require("react-toastify/dist/inject-style");
var _reactToastify = require("react-toastify");
var _reactRedux = require("react-redux");
var _reactPolyglot = require("react-polyglot");
var _notifications = require("../../actions/notifications");
var _react2 = require("@emotion/react");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // eslint-disable-next-line no-unused-vars
// import { translate } from 'react-polyglot';
(0, _injectStyle.injectStyle)();
function Notifications({
  notifications
}) {
  const t = (0, _reactPolyglot.useTranslate)();
  const dispatch = (0, _reactRedux.useDispatch)();
  const [idMap, setIdMap] = _react.default.useState({});
  (0, _react.useEffect)(() => {
    notifications.filter(notification => !idMap[notification.id]).forEach(notification => {
      const toastId = (0, _reactToastify.toast)(typeof notification.message == 'string' ? notification.message : t(notification.message.key, _objectSpread({}, notification.message)), {
        autoClose: notification.dismissAfter,
        type: notification.type
      });
      idMap[notification.id] = toastId;
      setIdMap(idMap);
      if (notification.dismissAfter) {
        setTimeout(() => {
          dispatch((0, _notifications.dismissNotification)(notification.id));
        }, notification.dismissAfter);
      }
    });
    Object.entries(idMap).forEach(([id, toastId]) => {
      if (!notifications.find(notification => notification.id === id)) {
        _reactToastify.toast.dismiss(toastId);
        delete idMap[id];
        setIdMap(idMap);
      }
    });
  }, [notifications]);
  _reactToastify.toast.onChange(payload => {
    if (payload.status == 'removed') {
      var _Object$entries$find;
      const id = (_Object$entries$find = Object.entries(idMap).find(([, toastId]) => toastId === payload.id)) === null || _Object$entries$find === void 0 ? void 0 : _Object$entries$find[0];
      if (id) {
        dispatch((0, _notifications.dismissNotification)(id));
      }
    }
  });
  return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)(_reactToastify.ToastContainer, {
    position: "top-right",
    theme: "colored",
    className: "notif__container"
  }));
}
function mapStateToProps({
  notifications
}) {
  return {
    notifications: notifications.notifications
  };
}
var _default = exports.default = (0, _reactRedux.connect)(mapStateToProps)(Notifications);