"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _immutable = require("immutable");
var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));
var _decapCmsUiDefault = require("decap-cms-ui-default");
var _react2 = require("@emotion/react");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ListPreview({
  values
}) {
  return (0, _react2.jsx)("ul", null, values.map((value, idx) => (0, _react2.jsx)("li", {
    key: idx
  }, value)));
}
function SelectPreview({
  value
}) {
  return (0, _react2.jsx)(_decapCmsUiDefault.WidgetPreviewContainer, null, value && (_immutable.List.isList(value) ? (0, _react2.jsx)(ListPreview, {
    values: value
  }) : value), !value && null);
}
SelectPreview.propTypes = {
  value: _propTypes.default.oneOfType([_propTypes.default.string, _reactImmutableProptypes.default.list])
};
var _default = exports.default = SelectPreview;