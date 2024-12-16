"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react2 = require("@emotion/react");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function EditorPreview({
  entry
}) {
  const data = entry.get('data').toJS();
  return (0, _react2.jsx)("div", null, (0, _react2.jsx)("h1", null, data.title || 'No Title'), (0, _react2.jsx)("p", null, data.body || 'No Content'));
}
EditorPreview.propTypes = {
  entry: _propTypes.default.object.isRequired
};
var _default = exports.default = EditorPreview;