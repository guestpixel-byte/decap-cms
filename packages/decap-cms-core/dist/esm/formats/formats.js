"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frontmatterFormats = exports.formatExtensions = exports.extensionFormatters = void 0;
exports.getFormatExtensions = getFormatExtensions;
exports.resolveFormat = resolveFormat;
var _get2 = _interopRequireDefault(require("lodash/get"));
var _immutable = require("immutable");
var _yaml = _interopRequireDefault(require("./yaml"));
var _toml = _interopRequireDefault(require("./toml"));
var _json = _interopRequireDefault(require("./json"));
var _frontmatter = require("./frontmatter");
var _registry = require("../lib/registry");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const frontmatterFormats = exports.frontmatterFormats = ['yaml-frontmatter', 'toml-frontmatter', 'json-frontmatter'];
const formatExtensions = exports.formatExtensions = {
  yml: 'yml',
  yaml: 'yml',
  toml: 'toml',
  json: 'json',
  frontmatter: 'md',
  'json-frontmatter': 'md',
  'toml-frontmatter': 'md',
  'yaml-frontmatter': 'md'
};
function getFormatExtensions() {
  return _objectSpread(_objectSpread({}, formatExtensions), (0, _registry.getCustomFormatsExtensions)());
}
const extensionFormatters = exports.extensionFormatters = {
  yml: _yaml.default,
  yaml: _yaml.default,
  toml: _toml.default,
  json: _json.default,
  md: _frontmatter.FrontmatterInfer,
  markdown: _frontmatter.FrontmatterInfer,
  html: _frontmatter.FrontmatterInfer
};
function formatByName(name, customDelimiter) {
  const formatters = _objectSpread({
    yml: _yaml.default,
    yaml: _yaml.default,
    toml: _toml.default,
    json: _json.default,
    frontmatter: _frontmatter.FrontmatterInfer,
    'json-frontmatter': (0, _frontmatter.frontmatterJSON)(customDelimiter),
    'toml-frontmatter': (0, _frontmatter.frontmatterTOML)(customDelimiter),
    'yaml-frontmatter': (0, _frontmatter.frontmatterYAML)(customDelimiter)
  }, (0, _registry.getCustomFormatsFormatters)());
  if (name in formatters) {
    return formatters[name];
  }
  throw new Error(`No formatter available with name: ${name}`);
}
function frontmatterDelimiterIsList(frontmatterDelimiter) {
  return _immutable.List.isList(frontmatterDelimiter);
}
function resolveFormat(collection, entry) {
  // Check for custom delimiter
  const frontmatter_delimiter = collection.get('frontmatter_delimiter');
  const customDelimiter = frontmatterDelimiterIsList(frontmatter_delimiter) ? frontmatter_delimiter.toArray() : frontmatter_delimiter;

  // If the format is specified in the collection, use that format.
  const formatSpecification = collection.get('format');
  if (formatSpecification) {
    return formatByName(formatSpecification, customDelimiter);
  }

  // If a file already exists, infer the format from its file extension.
  const filePath = entry && entry.path;
  if (filePath) {
    const fileExtension = filePath.split('.').pop();
    if (fileExtension) {
      return (0, _get2.default)(extensionFormatters, fileExtension);
    }
  }

  // If creating a new file, and an `extension` is specified in the
  //   collection config, infer the format from that extension.
  const extension = collection.get('extension');
  if (extension) {
    return (0, _get2.default)(extensionFormatters, extension);
  }

  // If no format is specified and it cannot be inferred, return the default.
  return formatByName('frontmatter', customDelimiter);
}