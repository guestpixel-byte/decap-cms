"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react2 = require("@emotion/react");
var _reactModal = _interopRequireDefault(require("react-modal"));
var _decapCmsUiDefault = require("decap-cms-ui-default");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
var _ref = process.env.NODE_ENV === "production" ? {
  name: "1o9c9d2-ReactModalGlobalStyles",
  styles: ".ReactModal__Body--open{overflow:hidden;};label:ReactModalGlobalStyles;"
} : {
  name: "1o9c9d2-ReactModalGlobalStyles",
  styles: ".ReactModal__Body--open{overflow:hidden;};label:ReactModalGlobalStyles;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1VJL01vZGFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNpQiIsImZpbGUiOiIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9VSS9Nb2RhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY3NzLCBHbG9iYWwsIENsYXNzTmFtZXMgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgUmVhY3RNb2RhbCBmcm9tICdyZWFjdC1tb2RhbCc7XG5pbXBvcnQgeyB0cmFuc2l0aW9ucywgc2hhZG93cywgbGVuZ3RocywgekluZGV4IH0gZnJvbSAnZGVjYXAtY21zLXVpLWRlZmF1bHQnO1xuXG5mdW5jdGlvbiBSZWFjdE1vZGFsR2xvYmFsU3R5bGVzKCkge1xuICByZXR1cm4gKFxuICAgIDxHbG9iYWxcbiAgICAgIHN0eWxlcz17Y3NzYFxuICAgICAgICAuUmVhY3RNb2RhbF9fQm9keS0tb3BlbiB7XG4gICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgfVxuICAgICAgYH1cbiAgICAvPlxuICApO1xufVxuXG5cbmNvbnN0IHN0eWxlU3RyaW5ncyA9IHtcbiAgbW9kYWxCb2R5OiBgXG4gICAgJHtzaGFkb3dzLmRyb3BEZWVwfTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDYwYjEwO1xuICAgIGJvcmRlci1yYWRpdXM6ICR7bGVuZ3Rocy5ib3JkZXJSYWRpdXN9O1xuICAgIGhlaWdodDogODAlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBtYXgtd2lkdGg6IDIyMDBweDtcbiAgICBwYWRkaW5nOiAyMHB4O1xuICAgIHdpZHRoOiAxMDAlO1xuXG4gICAgJjpmb2N1cyB7XG4gICAgICBvdXRsaW5lOiBub25lO1xuICAgIH1cbiAgYCxcbiAgb3ZlcmxheTogYFxuICAgIHotaW5kZXg6ICR7ekluZGV4LnpJbmRleDk5OTk5fTtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBvcGFjaXR5OiAwO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAke3RyYW5zaXRpb25zLm1haW59LCBvcGFjaXR5ICR7dHJhbnNpdGlvbnMubWFpbn07XG4gIGAsXG4gIG92ZXJsYXlBZnRlck9wZW46IGBcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNik7XG4gICAgb3BhY2l0eTogMTtcbiAgYCxcbiAgb3ZlcmxheUJlZm9yZUNsb3NlOiBgXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcbiAgICBvcGFjaXR5OiAwO1xuICBgLFxufTtcblxuZXhwb3J0IGNsYXNzIE1vZGFsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgICBpc09wZW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgUmVhY3RNb2RhbC5zZXRBcHBFbGVtZW50KCcjbmMtcm9vdCcpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaXNPcGVuLCBjaGlsZHJlbiwgY2xhc3NOYW1lLCBvbkNsb3NlIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8PlxuICAgICAgICA8UmVhY3RNb2RhbEdsb2JhbFN0eWxlcyAvPlxuICAgICAgICA8Q2xhc3NOYW1lcz5cbiAgICAgICAgICB7KHsgY3NzLCBjeCB9KSA9PiAoXG4gICAgICAgICAgICA8UmVhY3RNb2RhbFxuICAgICAgICAgICAgICBpc09wZW49e2lzT3Blbn1cbiAgICAgICAgICAgICAgb25SZXF1ZXN0Q2xvc2U9e29uQ2xvc2V9XG4gICAgICAgICAgICAgIGNsb3NlVGltZW91dE1TPXszMDB9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17e1xuICAgICAgICAgICAgICAgIGJhc2U6IGN4KFxuICAgICAgICAgICAgICAgICAgY3NzYFxuICAgICAgICAgICAgICAgICAgICAke3N0eWxlU3RyaW5ncy5tb2RhbEJvZHl9O1xuICAgICAgICAgICAgICAgICAgYCxcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIGFmdGVyT3BlbjogJycsXG4gICAgICAgICAgICAgICAgYmVmb3JlQ2xvc2U6ICcnLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBvdmVybGF5Q2xhc3NOYW1lPXt7XG4gICAgICAgICAgICAgICAgYmFzZTogY3NzYFxuICAgICAgICAgICAgICAgICAgJHtzdHlsZVN0cmluZ3Mub3ZlcmxheX07XG4gICAgICAgICAgICAgICAgYCxcbiAgICAgICAgICAgICAgICBhZnRlck9wZW46IGNzc2BcbiAgICAgICAgICAgICAgICAgICR7c3R5bGVTdHJpbmdzLm92ZXJsYXlBZnRlck9wZW59O1xuICAgICAgICAgICAgICAgIGAsXG4gICAgICAgICAgICAgICAgYmVmb3JlQ2xvc2U6IGNzc2BcbiAgICAgICAgICAgICAgICAgICR7c3R5bGVTdHJpbmdzLm92ZXJsYXlCZWZvcmVDbG9zZX07XG4gICAgICAgICAgICAgICAgYCxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgICAgPC9SZWFjdE1vZGFsPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQ2xhc3NOYW1lcz5cbiAgICAgIDwvPlxuICAgICk7XG4gIH1cbn1cbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
function ReactModalGlobalStyles() {
  return (0, _react2.jsx)(_react2.Global, {
    styles: _ref
  });
}
const styleStrings = {
  modalBody: `
    ${_decapCmsUiDefault.shadows.dropDeep};
    background-color: #060b10;
    border-radius: ${_decapCmsUiDefault.lengths.borderRadius};
    height: 80%;
    text-align: center;
    max-width: 2200px;
    padding: 20px;
    width: 100%;

    &:focus {
      outline: none;
    }
  `,
  overlay: `
    z-index: ${_decapCmsUiDefault.zIndex.zIndex99999};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color ${_decapCmsUiDefault.transitions.main}, opacity ${_decapCmsUiDefault.transitions.main};
  `,
  overlayAfterOpen: `
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 1;
  `,
  overlayBeforeClose: `
    background-color: rgba(0, 0, 0, 0);
    opacity: 0;
  `
};
class Modal extends _react.default.Component {
  componentDidMount() {
    _reactModal.default.setAppElement('#nc-root');
  }
  render() {
    const {
      isOpen,
      children,
      className,
      onClose
    } = this.props;
    return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)(ReactModalGlobalStyles, null), (0, _react2.jsx)(_react2.ClassNames, null, ({
      css,
      cx
    }) => (0, _react2.jsx)(_reactModal.default, {
      isOpen: isOpen,
      onRequestClose: onClose,
      closeTimeoutMS: 300,
      className: {
        base: cx(css`
                    ${styleStrings.modalBody};
                  `, className),
        afterOpen: '',
        beforeClose: ''
      },
      overlayClassName: {
        base: css`
                  ${styleStrings.overlay};
                `,
        afterOpen: css`
                  ${styleStrings.overlayAfterOpen};
                `,
        beforeClose: css`
                  ${styleStrings.overlayBeforeClose};
                `
      }
    }, children)));
  }
}
exports.Modal = Modal;
_defineProperty(Modal, "propTypes", {
  children: _propTypes.default.node.isRequired,
  isOpen: _propTypes.default.bool.isRequired,
  className: _propTypes.default.string,
  onClose: _propTypes.default.func.isRequired
});