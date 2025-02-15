"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = remarkSquashReferences;
var _flatten2 = _interopRequireDefault(require("lodash/flatten"));
var _without2 = _interopRequireDefault(require("lodash/without"));
var _unistBuilder = _interopRequireDefault(require("unist-builder"));
var _mdastUtilDefinitions = _interopRequireDefault(require("mdast-util-definitions"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Raw markdown may contain image references or link references. Because there
 * is no way to maintain these references within the Slate AST, we convert image
 * and link references to standard images and links by putting their url's
 * inline. The definitions are then removed from the document.
 *
 * For example, the following markdown:
 *
 * ```
 * ![alpha][bravo]
 *
 * [bravo]: http://example.com/example.jpg
 * ```
 *
 * Yields:
 *
 * ```
 * ![alpha](http://example.com/example.jpg)
 * ```
 *
 */
function remarkSquashReferences() {
  return getTransform;
  function getTransform(node) {
    const getDefinition = (0, _mdastUtilDefinitions.default)(node);
    return transform.call(null, getDefinition, node);
  }
  function transform(getDefinition, node) {
    /**
     * Bind the `getDefinition` function to `transform` and recursively map all
     * nodes.
     */
    const boundTransform = transform.bind(null, getDefinition);
    const children = node.children ? node.children.map(boundTransform) : node.children;

    /**
     * Combine reference and definition nodes into standard image and link
     * nodes.
     */
    if (['imageReference', 'linkReference'].includes(node.type)) {
      const type = node.type === 'imageReference' ? 'image' : 'link';
      const definition = getDefinition(node.identifier);
      if (definition) {
        const {
          title,
          url
        } = definition;
        return (0, _unistBuilder.default)(type, {
          title,
          url,
          alt: node.alt
        }, children);
      }
      const pre = (0, _unistBuilder.default)('text', node.type === 'imageReference' ? '![' : '[');
      const post = (0, _unistBuilder.default)('text', ']');
      const nodes = children || [(0, _unistBuilder.default)('text', node.alt)];
      return [pre, ...nodes, post];
    }

    /**
     * Remove definition nodes and filter the resulting null values from the
     * filtered children array.
     */
    if (node.type === 'definition') {
      return null;
    }
    const filteredChildren = (0, _without2.default)(children, null);
    return _objectSpread(_objectSpread({}, node), {}, {
      children: (0, _flatten2.default)(filteredChildren)
    });
  }
}