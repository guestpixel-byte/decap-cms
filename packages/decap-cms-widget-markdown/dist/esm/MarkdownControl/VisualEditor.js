"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.mergeMediaConfig = mergeMediaConfig;
var _base = _interopRequireDefault(require("@emotion/styled/base"));
var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));
var _react2 = require("@emotion/react");
var _decapCmsUiDefault = require("decap-cms-ui-default");
var _slate = require("slate");
var _slateReact = require("slate-react");
var _slateHistory = require("slate-history");
var _immutable = require("immutable");
var _styles = require("../styles");
var _Toolbar = _interopRequireDefault(require("./Toolbar"));
var _renderers = require("./renderers");
var _withLists = _interopRequireDefault(require("./plugins/lists/withLists"));
var _withBlocks = _interopRequireDefault(require("./plugins/blocks/withBlocks"));
var _withInlines = _interopRequireDefault(require("./plugins/inlines/withInlines"));
var _toggleMark = _interopRequireDefault(require("./plugins/inlines/events/toggleMark"));
var _toggleLink = _interopRequireDefault(require("./plugins/inlines/events/toggleLink"));
var _getActiveLink = _interopRequireDefault(require("./plugins/inlines/selectors/getActiveLink"));
var _isMarkActive = _interopRequireDefault(require("./plugins/inlines/locations/isMarkActive"));
var _isCursorInBlockType = _interopRequireDefault(require("./plugins/blocks/locations/isCursorInBlockType"));
var _serializers = require("../serializers");
var _withShortcodes = _interopRequireDefault(require("./plugins/shortcodes/withShortcodes"));
var _insertShortcode = _interopRequireDefault(require("./plugins/shortcodes/insertShortcode"));
var _defaultEmptyBlock = _interopRequireDefault(require("./plugins/blocks/defaultEmptyBlock"));
var _withHtml = _interopRequireDefault(require("./plugins/html/withHtml"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; } // @refresh reset
function visualEditorStyles({
  minimal
}) {
  return `
  position: relative;
  overflow: auto;
  font-family: ${_decapCmsUiDefault.fonts.primary};
  min-height: ${minimal ? 'auto' : _decapCmsUiDefault.lengths.richTextEditorMinHeight};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top: 0;
  margin-top: -${_styles.editorStyleVars.stickyDistanceBottom};
  padding: 0;
  display: flex;
  flex-direction: column;
  z-index: ${_decapCmsUiDefault.zIndex.zIndex100};
`;
}
const InsertionPoint = /*#__PURE__*/(0, _base.default)("div", {
  target: "ebiot7z0",
  label: "InsertionPoint"
})(process.env.NODE_ENV === "production" ? {
  name: "ma7xbc",
  styles: "flex:1 1 auto;cursor:text"
} : {
  name: "ma7xbc",
  styles: "flex:1 1 auto;cursor:text",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9NYXJrZG93bkNvbnRyb2wvVmlzdWFsRWRpdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQStDaUMiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL01hcmtkb3duQ29udHJvbC9WaXN1YWxFZGl0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAcmVmcmVzaCByZXNldFxuaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgeyBDbGFzc05hbWVzLCBjc3MgYXMgY29yZUNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcbmltcG9ydCB7IGxlbmd0aHMsIGZvbnRzLCB6SW5kZXggfSBmcm9tICdkZWNhcC1jbXMtdWktZGVmYXVsdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBjcmVhdGVFZGl0b3IsIFRyYW5zZm9ybXMsIEVkaXRvciBhcyBTbGF0ZUVkaXRvciB9IGZyb20gJ3NsYXRlJztcbmltcG9ydCB7IEVkaXRhYmxlLCBSZWFjdEVkaXRvciwgU2xhdGUsIHdpdGhSZWFjdCB9IGZyb20gJ3NsYXRlLXJlYWN0JztcbmltcG9ydCB7IHdpdGhIaXN0b3J5IH0gZnJvbSAnc2xhdGUtaGlzdG9yeSc7XG5pbXBvcnQgeyBmcm9tSlMgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgaXNFcXVhbCB9IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IGVkaXRvclN0eWxlVmFycywgRWRpdG9yQ29udHJvbEJhciB9IGZyb20gJy4uL3N0eWxlcyc7XG5pbXBvcnQgVG9vbGJhciBmcm9tICcuL1Rvb2xiYXInO1xuaW1wb3J0IHsgRWxlbWVudCwgTGVhZiB9IGZyb20gJy4vcmVuZGVyZXJzJztcbmltcG9ydCB3aXRoTGlzdHMgZnJvbSAnLi9wbHVnaW5zL2xpc3RzL3dpdGhMaXN0cyc7XG5pbXBvcnQgd2l0aEJsb2NrcyBmcm9tICcuL3BsdWdpbnMvYmxvY2tzL3dpdGhCbG9ja3MnO1xuaW1wb3J0IHdpdGhJbmxpbmVzIGZyb20gJy4vcGx1Z2lucy9pbmxpbmVzL3dpdGhJbmxpbmVzJztcbmltcG9ydCB0b2dnbGVNYXJrIGZyb20gJy4vcGx1Z2lucy9pbmxpbmVzL2V2ZW50cy90b2dnbGVNYXJrJztcbmltcG9ydCB0b2dnbGVMaW5rIGZyb20gJy4vcGx1Z2lucy9pbmxpbmVzL2V2ZW50cy90b2dnbGVMaW5rJztcbmltcG9ydCBnZXRBY3RpdmVMaW5rIGZyb20gJy4vcGx1Z2lucy9pbmxpbmVzL3NlbGVjdG9ycy9nZXRBY3RpdmVMaW5rJztcbmltcG9ydCBpc01hcmtBY3RpdmUgZnJvbSAnLi9wbHVnaW5zL2lubGluZXMvbG9jYXRpb25zL2lzTWFya0FjdGl2ZSc7XG5pbXBvcnQgaXNDdXJzb3JJbkJsb2NrVHlwZSBmcm9tICcuL3BsdWdpbnMvYmxvY2tzL2xvY2F0aW9ucy9pc0N1cnNvckluQmxvY2tUeXBlJztcbmltcG9ydCB7IG1hcmtkb3duVG9TbGF0ZSwgc2xhdGVUb01hcmtkb3duIH0gZnJvbSAnLi4vc2VyaWFsaXplcnMnO1xuaW1wb3J0IHdpdGhTaG9ydGNvZGVzIGZyb20gJy4vcGx1Z2lucy9zaG9ydGNvZGVzL3dpdGhTaG9ydGNvZGVzJztcbmltcG9ydCBpbnNlcnRTaG9ydGNvZGUgZnJvbSAnLi9wbHVnaW5zL3Nob3J0Y29kZXMvaW5zZXJ0U2hvcnRjb2RlJztcbmltcG9ydCBkZWZhdWx0RW1wdHlCbG9jayBmcm9tICcuL3BsdWdpbnMvYmxvY2tzL2RlZmF1bHRFbXB0eUJsb2NrJztcbmltcG9ydCB3aXRoSHRtbCBmcm9tICcuL3BsdWdpbnMvaHRtbC93aXRoSHRtbCc7XG5cbmZ1bmN0aW9uIHZpc3VhbEVkaXRvclN0eWxlcyh7IG1pbmltYWwgfSkge1xuICByZXR1cm4gYFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBhdXRvO1xuICBmb250LWZhbWlseTogJHtmb250cy5wcmltYXJ5fTtcbiAgbWluLWhlaWdodDogJHttaW5pbWFsID8gJ2F1dG8nIDogbGVuZ3Rocy5yaWNoVGV4dEVkaXRvck1pbkhlaWdodH07XG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDA7XG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAwO1xuICBib3JkZXItdG9wOiAwO1xuICBtYXJnaW4tdG9wOiAtJHtlZGl0b3JTdHlsZVZhcnMuc3RpY2t5RGlzdGFuY2VCb3R0b219O1xuICBwYWRkaW5nOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB6LWluZGV4OiAke3pJbmRleC56SW5kZXgxMDB9O1xuYDtcbn1cblxuY29uc3QgSW5zZXJ0aW9uUG9pbnQgPSBzdHlsZWQuZGl2YFxuICBmbGV4OiAxIDEgYXV0bztcbiAgY3Vyc29yOiB0ZXh0O1xuYDtcblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlTWVkaWFDb25maWcoZWRpdG9yQ29tcG9uZW50cywgZmllbGQpIHtcbiAgLy8gbWVyZ2UgZWRpdG9yIG1lZGlhIGxpYnJhcnkgY29uZmlnIHRvIGltYWdlIGNvbXBvbmVudHNcbiAgaWYgKGVkaXRvckNvbXBvbmVudHMuaGFzKCdpbWFnZScpKSB7XG4gICAgY29uc3QgaW1hZ2VDb21wb25lbnQgPSBlZGl0b3JDb21wb25lbnRzLmdldCgnaW1hZ2UnKTtcbiAgICBjb25zdCBmaWVsZHMgPSBpbWFnZUNvbXBvbmVudD8uZmllbGRzO1xuXG4gICAgaWYgKGZpZWxkcykge1xuICAgICAgaW1hZ2VDb21wb25lbnQuZmllbGRzID0gZmllbGRzLnVwZGF0ZShcbiAgICAgICAgZmllbGRzLmZpbmRJbmRleChmID0+IGYuZ2V0KCd3aWRnZXQnKSA9PT0gJ2ltYWdlJyksXG4gICAgICAgIGYgPT4ge1xuICAgICAgICAgIC8vIG1lcmdlIGBtZWRpYV9saWJyYXJ5YCBjb25maWdcbiAgICAgICAgICBpZiAoZmllbGQuaGFzKCdtZWRpYV9saWJyYXJ5JykpIHtcbiAgICAgICAgICAgIGYgPSBmLnNldChcbiAgICAgICAgICAgICAgJ21lZGlhX2xpYnJhcnknLFxuICAgICAgICAgICAgICBmaWVsZC5nZXQoJ21lZGlhX2xpYnJhcnknKS5tZXJnZURlZXAoZi5nZXQoJ21lZGlhX2xpYnJhcnknKSksXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBtZXJnZSAnbWVkaWFfZm9sZGVyJ1xuICAgICAgICAgIGlmIChmaWVsZC5oYXMoJ21lZGlhX2ZvbGRlcicpICYmICFmLmhhcygnbWVkaWFfZm9sZGVyJykpIHtcbiAgICAgICAgICAgIGYgPSBmLnNldCgnbWVkaWFfZm9sZGVyJywgZmllbGQuZ2V0KCdtZWRpYV9mb2xkZXInKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIG1lcmdlICdwdWJsaWNfZm9sZGVyJ1xuICAgICAgICAgIGlmIChmaWVsZC5oYXMoJ3B1YmxpY19mb2xkZXInKSAmJiAhZi5oYXMoJ3B1YmxpY19mb2xkZXInKSkge1xuICAgICAgICAgICAgZiA9IGYuc2V0KCdwdWJsaWNfZm9sZGVyJywgZmllbGQuZ2V0KCdwdWJsaWNfZm9sZGVyJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZjtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIEVkaXRvcihwcm9wcykge1xuICBjb25zdCB7XG4gICAgb25BZGRBc3NldCxcbiAgICBnZXRBc3NldCxcbiAgICBjbGFzc05hbWUsXG4gICAgZmllbGQsXG4gICAgaXNTaG93TW9kZVRvZ2dsZSxcbiAgICB0LFxuICAgIGlzRGlzYWJsZWQsXG4gICAgZ2V0RWRpdG9yQ29tcG9uZW50cyxcbiAgICBnZXRSZW1hcmtQbHVnaW5zLFxuICAgIG9uQ2hhbmdlLFxuICB9ID0gcHJvcHM7XG5cbiAgY29uc3QgZWRpdG9yID0gdXNlTWVtbyhcbiAgICAoKSA9PlxuICAgICAgd2l0aEh0bWwoXG4gICAgICAgIHdpdGhSZWFjdCh3aXRoSGlzdG9yeSh3aXRoU2hvcnRjb2Rlcyh3aXRoQmxvY2tzKHdpdGhMaXN0cyh3aXRoSW5saW5lcyhjcmVhdGVFZGl0b3IoKSkpKSkpKSxcbiAgICAgICksXG4gICAgW10sXG4gICk7XG5cbiAgY29uc3QgZW1wdHlWYWx1ZSA9IFtkZWZhdWx0RW1wdHlCbG9jaygpXTtcbiAgbGV0IGVkaXRvckNvbXBvbmVudHMgPSBnZXRFZGl0b3JDb21wb25lbnRzKCk7XG4gIGNvbnN0IGNvZGVCbG9ja0NvbXBvbmVudCA9IGZyb21KUyhlZGl0b3JDb21wb25lbnRzLmZpbmQoKHsgdHlwZSB9KSA9PiB0eXBlID09PSAnY29kZS1ibG9jaycpKTtcblxuICBlZGl0b3JDb21wb25lbnRzID1cbiAgICBjb2RlQmxvY2tDb21wb25lbnQgfHwgZWRpdG9yQ29tcG9uZW50cy5oYXMoJ2NvZGUtYmxvY2snKVxuICAgICAgPyBlZGl0b3JDb21wb25lbnRzXG4gICAgICA6IGVkaXRvckNvbXBvbmVudHMuc2V0KCdjb2RlLWJsb2NrJywgeyBsYWJlbDogJ0NvZGUgQmxvY2snLCB0eXBlOiAnY29kZS1ibG9jaycgfSk7XG5cbiAgbWVyZ2VNZWRpYUNvbmZpZyhlZGl0b3JDb21wb25lbnRzLCBmaWVsZCk7XG5cbiAgY29uc3QgW2VkaXRvclZhbHVlLCBzZXRFZGl0b3JWYWx1ZV0gPSB1c2VTdGF0ZShcbiAgICBwcm9wcy52YWx1ZVxuICAgICAgPyBtYXJrZG93blRvU2xhdGUocHJvcHMudmFsdWUsIHtcbiAgICAgICAgICB2b2lkQ29kZUJsb2NrOiAhIWNvZGVCbG9ja0NvbXBvbmVudCxcbiAgICAgICAgICByZW1hcmtQbHVnaW5zOiBnZXRSZW1hcmtQbHVnaW5zKCksXG4gICAgICAgIH0pXG4gICAgICA6IGVtcHR5VmFsdWUsXG4gICk7XG5cbiAgY29uc3QgcmVuZGVyRWxlbWVudCA9IHVzZUNhbGxiYWNrKFxuICAgIHByb3BzID0+IChcbiAgICAgIDxFbGVtZW50IHsuLi5wcm9wc30gY2xhc3NOYW1lV3JhcHBlcj17Y2xhc3NOYW1lfSBjb2RlQmxvY2tDb21wb25lbnQ9e2NvZGVCbG9ja0NvbXBvbmVudH0gLz5cbiAgICApLFxuICAgIFtdLFxuICApO1xuICBjb25zdCByZW5kZXJMZWFmID0gdXNlQ2FsbGJhY2socHJvcHMgPT4gPExlYWYgey4uLnByb3BzfSAvPiwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHByb3BzLnBlbmRpbmdGb2N1cykge1xuICAgICAgUmVhY3RFZGl0b3IuZm9jdXMoZWRpdG9yKTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICBmdW5jdGlvbiBoYW5kbGVNYXJrQ2xpY2soZm9ybWF0KSB7XG4gICAgUmVhY3RFZGl0b3IuZm9jdXMoZWRpdG9yKTtcbiAgICB0b2dnbGVNYXJrKGVkaXRvciwgZm9ybWF0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUJsb2NrQ2xpY2soZm9ybWF0KSB7XG4gICAgUmVhY3RFZGl0b3IuZm9jdXMoZWRpdG9yKTtcbiAgICBpZiAoZm9ybWF0LmVuZHNXaXRoKCctbGlzdCcpKSB7XG4gICAgICBlZGl0b3IudG9nZ2xlTGlzdChmb3JtYXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlZGl0b3IudG9nZ2xlQmxvY2soZm9ybWF0KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVMaW5rQ2xpY2soKSB7XG4gICAgdG9nZ2xlTGluayhlZGl0b3IsIHQoJ2VkaXRvci5lZGl0b3JXaWRnZXRzLm1hcmtkb3duLmxpbmtQcm9tcHQnKSk7XG4gICAgUmVhY3RFZGl0b3IuZm9jdXMoZWRpdG9yKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVRvZ2dsZU1vZGUoKSB7XG4gICAgcHJvcHMub25Nb2RlKCdyYXcnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUluc2VydFNob3J0Y29kZShwbHVnaW5Db25maWcpIHtcbiAgICBpbnNlcnRTaG9ydGNvZGUoZWRpdG9yLCBwbHVnaW5Db25maWcpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgIGZvciAoY29uc3QgaGFuZGxlciBvZiBlZGl0b3Iua2V5RG93bkhhbmRsZXJzIHx8IFtdKSB7XG4gICAgICBpZiAoaGFuZGxlcihldmVudCwgZWRpdG9yKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIFJlYWN0RWRpdG9yLmZvY3VzKGVkaXRvcik7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVDbGlja0JlbG93RG9jdW1lbnQoKSB7XG4gICAgUmVhY3RFZGl0b3IuZm9jdXMoZWRpdG9yKTtcbiAgICBUcmFuc2Zvcm1zLnNlbGVjdChlZGl0b3IsIHsgcGF0aDogWzAsIDBdLCBvZmZzZXQ6IDAgfSk7XG4gICAgVHJhbnNmb3Jtcy5zZWxlY3QoZWRpdG9yLCBTbGF0ZUVkaXRvci5lbmQoZWRpdG9yLCBbXSkpO1xuICB9XG4gIGNvbnN0IFt0b29sYmFyS2V5LCBzZXRUb29sYmFyS2V5XSA9IHVzZVN0YXRlKDApO1xuXG4gIGZ1bmN0aW9uIGhhbmRsZUNoYW5nZShuZXdWYWx1ZSkge1xuICAgIGlmICghaXNFcXVhbChuZXdWYWx1ZSwgZWRpdG9yVmFsdWUpKSB7XG4gICAgICBzZXRFZGl0b3JWYWx1ZSgoKSA9PiBuZXdWYWx1ZSk7XG4gICAgICBvbkNoYW5nZShcbiAgICAgICAgc2xhdGVUb01hcmtkb3duKG5ld1ZhbHVlLCB7XG4gICAgICAgICAgdm9pZENvZGVCbG9jazogISFjb2RlQmxvY2tDb21wb25lbnQsXG4gICAgICAgICAgcmVtYXJrUGx1Z2luczogZ2V0UmVtYXJrUGx1Z2lucygpLFxuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuICAgIHNldFRvb2xiYXJLZXkocHJldiA9PiBwcmV2ICsgMSk7XG4gIH1cblxuICBmdW5jdGlvbiBoYXNNYXJrKGZvcm1hdCkge1xuICAgIHJldHVybiBpc01hcmtBY3RpdmUoZWRpdG9yLCBmb3JtYXQpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFzSW5saW5lKGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT0gJ2xpbmsnKSB7XG4gICAgICByZXR1cm4gISFnZXRBY3RpdmVMaW5rKGVkaXRvcik7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhc0Jsb2NrKGZvcm1hdCkge1xuICAgIHJldHVybiBpc0N1cnNvckluQmxvY2tUeXBlKGVkaXRvciwgZm9ybWF0KTtcbiAgfVxuICBmdW5jdGlvbiBoYXNRdW90ZSgpIHtcbiAgICByZXR1cm4gaXNDdXJzb3JJbkJsb2NrVHlwZShlZGl0b3IsICdxdW90ZScpO1xuICB9XG4gIGZ1bmN0aW9uIGhhc0xpc3RJdGVtcyh0eXBlKSB7XG4gICAgcmV0dXJuIGlzQ3Vyc29ySW5CbG9ja1R5cGUoZWRpdG9yLCB0eXBlKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY3NzPXtjb3JlQ3NzYFxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICBgfVxuICAgID5cbiAgICAgIDxTbGF0ZSBlZGl0b3I9e2VkaXRvcn0gdmFsdWU9e2VkaXRvclZhbHVlfSBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfT5cbiAgICAgICAgPEVkaXRvckNvbnRyb2xCYXI+XG4gICAgICAgICAge1xuICAgICAgICAgICAgPFRvb2xiYXJcbiAgICAgICAgICAgICAga2V5PXt0b29sYmFyS2V5fVxuICAgICAgICAgICAgICBvbk1hcmtDbGljaz17aGFuZGxlTWFya0NsaWNrfVxuICAgICAgICAgICAgICBvbkJsb2NrQ2xpY2s9e2hhbmRsZUJsb2NrQ2xpY2t9XG4gICAgICAgICAgICAgIG9uTGlua0NsaWNrPXtoYW5kbGVMaW5rQ2xpY2t9XG4gICAgICAgICAgICAgIG9uVG9nZ2xlTW9kZT17aGFuZGxlVG9nZ2xlTW9kZX1cbiAgICAgICAgICAgICAgcGx1Z2lucz17ZWRpdG9yQ29tcG9uZW50c31cbiAgICAgICAgICAgICAgb25TdWJtaXQ9e2hhbmRsZUluc2VydFNob3J0Y29kZX1cbiAgICAgICAgICAgICAgb25BZGRBc3NldD17b25BZGRBc3NldH1cbiAgICAgICAgICAgICAgZ2V0QXNzZXQ9e2dldEFzc2V0fVxuICAgICAgICAgICAgICBidXR0b25zPXtmaWVsZC5nZXQoJ2J1dHRvbnMnKX1cbiAgICAgICAgICAgICAgZWRpdG9yQ29tcG9uZW50cz17ZmllbGQuZ2V0KCdlZGl0b3JfY29tcG9uZW50cycpfVxuICAgICAgICAgICAgICBoYXNNYXJrPXtoYXNNYXJrfVxuICAgICAgICAgICAgICBoYXNJbmxpbmU9e2hhc0lubGluZX1cbiAgICAgICAgICAgICAgaGFzQmxvY2s9e2hhc0Jsb2NrfVxuICAgICAgICAgICAgICBoYXNRdW90ZT17aGFzUXVvdGV9XG4gICAgICAgICAgICAgIGhhc0xpc3RJdGVtcz17aGFzTGlzdEl0ZW1zfVxuICAgICAgICAgICAgICBpc1Nob3dNb2RlVG9nZ2xlPXtpc1Nob3dNb2RlVG9nZ2xlfVxuICAgICAgICAgICAgICB0PXt0fVxuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNEaXNhYmxlZH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgfVxuICAgICAgICA8L0VkaXRvckNvbnRyb2xCYXI+XG4gICAgICAgIHtcbiAgICAgICAgICA8Q2xhc3NOYW1lcz5cbiAgICAgICAgICAgIHsoeyBjc3MsIGN4IH0pID0+IChcbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICBjc3NgXG4gICAgICAgICAgICAgICAgICAgICR7dmlzdWFsRWRpdG9yU3R5bGVzKHsgbWluaW1hbDogZmllbGQuZ2V0KCdtaW5pbWFsJykgfSl9XG4gICAgICAgICAgICAgICAgICBgLFxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7ZWRpdG9yVmFsdWUubGVuZ3RoICE9PSAwICYmIChcbiAgICAgICAgICAgICAgICAgIDxFZGl0YWJsZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Nzc2BcbiAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAxNnB4IDIwcHggMDtcbiAgICAgICAgICAgICAgICAgICAgYH1cbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyRWxlbWVudD17cmVuZGVyRWxlbWVudH1cbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyTGVhZj17cmVuZGVyTGVhZn1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXtoYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXM9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDxJbnNlcnRpb25Qb2ludCBvbkNsaWNrPXtoYW5kbGVDbGlja0JlbG93RG9jdW1lbnR9IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L0NsYXNzTmFtZXM+XG4gICAgICAgIH1cbiAgICAgIDwvU2xhdGU+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbkVkaXRvci5wcm9wVHlwZXMgPSB7XG4gIG9uQWRkQXNzZXQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGdldEFzc2V0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25Nb2RlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGZpZWxkOiBJbW11dGFibGVQcm9wVHlwZXMubWFwLmlzUmVxdWlyZWQsXG4gIGdldEVkaXRvckNvbXBvbmVudHM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGdldFJlbWFya1BsdWdpbnM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGlzU2hvd01vZGVUb2dnbGU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBFZGl0b3I7XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});
function mergeMediaConfig(editorComponents, field) {
  // merge editor media library config to image components
  if (editorComponents.has('image')) {
    const imageComponent = editorComponents.get('image');
    const fields = imageComponent === null || imageComponent === void 0 ? void 0 : imageComponent.fields;
    if (fields) {
      imageComponent.fields = fields.update(fields.findIndex(f => f.get('widget') === 'image'), f => {
        // merge `media_library` config
        if (field.has('media_library')) {
          f = f.set('media_library', field.get('media_library').mergeDeep(f.get('media_library')));
        }
        // merge 'media_folder'
        if (field.has('media_folder') && !f.has('media_folder')) {
          f = f.set('media_folder', field.get('media_folder'));
        }
        // merge 'public_folder'
        if (field.has('public_folder') && !f.has('public_folder')) {
          f = f.set('public_folder', field.get('public_folder'));
        }
        return f;
      });
    }
  }
}
var _ref = process.env.NODE_ENV === "production" ? {
  name: "j8ayvn-Editor",
  styles: "position:relative;label:Editor;"
} : {
  name: "j8ayvn-Editor",
  styles: "position:relative;label:Editor;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9NYXJrZG93bkNvbnRyb2wvVmlzdWFsRWRpdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTJOa0IiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL01hcmtkb3duQ29udHJvbC9WaXN1YWxFZGl0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAcmVmcmVzaCByZXNldFxuaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgeyBDbGFzc05hbWVzLCBjc3MgYXMgY29yZUNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcbmltcG9ydCB7IGxlbmd0aHMsIGZvbnRzLCB6SW5kZXggfSBmcm9tICdkZWNhcC1jbXMtdWktZGVmYXVsdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBjcmVhdGVFZGl0b3IsIFRyYW5zZm9ybXMsIEVkaXRvciBhcyBTbGF0ZUVkaXRvciB9IGZyb20gJ3NsYXRlJztcbmltcG9ydCB7IEVkaXRhYmxlLCBSZWFjdEVkaXRvciwgU2xhdGUsIHdpdGhSZWFjdCB9IGZyb20gJ3NsYXRlLXJlYWN0JztcbmltcG9ydCB7IHdpdGhIaXN0b3J5IH0gZnJvbSAnc2xhdGUtaGlzdG9yeSc7XG5pbXBvcnQgeyBmcm9tSlMgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgaXNFcXVhbCB9IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IGVkaXRvclN0eWxlVmFycywgRWRpdG9yQ29udHJvbEJhciB9IGZyb20gJy4uL3N0eWxlcyc7XG5pbXBvcnQgVG9vbGJhciBmcm9tICcuL1Rvb2xiYXInO1xuaW1wb3J0IHsgRWxlbWVudCwgTGVhZiB9IGZyb20gJy4vcmVuZGVyZXJzJztcbmltcG9ydCB3aXRoTGlzdHMgZnJvbSAnLi9wbHVnaW5zL2xpc3RzL3dpdGhMaXN0cyc7XG5pbXBvcnQgd2l0aEJsb2NrcyBmcm9tICcuL3BsdWdpbnMvYmxvY2tzL3dpdGhCbG9ja3MnO1xuaW1wb3J0IHdpdGhJbmxpbmVzIGZyb20gJy4vcGx1Z2lucy9pbmxpbmVzL3dpdGhJbmxpbmVzJztcbmltcG9ydCB0b2dnbGVNYXJrIGZyb20gJy4vcGx1Z2lucy9pbmxpbmVzL2V2ZW50cy90b2dnbGVNYXJrJztcbmltcG9ydCB0b2dnbGVMaW5rIGZyb20gJy4vcGx1Z2lucy9pbmxpbmVzL2V2ZW50cy90b2dnbGVMaW5rJztcbmltcG9ydCBnZXRBY3RpdmVMaW5rIGZyb20gJy4vcGx1Z2lucy9pbmxpbmVzL3NlbGVjdG9ycy9nZXRBY3RpdmVMaW5rJztcbmltcG9ydCBpc01hcmtBY3RpdmUgZnJvbSAnLi9wbHVnaW5zL2lubGluZXMvbG9jYXRpb25zL2lzTWFya0FjdGl2ZSc7XG5pbXBvcnQgaXNDdXJzb3JJbkJsb2NrVHlwZSBmcm9tICcuL3BsdWdpbnMvYmxvY2tzL2xvY2F0aW9ucy9pc0N1cnNvckluQmxvY2tUeXBlJztcbmltcG9ydCB7IG1hcmtkb3duVG9TbGF0ZSwgc2xhdGVUb01hcmtkb3duIH0gZnJvbSAnLi4vc2VyaWFsaXplcnMnO1xuaW1wb3J0IHdpdGhTaG9ydGNvZGVzIGZyb20gJy4vcGx1Z2lucy9zaG9ydGNvZGVzL3dpdGhTaG9ydGNvZGVzJztcbmltcG9ydCBpbnNlcnRTaG9ydGNvZGUgZnJvbSAnLi9wbHVnaW5zL3Nob3J0Y29kZXMvaW5zZXJ0U2hvcnRjb2RlJztcbmltcG9ydCBkZWZhdWx0RW1wdHlCbG9jayBmcm9tICcuL3BsdWdpbnMvYmxvY2tzL2RlZmF1bHRFbXB0eUJsb2NrJztcbmltcG9ydCB3aXRoSHRtbCBmcm9tICcuL3BsdWdpbnMvaHRtbC93aXRoSHRtbCc7XG5cbmZ1bmN0aW9uIHZpc3VhbEVkaXRvclN0eWxlcyh7IG1pbmltYWwgfSkge1xuICByZXR1cm4gYFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBhdXRvO1xuICBmb250LWZhbWlseTogJHtmb250cy5wcmltYXJ5fTtcbiAgbWluLWhlaWdodDogJHttaW5pbWFsID8gJ2F1dG8nIDogbGVuZ3Rocy5yaWNoVGV4dEVkaXRvck1pbkhlaWdodH07XG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDA7XG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAwO1xuICBib3JkZXItdG9wOiAwO1xuICBtYXJnaW4tdG9wOiAtJHtlZGl0b3JTdHlsZVZhcnMuc3RpY2t5RGlzdGFuY2VCb3R0b219O1xuICBwYWRkaW5nOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB6LWluZGV4OiAke3pJbmRleC56SW5kZXgxMDB9O1xuYDtcbn1cblxuY29uc3QgSW5zZXJ0aW9uUG9pbnQgPSBzdHlsZWQuZGl2YFxuICBmbGV4OiAxIDEgYXV0bztcbiAgY3Vyc29yOiB0ZXh0O1xuYDtcblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlTWVkaWFDb25maWcoZWRpdG9yQ29tcG9uZW50cywgZmllbGQpIHtcbiAgLy8gbWVyZ2UgZWRpdG9yIG1lZGlhIGxpYnJhcnkgY29uZmlnIHRvIGltYWdlIGNvbXBvbmVudHNcbiAgaWYgKGVkaXRvckNvbXBvbmVudHMuaGFzKCdpbWFnZScpKSB7XG4gICAgY29uc3QgaW1hZ2VDb21wb25lbnQgPSBlZGl0b3JDb21wb25lbnRzLmdldCgnaW1hZ2UnKTtcbiAgICBjb25zdCBmaWVsZHMgPSBpbWFnZUNvbXBvbmVudD8uZmllbGRzO1xuXG4gICAgaWYgKGZpZWxkcykge1xuICAgICAgaW1hZ2VDb21wb25lbnQuZmllbGRzID0gZmllbGRzLnVwZGF0ZShcbiAgICAgICAgZmllbGRzLmZpbmRJbmRleChmID0+IGYuZ2V0KCd3aWRnZXQnKSA9PT0gJ2ltYWdlJyksXG4gICAgICAgIGYgPT4ge1xuICAgICAgICAgIC8vIG1lcmdlIGBtZWRpYV9saWJyYXJ5YCBjb25maWdcbiAgICAgICAgICBpZiAoZmllbGQuaGFzKCdtZWRpYV9saWJyYXJ5JykpIHtcbiAgICAgICAgICAgIGYgPSBmLnNldChcbiAgICAgICAgICAgICAgJ21lZGlhX2xpYnJhcnknLFxuICAgICAgICAgICAgICBmaWVsZC5nZXQoJ21lZGlhX2xpYnJhcnknKS5tZXJnZURlZXAoZi5nZXQoJ21lZGlhX2xpYnJhcnknKSksXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBtZXJnZSAnbWVkaWFfZm9sZGVyJ1xuICAgICAgICAgIGlmIChmaWVsZC5oYXMoJ21lZGlhX2ZvbGRlcicpICYmICFmLmhhcygnbWVkaWFfZm9sZGVyJykpIHtcbiAgICAgICAgICAgIGYgPSBmLnNldCgnbWVkaWFfZm9sZGVyJywgZmllbGQuZ2V0KCdtZWRpYV9mb2xkZXInKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIG1lcmdlICdwdWJsaWNfZm9sZGVyJ1xuICAgICAgICAgIGlmIChmaWVsZC5oYXMoJ3B1YmxpY19mb2xkZXInKSAmJiAhZi5oYXMoJ3B1YmxpY19mb2xkZXInKSkge1xuICAgICAgICAgICAgZiA9IGYuc2V0KCdwdWJsaWNfZm9sZGVyJywgZmllbGQuZ2V0KCdwdWJsaWNfZm9sZGVyJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZjtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIEVkaXRvcihwcm9wcykge1xuICBjb25zdCB7XG4gICAgb25BZGRBc3NldCxcbiAgICBnZXRBc3NldCxcbiAgICBjbGFzc05hbWUsXG4gICAgZmllbGQsXG4gICAgaXNTaG93TW9kZVRvZ2dsZSxcbiAgICB0LFxuICAgIGlzRGlzYWJsZWQsXG4gICAgZ2V0RWRpdG9yQ29tcG9uZW50cyxcbiAgICBnZXRSZW1hcmtQbHVnaW5zLFxuICAgIG9uQ2hhbmdlLFxuICB9ID0gcHJvcHM7XG5cbiAgY29uc3QgZWRpdG9yID0gdXNlTWVtbyhcbiAgICAoKSA9PlxuICAgICAgd2l0aEh0bWwoXG4gICAgICAgIHdpdGhSZWFjdCh3aXRoSGlzdG9yeSh3aXRoU2hvcnRjb2Rlcyh3aXRoQmxvY2tzKHdpdGhMaXN0cyh3aXRoSW5saW5lcyhjcmVhdGVFZGl0b3IoKSkpKSkpKSxcbiAgICAgICksXG4gICAgW10sXG4gICk7XG5cbiAgY29uc3QgZW1wdHlWYWx1ZSA9IFtkZWZhdWx0RW1wdHlCbG9jaygpXTtcbiAgbGV0IGVkaXRvckNvbXBvbmVudHMgPSBnZXRFZGl0b3JDb21wb25lbnRzKCk7XG4gIGNvbnN0IGNvZGVCbG9ja0NvbXBvbmVudCA9IGZyb21KUyhlZGl0b3JDb21wb25lbnRzLmZpbmQoKHsgdHlwZSB9KSA9PiB0eXBlID09PSAnY29kZS1ibG9jaycpKTtcblxuICBlZGl0b3JDb21wb25lbnRzID1cbiAgICBjb2RlQmxvY2tDb21wb25lbnQgfHwgZWRpdG9yQ29tcG9uZW50cy5oYXMoJ2NvZGUtYmxvY2snKVxuICAgICAgPyBlZGl0b3JDb21wb25lbnRzXG4gICAgICA6IGVkaXRvckNvbXBvbmVudHMuc2V0KCdjb2RlLWJsb2NrJywgeyBsYWJlbDogJ0NvZGUgQmxvY2snLCB0eXBlOiAnY29kZS1ibG9jaycgfSk7XG5cbiAgbWVyZ2VNZWRpYUNvbmZpZyhlZGl0b3JDb21wb25lbnRzLCBmaWVsZCk7XG5cbiAgY29uc3QgW2VkaXRvclZhbHVlLCBzZXRFZGl0b3JWYWx1ZV0gPSB1c2VTdGF0ZShcbiAgICBwcm9wcy52YWx1ZVxuICAgICAgPyBtYXJrZG93blRvU2xhdGUocHJvcHMudmFsdWUsIHtcbiAgICAgICAgICB2b2lkQ29kZUJsb2NrOiAhIWNvZGVCbG9ja0NvbXBvbmVudCxcbiAgICAgICAgICByZW1hcmtQbHVnaW5zOiBnZXRSZW1hcmtQbHVnaW5zKCksXG4gICAgICAgIH0pXG4gICAgICA6IGVtcHR5VmFsdWUsXG4gICk7XG5cbiAgY29uc3QgcmVuZGVyRWxlbWVudCA9IHVzZUNhbGxiYWNrKFxuICAgIHByb3BzID0+IChcbiAgICAgIDxFbGVtZW50IHsuLi5wcm9wc30gY2xhc3NOYW1lV3JhcHBlcj17Y2xhc3NOYW1lfSBjb2RlQmxvY2tDb21wb25lbnQ9e2NvZGVCbG9ja0NvbXBvbmVudH0gLz5cbiAgICApLFxuICAgIFtdLFxuICApO1xuICBjb25zdCByZW5kZXJMZWFmID0gdXNlQ2FsbGJhY2socHJvcHMgPT4gPExlYWYgey4uLnByb3BzfSAvPiwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHByb3BzLnBlbmRpbmdGb2N1cykge1xuICAgICAgUmVhY3RFZGl0b3IuZm9jdXMoZWRpdG9yKTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICBmdW5jdGlvbiBoYW5kbGVNYXJrQ2xpY2soZm9ybWF0KSB7XG4gICAgUmVhY3RFZGl0b3IuZm9jdXMoZWRpdG9yKTtcbiAgICB0b2dnbGVNYXJrKGVkaXRvciwgZm9ybWF0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUJsb2NrQ2xpY2soZm9ybWF0KSB7XG4gICAgUmVhY3RFZGl0b3IuZm9jdXMoZWRpdG9yKTtcbiAgICBpZiAoZm9ybWF0LmVuZHNXaXRoKCctbGlzdCcpKSB7XG4gICAgICBlZGl0b3IudG9nZ2xlTGlzdChmb3JtYXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlZGl0b3IudG9nZ2xlQmxvY2soZm9ybWF0KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVMaW5rQ2xpY2soKSB7XG4gICAgdG9nZ2xlTGluayhlZGl0b3IsIHQoJ2VkaXRvci5lZGl0b3JXaWRnZXRzLm1hcmtkb3duLmxpbmtQcm9tcHQnKSk7XG4gICAgUmVhY3RFZGl0b3IuZm9jdXMoZWRpdG9yKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVRvZ2dsZU1vZGUoKSB7XG4gICAgcHJvcHMub25Nb2RlKCdyYXcnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUluc2VydFNob3J0Y29kZShwbHVnaW5Db25maWcpIHtcbiAgICBpbnNlcnRTaG9ydGNvZGUoZWRpdG9yLCBwbHVnaW5Db25maWcpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgIGZvciAoY29uc3QgaGFuZGxlciBvZiBlZGl0b3Iua2V5RG93bkhhbmRsZXJzIHx8IFtdKSB7XG4gICAgICBpZiAoaGFuZGxlcihldmVudCwgZWRpdG9yKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIFJlYWN0RWRpdG9yLmZvY3VzKGVkaXRvcik7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVDbGlja0JlbG93RG9jdW1lbnQoKSB7XG4gICAgUmVhY3RFZGl0b3IuZm9jdXMoZWRpdG9yKTtcbiAgICBUcmFuc2Zvcm1zLnNlbGVjdChlZGl0b3IsIHsgcGF0aDogWzAsIDBdLCBvZmZzZXQ6IDAgfSk7XG4gICAgVHJhbnNmb3Jtcy5zZWxlY3QoZWRpdG9yLCBTbGF0ZUVkaXRvci5lbmQoZWRpdG9yLCBbXSkpO1xuICB9XG4gIGNvbnN0IFt0b29sYmFyS2V5LCBzZXRUb29sYmFyS2V5XSA9IHVzZVN0YXRlKDApO1xuXG4gIGZ1bmN0aW9uIGhhbmRsZUNoYW5nZShuZXdWYWx1ZSkge1xuICAgIGlmICghaXNFcXVhbChuZXdWYWx1ZSwgZWRpdG9yVmFsdWUpKSB7XG4gICAgICBzZXRFZGl0b3JWYWx1ZSgoKSA9PiBuZXdWYWx1ZSk7XG4gICAgICBvbkNoYW5nZShcbiAgICAgICAgc2xhdGVUb01hcmtkb3duKG5ld1ZhbHVlLCB7XG4gICAgICAgICAgdm9pZENvZGVCbG9jazogISFjb2RlQmxvY2tDb21wb25lbnQsXG4gICAgICAgICAgcmVtYXJrUGx1Z2luczogZ2V0UmVtYXJrUGx1Z2lucygpLFxuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuICAgIHNldFRvb2xiYXJLZXkocHJldiA9PiBwcmV2ICsgMSk7XG4gIH1cblxuICBmdW5jdGlvbiBoYXNNYXJrKGZvcm1hdCkge1xuICAgIHJldHVybiBpc01hcmtBY3RpdmUoZWRpdG9yLCBmb3JtYXQpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFzSW5saW5lKGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT0gJ2xpbmsnKSB7XG4gICAgICByZXR1cm4gISFnZXRBY3RpdmVMaW5rKGVkaXRvcik7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhc0Jsb2NrKGZvcm1hdCkge1xuICAgIHJldHVybiBpc0N1cnNvckluQmxvY2tUeXBlKGVkaXRvciwgZm9ybWF0KTtcbiAgfVxuICBmdW5jdGlvbiBoYXNRdW90ZSgpIHtcbiAgICByZXR1cm4gaXNDdXJzb3JJbkJsb2NrVHlwZShlZGl0b3IsICdxdW90ZScpO1xuICB9XG4gIGZ1bmN0aW9uIGhhc0xpc3RJdGVtcyh0eXBlKSB7XG4gICAgcmV0dXJuIGlzQ3Vyc29ySW5CbG9ja1R5cGUoZWRpdG9yLCB0eXBlKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY3NzPXtjb3JlQ3NzYFxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICBgfVxuICAgID5cbiAgICAgIDxTbGF0ZSBlZGl0b3I9e2VkaXRvcn0gdmFsdWU9e2VkaXRvclZhbHVlfSBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfT5cbiAgICAgICAgPEVkaXRvckNvbnRyb2xCYXI+XG4gICAgICAgICAge1xuICAgICAgICAgICAgPFRvb2xiYXJcbiAgICAgICAgICAgICAga2V5PXt0b29sYmFyS2V5fVxuICAgICAgICAgICAgICBvbk1hcmtDbGljaz17aGFuZGxlTWFya0NsaWNrfVxuICAgICAgICAgICAgICBvbkJsb2NrQ2xpY2s9e2hhbmRsZUJsb2NrQ2xpY2t9XG4gICAgICAgICAgICAgIG9uTGlua0NsaWNrPXtoYW5kbGVMaW5rQ2xpY2t9XG4gICAgICAgICAgICAgIG9uVG9nZ2xlTW9kZT17aGFuZGxlVG9nZ2xlTW9kZX1cbiAgICAgICAgICAgICAgcGx1Z2lucz17ZWRpdG9yQ29tcG9uZW50c31cbiAgICAgICAgICAgICAgb25TdWJtaXQ9e2hhbmRsZUluc2VydFNob3J0Y29kZX1cbiAgICAgICAgICAgICAgb25BZGRBc3NldD17b25BZGRBc3NldH1cbiAgICAgICAgICAgICAgZ2V0QXNzZXQ9e2dldEFzc2V0fVxuICAgICAgICAgICAgICBidXR0b25zPXtmaWVsZC5nZXQoJ2J1dHRvbnMnKX1cbiAgICAgICAgICAgICAgZWRpdG9yQ29tcG9uZW50cz17ZmllbGQuZ2V0KCdlZGl0b3JfY29tcG9uZW50cycpfVxuICAgICAgICAgICAgICBoYXNNYXJrPXtoYXNNYXJrfVxuICAgICAgICAgICAgICBoYXNJbmxpbmU9e2hhc0lubGluZX1cbiAgICAgICAgICAgICAgaGFzQmxvY2s9e2hhc0Jsb2NrfVxuICAgICAgICAgICAgICBoYXNRdW90ZT17aGFzUXVvdGV9XG4gICAgICAgICAgICAgIGhhc0xpc3RJdGVtcz17aGFzTGlzdEl0ZW1zfVxuICAgICAgICAgICAgICBpc1Nob3dNb2RlVG9nZ2xlPXtpc1Nob3dNb2RlVG9nZ2xlfVxuICAgICAgICAgICAgICB0PXt0fVxuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNEaXNhYmxlZH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgfVxuICAgICAgICA8L0VkaXRvckNvbnRyb2xCYXI+XG4gICAgICAgIHtcbiAgICAgICAgICA8Q2xhc3NOYW1lcz5cbiAgICAgICAgICAgIHsoeyBjc3MsIGN4IH0pID0+IChcbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICBjc3NgXG4gICAgICAgICAgICAgICAgICAgICR7dmlzdWFsRWRpdG9yU3R5bGVzKHsgbWluaW1hbDogZmllbGQuZ2V0KCdtaW5pbWFsJykgfSl9XG4gICAgICAgICAgICAgICAgICBgLFxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7ZWRpdG9yVmFsdWUubGVuZ3RoICE9PSAwICYmIChcbiAgICAgICAgICAgICAgICAgIDxFZGl0YWJsZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Nzc2BcbiAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAxNnB4IDIwcHggMDtcbiAgICAgICAgICAgICAgICAgICAgYH1cbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyRWxlbWVudD17cmVuZGVyRWxlbWVudH1cbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyTGVhZj17cmVuZGVyTGVhZn1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXtoYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXM9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDxJbnNlcnRpb25Qb2ludCBvbkNsaWNrPXtoYW5kbGVDbGlja0JlbG93RG9jdW1lbnR9IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L0NsYXNzTmFtZXM+XG4gICAgICAgIH1cbiAgICAgIDwvU2xhdGU+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbkVkaXRvci5wcm9wVHlwZXMgPSB7XG4gIG9uQWRkQXNzZXQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGdldEFzc2V0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25Nb2RlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGZpZWxkOiBJbW11dGFibGVQcm9wVHlwZXMubWFwLmlzUmVxdWlyZWQsXG4gIGdldEVkaXRvckNvbXBvbmVudHM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGdldFJlbWFya1BsdWdpbnM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGlzU2hvd01vZGVUb2dnbGU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBFZGl0b3I7XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
function Editor(props) {
  const {
    onAddAsset,
    getAsset,
    className,
    field,
    isShowModeToggle,
    t,
    isDisabled,
    getEditorComponents,
    getRemarkPlugins,
    onChange
  } = props;
  const editor = (0, _react.useMemo)(() => (0, _withHtml.default)((0, _slateReact.withReact)((0, _slateHistory.withHistory)((0, _withShortcodes.default)((0, _withBlocks.default)((0, _withLists.default)((0, _withInlines.default)((0, _slate.createEditor)()))))))), []);
  const emptyValue = [(0, _defaultEmptyBlock.default)()];
  let editorComponents = getEditorComponents();
  const codeBlockComponent = (0, _immutable.fromJS)(editorComponents.find(({
    type
  }) => type === 'code-block'));
  editorComponents = codeBlockComponent || editorComponents.has('code-block') ? editorComponents : editorComponents.set('code-block', {
    label: 'Code Block',
    type: 'code-block'
  });
  mergeMediaConfig(editorComponents, field);
  const [editorValue, setEditorValue] = (0, _react.useState)(props.value ? (0, _serializers.markdownToSlate)(props.value, {
    voidCodeBlock: !!codeBlockComponent,
    remarkPlugins: getRemarkPlugins()
  }) : emptyValue);
  const renderElement = (0, _react.useCallback)(props => (0, _react2.jsx)(_renderers.Element, _extends({}, props, {
    classNameWrapper: className,
    codeBlockComponent: codeBlockComponent
  })), []);
  const renderLeaf = (0, _react.useCallback)(props => (0, _react2.jsx)(_renderers.Leaf, props), []);
  (0, _react.useEffect)(() => {
    if (props.pendingFocus) {
      _slateReact.ReactEditor.focus(editor);
    }
  }, []);
  function handleMarkClick(format) {
    _slateReact.ReactEditor.focus(editor);
    (0, _toggleMark.default)(editor, format);
  }
  function handleBlockClick(format) {
    _slateReact.ReactEditor.focus(editor);
    if (format.endsWith('-list')) {
      editor.toggleList(format);
    } else {
      editor.toggleBlock(format);
    }
  }
  function handleLinkClick() {
    (0, _toggleLink.default)(editor, t('editor.editorWidgets.markdown.linkPrompt'));
    _slateReact.ReactEditor.focus(editor);
  }
  function handleToggleMode() {
    props.onMode('raw');
  }
  function handleInsertShortcode(pluginConfig) {
    (0, _insertShortcode.default)(editor, pluginConfig);
  }
  function handleKeyDown(event) {
    for (const handler of editor.keyDownHandlers || []) {
      if (handler(event, editor) === false) {
        break;
      }
    }
    _slateReact.ReactEditor.focus(editor);
  }
  function handleClickBelowDocument() {
    _slateReact.ReactEditor.focus(editor);
    _slate.Transforms.select(editor, {
      path: [0, 0],
      offset: 0
    });
    _slate.Transforms.select(editor, _slate.Editor.end(editor, []));
  }
  const [toolbarKey, setToolbarKey] = (0, _react.useState)(0);
  function handleChange(newValue) {
    if (!(0, _isEqual2.default)(newValue, editorValue)) {
      setEditorValue(() => newValue);
      onChange((0, _serializers.slateToMarkdown)(newValue, {
        voidCodeBlock: !!codeBlockComponent,
        remarkPlugins: getRemarkPlugins()
      }));
    }
    setToolbarKey(prev => prev + 1);
  }
  function hasMark(format) {
    return (0, _isMarkActive.default)(editor, format);
  }
  function hasInline(format) {
    if (format == 'link') {
      return !!(0, _getActiveLink.default)(editor);
    }
    return false;
  }
  function hasBlock(format) {
    return (0, _isCursorInBlockType.default)(editor, format);
  }
  function hasQuote() {
    return (0, _isCursorInBlockType.default)(editor, 'quote');
  }
  function hasListItems(type) {
    return (0, _isCursorInBlockType.default)(editor, type);
  }
  return (0, _react2.jsx)("div", {
    css: _ref
  }, (0, _react2.jsx)(_slateReact.Slate, {
    editor: editor,
    value: editorValue,
    onChange: handleChange
  }, (0, _react2.jsx)(_styles.EditorControlBar, null, (0, _react2.jsx)(_Toolbar.default, {
    key: toolbarKey,
    onMarkClick: handleMarkClick,
    onBlockClick: handleBlockClick,
    onLinkClick: handleLinkClick,
    onToggleMode: handleToggleMode,
    plugins: editorComponents,
    onSubmit: handleInsertShortcode,
    onAddAsset: onAddAsset,
    getAsset: getAsset,
    buttons: field.get('buttons'),
    editorComponents: field.get('editor_components'),
    hasMark: hasMark,
    hasInline: hasInline,
    hasBlock: hasBlock,
    hasQuote: hasQuote,
    hasListItems: hasListItems,
    isShowModeToggle: isShowModeToggle,
    t: t,
    disabled: isDisabled
  })), (0, _react2.jsx)(_react2.ClassNames, null, ({
    css,
    cx
  }) => (0, _react2.jsx)("div", {
    className: cx(className, css`
                    ${visualEditorStyles({
      minimal: field.get('minimal')
    })}
                  `)
  }, editorValue.length !== 0 && (0, _react2.jsx)(_slateReact.Editable, {
    className: css`
                      padding: 16px 20px 0;
                    `,
    renderElement: renderElement,
    renderLeaf: renderLeaf,
    onKeyDown: handleKeyDown,
    autoFocus: false
  }), (0, _react2.jsx)(InsertionPoint, {
    onClick: handleClickBelowDocument
  })))));
}
Editor.propTypes = {
  onAddAsset: _propTypes.default.func.isRequired,
  getAsset: _propTypes.default.func.isRequired,
  onChange: _propTypes.default.func.isRequired,
  onMode: _propTypes.default.func.isRequired,
  className: _propTypes.default.string.isRequired,
  value: _propTypes.default.string,
  field: _reactImmutableProptypes.default.map.isRequired,
  getEditorComponents: _propTypes.default.func.isRequired,
  getRemarkPlugins: _propTypes.default.func.isRequired,
  isShowModeToggle: _propTypes.default.bool.isRequired,
  t: _propTypes.default.func.isRequired
};
var _default = exports.default = Editor;