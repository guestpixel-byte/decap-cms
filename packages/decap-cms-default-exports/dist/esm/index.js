"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DecapCmsDefaultExports = void 0;
var _react = require("@emotion/react");
var _styled = _interopRequireDefault(require("@emotion/styled"));
var _immutable = _interopRequireDefault(require("immutable"));
var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));
var _lodash = _interopRequireDefault(require("lodash/lodash"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react2 = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var UUId = _interopRequireWildcard(require("uuid"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// eslint-disable-next-line @emotion/no-vanilla

const EmotionCore = {
  css: _react.css,
  withEmotionCache: _react.withEmotionCache,
  CacheProvider: _react.CacheProvider,
  ThemeContext: _react.ThemeContext,
  jsx: _react.jsx,
  Global: _react.Global,
  keyframes: _react.keyframes,
  ClassNames: _react.ClassNames
};
const DecapCmsDefaultExports = exports.DecapCmsDefaultExports = {
  EmotionCore,
  EmotionStyled: _styled.default,
  Immutable: _immutable.default,
  ImmutablePropTypes: _reactImmutableProptypes.default,
  Lodash: _lodash.default,
  PropTypes: _propTypes.default,
  React: _react2.default,
  ReactDOM: _reactDom.default,
  UUId
};