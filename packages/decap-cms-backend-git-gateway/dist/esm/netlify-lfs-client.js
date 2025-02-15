"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClient = getClient;
exports.matchPath = matchPath;
var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));
var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));
var _map2 = _interopRequireDefault(require("lodash/fp/map"));
var _fromPairs2 = _interopRequireDefault(require("lodash/fp/fromPairs"));
var _flow2 = _interopRequireDefault(require("lodash/fp/flow"));
var _minimatch = _interopRequireDefault(require("minimatch"));
var _decapCmsLibUtil = require("decap-cms-lib-util");
const _excluded = ["sha"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function matchPath({
  patterns
}, path) {
  return patterns.some(pattern => (0, _minimatch.default)(path, pattern, {
    matchBase: true
  }));
}

//
// API interactions

const defaultContentHeaders = {
  Accept: 'application/vnd.git-lfs+json',
  ['Content-Type']: 'application/vnd.git-lfs+json'
};
async function resourceExists({
  rootURL,
  makeAuthorizedRequest
}, {
  sha,
  size
}) {
  const response = await makeAuthorizedRequest({
    url: `${rootURL}/verify`,
    method: 'POST',
    headers: defaultContentHeaders,
    body: JSON.stringify({
      oid: sha,
      size
    })
  });
  if (response.ok) {
    return true;
  }
  if (response.status === 404) {
    return false;
  }

  // TODO: what kind of error to throw here? APIError doesn't seem
  // to fit
}
function getTransofrmationsParams(t) {
  if ((0, _isPlainObject2.default)(t) && !(0, _isEmpty2.default)(t)) {
    const {
      nf_resize: resize,
      w,
      h
    } = t;
    return `?nf_resize=${resize}&w=${w}&h=${h}`;
  }
  return '';
}
async function getDownloadURL({
  rootURL,
  transformImages: t,
  makeAuthorizedRequest
}, {
  sha
}) {
  try {
    const transformation = getTransofrmationsParams(t);
    const transformedPromise = makeAuthorizedRequest(`${rootURL}/origin/${sha}${transformation}`);
    const [transformed, original] = await Promise.all([transformedPromise,
    // if transformation is defined, we need to load the original so we have the correct meta data
    transformation ? makeAuthorizedRequest(`${rootURL}/origin/${sha}`) : transformedPromise]);
    if (!transformed.ok) {
      const error = await transformed.json();
      throw new Error(`Failed getting large media for sha '${sha}': '${error.code} - ${error.msg}'`);
    }
    const transformedBlob = await transformed.blob();
    const url = URL.createObjectURL(transformedBlob);
    return {
      url,
      blob: transformation ? await original.blob() : transformedBlob
    };
  } catch (error) {
    console.error(error);
    return {
      url: '',
      blob: new Blob()
    };
  }
}
function uploadOperation(objects) {
  return {
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
  };
}
async function getResourceUploadURLs({
  rootURL,
  makeAuthorizedRequest
}, pointerFiles) {
  const response = await makeAuthorizedRequest({
    url: `${rootURL}/objects/batch`,
    method: 'POST',
    headers: defaultContentHeaders,
    body: JSON.stringify(uploadOperation(pointerFiles))
  });
  const {
    objects
  } = await response.json();
  const uploadUrls = objects.map(object => {
    if (object.error) {
      throw new Error(object.error.message);
    }
    return object.actions.upload.href;
  });
  return uploadUrls;
}
function uploadBlob(uploadURL, blob) {
  return _decapCmsLibUtil.unsentRequest.fetchWithTimeout(uploadURL, {
    method: 'PUT',
    body: blob
  });
}
async function uploadResource(clientConfig, {
  sha,
  size
}, resource) {
  const existingFile = await resourceExists(clientConfig, {
    sha,
    size
  });
  if (existingFile) {
    return sha;
  }
  const [uploadURL] = await getResourceUploadURLs(clientConfig, [{
    sha,
    size
  }]);
  await uploadBlob(uploadURL, resource);
  return sha;
}

//
// Create Large Media client

function configureFn(config, fn) {
  return (...args) => fn(config, ...args);
}
const clientFns = {
  resourceExists,
  getResourceUploadURLs,
  getDownloadURL,
  uploadResource,
  matchPath
};
function getClient(clientConfig) {
  return (0, _flow2.default)([Object.keys, (0, _map2.default)(key => [key, configureFn(clientConfig, clientFns[key])]), _fromPairs2.default, configuredFns => _objectSpread(_objectSpread({}, configuredFns), {}, {
    patterns: clientConfig.patterns,
    enabled: clientConfig.enabled
  })])(clientFns);
}