"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("@emotion/styled/base"));
var _react = _interopRequireDefault(require("react"));
var _reactSelect = _interopRequireDefault(require("react-select"));
var _isHotkey = _interopRequireDefault(require("is-hotkey"));
var _decapCmsUiDefault = require("decap-cms-ui-default");
var _SettingsButton = _interopRequireDefault(require("./SettingsButton"));
var _languageSelectStyles = _interopRequireDefault(require("./languageSelectStyles"));
var _react2 = require("@emotion/react");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
const SettingsPaneContainer = /*#__PURE__*/(0, _base.default)("div", {
  target: "e147sj9s2",
  label: "SettingsPaneContainer"
})("position:absolute;right:0;width:200px;z-index:", _decapCmsUiDefault.zIndex.zIndex10, ";height:100%;background-color:#fff;overflow:hidden;overflow-y:scroll;padding:12px;border-radius:0 3px 3px 0;", _decapCmsUiDefault.shadows.drop, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9TZXR0aW5nc1BhbmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBU3dDIiwiZmlsZSI6Ii4uLy4uL3NyYy9TZXR0aW5nc1BhbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xuaW1wb3J0IGlzSG90a2V5IGZyb20gJ2lzLWhvdGtleSc7XG5pbXBvcnQgeyB0ZXh0LCBzaGFkb3dzLCB6SW5kZXggfSBmcm9tICdkZWNhcC1jbXMtdWktZGVmYXVsdCc7XG5cbmltcG9ydCBTZXR0aW5nc0J1dHRvbiBmcm9tICcuL1NldHRpbmdzQnV0dG9uJztcbmltcG9ydCBsYW5ndWFnZVNlbGVjdFN0eWxlcyBmcm9tICcuL2xhbmd1YWdlU2VsZWN0U3R5bGVzJztcblxuY29uc3QgU2V0dGluZ3NQYW5lQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMDtcbiAgd2lkdGg6IDIwMHB4O1xuICB6LWluZGV4OiAke3pJbmRleC56SW5kZXgxMH07XG4gIGhlaWdodDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICBwYWRkaW5nOiAxMnB4O1xuICBib3JkZXItcmFkaXVzOiAwIDNweCAzcHggMDtcbiAgJHtzaGFkb3dzLmRyb3B9O1xuYDtcblxuY29uc3QgU2V0dGluZ3NGaWVsZExhYmVsID0gc3R5bGVkLmxhYmVsYFxuICAke3RleHQuZmllbGRMYWJlbH07XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbi10b3A6IDhweDtcbiAgbWFyZ2luLWJvdHRvbTogMnB4O1xuYDtcblxuY29uc3QgU2V0dGluZ3NTZWN0aW9uVGl0bGUgPSBzdHlsZWQuaDNgXG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbWFyZ2luLXRvcDogMTRweDtcbiAgbWFyZ2luLWJvdHRvbTogMDtcblxuICAmOmZpcnN0LW9mLXR5cGUge1xuICAgIG1hcmdpbi10b3A6IDRweDtcbiAgfVxuYDtcblxuZnVuY3Rpb24gU2V0dGluZ3NTZWxlY3QoeyB2YWx1ZSwgb3B0aW9ucywgb25DaGFuZ2UsIGZvcklELCB0eXBlLCBhdXRvRm9jdXMgfSkge1xuICByZXR1cm4gKFxuICAgIDxTZWxlY3RcbiAgICAgIGlucHV0SWQ9e2Ake2ZvcklEfS1zZWxlY3QtJHt0eXBlfWB9XG4gICAgICBzdHlsZXM9e2xhbmd1YWdlU2VsZWN0U3R5bGVzfVxuICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgb3B0aW9ucz17b3B0aW9uc31cbiAgICAgIG9uQ2hhbmdlPXtvcHQgPT4gb25DaGFuZ2Uob3B0LnZhbHVlKX1cbiAgICAgIG1lbnVQbGFjZW1lbnQ9XCJhdXRvXCJcbiAgICAgIGNhcHR1cmVNZW51U2Nyb2xsPXtmYWxzZX1cbiAgICAgIGF1dG9Gb2N1cz17YXV0b0ZvY3VzfVxuICAgIC8+XG4gICk7XG59XG5cbmZ1bmN0aW9uIFNldHRpbmdzUGFuZSh7XG4gIGhpZGVTZXR0aW5ncyxcbiAgZm9ySUQsXG4gIG1vZGVzLFxuICBtb2RlLFxuICB0aGVtZSxcbiAgdGhlbWVzLFxuICBrZXlNYXAsXG4gIGtleU1hcHMsXG4gIGFsbG93TGFuZ3VhZ2VTZWxlY3Rpb24sXG4gIG9uQ2hhbmdlTGFuZyxcbiAgb25DaGFuZ2VUaGVtZSxcbiAgb25DaGFuZ2VLZXlNYXAsXG59KSB7XG4gIHJldHVybiAoXG4gICAgPFNldHRpbmdzUGFuZUNvbnRhaW5lciBvbktleURvd249e2UgPT4gaXNIb3RrZXkoJ2VzYycsIGUpICYmIGhpZGVTZXR0aW5ncygpfT5cbiAgICAgIDxTZXR0aW5nc0J1dHRvbiBvbkNsaWNrPXtoaWRlU2V0dGluZ3N9IHNob3dDbG9zZT17dHJ1ZX0gLz5cbiAgICAgIHthbGxvd0xhbmd1YWdlU2VsZWN0aW9uICYmIChcbiAgICAgICAgPD5cbiAgICAgICAgICA8U2V0dGluZ3NTZWN0aW9uVGl0bGU+RmllbGQgU2V0dGluZ3M8L1NldHRpbmdzU2VjdGlvblRpdGxlPlxuICAgICAgICAgIDxTZXR0aW5nc0ZpZWxkTGFiZWwgaHRtbEZvcj17YCR7Zm9ySUR9LXNlbGVjdC1tb2RlYH0+TW9kZTwvU2V0dGluZ3NGaWVsZExhYmVsPlxuICAgICAgICAgIDxTZXR0aW5nc1NlbGVjdFxuICAgICAgICAgICAgdHlwZT1cIm1vZGVcIlxuICAgICAgICAgICAgZm9ySUQ9e2ZvcklEfVxuICAgICAgICAgICAgdmFsdWU9e21vZGV9XG4gICAgICAgICAgICBvcHRpb25zPXttb2Rlc31cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZUxhbmd9XG4gICAgICAgICAgICBhdXRvRm9jdXNcbiAgICAgICAgICAvPlxuICAgICAgICA8Lz5cbiAgICAgICl9XG4gICAgICA8PlxuICAgICAgICA8U2V0dGluZ3NTZWN0aW9uVGl0bGU+R2xvYmFsIFNldHRpbmdzPC9TZXR0aW5nc1NlY3Rpb25UaXRsZT5cbiAgICAgICAge3RoZW1lcyAmJiAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIDxTZXR0aW5nc0ZpZWxkTGFiZWwgaHRtbEZvcj17YCR7Zm9ySUR9LXNlbGVjdC10aGVtZWB9PlRoZW1lPC9TZXR0aW5nc0ZpZWxkTGFiZWw+XG4gICAgICAgICAgICA8U2V0dGluZ3NTZWxlY3RcbiAgICAgICAgICAgICAgdHlwZT1cInRoZW1lXCJcbiAgICAgICAgICAgICAgZm9ySUQ9e2ZvcklEfVxuICAgICAgICAgICAgICB2YWx1ZT17eyB2YWx1ZTogdGhlbWUsIGxhYmVsOiB0aGVtZSB9fVxuICAgICAgICAgICAgICBvcHRpb25zPXt0aGVtZXMubWFwKHQgPT4gKHsgdmFsdWU6IHQsIGxhYmVsOiB0IH0pKX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlVGhlbWV9XG4gICAgICAgICAgICAgIGF1dG9Gb2N1cz17IWFsbG93TGFuZ3VhZ2VTZWxlY3Rpb259XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvPlxuICAgICAgICApfVxuICAgICAgICA8U2V0dGluZ3NGaWVsZExhYmVsIGh0bWxGb3I9e2Ake2ZvcklEfS1zZWxlY3Qta2V5bWFwYH0+S2V5TWFwPC9TZXR0aW5nc0ZpZWxkTGFiZWw+XG4gICAgICAgIDxTZXR0aW5nc1NlbGVjdFxuICAgICAgICAgIHR5cGU9XCJrZXltYXBcIlxuICAgICAgICAgIGZvcklEPXtmb3JJRH1cbiAgICAgICAgICB2YWx1ZT17a2V5TWFwfVxuICAgICAgICAgIG9wdGlvbnM9e2tleU1hcHN9XG4gICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlS2V5TWFwfVxuICAgICAgICAvPlxuICAgICAgPC8+XG4gICAgPC9TZXR0aW5nc1BhbmVDb250YWluZXI+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNldHRpbmdzUGFuZTtcbiJdfQ== */"));
const SettingsFieldLabel = /*#__PURE__*/(0, _base.default)("label", {
  target: "e147sj9s1",
  label: "SettingsFieldLabel"
})(_decapCmsUiDefault.text.fieldLabel, ";font-size:11px;display:block;margin-top:8px;margin-bottom:2px;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9TZXR0aW5nc1BhbmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUJ1QyIsImZpbGUiOiIuLi8uLi9zcmMvU2V0dGluZ3NQYW5lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcbmltcG9ydCBpc0hvdGtleSBmcm9tICdpcy1ob3RrZXknO1xuaW1wb3J0IHsgdGV4dCwgc2hhZG93cywgekluZGV4IH0gZnJvbSAnZGVjYXAtY21zLXVpLWRlZmF1bHQnO1xuXG5pbXBvcnQgU2V0dGluZ3NCdXR0b24gZnJvbSAnLi9TZXR0aW5nc0J1dHRvbic7XG5pbXBvcnQgbGFuZ3VhZ2VTZWxlY3RTdHlsZXMgZnJvbSAnLi9sYW5ndWFnZVNlbGVjdFN0eWxlcyc7XG5cbmNvbnN0IFNldHRpbmdzUGFuZUNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDA7XG4gIHdpZHRoOiAyMDBweDtcbiAgei1pbmRleDogJHt6SW5kZXguekluZGV4MTB9O1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgcGFkZGluZzogMTJweDtcbiAgYm9yZGVyLXJhZGl1czogMCAzcHggM3B4IDA7XG4gICR7c2hhZG93cy5kcm9wfTtcbmA7XG5cbmNvbnN0IFNldHRpbmdzRmllbGRMYWJlbCA9IHN0eWxlZC5sYWJlbGBcbiAgJHt0ZXh0LmZpZWxkTGFiZWx9O1xuICBmb250LXNpemU6IDExcHg7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW4tdG9wOiA4cHg7XG4gIG1hcmdpbi1ib3R0b206IDJweDtcbmA7XG5cbmNvbnN0IFNldHRpbmdzU2VjdGlvblRpdGxlID0gc3R5bGVkLmgzYFxuICBmb250LXNpemU6IDE0cHg7XG4gIG1hcmdpbi10b3A6IDE0cHg7XG4gIG1hcmdpbi1ib3R0b206IDA7XG5cbiAgJjpmaXJzdC1vZi10eXBlIHtcbiAgICBtYXJnaW4tdG9wOiA0cHg7XG4gIH1cbmA7XG5cbmZ1bmN0aW9uIFNldHRpbmdzU2VsZWN0KHsgdmFsdWUsIG9wdGlvbnMsIG9uQ2hhbmdlLCBmb3JJRCwgdHlwZSwgYXV0b0ZvY3VzIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8U2VsZWN0XG4gICAgICBpbnB1dElkPXtgJHtmb3JJRH0tc2VsZWN0LSR7dHlwZX1gfVxuICAgICAgc3R5bGVzPXtsYW5ndWFnZVNlbGVjdFN0eWxlc31cbiAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgIG9wdGlvbnM9e29wdGlvbnN9XG4gICAgICBvbkNoYW5nZT17b3B0ID0+IG9uQ2hhbmdlKG9wdC52YWx1ZSl9XG4gICAgICBtZW51UGxhY2VtZW50PVwiYXV0b1wiXG4gICAgICBjYXB0dXJlTWVudVNjcm9sbD17ZmFsc2V9XG4gICAgICBhdXRvRm9jdXM9e2F1dG9Gb2N1c31cbiAgICAvPlxuICApO1xufVxuXG5mdW5jdGlvbiBTZXR0aW5nc1BhbmUoe1xuICBoaWRlU2V0dGluZ3MsXG4gIGZvcklELFxuICBtb2RlcyxcbiAgbW9kZSxcbiAgdGhlbWUsXG4gIHRoZW1lcyxcbiAga2V5TWFwLFxuICBrZXlNYXBzLFxuICBhbGxvd0xhbmd1YWdlU2VsZWN0aW9uLFxuICBvbkNoYW5nZUxhbmcsXG4gIG9uQ2hhbmdlVGhlbWUsXG4gIG9uQ2hhbmdlS2V5TWFwLFxufSkge1xuICByZXR1cm4gKFxuICAgIDxTZXR0aW5nc1BhbmVDb250YWluZXIgb25LZXlEb3duPXtlID0+IGlzSG90a2V5KCdlc2MnLCBlKSAmJiBoaWRlU2V0dGluZ3MoKX0+XG4gICAgICA8U2V0dGluZ3NCdXR0b24gb25DbGljaz17aGlkZVNldHRpbmdzfSBzaG93Q2xvc2U9e3RydWV9IC8+XG4gICAgICB7YWxsb3dMYW5ndWFnZVNlbGVjdGlvbiAmJiAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPFNldHRpbmdzU2VjdGlvblRpdGxlPkZpZWxkIFNldHRpbmdzPC9TZXR0aW5nc1NlY3Rpb25UaXRsZT5cbiAgICAgICAgICA8U2V0dGluZ3NGaWVsZExhYmVsIGh0bWxGb3I9e2Ake2ZvcklEfS1zZWxlY3QtbW9kZWB9Pk1vZGU8L1NldHRpbmdzRmllbGRMYWJlbD5cbiAgICAgICAgICA8U2V0dGluZ3NTZWxlY3RcbiAgICAgICAgICAgIHR5cGU9XCJtb2RlXCJcbiAgICAgICAgICAgIGZvcklEPXtmb3JJRH1cbiAgICAgICAgICAgIHZhbHVlPXttb2RlfVxuICAgICAgICAgICAgb3B0aW9ucz17bW9kZXN9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2VMYW5nfVxuICAgICAgICAgICAgYXV0b0ZvY3VzXG4gICAgICAgICAgLz5cbiAgICAgICAgPC8+XG4gICAgICApfVxuICAgICAgPD5cbiAgICAgICAgPFNldHRpbmdzU2VjdGlvblRpdGxlPkdsb2JhbCBTZXR0aW5nczwvU2V0dGluZ3NTZWN0aW9uVGl0bGU+XG4gICAgICAgIHt0aGVtZXMgJiYgKFxuICAgICAgICAgIDw+XG4gICAgICAgICAgICA8U2V0dGluZ3NGaWVsZExhYmVsIGh0bWxGb3I9e2Ake2ZvcklEfS1zZWxlY3QtdGhlbWVgfT5UaGVtZTwvU2V0dGluZ3NGaWVsZExhYmVsPlxuICAgICAgICAgICAgPFNldHRpbmdzU2VsZWN0XG4gICAgICAgICAgICAgIHR5cGU9XCJ0aGVtZVwiXG4gICAgICAgICAgICAgIGZvcklEPXtmb3JJRH1cbiAgICAgICAgICAgICAgdmFsdWU9e3sgdmFsdWU6IHRoZW1lLCBsYWJlbDogdGhlbWUgfX1cbiAgICAgICAgICAgICAgb3B0aW9ucz17dGhlbWVzLm1hcCh0ID0+ICh7IHZhbHVlOiB0LCBsYWJlbDogdCB9KSl9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZVRoZW1lfVxuICAgICAgICAgICAgICBhdXRvRm9jdXM9eyFhbGxvd0xhbmd1YWdlU2VsZWN0aW9ufVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8Lz5cbiAgICAgICAgKX1cbiAgICAgICAgPFNldHRpbmdzRmllbGRMYWJlbCBodG1sRm9yPXtgJHtmb3JJRH0tc2VsZWN0LWtleW1hcGB9PktleU1hcDwvU2V0dGluZ3NGaWVsZExhYmVsPlxuICAgICAgICA8U2V0dGluZ3NTZWxlY3RcbiAgICAgICAgICB0eXBlPVwia2V5bWFwXCJcbiAgICAgICAgICBmb3JJRD17Zm9ySUR9XG4gICAgICAgICAgdmFsdWU9e2tleU1hcH1cbiAgICAgICAgICBvcHRpb25zPXtrZXlNYXBzfVxuICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZUtleU1hcH1cbiAgICAgICAgLz5cbiAgICAgIDwvPlxuICAgIDwvU2V0dGluZ3NQYW5lQ29udGFpbmVyPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBTZXR0aW5nc1BhbmU7XG4iXX0= */"));
const SettingsSectionTitle = /*#__PURE__*/(0, _base.default)("h3", {
  target: "e147sj9s0",
  label: "SettingsSectionTitle"
})(process.env.NODE_ENV === "production" ? {
  name: "punfmt",
  styles: "font-size:14px;margin-top:14px;margin-bottom:0;&:first-of-type{margin-top:4px;}"
} : {
  name: "punfmt",
  styles: "font-size:14px;margin-top:14px;margin-bottom:0;&:first-of-type{margin-top:4px;}",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9TZXR0aW5nc1BhbmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBK0JzQyIsImZpbGUiOiIuLi8uLi9zcmMvU2V0dGluZ3NQYW5lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcbmltcG9ydCBpc0hvdGtleSBmcm9tICdpcy1ob3RrZXknO1xuaW1wb3J0IHsgdGV4dCwgc2hhZG93cywgekluZGV4IH0gZnJvbSAnZGVjYXAtY21zLXVpLWRlZmF1bHQnO1xuXG5pbXBvcnQgU2V0dGluZ3NCdXR0b24gZnJvbSAnLi9TZXR0aW5nc0J1dHRvbic7XG5pbXBvcnQgbGFuZ3VhZ2VTZWxlY3RTdHlsZXMgZnJvbSAnLi9sYW5ndWFnZVNlbGVjdFN0eWxlcyc7XG5cbmNvbnN0IFNldHRpbmdzUGFuZUNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDA7XG4gIHdpZHRoOiAyMDBweDtcbiAgei1pbmRleDogJHt6SW5kZXguekluZGV4MTB9O1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgcGFkZGluZzogMTJweDtcbiAgYm9yZGVyLXJhZGl1czogMCAzcHggM3B4IDA7XG4gICR7c2hhZG93cy5kcm9wfTtcbmA7XG5cbmNvbnN0IFNldHRpbmdzRmllbGRMYWJlbCA9IHN0eWxlZC5sYWJlbGBcbiAgJHt0ZXh0LmZpZWxkTGFiZWx9O1xuICBmb250LXNpemU6IDExcHg7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW4tdG9wOiA4cHg7XG4gIG1hcmdpbi1ib3R0b206IDJweDtcbmA7XG5cbmNvbnN0IFNldHRpbmdzU2VjdGlvblRpdGxlID0gc3R5bGVkLmgzYFxuICBmb250LXNpemU6IDE0cHg7XG4gIG1hcmdpbi10b3A6IDE0cHg7XG4gIG1hcmdpbi1ib3R0b206IDA7XG5cbiAgJjpmaXJzdC1vZi10eXBlIHtcbiAgICBtYXJnaW4tdG9wOiA0cHg7XG4gIH1cbmA7XG5cbmZ1bmN0aW9uIFNldHRpbmdzU2VsZWN0KHsgdmFsdWUsIG9wdGlvbnMsIG9uQ2hhbmdlLCBmb3JJRCwgdHlwZSwgYXV0b0ZvY3VzIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8U2VsZWN0XG4gICAgICBpbnB1dElkPXtgJHtmb3JJRH0tc2VsZWN0LSR7dHlwZX1gfVxuICAgICAgc3R5bGVzPXtsYW5ndWFnZVNlbGVjdFN0eWxlc31cbiAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgIG9wdGlvbnM9e29wdGlvbnN9XG4gICAgICBvbkNoYW5nZT17b3B0ID0+IG9uQ2hhbmdlKG9wdC52YWx1ZSl9XG4gICAgICBtZW51UGxhY2VtZW50PVwiYXV0b1wiXG4gICAgICBjYXB0dXJlTWVudVNjcm9sbD17ZmFsc2V9XG4gICAgICBhdXRvRm9jdXM9e2F1dG9Gb2N1c31cbiAgICAvPlxuICApO1xufVxuXG5mdW5jdGlvbiBTZXR0aW5nc1BhbmUoe1xuICBoaWRlU2V0dGluZ3MsXG4gIGZvcklELFxuICBtb2RlcyxcbiAgbW9kZSxcbiAgdGhlbWUsXG4gIHRoZW1lcyxcbiAga2V5TWFwLFxuICBrZXlNYXBzLFxuICBhbGxvd0xhbmd1YWdlU2VsZWN0aW9uLFxuICBvbkNoYW5nZUxhbmcsXG4gIG9uQ2hhbmdlVGhlbWUsXG4gIG9uQ2hhbmdlS2V5TWFwLFxufSkge1xuICByZXR1cm4gKFxuICAgIDxTZXR0aW5nc1BhbmVDb250YWluZXIgb25LZXlEb3duPXtlID0+IGlzSG90a2V5KCdlc2MnLCBlKSAmJiBoaWRlU2V0dGluZ3MoKX0+XG4gICAgICA8U2V0dGluZ3NCdXR0b24gb25DbGljaz17aGlkZVNldHRpbmdzfSBzaG93Q2xvc2U9e3RydWV9IC8+XG4gICAgICB7YWxsb3dMYW5ndWFnZVNlbGVjdGlvbiAmJiAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPFNldHRpbmdzU2VjdGlvblRpdGxlPkZpZWxkIFNldHRpbmdzPC9TZXR0aW5nc1NlY3Rpb25UaXRsZT5cbiAgICAgICAgICA8U2V0dGluZ3NGaWVsZExhYmVsIGh0bWxGb3I9e2Ake2ZvcklEfS1zZWxlY3QtbW9kZWB9Pk1vZGU8L1NldHRpbmdzRmllbGRMYWJlbD5cbiAgICAgICAgICA8U2V0dGluZ3NTZWxlY3RcbiAgICAgICAgICAgIHR5cGU9XCJtb2RlXCJcbiAgICAgICAgICAgIGZvcklEPXtmb3JJRH1cbiAgICAgICAgICAgIHZhbHVlPXttb2RlfVxuICAgICAgICAgICAgb3B0aW9ucz17bW9kZXN9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2VMYW5nfVxuICAgICAgICAgICAgYXV0b0ZvY3VzXG4gICAgICAgICAgLz5cbiAgICAgICAgPC8+XG4gICAgICApfVxuICAgICAgPD5cbiAgICAgICAgPFNldHRpbmdzU2VjdGlvblRpdGxlPkdsb2JhbCBTZXR0aW5nczwvU2V0dGluZ3NTZWN0aW9uVGl0bGU+XG4gICAgICAgIHt0aGVtZXMgJiYgKFxuICAgICAgICAgIDw+XG4gICAgICAgICAgICA8U2V0dGluZ3NGaWVsZExhYmVsIGh0bWxGb3I9e2Ake2ZvcklEfS1zZWxlY3QtdGhlbWVgfT5UaGVtZTwvU2V0dGluZ3NGaWVsZExhYmVsPlxuICAgICAgICAgICAgPFNldHRpbmdzU2VsZWN0XG4gICAgICAgICAgICAgIHR5cGU9XCJ0aGVtZVwiXG4gICAgICAgICAgICAgIGZvcklEPXtmb3JJRH1cbiAgICAgICAgICAgICAgdmFsdWU9e3sgdmFsdWU6IHRoZW1lLCBsYWJlbDogdGhlbWUgfX1cbiAgICAgICAgICAgICAgb3B0aW9ucz17dGhlbWVzLm1hcCh0ID0+ICh7IHZhbHVlOiB0LCBsYWJlbDogdCB9KSl9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZVRoZW1lfVxuICAgICAgICAgICAgICBhdXRvRm9jdXM9eyFhbGxvd0xhbmd1YWdlU2VsZWN0aW9ufVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8Lz5cbiAgICAgICAgKX1cbiAgICAgICAgPFNldHRpbmdzRmllbGRMYWJlbCBodG1sRm9yPXtgJHtmb3JJRH0tc2VsZWN0LWtleW1hcGB9PktleU1hcDwvU2V0dGluZ3NGaWVsZExhYmVsPlxuICAgICAgICA8U2V0dGluZ3NTZWxlY3RcbiAgICAgICAgICB0eXBlPVwia2V5bWFwXCJcbiAgICAgICAgICBmb3JJRD17Zm9ySUR9XG4gICAgICAgICAgdmFsdWU9e2tleU1hcH1cbiAgICAgICAgICBvcHRpb25zPXtrZXlNYXBzfVxuICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZUtleU1hcH1cbiAgICAgICAgLz5cbiAgICAgIDwvPlxuICAgIDwvU2V0dGluZ3NQYW5lQ29udGFpbmVyPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBTZXR0aW5nc1BhbmU7XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});
