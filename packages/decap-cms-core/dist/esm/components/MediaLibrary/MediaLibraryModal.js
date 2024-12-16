"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileShape = exports.default = void 0;
var _base = _interopRequireDefault(require("@emotion/styled/base"));
var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _immutable = require("immutable");
var _reactPolyglot = require("react-polyglot");
var _decapCmsUiDefault = require("decap-cms-ui-default");
var _UI = require("../UI");
var _MediaLibraryTop = _interopRequireDefault(require("./MediaLibraryTop"));
var _MediaLibraryCardGrid = _interopRequireDefault(require("./MediaLibraryCardGrid"));
var _EmptyMessage = _interopRequireDefault(require("./EmptyMessage"));
var _react2 = require("@emotion/react");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Responsive styling needs to be overhauled. Current setup requires specifying
 * widths per breakpoint.
 */const cardWidth = `280px`;
const cardHeight = `240px`;
const cardMargin = `10px`;

/**
 * cardWidth + cardMargin * 2 = cardOutsideWidth
 * (not using calc because this will be nested in other calcs)
 */
const cardOutsideWidth = `300px`;
const StyledModal = /*#__PURE__*/(0, _base.default)(_UI.Modal, {
  target: "e4d0svf0",
  label: "StyledModal"
})("display:grid;grid-template-rows:120px auto;width:100%;max-width:920px;margin:0 2rem;background-color:", props => props.isPrivate && _decapCmsUiDefault.colors.grayDark, ";@media (max-width: 768px){gap:2rem;}h1{color:", props => props.isPrivate && _decapCmsUiDefault.colors.textFieldBorder, ";}button:disabled,label[disabled]{background-color:", props => props.isPrivate && `rgba(217, 217, 217, 0.15)`, ";}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL01lZGlhTGlicmFyeS9NZWRpYUxpYnJhcnlNb2RhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEyQmlDIiwiZmlsZSI6Ii4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL01lZGlhTGlicmFyeS9NZWRpYUxpYnJhcnlNb2RhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgdHJhbnNsYXRlIH0gZnJvbSAncmVhY3QtcG9seWdsb3QnO1xuaW1wb3J0IHsgY29sb3JzIH0gZnJvbSAnZGVjYXAtY21zLXVpLWRlZmF1bHQnO1xuXG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gJy4uL1VJJztcbmltcG9ydCBNZWRpYUxpYnJhcnlUb3AgZnJvbSAnLi9NZWRpYUxpYnJhcnlUb3AnO1xuaW1wb3J0IE1lZGlhTGlicmFyeUNhcmRHcmlkIGZyb20gJy4vTWVkaWFMaWJyYXJ5Q2FyZEdyaWQnO1xuaW1wb3J0IEVtcHR5TWVzc2FnZSBmcm9tICcuL0VtcHR5TWVzc2FnZSc7XG5cbi8qKlxuICogUmVzcG9uc2l2ZSBzdHlsaW5nIG5lZWRzIHRvIGJlIG92ZXJoYXVsZWQuIEN1cnJlbnQgc2V0dXAgcmVxdWlyZXMgc3BlY2lmeWluZ1xuICogd2lkdGhzIHBlciBicmVha3BvaW50LlxuICovXG5jb25zdCBjYXJkV2lkdGggPSBgMjgwcHhgO1xuY29uc3QgY2FyZEhlaWdodCA9IGAyNDBweGA7XG5jb25zdCBjYXJkTWFyZ2luID0gYDEwcHhgO1xuXG4vKipcbiAqIGNhcmRXaWR0aCArIGNhcmRNYXJnaW4gKiAyID0gY2FyZE91dHNpZGVXaWR0aFxuICogKG5vdCB1c2luZyBjYWxjIGJlY2F1c2UgdGhpcyB3aWxsIGJlIG5lc3RlZCBpbiBvdGhlciBjYWxjcylcbiAqL1xuY29uc3QgY2FyZE91dHNpZGVXaWR0aCA9IGAzMDBweGA7XG5cbmNvbnN0IFN0eWxlZE1vZGFsID0gc3R5bGVkKE1vZGFsKWBcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxMjBweCBhdXRvO1xuICB3aWR0aDogMTAwJTtcbiAgbWF4LXdpZHRoOiA5MjBweDtcbiAgbWFyZ2luOiAwIDJyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMuaXNQcml2YXRlICYmIGNvbG9ycy5ncmF5RGFya307XG5cbiAgQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gICAgZ2FwOiAycmVtO1xuICB9XG5cblxuICBoMSB7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMuaXNQcml2YXRlICYmIGNvbG9ycy50ZXh0RmllbGRCb3JkZXJ9O1xuICB9XG5cbiAgYnV0dG9uOmRpc2FibGVkLFxuICBsYWJlbFtkaXNhYmxlZF0ge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMuaXNQcml2YXRlICYmIGByZ2JhKDIxNywgMjE3LCAyMTcsIDAuMTUpYH07XG4gIH1cbmA7XG5cbmZ1bmN0aW9uIE1lZGlhTGlicmFyeU1vZGFsKHtcbiAgaXNWaXNpYmxlLFxuICBjYW5JbnNlcnQsXG4gIGZpbGVzLFxuICBkeW5hbWljU2VhcmNoLFxuICBkeW5hbWljU2VhcmNoQWN0aXZlLFxuICBmb3JJbWFnZSxcbiAgaXNMb2FkaW5nLFxuICBpc1BlcnNpc3RpbmcsXG4gIGlzRGVsZXRpbmcsXG4gIGhhc05leHRQYWdlLFxuICBpc1BhZ2luYXRpbmcsXG4gIHByaXZhdGVVcGxvYWQsXG4gIHF1ZXJ5LFxuICBzZWxlY3RlZEZpbGUsXG4gIGhhbmRsZUZpbHRlcixcbiAgaGFuZGxlUXVlcnksXG4gIHRvVGFibGVEYXRhLFxuICBoYW5kbGVDbG9zZSxcbiAgaGFuZGxlU2VhcmNoQ2hhbmdlLFxuICBoYW5kbGVTZWFyY2hLZXlEb3duLFxuICBoYW5kbGVQZXJzaXN0LFxuICBoYW5kbGVEZWxldGUsXG4gIGhhbmRsZUluc2VydCxcbiAgaGFuZGxlRG93bmxvYWQsXG4gIHNldFNjcm9sbENvbnRhaW5lclJlZixcbiAgaGFuZGxlQXNzZXRDbGljayxcbiAgaGFuZGxlTG9hZE1vcmUsXG4gIGxvYWREaXNwbGF5VVJMLFxuICBkaXNwbGF5VVJMcyxcbiAgdCxcbn0pIHtcbiAgY29uc3QgZmlsdGVyZWRGaWxlcyA9IGZvckltYWdlID8gaGFuZGxlRmlsdGVyKGZpbGVzKSA6IGZpbGVzO1xuICBjb25zdCBxdWVyaWVkRmlsZXMgPSAhZHluYW1pY1NlYXJjaCAmJiBxdWVyeSA/IGhhbmRsZVF1ZXJ5KHF1ZXJ5LCBmaWx0ZXJlZEZpbGVzKSA6IGZpbHRlcmVkRmlsZXM7XG4gIGNvbnN0IHRhYmxlRGF0YSA9IHRvVGFibGVEYXRhKHF1ZXJpZWRGaWxlcyk7XG4gIGNvbnN0IGhhc0ZpbGVzID0gZmlsZXMgJiYgISFmaWxlcy5sZW5ndGg7XG4gIGNvbnN0IGhhc0ZpbHRlcmVkRmlsZXMgPSBmaWx0ZXJlZEZpbGVzICYmICEhZmlsdGVyZWRGaWxlcy5sZW5ndGg7XG4gIGNvbnN0IGhhc1NlYXJjaFJlc3VsdHMgPSBxdWVyaWVkRmlsZXMgJiYgISFxdWVyaWVkRmlsZXMubGVuZ3RoO1xuICBjb25zdCBoYXNNZWRpYSA9IGhhc1NlYXJjaFJlc3VsdHM7XG4gIGNvbnN0IHNob3VsZFNob3dFbXB0eU1lc3NhZ2UgPSAhaGFzTWVkaWE7XG4gIGNvbnN0IGVtcHR5TWVzc2FnZSA9XG4gICAgKGlzTG9hZGluZyAmJiAhaGFzTWVkaWEgJiYgdCgnbWVkaWFMaWJyYXJ5Lm1lZGlhTGlicmFyeU1vZGFsLmxvYWRpbmcnKSkgfHxcbiAgICAoZHluYW1pY1NlYXJjaEFjdGl2ZSAmJiB0KCdtZWRpYUxpYnJhcnkubWVkaWFMaWJyYXJ5TW9kYWwubm9SZXN1bHRzJykpIHx8XG4gICAgKCFoYXNGaWxlcyAmJiB0KCdtZWRpYUxpYnJhcnkubWVkaWFMaWJyYXJ5TW9kYWwubm9Bc3NldHNGb3VuZCcpKSB8fFxuICAgICghaGFzRmlsdGVyZWRGaWxlcyAmJiB0KCdtZWRpYUxpYnJhcnkubWVkaWFMaWJyYXJ5TW9kYWwubm9JbWFnZXNGb3VuZCcpKSB8fFxuICAgICghaGFzU2VhcmNoUmVzdWx0cyAmJiB0KCdtZWRpYUxpYnJhcnkubWVkaWFMaWJyYXJ5TW9kYWwubm9SZXN1bHRzJykpO1xuXG4gIGNvbnN0IGhhc1NlbGVjdGlvbiA9IGhhc01lZGlhICYmICFpc0VtcHR5KHNlbGVjdGVkRmlsZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8U3R5bGVkTW9kYWwgaXNPcGVuPXtpc1Zpc2libGV9IG9uQ2xvc2U9e2hhbmRsZUNsb3NlfSBpc1ByaXZhdGU9e3ByaXZhdGVVcGxvYWR9PlxuICAgICAgPE1lZGlhTGlicmFyeVRvcFxuICAgICAgICB0PXt0fVxuICAgICAgICBvbkNsb3NlPXtoYW5kbGVDbG9zZX1cbiAgICAgICAgcHJpdmF0ZVVwbG9hZD17cHJpdmF0ZVVwbG9hZH1cbiAgICAgICAgZm9ySW1hZ2U9e2ZvckltYWdlfVxuICAgICAgICBvbkRvd25sb2FkPXtoYW5kbGVEb3dubG9hZH1cbiAgICAgICAgb25VcGxvYWQ9e2hhbmRsZVBlcnNpc3R9XG4gICAgICAgIHF1ZXJ5PXtxdWVyeX1cbiAgICAgICAgb25TZWFyY2hDaGFuZ2U9e2hhbmRsZVNlYXJjaENoYW5nZX1cbiAgICAgICAgb25TZWFyY2hLZXlEb3duPXtoYW5kbGVTZWFyY2hLZXlEb3dufVxuICAgICAgICBzZWFyY2hEaXNhYmxlZD17IWR5bmFtaWNTZWFyY2hBY3RpdmUgJiYgIWhhc0ZpbHRlcmVkRmlsZXN9XG4gICAgICAgIG9uRGVsZXRlPXtoYW5kbGVEZWxldGV9XG4gICAgICAgIGNhbkluc2VydD17Y2FuSW5zZXJ0fVxuICAgICAgICBvbkluc2VydD17aGFuZGxlSW5zZXJ0fVxuICAgICAgICBoYXNTZWxlY3Rpb249e2hhc1NlbGVjdGlvbn1cbiAgICAgICAgaXNQZXJzaXN0aW5nPXtpc1BlcnNpc3Rpbmd9XG4gICAgICAgIGlzRGVsZXRpbmc9e2lzRGVsZXRpbmd9XG4gICAgICAgIHNlbGVjdGVkRmlsZT17c2VsZWN0ZWRGaWxlfVxuICAgICAgLz5cbiAgICAgIHshc2hvdWxkU2hvd0VtcHR5TWVzc2FnZSA/IG51bGwgOiAoXG4gICAgICAgIDxFbXB0eU1lc3NhZ2UgY29udGVudD17ZW1wdHlNZXNzYWdlfSBpc1ByaXZhdGU9e3ByaXZhdGVVcGxvYWR9IC8+XG4gICAgICApfVxuICAgICAgPE1lZGlhTGlicmFyeUNhcmRHcmlkXG4gICAgICAgIHNldFNjcm9sbENvbnRhaW5lclJlZj17c2V0U2Nyb2xsQ29udGFpbmVyUmVmfVxuICAgICAgICBtZWRpYUl0ZW1zPXt0YWJsZURhdGF9XG4gICAgICAgIGlzU2VsZWN0ZWRGaWxlPXtmaWxlID0+IHNlbGVjdGVkRmlsZS5rZXkgPT09IGZpbGUua2V5fVxuICAgICAgICBvbkFzc2V0Q2xpY2s9e2hhbmRsZUFzc2V0Q2xpY2t9XG4gICAgICAgIGNhbkxvYWRNb3JlPXtoYXNOZXh0UGFnZX1cbiAgICAgICAgb25Mb2FkTW9yZT17aGFuZGxlTG9hZE1vcmV9XG4gICAgICAgIGlzUGFnaW5hdGluZz17aXNQYWdpbmF0aW5nfVxuICAgICAgICBwYWdpbmF0aW5nTWVzc2FnZT17dCgnbWVkaWFMaWJyYXJ5Lm1lZGlhTGlicmFyeU1vZGFsLmxvYWRpbmcnKX1cbiAgICAgICAgY2FyZERyYWZ0VGV4dD17dCgnbWVkaWFMaWJyYXJ5Lm1lZGlhTGlicmFyeUNhcmQuZHJhZnQnKX1cbiAgICAgICAgY2FyZFdpZHRoPXtjYXJkV2lkdGh9XG4gICAgICAgIGNhcmRIZWlnaHQ9e2NhcmRIZWlnaHR9XG4gICAgICAgIGNhcmRNYXJnaW49e2NhcmRNYXJnaW59XG4gICAgICAgIGlzUHJpdmF0ZT17cHJpdmF0ZVVwbG9hZH1cbiAgICAgICAgbG9hZERpc3BsYXlVUkw9e2xvYWREaXNwbGF5VVJMfVxuICAgICAgICBkaXNwbGF5VVJMcz17ZGlzcGxheVVSTHN9XG4gICAgICAvPlxuICAgIDwvU3R5bGVkTW9kYWw+XG4gICk7XG59XG5cbmV4cG9ydCBjb25zdCBmaWxlU2hhcGUgPSB7XG4gIGRpc3BsYXlVUkw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5vYmplY3RdKS5pc1JlcXVpcmVkLFxuICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBrZXk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBxdWVyeU9yZGVyOiBQcm9wVHlwZXMubnVtYmVyLFxuICBzaXplOiBQcm9wVHlwZXMubnVtYmVyLFxuICBwYXRoOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG59O1xuXG5NZWRpYUxpYnJhcnlNb2RhbC5wcm9wVHlwZXMgPSB7XG4gIGlzVmlzaWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gIGNhbkluc2VydDogUHJvcFR5cGVzLmJvb2wsXG4gIGZpbGVzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoZmlsZVNoYXBlKSkuaXNSZXF1aXJlZCxcbiAgZHluYW1pY1NlYXJjaDogUHJvcFR5cGVzLmJvb2wsXG4gIGR5bmFtaWNTZWFyY2hBY3RpdmU6IFByb3BUeXBlcy5ib29sLFxuICBmb3JJbWFnZTogUHJvcFR5cGVzLmJvb2wsXG4gIGlzTG9hZGluZzogUHJvcFR5cGVzLmJvb2wsXG4gIGlzUGVyc2lzdGluZzogUHJvcFR5cGVzLmJvb2wsXG4gIGlzRGVsZXRpbmc6IFByb3BUeXBlcy5ib29sLFxuICBoYXNOZXh0UGFnZTogUHJvcFR5cGVzLmJvb2wsXG4gIGlzUGFnaW5hdGluZzogUHJvcFR5cGVzLmJvb2wsXG4gIHByaXZhdGVVcGxvYWQ6IFByb3BUeXBlcy5ib29sLFxuICBxdWVyeTogUHJvcFR5cGVzLnN0cmluZyxcbiAgc2VsZWN0ZWRGaWxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc2hhcGUoZmlsZVNoYXBlKSwgUHJvcFR5cGVzLnNoYXBlKHt9KV0pLFxuICBoYW5kbGVGaWx0ZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGhhbmRsZVF1ZXJ5OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICB0b1RhYmxlRGF0YTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgaGFuZGxlQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGhhbmRsZVNlYXJjaENoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgaGFuZGxlU2VhcmNoS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgaGFuZGxlUGVyc2lzdDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgaGFuZGxlRGVsZXRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBoYW5kbGVJbnNlcnQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHNldFNjcm9sbENvbnRhaW5lclJlZjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgaGFuZGxlQXNzZXRDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgaGFuZGxlTG9hZE1vcmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGxvYWREaXNwbGF5VVJMOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICB0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBkaXNwbGF5VVJMczogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWFwKS5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNsYXRlKCkoTWVkaWFMaWJyYXJ5TW9kYWwpO1xuIl19 */"));
function MediaLibraryModal({
  isVisible,
  canInsert,
  files,
  dynamicSearch,
  dynamicSearchActive,
  forImage,
  isLoading,
  isPersisting,
  isDeleting,
  hasNextPage,
  isPaginating,
  privateUpload,
  query,
  selectedFile,
  handleFilter,
  handleQuery,
  toTableData,
  handleClose,
  handleSearchChange,
  handleSearchKeyDown,
  handlePersist,
  handleDelete,
  handleInsert,
  handleDownload,
  setScrollContainerRef,
  handleAssetClick,
  handleLoadMore,
  loadDisplayURL,
  displayURLs,
  t
}) {
  const filteredFiles = forImage ? handleFilter(files) : files;
  const queriedFiles = !dynamicSearch && query ? handleQuery(query, filteredFiles) : filteredFiles;
  const tableData = toTableData(queriedFiles);
  const hasFiles = files && !!files.length;
  const hasFilteredFiles = filteredFiles && !!filteredFiles.length;
  const hasSearchResults = queriedFiles && !!queriedFiles.length;
  const hasMedia = hasSearchResults;
  const shouldShowEmptyMessage = !hasMedia;
  const emptyMessage = isLoading && !hasMedia && t('mediaLibrary.mediaLibraryModal.loading') || dynamicSearchActive && t('mediaLibrary.mediaLibraryModal.noResults') || !hasFiles && t('mediaLibrary.mediaLibraryModal.noAssetsFound') || !hasFilteredFiles && t('mediaLibrary.mediaLibraryModal.noImagesFound') || !hasSearchResults && t('mediaLibrary.mediaLibraryModal.noResults');
  const hasSelection = hasMedia && !(0, _isEmpty2.default)(selectedFile);
  return (0, _react2.jsx)(StyledModal, {
    isOpen: isVisible,
    onClose: handleClose,
    isPrivate: privateUpload
  }, (0, _react2.jsx)(_MediaLibraryTop.default, {
    t: t,
    onClose: handleClose,
    privateUpload: privateUpload,
    forImage: forImage,
    onDownload: handleDownload,
    onUpload: handlePersist,
    query: query,
    onSearchChange: handleSearchChange,
    onSearchKeyDown: handleSearchKeyDown,
    searchDisabled: !dynamicSearchActive && !hasFilteredFiles,
    onDelete: handleDelete,
    canInsert: canInsert,
    onInsert: handleInsert,
    hasSelection: hasSelection,
    isPersisting: isPersisting,
    isDeleting: isDeleting,
    selectedFile: selectedFile
  }), !shouldShowEmptyMessage ? null : (0, _react2.jsx)(_EmptyMessage.default, {
    content: emptyMessage,
    isPrivate: privateUpload
  }), (0, _react2.jsx)(_MediaLibraryCardGrid.default, {
    setScrollContainerRef: setScrollContainerRef,
    mediaItems: tableData,
    isSelectedFile: file => selectedFile.key === file.key,
    onAssetClick: handleAssetClick,
    canLoadMore: hasNextPage,
    onLoadMore: handleLoadMore,
    isPaginating: isPaginating,
    paginatingMessage: t('mediaLibrary.mediaLibraryModal.loading'),
    cardDraftText: t('mediaLibrary.mediaLibraryCard.draft'),
    cardWidth: cardWidth,
    cardHeight: cardHeight,
    cardMargin: cardMargin,
    isPrivate: privateUpload,
    loadDisplayURL: loadDisplayURL,
    displayURLs: displayURLs
  }));
}
const fileShape = exports.fileShape = {
  displayURL: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]).isRequired,
  id: _propTypes.default.string.isRequired,
  key: _propTypes.default.string.isRequired,
  name: _propTypes.default.string.isRequired,
  queryOrder: _propTypes.default.number,
  size: _propTypes.default.number,
  path: _propTypes.default.string.isRequired
};
MediaLibraryModal.propTypes = {
  isVisible: _propTypes.default.bool,
  canInsert: _propTypes.default.bool,
  files: _propTypes.default.arrayOf(_propTypes.default.shape(fileShape)).isRequired,
  dynamicSearch: _propTypes.default.bool,
  dynamicSearchActive: _propTypes.default.bool,
  forImage: _propTypes.default.bool,
  isLoading: _propTypes.default.bool,
  isPersisting: _propTypes.default.bool,
  isDeleting: _propTypes.default.bool,
  hasNextPage: _propTypes.default.bool,
  isPaginating: _propTypes.default.bool,
  privateUpload: _propTypes.default.bool,
  query: _propTypes.default.string,
  selectedFile: _propTypes.default.oneOfType([_propTypes.default.shape(fileShape), _propTypes.default.shape({})]),
  handleFilter: _propTypes.default.func.isRequired,
  handleQuery: _propTypes.default.func.isRequired,
  toTableData: _propTypes.default.func.isRequired,
  handleClose: _propTypes.default.func.isRequired,
  handleSearchChange: _propTypes.default.func.isRequired,
  handleSearchKeyDown: _propTypes.default.func.isRequired,
  handlePersist: _propTypes.default.func.isRequired,
  handleDelete: _propTypes.default.func.isRequired,
  handleInsert: _propTypes.default.func.isRequired,
  setScrollContainerRef: _propTypes.default.func.isRequired,
  handleAssetClick: _propTypes.default.func.isRequired,
  handleLoadMore: _propTypes.default.func.isRequired,
  loadDisplayURL: _propTypes.default.func.isRequired,
  t: _propTypes.default.func.isRequired,
  displayURLs: _propTypes.default.instanceOf(_immutable.Map).isRequired
};
var _default = exports.default = (0, _reactPolyglot.translate)()(MediaLibraryModal);