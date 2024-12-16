"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PreviewPane = void 0;
var _base = _interopRequireDefault(require("@emotion/styled/base"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _immutable = require("immutable");
var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));
var _reactFrameComponent = _interopRequireWildcard(require("react-frame-component"));
var _decapCmsUiDefault = require("decap-cms-ui-default");
var _reactRedux = require("react-redux");
var _registry = require("../../../lib/registry");
var _entries = require("../../../actions/entries");
var _UI = require("../../UI");
var _collections = require("../../../reducers/collections");
var _media = require("../../../actions/media");
var _medias = require("../../../reducers/medias");
var _fieldInference = require("../../../constants/fieldInference");
var _EditorPreviewContent = _interopRequireDefault(require("./EditorPreviewContent.js"));
var _PreviewHOC = _interopRequireDefault(require("./PreviewHOC"));
var _EditorPreview = _interopRequireDefault(require("./EditorPreview"));
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
})("width:100%;height:100%;border:none;background:#fff;border-radius:", _decapCmsUiDefault.lengths.borderRadius, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0VkaXRvci9FZGl0b3JQcmV2aWV3UGFuZS9FZGl0b3JQcmV2aWV3UGFuZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE2QnNDIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0VkaXRvci9FZGl0b3JQcmV2aWV3UGFuZS9FZGl0b3JQcmV2aWV3UGFuZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgTGlzdCwgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgRnJhbWUsIHsgRnJhbWVDb250ZXh0Q29uc3VtZXIgfSBmcm9tICdyZWFjdC1mcmFtZS1jb21wb25lbnQnO1xuaW1wb3J0IHsgbGVuZ3RocyB9IGZyb20gJ2RlY2FwLWNtcy11aS1kZWZhdWx0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7XG4gIHJlc29sdmVXaWRnZXQsXG4gIGdldFByZXZpZXdUZW1wbGF0ZSxcbiAgZ2V0UHJldmlld1N0eWxlcyxcbiAgZ2V0UmVtYXJrUGx1Z2lucyxcbn0gZnJvbSAnLi4vLi4vLi4vbGliL3JlZ2lzdHJ5JztcbmltcG9ydCB7IGdldEFsbEVudHJpZXMsIHRyeUxvYWRFbnRyeSB9IGZyb20gJy4uLy4uLy4uL2FjdGlvbnMvZW50cmllcyc7XG5pbXBvcnQgeyBFcnJvckJvdW5kYXJ5IH0gZnJvbSAnLi4vLi4vVUknO1xuaW1wb3J0IHtcbiAgc2VsZWN0VGVtcGxhdGVOYW1lLFxuICBzZWxlY3RJbmZlcnJlZEZpZWxkLFxuICBzZWxlY3RGaWVsZCxcbn0gZnJvbSAnLi4vLi4vLi4vcmVkdWNlcnMvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgYm91bmRHZXRBc3NldCB9IGZyb20gJy4uLy4uLy4uL2FjdGlvbnMvbWVkaWEnO1xuaW1wb3J0IHsgc2VsZWN0SXNMb2FkaW5nQXNzZXQgfSBmcm9tICcuLi8uLi8uLi9yZWR1Y2Vycy9tZWRpYXMnO1xuaW1wb3J0IHsgSU5GRVJBQkxFX0ZJRUxEUyB9IGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9maWVsZEluZmVyZW5jZSc7XG5pbXBvcnQgRWRpdG9yUHJldmlld0NvbnRlbnQgZnJvbSAnLi9FZGl0b3JQcmV2aWV3Q29udGVudC5qcyc7XG5pbXBvcnQgUHJldmlld0hPQyBmcm9tICcuL1ByZXZpZXdIT0MnO1xuaW1wb3J0IEVkaXRvclByZXZpZXcgZnJvbSAnLi9FZGl0b3JQcmV2aWV3JztcblxuY29uc3QgUHJldmlld1BhbmVGcmFtZSA9IHN0eWxlZChGcmFtZSlgXG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgYm9yZGVyLXJhZGl1czogJHtsZW5ndGhzLmJvcmRlclJhZGl1c307XG5cblxuYDtcblxuZXhwb3J0IGNsYXNzIFByZXZpZXdQYW5lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgZ2V0V2lkZ2V0ID0gKGZpZWxkLCB2YWx1ZSwgbWV0YWRhdGEsIHByb3BzLCBpZHggPSBudWxsKSA9PiB7XG4gICAgY29uc3QgeyBnZXRBc3NldCwgZW50cnkgfSA9IHByb3BzO1xuICAgIGNvbnN0IHdpZGdldCA9IHJlc29sdmVXaWRnZXQoZmllbGQuZ2V0KCd3aWRnZXQnKSk7XG4gICAgY29uc3Qga2V5ID0gaWR4ID8gZmllbGQuZ2V0KCduYW1lJykgKyAnXycgKyBpZHggOiBmaWVsZC5nZXQoJ25hbWUnKTtcbiAgICBjb25zdCB2YWx1ZUlzSW5NYXAgPSB2YWx1ZSAmJiAhd2lkZ2V0LmFsbG93TWFwVmFsdWUgJiYgTWFwLmlzTWFwKHZhbHVlKTtcblxuICAgIC8qKlxuICAgICAqIFVzZSBhbiBIT0MgdG8gcHJvdmlkZSBjb25kaXRpb25hbCB1cGRhdGVzIGZvciBhbGwgcHJldmlld3MuXG4gICAgICovXG4gICAgcmV0dXJuICF3aWRnZXQucHJldmlldyA/IG51bGwgOiAoXG4gICAgICA8UHJldmlld0hPQ1xuICAgICAgICBwcmV2aWV3Q29tcG9uZW50PXt3aWRnZXQucHJldmlld31cbiAgICAgICAga2V5PXtrZXl9XG4gICAgICAgIGZpZWxkPXtmaWVsZH1cbiAgICAgICAgZ2V0QXNzZXQ9e2dldEFzc2V0fVxuICAgICAgICB2YWx1ZT17dmFsdWVJc0luTWFwID8gdmFsdWUuZ2V0KGZpZWxkLmdldCgnbmFtZScpKSA6IHZhbHVlfVxuICAgICAgICBlbnRyeT17ZW50cnl9XG4gICAgICAgIGZpZWxkc01ldGFEYXRhPXttZXRhZGF0YX1cbiAgICAgICAgcmVzb2x2ZVdpZGdldD17cmVzb2x2ZVdpZGdldH1cbiAgICAgICAgZ2V0UmVtYXJrUGx1Z2lucz17Z2V0UmVtYXJrUGx1Z2luc31cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICBpbmZlcnJlZEZpZWxkcyA9IHt9O1xuXG4gIGluZmVyRmllbGRzKCkge1xuICAgIGNvbnN0IHRpdGxlRmllbGQgPSBzZWxlY3RJbmZlcnJlZEZpZWxkKHRoaXMucHJvcHMuY29sbGVjdGlvbiwgJ3RpdGxlJyk7XG4gICAgY29uc3Qgc2hvcnRUaXRsZUZpZWxkID0gc2VsZWN0SW5mZXJyZWRGaWVsZCh0aGlzLnByb3BzLmNvbGxlY3Rpb24sICdzaG9ydFRpdGxlJyk7XG4gICAgY29uc3QgYXV0aG9yRmllbGQgPSBzZWxlY3RJbmZlcnJlZEZpZWxkKHRoaXMucHJvcHMuY29sbGVjdGlvbiwgJ2F1dGhvcicpO1xuXG4gICAgdGhpcy5pbmZlcnJlZEZpZWxkcyA9IHt9O1xuICAgIGlmICh0aXRsZUZpZWxkKSB0aGlzLmluZmVycmVkRmllbGRzW3RpdGxlRmllbGRdID0gSU5GRVJBQkxFX0ZJRUxEUy50aXRsZTtcbiAgICBpZiAoc2hvcnRUaXRsZUZpZWxkKSB0aGlzLmluZmVycmVkRmllbGRzW3Nob3J0VGl0bGVGaWVsZF0gPSBJTkZFUkFCTEVfRklFTERTLnNob3J0VGl0bGU7XG4gICAgaWYgKGF1dGhvckZpZWxkKSB0aGlzLmluZmVycmVkRmllbGRzW2F1dGhvckZpZWxkXSA9IElORkVSQUJMRV9GSUVMRFMuYXV0aG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHdpZGdldCBjb21wb25lbnQgZm9yIGEgbmFtZWQgZmllbGQsIGFuZCBtYWtlcyByZWN1cnNpdmUgY2FsbHNcbiAgICogdG8gcmV0cmlldmUgY29tcG9uZW50cyBmb3IgbmVzdGVkIGFuZCBkZWVwbHkgbmVzdGVkIGZpZWxkcywgd2hpY2ggb2NjdXIgaW5cbiAgICogb2JqZWN0IGFuZCBsaXN0IHR5cGUgZmllbGRzLiBVc2VkIGludGVybmFsbHkgdG8gcmV0cmlldmUgd2lkZ2V0cywgYW5kIGFsc29cbiAgICogZXhwb3NlZCBmb3IgdXNlIGluIGN1c3RvbSBwcmV2aWV3IHRlbXBsYXRlcy5cbiAgICovXG4gIHdpZGdldEZvciA9IChcbiAgICBuYW1lLFxuICAgIGZpZWxkcyA9IHRoaXMucHJvcHMuZmllbGRzLFxuICAgIHZhbHVlcyA9IHRoaXMucHJvcHMuZW50cnkuZ2V0KCdkYXRhJyksXG4gICAgZmllbGRzTWV0YURhdGEgPSB0aGlzLnByb3BzLmZpZWxkc01ldGFEYXRhLFxuICApID0+IHtcbiAgICAvLyBXZSByZXRyaWV2ZSB0aGUgZmllbGQgYnkgbmFtZSBzbyB0aGF0IHRoaXMgZnVuY3Rpb24gY2FuIGFsc28gYmUgdXNlZCBpblxuICAgIC8vIGN1c3RvbSBwcmV2aWV3IHRlbXBsYXRlcywgd2hlcmUgdGhlIGZpZWxkIG9iamVjdCBjYW4ndCBiZSBwYXNzZWQgaW4uXG4gICAgbGV0IGZpZWxkID0gZmllbGRzICYmIGZpZWxkcy5maW5kKGYgPT4gZi5nZXQoJ25hbWUnKSA9PT0gbmFtZSk7XG4gICAgbGV0IHZhbHVlID0gTWFwLmlzTWFwKHZhbHVlcykgJiYgdmFsdWVzLmdldChmaWVsZC5nZXQoJ25hbWUnKSk7XG4gICAgaWYgKGZpZWxkLmdldCgnbWV0YScpKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMucHJvcHMuZW50cnkuZ2V0SW4oWydtZXRhJywgZmllbGQuZ2V0KCduYW1lJyldKTtcbiAgICB9XG4gICAgY29uc3QgbmVzdGVkRmllbGRzID0gZmllbGQuZ2V0KCdmaWVsZHMnKTtcbiAgICBjb25zdCBzaW5nbGVGaWVsZCA9IGZpZWxkLmdldCgnZmllbGQnKTtcbiAgICBjb25zdCBtZXRhZGF0YSA9IGZpZWxkc01ldGFEYXRhICYmIGZpZWxkc01ldGFEYXRhLmdldChmaWVsZC5nZXQoJ25hbWUnKSwgTWFwKCkpO1xuXG4gICAgaWYgKG5lc3RlZEZpZWxkcykge1xuICAgICAgZmllbGQgPSBmaWVsZC5zZXQoJ2ZpZWxkcycsIHRoaXMuZ2V0TmVzdGVkV2lkZ2V0cyhuZXN0ZWRGaWVsZHMsIHZhbHVlLCBtZXRhZGF0YSkpO1xuICAgIH1cblxuICAgIGlmIChzaW5nbGVGaWVsZCkge1xuICAgICAgZmllbGQgPSBmaWVsZC5zZXQoJ2ZpZWxkJywgdGhpcy5nZXRTaW5nbGVOZXN0ZWQoc2luZ2xlRmllbGQsIHZhbHVlLCBtZXRhZGF0YSkpO1xuICAgIH1cblxuICAgIGNvbnN0IGxhYmVsbGVkV2lkZ2V0cyA9IFsnc3RyaW5nJywgJ3RleHQnLCAnbnVtYmVyJ107XG4gICAgY29uc3QgaW5mZXJyZWRGaWVsZCA9IE9iamVjdC5lbnRyaWVzKHRoaXMuaW5mZXJyZWRGaWVsZHMpXG4gICAgICAuZmlsdGVyKChba2V5XSkgPT4ge1xuICAgICAgICBjb25zdCBmaWVsZFRvTWF0Y2ggPSBzZWxlY3RGaWVsZCh0aGlzLnByb3BzLmNvbGxlY3Rpb24sIGtleSk7XG4gICAgICAgIHJldHVybiBmaWVsZFRvTWF0Y2ggPT09IGZpZWxkO1xuICAgICAgfSlcbiAgICAgIC5tYXAoKFssIHZhbHVlXSkgPT4gdmFsdWUpWzBdO1xuXG4gICAgaWYgKGluZmVycmVkRmllbGQpIHtcbiAgICAgIHZhbHVlID0gaW5mZXJyZWRGaWVsZC5kZWZhdWx0UHJldmlldyh2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHZhbHVlICYmXG4gICAgICBsYWJlbGxlZFdpZGdldHMuaW5kZXhPZihmaWVsZC5nZXQoJ3dpZGdldCcpKSAhPT0gLTEgJiZcbiAgICAgIHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoIDwgNTBcbiAgICApIHtcbiAgICAgIHZhbHVlID0gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxzdHJvbmc+e2ZpZWxkLmdldCgnbGFiZWwnLCBmaWVsZC5nZXQoJ25hbWUnKSl9Ojwvc3Ryb25nPiB7dmFsdWV9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWUgPyB0aGlzLmdldFdpZGdldChmaWVsZCwgdmFsdWUsIG1ldGFkYXRhLCB0aGlzLnByb3BzKSA6IG51bGw7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB3aWRnZXRzIGZvciBuZXN0ZWQgZmllbGRzIChjaGlsZHJlbiBvZiBvYmplY3QvbGlzdCBmaWVsZHMpXG4gICAqL1xuICBnZXROZXN0ZWRXaWRnZXRzID0gKGZpZWxkcywgdmFsdWVzLCBmaWVsZHNNZXRhRGF0YSkgPT4ge1xuICAgIC8vIEZpZWxkcyBuZXN0ZWQgd2l0aGluIGEgbGlzdCBmaWVsZCB3aWxsIGJlIHBhaXJlZCB3aXRoIGEgTGlzdCBvZiB2YWx1ZSBNYXBzLlxuICAgIGlmIChMaXN0LmlzTGlzdCh2YWx1ZXMpKSB7XG4gICAgICByZXR1cm4gdmFsdWVzLm1hcCh2YWx1ZSA9PiB0aGlzLndpZGdldHNGb3JOZXN0ZWRGaWVsZHMoZmllbGRzLCB2YWx1ZSwgZmllbGRzTWV0YURhdGEpKTtcbiAgICB9XG4gICAgLy8gRmllbGRzIG5lc3RlZCB3aXRoaW4gYW4gb2JqZWN0IGZpZWxkIHdpbGwgYmUgcGFpcmVkIHdpdGggYSBzaW5nbGUgTWFwIG9mIHZhbHVlcy5cbiAgICByZXR1cm4gdGhpcy53aWRnZXRzRm9yTmVzdGVkRmllbGRzKGZpZWxkcywgdmFsdWVzLCBmaWVsZHNNZXRhRGF0YSk7XG4gIH07XG5cbiAgZ2V0U2luZ2xlTmVzdGVkID0gKGZpZWxkLCB2YWx1ZXMsIGZpZWxkc01ldGFEYXRhKSA9PiB7XG4gICAgaWYgKExpc3QuaXNMaXN0KHZhbHVlcykpIHtcbiAgICAgIHJldHVybiB2YWx1ZXMubWFwKCh2YWx1ZSwgaWR4KSA9PlxuICAgICAgICB0aGlzLmdldFdpZGdldChmaWVsZCwgdmFsdWUsIGZpZWxkc01ldGFEYXRhLmdldChmaWVsZC5nZXQoJ25hbWUnKSksIHRoaXMucHJvcHMsIGlkeCksXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nZXRXaWRnZXQoZmllbGQsIHZhbHVlcywgZmllbGRzTWV0YURhdGEuZ2V0KGZpZWxkLmdldCgnbmFtZScpKSwgdGhpcy5wcm9wcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFVzZSB3aWRnZXRGb3IgYXMgYSBtYXBwaW5nIGZ1bmN0aW9uIGZvciByZWN1cnNpdmUgd2lkZ2V0IHJldHJpZXZhbFxuICAgKi9cbiAgd2lkZ2V0c0Zvck5lc3RlZEZpZWxkcyA9IChmaWVsZHMsIHZhbHVlcywgZmllbGRzTWV0YURhdGEpID0+IHtcbiAgICByZXR1cm4gZmllbGRzLm1hcChmaWVsZCA9PiB0aGlzLndpZGdldEZvcihmaWVsZC5nZXQoJ25hbWUnKSwgZmllbGRzLCB2YWx1ZXMsIGZpZWxkc01ldGFEYXRhKSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gZXhpc3RzIGVudGlyZWx5IHRvIGV4cG9zZSBuZXN0ZWQgd2lkZ2V0cyBmb3Igb2JqZWN0IGFuZCBsaXN0XG4gICAqIGZpZWxkcyB0byBjdXN0b20gcHJldmlldyB0ZW1wbGF0ZXMuXG4gICAqXG4gICAqIFRPRE86IHNlZSBpZiB3aWRnZXRGb3IgY2FuIG5vdyBwcm92aWRlIHRoaXMgZnVuY3Rpb25hbGl0eSBmb3IgcHJldmlldyB0ZW1wbGF0ZXNcbiAgICovXG4gIHdpZGdldHNGb3IgPSBuYW1lID0+IHtcbiAgICBjb25zdCB7IGZpZWxkcywgZW50cnksIGZpZWxkc01ldGFEYXRhIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGZpZWxkID0gZmllbGRzLmZpbmQoZiA9PiBmLmdldCgnbmFtZScpID09PSBuYW1lKTtcbiAgICBjb25zdCBuZXN0ZWRGaWVsZHMgPSBmaWVsZCAmJiBmaWVsZC5nZXQoJ2ZpZWxkcycpO1xuICAgIGNvbnN0IHZhbHVlID0gZW50cnkuZ2V0SW4oWydkYXRhJywgZmllbGQuZ2V0KCduYW1lJyldKTtcbiAgICBjb25zdCBtZXRhZGF0YSA9IGZpZWxkc01ldGFEYXRhLmdldChmaWVsZC5nZXQoJ25hbWUnKSwgTWFwKCkpO1xuXG4gICAgaWYgKExpc3QuaXNMaXN0KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLm1hcCh2YWwgPT4ge1xuICAgICAgICBjb25zdCB3aWRnZXRzID1cbiAgICAgICAgICBuZXN0ZWRGaWVsZHMgJiZcbiAgICAgICAgICBNYXAoXG4gICAgICAgICAgICBuZXN0ZWRGaWVsZHMubWFwKChmLCBpKSA9PiBbXG4gICAgICAgICAgICAgIGYuZ2V0KCduYW1lJyksXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtpfT57dGhpcy5nZXRXaWRnZXQoZiwgdmFsLCBtZXRhZGF0YS5nZXQoZi5nZXQoJ25hbWUnKSksIHRoaXMucHJvcHMpfTwvZGl2PixcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICk7XG4gICAgICAgIHJldHVybiBNYXAoeyBkYXRhOiB2YWwsIHdpZGdldHMgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gTWFwKHtcbiAgICAgIGRhdGE6IHZhbHVlLFxuICAgICAgd2lkZ2V0czpcbiAgICAgICAgbmVzdGVkRmllbGRzICYmXG4gICAgICAgIE1hcChcbiAgICAgICAgICBuZXN0ZWRGaWVsZHMubWFwKGYgPT4gW1xuICAgICAgICAgICAgZi5nZXQoJ25hbWUnKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0V2lkZ2V0KGYsIHZhbHVlLCBtZXRhZGF0YS5nZXQoZi5nZXQoJ25hbWUnKSksIHRoaXMucHJvcHMpLFxuICAgICAgICAgIF0pLFxuICAgICAgICApLFxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGV4aXN0cyBlbnRpcmVseSB0byBleHBvc2UgY29sbGVjdGlvbnMgZnJvbSBvdXRzaWRlIG9mIHRoaXMgZW50cnlcbiAgICpcbiAgICovXG4gIGdldENvbGxlY3Rpb24gPSBhc3luYyAoY29sbGVjdGlvbk5hbWUsIHNsdWcpID0+IHtcbiAgICBjb25zdCB7IHN0YXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkQ29sbGVjdGlvbiA9IHN0YXRlLmNvbGxlY3Rpb25zLmdldChjb2xsZWN0aW9uTmFtZSk7XG5cbiAgICBpZiAodHlwZW9mIHNsdWcgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zdCBlbnRyaWVzID0gYXdhaXQgZ2V0QWxsRW50cmllcyhzdGF0ZSwgc2VsZWN0ZWRDb2xsZWN0aW9uKTtcbiAgICAgIHJldHVybiBlbnRyaWVzLm1hcChlbnRyeSA9PiBNYXAoKS5zZXQoJ2RhdGEnLCBlbnRyeS5kYXRhKSk7XG4gICAgfVxuXG4gICAgY29uc3QgZW50cnkgPSBhd2FpdCB0cnlMb2FkRW50cnkoc3RhdGUsIHNlbGVjdGVkQ29sbGVjdGlvbiwgc2x1Zyk7XG4gICAgcmV0dXJuIE1hcCgpLnNldCgnZGF0YScsIGVudHJ5LmRhdGEpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGVudHJ5LCBjb2xsZWN0aW9uLCBjb25maWcgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoIWVudHJ5IHx8ICFlbnRyeS5nZXQoJ2RhdGEnKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgcHJldmlld0NvbXBvbmVudCA9XG4gICAgICBnZXRQcmV2aWV3VGVtcGxhdGUoc2VsZWN0VGVtcGxhdGVOYW1lKGNvbGxlY3Rpb24sIGVudHJ5LmdldCgnc2x1ZycpKSkgfHwgRWRpdG9yUHJldmlldztcblxuICAgIHRoaXMuaW5mZXJGaWVsZHMoKTtcblxuICAgIGNvbnN0IHByZXZpZXdQcm9wcyA9IHtcbiAgICAgIC4uLnRoaXMucHJvcHMsXG4gICAgICB3aWRnZXRGb3I6IHRoaXMud2lkZ2V0Rm9yLFxuICAgICAgd2lkZ2V0c0ZvcjogdGhpcy53aWRnZXRzRm9yLFxuICAgICAgZ2V0Q29sbGVjdGlvbjogdGhpcy5nZXRDb2xsZWN0aW9uLFxuICAgIH07XG5cbiAgICBjb25zdCBzdHlsZUVscyA9IGdldFByZXZpZXdTdHlsZXMoKS5tYXAoKHN0eWxlLCBpKSA9PiB7XG4gICAgICBpZiAoc3R5bGUucmF3KSB7XG4gICAgICAgIHJldHVybiA8c3R5bGUga2V5PXtpfT57c3R5bGUudmFsdWV9PC9zdHlsZT47XG4gICAgICB9XG4gICAgICByZXR1cm4gPGxpbmsga2V5PXtpfSBocmVmPXtzdHlsZS52YWx1ZX0gdHlwZT1cInRleHQvY3NzXCIgcmVsPVwic3R5bGVzaGVldFwiIC8+O1xuICAgIH0pO1xuXG4gICAgaWYgKCFjb2xsZWN0aW9uKSB7XG4gICAgICA8UHJldmlld1BhbmVGcmFtZSBpZD1cInByZXZpZXctcGFuZVwiIGhlYWQ9e3N0eWxlRWxzfSAvPjtcbiAgICB9XG5cbiAgICBjb25zdCBpbml0aWFsQ29udGVudCA9IGBcbjwhRE9DVFlQRSBodG1sPlxuPGh0bWw+XG4gIDxoZWFkPjxiYXNlIHRhcmdldD1cIl9ibGFua1wiLz48L2hlYWQ+XG4gIDxib2R5PjxkaXY+PC9kaXY+PC9ib2R5PlxuPC9odG1sPlxuYDtcblxuICAgIHJldHVybiAoXG4gICAgICA8RXJyb3JCb3VuZGFyeSBjb25maWc9e2NvbmZpZ30+XG4gICAgICAgIDxQcmV2aWV3UGFuZUZyYW1lIGlkPVwicHJldmlldy1wYW5lXCIgaGVhZD17c3R5bGVFbHN9IGluaXRpYWxDb250ZW50PXtpbml0aWFsQ29udGVudH0+XG4gICAgICAgICAgPEZyYW1lQ29udGV4dENvbnN1bWVyPlxuICAgICAgICAgICAgeyh7IGRvY3VtZW50LCB3aW5kb3cgfSkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxFZGl0b3JQcmV2aWV3Q29udGVudFxuICAgICAgICAgICAgICAgICAgey4uLnsgcHJldmlld0NvbXBvbmVudCwgcHJldmlld1Byb3BzOiB7IC4uLnByZXZpZXdQcm9wcywgZG9jdW1lbnQsIHdpbmRvdyB9IH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPC9GcmFtZUNvbnRleHRDb25zdW1lcj5cbiAgICAgICAgPC9QcmV2aWV3UGFuZUZyYW1lPlxuICAgICAgPC9FcnJvckJvdW5kYXJ5PlxuICAgICk7XG4gIH1cbn1cblxuUHJldmlld1BhbmUucHJvcFR5cGVzID0ge1xuICBjb2xsZWN0aW9uOiBJbW11dGFibGVQcm9wVHlwZXMubWFwLmlzUmVxdWlyZWQsXG4gIGZpZWxkczogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgZW50cnk6IEltbXV0YWJsZVByb3BUeXBlcy5tYXAuaXNSZXF1aXJlZCxcbiAgZmllbGRzTWV0YURhdGE6IEltbXV0YWJsZVByb3BUeXBlcy5tYXAuaXNSZXF1aXJlZCxcbiAgZ2V0QXNzZXQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUpIHtcbiAgY29uc3QgaXNMb2FkaW5nQXNzZXQgPSBzZWxlY3RJc0xvYWRpbmdBc3NldChzdGF0ZS5tZWRpYXMpO1xuICByZXR1cm4geyBpc0xvYWRpbmdBc3NldCwgY29uZmlnOiBzdGF0ZS5jb25maWcsIHN0YXRlIH07XG59XG5cbmZ1bmN0aW9uIG1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCkge1xuICByZXR1cm4ge1xuICAgIGJvdW5kR2V0QXNzZXQ6IChjb2xsZWN0aW9uLCBlbnRyeSkgPT4gYm91bmRHZXRBc3NldChkaXNwYXRjaCwgY29sbGVjdGlvbiwgZW50cnkpLFxuICB9O1xufVxuXG5mdW5jdGlvbiBtZXJnZVByb3BzKHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMsIG93blByb3BzKSB7XG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGVQcm9wcyxcbiAgICAuLi5kaXNwYXRjaFByb3BzLFxuICAgIC4uLm93blByb3BzLFxuICAgIGdldEFzc2V0OiBkaXNwYXRjaFByb3BzLmJvdW5kR2V0QXNzZXQob3duUHJvcHMuY29sbGVjdGlvbiwgb3duUHJvcHMuZW50cnkpLFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzLCBtZXJnZVByb3BzKShQcmV2aWV3UGFuZSk7XG4iXX0= */"));
class PreviewPane extends _react.default.Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "getWidget", (field, value, metadata, props, idx = null) => {
      const {
        getAsset,
        entry
      } = props;
      const widget = (0, _registry.resolveWidget)(field.get('widget'));
      const key = idx ? field.get('name') + '_' + idx : field.get('name');
      const valueIsInMap = value && !widget.allowMapValue && _immutable.Map.isMap(value);

      /**
       * Use an HOC to provide conditional updates for all previews.
       */
      return !widget.preview ? null : (0, _react2.jsx)(_PreviewHOC.default, {
        previewComponent: widget.preview,
        key: key,
        field: field,
        getAsset: getAsset,
        value: valueIsInMap ? value.get(field.get('name')) : value,
        entry: entry,
        fieldsMetaData: metadata,
        resolveWidget: _registry.resolveWidget,
        getRemarkPlugins: _registry.getRemarkPlugins
      });
    });
    _defineProperty(this, "inferredFields", {});
    /**
     * Returns the widget component for a named field, and makes recursive calls
     * to retrieve components for nested and deeply nested fields, which occur in
     * object and list type fields. Used internally to retrieve widgets, and also
     * exposed for use in custom preview templates.
     */
    _defineProperty(this, "widgetFor", (name, fields = this.props.fields, values = this.props.entry.get('data'), fieldsMetaData = this.props.fieldsMetaData) => {
      // We retrieve the field by name so that this function can also be used in
      // custom preview templates, where the field object can't be passed in.
      let field = fields && fields.find(f => f.get('name') === name);
      let value = _immutable.Map.isMap(values) && values.get(field.get('name'));
      if (field.get('meta')) {
        value = this.props.entry.getIn(['meta', field.get('name')]);
      }
      const nestedFields = field.get('fields');
      const singleField = field.get('field');
      const metadata = fieldsMetaData && fieldsMetaData.get(field.get('name'), (0, _immutable.Map)());
      if (nestedFields) {
        field = field.set('fields', this.getNestedWidgets(nestedFields, value, metadata));
      }
      if (singleField) {
        field = field.set('field', this.getSingleNested(singleField, value, metadata));
      }
      const labelledWidgets = ['string', 'text', 'number'];
      const inferredField = Object.entries(this.inferredFields).filter(([key]) => {
        const fieldToMatch = (0, _collections.selectField)(this.props.collection, key);
        return fieldToMatch === field;
      }).map(([, value]) => value)[0];
      if (inferredField) {
        value = inferredField.defaultPreview(value);
      } else if (value && labelledWidgets.indexOf(field.get('widget')) !== -1 && value.toString().length < 50) {
        value = (0, _react2.jsx)("div", null, (0, _react2.jsx)("strong", null, field.get('label', field.get('name')), ":"), " ", value);
      }
      return value ? this.getWidget(field, value, metadata, this.props) : null;
    });
    /**
     * Retrieves widgets for nested fields (children of object/list fields)
     */
    _defineProperty(this, "getNestedWidgets", (fields, values, fieldsMetaData) => {
      // Fields nested within a list field will be paired with a List of value Maps.
      if (_immutable.List.isList(values)) {
        return values.map(value => this.widgetsForNestedFields(fields, value, fieldsMetaData));
      }
      // Fields nested within an object field will be paired with a single Map of values.
      return this.widgetsForNestedFields(fields, values, fieldsMetaData);
    });
    _defineProperty(this, "getSingleNested", (field, values, fieldsMetaData) => {
      if (_immutable.List.isList(values)) {
        return values.map((value, idx) => this.getWidget(field, value, fieldsMetaData.get(field.get('name')), this.props, idx));
      }
      return this.getWidget(field, values, fieldsMetaData.get(field.get('name')), this.props);
    });
    /**
     * Use widgetFor as a mapping function for recursive widget retrieval
     */
    _defineProperty(this, "widgetsForNestedFields", (fields, values, fieldsMetaData) => {
      return fields.map(field => this.widgetFor(field.get('name'), fields, values, fieldsMetaData));
    });
    /**
     * This function exists entirely to expose nested widgets for object and list
     * fields to custom preview templates.
     *
     * TODO: see if widgetFor can now provide this functionality for preview templates
     */
    _defineProperty(this, "widgetsFor", name => {
      const {
        fields,
        entry,
        fieldsMetaData
      } = this.props;
      const field = fields.find(f => f.get('name') === name);
      const nestedFields = field && field.get('fields');
      const value = entry.getIn(['data', field.get('name')]);
      const metadata = fieldsMetaData.get(field.get('name'), (0, _immutable.Map)());
      if (_immutable.List.isList(value)) {
        return value.map(val => {
          const widgets = nestedFields && (0, _immutable.Map)(nestedFields.map((f, i) => [f.get('name'), (0, _react2.jsx)("div", {
            key: i
          }, this.getWidget(f, val, metadata.get(f.get('name')), this.props))]));
          return (0, _immutable.Map)({
            data: val,
            widgets
          });
        });
      }
      return (0, _immutable.Map)({
        data: value,
        widgets: nestedFields && (0, _immutable.Map)(nestedFields.map(f => [f.get('name'), this.getWidget(f, value, metadata.get(f.get('name')), this.props)]))
      });
    });
    /**
     * This function exists entirely to expose collections from outside of this entry
     *
     */
    _defineProperty(this, "getCollection", async (collectionName, slug) => {
      const {
        state
      } = this.props;
      const selectedCollection = state.collections.get(collectionName);
      if (typeof slug === 'undefined') {
        const entries = await (0, _entries.getAllEntries)(state, selectedCollection);
        return entries.map(entry => (0, _immutable.Map)().set('data', entry.data));
      }
      const entry = await (0, _entries.tryLoadEntry)(state, selectedCollection, slug);
      return (0, _immutable.Map)().set('data', entry.data);
    });
  }
  inferFields() {
    const titleField = (0, _collections.selectInferredField)(this.props.collection, 'title');
    const shortTitleField = (0, _collections.selectInferredField)(this.props.collection, 'shortTitle');
    const authorField = (0, _collections.selectInferredField)(this.props.collection, 'author');
    this.inferredFields = {};
    if (titleField) this.inferredFields[titleField] = _fieldInference.INFERABLE_FIELDS.title;
    if (shortTitleField) this.inferredFields[shortTitleField] = _fieldInference.INFERABLE_FIELDS.shortTitle;
    if (authorField) this.inferredFields[authorField] = _fieldInference.INFERABLE_FIELDS.author;
  }
  render() {
    const {
      entry,
      collection,
      config
    } = this.props;
    if (!entry || !entry.get('data')) {
      return null;
    }
    const previewComponent = (0, _registry.getPreviewTemplate)((0, _collections.selectTemplateName)(collection, entry.get('slug'))) || _EditorPreview.default;
    this.inferFields();
    const previewProps = _objectSpread(_objectSpread({}, this.props), {}, {
      widgetFor: this.widgetFor,
      widgetsFor: this.widgetsFor,
      getCollection: this.getCollection
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
    if (!collection) {
      (0, _react2.jsx)(PreviewPaneFrame, {
        id: "preview-pane",
        head: styleEls
      });
    }
    const initialContent = `
<!DOCTYPE html>
<html>
  <head><base target="_blank"/></head>
  <body><div></div></body>
</html>
`;
    return (0, _react2.jsx)(_UI.ErrorBoundary, {
      config: config
    }, (0, _react2.jsx)(PreviewPaneFrame, {
      id: "preview-pane",
      head: styleEls,
      initialContent: initialContent
    }, (0, _react2.jsx)(_reactFrameComponent.FrameContextConsumer, null, ({
      document,
      window
    }) => {
      return (0, _react2.jsx)(_EditorPreviewContent.default, {
        previewComponent,
        previewProps: _objectSpread(_objectSpread({}, previewProps), {}, {
          document,
          window
        })
      });
    })));
  }
}
exports.PreviewPane = PreviewPane;
PreviewPane.propTypes = {
  collection: _reactImmutableProptypes.default.map.isRequired,
  fields: _reactImmutableProptypes.default.list.isRequired,
  entry: _reactImmutableProptypes.default.map.isRequired,
  fieldsMetaData: _reactImmutableProptypes.default.map.isRequired,
  getAsset: _propTypes.default.func.isRequired
};
function mapStateToProps(state) {
  const isLoadingAsset = (0, _medias.selectIsLoadingAsset)(state.medias);
  return {
    isLoadingAsset,
    config: state.config,
    state
  };
}
function mapDispatchToProps(dispatch) {
  return {
    boundGetAsset: (collection, entry) => (0, _media.boundGetAsset)(dispatch, collection, entry)
  };
}
function mergeProps(stateProps, dispatchProps, ownProps) {
  return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, stateProps), dispatchProps), ownProps), {}, {
    getAsset: dispatchProps.boundGetAsset(ownProps.collection, ownProps.entry)
  });
}
var _default = exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, mergeProps)(PreviewPane);