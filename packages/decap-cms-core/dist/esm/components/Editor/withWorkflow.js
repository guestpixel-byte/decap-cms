"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withWorkflow;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _publishModes = require("../../constants/publishModes");
var _reducers = require("../../reducers");
var _collections = require("../../reducers/collections");
var _editorialWorkflow = require("../../actions/editorialWorkflow");
var _react2 = require("@emotion/react");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function mapStateToProps(state, ownProps) {
  const {
    collections
  } = state;
  const isEditorialWorkflow = state.config.publish_mode === _publishModes.EDITORIAL_WORKFLOW;
  const collection = collections.get(ownProps.match.params.name);
  const returnObj = {
    isEditorialWorkflow,
    showDelete: !ownProps.newEntry && (0, _collections.selectAllowDeletion)(collection)
  };
  if (isEditorialWorkflow) {
    const slug = ownProps.match.params[0];
    const unpublishedEntry = (0, _reducers.selectUnpublishedEntry)(state, collection.get('name'), slug);
    if (unpublishedEntry) {
      returnObj.unpublishedEntry = true;
      returnObj.entry = unpublishedEntry;
    }
  }
  return returnObj;
}
function mergeProps(stateProps, dispatchProps, ownProps) {
  const {
    isEditorialWorkflow,
    unpublishedEntry
  } = stateProps;
  const {
    dispatch
  } = dispatchProps;
  const returnObj = {};
  if (isEditorialWorkflow) {
    // Overwrite loadEntry to loadUnpublishedEntry
    returnObj.loadEntry = (collection, slug) => dispatch((0, _editorialWorkflow.loadUnpublishedEntry)(collection, slug));

    // Overwrite persistEntry to persistUnpublishedEntry
    returnObj.persistEntry = collection => dispatch((0, _editorialWorkflow.persistUnpublishedEntry)(collection, unpublishedEntry));
  }
  return _objectSpread(_objectSpread(_objectSpread({}, ownProps), stateProps), returnObj);
}
function withWorkflow(Editor) {
  return (0, _reactRedux.connect)(mapStateToProps, null, mergeProps)(class WorkflowEditor extends _react.default.Component {
    render() {
      return (0, _react2.jsx)(Editor, this.props);
    }
  });
}