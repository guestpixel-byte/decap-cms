"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _flatten2 = _interopRequireDefault(require("lodash/flatten"));
var _decapCmsLibUtil = require("decap-cms-lib-util");
var _Entry = require("../../../valueObjects/Entry");
var _collections = require("../../../reducers/collections");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const {
  fetchWithTimeout: fetch
} = _decapCmsLibUtil.unsentRequest;
function getSlug(path) {
  return path.split('/').pop().replace(/\.[^.]+$/, '');
}
class Algolia {
  constructor(config) {
    this.config = config;
    if (config.get('applicationID') == null || config.get('apiKey') == null) {
      throw 'The Algolia search integration needs the credentials (applicationID and apiKey) in the integration configuration.';
    }
    this.applicationID = config.get('applicationID');
    this.apiKey = config.get('apiKey');
    const prefix = config.get('indexPrefix');
    this.indexPrefix = prefix ? `${prefix}-` : '';
    this.searchURL = `https://${this.applicationID}-dsn.algolia.net/1`;
    this.entriesCache = {
      collection: null,
      page: null,
      entries: []
    };
  }
  requestHeaders(headers = {}) {
    return _objectSpread({
      'X-Algolia-API-Key': this.apiKey,
      'X-Algolia-Application-Id': this.applicationID,
      'Content-Type': 'application/json'
    }, headers);
  }
  parseJsonResponse(response) {
    return response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    });
  }
  urlFor(path, options) {
    const params = [];
    if (options.params) {
      for (const key in options.params) {
        params.push(`${key}=${encodeURIComponent(options.params[key])}`);
      }
    }
    if (params.length) {
      path += `?${params.join('&')}`;
    }
    return path;
  }
  request(path, options = {}) {
    const headers = this.requestHeaders(options.headers || {});
    const url = this.urlFor(path, options);
    return fetch(url, _objectSpread(_objectSpread({}, options), {}, {
      headers
    })).then(response => {
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.match(/json/)) {
        return this.parseJsonResponse(response);
      }
      return response.text();
    });
  }
  search(collections, searchTerm, page) {
    const searchCollections = collections.map(collection => ({
      indexName: `${this.indexPrefix}${collection}`,
      params: `query=${searchTerm}&page=${page}`
    }));
    return this.request(`${this.searchURL}/indexes/*/queries`, {
      method: 'POST',
      body: JSON.stringify({
        requests: searchCollections
      })
    }).then(response => {
      const entries = response.results.map((result, index) => result.hits.map(hit => {
        const slug = getSlug(hit.path);
        return (0, _Entry.createEntry)(collections[index], slug, hit.path, {
          data: hit.data,
          partial: true
        });
      }));
      return {
        entries: (0, _flatten2.default)(entries),
        pagination: page
      };
    });
  }
  searchBy(field, collection, query) {
    return this.request(`${this.searchURL}/indexes/${this.indexPrefix}${collection}`, {
      params: {
        restrictSearchableAttributes: field,
        query
      }
    });
  }
  listEntries(collection, page) {
    if (this.entriesCache.collection === collection && this.entriesCache.page === page) {
      return Promise.resolve({
        page: this.entriesCache.page,
        entries: this.entriesCache.entries
      });
    } else {
      return this.request(`${this.searchURL}/indexes/${this.indexPrefix}${collection.get('name')}`, {
        params: {
          page
        }
      }).then(response => {
        const entries = response.hits.map(hit => {
          const slug = (0, _collections.selectEntrySlug)(collection, hit.path);
          return (0, _Entry.createEntry)(collection.get('name'), slug, hit.path, {
            data: hit.data,
            partial: true
          });
        });
        this.entriesCache = {
          collection,
          pagination: response.page,
          entries
        };
        return {
          entries,
          pagination: response.page
        };
      });
    }
  }
  async listAllEntries(collection) {
    const params = {
      hitsPerPage: 1000
    };
    let response = await this.request(`${this.searchURL}/indexes/${this.indexPrefix}${collection.get('name')}`, {
      params
    });
    let {
      nbPages = 0,
      hits,
      page
    } = response;
    page = page + 1;
    while (page < nbPages) {
      response = await this.request(`${this.searchURL}/indexes/${this.indexPrefix}${collection.get('name')}`, {
        params: _objectSpread(_objectSpread({}, params), {}, {
          page
        })
      });
      hits = [...hits, ...response.hits];
      page = page + 1;
    }
    const entries = hits.map(hit => {
      const slug = (0, _collections.selectEntrySlug)(collection, hit.path);
      return (0, _Entry.createEntry)(collection.get('name'), slug, hit.path, {
        data: hit.data,
        partial: true
      });
    });
    return entries;
  }
  getEntry(collection, slug) {
    return this.searchBy('slug', collection.get('name'), slug).then(response => {
      const entry = response.hits.filter(hit => hit.slug === slug)[0];
      return (0, _Entry.createEntry)(collection.get('name'), slug, entry.path, {
        data: entry.data,
        partial: true
      });
    });
  }
}
exports.default = Algolia;