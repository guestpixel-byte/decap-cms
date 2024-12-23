"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateConfig = validateConfig;
var _ajv = _interopRequireDefault(require("ajv"));
var _keywords = require("ajv-keywords/dist/keywords");
var _ajvErrors = _interopRequireDefault(require("ajv-errors"));
var _uuid = require("uuid");
var _formats = require("../formats/formats");
var _registry = require("../lib/registry");
var _i18n = require("../lib/i18n");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    var instance = Reflect.construct(cls, Array.from(arguments));
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }
  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }
  return ExtendableBuiltin;
}
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const localeType = {
  type: 'string',
  minLength: 2,
  maxLength: 10,
  pattern: '^[a-zA-Z-_]+$'
};
const i18n = {
  type: 'object',
  properties: {
    structure: {
      type: 'string',
      enum: Object.values(_i18n.I18N_STRUCTURE)
    },
    locales: {
      type: 'array',
      minItems: 1,
      items: localeType,
      uniqueItems: true
    },
    default_locale: localeType
  }
};
const i18nRoot = _objectSpread(_objectSpread({}, i18n), {}, {
  required: ['structure', 'locales']
});
const i18nCollection = {
  oneOf: [{
    type: 'boolean'
  }, i18n]
};
const i18nField = {
  oneOf: [{
    type: 'boolean'
  }, {
    type: 'string',
    enum: Object.values(_i18n.I18N_FIELD)
  }]
};

/**
 * Config for fields in both file and folder collections.
 */
function fieldsConfig() {
  const id = (0, _uuid.v4)();
  return {
    $id: `fields_${id}`,
    type: 'array',
    minItems: 1,
    items: {
      // ------- Each field: -------
      $id: `field_${id}`,
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        label: {
          type: 'string'
        },
        widget: {
          type: 'string'
        },
        required: {
          type: 'boolean'
        },
        i18n: i18nField,
        hint: {
          type: 'string'
        },
        pattern: {
          type: 'array',
          minItems: 2,
          items: [{
            oneOf: [{
              type: 'string'
            }, {
              instanceof: 'RegExp'
            }]
          }, {
            type: 'string'
          }]
        },
        field: {
          $ref: `field_${id}`
        },
        fields: {
          $ref: `fields_${id}`
        },
        types: {
          $ref: `fields_${id}`
        }
      },
      select: {
        $data: '0/widget'
      },
      selectCases: _objectSpread({}, getWidgetSchemas()),
      required: ['name']
    },
    uniqueItemProperties: ['name']
  };
}
const viewFilters = {
  type: 'array',
  minItems: 1,
  items: {
    type: 'object',
    properties: {
      label: {
        type: 'string'
      },
      field: {
        type: 'string'
      },
      pattern: {
        oneOf: [{
          type: 'boolean'
        }, {
          type: 'string'
        }]
      }
    },
    additionalProperties: false,
    required: ['label', 'field', 'pattern']
  }
};
const viewGroups = {
  type: 'array',
  minItems: 1,
  items: {
    type: 'object',
    properties: {
      label: {
        type: 'string'
      },
      field: {
        type: 'string'
      },
      pattern: {
        type: 'string'
      }
    },
    additionalProperties: false,
    required: ['label', 'field']
  }
};

/**
 * The schema had to be wrapped in a function to
 * fix a circular dependency problem for WebPack,
 * where the imports get resolved asynchronously.
 */
