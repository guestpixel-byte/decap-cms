"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.I18N_STRUCTURE = exports.I18N_FIELD = exports.I18N = void 0;
exports.duplicateDefaultI18nFields = duplicateDefaultI18nFields;
exports.duplicateI18nFields = duplicateI18nFields;
exports.formatI18nBackup = formatI18nBackup;
exports.getDataPath = getDataPath;
exports.getFilePath = getFilePath;
exports.getFilePaths = getFilePaths;
exports.getI18nBackup = getI18nBackup;
exports.getI18nDataFiles = getI18nDataFiles;
exports.getI18nEntry = getI18nEntry;
exports.getI18nFiles = getI18nFiles;
exports.getI18nFilesDepth = getI18nFilesDepth;
exports.getI18nInfo = getI18nInfo;
exports.getLocaleDataPath = getLocaleDataPath;
exports.getLocaleFromPath = getLocaleFromPath;
exports.getPreviewEntry = getPreviewEntry;
exports.groupEntries = groupEntries;
exports.hasI18n = hasI18n;
exports.isFieldDuplicate = isFieldDuplicate;
exports.isFieldHidden = isFieldHidden;
exports.isFieldTranslatable = isFieldTranslatable;
exports.normalizeFilePath = normalizeFilePath;
exports.serializeI18n = serializeI18n;
var _escapeRegExp2 = _interopRequireDefault(require("lodash/escapeRegExp"));
var _groupBy2 = _interopRequireDefault(require("lodash/groupBy"));
var _set2 = _interopRequireDefault(require("lodash/set"));
var _immutable = require("immutable");
var _collections = require("../reducers/collections");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const I18N = exports.I18N = 'i18n';
let I18N_STRUCTURE = exports.I18N_STRUCTURE = /*#__PURE__*/function (I18N_STRUCTURE) {
  I18N_STRUCTURE["MULTIPLE_FOLDERS"] = "multiple_folders";
  I18N_STRUCTURE["MULTIPLE_FILES"] = "multiple_files";
  I18N_STRUCTURE["SINGLE_FILE"] = "single_file";
  return I18N_STRUCTURE;
}({});
let I18N_FIELD = exports.I18N_FIELD = /*#__PURE__*/function (I18N_FIELD) {
  I18N_FIELD["TRANSLATE"] = "translate";
  I18N_FIELD["DUPLICATE"] = "duplicate";
  I18N_FIELD["NONE"] = "none";
  return I18N_FIELD;
}({});
function hasI18n(collection) {
  return collection.has(I18N);
}
function getI18nInfo(collection) {
  if (!hasI18n(collection)) {
    return {};
  }
  const {
    structure,
    locales,
    default_locale: defaultLocale
  } = collection.get(I18N).toJS();
  return {
    structure,
    locales,
    defaultLocale
  };
}
function getI18nFilesDepth(collection, depth) {
  const {
    structure
  } = getI18nInfo(collection);
  if (structure === I18N_STRUCTURE.MULTIPLE_FOLDERS) {
    return depth + 1;
  }
  return depth;
}
function isFieldTranslatable(field, locale, defaultLocale) {
  const isTranslatable = locale !== defaultLocale && field.get(I18N) === I18N_FIELD.TRANSLATE;
  return isTranslatable;
}
function isFieldDuplicate(field, locale, defaultLocale) {
  const isDuplicate = locale !== defaultLocale && field.get(I18N) === I18N_FIELD.DUPLICATE;
  return isDuplicate;
}
function isFieldHidden(field, locale, defaultLocale) {
  const isHidden = locale !== defaultLocale && field.get(I18N) === I18N_FIELD.NONE;
  return isHidden;
}
function getLocaleDataPath(locale) {
  return [I18N, locale, 'data'];
}
function getDataPath(locale, defaultLocale) {
  const dataPath = locale !== defaultLocale ? getLocaleDataPath(locale) : ['data'];
  return dataPath;
}
function getFilePath(structure, extension, path, slug, locale) {
  switch (structure) {
    case I18N_STRUCTURE.MULTIPLE_FOLDERS:
      return path.replace(`/${slug}`, `/${locale}/${slug}`);
    case I18N_STRUCTURE.MULTIPLE_FILES:
      return path.replace(new RegExp(`${(0, _escapeRegExp2.default)(extension)}$`), `${locale}.${extension}`);
    case I18N_STRUCTURE.SINGLE_FILE:
    default:
      return path;
  }
}
function getLocaleFromPath(structure, extension, path) {
  switch (structure) {
    case I18N_STRUCTURE.MULTIPLE_FOLDERS:
      {
        const parts = path.split('/');
        // filename
        parts.pop();
        // locale
        return parts.pop();
      }
    case I18N_STRUCTURE.MULTIPLE_FILES:
      {
        const parts = path.slice(0, -`.${extension}`.length);
        return parts.split('.').pop();
      }
    case I18N_STRUCTURE.SINGLE_FILE:
    default:
      return '';
  }
}
function getFilePaths(collection, extension, path, slug) {
  const {
    structure,
    locales
  } = getI18nInfo(collection);
  if (structure === I18N_STRUCTURE.SINGLE_FILE) {
    return [path];
  }
  const paths = locales.map(locale => getFilePath(structure, extension, path, slug, locale));
  return paths;
}
function normalizeFilePath(structure, path, locale) {
  switch (structure) {
    case I18N_STRUCTURE.MULTIPLE_FOLDERS:
      return path.replace(`${locale}/`, '');
    case I18N_STRUCTURE.MULTIPLE_FILES:
      return path.replace(`.${locale}`, '');
    case I18N_STRUCTURE.SINGLE_FILE:
    default:
      return path;
  }
}
function getI18nFiles(collection, extension, entryDraft, entryToRaw, path, slug, newPath) {
  const {
    structure,
    defaultLocale,
    locales
  } = getI18nInfo(collection);
  if (structure === I18N_STRUCTURE.SINGLE_FILE) {
    const data = locales.reduce((map, locale) => {
      const dataPath = getDataPath(locale, defaultLocale);
      return map.set(locale, entryDraft.getIn(dataPath));
    }, (0, _immutable.Map)({}));
    const draft = entryDraft.set('data', data);
    return [_objectSpread({
      path: getFilePath(structure, extension, path, slug, locales[0]),
      slug,
      raw: entryToRaw(draft)
    }, newPath && {
      newPath: getFilePath(structure, extension, newPath, slug, locales[0])
    })];
  }
  const dataFiles = locales.map(locale => {
    const dataPath = getDataPath(locale, defaultLocale);
    const draft = entryDraft.set('data', entryDraft.getIn(dataPath));
    return _objectSpread({
      path: getFilePath(structure, extension, path, slug, locale),
      slug,
      raw: draft.get('data') ? entryToRaw(draft) : ''
    }, newPath && {
      newPath: getFilePath(structure, extension, newPath, slug, locale)
    });
  }).filter(dataFile => dataFile.raw);
  return dataFiles;
}
function getI18nBackup(collection, entry, entryToRaw) {
  const {
    locales,
    defaultLocale
  } = getI18nInfo(collection);
  const i18nBackup = locales.filter(l => l !== defaultLocale).reduce((acc, locale) => {
    const dataPath = getDataPath(locale, defaultLocale);
    const data = entry.getIn(dataPath);
    if (!data) {
      return acc;
    }
    const draft = entry.set('data', data);
    return _objectSpread(_objectSpread({}, acc), {}, {
      [locale]: {
        raw: entryToRaw(draft)
      }
    });
  }, {});
  return i18nBackup;
}
function formatI18nBackup(i18nBackup, formatRawData) {
  const i18n = Object.entries(i18nBackup).reduce((acc, [locale, {
    raw
  }]) => {
    const entry = formatRawData(raw);
    return _objectSpread(_objectSpread({}, acc), {}, {
      [locale]: {
        data: entry.data
      }
    });
  }, {});
  return i18n;
}
function mergeValues(collection, structure, defaultLocale, values) {
  let defaultEntry = values.find(e => e.locale === defaultLocale);
  if (!defaultEntry) {
    defaultEntry = values[0];
    console.warn(`Could not locale entry for default locale '${defaultLocale}'`);
  }
  const i18n = values.filter(e => e.locale !== defaultEntry.locale).reduce((acc, {
    locale,
    value
  }) => {
    const dataPath = getLocaleDataPath(locale);
    return (0, _set2.default)(acc, dataPath, value.data);
  }, {});
  const path = normalizeFilePath(structure, defaultEntry.value.path, defaultLocale);
  const slug = (0, _collections.selectEntrySlug)(collection, path);
  const entryValue = _objectSpread(_objectSpread(_objectSpread({}, defaultEntry.value), {}, {
    raw: ''
  }, i18n), {}, {
    path,
    slug
  });
  return entryValue;
}
function mergeSingleFileValue(entryValue, defaultLocale, locales) {
  const data = entryValue.data[defaultLocale] || {};
  const i18n = locales.filter(l => l !== defaultLocale).map(l => ({
    locale: l,
    value: entryValue.data[l]
  })).filter(e => e.value).reduce((acc, e) => {
    return _objectSpread(_objectSpread({}, acc), {}, {
      [e.locale]: {
        data: e.value
      }
    });
  }, {});
  return _objectSpread(_objectSpread({}, entryValue), {}, {
    data,
    i18n,
    raw: ''
  });
}
async function getI18nEntry(collection, extension, path, slug, getEntryValue) {
  const {
    structure,
    locales,
    defaultLocale
  } = getI18nInfo(collection);
  let entryValue;
  if (structure === I18N_STRUCTURE.SINGLE_FILE) {
    entryValue = mergeSingleFileValue(await getEntryValue(path), defaultLocale, locales);
  } else {
    const entryValues = await Promise.all(locales.map(async locale => {
      const entryPath = getFilePath(structure, extension, path, slug, locale);
      const value = await getEntryValue(entryPath).catch(() => null);
      return {
        value,
        locale
      };
    }));
    const nonNullValues = entryValues.filter(e => e.value !== null);
    entryValue = mergeValues(collection, structure, defaultLocale, nonNullValues);
  }
  return entryValue;
}
function groupEntries(collection, extension, entries) {
  const {
    structure,
    defaultLocale,
    locales
  } = getI18nInfo(collection);
  if (structure === I18N_STRUCTURE.SINGLE_FILE) {
    return entries.map(e => mergeSingleFileValue(e, defaultLocale, locales));
  }
  const grouped = (0, _groupBy2.default)(entries.map(e => ({
    locale: getLocaleFromPath(structure, extension, e.path),
    value: e
  })), ({
    locale,
    value: e
  }) => {
    return normalizeFilePath(structure, e.path, locale);
  });
  const groupedEntries = Object.values(grouped).reduce((acc, values) => {
    const entryValue = mergeValues(collection, structure, defaultLocale, values);
    return [...acc, entryValue];
  }, []);
  return groupedEntries;
}
function getI18nDataFiles(collection, extension, path, slug, diffFiles) {
  const {
    structure
  } = getI18nInfo(collection);
  if (structure === I18N_STRUCTURE.SINGLE_FILE) {
    return diffFiles;
  }
  const paths = getFilePaths(collection, extension, path, slug);
  const dataFiles = paths.reduce((acc, path) => {
    const dataFile = diffFiles.find(file => file.path === path);
    if (dataFile) {
      return [...acc, dataFile];
    } else {
      return [...acc, {
        path,
        id: '',
        newFile: false
      }];
    }
  }, []);
  return dataFiles;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function duplicateDefaultI18nFields(collection, dataFields) {
  const {
    locales,
    defaultLocale
  } = getI18nInfo(collection);
  const i18nFields = Object.fromEntries(locales.filter(locale => locale !== defaultLocale).map(locale => [locale, {
    data: dataFields
  }]));
  return i18nFields;
}
function duplicateI18nFields(entryDraft, field, locales, defaultLocale, fieldPath = [field.get('name')]) {
  const value = entryDraft.getIn(['entry', 'data', ...fieldPath]);
  if (field.get(I18N) === I18N_FIELD.DUPLICATE) {
    locales.filter(l => l !== defaultLocale).forEach(l => {
      entryDraft = entryDraft.setIn(['entry', ...getDataPath(l, defaultLocale), ...fieldPath], value);
    });
  }
  if (field.has('field') && !_immutable.List.isList(value)) {
    const fields = [field.get('field')];
    fields.forEach(field => {
      entryDraft = duplicateI18nFields(entryDraft, field, locales, defaultLocale, [...fieldPath, field.get('name')]);
    });
  } else if (field.has('fields') && !_immutable.List.isList(value)) {
    const fields = field.get('fields').toArray();
    fields.forEach(field => {
      entryDraft = duplicateI18nFields(entryDraft, field, locales, defaultLocale, [...fieldPath, field.get('name')]);
    });
  }
  return entryDraft;
}
function getPreviewEntry(entry, locale, defaultLocale) {
  if (locale === defaultLocale) {
    return entry;
  }
  return entry.set('data', entry.getIn([I18N, locale, 'data']));
}
function serializeI18n(collection, entry,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
serializeValues) {
  const {
    locales,
    defaultLocale
  } = getI18nInfo(collection);
  locales.filter(locale => locale !== defaultLocale).forEach(locale => {
    const dataPath = getLocaleDataPath(locale);
    entry = entry.setIn(dataPath, serializeValues(entry.getIn(dataPath)));
  });
  return entry;
}