"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _trim = _interopRequireDefault(require("lodash/trim"));
var _trimEnd = _interopRequireDefault(require("lodash/trimEnd"));
var _utils = require("./utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  const sha = String.fromCharCode(...new Uint8Array(digest));
  return sha;
}

// based on https://github.com/auth0/auth0-spa-js/blob/9a83f698127eae7da72691b0d4b1b847567687e3/src/utils.ts#L147
function generateVerifierCode() {
  // characters that can be used for codeVerifier
  // excludes _~ as if included would cause an uneven distribution as char.length would no longer be a factor of 256
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.';
  const randomValues = Array.from(window.crypto.getRandomValues(new Uint8Array(128)));
  return randomValues.map(val => {
    return chars[val % chars.length];
  }).join('');
}
async function createCodeChallenge(codeVerifier) {
  const sha = await sha256(codeVerifier);
  // https://tools.ietf.org/html/rfc7636#appendix-A
  return btoa(sha).split('=')[0].replace(/\+/g, '-').replace(/\//g, '_');
}
const CODE_VERIFIER_STORAGE_KEY = 'decap-cms-pkce-verifier-code';
function createCodeVerifier() {
  const codeVerifier = generateVerifierCode();
  window.sessionStorage.setItem(CODE_VERIFIER_STORAGE_KEY, codeVerifier);
  return codeVerifier;
}
function getCodeVerifier() {
  return window.sessionStorage.getItem(CODE_VERIFIER_STORAGE_KEY);
}
function clearCodeVerifier() {
  window.sessionStorage.removeItem(CODE_VERIFIER_STORAGE_KEY);
}
class PkceAuthenticator {
  constructor(config = {}) {
    const baseURL = (0, _trimEnd.default)(config.base_url, '/');
    const authEndpoint = (0, _trim.default)(config.auth_endpoint, '/');
    const authTokenEndpoint = (0, _trim.default)(config.auth_token_endpoint, '/');
    this.auth_url = `${baseURL}/${authEndpoint}`;
    this.auth_token_url = `${baseURL}/${authTokenEndpoint}`;
    this.auth_token_endpoint_content_type = config.auth_token_endpoint_content_type;
    this.appID = config.app_id;
  }
  async authenticate(options, cb) {
    if ((0, _utils.isInsecureProtocol)()) {
      return cb(new Error('Cannot authenticate over insecure protocol!'));
    }
    const authURL = new URL(this.auth_url);
    authURL.searchParams.set('client_id', this.appID);
    authURL.searchParams.set('redirect_uri', document.location.origin + document.location.pathname);
    authURL.searchParams.set('response_type', 'code');
    authURL.searchParams.set('scope', options.scope);
    const state = JSON.stringify({
      auth_type: 'pkce',
      nonce: (0, _utils.createNonce)()
    });
    authURL.searchParams.set('state', state);
    authURL.searchParams.set('code_challenge_method', 'S256');
    const codeVerifier = createCodeVerifier();
    const codeChallenge = await createCodeChallenge(codeVerifier);
    authURL.searchParams.set('code_challenge', codeChallenge);
    document.location.assign(authURL.href);
  }

  /**
   * Complete authentication if we were redirected back to from the provider.
   */
  async completeAuth(cb) {
    const params = new URLSearchParams(document.location.search);

    // Remove code from url
    window.history.replaceState(null, '', document.location.pathname);
    if (!params.has('code') && !params.has('error')) {
      return;
    }
    let nonce;
    try {
      nonce = JSON.parse(params.get('state')).nonce;
    } catch (SyntaxError) {
      nonce = JSON.parse(params.get('state').replace(/\\"/g, '"')).nonce;
    }
    const validNonce = (0, _utils.validateNonce)(nonce);
    if (!validNonce) {
      return cb(new Error('Invalid nonce'));
    }
    if (params.has('error')) {
      return cb(new Error(`${params.get('error')}: ${params.get('error_description')}`));
    }
    if (params.has('code')) {
      const code = params.get('code');
      const authURL = new URL(this.auth_token_url);
      const token_request_body_object = {
        client_id: this.appID,
        code,
        grant_type: 'authorization_code',
        redirect_uri: document.location.origin + document.location.pathname,
        code_verifier: getCodeVerifier()
      };
      const response = await fetch(authURL.href, {
        method: 'POST',
        body: this.auth_token_endpoint_content_type.startsWith('application/x-www-form-urlencoded') ? new URLSearchParams(Object.entries(token_request_body_object)).toString() : JSON.stringify(token_request_body_object),
        headers: {
          'Content-Type': this.auth_token_endpoint_content_type
        }
      });
      const data = await response.json();

      //no need for verifier code so remove
      clearCodeVerifier();
      cb(null, _objectSpread({
        token: data.access_token
      }, data));
    }
  }
}
exports.default = PkceAuthenticator;