"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _trim2 = _interopRequireDefault(require("lodash/trim"));
var _trimStart = _interopRequireDefault(require("lodash/trimStart"));
var _semaphore = _interopRequireDefault(require("semaphore"));
var _commonTags = require("common-tags");
var _decapCmsLibUtil = require("decap-cms-lib-util");
var _AuthenticationPage = _interopRequireDefault(require("./AuthenticationPage"));
var _API = _interopRequireWildcard(require("./API"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const MAX_CONCURRENT_DOWNLOADS = 10;
class GitLab {
  constructor(config, options = {}) {
    _defineProperty(this, "lock", void 0);
    _defineProperty(this, "api", void 0);
    _defineProperty(this, "options", void 0);
    _defineProperty(this, "repo", void 0);
    _defineProperty(this, "isBranchConfigured", void 0);
    _defineProperty(this, "branch", void 0);
    _defineProperty(this, "apiRoot", void 0);
    _defineProperty(this, "token", void 0);
    _defineProperty(this, "squashMerges", void 0);
    _defineProperty(this, "cmsLabelPrefix", void 0);
    _defineProperty(this, "mediaFolder", void 0);
    _defineProperty(this, "previewContext", void 0);
    _defineProperty(this, "useGraphQL", void 0);
    _defineProperty(this, "graphQLAPIRoot", void 0);
    _defineProperty(this, "_mediaDisplayURLSem", void 0);
    this.options = _objectSpread({
      proxied: false,
      API: null,
      initialWorkflowStatus: ''
    }, options);
    if (!this.options.proxied && (config.backend.repo === null || config.backend.repo === undefined)) {
      throw new Error('The GitLab backend needs a "repo" in the backend configuration.');
    }
    this.api = this.options.API || null;
    this.repo = config.backend.repo || '';
    this.branch = config.backend.branch || 'master';
    this.isBranchConfigured = config.backend.branch ? true : false;
    this.apiRoot = config.backend.api_root || 'https://gitlab.com/api/v4';
    this.token = '';
    this.squashMerges = config.backend.squash_merges || false;
    this.cmsLabelPrefix = config.backend.cms_label_prefix || '';
    this.mediaFolder = config.media_folder;
    this.previewContext = config.backend.preview_context || '';
    this.useGraphQL = config.backend.use_graphql || false;
    this.graphQLAPIRoot = config.backend.graphql_api_root || 'https://gitlab.com/api/graphql';
    this.lock = (0, _decapCmsLibUtil.asyncLock)();
  }
  isGitBackend() {
    return true;
  }
  async status() {
    var _this$api;
    const auth = (await ((_this$api = this.api) === null || _this$api === void 0 ? void 0 : _this$api.user().then(user => !!user).catch(e => {
      console.warn('Failed getting GitLab user', e);
      return false;
    }))) || false;
    return {
      auth: {
        status: auth
      },
      api: {
        status: true,
        statusPage: ''
      }
    };
  }
  authComponent() {
    return _AuthenticationPage.default;
  }
  restoreUser(user) {
    return this.authenticate(user);
  }
  async authenticate(state) {
    this.token = state.token;
    this.api = new _API.default({
      token: this.token,
      branch: this.branch,
      repo: this.repo,
      apiRoot: this.apiRoot,
      squashMerges: this.squashMerges,
      cmsLabelPrefix: this.cmsLabelPrefix,
      initialWorkflowStatus: this.options.initialWorkflowStatus,
      useGraphQL: this.useGraphQL,
      graphQLAPIRoot: this.graphQLAPIRoot
    });
    const user = await this.api.user();
    const isCollab = await this.api.hasWriteAccess().catch(error => {
      error.message = (0, _commonTags.stripIndent)`
        Repo "${this.repo}" not found.

        Please ensure the repo information is spelled correctly.

        If the repo is private, make sure you're logged into a GitLab account with access.
      `;
      throw error;
    });

    // Unauthorized user
    if (!isCollab) {
      throw new Error('Your GitLab user account does not have access to this repo.');
    }
    if (!this.isBranchConfigured) {
      const defaultBranchName = await (0, _decapCmsLibUtil.getDefaultBranchName)({
        backend: 'gitlab',
        repo: this.repo,
        token: this.token,
        apiRoot: this.apiRoot
      });
      if (defaultBranchName) {
        this.branch = defaultBranchName;
      }
    }
    // Authorized user
    return _objectSpread(_objectSpread({}, user), {}, {
      login: user.username,
      token: state.token
    });
  }
  async logout() {
    this.token = null;
    return;
  }
  getToken() {
    return Promise.resolve(this.token);
  }
  filterFile(folder, file, extension, depth) {
    // gitlab paths include the root folder
    const fileFolder = (0, _trim2.default)(file.path.split(folder)[1] || '/', '/');
    return (0, _decapCmsLibUtil.filterByExtension)(file, extension) && fileFolder.split('/').length <= depth;
  }
  async entriesByFolder(folder, extension, depth) {
    let cursor;
    const listFiles = () => this.api.listFiles(folder, depth > 1).then(({
      files,
      cursor: c
    }) => {
      cursor = c.mergeMeta({
        folder,
        extension,
        depth
      });
      return files.filter(file => this.filterFile(folder, file, extension, depth));
    });
    const files = await (0, _decapCmsLibUtil.entriesByFolder)(listFiles, this.api.readFile.bind(this.api), this.api.readFileMetadata.bind(this.api), _API.API_NAME);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    files[_decapCmsLibUtil.CURSOR_COMPATIBILITY_SYMBOL] = cursor;
    return files;
  }
  async listAllFiles(folder, extension, depth) {
    const files = await this.api.listAllFiles(folder, depth > 1);
    const filtered = files.filter(file => this.filterFile(folder, file, extension, depth));
    return filtered;
  }
  async allEntriesByFolder(folder, extension, depth) {
    const files = await (0, _decapCmsLibUtil.allEntriesByFolder)({
      listAllFiles: () => this.listAllFiles(folder, extension, depth),
      readFile: this.api.readFile.bind(this.api),
      readFileMetadata: this.api.readFileMetadata.bind(this.api),
      apiName: _API.API_NAME,
      branch: this.branch,
      localForage: _decapCmsLibUtil.localForage,
      folder,
      extension,
      depth,
      getDefaultBranch: () => this.api.getDefaultBranch().then(b => ({
        name: b.name,
        sha: b.commit.id
      })),
      isShaExistsInBranch: this.api.isShaExistsInBranch.bind(this.api),
      getDifferences: (to, from) => this.api.getDifferences(to, from),
      getFileId: path => this.api.getFileId(path, this.branch),
      filterFile: file => this.filterFile(folder, file, extension, depth),
      customFetch: this.useGraphQL ? files => this.api.readFilesGraphQL(files) : undefined
    });
    return files;
  }
  entriesByFiles(files) {
    return (0, _decapCmsLibUtil.entriesByFiles)(files, this.api.readFile.bind(this.api), this.api.readFileMetadata.bind(this.api), _API.API_NAME);
  }

  // Fetches a single entry.
  getEntry(path) {
    return this.api.readFile(path).then(data => ({
      file: {
        path,
        id: null
      },
      data: data
    }));
  }
  getMedia(mediaFolder = this.mediaFolder) {
    return this.api.listAllFiles(mediaFolder).then(files => files.map(({
      id,
      name,
      path
    }) => {
      return {
        id,
        name,
        path,
        displayURL: {
          id,
          name,
          path
        }
      };
    }));
  }
  getMediaDisplayURL(displayURL) {
    this._mediaDisplayURLSem = this._mediaDisplayURLSem || (0, _semaphore.default)(MAX_CONCURRENT_DOWNLOADS);
    return (0, _decapCmsLibUtil.getMediaDisplayURL)(displayURL, this.api.readFile.bind(this.api), this._mediaDisplayURLSem);
  }
  async getMediaFile(path) {
    const name = (0, _decapCmsLibUtil.basename)(path);
    const blob = await (0, _decapCmsLibUtil.getMediaAsBlob)(path, null, this.api.readFile.bind(this.api));
    const fileObj = (0, _decapCmsLibUtil.blobToFileObj)(name, blob);
    const url = URL.createObjectURL(fileObj);
    const id = await (0, _decapCmsLibUtil.getBlobSHA)(blob);
    return {
      id,
      displayURL: url,
      path,
      name,
      size: fileObj.size,
      file: fileObj,
      url
    };
  }
  async persistEntry(entry, options) {
    // persistEntry is a transactional operation
    return (0, _decapCmsLibUtil.runWithLock)(this.lock, () => this.api.persistFiles(entry.dataFiles, entry.assets, options), 'Failed to acquire persist entry lock');
  }
  async persistMedia(mediaFile, options) {
    const fileObj = mediaFile.fileObj;
    const [id] = await Promise.all([(0, _decapCmsLibUtil.getBlobSHA)(fileObj), this.api.persistFiles([], [mediaFile], options)]);
    const {
      path
    } = mediaFile;
    const url = URL.createObjectURL(fileObj);
    return {
      displayURL: url,
      path: (0, _trimStart.default)(path, '/'),
      name: fileObj.name,
      size: fileObj.size,
      file: fileObj,
      url,
      id
    };
  }
  deleteFiles(paths, commitMessage) {
    return this.api.deleteFiles(paths, commitMessage);
  }
  traverseCursor(cursor, action) {
    return this.api.traverseCursor(cursor, action).then(async ({
      entries,
      cursor: newCursor
    }) => {
      var _cursor$meta, _cursor$meta2, _cursor$meta3;
      const [folder, depth, extension] = [(_cursor$meta = cursor.meta) === null || _cursor$meta === void 0 ? void 0 : _cursor$meta.get('folder'), (_cursor$meta2 = cursor.meta) === null || _cursor$meta2 === void 0 ? void 0 : _cursor$meta2.get('depth'), (_cursor$meta3 = cursor.meta) === null || _cursor$meta3 === void 0 ? void 0 : _cursor$meta3.get('extension')];
      if (folder && depth && extension) {
        entries = entries.filter(f => this.filterFile(folder, f, extension, depth));
        newCursor = newCursor.mergeMeta({
          folder,
          extension,
          depth
        });
      }
      const entriesWithData = await (0, _decapCmsLibUtil.entriesByFiles)(entries, this.api.readFile.bind(this.api), this.api.readFileMetadata.bind(this.api), _API.API_NAME);
      return {
        entries: entriesWithData,
        cursor: newCursor
      };
    });
  }
  loadMediaFile(branch, file) {
    const readFile = (path, id, {
      parseText
    }) => this.api.readFile(path, id, {
      branch,
      parseText
    });
    return (0, _decapCmsLibUtil.getMediaAsBlob)(file.path, null, readFile).then(blob => {
      const name = (0, _decapCmsLibUtil.basename)(file.path);
      const fileObj = (0, _decapCmsLibUtil.blobToFileObj)(name, blob);
      return {
        id: file.path,
        displayURL: URL.createObjectURL(fileObj),
        path: file.path,
        name,
        size: fileObj.size,
        file: fileObj
      };
    });
  }
  async loadEntryMediaFiles(branch, files) {
    const mediaFiles = await Promise.all(files.map(file => this.loadMediaFile(branch, file)));
    return mediaFiles;
  }
  async unpublishedEntries() {
    const listEntriesKeys = () => this.api.listUnpublishedBranches().then(branches => branches.map(branch => (0, _decapCmsLibUtil.contentKeyFromBranch)(branch)));
    const ids = await (0, _decapCmsLibUtil.unpublishedEntries)(listEntriesKeys);
    return ids;
  }
  async unpublishedEntry({
    id,
    collection,
    slug
  }) {
    if (id) {
      const data = await this.api.retrieveUnpublishedEntryData(id);
      return data;
    } else if (collection && slug) {
      const entryId = (0, _decapCmsLibUtil.generateContentKey)(collection, slug);
      const data = await this.api.retrieveUnpublishedEntryData(entryId);
      return data;
    } else {
      throw new Error('Missing unpublished entry id or collection and slug');
    }
  }
  getBranch(collection, slug) {
    const contentKey = (0, _decapCmsLibUtil.generateContentKey)(collection, slug);
    const branch = (0, _decapCmsLibUtil.branchFromContentKey)(contentKey);
    return branch;
  }
  async unpublishedEntryDataFile(collection, slug, path, id) {
    const branch = this.getBranch(collection, slug);
    const data = await this.api.readFile(path, id, {
      branch
    });
    return data;
  }
  async unpublishedEntryMediaFile(collection, slug, path, id) {
    const branch = this.getBranch(collection, slug);
    const mediaFile = await this.loadMediaFile(branch, {
      path,
      id
    });
    return mediaFile;
  }
  async updateUnpublishedEntryStatus(collection, slug, newStatus) {
    // updateUnpublishedEntryStatus is a transactional operation
    return (0, _decapCmsLibUtil.runWithLock)(this.lock, () => this.api.updateUnpublishedEntryStatus(collection, slug, newStatus), 'Failed to acquire update entry status lock');
  }
  async deleteUnpublishedEntry(collection, slug) {
    // deleteUnpublishedEntry is a transactional operation
    return (0, _decapCmsLibUtil.runWithLock)(this.lock, () => this.api.deleteUnpublishedEntry(collection, slug), 'Failed to acquire delete entry lock');
  }
  async publishUnpublishedEntry(collection, slug) {
    // publishUnpublishedEntry is a transactional operation
    return (0, _decapCmsLibUtil.runWithLock)(this.lock, () => this.api.publishUnpublishedEntry(collection, slug), 'Failed to acquire publish entry lock');
  }
  async getDeployPreview(collection, slug) {
    try {
      const statuses = await this.api.getStatuses(collection, slug);
      const deployStatus = (0, _decapCmsLibUtil.getPreviewStatus)(statuses, this.previewContext);
      if (deployStatus) {
        const {
          target_url: url,
          state
        } = deployStatus;
        return {
          url,
          status: state
        };
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }
}
exports.default = GitLab;