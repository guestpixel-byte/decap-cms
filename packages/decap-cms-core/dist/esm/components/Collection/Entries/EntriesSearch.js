"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));
var _reactRedux = require("react-redux");
var _decapCmsLibUtil = require("decap-cms-lib-util");
var _reducers = require("../../../reducers");
var _search = require("../../../actions/search");
var _Entries = _interopRequireDefault(require("./Entries"));
var _react2 = require("@emotion/react");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class EntriesSearch extends _react.default.Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "getCursor", () => {
      const {
        page
      } = this.props;
      return _decapCmsLibUtil.Cursor.create({
        actions: isNaN(page) ? [] : ['append_next']
      });
    });
    _defineProperty(this, "handleCursorActions", action => {
      const {
        page,
        searchTerm,
        searchEntries,
        collectionNames
      } = this.props;
      if (action === 'append_next') {
        const nextPage = page + 1;
        searchEntries(searchTerm, collectionNames, nextPage);
      }
    });
  }
  componentDidMount() {
    const {
      searchTerm,
      searchEntries,
      collectionNames
    } = this.props;
    searchEntries(searchTerm, collectionNames);
  }
  componentDidUpdate(prevProps) {
    const {
      searchTerm,
      collectionNames
    } = this.props;

    // check if the search parameters are the same
    if (prevProps.searchTerm === searchTerm && (0, _isEqual2.default)(prevProps.collectionNames, collectionNames)) return;
    const {
      searchEntries
    } = prevProps;
    searchEntries(searchTerm, collectionNames);
  }
  componentWillUnmount() {
    this.props.clearSearch();
  }
  render() {
    const {
      collections,
      entries,
      isFetching
    } = this.props;
    return (0, _react2.jsx)(_Entries.default, {
      cursor: this.getCursor(),
      handleCursorActions: this.handleCursorActions,
      collections: collections,
      entries: entries,
      isFetching: isFetching
    });
  }
}
_defineProperty(EntriesSearch, "propTypes", {
  isFetching: _propTypes.default.bool,
  searchEntries: _propTypes.default.func.isRequired,
  clearSearch: _propTypes.default.func.isRequired,
  searchTerm: _propTypes.default.string.isRequired,
  collections: _reactImmutableProptypes.default.seq,
  collectionNames: _propTypes.default.array,
  entries: _reactImmutableProptypes.default.list,
  page: _propTypes.default.number
});
function mapStateToProps(state, ownProps) {
  const {
    searchTerm
  } = ownProps;
  const collections = ownProps.collections.toIndexedSeq();
  const collectionNames = ownProps.collections.keySeq().toArray();
  const isFetching = state.search.isFetching;
  const page = state.search.page;
  const entries = (0, _reducers.selectSearchedEntries)(state, collectionNames);
  return {
    isFetching,
    page,
    collections,
    collectionNames,
    entries,
    searchTerm
  };
}
const mapDispatchToProps = {
  searchEntries: _search.searchEntries,
  clearSearch: _search.clearSearch
};
var _default = exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(EntriesSearch);