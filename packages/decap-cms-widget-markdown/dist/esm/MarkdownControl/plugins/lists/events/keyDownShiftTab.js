"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slate = require("slate");
var _lowestMatchedAncestor = _interopRequireDefault(require("../../matchers/lowestMatchedAncestor"));
var _matchedAncestors = _interopRequireDefault(require("../../matchers/matchedAncestors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function keyDownShiftTab(editor) {
  if (!editor.selection) return;
  if (Array.from(_slate.Editor.nodes(editor, (0, _matchedAncestors.default)(editor, 'list'))).length < 2) {
    return;
  }
  _slate.Editor.withoutNormalizing(editor, () => {
    _slate.Transforms.liftNodes(editor, _objectSpread(_objectSpread({}, (0, _lowestMatchedAncestor.default)(editor, 'list-item')), {}, {
      split: true
    }));
    _slate.Transforms.liftNodes(editor, _objectSpread(_objectSpread({}, (0, _lowestMatchedAncestor.default)(editor, 'list-item')), {}, {
      split: true
    }));
  });
  _slate.Editor.normalize(editor);
}
var _default = exports.default = keyDownShiftTab;