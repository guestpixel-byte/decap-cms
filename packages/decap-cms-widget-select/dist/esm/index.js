"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DecapCmsWidgetSelect = void 0;
var _SelectControl = _interopRequireDefault(require("./SelectControl"));
var _SelectPreview = _interopRequireDefault(require("./SelectPreview"));
var _schema = _interopRequireDefault(require("./schema"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function Widget(opts = {}) {
  return _objectSpread({
    name: 'select',
    controlComponent: _SelectControl.default,
    previewComponent: _SelectPreview.default,
    schema: _schema.default
  }, opts);
}
const DecapCmsWidgetSelect = exports.DecapCmsWidgetSelect = {
  Widget,
  controlComponent: _SelectControl.default,
  previewComponent: _SelectPreview.default
};
var _default = exports.default = DecapCmsWidgetSelect;