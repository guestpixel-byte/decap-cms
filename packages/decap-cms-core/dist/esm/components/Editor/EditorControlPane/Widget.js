"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));
var _immutable = require("immutable");
var _commonTags = require("common-tags");
var _registry = require("../../../lib/registry");
var _validationErrorTypes = _interopRequireDefault(require("../../../constants/validationErrorTypes"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function truthy() {
  return {
    error: false
  };
}
function isEmpty(value) {
  return value === null || value === undefined || Object.prototype.hasOwnProperty.call(value, 'length') && value.length === 0 || value.constructor === Object && Object.keys(value).length === 0 || _immutable.List.isList(value) && value.size === 0;
}
class Widget extends _react.Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "processInnerControlRef", ref => {
      if (!ref) return;

      /**
       * If the widget is a container that receives state updates from the store,
       * we'll need to get the ref of the actual control via the `react-redux`
       * `getWrappedInstance` method. Note that connected widgets must pass
       * `withRef: true` to `connect` in the options object.
       */
      this.innerWrappedControl = ref.getWrappedInstance ? ref.getWrappedInstance() : ref;
      this.wrappedControlValid = this.innerWrappedControl.isValid || truthy;

      /**
       * Get the `shouldComponentUpdate` method from the wrapped control, and
       * provide the control instance is the `this` binding.
       */
      const {
        shouldComponentUpdate: scu
      } = this.innerWrappedControl;
      this.wrappedControlShouldComponentUpdate = scu && scu.bind(this.innerWrappedControl);
    });
    _defineProperty(this, "getValidateValue", () => {
      var _this$innerWrappedCon, _this$innerWrappedCon2;
      let value = ((_this$innerWrappedCon = this.innerWrappedControl) === null || _this$innerWrappedCon === void 0 ? void 0 : (_this$innerWrappedCon2 = _this$innerWrappedCon.getValidateValue) === null || _this$innerWrappedCon2 === void 0 ? void 0 : _this$innerWrappedCon2.call(_this$innerWrappedCon)) || this.props.value;
      // Convert list input widget value to string for validation test
      _immutable.List.isList(value) && (value = value.join(','));
      return value;
    });
    _defineProperty(this, "validate", (skipWrapped = false) => {
      const value = this.getValidateValue();
      const field = this.props.field;
      const errors = [];
      const validations = [this.validatePresence, this.validatePattern];
      if (field.get('meta')) {
        validations.push(this.props.validateMetaField);
      }
      validations.forEach(func => {
        const response = func(field, value, this.props.t);
        if (response.error) errors.push(response.error);
      });
      if (skipWrapped) {
        if (skipWrapped.error) errors.push(skipWrapped.error);
      } else {
        const wrappedError = this.validateWrappedControl(field);
        if (wrappedError.error) errors.push(wrappedError.error);
      }
      this.props.onValidate(errors);
    });
    _defineProperty(this, "validatePresence", (field, value) => {
      const {
        t,
        parentIds
      } = this.props;
      const isRequired = field.get('required', true);
      if (isRequired && isEmpty(value)) {
        const error = {
          type: _validationErrorTypes.default.PRESENCE,
          parentIds,
          message: t('editor.editorControlPane.widget.required', {
            fieldLabel: field.get('label', field.get('name'))
          })
        };
        return {
          error
        };
      }
      return {
        error: false
      };
    });
    _defineProperty(this, "validatePattern", (field, value) => {
      const {
        t,
        parentIds
      } = this.props;
      const pattern = field.get('pattern', false);
      if (isEmpty(value)) {
        return {
          error: false
        };
      }
      if (pattern && !RegExp(pattern.first()).test(value)) {
        const error = {
          type: _validationErrorTypes.default.PATTERN,
          parentIds,
          message: t('editor.editorControlPane.widget.regexPattern', {
            fieldLabel: field.get('label', field.get('name')),
            pattern: pattern.last()
          })
        };
        return {
          error
        };
      }
      return {
        error: false
      };
    });
    _defineProperty(this, "validateWrappedControl", field => {
      const {
        t,
        parentIds
      } = this.props;
      if (typeof this.wrappedControlValid !== 'function') {
        throw new Error((0, _commonTags.oneLine)`
        this.wrappedControlValid is not a function. Are you sure widget
        "${field.get('widget')}" is registered?
      `);
      }
      const response = this.wrappedControlValid();
      if (typeof response === 'boolean') {
        const isValid = response;
        return {
          error: !isValid
        };
      } else if (Object.prototype.hasOwnProperty.call(response, 'error')) {
        return response;
      } else if (response instanceof Promise) {
        response.then(() => {
          this.validate({
            error: false
          });
        }, err => {
          const error = {
            type: _validationErrorTypes.default.CUSTOM,
            message: `${field.get('label', field.get('name'))} - ${err}.`
          };
          this.validate({
            error
          });
        });
        const error = {
          type: _validationErrorTypes.default.CUSTOM,
          parentIds,
          message: t('editor.editorControlPane.widget.processing', {
            fieldLabel: field.get('label', field.get('name'))
          })
        };
        return {
          error
        };
      }
      return {
        error: false
      };
    });
    /**
     * In case the `onChangeObject` function is frozen by a child widget implementation,
     * e.g. when debounced, always get the latest object value instead of using
     * `this.props.value` directly.
     */
    _defineProperty(this, "getObjectValue", () => this.props.value || (0, _immutable.Map)());
    /**
     * Change handler for fields that are nested within another field.
     */
    _defineProperty(this, "onChangeObject", (field, newValue, newMetadata) => {
      const newObjectValue = this.getObjectValue().set(field.get('name'), newValue);
      return this.props.onChange(newObjectValue, newMetadata && {
        [this.props.field.get('name')]: newMetadata
      });
    });
    _defineProperty(this, "setInactiveStyle", () => {
      this.props.setInactiveStyle();
      if (this.props.field.has('pattern') && !isEmpty(this.getValidateValue())) {
        this.validate();
      }
    });
  }
  shouldComponentUpdate(nextProps) {
    /**
     * Avoid unnecessary rerenders while loading assets.
     */
    if (this.props.isLoadingAsset && nextProps.isLoadingAsset) return false;
    /**
     * Allow widgets to provide their own `shouldComponentUpdate` method.
     */
    if (this.wrappedControlShouldComponentUpdate) {
      return this.wrappedControlShouldComponentUpdate(nextProps);
    }
    return this.props.value !== nextProps.value || this.props.classNameWrapper !== nextProps.classNameWrapper || this.props.hasActiveStyle !== nextProps.hasActiveStyle;
  }
  render() {
    const {
      controlComponent,
      entry,
      collection,
      config,
      field,
      value,
      mediaPaths,
      metadata,
      onChange,
      onValidateObject,
      onOpenMediaLibrary,
      onRemoveMediaControl,
      onPersistMedia,
      onClearMediaControl,
      onAddAsset,
      onRemoveInsertedMedia,
      getAsset,
      classNameWrapper,
      classNameWidget,
      classNameWidgetActive,
      classNameLabel,
      classNameLabelActive,
      setActiveStyle,
      hasActiveStyle,
      editorControl,
      uniqueFieldId,
      resolveWidget,
      widget,
      getEditorComponents,
      query,
      queryHits,
      clearSearch,
      clearFieldErrors,
      isFetching,
      loadEntry,
      fieldsErrors,
      controlRef,
      isEditorComponent,
      isNewEditorComponent,
      parentIds,
      t,
      isDisabled,
      isFieldDuplicate,
      isFieldHidden,
      locale,
      isParentListCollapsed
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(controlComponent, {
      entry,
      collection,
      config,
      field,
      value,
      mediaPaths,
      metadata,
      onChange,
      onChangeObject: this.onChangeObject,
      onValidateObject,
      onOpenMediaLibrary,
      onClearMediaControl,
      onRemoveMediaControl,
      onPersistMedia,
      onAddAsset,
      onRemoveInsertedMedia,
      getAsset,
      forID: uniqueFieldId,
      ref: this.processInnerControlRef,
      validate: this.validate,
      classNameWrapper,
      classNameWidget,
      classNameWidgetActive,
      classNameLabel,
      classNameLabelActive,
      setActiveStyle,
      setInactiveStyle: () => this.setInactiveStyle(),
      hasActiveStyle,
      editorControl,
      resolveWidget,
      widget,
      getEditorComponents,
      getRemarkPlugins: _registry.getRemarkPlugins,
      query,
      queryHits,
      clearSearch,
      clearFieldErrors,
      isFetching,
      loadEntry,
      isEditorComponent,
      isNewEditorComponent,
      fieldsErrors,
      controlRef,
      parentIds,
      t,
      isDisabled,
      isFieldDuplicate,
      isFieldHidden,
      locale,
      isParentListCollapsed
    });
  }
}
exports.default = Widget;
_defineProperty(Widget, "propTypes", {
  controlComponent: _propTypes.default.func.isRequired,
  field: _reactImmutableProptypes.default.map.isRequired,
  hasActiveStyle: _propTypes.default.bool,
  setActiveStyle: _propTypes.default.func.isRequired,
  setInactiveStyle: _propTypes.default.func.isRequired,
  classNameWrapper: _propTypes.default.string.isRequired,
  classNameWidget: _propTypes.default.string.isRequired,
  classNameWidgetActive: _propTypes.default.string.isRequired,
  classNameLabel: _propTypes.default.string.isRequired,
  classNameLabelActive: _propTypes.default.string.isRequired,
  value: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.object, _propTypes.default.string, _propTypes.default.bool]),
  mediaPaths: _reactImmutableProptypes.default.map.isRequired,
  metadata: _reactImmutableProptypes.default.map,
  fieldsErrors: _reactImmutableProptypes.default.map,
  onChange: _propTypes.default.func.isRequired,
  onValidate: _propTypes.default.func,
  onOpenMediaLibrary: _propTypes.default.func.isRequired,
  onClearMediaControl: _propTypes.default.func.isRequired,
  onRemoveMediaControl: _propTypes.default.func.isRequired,
  onPersistMedia: _propTypes.default.func.isRequired,
  onAddAsset: _propTypes.default.func.isRequired,
  onRemoveInsertedMedia: _propTypes.default.func.isRequired,
  getAsset: _propTypes.default.func.isRequired,
  resolveWidget: _propTypes.default.func.isRequired,
  widget: _propTypes.default.object.isRequired,
  getEditorComponents: _propTypes.default.func.isRequired,
  isFetching: _propTypes.default.bool,
  controlRef: _propTypes.default.func,
  query: _propTypes.default.func.isRequired,
  clearSearch: _propTypes.default.func.isRequired,
  clearFieldErrors: _propTypes.default.func.isRequired,
  queryHits: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object]),
  editorControl: _propTypes.default.elementType.isRequired,
  uniqueFieldId: _propTypes.default.string.isRequired,
  loadEntry: _propTypes.default.func.isRequired,
  t: _propTypes.default.func.isRequired,
  onValidateObject: _propTypes.default.func,
  isEditorComponent: _propTypes.default.bool,
  isNewEditorComponent: _propTypes.default.bool,
  entry: _reactImmutableProptypes.default.map.isRequired,
  isDisabled: _propTypes.default.bool,
  isFieldDuplicate: _propTypes.default.func,
  isFieldHidden: _propTypes.default.func,
  locale: _propTypes.default.string,
  isParentListCollapsed: _propTypes.default.bool
});