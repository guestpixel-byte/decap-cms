"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mapValues = _interopRequireDefault(require("lodash/mapValues"));
var _index = _interopRequireDefault(require("./images/_index"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * This module outputs icon objects with the following shape:
 *
 * {
 *   image: <svg>...</svg>,
 *   ...props
 * }
 *
 * `props` here are config properties defined in this file for specific icons.
 * For example, an icon may face a specific direction, and the Icon component
 * accepts a `direction` prop to rotate directional icons, which relies on
 * defining the default direction here.
 */

/**
 * Configuration for individual icons.
 */
const config = {
  arrow: {
    direction: 'left'
  },
  chevron: {
    direction: 'down'
  },
  'chevron-double': {
    direction: 'down'
  }
};

/**
 * Map icon definition objects - imported object of images simply maps the icon
 * name to the raw svg, so we move that to the `image` property of the
 * definition object and set any additional configured properties for each icon.
 */
const icons = (0, _mapValues.default)(_index.default, (image, name) => {
  const props = config[name] || {};
  return _objectSpread({
    image
  }, props);
});
var _default = exports.default = icons;