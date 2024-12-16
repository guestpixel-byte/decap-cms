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
})("width:100%;height:100%;border:none;background:#fff;border-radius:", _decapCmsUiDefault.lengths.borderRadius, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0VkaXRvci9FZGl0b3JQcmV2aWV3UGFuZS9FZGl0b3JQcmV2aWV3UGFuZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVc0MiLCJmaWxlIjoiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvRWRpdG9yL0VkaXRvclByZXZpZXdQYW5lL0VkaXRvclByZXZpZXdQYW5lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgRnJhbWUsIHsgRnJhbWVDb250ZXh0Q29uc3VtZXIgfSBmcm9tICdyZWFjdC1mcmFtZS1jb21wb25lbnQnO1xuaW1wb3J0IHsgbGVuZ3RocyB9IGZyb20gJ2RlY2FwLWNtcy11aS1kZWZhdWx0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldFByZXZpZXdUZW1wbGF0ZSwgZ2V0UHJldmlld1N0eWxlcyB9IGZyb20gJy4uLy4uLy4uL2xpYi9yZWdpc3RyeSc7XG5pbXBvcnQgRWRpdG9yUHJldmlld0NvbnRlbnQgZnJvbSAnLi9FZGl0b3JQcmV2aWV3Q29udGVudC5qcyc7XG5cbmNvbnN0IFByZXZpZXdQYW5lRnJhbWUgPSBzdHlsZWQoRnJhbWUpYFxuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBib3JkZXI6IG5vbmU7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJvcmRlci1yYWRpdXM6ICR7bGVuZ3Rocy5ib3JkZXJSYWRpdXN9O1xuYDtcblxuZXhwb3J0IGNsYXNzIFByZXZpZXdQYW5lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgZW50cnksIGNvbGxlY3Rpb24sIGNvbmZpZywgd2lkZ2V0c0ZvciB9ID0gdGhpcy5wcm9wcztcblxuICAgIC8vIEVuc3VyZSB0aGUgZW50cnkgZGF0YSBleGlzdHNcbiAgICBpZiAoIWVudHJ5IHx8ICFlbnRyeS5nZXQoJ2RhdGEnKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gRmV0Y2ggdGhlIHByZXZpZXcgdGVtcGxhdGUgZm9yIHRoZSBjb2xsZWN0aW9uXG4gICAgY29uc3QgY29sbGVjdGlvbk5hbWUgPSBjb2xsZWN0aW9uLmdldCgnbmFtZScpO1xuICAgIGNvbnN0IHByZXZpZXdDb21wb25lbnQgPVxuICAgICAgZ2V0UHJldmlld1RlbXBsYXRlKGNvbGxlY3Rpb25OYW1lKSB8fCAoKCkgPT4gPGRpdj5ObyBQcmV2aWV3IFRlbXBsYXRlIEZvdW5kPC9kaXY+KTtcblxuICAgIGNvbnNvbGUubG9nKFwiQ29sbGVjdGlvbiBOYW1lOlwiLCBjb2xsZWN0aW9uTmFtZSk7XG4gICAgY29uc29sZS5sb2coXCJQcmV2aWV3IENvbXBvbmVudDpcIiwgcHJldmlld0NvbXBvbmVudCk7XG5cbiAgICAvLyBEZWZpbmUgdGhlIHByb3BzIHRvIHBhc3MgdG8gdGhlIHByZXZpZXcgY29tcG9uZW50XG4gICAgY29uc3QgcHJldmlld1Byb3BzID0ge1xuICAgICAgLi4udGhpcy5wcm9wcyxcbiAgICAgIHdpZGdldEZvcjogbmFtZSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2Ygd2lkZ2V0c0ZvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJldHVybiB3aWRnZXRzRm9yKG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUud2Fybihgd2lkZ2V0Rm9yIGlzIG5vdCBhIGZ1bmN0aW9uIGZvciBuYW1lOiAke25hbWV9YCk7XG4gICAgICAgIHJldHVybiBudWxsOyAvLyBGYWxsYmFjayBmb3IgbWlzc2luZyB3aWRnZXRzRm9yXG4gICAgICB9LFxuICAgICAgZW50cnksXG4gICAgICBkb2N1bWVudDogbnVsbCxcbiAgICAgIHdpbmRvdzogbnVsbCxcbiAgICB9O1xuXG4gICAgLy8gUmV0cmlldmUgdGhlIHByZXZpZXcgc3R5bGVzXG4gICAgY29uc3Qgc3R5bGVFbHMgPSBnZXRQcmV2aWV3U3R5bGVzKCkubWFwKChzdHlsZSwgaSkgPT4ge1xuICAgICAgaWYgKHN0eWxlLnJhdykge1xuICAgICAgICByZXR1cm4gPHN0eWxlIGtleT17aX0+e3N0eWxlLnZhbHVlfTwvc3R5bGU+O1xuICAgICAgfVxuICAgICAgcmV0dXJuIDxsaW5rIGtleT17aX0gaHJlZj17c3R5bGUudmFsdWV9IHR5cGU9XCJ0ZXh0L2Nzc1wiIHJlbD1cInN0eWxlc2hlZXRcIiAvPjtcbiAgICB9KTtcblxuICAgIC8vIERlZmluZSBpbml0aWFsIGNvbnRlbnQgZm9yIHRoZSBpZnJhbWVcbiAgICBjb25zdCBpbml0aWFsQ29udGVudCA9IGBcbjwhRE9DVFlQRSBodG1sPlxuPGh0bWw+XG4gIDxoZWFkPjxiYXNlIHRhcmdldD1cIl9ibGFua1wiLz48L2hlYWQ+XG4gIDxib2R5PjxkaXY+PC9kaXY+PC9ib2R5PlxuPC9odG1sPlxuYDtcblxuICAgIC8vIFJlbmRlciB0aGUgcHJldmlldyBwYW5lXG4gICAgcmV0dXJuIChcbiAgICAgIDxQcmV2aWV3UGFuZUZyYW1lIGlkPVwicHJldmlldy1wYW5lXCIgaGVhZD17c3R5bGVFbHN9IGluaXRpYWxDb250ZW50PXtpbml0aWFsQ29udGVudH0+XG4gICAgICAgIDxGcmFtZUNvbnRleHRDb25zdW1lcj5cbiAgICAgICAgICB7KHsgZG9jdW1lbnQsIHdpbmRvdyB9KSA9PiAoXG4gICAgICAgICAgICA8RWRpdG9yUHJldmlld0NvbnRlbnRcbiAgICAgICAgICAgICAgcHJldmlld0NvbXBvbmVudD17cHJldmlld0NvbXBvbmVudH1cbiAgICAgICAgICAgICAgcHJldmlld1Byb3BzPXt7IC4uLnByZXZpZXdQcm9wcywgZG9jdW1lbnQsIHdpbmRvdyB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L0ZyYW1lQ29udGV4dENvbnN1bWVyPlxuICAgICAgPC9QcmV2aWV3UGFuZUZyYW1lPlxuICAgICk7XG4gIH1cbn1cblxuUHJldmlld1BhbmUucHJvcFR5cGVzID0ge1xuICBlbnRyeTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBjb2xsZWN0aW9uOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIGNvbmZpZzogUHJvcFR5cGVzLm9iamVjdCxcbiAgd2lkZ2V0c0ZvcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3Qoc3RhdGUgPT4gKHtcbiAgY29uZmlnOiBzdGF0ZS5jb25maWcsXG4gIHdpZGdldHNGb3I6IHN0YXRlLndpZGdldHNGb3IsIC8vIEVuc3VyZSB3aWRnZXRzRm9yIGlzIHBhc3NlZCBmcm9tIFJlZHV4XG59KSkoUHJldmlld1BhbmUpO1xuIl19 */"));
class PreviewPane extends _react.default.Component {
  render() {
    const {
      entry,
      collection,
      config,
      widgetsFor
    } = this.props;

    // Ensure the entry data exists
    if (!entry || !entry.get('data')) {
      return null;
    }

    // Fetch the preview template for the collection
    const collectionName = collection.get('name');
    const previewComponent = (0, _registry.getPreviewTemplate)(collectionName) || (() => (0, _react2.jsx)("div", null, "No Preview Template Found"));
    console.log("Collection Name:", collectionName);
    console.log("Preview Component:", previewComponent);

    // Define the props to pass to the preview component
    const previewProps = _objectSpread(_objectSpread({}, this.props), {}, {
      widgetFor: name => {
        if (typeof widgetsFor === 'function') {
          return widgetsFor(name);
        }
        console.warn(`widgetFor is not a function for name: ${name}`);
        return null; // Fallback for missing widgetsFor
      },
      entry,
      document: null,
      window: null
    });

    // Retrieve the preview styles
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

    // Define initial content for the iframe
    const initialContent = `
<!DOCTYPE html>
<html>
  <head><base target="_blank"/></head>
  <body><div></div></body>
</html>
`;

    // Render the preview pane
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
  config: _propTypes.default.object,
  widgetsFor: _propTypes.default.func.isRequired
};
var _default = exports.default = (0, _reactRedux.connect)(state => ({
  config: state.config,
  widgetsFor: state.widgetsFor // Ensure widgetsFor is passed from Redux
}))(PreviewPane);