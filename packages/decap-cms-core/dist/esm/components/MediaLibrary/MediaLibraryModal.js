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
})("display:grid;grid-template-rows:120px auto;width:100%;max-width:900px;margin:0 2rem;background-color:", props => props.isPrivate && _decapCmsUiDefault.colors.grayDark, ";h1{color:", props => props.isPrivate && _decapCmsUiDefault.colors.textFieldBorder, ";}button:disabled,label[disabled]{background-color:", props => props.isPrivate && `rgba(217, 217, 217, 0.15)`, ";}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL01lZGlhTGlicmFyeS9NZWRpYUxpYnJhcnlNb2RhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEyQmlDIiwiZmlsZSI6Ii4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL01lZGlhTGlicmFyeS9NZWRpYUxpYnJhcnlNb2RhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgdHJhbnNsYXRlIH0gZnJvbSAncmVhY3QtcG9seWdsb3QnO1xuaW1wb3J0IHsgY29sb3JzIH0gZnJvbSAnZGVjYXAtY21zLXVpLWRlZmF1bHQnO1xuXG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gJy4uL1VJJztcbmltcG9ydCBNZWRpYUxpYnJhcnlUb3AgZnJvbSAnLi9NZWRpYUxpYnJhcnlUb3AnO1xuaW1wb3J0IE1lZGlhTGlicmFyeUNhcmRHcmlkIGZyb20gJy4vTWVkaWFMaWJyYXJ5Q2FyZEdyaWQnO1xuaW1wb3J0IEVtcHR5TWVzc2FnZSBmcm9tICcuL0VtcHR5TWVzc2FnZSc7XG5cbi8qKlxuICogUmVzcG9uc2l2ZSBzdHlsaW5nIG5lZWRzIHRvIGJlIG92ZXJoYXVsZWQuIEN1cnJlbnQgc2V0dXAgcmVxdWlyZXMgc3BlY2lmeWluZ1xuICogd2lkdGhzIHBlciBicmVha3BvaW50LlxuICovXG5jb25zdCBjYXJkV2lkdGggPSBgMjgwcHhgO1xuY29uc3QgY2FyZEhlaWdodCA9IGAyNDBweGA7XG5jb25zdCBjYXJkTWFyZ2luID0gYDEwcHhgO1xuXG4vKipcbiAqIGNhcmRXaWR0aCArIGNhcmRNYXJnaW4gKiAyID0gY2FyZE91dHNpZGVXaWR0aFxuICogKG5vdCB1c2luZyBjYWxjIGJlY2F1c2UgdGhpcyB3aWxsIGJlIG5lc3RlZCBpbiBvdGhlciBjYWxjcylcbiAqL1xuY29uc3QgY2FyZE91dHNpZGVXaWR0aCA9IGAzMDBweGA7XG5cbmNvbnN0IFN0eWxlZE1vZGFsID0gc3R5bGVkKE1vZGFsKWBcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxMjBweCBhdXRvO1xuICB3aWR0aDogMTAwJTtcbiAgbWF4LXdpZHRoOiA5MDBweDtcbiAgbWFyZ2luOiAwIDJyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMuaXNQcml2YXRlICYmIGNvbG9ycy5ncmF5RGFya307XG5cblxuXG4gIGgxIHtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy5pc1ByaXZhdGUgJiYgY29sb3JzLnRleHRGaWVsZEJvcmRlcn07XG4gIH1cblxuICBidXR0b246ZGlzYWJsZWQsXG4gIGxhYmVsW2Rpc2FibGVkXSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy5pc1ByaXZhdGUgJiYgYHJnYmEoMjE3LCAyMTcsIDIxNywgMC4xNSlgfTtcbiAgfVxuYDtcblxuZnVuY3Rpb24gTWVkaWFMaWJyYXJ5TW9kYWwoe1xuICBpc1Zpc2libGUsXG4gIGNhbkluc2VydCxcbiAgZmlsZXMsXG4gIGR5bmFtaWNTZWFyY2gsXG4gIGR5bmFtaWNTZWFyY2hBY3RpdmUsXG4gIGZvckltYWdlLFxuICBpc0xvYWRpbmcsXG4gIGlzUGVyc2lzdGluZyxcbiAgaXNEZWxldGluZyxcbiAgaGFzTmV4dFBhZ2UsXG4gIGlzUGFnaW5hdGluZyxcbiAgcHJpdmF0ZVVwbG9hZCxcbiAgcXVlcnksXG4gIHNlbGVjdGVkRmlsZSxcbiAgaGFuZGxlRmlsdGVyLFxuICBoYW5kbGVRdWVyeSxcbiAgdG9UYWJsZURhdGEsXG4gIGhhbmRsZUNsb3NlLFxuICBoYW5kbGVTZWFyY2hDaGFuZ2UsXG4gIGhhbmRsZVNlYXJjaEtleURvd24sXG4gIGhhbmRsZVBlcnNpc3QsXG4gIGhhbmRsZURlbGV0ZSxcbiAgaGFuZGxlSW5zZXJ0LFxuICBoYW5kbGVEb3dubG9hZCxcbiAgc2V0U2Nyb2xsQ29udGFpbmVyUmVmLFxuICBoYW5kbGVBc3NldENsaWNrLFxuICBoYW5kbGVMb2FkTW9yZSxcbiAgbG9hZERpc3BsYXlVUkwsXG4gIGRpc3BsYXlVUkxzLFxuICB0LFxufSkge1xuICBjb25zdCBmaWx0ZXJlZEZpbGVzID0gZm9ySW1hZ2UgPyBoYW5kbGVGaWx0ZXIoZmlsZXMpIDogZmlsZXM7XG4gIGNvbnN0IHF1ZXJpZWRGaWxlcyA9ICFkeW5hbWljU2VhcmNoICYmIHF1ZXJ5ID8gaGFuZGxlUXVlcnkocXVlcnksIGZpbHRlcmVkRmlsZXMpIDogZmlsdGVyZWRGaWxlcztcbiAgY29uc3QgdGFibGVEYXRhID0gdG9UYWJsZURhdGEocXVlcmllZEZpbGVzKTtcbiAgY29uc3QgaGFzRmlsZXMgPSBmaWxlcyAmJiAhIWZpbGVzLmxlbmd0aDtcbiAgY29uc3QgaGFzRmlsdGVyZWRGaWxlcyA9IGZpbHRlcmVkRmlsZXMgJiYgISFmaWx0ZXJlZEZpbGVzLmxlbmd0aDtcbiAgY29uc3QgaGFzU2VhcmNoUmVzdWx0cyA9IHF1ZXJpZWRGaWxlcyAmJiAhIXF1ZXJpZWRGaWxlcy5sZW5ndGg7XG4gIGNvbnN0IGhhc01lZGlhID0gaGFzU2VhcmNoUmVzdWx0cztcbiAgY29uc3Qgc2hvdWxkU2hvd0VtcHR5TWVzc2FnZSA9ICFoYXNNZWRpYTtcbiAgY29uc3QgZW1wdHlNZXNzYWdlID1cbiAgICAoaXNMb2FkaW5nICYmICFoYXNNZWRpYSAmJiB0KCdtZWRpYUxpYnJhcnkubWVkaWFMaWJyYXJ5TW9kYWwubG9hZGluZycpKSB8fFxuICAgIChkeW5hbWljU2VhcmNoQWN0aXZlICYmIHQoJ21lZGlhTGlicmFyeS5tZWRpYUxpYnJhcnlNb2RhbC5ub1Jlc3VsdHMnKSkgfHxcbiAgICAoIWhhc0ZpbGVzICYmIHQoJ21lZGlhTGlicmFyeS5tZWRpYUxpYnJhcnlNb2RhbC5ub0Fzc2V0c0ZvdW5kJykpIHx8XG4gICAgKCFoYXNGaWx0ZXJlZEZpbGVzICYmIHQoJ21lZGlhTGlicmFyeS5tZWRpYUxpYnJhcnlNb2RhbC5ub0ltYWdlc0ZvdW5kJykpIHx8XG4gICAgKCFoYXNTZWFyY2hSZXN1bHRzICYmIHQoJ21lZGlhTGlicmFyeS5tZWRpYUxpYnJhcnlNb2RhbC5ub1Jlc3VsdHMnKSk7XG5cbiAgY29uc3QgaGFzU2VsZWN0aW9uID0gaGFzTWVkaWEgJiYgIWlzRW1wdHkoc2VsZWN0ZWRGaWxlKTtcblxuICByZXR1cm4gKFxuICAgIDxTdHlsZWRNb2RhbCBpc09wZW49e2lzVmlzaWJsZX0gb25DbG9zZT17aGFuZGxlQ2xvc2V9IGlzUHJpdmF0ZT17cHJpdmF0ZVVwbG9hZH0+XG4gICAgICA8TWVkaWFMaWJyYXJ5VG9wXG4gICAgICAgIHQ9e3R9XG4gICAgICAgIG9uQ2xvc2U9e2hhbmRsZUNsb3NlfVxuICAgICAgICBwcml2YXRlVXBsb2FkPXtwcml2YXRlVXBsb2FkfVxuICAgICAgICBmb3JJbWFnZT17Zm9ySW1hZ2V9XG4gICAgICAgIG9uRG93bmxvYWQ9e2hhbmRsZURvd25sb2FkfVxuICAgICAgICBvblVwbG9hZD17aGFuZGxlUGVyc2lzdH1cbiAgICAgICAgcXVlcnk9e3F1ZXJ5fVxuICAgICAgICBvblNlYXJjaENoYW5nZT17aGFuZGxlU2VhcmNoQ2hhbmdlfVxuICAgICAgICBvblNlYXJjaEtleURvd249e2hhbmRsZVNlYXJjaEtleURvd259XG4gICAgICAgIHNlYXJjaERpc2FibGVkPXshZHluYW1pY1NlYXJjaEFjdGl2ZSAmJiAhaGFzRmlsdGVyZWRGaWxlc31cbiAgICAgICAgb25EZWxldGU9e2hhbmRsZURlbGV0ZX1cbiAgICAgICAgY2FuSW5zZXJ0PXtjYW5JbnNlcnR9XG4gICAgICAgIG9uSW5zZXJ0PXtoYW5kbGVJbnNlcnR9XG4gICAgICAgIGhhc1NlbGVjdGlvbj17aGFzU2VsZWN0aW9ufVxuICAgICAgICBpc1BlcnNpc3Rpbmc9e2lzUGVyc2lzdGluZ31cbiAgICAgICAgaXNEZWxldGluZz17aXNEZWxldGluZ31cbiAgICAgICAgc2VsZWN0ZWRGaWxlPXtzZWxlY3RlZEZpbGV9XG4gICAgICAvPlxuICAgICAgeyFzaG91bGRTaG93RW1wdHlNZXNzYWdlID8gbnVsbCA6IChcbiAgICAgICAgPEVtcHR5TWVzc2FnZSBjb250ZW50PXtlbXB0eU1lc3NhZ2V9IGlzUHJpdmF0ZT17cHJpdmF0ZVVwbG9hZH0gLz5cbiAgICAgICl9XG4gICAgICA8TWVkaWFMaWJyYXJ5Q2FyZEdyaWRcbiAgICAgICAgc2V0U2Nyb2xsQ29udGFpbmVyUmVmPXtzZXRTY3JvbGxDb250YWluZXJSZWZ9XG4gICAgICAgIG1lZGlhSXRlbXM9e3RhYmxlRGF0YX1cbiAgICAgICAgaXNTZWxlY3RlZEZpbGU9e2ZpbGUgPT4gc2VsZWN0ZWRGaWxlLmtleSA9PT0gZmlsZS5rZXl9XG4gICAgICAgIG9uQXNzZXRDbGljaz17aGFuZGxlQXNzZXRDbGlja31cbiAgICAgICAgY2FuTG9hZE1vcmU9e2hhc05leHRQYWdlfVxuICAgICAgICBvbkxvYWRNb3JlPXtoYW5kbGVMb2FkTW9yZX1cbiAgICAgICAgaXNQYWdpbmF0aW5nPXtpc1BhZ2luYXRpbmd9XG4gICAgICAgIHBhZ2luYXRpbmdNZXNzYWdlPXt0KCdtZWRpYUxpYnJhcnkubWVkaWFMaWJyYXJ5TW9kYWwubG9hZGluZycpfVxuICAgICAgICBjYXJkRHJhZnRUZXh0PXt0KCdtZWRpYUxpYnJhcnkubWVkaWFMaWJyYXJ5Q2FyZC5kcmFmdCcpfVxuICAgICAgICBjYXJkV2lkdGg9e2NhcmRXaWR0aH1cbiAgICAgICAgY2FyZEhlaWdodD17Y2FyZEhlaWdodH1cbiAgICAgICAgY2FyZE1hcmdpbj17Y2FyZE1hcmdpbn1cbiAgICAgICAgaXNQcml2YXRlPXtwcml2YXRlVXBsb2FkfVxuICAgICAgICBsb2FkRGlzcGxheVVSTD17bG9hZERpc3BsYXlVUkx9XG4gICAgICAgIGRpc3BsYXlVUkxzPXtkaXNwbGF5VVJMc31cbiAgICAgIC8+XG4gICAgPC9TdHlsZWRNb2RhbD5cbiAgKTtcbn1cblxuZXhwb3J0IGNvbnN0IGZpbGVTaGFwZSA9IHtcbiAgZGlzcGxheVVSTDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm9iamVjdF0pLmlzUmVxdWlyZWQsXG4gIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGtleTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHF1ZXJ5T3JkZXI6IFByb3BUeXBlcy5udW1iZXIsXG4gIHNpemU6IFByb3BUeXBlcy5udW1iZXIsXG4gIHBhdGg6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbn07XG5cbk1lZGlhTGlicmFyeU1vZGFsLnByb3BUeXBlcyA9IHtcbiAgaXNWaXNpYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgY2FuSW5zZXJ0OiBQcm9wVHlwZXMuYm9vbCxcbiAgZmlsZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZShmaWxlU2hhcGUpKS5pc1JlcXVpcmVkLFxuICBkeW5hbWljU2VhcmNoOiBQcm9wVHlwZXMuYm9vbCxcbiAgZHluYW1pY1NlYXJjaEFjdGl2ZTogUHJvcFR5cGVzLmJvb2wsXG4gIGZvckltYWdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgaXNMb2FkaW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgaXNQZXJzaXN0aW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgaXNEZWxldGluZzogUHJvcFR5cGVzLmJvb2wsXG4gIGhhc05leHRQYWdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgaXNQYWdpbmF0aW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgcHJpdmF0ZVVwbG9hZDogUHJvcFR5cGVzLmJvb2wsXG4gIHF1ZXJ5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBzZWxlY3RlZEZpbGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zaGFwZShmaWxlU2hhcGUpLCBQcm9wVHlwZXMuc2hhcGUoe30pXSksXG4gIGhhbmRsZUZpbHRlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgaGFuZGxlUXVlcnk6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHRvVGFibGVEYXRhOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBoYW5kbGVDbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgaGFuZGxlU2VhcmNoQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBoYW5kbGVTZWFyY2hLZXlEb3duOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBoYW5kbGVQZXJzaXN0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBoYW5kbGVEZWxldGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGhhbmRsZUluc2VydDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgc2V0U2Nyb2xsQ29udGFpbmVyUmVmOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBoYW5kbGVBc3NldENsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBoYW5kbGVMb2FkTW9yZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgbG9hZERpc3BsYXlVUkw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGRpc3BsYXlVUkxzOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihNYXApLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2xhdGUoKShNZWRpYUxpYnJhcnlNb2RhbCk7XG4iXX0= */"));
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