"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _decapCmsBackendGithub = require("decap-cms-backend-github");
var _decapCmsLibUtil = require("decap-cms-lib-util");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class API extends _decapCmsBackendGithub.API {
  constructor(config) {
    super(_objectSpread({
      getUser: () => Promise.reject('Never used')
    }, config));
    _defineProperty(this, "tokenPromise", void 0);
    _defineProperty(this, "commitAuthor", void 0);
    _defineProperty(this, "isLargeMedia", void 0);
    this.apiRoot = config.apiRoot;
    this.tokenPromise = config.tokenPromise;
    this.commitAuthor = config.commitAuthor;
    this.isLargeMedia = config.isLargeMedia;
    this.repoURL = '';
    this.originRepoURL = '';
  }
  hasWriteAccess() {
    return this.getDefaultBranch().then(() => true).catch(error => {
      if (error.status === 401) {
        if (error.message === 'Bad credentials') {
          throw new _decapCmsLibUtil.APIError('Git Gateway Error: Please ask your site administrator to reissue the Git Gateway token.', error.status, 'Git Gateway');
        } else {
          return false;
        }
      } else if (error.status === 404 && (error.message === undefined || error.message === 'Unable to locate site configuration')) {
        throw new _decapCmsLibUtil.APIError(`Git Gateway Error: Please make sure Git Gateway is enabled on your site.`, error.status, 'Git Gateway');
      } else {
        console.error('Problem fetching repo data from Git Gateway');
        throw error;
      }
    });
  }
  requestHeaders(headers = {}) {
    return this.tokenPromise().then(jwtToken => {
      const baseHeader = _objectSpread({
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json; charset=utf-8'
      }, headers);
      return baseHeader;
    });
  }
  handleRequestError(error, responseStatus) {
    throw new _decapCmsLibUtil.APIError(error.message || error.msg, responseStatus, 'Git Gateway');
  }
  user() {
    return Promise.resolve(_objectSpread({
      login: ''
    }, this.commitAuthor));
  }
  async getHeadReference(head) {
    if (!this.repoOwner) {
      // get the repo owner from the branch url
      // this is required for returning the full head reference, e.g. owner:head
      // when filtering pull requests based on the head
      const branch = await this.getDefaultBranch();
      const self = branch._links.self;
      const regex = new RegExp('https?://.+?/repos/(.+?)/');
      const owner = self.match(regex);
      this.repoOwner = owner ? owner[1] : '';
    }
    return super.getHeadReference(head);
  }
  commit(message, changeTree) {
    const commitParams = {
      message,
      tree: changeTree.sha,
      parents: changeTree.parentSha ? [changeTree.parentSha] : []
    };
    if (this.commitAuthor) {
      commitParams.author = _objectSpread(_objectSpread({}, this.commitAuthor), {}, {
        date: new Date().toISOString()
      });
    }
    return this.request('/git/commits', {
      method: 'POST',
      body: JSON.stringify(commitParams)
    });
  }
  nextUrlProcessor() {
    return url => url.replace(/^(?:[a-z]+:\/\/.+?\/.+?\/.+?\/)/, `${this.apiRoot}/`);
  }
  async diffFromFile(file) {
    const diff = await super.diffFromFile(file);
    return _objectSpread(_objectSpread({}, diff), {}, {
      binary: diff.binary || (await this.isLargeMedia(file.filename))
    });
  }
}
exports.default = API;