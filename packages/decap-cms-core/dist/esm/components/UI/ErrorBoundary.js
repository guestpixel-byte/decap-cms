"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ErrorBoundary = void 0;
var _base = _interopRequireDefault(require("@emotion/styled/base"));
var _truncate2 = _interopRequireDefault(require("lodash/truncate"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactPolyglot = require("react-polyglot");
var _yaml = _interopRequireDefault(require("yaml"));
var _copyTextToClipboard = _interopRequireDefault(require("copy-text-to-clipboard"));
var _decapCmsLibUtil = require("decap-cms-lib-util");
var _decapCmsUiDefault = require("decap-cms-ui-default");
var _cleanStack = _interopRequireDefault(require("clean-stack"));
var _react2 = require("@emotion/react");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const ISSUE_URL = 'https://github.com/decaporg/decap-cms/issues/new?';
function getIssueTemplate({
  version,
  provider,
  browser,
  config
}) {
  return `
**Describe the bug**

**To Reproduce**

**Expected behavior**

**Screenshots**

**Applicable Versions:**
 - Decap CMS version: \`${version}\`
 - Git provider: \`${provider}\`
 - Browser version: \`${browser}\`

**CMS configuration**
\`\`\`
${config}
\`\`\`

**Additional context**
`;
}
function buildIssueTemplate({
  config
}) {
  let version = '';
  if (typeof DECAP_CMS_VERSION === 'string') {
    version = `decap-cms@${DECAP_CMS_VERSION}`;
  } else if (typeof "3.4.0" === 'string') {
    version = `decap-cms-app@${"3.4.0"}`;
  }
  const template = getIssueTemplate({
    version,
    provider: config.backend.name,
    browser: navigator.userAgent,
    config: _yaml.default.stringify(config)
  });
  return template;
}
function buildIssueUrl({
  title,
  config
}) {
  try {
    const body = buildIssueTemplate({
      config
    });
    const params = new URLSearchParams();
    params.append('title', (0, _truncate2.default)(title, {
      length: 100
    }));
    params.append('body', (0, _truncate2.default)(body, {
      length: 4000,
      omission: '\n...'
    }));
    params.append('labels', 'type: bug');
    return `${ISSUE_URL}${params.toString()}`;
  } catch (e) {
    console.log(e);
    return `${ISSUE_URL}template=bug_report.md`;
  }
}
const ErrorBoundaryContainer = /*#__PURE__*/(0, _base.default)("div", {
  target: "emw4gx72",
  label: "ErrorBoundaryContainer"
})("padding:40px;h1{font-size:28px;color:", _decapCmsUiDefault.colors.text, ";}h2{font-size:20px;}strong{color:", _decapCmsUiDefault.colors.textLead, ";font-weight:500;}hr{width:200px;margin:30px 0;border:0;height:1px;background-color:", _decapCmsUiDefault.colors.text, ";}a{color:", _decapCmsUiDefault.colors.active, ";}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1VJL0Vycm9yQm91bmRhcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0V5QyIsImZpbGUiOiIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9VSS9FcnJvckJvdW5kYXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyB0cmFuc2xhdGUgfSBmcm9tICdyZWFjdC1wb2x5Z2xvdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeWFtbCBmcm9tICd5YW1sJztcbmltcG9ydCB7IHRydW5jYXRlIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBjb3B5VG9DbGlwYm9hcmQgZnJvbSAnY29weS10ZXh0LXRvLWNsaXBib2FyZCc7XG5pbXBvcnQgeyBsb2NhbEZvcmFnZSB9IGZyb20gJ2RlY2FwLWNtcy1saWItdXRpbCc7XG5pbXBvcnQgeyBidXR0b25zLCBjb2xvcnMgfSBmcm9tICdkZWNhcC1jbXMtdWktZGVmYXVsdCc7XG5pbXBvcnQgY2xlYW5TdGFjayBmcm9tICdjbGVhbi1zdGFjayc7XG5cbmNvbnN0IElTU1VFX1VSTCA9ICdodHRwczovL2dpdGh1Yi5jb20vZGVjYXBvcmcvZGVjYXAtY21zL2lzc3Vlcy9uZXc/JztcblxuZnVuY3Rpb24gZ2V0SXNzdWVUZW1wbGF0ZSh7IHZlcnNpb24sIHByb3ZpZGVyLCBicm93c2VyLCBjb25maWcgfSkge1xuICByZXR1cm4gYFxuKipEZXNjcmliZSB0aGUgYnVnKipcblxuKipUbyBSZXByb2R1Y2UqKlxuXG4qKkV4cGVjdGVkIGJlaGF2aW9yKipcblxuKipTY3JlZW5zaG90cyoqXG5cbioqQXBwbGljYWJsZSBWZXJzaW9uczoqKlxuIC0gRGVjYXAgQ01TIHZlcnNpb246IFxcYCR7dmVyc2lvbn1cXGBcbiAtIEdpdCBwcm92aWRlcjogXFxgJHtwcm92aWRlcn1cXGBcbiAtIEJyb3dzZXIgdmVyc2lvbjogXFxgJHticm93c2VyfVxcYFxuXG4qKkNNUyBjb25maWd1cmF0aW9uKipcblxcYFxcYFxcYFxuJHtjb25maWd9XG5cXGBcXGBcXGBcblxuKipBZGRpdGlvbmFsIGNvbnRleHQqKlxuYDtcbn1cblxuZnVuY3Rpb24gYnVpbGRJc3N1ZVRlbXBsYXRlKHsgY29uZmlnIH0pIHtcbiAgbGV0IHZlcnNpb24gPSAnJztcbiAgaWYgKHR5cGVvZiBERUNBUF9DTVNfVkVSU0lPTiA9PT0gJ3N0cmluZycpIHtcbiAgICB2ZXJzaW9uID0gYGRlY2FwLWNtc0Ake0RFQ0FQX0NNU19WRVJTSU9OfWA7XG4gIH0gZWxzZSBpZiAodHlwZW9mIERFQ0FQX0NNU19BUFBfVkVSU0lPTiA9PT0gJ3N0cmluZycpIHtcbiAgICB2ZXJzaW9uID0gYGRlY2FwLWNtcy1hcHBAJHtERUNBUF9DTVNfQVBQX1ZFUlNJT059YDtcbiAgfVxuICBjb25zdCB0ZW1wbGF0ZSA9IGdldElzc3VlVGVtcGxhdGUoe1xuICAgIHZlcnNpb24sXG4gICAgcHJvdmlkZXI6IGNvbmZpZy5iYWNrZW5kLm5hbWUsXG4gICAgYnJvd3NlcjogbmF2aWdhdG9yLnVzZXJBZ2VudCxcbiAgICBjb25maWc6IHlhbWwuc3RyaW5naWZ5KGNvbmZpZyksXG4gIH0pO1xuXG4gIHJldHVybiB0ZW1wbGF0ZTtcbn1cblxuZnVuY3Rpb24gYnVpbGRJc3N1ZVVybCh7IHRpdGxlLCBjb25maWcgfSkge1xuICB0cnkge1xuICAgIGNvbnN0IGJvZHkgPSBidWlsZElzc3VlVGVtcGxhdGUoeyBjb25maWcgfSk7XG5cbiAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgcGFyYW1zLmFwcGVuZCgndGl0bGUnLCB0cnVuY2F0ZSh0aXRsZSwgeyBsZW5ndGg6IDEwMCB9KSk7XG4gICAgcGFyYW1zLmFwcGVuZCgnYm9keScsIHRydW5jYXRlKGJvZHksIHsgbGVuZ3RoOiA0MDAwLCBvbWlzc2lvbjogJ1xcbi4uLicgfSkpO1xuICAgIHBhcmFtcy5hcHBlbmQoJ2xhYmVscycsICd0eXBlOiBidWcnKTtcblxuICAgIHJldHVybiBgJHtJU1NVRV9VUkx9JHtwYXJhbXMudG9TdHJpbmcoKX1gO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG4gICAgcmV0dXJuIGAke0lTU1VFX1VSTH10ZW1wbGF0ZT1idWdfcmVwb3J0Lm1kYDtcbiAgfVxufVxuXG5jb25zdCBFcnJvckJvdW5kYXJ5Q29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgcGFkZGluZzogNDBweDtcblxuICBoMSB7XG4gICAgZm9udC1zaXplOiAyOHB4O1xuICAgIGNvbG9yOiAke2NvbG9ycy50ZXh0fTtcbiAgfVxuXG4gIGgyIHtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gIH1cblxuICBzdHJvbmcge1xuICAgIGNvbG9yOiAke2NvbG9ycy50ZXh0TGVhZH07XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgfVxuXG4gIGhyIHtcbiAgICB3aWR0aDogMjAwcHg7XG4gICAgbWFyZ2luOiAzMHB4IDA7XG4gICAgYm9yZGVyOiAwO1xuICAgIGhlaWdodDogMXB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLnRleHR9O1xuICB9XG5cbiAgYSB7XG4gICAgY29sb3I6ICR7Y29sb3JzLmFjdGl2ZX07XG4gIH1cbmA7XG5cbmNvbnN0IFByaXZhY3lXYXJuaW5nID0gc3R5bGVkLnNwYW5gXG4gIGNvbG9yOiAke2NvbG9ycy50ZXh0fTtcbmA7XG5cbmNvbnN0IENvcHlCdXR0b24gPSBzdHlsZWQuYnV0dG9uYFxuICAke2J1dHRvbnMuYnV0dG9ufTtcbiAgJHtidXR0b25zLmRlZmF1bHR9O1xuICAke2J1dHRvbnMuZ3JheX07XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW46IDEycHggMDtcbmA7XG5cbmZ1bmN0aW9uIFJlY292ZXJlZEVudHJ5KHsgZW50cnksIHQgfSkge1xuICBjb25zb2xlLmxvZyhlbnRyeSk7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxociAvPlxuICAgICAgPGgyPnt0KCd1aS5lcnJvckJvdW5kYXJ5LnJlY292ZXJlZEVudHJ5LmhlYWRpbmcnKX08L2gyPlxuICAgICAgPHN0cm9uZz57dCgndWkuZXJyb3JCb3VuZGFyeS5yZWNvdmVyZWRFbnRyeS53YXJuaW5nJyl9PC9zdHJvbmc+XG4gICAgICA8Q29weUJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBjb3B5VG9DbGlwYm9hcmQoZW50cnkpfT5cbiAgICAgICAge3QoJ3VpLmVycm9yQm91bmRhcnkucmVjb3ZlcmVkRW50cnkuY29weUJ1dHRvbkxhYmVsJyl9XG4gICAgICA8L0NvcHlCdXR0b24+XG4gICAgICA8cHJlPlxuICAgICAgICA8Y29kZT57ZW50cnl9PC9jb2RlPlxuICAgICAgPC9wcmU+XG4gICAgPC8+XG4gICk7XG59XG5cbmV4cG9ydCBjbGFzcyBFcnJvckJvdW5kYXJ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgdDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjb25maWc6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBoYXNFcnJvcjogZmFsc2UsXG4gICAgZXJyb3JNZXNzYWdlOiAnJyxcbiAgICBlcnJvclRpdGxlOiAnJyxcbiAgICBiYWNrdXA6ICcnLFxuICB9O1xuXG4gIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICByZXR1cm4ge1xuICAgICAgaGFzRXJyb3I6IHRydWUsXG4gICAgICBlcnJvck1lc3NhZ2U6IGNsZWFuU3RhY2soZXJyb3Iuc3RhY2ssIHsgYmFzZVBhdGg6IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gfHwgJycgfSksXG4gICAgICBlcnJvclRpdGxlOiBlcnJvci50b1N0cmluZygpLFxuICAgIH07XG4gIH1cblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93QmFja3VwKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICB0aGlzLnN0YXRlLmVycm9yTWVzc2FnZSAhPT0gbmV4dFN0YXRlLmVycm9yTWVzc2FnZSB8fCB0aGlzLnN0YXRlLmJhY2t1cCAhPT0gbmV4dFN0YXRlLmJhY2t1cFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhc3luYyBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd0JhY2t1cCkge1xuICAgICAgY29uc3QgYmFja3VwID0gYXdhaXQgbG9jYWxGb3JhZ2UuZ2V0SXRlbSgnYmFja3VwJyk7XG4gICAgICBiYWNrdXAgJiYgY29uc29sZS5sb2coYmFja3VwKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBiYWNrdXAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaGFzRXJyb3IsIGVycm9yTWVzc2FnZSwgYmFja3VwLCBlcnJvclRpdGxlIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgc2hvd0JhY2t1cCwgdCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWhhc0Vycm9yKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxFcnJvckJvdW5kYXJ5Q29udGFpbmVyPlxuICAgICAgICA8aDE+e3QoJ3VpLmVycm9yQm91bmRhcnkudGl0bGUnKX08L2gxPlxuICAgICAgICA8cD5cbiAgICAgICAgICA8c3Bhbj57dCgndWkuZXJyb3JCb3VuZGFyeS5kZXRhaWxzJyl9PC9zcGFuPlxuICAgICAgICAgIDxhXG4gICAgICAgICAgICBocmVmPXtidWlsZElzc3VlVXJsKHsgdGl0bGU6IGVycm9yVGl0bGUsIGNvbmZpZzogdGhpcy5wcm9wcy5jb25maWcgfSl9XG4gICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiXG4gICAgICAgICAgICBkYXRhLXRlc3RpZD1cImlzc3VlLXVybFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3QoJ3VpLmVycm9yQm91bmRhcnkucmVwb3J0SXQnKX1cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvcD5cbiAgICAgICAgPHA+XG4gICAgICAgICAge3QoJ3VpLmVycm9yQm91bmRhcnkucHJpdmFjeVdhcm5pbmcnKVxuICAgICAgICAgICAgLnNwbGl0KCdcXG4nKVxuICAgICAgICAgICAgLm1hcCgoaXRlbSwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8UHJpdmFjeVdhcm5pbmcga2V5PXtpbmRleH0+e2l0ZW19PC9Qcml2YWN5V2FybmluZz5cbiAgICAgICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgPC9wPlxuICAgICAgICA8aHIgLz5cbiAgICAgICAgPGgyPnt0KCd1aS5lcnJvckJvdW5kYXJ5LmRldGFpbHNIZWFkaW5nJyl9PC9oMj5cbiAgICAgICAgPHA+e2Vycm9yTWVzc2FnZX08L3A+XG4gICAgICAgIHtiYWNrdXAgJiYgc2hvd0JhY2t1cCAmJiA8UmVjb3ZlcmVkRW50cnkgZW50cnk9e2JhY2t1cH0gdD17dH0gLz59XG4gICAgICA8L0Vycm9yQm91bmRhcnlDb250YWluZXI+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2xhdGUoKShFcnJvckJvdW5kYXJ5KTtcbiJdfQ== */"));
const PrivacyWarning = /*#__PURE__*/(0, _base.default)("span", {
  target: "emw4gx71",
  label: "PrivacyWarning"
})("color:", _decapCmsUiDefault.colors.text, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1VJL0Vycm9yQm91bmRhcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBb0drQyIsImZpbGUiOiIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9VSS9FcnJvckJvdW5kYXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyB0cmFuc2xhdGUgfSBmcm9tICdyZWFjdC1wb2x5Z2xvdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeWFtbCBmcm9tICd5YW1sJztcbmltcG9ydCB7IHRydW5jYXRlIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBjb3B5VG9DbGlwYm9hcmQgZnJvbSAnY29weS10ZXh0LXRvLWNsaXBib2FyZCc7XG5pbXBvcnQgeyBsb2NhbEZvcmFnZSB9IGZyb20gJ2RlY2FwLWNtcy1saWItdXRpbCc7XG5pbXBvcnQgeyBidXR0b25zLCBjb2xvcnMgfSBmcm9tICdkZWNhcC1jbXMtdWktZGVmYXVsdCc7XG5pbXBvcnQgY2xlYW5TdGFjayBmcm9tICdjbGVhbi1zdGFjayc7XG5cbmNvbnN0IElTU1VFX1VSTCA9ICdodHRwczovL2dpdGh1Yi5jb20vZGVjYXBvcmcvZGVjYXAtY21zL2lzc3Vlcy9uZXc/JztcblxuZnVuY3Rpb24gZ2V0SXNzdWVUZW1wbGF0ZSh7IHZlcnNpb24sIHByb3ZpZGVyLCBicm93c2VyLCBjb25maWcgfSkge1xuICByZXR1cm4gYFxuKipEZXNjcmliZSB0aGUgYnVnKipcblxuKipUbyBSZXByb2R1Y2UqKlxuXG4qKkV4cGVjdGVkIGJlaGF2aW9yKipcblxuKipTY3JlZW5zaG90cyoqXG5cbioqQXBwbGljYWJsZSBWZXJzaW9uczoqKlxuIC0gRGVjYXAgQ01TIHZlcnNpb246IFxcYCR7dmVyc2lvbn1cXGBcbiAtIEdpdCBwcm92aWRlcjogXFxgJHtwcm92aWRlcn1cXGBcbiAtIEJyb3dzZXIgdmVyc2lvbjogXFxgJHticm93c2VyfVxcYFxuXG4qKkNNUyBjb25maWd1cmF0aW9uKipcblxcYFxcYFxcYFxuJHtjb25maWd9XG5cXGBcXGBcXGBcblxuKipBZGRpdGlvbmFsIGNvbnRleHQqKlxuYDtcbn1cblxuZnVuY3Rpb24gYnVpbGRJc3N1ZVRlbXBsYXRlKHsgY29uZmlnIH0pIHtcbiAgbGV0IHZlcnNpb24gPSAnJztcbiAgaWYgKHR5cGVvZiBERUNBUF9DTVNfVkVSU0lPTiA9PT0gJ3N0cmluZycpIHtcbiAgICB2ZXJzaW9uID0gYGRlY2FwLWNtc0Ake0RFQ0FQX0NNU19WRVJTSU9OfWA7XG4gIH0gZWxzZSBpZiAodHlwZW9mIERFQ0FQX0NNU19BUFBfVkVSU0lPTiA9PT0gJ3N0cmluZycpIHtcbiAgICB2ZXJzaW9uID0gYGRlY2FwLWNtcy1hcHBAJHtERUNBUF9DTVNfQVBQX1ZFUlNJT059YDtcbiAgfVxuICBjb25zdCB0ZW1wbGF0ZSA9IGdldElzc3VlVGVtcGxhdGUoe1xuICAgIHZlcnNpb24sXG4gICAgcHJvdmlkZXI6IGNvbmZpZy5iYWNrZW5kLm5hbWUsXG4gICAgYnJvd3NlcjogbmF2aWdhdG9yLnVzZXJBZ2VudCxcbiAgICBjb25maWc6IHlhbWwuc3RyaW5naWZ5KGNvbmZpZyksXG4gIH0pO1xuXG4gIHJldHVybiB0ZW1wbGF0ZTtcbn1cblxuZnVuY3Rpb24gYnVpbGRJc3N1ZVVybCh7IHRpdGxlLCBjb25maWcgfSkge1xuICB0cnkge1xuICAgIGNvbnN0IGJvZHkgPSBidWlsZElzc3VlVGVtcGxhdGUoeyBjb25maWcgfSk7XG5cbiAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgcGFyYW1zLmFwcGVuZCgndGl0bGUnLCB0cnVuY2F0ZSh0aXRsZSwgeyBsZW5ndGg6IDEwMCB9KSk7XG4gICAgcGFyYW1zLmFwcGVuZCgnYm9keScsIHRydW5jYXRlKGJvZHksIHsgbGVuZ3RoOiA0MDAwLCBvbWlzc2lvbjogJ1xcbi4uLicgfSkpO1xuICAgIHBhcmFtcy5hcHBlbmQoJ2xhYmVscycsICd0eXBlOiBidWcnKTtcblxuICAgIHJldHVybiBgJHtJU1NVRV9VUkx9JHtwYXJhbXMudG9TdHJpbmcoKX1gO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG4gICAgcmV0dXJuIGAke0lTU1VFX1VSTH10ZW1wbGF0ZT1idWdfcmVwb3J0Lm1kYDtcbiAgfVxufVxuXG5jb25zdCBFcnJvckJvdW5kYXJ5Q29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgcGFkZGluZzogNDBweDtcblxuICBoMSB7XG4gICAgZm9udC1zaXplOiAyOHB4O1xuICAgIGNvbG9yOiAke2NvbG9ycy50ZXh0fTtcbiAgfVxuXG4gIGgyIHtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gIH1cblxuICBzdHJvbmcge1xuICAgIGNvbG9yOiAke2NvbG9ycy50ZXh0TGVhZH07XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgfVxuXG4gIGhyIHtcbiAgICB3aWR0aDogMjAwcHg7XG4gICAgbWFyZ2luOiAzMHB4IDA7XG4gICAgYm9yZGVyOiAwO1xuICAgIGhlaWdodDogMXB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLnRleHR9O1xuICB9XG5cbiAgYSB7XG4gICAgY29sb3I6ICR7Y29sb3JzLmFjdGl2ZX07XG4gIH1cbmA7XG5cbmNvbnN0IFByaXZhY3lXYXJuaW5nID0gc3R5bGVkLnNwYW5gXG4gIGNvbG9yOiAke2NvbG9ycy50ZXh0fTtcbmA7XG5cbmNvbnN0IENvcHlCdXR0b24gPSBzdHlsZWQuYnV0dG9uYFxuICAke2J1dHRvbnMuYnV0dG9ufTtcbiAgJHtidXR0b25zLmRlZmF1bHR9O1xuICAke2J1dHRvbnMuZ3JheX07XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW46IDEycHggMDtcbmA7XG5cbmZ1bmN0aW9uIFJlY292ZXJlZEVudHJ5KHsgZW50cnksIHQgfSkge1xuICBjb25zb2xlLmxvZyhlbnRyeSk7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxociAvPlxuICAgICAgPGgyPnt0KCd1aS5lcnJvckJvdW5kYXJ5LnJlY292ZXJlZEVudHJ5LmhlYWRpbmcnKX08L2gyPlxuICAgICAgPHN0cm9uZz57dCgndWkuZXJyb3JCb3VuZGFyeS5yZWNvdmVyZWRFbnRyeS53YXJuaW5nJyl9PC9zdHJvbmc+XG4gICAgICA8Q29weUJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBjb3B5VG9DbGlwYm9hcmQoZW50cnkpfT5cbiAgICAgICAge3QoJ3VpLmVycm9yQm91bmRhcnkucmVjb3ZlcmVkRW50cnkuY29weUJ1dHRvbkxhYmVsJyl9XG4gICAgICA8L0NvcHlCdXR0b24+XG4gICAgICA8cHJlPlxuICAgICAgICA8Y29kZT57ZW50cnl9PC9jb2RlPlxuICAgICAgPC9wcmU+XG4gICAgPC8+XG4gICk7XG59XG5cbmV4cG9ydCBjbGFzcyBFcnJvckJvdW5kYXJ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgdDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjb25maWc6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBoYXNFcnJvcjogZmFsc2UsXG4gICAgZXJyb3JNZXNzYWdlOiAnJyxcbiAgICBlcnJvclRpdGxlOiAnJyxcbiAgICBiYWNrdXA6ICcnLFxuICB9O1xuXG4gIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICByZXR1cm4ge1xuICAgICAgaGFzRXJyb3I6IHRydWUsXG4gICAgICBlcnJvck1lc3NhZ2U6IGNsZWFuU3RhY2soZXJyb3Iuc3RhY2ssIHsgYmFzZVBhdGg6IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gfHwgJycgfSksXG4gICAgICBlcnJvclRpdGxlOiBlcnJvci50b1N0cmluZygpLFxuICAgIH07XG4gIH1cblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93QmFja3VwKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICB0aGlzLnN0YXRlLmVycm9yTWVzc2FnZSAhPT0gbmV4dFN0YXRlLmVycm9yTWVzc2FnZSB8fCB0aGlzLnN0YXRlLmJhY2t1cCAhPT0gbmV4dFN0YXRlLmJhY2t1cFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhc3luYyBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd0JhY2t1cCkge1xuICAgICAgY29uc3QgYmFja3VwID0gYXdhaXQgbG9jYWxGb3JhZ2UuZ2V0SXRlbSgnYmFja3VwJyk7XG4gICAgICBiYWNrdXAgJiYgY29uc29sZS5sb2coYmFja3VwKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBiYWNrdXAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaGFzRXJyb3IsIGVycm9yTWVzc2FnZSwgYmFja3VwLCBlcnJvclRpdGxlIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgc2hvd0JhY2t1cCwgdCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWhhc0Vycm9yKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxFcnJvckJvdW5kYXJ5Q29udGFpbmVyPlxuICAgICAgICA8aDE+e3QoJ3VpLmVycm9yQm91bmRhcnkudGl0bGUnKX08L2gxPlxuICAgICAgICA8cD5cbiAgICAgICAgICA8c3Bhbj57dCgndWkuZXJyb3JCb3VuZGFyeS5kZXRhaWxzJyl9PC9zcGFuPlxuICAgICAgICAgIDxhXG4gICAgICAgICAgICBocmVmPXtidWlsZElzc3VlVXJsKHsgdGl0bGU6IGVycm9yVGl0bGUsIGNvbmZpZzogdGhpcy5wcm9wcy5jb25maWcgfSl9XG4gICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiXG4gICAgICAgICAgICBkYXRhLXRlc3RpZD1cImlzc3VlLXVybFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3QoJ3VpLmVycm9yQm91bmRhcnkucmVwb3J0SXQnKX1cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvcD5cbiAgICAgICAgPHA+XG4gICAgICAgICAge3QoJ3VpLmVycm9yQm91bmRhcnkucHJpdmFjeVdhcm5pbmcnKVxuICAgICAgICAgICAgLnNwbGl0KCdcXG4nKVxuICAgICAgICAgICAgLm1hcCgoaXRlbSwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8UHJpdmFjeVdhcm5pbmcga2V5PXtpbmRleH0+e2l0ZW19PC9Qcml2YWN5V2FybmluZz5cbiAgICAgICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgPC9wPlxuICAgICAgICA8aHIgLz5cbiAgICAgICAgPGgyPnt0KCd1aS5lcnJvckJvdW5kYXJ5LmRldGFpbHNIZWFkaW5nJyl9PC9oMj5cbiAgICAgICAgPHA+e2Vycm9yTWVzc2FnZX08L3A+XG4gICAgICAgIHtiYWNrdXAgJiYgc2hvd0JhY2t1cCAmJiA8UmVjb3ZlcmVkRW50cnkgZW50cnk9e2JhY2t1cH0gdD17dH0gLz59XG4gICAgICA8L0Vycm9yQm91bmRhcnlDb250YWluZXI+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2xhdGUoKShFcnJvckJvdW5kYXJ5KTtcbiJdfQ== */"));
const CopyButton = /*#__PURE__*/(0, _base.default)("button", {
  target: "emw4gx70",
  label: "CopyButton"
})(_decapCmsUiDefault.buttons.button, ";", _decapCmsUiDefault.buttons.default, ";", _decapCmsUiDefault.buttons.gray, ";display:block;margin:12px 0;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1VJL0Vycm9yQm91bmRhcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBd0dnQyIsImZpbGUiOiIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9VSS9FcnJvckJvdW5kYXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyB0cmFuc2xhdGUgfSBmcm9tICdyZWFjdC1wb2x5Z2xvdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeWFtbCBmcm9tICd5YW1sJztcbmltcG9ydCB7IHRydW5jYXRlIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBjb3B5VG9DbGlwYm9hcmQgZnJvbSAnY29weS10ZXh0LXRvLWNsaXBib2FyZCc7XG5pbXBvcnQgeyBsb2NhbEZvcmFnZSB9IGZyb20gJ2RlY2FwLWNtcy1saWItdXRpbCc7XG5pbXBvcnQgeyBidXR0b25zLCBjb2xvcnMgfSBmcm9tICdkZWNhcC1jbXMtdWktZGVmYXVsdCc7XG5pbXBvcnQgY2xlYW5TdGFjayBmcm9tICdjbGVhbi1zdGFjayc7XG5cbmNvbnN0IElTU1VFX1VSTCA9ICdodHRwczovL2dpdGh1Yi5jb20vZGVjYXBvcmcvZGVjYXAtY21zL2lzc3Vlcy9uZXc/JztcblxuZnVuY3Rpb24gZ2V0SXNzdWVUZW1wbGF0ZSh7IHZlcnNpb24sIHByb3ZpZGVyLCBicm93c2VyLCBjb25maWcgfSkge1xuICByZXR1cm4gYFxuKipEZXNjcmliZSB0aGUgYnVnKipcblxuKipUbyBSZXByb2R1Y2UqKlxuXG4qKkV4cGVjdGVkIGJlaGF2aW9yKipcblxuKipTY3JlZW5zaG90cyoqXG5cbioqQXBwbGljYWJsZSBWZXJzaW9uczoqKlxuIC0gRGVjYXAgQ01TIHZlcnNpb246IFxcYCR7dmVyc2lvbn1cXGBcbiAtIEdpdCBwcm92aWRlcjogXFxgJHtwcm92aWRlcn1cXGBcbiAtIEJyb3dzZXIgdmVyc2lvbjogXFxgJHticm93c2VyfVxcYFxuXG4qKkNNUyBjb25maWd1cmF0aW9uKipcblxcYFxcYFxcYFxuJHtjb25maWd9XG5cXGBcXGBcXGBcblxuKipBZGRpdGlvbmFsIGNvbnRleHQqKlxuYDtcbn1cblxuZnVuY3Rpb24gYnVpbGRJc3N1ZVRlbXBsYXRlKHsgY29uZmlnIH0pIHtcbiAgbGV0IHZlcnNpb24gPSAnJztcbiAgaWYgKHR5cGVvZiBERUNBUF9DTVNfVkVSU0lPTiA9PT0gJ3N0cmluZycpIHtcbiAgICB2ZXJzaW9uID0gYGRlY2FwLWNtc0Ake0RFQ0FQX0NNU19WRVJTSU9OfWA7XG4gIH0gZWxzZSBpZiAodHlwZW9mIERFQ0FQX0NNU19BUFBfVkVSU0lPTiA9PT0gJ3N0cmluZycpIHtcbiAgICB2ZXJzaW9uID0gYGRlY2FwLWNtcy1hcHBAJHtERUNBUF9DTVNfQVBQX1ZFUlNJT059YDtcbiAgfVxuICBjb25zdCB0ZW1wbGF0ZSA9IGdldElzc3VlVGVtcGxhdGUoe1xuICAgIHZlcnNpb24sXG4gICAgcHJvdmlkZXI6IGNvbmZpZy5iYWNrZW5kLm5hbWUsXG4gICAgYnJvd3NlcjogbmF2aWdhdG9yLnVzZXJBZ2VudCxcbiAgICBjb25maWc6IHlhbWwuc3RyaW5naWZ5KGNvbmZpZyksXG4gIH0pO1xuXG4gIHJldHVybiB0ZW1wbGF0ZTtcbn1cblxuZnVuY3Rpb24gYnVpbGRJc3N1ZVVybCh7IHRpdGxlLCBjb25maWcgfSkge1xuICB0cnkge1xuICAgIGNvbnN0IGJvZHkgPSBidWlsZElzc3VlVGVtcGxhdGUoeyBjb25maWcgfSk7XG5cbiAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgcGFyYW1zLmFwcGVuZCgndGl0bGUnLCB0cnVuY2F0ZSh0aXRsZSwgeyBsZW5ndGg6IDEwMCB9KSk7XG4gICAgcGFyYW1zLmFwcGVuZCgnYm9keScsIHRydW5jYXRlKGJvZHksIHsgbGVuZ3RoOiA0MDAwLCBvbWlzc2lvbjogJ1xcbi4uLicgfSkpO1xuICAgIHBhcmFtcy5hcHBlbmQoJ2xhYmVscycsICd0eXBlOiBidWcnKTtcblxuICAgIHJldHVybiBgJHtJU1NVRV9VUkx9JHtwYXJhbXMudG9TdHJpbmcoKX1gO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG4gICAgcmV0dXJuIGAke0lTU1VFX1VSTH10ZW1wbGF0ZT1idWdfcmVwb3J0Lm1kYDtcbiAgfVxufVxuXG5jb25zdCBFcnJvckJvdW5kYXJ5Q29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgcGFkZGluZzogNDBweDtcblxuICBoMSB7XG4gICAgZm9udC1zaXplOiAyOHB4O1xuICAgIGNvbG9yOiAke2NvbG9ycy50ZXh0fTtcbiAgfVxuXG4gIGgyIHtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gIH1cblxuICBzdHJvbmcge1xuICAgIGNvbG9yOiAke2NvbG9ycy50ZXh0TGVhZH07XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgfVxuXG4gIGhyIHtcbiAgICB3aWR0aDogMjAwcHg7XG4gICAgbWFyZ2luOiAzMHB4IDA7XG4gICAgYm9yZGVyOiAwO1xuICAgIGhlaWdodDogMXB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLnRleHR9O1xuICB9XG5cbiAgYSB7XG4gICAgY29sb3I6ICR7Y29sb3JzLmFjdGl2ZX07XG4gIH1cbmA7XG5cbmNvbnN0IFByaXZhY3lXYXJuaW5nID0gc3R5bGVkLnNwYW5gXG4gIGNvbG9yOiAke2NvbG9ycy50ZXh0fTtcbmA7XG5cbmNvbnN0IENvcHlCdXR0b24gPSBzdHlsZWQuYnV0dG9uYFxuICAke2J1dHRvbnMuYnV0dG9ufTtcbiAgJHtidXR0b25zLmRlZmF1bHR9O1xuICAke2J1dHRvbnMuZ3JheX07XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW46IDEycHggMDtcbmA7XG5cbmZ1bmN0aW9uIFJlY292ZXJlZEVudHJ5KHsgZW50cnksIHQgfSkge1xuICBjb25zb2xlLmxvZyhlbnRyeSk7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxociAvPlxuICAgICAgPGgyPnt0KCd1aS5lcnJvckJvdW5kYXJ5LnJlY292ZXJlZEVudHJ5LmhlYWRpbmcnKX08L2gyPlxuICAgICAgPHN0cm9uZz57dCgndWkuZXJyb3JCb3VuZGFyeS5yZWNvdmVyZWRFbnRyeS53YXJuaW5nJyl9PC9zdHJvbmc+XG4gICAgICA8Q29weUJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBjb3B5VG9DbGlwYm9hcmQoZW50cnkpfT5cbiAgICAgICAge3QoJ3VpLmVycm9yQm91bmRhcnkucmVjb3ZlcmVkRW50cnkuY29weUJ1dHRvbkxhYmVsJyl9XG4gICAgICA8L0NvcHlCdXR0b24+XG4gICAgICA8cHJlPlxuICAgICAgICA8Y29kZT57ZW50cnl9PC9jb2RlPlxuICAgICAgPC9wcmU+XG4gICAgPC8+XG4gICk7XG59XG5cbmV4cG9ydCBjbGFzcyBFcnJvckJvdW5kYXJ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgdDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjb25maWc6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBoYXNFcnJvcjogZmFsc2UsXG4gICAgZXJyb3JNZXNzYWdlOiAnJyxcbiAgICBlcnJvclRpdGxlOiAnJyxcbiAgICBiYWNrdXA6ICcnLFxuICB9O1xuXG4gIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICByZXR1cm4ge1xuICAgICAgaGFzRXJyb3I6IHRydWUsXG4gICAgICBlcnJvck1lc3NhZ2U6IGNsZWFuU3RhY2soZXJyb3Iuc3RhY2ssIHsgYmFzZVBhdGg6IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gfHwgJycgfSksXG4gICAgICBlcnJvclRpdGxlOiBlcnJvci50b1N0cmluZygpLFxuICAgIH07XG4gIH1cblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5zaG93QmFja3VwKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICB0aGlzLnN0YXRlLmVycm9yTWVzc2FnZSAhPT0gbmV4dFN0YXRlLmVycm9yTWVzc2FnZSB8fCB0aGlzLnN0YXRlLmJhY2t1cCAhPT0gbmV4dFN0YXRlLmJhY2t1cFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhc3luYyBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd0JhY2t1cCkge1xuICAgICAgY29uc3QgYmFja3VwID0gYXdhaXQgbG9jYWxGb3JhZ2UuZ2V0SXRlbSgnYmFja3VwJyk7XG4gICAgICBiYWNrdXAgJiYgY29uc29sZS5sb2coYmFja3VwKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBiYWNrdXAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaGFzRXJyb3IsIGVycm9yTWVzc2FnZSwgYmFja3VwLCBlcnJvclRpdGxlIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgc2hvd0JhY2t1cCwgdCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWhhc0Vycm9yKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxFcnJvckJvdW5kYXJ5Q29udGFpbmVyPlxuICAgICAgICA8aDE+e3QoJ3VpLmVycm9yQm91bmRhcnkudGl0bGUnKX08L2gxPlxuICAgICAgICA8cD5cbiAgICAgICAgICA8c3Bhbj57dCgndWkuZXJyb3JCb3VuZGFyeS5kZXRhaWxzJyl9PC9zcGFuPlxuICAgICAgICAgIDxhXG4gICAgICAgICAgICBocmVmPXtidWlsZElzc3VlVXJsKHsgdGl0bGU6IGVycm9yVGl0bGUsIGNvbmZpZzogdGhpcy5wcm9wcy5jb25maWcgfSl9XG4gICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiXG4gICAgICAgICAgICBkYXRhLXRlc3RpZD1cImlzc3VlLXVybFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3QoJ3VpLmVycm9yQm91bmRhcnkucmVwb3J0SXQnKX1cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvcD5cbiAgICAgICAgPHA+XG4gICAgICAgICAge3QoJ3VpLmVycm9yQm91bmRhcnkucHJpdmFjeVdhcm5pbmcnKVxuICAgICAgICAgICAgLnNwbGl0KCdcXG4nKVxuICAgICAgICAgICAgLm1hcCgoaXRlbSwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8UHJpdmFjeVdhcm5pbmcga2V5PXtpbmRleH0+e2l0ZW19PC9Qcml2YWN5V2FybmluZz5cbiAgICAgICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgPC9wPlxuICAgICAgICA8aHIgLz5cbiAgICAgICAgPGgyPnt0KCd1aS5lcnJvckJvdW5kYXJ5LmRldGFpbHNIZWFkaW5nJyl9PC9oMj5cbiAgICAgICAgPHA+e2Vycm9yTWVzc2FnZX08L3A+XG4gICAgICAgIHtiYWNrdXAgJiYgc2hvd0JhY2t1cCAmJiA8UmVjb3ZlcmVkRW50cnkgZW50cnk9e2JhY2t1cH0gdD17dH0gLz59XG4gICAgICA8L0Vycm9yQm91bmRhcnlDb250YWluZXI+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2xhdGUoKShFcnJvckJvdW5kYXJ5KTtcbiJdfQ== */"));
function RecoveredEntry({
  entry,
  t
}) {
  console.log(entry);
  return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)("hr", null), (0, _react2.jsx)("h2", null, t('ui.errorBoundary.recoveredEntry.heading')), (0, _react2.jsx)("strong", null, t('ui.errorBoundary.recoveredEntry.warning')), (0, _react2.jsx)(CopyButton, {
    onClick: () => (0, _copyTextToClipboard.default)(entry)
  }, t('ui.errorBoundary.recoveredEntry.copyButtonLabel')), (0, _react2.jsx)("pre", null, (0, _react2.jsx)("code", null, entry)));
}
class ErrorBoundary extends _react.default.Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "state", {
      hasError: false,
      errorMessage: '',
      errorTitle: '',
      backup: ''
    });
  }
  static getDerivedStateFromError(error) {
    console.error(error);
    return {
      hasError: true,
      errorMessage: (0, _cleanStack.default)(error.stack, {
        basePath: window.location.origin || ''
      }),
      errorTitle: error.toString()
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.showBackup) {
      return this.state.errorMessage !== nextState.errorMessage || this.state.backup !== nextState.backup;
    }
    return true;
  }
  async componentDidUpdate() {
    if (this.props.showBackup) {
      const backup = await _decapCmsLibUtil.localForage.getItem('backup');
      backup && console.log(backup);
      this.setState({
        backup
      });
    }
  }
  render() {
    const {
      hasError,
      errorMessage,
      backup,
      errorTitle
    } = this.state;
    const {
      showBackup,
      t
    } = this.props;
    if (!hasError) {
      return this.props.children;
    }
    return (0, _react2.jsx)(ErrorBoundaryContainer, null, (0, _react2.jsx)("h1", null, t('ui.errorBoundary.title')), (0, _react2.jsx)("p", null, (0, _react2.jsx)("span", null, t('ui.errorBoundary.details')), (0, _react2.jsx)("a", {
      href: buildIssueUrl({
        title: errorTitle,
        config: this.props.config
      }),
      target: "_blank",
      rel: "noopener noreferrer",
      "data-testid": "issue-url"
    }, t('ui.errorBoundary.reportIt'))), (0, _react2.jsx)("p", null, t('ui.errorBoundary.privacyWarning').split('\n').map((item, index) => (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)(PrivacyWarning, {
      key: index
    }, item), (0, _react2.jsx)("br", null)))), (0, _react2.jsx)("hr", null), (0, _react2.jsx)("h2", null, t('ui.errorBoundary.detailsHeading')), (0, _react2.jsx)("p", null, errorMessage), backup && showBackup && (0, _react2.jsx)(RecoveredEntry, {
      entry: backup,
      t: t
    }));
  }
}
exports.ErrorBoundary = ErrorBoundary;
_defineProperty(ErrorBoundary, "propTypes", {
  children: _propTypes.default.node,
  t: _propTypes.default.func.isRequired,
  config: _propTypes.default.object.isRequired
});
var _default = exports.default = (0, _reactPolyglot.translate)()(ErrorBoundary);