function SettingsSelect({
  value,
  options,
  onChange,
  forID,
  type,
  autoFocus
}) {
  return (0, _react2.jsx)(_reactSelect.default, {
    inputId: `${forID}-select-${type}`,
    styles: _languageSelectStyles.default,
    value: value,
    options: options,
    onChange: opt => onChange(opt.value),
    menuPlacement: "auto",
    captureMenuScroll: false,
    autoFocus: autoFocus
  });
}
function SettingsPane({
  hideSettings,
  forID,
  modes,
  mode,
  theme,
  themes,
  keyMap,
  keyMaps,
  allowLanguageSelection,
  onChangeLang,
  onChangeTheme,
  onChangeKeyMap
}) {
  return (0, _react2.jsx)(SettingsPaneContainer, {
    onKeyDown: e => (0, _isHotkey.default)('esc', e) && hideSettings()
  }, (0, _react2.jsx)(_SettingsButton.default, {
    onClick: hideSettings,
    showClose: true
  }), allowLanguageSelection && (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)(SettingsSectionTitle, null, "Field Settings"), (0, _react2.jsx)(SettingsFieldLabel, {
    htmlFor: `${forID}-select-mode`
  }, "Mode"), (0, _react2.jsx)(SettingsSelect, {
    type: "mode",
    forID: forID,
    value: mode,
    options: modes,
    onChange: onChangeLang,
    autoFocus: true
  })), (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)(SettingsSectionTitle, null, "Global Settings"), themes && (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)(SettingsFieldLabel, {
    htmlFor: `${forID}-select-theme`
  }, "Theme"), (0, _react2.jsx)(SettingsSelect, {
    type: "theme",
    forID: forID,
    value: {
      value: theme,
      label: theme
    },
    options: themes.map(t => ({
      value: t,
      label: t
    })),
    onChange: onChangeTheme,
    autoFocus: !allowLanguageSelection
  })), (0, _react2.jsx)(SettingsFieldLabel, {
    htmlFor: `${forID}-select-keymap`
  }, "KeyMap"), (0, _react2.jsx)(SettingsSelect, {
    type: "keymap",
    forID: forID,
    value: keyMap,
    options: keyMaps,
    onChange: onChangeKeyMap
  })));
}
var _default = exports.default = SettingsPane;