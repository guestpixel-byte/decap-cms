"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("@emotion/styled/base"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));
var _react2 = require("@emotion/react");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
function isVisible(field) {
  return field.get('widget') !== 'hidden';
}
const PreviewContainer = /*#__PURE__*/(0, _base.default)("div", {
  target: "e1iji6y40",
  label: "PreviewContainer"
})(process.env.NODE_ENV === "production" ? {
  name: "9bq7s9",
  styles: "font-family:Roboto,'Helvetica Neue',HelveticaNeue,Helvetica,Arial,sans-serif"
} : {
  name: "9bq7s9",
  styles: "font-family:Roboto,'Helvetica Neue',HelveticaNeue,Helvetica,Arial,sans-serif",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0VkaXRvci9FZGl0b3JQcmV2aWV3UGFuZS9FZGl0b3JQcmV2aWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNtQyIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9FZGl0b3IvRWRpdG9yUHJldmlld1BhbmUvRWRpdG9yUHJldmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcblxuZnVuY3Rpb24gaXNWaXNpYmxlKGZpZWxkKSB7XG4gIHJldHVybiBmaWVsZC5nZXQoJ3dpZGdldCcpICE9PSAnaGlkZGVuJztcbn1cblxuY29uc3QgUHJldmlld0NvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGZvbnQtZmFtaWx5OiBSb2JvdG8sICdIZWx2ZXRpY2EgTmV1ZScsIEhlbHZldGljYU5ldWUsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7XG5gO1xuXG4vKipcbiAqIFVzZSBhIHN0YXRlZnVsIGNvbXBvbmVudCBzbyB0aGF0IGNoaWxkIGNvbXBvbmVudHMgY2FuIGVmZmVjdGl2ZWx5IHV0aWxpemVcbiAqIGBzaG91bGRDb21wb25lbnRVcGRhdGVgLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmV2aWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY29sbGVjdGlvbiwgZmllbGRzLCB3aWRnZXRGb3IgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFjb2xsZWN0aW9uIHx8ICFmaWVsZHMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8UHJldmlld0NvbnRhaW5lcj5cbiAgICAgICAge2ZpZWxkcy5maWx0ZXIoaXNWaXNpYmxlKS5tYXAoZmllbGQgPT4ge1xuICAgICAgICAgIC8vIER5bmFtaWNhbGx5IHBhc3NpbmcgY2xhc3NlcyB2aWEgd2lkZ2V0Rm9yXG4gICAgICAgICAgY29uc3QgZmllbGROYW1lID0gZmllbGQuZ2V0KCduYW1lJyk7XG4gICAgICAgICAgY29uc3QgZmllbGRDbGFzcyA9IGZpZWxkLmdldCgnd2lkZ2V0Jyk7IC8vIFlvdSBjYW4gbW9kaWZ5IHRoaXMgdG8gc2V0IGN1c3RvbSBjbGFzcyBiYXNlZCBvbiB0aGUgd2lkZ2V0IHR5cGVcblxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGtleT17ZmllbGROYW1lfSBjbGFzc05hbWU9e2BmaWVsZC13cmFwcGVyICR7ZmllbGRDbGFzc31gfT5cbiAgICAgICAgICAgICAge3dpZGdldEZvcihmaWVsZE5hbWUpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSl9XG4gICAgICA8L1ByZXZpZXdDb250YWluZXI+XG4gICAgKTtcbiAgfVxufVxuXG5QcmV2aWV3LnByb3BUeXBlcyA9IHtcbiAgY29sbGVjdGlvbjogSW1tdXRhYmxlUHJvcFR5cGVzLm1hcC5pc1JlcXVpcmVkLFxuICBlbnRyeTogSW1tdXRhYmxlUHJvcFR5cGVzLm1hcC5pc1JlcXVpcmVkLFxuICBmaWVsZHM6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gIGdldEFzc2V0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICB3aWRnZXRGb3I6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});

/**
 * Use a stateful component so that child components can effectively utilize
 * `shouldComponentUpdate`.
 */
class Preview extends _react.default.Component {
  render() {
    const {
      collection,
      fields,
      widgetFor
    } = this.props;
    if (!collection || !fields) {
      return null;
    }
    return (0, _react2.jsx)(PreviewContainer, null, fields.filter(isVisible).map(field => {
      // Dynamically passing classes via widgetFor
      const fieldName = field.get('name');
      const fieldClass = field.get('widget'); // You can modify this to set custom class based on the widget type

      return (0, _react2.jsx)("div", {
        key: fieldName,
        className: `field-wrapper ${fieldClass}`
      }, widgetFor(fieldName));
    }));
  }
}
exports.default = Preview;
Preview.propTypes = {
  collection: _reactImmutableProptypes.default.map.isRequired,
  entry: _reactImmutableProptypes.default.map.isRequired,
  fields: _reactImmutableProptypes.default.list.isRequired,
  getAsset: _propTypes.default.func.isRequired,
  widgetFor: _propTypes.default.func.isRequired
};