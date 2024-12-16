"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PreviewPane = void 0;
var _base = _interopRequireDefault(require("@emotion/styled/base"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _reactFrameComponent = _interopRequireWildcard(require("react-frame-component"));
var _decapCmsUiDefault = require("decap-cms-ui-default");
var _reactRedux = require("react-redux");
var _registry = require("../../../lib/registry");
var _EditorPreviewContent = _interopRequireDefault(require("./EditorPreviewContent.js"));
var _react2 = require("@emotion/react");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const PreviewPaneFrame = /*#__PURE__*/(0, _base.default)(_reactFrameComponent.default, {
  target: "enus48h0",
  label: "PreviewPaneFrame"
})("width:100%;height:100%;border:none;background:#fff;border-radius:", _decapCmsUiDefault.lengths.borderRadius, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0VkaXRvci9FZGl0b3JQcmV2aWV3UGFuZS9FZGl0b3JQcmV2aWV3UGFuZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVc0MiLCJmaWxlIjoiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvRWRpdG9yL0VkaXRvclByZXZpZXdQYW5lL0VkaXRvclByZXZpZXdQYW5lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgRnJhbWUsIHsgRnJhbWVDb250ZXh0Q29uc3VtZXIgfSBmcm9tICdyZWFjdC1mcmFtZS1jb21wb25lbnQnO1xuaW1wb3J0IHsgbGVuZ3RocyB9IGZyb20gJ2RlY2FwLWNtcy11aS1kZWZhdWx0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldFByZXZpZXdUZW1wbGF0ZSwgZ2V0UHJldmlld1N0eWxlcyB9IGZyb20gJy4uLy4uLy4uL2xpYi9yZWdpc3RyeSc7XG5pbXBvcnQgRWRpdG9yUHJldmlld0NvbnRlbnQgZnJvbSAnLi9FZGl0b3JQcmV2aWV3Q29udGVudC5qcyc7XG5cbmNvbnN0IFByZXZpZXdQYW5lRnJhbWUgPSBzdHlsZWQoRnJhbWUpYFxuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBib3JkZXI6IG5vbmU7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJvcmRlci1yYWRpdXM6ICR7bGVuZ3Rocy5ib3JkZXJSYWRpdXN9O1xuYDtcblxuZXhwb3J0IGNsYXNzIFByZXZpZXdQYW5lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgZW50cnksIGNvbGxlY3Rpb24sIGNvbmZpZyB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmICghZW50cnkgfHwgIWVudHJ5LmdldCgnZGF0YScpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBwcmV2aWV3Q29tcG9uZW50ID1cbiAgICAgIGdldFByZXZpZXdUZW1wbGF0ZShjb2xsZWN0aW9uLmdldCgnbmFtZScpKSB8fCAoKCkgPT4gPGRpdj5ObyBQcmV2aWV3IFRlbXBsYXRlPC9kaXY+KTtcblxuICAgIGNvbnN0IHByZXZpZXdQcm9wcyA9IHtcbiAgICAgIC4uLnRoaXMucHJvcHMsXG4gICAgICBlbnRyeSxcbiAgICAgIGRvY3VtZW50OiBudWxsLFxuICAgICAgd2luZG93OiBudWxsLFxuICAgIH07XG5cbiAgICBjb25zdCBzdHlsZUVscyA9IGdldFByZXZpZXdTdHlsZXMoKS5tYXAoKHN0eWxlLCBpKSA9PiB7XG4gICAgICBpZiAoc3R5bGUucmF3KSB7XG4gICAgICAgIHJldHVybiA8c3R5bGUga2V5PXtpfT57c3R5bGUudmFsdWV9PC9zdHlsZT47XG4gICAgICB9XG4gICAgICByZXR1cm4gPGxpbmsga2V5PXtpfSBocmVmPXtzdHlsZS52YWx1ZX0gdHlwZT1cInRleHQvY3NzXCIgcmVsPVwic3R5bGVzaGVldFwiIC8+O1xuICAgIH0pO1xuXG4gICAgY29uc3QgaW5pdGlhbENvbnRlbnQgPSBgXG48IURPQ1RZUEUgaHRtbD5cbjxodG1sPlxuICA8aGVhZD48YmFzZSB0YXJnZXQ9XCJfYmxhbmtcIi8+PC9oZWFkPlxuICA8Ym9keT48ZGl2PjwvZGl2PjwvYm9keT5cbjwvaHRtbD5cbmA7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFByZXZpZXdQYW5lRnJhbWUgaWQ9XCJwcmV2aWV3LXBhbmVcIiBoZWFkPXtzdHlsZUVsc30gaW5pdGlhbENvbnRlbnQ9e2luaXRpYWxDb250ZW50fT5cbiAgICAgICAgPEZyYW1lQ29udGV4dENvbnN1bWVyPlxuICAgICAgICAgIHsoeyBkb2N1bWVudCwgd2luZG93IH0pID0+IChcbiAgICAgICAgICAgIDxFZGl0b3JQcmV2aWV3Q29udGVudFxuICAgICAgICAgICAgICBwcmV2aWV3Q29tcG9uZW50PXtwcmV2aWV3Q29tcG9uZW50fVxuICAgICAgICAgICAgICBwcmV2aWV3UHJvcHM9e3sgLi4ucHJldmlld1Byb3BzLCBkb2N1bWVudCwgd2luZG93IH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvRnJhbWVDb250ZXh0Q29uc3VtZXI+XG4gICAgICA8L1ByZXZpZXdQYW5lRnJhbWU+XG4gICAgKTtcbiAgfVxufVxuXG5QcmV2aWV3UGFuZS5wcm9wVHlwZXMgPSB7XG4gIGVudHJ5OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIGNvbGxlY3Rpb246IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgY29uZmlnOiBQcm9wVHlwZXMub2JqZWN0LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChzdGF0ZSA9PiAoeyBjb25maWc6IHN0YXRlLmNvbmZpZyB9KSkoUHJldmlld1BhbmUpO1xuIl19 */"));
class PreviewPane extends _react.default.Component {
  render() {
    const {
      entry,
      collection,
      config
    } = this.props;
    if (!entry || !entry.get('data')) {
      return null;
    }
    const previewComponent = (0, _registry.getPreviewTemplate)(collection.get('name')) || (() => (0, _react2.jsx)("div", null, "No Preview Template"));
    const previewProps = _objectSpread(_objectSpread({}, this.props), {}, {
      entry,
      document: null,
      window: null
    });
    const styleEls = (0, _registry.getPreviewStyles)().map((style, i) => {
      if (style.raw) {
        return (0, _react2.jsx)("style", {
          key: i
        }, style.value);
      }
      return (0, _react2.jsx)("link", {
        key: i,
        href: style.value,
        type: "text/css",
        rel: "stylesheet"
      });
    });
    const initialContent = `
<!DOCTYPE html>
<html>
  <head><base target="_blank"/></head>
  <body><div></div></body>
</html>
`;
    return (0, _react2.jsx)(PreviewPaneFrame, {
      id: "preview-pane",
      head: styleEls,
      initialContent: initialContent
    }, (0, _react2.jsx)(_reactFrameComponent.FrameContextConsumer, null, ({
      document,
      window
    }) => (0, _react2.jsx)(_EditorPreviewContent.default, {
      previewComponent: previewComponent,
      previewProps: _objectSpread(_objectSpread({}, previewProps), {}, {
        document,
        window
      })
    })));
  }
}
exports.PreviewPane = PreviewPane;
PreviewPane.propTypes = {
  entry: _propTypes.default.object.isRequired,
  collection: _propTypes.default.object.isRequired,
  config: _propTypes.default.object
};
var _default = exports.default = (0, _reactRedux.connect)(state => ({
  config: state.config
}))(PreviewPane);