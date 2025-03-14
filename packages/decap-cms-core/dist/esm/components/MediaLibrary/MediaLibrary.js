"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _map2 = _interopRequireDefault(require("lodash/map"));
var _orderBy2 = _interopRequireDefault(require("lodash/orderBy"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));
var _reactRedux = require("react-redux");
var _reactPolyglot = require("react-polyglot");
var _fuzzy = _interopRequireDefault(require("fuzzy"));
var _decapCmsLibUtil = require("decap-cms-lib-util");
var _mediaLibrary = require("../../actions/mediaLibrary");
var _mediaLibrary2 = require("../../reducers/mediaLibrary");
var _MediaLibraryModal = _interopRequireWildcard(require("./MediaLibraryModal"));
var _react2 = require("@emotion/react");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Extensions used to determine which files to show when the media library is
 * accessed from an image insertion field.
 */
const IMAGE_EXTENSIONS_VIEWABLE = ['jpg', 'jpeg', 'webp', 'gif', 'png', 'bmp', 'tiff', 'svg', 'avif'];
const IMAGE_EXTENSIONS = [...IMAGE_EXTENSIONS_VIEWABLE];
class MediaLibrary extends _react.default.Component {
  constructor(...args) {
    super(...args);
    /**
     * The currently selected file and query are tracked in component state as
     * they do not impact the rest of the application.
     */
    _defineProperty(this, "state", {
      selectedFile: {},
      query: '',
      isPersisted: false
    });
    _defineProperty(this, "loadDisplayURL", file => {
      const {
        loadMediaDisplayURL
      } = this.props;
      loadMediaDisplayURL(file);
    });
    /**
     * Filter an array of file data to include only images.
     */
    _defineProperty(this, "filterImages", files => {
      return files.filter(file => {
        const ext = (0, _decapCmsLibUtil.fileExtension)(file.name).toLowerCase();
        return IMAGE_EXTENSIONS.includes(ext);
      });
    });
    /**
     * Transform file data for table display.
     */
    _defineProperty(this, "toTableData", files => {
      const tableData = files && files.map(({
        key,
        name,
        id,
        size,
        path,
        queryOrder,
        displayURL,
        draft
      }) => {
        const ext = (0, _decapCmsLibUtil.fileExtension)(name).toLowerCase();
        return {
          key,
          id,
          name,
          path,
          type: ext.toUpperCase(),
          size,
          queryOrder,
          displayURL,
          draft,
          isImage: IMAGE_EXTENSIONS.includes(ext),
          isViewableImage: IMAGE_EXTENSIONS_VIEWABLE.includes(ext)
        };
      });

      /**
       * Get the sort order for use with `lodash.orderBy`, and always add the
       * `queryOrder` sort as the lowest priority sort order.
       */
      const {
        sortFields
      } = this.state;
      const fieldNames = (0, _map2.default)(sortFields, 'fieldName').concat('queryOrder');
      const directions = (0, _map2.default)(sortFields, 'direction').concat('asc');
      return (0, _orderBy2.default)(tableData, fieldNames, directions);
    });
    _defineProperty(this, "handleClose", () => {
      this.props.closeMediaLibrary();
    });
    /**
     * Toggle asset selection on click.
     */
    _defineProperty(this, "handleAssetClick", asset => {
      const selectedFile = this.state.selectedFile.key === asset.key ? {} : asset;
      this.setState({
        selectedFile
      });
    });
    /**
     * Upload a file.
     */
    _defineProperty(this, "handlePersist", async event => {
      /**
       * Stop the browser from automatically handling the file input click, and
       * get the file for upload, and retain the synthetic event for access after
       * the asynchronous persist operation.
       */
      event.persist();
      event.stopPropagation();
      event.preventDefault();
      const {
        persistMedia,
        privateUpload,
        config,
        t,
        field
      } = this.props;
      const {
        files: fileList
      } = event.dataTransfer || event.target;
      const files = [...fileList];
      const file = files[0];
      const maxFileSize = config.get('max_file_size');
      if (maxFileSize && file.size > maxFileSize) {
        window.alert(t('mediaLibrary.mediaLibrary.fileTooLarge', {
          size: Math.floor(maxFileSize / 1000)
        }));
      } else {
        await persistMedia(file, {
          privateUpload,
          field
        });
        this.setState({
          isPersisted: true
        });
        this.scrollToTop();
      }
      event.target.value = null;
    });
    /**
     * Stores the public path of the file in the application store, where the
     * editor field that launched the media library can retrieve it.
     */
    _defineProperty(this, "handleInsert", () => {
      const {
        selectedFile
      } = this.state;
      const {
        path
      } = selectedFile;
      const {
        insertMedia,
        field
      } = this.props;
      insertMedia(path, field);
      this.handleClose();
    });
    /**
     * Removes the selected file from the backend.
     */
    _defineProperty(this, "handleDelete", () => {
      const {
        selectedFile
      } = this.state;
      const {
        files,
        deleteMedia,
        privateUpload,
        t
      } = this.props;
      if (!window.confirm(t('mediaLibrary.mediaLibrary.onDelete'))) {
        return;
      }
      const file = files.find(file => selectedFile.key === file.key);
      deleteMedia(file, {
        privateUpload
      }).then(() => {
        this.setState({
          selectedFile: {}
        });
      });
    });
    /**
     * Downloads the selected file.
     */
    _defineProperty(this, "handleDownload", () => {
      const {
        selectedFile
      } = this.state;
      const {
        displayURLs
      } = this.props;
      const url = displayURLs.getIn([selectedFile.id, 'url']) || selectedFile.url;
      if (!url) {
        return;
      }
      const filename = selectedFile.name;
      const element = document.createElement('a');
      element.setAttribute('href', url);
      element.setAttribute('download', filename);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      this.setState({
        selectedFile: {}
      });
    });
    /**
     *
     */
    _defineProperty(this, "handleLoadMore", () => {
      const {
        loadMedia,
        dynamicSearchQuery,
        page,
        privateUpload
      } = this.props;
      loadMedia({
        query: dynamicSearchQuery,
        page: page + 1,
        privateUpload
      });
    });
    /**
     * Executes media library search for implementations that support dynamic
     * search via request. For these implementations, the Enter key must be
     * pressed to execute search. If assets are being stored directly through
     * the GitHub backend, search is in-memory and occurs as the query is typed,
     * so this handler has no impact.
     */
    _defineProperty(this, "handleSearchKeyDown", async event => {
      const {
        dynamicSearch,
        loadMedia,
        privateUpload
      } = this.props;
      if (event.key === 'Enter' && dynamicSearch) {
        await loadMedia({
          query: this.state.query,
          privateUpload
        });
        this.scrollToTop();
      }
    });
    _defineProperty(this, "scrollToTop", () => {
      this.scrollContainerRef.scrollTop = 0;
    });
    /**
     * Updates query state as the user types in the search field.
     */
    _defineProperty(this, "handleSearchChange", event => {
      this.setState({
        query: event.target.value
      });
    });
    /**
     * Filters files that do not match the query. Not used for dynamic search.
     */
    _defineProperty(this, "queryFilter", (query, files) => {
      /**
       * Because file names don't have spaces, typing a space eliminates all
       * potential matches, so we strip them all out internally before running the
       * query.
       */
      const strippedQuery = query.replace(/ /g, '');
      const matches = _fuzzy.default.filter(strippedQuery, files, {
        extract: file => file.name
      });
      const matchFiles = matches.map((match, queryIndex) => {
        const file = files[match.index];
        return _objectSpread(_objectSpread({}, file), {}, {
          queryIndex
        });
      });
      return matchFiles;
    });
  }
  componentDidMount() {
    this.props.loadMedia();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    /**
     * We clear old state from the media library when it's being re-opened
     * because, when doing so on close, the state is cleared while the media
     * library is still fading away.
     */
    const isOpening = !this.props.isVisible && nextProps.isVisible;
    if (isOpening) {
      this.setState({
        selectedFile: {},
        query: ''
      });
    }
    if (this.state.isPersisted) {
      this.setState({
        selectedFile: nextProps.files[0],
        isPersisted: false
      });
    }
  }
  componentDidUpdate(prevProps) {
    const isOpening = !prevProps.isVisible && this.props.isVisible;
    if (isOpening && prevProps.privateUpload !== this.props.privateUpload) {
      this.props.loadMedia({
        privateUpload: this.props.privateUpload
      });
    }
    if (this.state.isPersisted) {
      this.setState({
        selectedFile: this.props.files[0],
        isPersisted: false
      });
    }
  }
  render() {
    const {
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
      displayURLs,
      t
    } = this.props;
    return (0, _react2.jsx)(_MediaLibraryModal.default, {
      isVisible: isVisible,
      canInsert: canInsert,
      files: files,
      dynamicSearch: dynamicSearch,
      dynamicSearchActive: dynamicSearchActive,
      forImage: forImage,
      isLoading: isLoading,
      isPersisting: isPersisting,
      isDeleting: isDeleting,
      hasNextPage: hasNextPage,
      isPaginating: isPaginating,
      privateUpload: privateUpload,
      query: this.state.query,
      selectedFile: this.state.selectedFile,
      handleFilter: this.filterImages,
      handleQuery: this.queryFilter,
      toTableData: this.toTableData,
      handleClose: this.handleClose,
      handleSearchChange: this.handleSearchChange,
      handleSearchKeyDown: this.handleSearchKeyDown,
      handlePersist: this.handlePersist,
      handleDelete: this.handleDelete,
      handleInsert: this.handleInsert,
      handleDownload: this.handleDownload,
      setScrollContainerRef: ref => this.scrollContainerRef = ref,
      handleAssetClick: this.handleAssetClick,
      handleLoadMore: this.handleLoadMore,
      displayURLs: displayURLs,
      loadDisplayURL: this.loadDisplayURL,
      t: t
    });
  }
}
_defineProperty(MediaLibrary, "propTypes", {
  isVisible: _propTypes.default.bool,
  loadMediaDisplayURL: _propTypes.default.func,
  displayURLs: _reactImmutableProptypes.default.map,
  canInsert: _propTypes.default.bool,
  files: _propTypes.default.arrayOf(_propTypes.default.shape(_MediaLibraryModal.fileShape)).isRequired,
  dynamicSearch: _propTypes.default.bool,
  dynamicSearchActive: _propTypes.default.bool,
  forImage: _propTypes.default.bool,
  isLoading: _propTypes.default.bool,
  isPersisting: _propTypes.default.bool,
  isDeleting: _propTypes.default.bool,
  hasNextPage: _propTypes.default.bool,
  isPaginating: _propTypes.default.bool,
  privateUpload: _propTypes.default.bool,
  config: _reactImmutableProptypes.default.map,
  loadMedia: _propTypes.default.func.isRequired,
  dynamicSearchQuery: _propTypes.default.string,
  page: _propTypes.default.number,
  persistMedia: _propTypes.default.func.isRequired,
  deleteMedia: _propTypes.default.func.isRequired,
  insertMedia: _propTypes.default.func.isRequired,
  closeMediaLibrary: _propTypes.default.func.isRequired,
  t: _propTypes.default.func.isRequired
});
_defineProperty(MediaLibrary, "defaultProps", {
  files: []
});
function mapStateToProps(state) {
  const {
    mediaLibrary
  } = state;
  const field = mediaLibrary.get('field');
  const mediaLibraryProps = {
    isVisible: mediaLibrary.get('isVisible'),
    canInsert: mediaLibrary.get('canInsert'),
    files: (0, _mediaLibrary2.selectMediaFiles)(state, field),
    displayURLs: mediaLibrary.get('displayURLs'),
    dynamicSearch: mediaLibrary.get('dynamicSearch'),
    dynamicSearchActive: mediaLibrary.get('dynamicSearchActive'),
    dynamicSearchQuery: mediaLibrary.get('dynamicSearchQuery'),
    forImage: mediaLibrary.get('forImage'),
    isLoading: mediaLibrary.get('isLoading'),
    isPersisting: mediaLibrary.get('isPersisting'),
    isDeleting: mediaLibrary.get('isDeleting'),
    privateUpload: mediaLibrary.get('privateUpload'),
    config: mediaLibrary.get('config'),
    page: mediaLibrary.get('page'),
    hasNextPage: mediaLibrary.get('hasNextPage'),
    isPaginating: mediaLibrary.get('isPaginating'),
    field
  };
  return _objectSpread({}, mediaLibraryProps);
}
const mapDispatchToProps = {
  loadMedia: _mediaLibrary.loadMedia,
  persistMedia: _mediaLibrary.persistMedia,
  deleteMedia: _mediaLibrary.deleteMedia,
  insertMedia: _mediaLibrary.insertMedia,
  loadMediaDisplayURL: _mediaLibrary.loadMediaDisplayURL,
  closeMediaLibrary: _mediaLibrary.closeMediaLibrary
};
var _default = exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactPolyglot.translate)()(MediaLibrary));