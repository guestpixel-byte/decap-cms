"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GitLfsClient = void 0;
var _minimatch = _interopRequireDefault(require("minimatch"));
var _decapCmsLibUtil = require("decap-cms-lib-util");
const _excluded = ["sha"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class GitLfsClient {
  constructor(enabled, rootURL, patterns, makeAuthorizedRequest) {
    this.enabled = enabled;
    this.rootURL = rootURL;
    this.patterns = patterns;
    this.makeAuthorizedRequest = makeAuthorizedRequest;
  }
  matchPath(path) {
    return this.patterns.some(pattern => (0, _minimatch.default)(path, pattern, {
      matchBase: true
    }));
  }
  async uploadResource(pointer, resource) {
    const requests = await this.getResourceUploadRequests([pointer]);
    for (const request of requests) {
      await this.doUpload(request.actions.upload, resource);
      if (request.actions.verify) {
        await this.doVerify(request.actions.verify, request);
      }
    }
    return pointer.sha;
  }
  async doUpload(upload, resource) {
    await _decapCmsLibUtil.unsentRequest.fetchWithTimeout(decodeURI(upload.href), {
      method: 'PUT',
      body: resource,
      headers: upload.header
    });
  }
  async doVerify(verify, object) {
    this.makeAuthorizedRequest({
      url: decodeURI(verify.href),
      method: 'POST',
      headers: _objectSpread(_objectSpread({}, GitLfsClient.defaultContentHeaders), verify.header),
      body: JSON.stringify({
        oid: object.oid,
        size: object.size
      })
    });
  }
  async getResourceUploadRequests(objects) {
    const response = await this.makeAuthorizedRequest({
      url: `${this.rootURL}/objects/batch`,
      method: 'POST',
      headers: GitLfsClient.defaultContentHeaders,
      body: JSON.stringify({
        operation: 'upload',
        transfers: ['basic'],
        objects: objects.map(_ref => {
          let {
              sha
            } = _ref,
            rest = _objectWithoutProperties(_ref, _excluded);
          return _objectSpread(_objectSpread({}, rest), {}, {
            oid: sha
          });
        })
      })
    });
    return (await response.json()).objects.filter(object => {
      if ('error' in object) {
        console.error(object.error);
        return false;
      }
      return object.actions;
    });
  }
}
exports.GitLfsClient = GitLfsClient;
_defineProperty(GitLfsClient, "defaultContentHeaders", {
  Accept: 'application/vnd.git-lfs+json',
  ['Content-Type']: 'application/vnd.git-lfs+json'
});