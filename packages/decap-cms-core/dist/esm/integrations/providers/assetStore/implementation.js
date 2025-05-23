"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _trimEnd2 = _interopRequireDefault(require("lodash/trimEnd"));
var _pickBy2 = _interopRequireDefault(require("lodash/pickBy"));
var _decapCmsLibUtil = require("decap-cms-lib-util");
var _urlHelper = require("../../../lib/urlHelper");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const {
  fetchWithTimeout: fetch
} = _decapCmsLibUtil.unsentRequest;
class AssetStore {
  constructor(config, getToken) {
    this.config = config;
    if (config.get('getSignedFormURL') == null) {
      throw 'The AssetStore integration needs the getSignedFormURL in the integration configuration.';
    }
    this.getToken = getToken;
    this.shouldConfirmUpload = config.get('shouldConfirmUpload', false);
    this.getSignedFormURL = (0, _trimEnd2.default)(config.get('getSignedFormURL'), '/');
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
  requestHeaders(headers = {}) {
    return _objectSpread({}, headers);
  }
  confirmRequest(assetID) {
    this.getToken().then(token => this.request(`${this.getSignedFormURL}/${assetID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        state: 'uploaded'
      })
    }));
  }
  async request(path, options = {}) {
    const headers = this.requestHeaders(options.headers || {});
    const url = this.urlFor(path, options);
    const response = await fetch(url, _objectSpread(_objectSpread({}, options), {}, {
      headers
    }));
    const contentType = response.headers.get('Content-Type');
    const isJson = contentType && contentType.match(/json/);
    const content = isJson ? await this.parseJsonResponse(response) : response.text();
    return content;
  }
  async retrieve(query, page, privateUpload) {
    const params = (0, _pickBy2.default)({
      search: query,
      page,
      filter: privateUpload ? 'private' : 'public'
    }, val => !!val);
    const url = (0, _urlHelper.addParams)(this.getSignedFormURL, params);
    const token = await this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };
    const response = await this.request(url, {
      headers
    });
    const files = response.map(({
      id,
      name,
      size,
      url
    }) => {
      return {
        id,
        name,
        size,
        displayURL: url,
        url,
        path: url
      };
    });
    return files;
  }
  delete(assetID) {
    const url = `${this.getSignedFormURL}/${assetID}`;
    return this.getToken().then(token => this.request(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }));
  }
  async upload(file, privateUpload = false) {
    const fileData = {
      name: file.name,
      size: file.size
    };
    if (file.type) {
      fileData.content_type = file.type;
    }
    if (privateUpload) {
      fileData.visibility = 'private';
    }
    try {
      const token = await this.getToken();
      const response = await this.request(this.getSignedFormURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(fileData)
      });
      const formURL = response.form.url;
      const formFields = response.form.fields;
      const {
        id,
        name,
        size,
        url
      } = response.asset;
      const formData = new FormData();
      Object.keys(formFields).forEach(key => formData.append(key, formFields[key]));
      formData.append('file', file, file.name);
      await this.request(formURL, {
        method: 'POST',
        body: formData
      });
      if (this.shouldConfirmUpload) {
        await this.confirmRequest(id);
      }
      const asset = {
        id,
        name,
        size,
        displayURL: url,
        url,
        path: url
      };
      return {
        success: true,
        asset
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
exports.default = AssetStore;