function getConfigSchema() {
  return {
    type: 'object',
    properties: {
      backend: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            examples: ['test-repo']
          },
          auth_scope: {
            type: 'string',
            examples: ['repo', 'public_repo'],
            enum: ['repo', 'public_repo']
          },
          cms_label_prefix: {
            type: 'string',
            minLength: 1
          },
          open_authoring: {
            type: 'boolean',
            examples: [true]
          }
        },
        required: ['name']
      },
      local_backend: {
        oneOf: [{
          type: 'boolean'
        }, {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              examples: ['http://localhost:8081/api/v1']
            },
            allowed_hosts: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          },
          additionalProperties: false
        }]
      },
      locale: {
        type: 'string',
        examples: ['en', 'fr', 'de']
      },
      i18n: i18nRoot,
      site_url: {
        type: 'string',
        examples: ['https://example.com']
      },
      display_url: {
        type: 'string',
        examples: ['https://example.com']
      },
      logo_url: {
        type: 'string',
        examples: ['https://example.com/images/logo.svg']
      },
      show_preview_links: {
        type: 'boolean'
      },
      media_folder: {
        type: 'string',
        examples: ['assets/uploads']
      },
      public_folder: {
        type: 'string',
        examples: ['/uploads']
      },
      media_folder_relative: {
        type: 'boolean'
      },
      media_library: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            examples: ['uploadcare']
          },
          config: {
            type: 'object'
          }
        },
        required: ['name']
      },
      publish_mode: {
        type: 'string',
        enum: ['simple', 'editorial_workflow', ''],
        examples: ['editorial_workflow']
      },
      slug: {
        type: 'object',
        properties: {
          encoding: {
            type: 'string',
            enum: ['unicode', 'ascii']
          },
          clean_accents: {
            type: 'boolean'
          }
        }
      },
      collections: {
        type: 'array',
        minItems: 1,
        items: {
          // ------- Each collection: -------
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            label: {
              type: 'string'
            },
            label_singular: {
              type: 'string'
            },
            description: {
              type: 'string'
            },
            folder: {
              type: 'string'
            },
            files: {
              type: 'array',
              items: {
                // ------- Each file: -------
                type: 'object',
                properties: {
                  name: {
                    type: 'string'
                  },
                  label: {
                    type: 'string'
                  },
                  label_singular: {
                    type: 'string'
                  },
                  description: {
                    type: 'string'
                  },
                  file: {
                    type: 'string'
                  },
                  preview_path: {
                    type: 'string'
                  },
                  preview_path_date_field: {
                    type: 'string'
                  },
                  fields: fieldsConfig()
                },
                required: ['name', 'label', 'file', 'fields']
              },
              uniqueItemProperties: ['name']
            },
            identifier_field: {
              type: 'string'
            },
            summary: {
              type: 'string'
            },
            slug: {
              type: 'string'
            },
            path: {
              type: 'string'
            },
            preview_path: {
              type: 'string'
            },
            preview_path_date_field: {
              type: 'string'
            },
            create: {
              type: 'boolean'
            },
            publish: {
              type: 'boolean'
            },
            hide: {
              type: 'boolean'
            },
            editor: {
              type: 'object',
              properties: {
                preview: {
                  type: 'boolean'
                }
              }
            },
            format: {
              type: 'string'
            },
            extension: {
              type: 'string'
            },
            frontmatter_delimiter: {
              type: ['string', 'array'],
              minItems: 2,
              maxItems: 2,
              items: {
                type: 'string'
              }
            },
            fields: fieldsConfig(),
            sortable_fields: {
              type: 'array',
              items: {
                type: 'string'
              }
            },
            sortableFields: {
              type: 'array',
              items: {
                type: 'string'
              }
            },
            view_filters: viewFilters,
            view_groups: viewGroups,
            nested: {
              type: 'object',
              properties: {
                depth: {
                  type: 'number',
                  minimum: 1,
                  maximum: 1000
                },
                summary: {
                  type: 'string'
                }
              },
              required: ['depth']
            },
            meta: {
              type: 'object',
              properties: {
                path: {
                  type: 'object',
                  properties: {
                    label: {
                      type: 'string'
                    },
                    widget: {
                      type: 'string'
                    },
                    index_file: {
                      type: 'string'
                    }
                  },
                  required: ['label', 'widget', 'index_file']
                }
              },
              additionalProperties: false,
              minProperties: 1
            },
            i18n: i18nCollection
          },
          required: ['name', 'label'],
          oneOf: [{
            required: ['files']
          }, {
            required: ['folder', 'fields']
          }],
          not: {
            required: ['sortable_fields', 'sortableFields']
          },
          if: {
            required: ['extension']
          },
          then: {
            // Cannot infer format from extension.
            if: {
              properties: {
                extension: {
                  enum: Object.keys(_formats.extensionFormatters)
                }
              }
            },
            else: {
              required: ['format']
            }
          },
          dependencies: {
            frontmatter_delimiter: {
              properties: {
                format: {
                  enum: _formats.frontmatterFormats
                }
              },
              required: ['format']
            }
          }
        },
        uniqueItemProperties: ['name']
      },
      editor: {
        type: 'object',
        properties: {
          preview: {
            type: 'boolean'
          }
        }
      }
    },
    required: ['backend', 'collections'],
    anyOf: [{
      required: ['media_folder']
    }, {
      required: ['media_library']
    }]
  };
}
function getWidgetSchemas() {
  const schemas = (0, _registry.getWidgets)().map(widget => ({
    [widget.name]: widget.schema
  }));
  return Object.assign(...schemas);
}
class ConfigError extends _extendableBuiltin(Error) {
  constructor(errors, ...args) {
    const message = errors.map(({
      message,
      instancePath
    }) => {
      const dotPath = instancePath.slice(1).split('/').map(seg => seg.match(/^\d+$/) ? `[${seg}]` : `.${seg}`).join('').slice(1);
      return `${dotPath ? `'${dotPath}'` : 'config'} ${message}`;
    }).join('\n');
    super(message, ...args);
    this.errors = errors;
    this.message = message;
  }
  toString() {
    return this.message;
  }
}

/**
 * `validateConfig` is a pure function. It does not mutate
 * the config that is passed in.
 */
function validateConfig(config) {
  const ajv = new _ajv.default({
    allErrors: true,
    $data: true,
    strict: false
  });
  (0, _keywords.uniqueItemProperties)(ajv);
  (0, _keywords.select)(ajv);
  (0, _keywords.instanceof)(ajv);
  (0, _keywords.prohibited)(ajv);
  (0, _ajvErrors.default)(ajv);
  const valid = ajv.validate(getConfigSchema(), config);
  if (!valid) {
    const errors = ajv.errors.map(e => {
      switch (e.keyword) {
        // TODO: remove after https://github.com/ajv-validator/ajv-keywords/pull/123 is merged
        case 'uniqueItemProperties':
          {
            const path = e.instancePath || '';
            let newError = e;
            if (path.endsWith('/fields')) {
              newError = _objectSpread(_objectSpread({}, e), {}, {
                message: 'fields names must be unique'
              });
            } else if (path.endsWith('/files')) {
              newError = _objectSpread(_objectSpread({}, e), {}, {
                message: 'files names must be unique'
              });
            } else if (path.endsWith('/collections')) {
              newError = _objectSpread(_objectSpread({}, e), {}, {
                message: 'collections names must be unique'
              });
            }
            return newError;
          }
        case 'instanceof':
          {
            const path = e.instancePath || '';
            let newError = e;
            if (/fields\/\d+\/pattern\/\d+/.test(path)) {
              newError = _objectSpread(_objectSpread({}, e), {}, {
                message: 'must be a regular expression'
              });
            }
            return newError;
          }
        default:
          return e;
      }
    });
    console.error('Config Errors', errors);
    throw new ConfigError(errors);
  }
}