"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));
var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));
var _uniq2 = _interopRequireDefault(require("lodash/uniq"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));
var _react2 = require("@emotion/react");
var _immutable = require("immutable");
var _uuid = require("uuid");
var _reactCodemirror = require("react-codemirror2");
var _codemirror = _interopRequireDefault(require("codemirror"));
require("codemirror/keymap/vim");
require("codemirror/keymap/sublime");
require("codemirror/keymap/emacs");
var _codemirror2 = _interopRequireDefault(require("codemirror/lib/codemirror.css"));
var _material = _interopRequireDefault(require("codemirror/theme/material.css"));
var _SettingsPane = _interopRequireDefault(require("./SettingsPane"));
var _SettingsButton = _interopRequireDefault(require("./SettingsButton"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const languageData = [{
  label: "AGS Script",
  identifiers: ["ags", "asc", "ash"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-c++src"
}, {
  label: "APL",
  identifiers: ["apl", "dyalog"],
  codemirror_mode: "apl",
  codemirror_mime_type: "text/apl"
}, {
  label: "ASN.1",
  identifiers: ["asn"],
  codemirror_mode: "asn.1",
  codemirror_mime_type: "text/x-ttcn-asn"
}, {
  label: "ASP",
  identifiers: ["asp", "aspx", "asax", "ascx", "ashx", "asmx", "axd"],
  codemirror_mode: "htmlembedded",
  codemirror_mime_type: "application/x-aspx"
}, {
  label: "Alpine Abuild",
  identifiers: ["abuild", "apkbuild"],
  codemirror_mode: "shell",
  codemirror_mime_type: "text/x-sh"
}, {
  label: "AngelScript",
  identifiers: ["angelscript", "as"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-c++src"
}, {
  label: "Ant Build System",
  identifiers: [],
  codemirror_mode: "xml",
  codemirror_mime_type: "application/xml"
}, {
  label: "Apex",
  identifiers: ["apex", "cls"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-java"
}, {
  label: "Asymptote",
  identifiers: ["asymptote", "asy"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-kotlin"
}, {
  label: "BibTeX",
  identifiers: ["bibtex", "bib"],
  codemirror_mode: "stex",
  codemirror_mime_type: "text/x-stex"
}, {
  label: "Brainfuck",
  identifiers: ["brainfuck", "b", "bf"],
  codemirror_mode: "brainfuck",
  codemirror_mime_type: "text/x-brainfuck"
}, {
  label: "C",
  identifiers: ["c", "cats", "h", "idc"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-csrc"
}, {
  label: "C#",
  identifiers: ["csharp", "cs", "cake", "csx"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-csharp"
}, {
  label: "C++",
  identifiers: ["cpp", "cc", "cp", "cxx", "h", "hh", "hpp", "hxx", "inc", "inl", "ino", "ipp", "re", "tcc", "tpp"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-c++src"
}, {
  label: "C2hs Haskell",
  identifiers: ["chs"],
  codemirror_mode: "haskell",
  codemirror_mime_type: "text/x-haskell"
}, {
  label: "CMake",
  identifiers: ["cmake"],
  codemirror_mode: "cmake",
  codemirror_mime_type: "text/x-cmake"
}, {
  label: "COBOL",
  identifiers: ["cobol", "cob", "cbl", "ccp", "cpy"],
  codemirror_mode: "cobol",
  codemirror_mime_type: "text/x-cobol"
}, {
  label: "COLLADA",
  identifiers: ["collada", "dae"],
  codemirror_mode: "xml",
  codemirror_mime_type: "text/xml"
}, {
  label: "CSON",
  identifiers: ["cson"],
  codemirror_mode: "coffeescript",
  codemirror_mime_type: "text/x-coffeescript"
}, {
  label: "CSS",
  identifiers: ["css"],
  codemirror_mode: "css",
  codemirror_mime_type: "text/css"
}, {
  label: "Cabal Config",
  identifiers: ["Cabal", "cabal"],
  codemirror_mode: "haskell",
  codemirror_mime_type: "text/x-haskell"
}, {
  label: "ChucK",
  identifiers: ["chuck", "ck"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-java"
}, {
  label: "Clojure",
  identifiers: ["clojure", "clj", "boot", "cljc", "cljs", "cljscm", "cljx", "hic"],
  codemirror_mode: "clojure",
  codemirror_mime_type: "text/x-clojure"
}, {
  label: "Closure Templates",
  identifiers: ["soy"],
  codemirror_mode: "soy",
  codemirror_mime_type: "text/x-soy"
}, {
  label: "Cloud Firestore Security Rules",
  identifiers: [],
  codemirror_mode: "css",
  codemirror_mime_type: "text/css"
}, {
  label: "CoffeeScript",
  identifiers: ["coffeescript", "coffee", "cake", "cjsx", "iced"],
  codemirror_mode: "coffeescript",
  codemirror_mime_type: "text/x-coffeescript"
}, {
  label: "Common Lisp",
  identifiers: ["lisp", "asd", "cl", "l", "lsp", "ny", "podsl", "sexp"],
  codemirror_mode: "commonlisp",
  codemirror_mime_type: "text/x-common-lisp"
}, {
  label: "Common Workflow Language",
  identifiers: ["cwl"],
  codemirror_mode: "yaml",
  codemirror_mime_type: "text/x-yaml"
}, {
  label: "Component Pascal",
  identifiers: ["delphi", "objectpascal", "cp", "cps"],
  codemirror_mode: "pascal",
  codemirror_mime_type: "text/x-pascal"
}, {
  label: "Crystal",
  identifiers: ["crystal", "cr"],
  codemirror_mode: "crystal",
  codemirror_mime_type: "text/x-crystal"
}, {
  label: "Cuda",
  identifiers: ["cuda", "cu", "cuh"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-c++src"
}, {
  label: "Cycript",
  identifiers: ["cycript", "cy"],
  codemirror_mode: "javascript",
  codemirror_mime_type: "text/javascript"
}, {
  label: "Cython",
  identifiers: ["cython", "pyrex", "pyx", "pxd", "pxi"],
  codemirror_mode: "python",
  codemirror_mime_type: "text/x-cython"
}, {
  label: "D",
  identifiers: ["d", "di"],
  codemirror_mode: "d",
  codemirror_mime_type: "text/x-d"
}, {
  label: "DTrace",
  identifiers: ["dtrace", "d"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-csrc"
}, {
  label: "Dart",
  identifiers: ["dart"],
  codemirror_mode: "dart",
  codemirror_mime_type: "application/dart"
}, {
  label: "Dhall",
  identifiers: ["dhall"],
  codemirror_mode: "haskell",
  codemirror_mime_type: "text/x-haskell"
}, {
  label: "Diff",
  identifiers: ["diff", "udiff", "patch"],
  codemirror_mode: "diff",
  codemirror_mime_type: "text/x-diff"
}, {
  label: "Dockerfile",
  identifiers: ["dockerfile"],
  codemirror_mode: "dockerfile",
  codemirror_mime_type: "text/x-dockerfile"
}, {
  label: "Dylan",
  identifiers: ["dylan", "dyl", "intr", "lid"],
  codemirror_mode: "dylan",
  codemirror_mime_type: "text/x-dylan"
}, {
  label: "EBNF",
  identifiers: ["ebnf"],
  codemirror_mode: "ebnf",
  codemirror_mime_type: "text/x-ebnf"
}, {
  label: "ECL",
  identifiers: ["ecl", "eclxml"],
  codemirror_mode: "ecl",
  codemirror_mime_type: "text/x-ecl"
}, {
  label: "EQ",
  identifiers: ["eq"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-csharp"
}, {
  label: "Eagle",
  identifiers: ["eagle", "sch", "brd"],
  codemirror_mode: "xml",
  codemirror_mime_type: "text/xml"
}, {
  label: "Easybuild",
  identifiers: ["easybuild", "eb"],
  codemirror_mode: "python",
  codemirror_mime_type: "text/x-python"
}, {
  label: "Ecere Projects",
  identifiers: ["epj"],
  codemirror_mode: "javascript",
  codemirror_mime_type: "application/json"
}, {
  label: "EditorConfig",
  identifiers: ["editorconfig"],
  codemirror_mode: "properties",
  codemirror_mime_type: "text/x-properties"
}, {
  label: "Edje Data Collection",
  identifiers: ["edc"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-c++src"
}, {
  label: "Eiffel",
  identifiers: ["eiffel", "e"],
  codemirror_mode: "eiffel",
  codemirror_mime_type: "text/x-eiffel"
}, {
  label: "Elm",
  identifiers: ["elm"],
  codemirror_mode: "elm",
  codemirror_mime_type: "text/x-elm"
}, {
  label: "Emacs Lisp",
  identifiers: ["elisp", "emacs", "el"],
  codemirror_mode: "commonlisp",
  codemirror_mime_type: "text/x-common-lisp"
}, {
  label: "EmberScript",
  identifiers: ["emberscript", "em"],
  codemirror_mode: "coffeescript",
  codemirror_mime_type: "text/x-coffeescript"
}, {
  label: "Erlang",
  identifiers: ["erlang", "erl", "es", "escript", "hrl", "xrl", "yrl"],
  codemirror_mode: "erlang",
  codemirror_mime_type: "text/x-erlang"
}, {
  label: "F#",
  identifiers: ["fsharp", "fs", "fsi", "fsx"],
  codemirror_mode: "mllike",
  codemirror_mime_type: "text/x-fsharp"
}, {
  label: "Factor",
  identifiers: ["factor"],
  codemirror_mode: "factor",
  codemirror_mime_type: "text/x-factor"
}, {
  label: "Forth",
  identifiers: ["forth", "fth", "f", "for", "fr", "frt", "fs"],
  codemirror_mode: "forth",
  codemirror_mime_type: "text/x-forth"
}, {
  label: "Fortran",
  identifiers: ["fortran", "f", "for", "fpp"],
  codemirror_mode: "fortran",
  codemirror_mime_type: "text/x-fortran"
}, {
  label: "GCC Machine Description",
  identifiers: ["md"],
  codemirror_mode: "commonlisp",
  codemirror_mime_type: "text/x-common-lisp"
}, {
  label: "GN",
  identifiers: ["gn", "gni"],
  codemirror_mode: "python",
  codemirror_mime_type: "text/x-python"
}, {
  label: "Game Maker Language",
  identifiers: ["gml"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-c++src"
}, {
  label: "Genshi",
  identifiers: ["genshi", "kid"],
  codemirror_mode: "xml",
  codemirror_mime_type: "text/xml"
}, {
  label: "Gentoo Ebuild",
  identifiers: ["ebuild"],
  codemirror_mode: "shell",
  codemirror_mime_type: "text/x-sh"
}, {
  label: "Gentoo Eclass",
  identifiers: ["eclass"],
  codemirror_mode: "shell",
  codemirror_mime_type: "text/x-sh"
}, {
  label: "Git Attributes",
  identifiers: ["gitattributes"],
  codemirror_mode: "shell",
  codemirror_mime_type: "text/x-sh"
}, {
  label: "Git Config",
  identifiers: ["gitconfig", "gitmodules"],
  codemirror_mode: "properties",
  codemirror_mime_type: "text/x-properties"
}, {
  label: "Glyph",
  identifiers: ["glyph", "glf"],
  codemirror_mode: "tcl",
  codemirror_mime_type: "text/x-tcl"
}, {
  label: "Go",
  identifiers: ["go", "golang"],
  codemirror_mode: "go",
  codemirror_mime_type: "text/x-go"
}, {
  label: "Grammatical Framework",
  identifiers: ["gf"],
  codemirror_mode: "haskell",
  codemirror_mime_type: "text/x-haskell"
}, {
  label: "Groovy",
  identifiers: ["groovy", "grt", "gtpl", "gvy"],
  codemirror_mode: "groovy",
  codemirror_mime_type: "text/x-groovy"
}, {
  label: "Groovy Server Pages",
  identifiers: ["gsp"],
  codemirror_mode: "htmlembedded",
  codemirror_mime_type: "application/x-jsp"
}, {
  label: "HCL",
  identifiers: ["hcl", "terraform", "tf", "tfvars", "workflow"],
  codemirror_mode: "ruby",
  codemirror_mime_type: "text/x-ruby"
}, {
  label: "HTML",
  identifiers: ["html", "xhtml", "htm", "inc", "st", "xht"],
  codemirror_mode: "htmlmixed",
  codemirror_mime_type: "text/html"
}, {
  label: "HTML+Django",
  identifiers: ["django", "htmldjango", "njk", "nunjucks", "jinja", "mustache"],
  codemirror_mode: "django",
  codemirror_mime_type: "text/x-django"
}, {
  label: "HTML+ECR",
  identifiers: ["ecr"],
  codemirror_mode: "htmlmixed",
  codemirror_mime_type: "text/html"
}, {
  label: "HTML+EEX",
  identifiers: ["eex"],
  codemirror_mode: "htmlmixed",
  codemirror_mime_type: "text/html"
}, {
  label: "HTML+ERB",
  identifiers: ["erb"],
  codemirror_mode: "htmlembedded",
  codemirror_mime_type: "application/x-erb"
}, {
  label: "HTML+PHP",
  identifiers: ["phtml"],
  codemirror_mode: "php",
  codemirror_mime_type: "application/x-httpd-php"
}, {
  label: "HTML+Razor",
  identifiers: ["razor", "cshtml"],
  codemirror_mode: "htmlmixed",
  codemirror_mime_type: "text/html"
}, {
  label: "HTTP",
  identifiers: ["http"],
  codemirror_mode: "http",
  codemirror_mime_type: "message/http"
}, {
  label: "Hack",
  identifiers: ["hack", "hh", "php"],
  codemirror_mode: "php",
  codemirror_mime_type: "application/x-httpd-php"
}, {
  label: "Haml",
  identifiers: ["haml"],
  codemirror_mode: "haml",
  codemirror_mime_type: "text/x-haml"
}, {
  label: "Haskell",
  identifiers: ["haskell", "hs", "hsc"],
  codemirror_mode: "haskell",
  codemirror_mime_type: "text/x-haskell"
}, {
  label: "Haxe",
  identifiers: ["haxe", "hx", "hxsl"],
  codemirror_mode: "haxe",
  codemirror_mime_type: "text/x-haxe"
}, {
  label: "HolyC",
  identifiers: ["holyc", "hc"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-csrc"
}, {
  label: "IDL",
  identifiers: ["idl", "pro", "dlm"],
  codemirror_mode: "idl",
  codemirror_mime_type: "text/x-idl"
}, {
  label: "INI",
  identifiers: ["ini", "dosini", "cfg", "lektorproject", "prefs", "pro", "properties"],
  codemirror_mode: "properties",
  codemirror_mime_type: "text/x-properties"
}, {
  label: "IRC log",
  identifiers: ["irc", "irclog", "weechatlog"],
  codemirror_mode: "mirc",
  codemirror_mime_type: "text/mirc"
}, {
  label: "Ignore List",
  identifiers: ["ignore", "gitignore"],
  codemirror_mode: "shell",
  codemirror_mime_type: "text/x-sh"
}, {
  label: "JSON",
  identifiers: ["json", "avsc", "geojson", "gltf", "har", "ice", "jsonl", "mcmeta", "tfstate", "topojson", "webapp", "webmanifest", "yy", "yyp"],
  codemirror_mode: "javascript",
  codemirror_mime_type: "application/json"
}, {
  label: "JSON with Comments",
  identifiers: ["jsonc"],
  codemirror_mode: "javascript",
  codemirror_mime_type: "text/javascript"
}, {
  label: "JSON5",
  identifiers: [],
  codemirror_mode: "javascript",
  codemirror_mime_type: "application/json"
}, {
  label: "JSONLD",
  identifiers: ["jsonld"],
  codemirror_mode: "javascript",
  codemirror_mime_type: "application/json"
}, {
  label: "JSONiq",
  identifiers: ["jsoniq", "jq"],
  codemirror_mode: "javascript",
  codemirror_mime_type: "application/json"
}, {
  label: "JSX",
  identifiers: ["jsx"],
  codemirror_mode: "jsx",
  codemirror_mime_type: "text/jsx"
}, {
  label: "Java",
  identifiers: ["java"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-java"
}, {
  label: "Java Properties",
  identifiers: ["properties"],
  codemirror_mode: "properties",
  codemirror_mime_type: "text/x-properties"
}, {
  label: "Java Server Pages",
  identifiers: ["jsp"],
  codemirror_mode: "htmlembedded",
  codemirror_mime_type: "application/x-jsp"
}, {
  label: "JavaScript",
  identifiers: ["javascript", "js", "node", "bones", "es", "frag", "gs", "jake", "jsb", "jscad", "jsfl", "jsm", "jss", "mjs", "njs", "pac", "sjs", "ssjs", "xsjs", "xsjslib"],
  codemirror_mode: "javascript",
  codemirror_mime_type: "text/javascript"
}, {
  label: "JavaScript+ERB",
  identifiers: [],
  codemirror_mode: "javascript",
  codemirror_mime_type: "application/javascript"
}, {
  label: "Julia",
  identifiers: ["julia", "jl"],
  codemirror_mode: "julia",
  codemirror_mime_type: "text/x-julia"
}, {
  label: "Jupyter Notebook",
  identifiers: ["ipynb"],
  codemirror_mode: "javascript",
  codemirror_mime_type: "application/json"
}, {
  label: "KiCad Layout",
  identifiers: ["pcbnew"],
  codemirror_mode: "commonlisp",
  codemirror_mime_type: "text/x-common-lisp"
}, {
  label: "Kit",
  identifiers: ["kit"],
  codemirror_mode: "htmlmixed",
  codemirror_mime_type: "text/html"
}, {
  label: "Kotlin",
  identifiers: ["kotlin", "kt", "ktm", "kts"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-kotlin"
}, {
  label: "LFE",
  identifiers: ["lfe"],
  codemirror_mode: "commonlisp",
  codemirror_mime_type: "text/x-common-lisp"
}, {
  label: "LTspice Symbol",
  identifiers: ["asy"],
  codemirror_mode: "spreadsheet",
  codemirror_mime_type: "text/x-spreadsheet"
}, {
  label: "LabVIEW",
  identifiers: ["labview", "lvproj"],
  codemirror_mode: "xml",
  codemirror_mime_type: "text/xml"
}, {
  label: "Latte",
  identifiers: ["latte"],
  codemirror_mode: "smarty",
  codemirror_mime_type: "text/x-smarty"
}, {
  label: "Less",
  identifiers: ["less"],
  codemirror_mode: "css",
  codemirror_mime_type: "text/css"
}, {
  label: "Literate Haskell",
  identifiers: ["lhaskell", "lhs"],
  codemirror_mode: "haskell-literate",
  codemirror_mime_type: "text/x-literate-haskell"
}, {
  label: "LiveScript",
  identifiers: ["livescript", "ls"],
  codemirror_mode: "livescript",
  codemirror_mime_type: "text/x-livescript"
}, {
  label: "LookML",
  identifiers: ["lookml"],
  codemirror_mode: "yaml",
  codemirror_mime_type: "text/x-yaml"
}, {
  label: "Lua",
  identifiers: ["lua", "fcgi", "nse", "rbxs", "wlua"],
  codemirror_mode: "lua",
  codemirror_mime_type: "text/x-lua"
}, {
  label: "M",
  identifiers: ["m", "mumps"],
  codemirror_mode: "mumps",
  codemirror_mime_type: "text/x-mumps"
}, {
  label: "MATLAB",
  identifiers: ["matlab", "octave", "m"],
  codemirror_mode: "octave",
  codemirror_mime_type: "text/x-octave"
}, {
  label: "MTML",
  identifiers: ["mtml"],
  codemirror_mode: "htmlmixed",
  codemirror_mime_type: "text/html"
}, {
  label: "MUF",
  identifiers: ["muf", "m"],
  codemirror_mode: "forth",
  codemirror_mime_type: "text/x-forth"
}, {
  label: "Makefile",
  identifiers: ["makefile", "bsdmake", "make", "mf", "mak", "d", "mk", "mkfile"],
  codemirror_mode: "cmake",
  codemirror_mime_type: "text/x-cmake"
}, {
  label: "Markdown",
  identifiers: ["markdown", "pandoc", "md", "mdown", "mdwn", "mdx", "mkd", "mkdn", "mkdown", "ronn", "workbook"],
  codemirror_mode: "gfm",
  codemirror_mime_type: "text/x-gfm"
}, {
  label: "Marko",
  identifiers: ["marko", "markojs"],
  codemirror_mode: "htmlmixed",
  codemirror_mime_type: "text/html"
}, {
  label: "Mathematica",
  identifiers: ["mathematica", "mma", "cdf", "m", "ma", "mt", "nb", "nbp", "wl", "wlt"],
  codemirror_mode: "mathematica",
  codemirror_mime_type: "text/x-mathematica"
}, {
  label: "Maven POM",
  identifiers: [],
  codemirror_mode: "xml",
  codemirror_mime_type: "text/xml"
}, {
  label: "Max",
  identifiers: ["max", "maxmsp", "maxpat", "maxhelp", "maxproj", "mxt", "pat"],
  codemirror_mode: "javascript",
  codemirror_mime_type: "application/json"
}, {
  label: "Metal",
  identifiers: ["metal"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-c++src"
}, {
  label: "Mirah",
  identifiers: ["mirah", "druby", "duby"],
  codemirror_mode: "ruby",
  codemirror_mime_type: "text/x-ruby"
}, {
  label: "Modelica",
  identifiers: ["modelica", "mo"],
  codemirror_mode: "modelica",
  codemirror_mime_type: "text/x-modelica"
}, {
  label: "NSIS",
  identifiers: ["nsis", "nsi", "nsh"],
  codemirror_mode: "nsis",
  codemirror_mime_type: "text/x-nsis"
}, {
  label: "NetLogo",
  identifiers: ["netlogo", "nlogo"],
  codemirror_mode: "commonlisp",
  codemirror_mime_type: "text/x-common-lisp"
}, {
  label: "NewLisp",
  identifiers: ["newlisp", "nl", "lisp", "lsp"],
  codemirror_mode: "commonlisp",
  codemirror_mime_type: "text/x-common-lisp"
}, {
  label: "Nginx",
  identifiers: ["nginx", "nginxconf", "vhost"],
  codemirror_mode: "nginx",
  codemirror_mime_type: "text/x-nginx-conf"
}, {
  label: "Nu",
  identifiers: ["nu", "nush"],
  codemirror_mode: "scheme",
  codemirror_mime_type: "text/x-scheme"
}, {
  label: "NumPy",
  identifiers: ["numpy", "numpyw", "numsc"],
  codemirror_mode: "python",
  codemirror_mime_type: "text/x-python"
}, {
  label: "OCaml",
  identifiers: ["ocaml", "ml", "eliom", "eliomi", "mli", "mll", "mly"],
  codemirror_mode: "mllike",
  codemirror_mime_type: "text/x-ocaml"
}, {
  label: "Objective-C",
  identifiers: ["objc", "objectivec", "m", "h"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-objectivec"
}, {
  label: "Objective-C++",
  identifiers: ["mm"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-objectivec"
}, {
  label: "OpenCL",
  identifiers: ["opencl", "cl"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-csrc"
}, {
  label: "OpenRC runscript",
  identifiers: ["openrc"],
  codemirror_mode: "shell",
  codemirror_mime_type: "text/x-sh"
}, {
  label: "Oz",
  identifiers: ["oz"],
  codemirror_mode: "oz",
  codemirror_mime_type: "text/x-oz"
}, {
  label: "PHP",
  identifiers: ["php", "inc", "aw", "ctp", "fcgi", "phps", "phpt"],
  codemirror_mode: "php",
  codemirror_mime_type: "application/x-httpd-php"
}, {
  label: "PLSQL",
  identifiers: ["plsql", "pls", "bdy", "ddl", "fnc", "pck", "pkb", "pks", "plb", "prc", "spc", "sql", "tpb", "tps", "trg", "vw"],
  codemirror_mode: "sql",
  codemirror_mime_type: "text/x-plsql"
}, {
  label: "PLpgSQL",
  identifiers: ["plpgsql", "pgsql", "sql"],
  codemirror_mode: "sql",
  codemirror_mime_type: "text/x-sql"
}, {
  label: "Pascal",
  identifiers: ["pascal", "pas", "dfm", "dpr", "inc", "lpr", "pp"],
  codemirror_mode: "pascal",
  codemirror_mime_type: "text/x-pascal"
}, {
  label: "Perl",
  identifiers: ["perl", "cperl", "pl", "al", "cgi", "fcgi", "ph", "plx", "pm", "psgi", "t"],
  codemirror_mode: "perl",
  codemirror_mime_type: "text/x-perl"
}, {
  label: "Perl 6",
  identifiers: ["nqp", "pl", "pm", "t"],
  codemirror_mode: "perl",
  codemirror_mime_type: "text/x-perl"
}, {
  label: "Pic",
  identifiers: ["pic", "chem"],
  codemirror_mode: "troff",
  codemirror_mime_type: "text/troff"
}, {
  label: "Pod",
  identifiers: ["pod"],
  codemirror_mode: "perl",
  codemirror_mime_type: "text/x-perl"
}, {
  label: "PowerShell",
  identifiers: ["powershell", "posh", "pwsh"],
  codemirror_mode: "powershell",
  codemirror_mime_type: "application/x-powershell"
}, {
  label: "Protocol Buffer",
  identifiers: ["protobuf", "proto"],
  codemirror_mode: "protobuf",
  codemirror_mime_type: "text/x-protobuf"
}, {
  label: "Public Key",
  identifiers: ["asc", "pub"],
  codemirror_mode: "asciiarmor",
  codemirror_mime_type: "application/pgp"
}, {
  label: "Pug",
  identifiers: ["pug", "jade"],
  codemirror_mode: "pug",
  codemirror_mime_type: "text/x-pug"
}, {
  label: "Puppet",
  identifiers: ["puppet", "pp"],
  codemirror_mode: "puppet",
  codemirror_mime_type: "text/x-puppet"
}, {
  label: "PureScript",
  identifiers: ["purescript", "purs"],
  codemirror_mode: "haskell",
  codemirror_mime_type: "text/x-haskell"
}, {
  label: "Python",
  identifiers: ["python", "rusthon", "py", "bzl", "cgi", "fcgi", "gyp", "gypi", "lmi", "pyde", "pyi", "pyp", "pyt", "pyw", "rpy", "spec", "tac", "wsgi", "xpy"],
  codemirror_mode: "python",
  codemirror_mime_type: "text/x-python"
}, {
  label: "R",
  identifiers: ["r", "R", "Rscript", "splus", "rd", "rsx"],
  codemirror_mode: "r",
  codemirror_mime_type: "text/x-rsrc"
}, {
  label: "RAML",
  identifiers: ["raml"],
  codemirror_mode: "yaml",
  codemirror_mime_type: "text/x-yaml"
}, {
  label: "RHTML",
  identifiers: ["rhtml"],
  codemirror_mode: "htmlembedded",
  codemirror_mime_type: "application/x-erb"
}, {
  label: "RMarkdown",
  identifiers: ["rmarkdown", "rmd"],
  codemirror_mode: "gfm",
  codemirror_mime_type: "text/x-gfm"
}, {
  label: "RPM Spec",
  identifiers: ["specfile", "spec"],
  codemirror_mode: "rpm",
  codemirror_mime_type: "text/x-rpm-spec"
}, {
  label: "Reason",
  identifiers: ["reason", "re", "rei"],
  codemirror_mode: "rust",
  codemirror_mime_type: "text/x-rustsrc"
}, {
  label: "Roff",
  identifiers: ["roff", "groff", "man", "manpage", "mdoc", "nroff", "troff", "l", "me", "ms", "n", "nr", "rno", "tmac"],
  codemirror_mode: "troff",
  codemirror_mime_type: "text/troff"
}, {
  label: "Roff Manpage",
  identifiers: ["man", "mdoc"],
  codemirror_mode: "troff",
  codemirror_mime_type: "text/troff"
}, {
  label: "Rouge",
  identifiers: ["rouge", "rg"],
  codemirror_mode: "clojure",
  codemirror_mime_type: "text/x-clojure"
}, {
  label: "Ruby",
  identifiers: ["ruby", "jruby", "macruby", "rake", "rb", "rbx", "builder", "eye", "fcgi", "gemspec", "god", "jbuilder", "mspec", "pluginspec", "podspec", "rabl", "rbuild", "rbw", "ru", "spec", "thor", "watchr"],
  codemirror_mode: "ruby",
  codemirror_mime_type: "text/x-ruby"
}, {
  label: "Rust",
  identifiers: ["rust", "rs"],
  codemirror_mode: "rust",
  codemirror_mime_type: "text/x-rustsrc"
}, {
  label: "SAS",
  identifiers: ["sas"],
  codemirror_mode: "sas",
  codemirror_mime_type: "text/x-sas"
}, {
  label: "SCSS",
  identifiers: ["scss"],
  codemirror_mode: "css",
  codemirror_mime_type: "text/x-scss"
}, {
  label: "SPARQL",
  identifiers: ["sparql", "rq"],
  codemirror_mode: "sparql",
  codemirror_mime_type: "application/sparql-query"
}, {
  label: "SQL",
  identifiers: ["sql", "cql", "ddl", "inc", "mysql", "prc", "tab", "udf", "viw"],
  codemirror_mode: "sql",
  codemirror_mime_type: "text/x-sql"
}, {
  label: "SQLPL",
  identifiers: ["sqlpl", "sql"],
  codemirror_mode: "sql",
  codemirror_mime_type: "text/x-sql"
}, {
  label: "SRecode Template",
  identifiers: ["srt"],
  codemirror_mode: "commonlisp",
  codemirror_mime_type: "text/x-common-lisp"
}, {
  label: "SVG",
  identifiers: ["svg"],
  codemirror_mode: "xml",
  codemirror_mime_type: "text/xml"
}, {
  label: "Sage",
  identifiers: ["sage", "sagews"],
  codemirror_mode: "python",
  codemirror_mime_type: "text/x-python"
}, {
  label: "SaltStack",
  identifiers: ["saltstack", "saltstate", "salt", "sls"],
  codemirror_mode: "yaml",
  codemirror_mime_type: "text/x-yaml"
}, {
  label: "Sass",
  identifiers: ["sass"],
  codemirror_mode: "sass",
  codemirror_mime_type: "text/x-sass"
}, {
  label: "Scala",
  identifiers: ["scala", "kojo", "sbt", "sc"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-scala"
}, {
  label: "Scheme",
  identifiers: ["scheme", "scm", "sch", "sld", "sls", "sps", "ss"],
  codemirror_mode: "scheme",
  codemirror_mime_type: "text/x-scheme"
}, {
  label: "Shell",
  identifiers: ["shell", "sh", "bash", "zsh", "bats", "cgi", "command", "fcgi", "ksh", "tmux", "tool"],
  codemirror_mode: "shell",
  codemirror_mime_type: "text/x-sh"
}, {
  label: "ShellSession",
  identifiers: ["shellsession", "console"],
  codemirror_mode: "shell",
  codemirror_mime_type: "text/x-sh"
}, {
  label: "Slim",
  identifiers: ["slim"],
  codemirror_mode: "slim",
  codemirror_mime_type: "text/x-slim"
}, {
  label: "Smalltalk",
  identifiers: ["smalltalk", "squeak", "st", "cs"],
  codemirror_mode: "smalltalk",
  codemirror_mime_type: "text/x-stsrc"
}, {
  label: "Smarty",
  identifiers: ["smarty", "tpl"],
  codemirror_mode: "smarty",
  codemirror_mime_type: "text/x-smarty"
}, {
  label: "Squirrel",
  identifiers: ["squirrel", "nut"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-c++src"
}, {
  label: "Standard ML",
  identifiers: ["sml", "ML", "fun", "sig"],
  codemirror_mode: "mllike",
  codemirror_mime_type: "text/x-ocaml"
}, {
  label: "Svelte",
  identifiers: ["svelte"],
  codemirror_mode: "htmlmixed",
  codemirror_mime_type: "text/html"
}, {
  label: "Swift",
  identifiers: ["swift"],
  codemirror_mode: "swift",
  codemirror_mime_type: "text/x-swift"
}, {
  label: "SystemVerilog",
  identifiers: ["systemverilog", "sv", "svh", "vh"],
  codemirror_mode: "verilog",
  codemirror_mime_type: "text/x-systemverilog"
}, {
  label: "TOML",
  identifiers: ["toml"],
  codemirror_mode: "toml",
  codemirror_mime_type: "text/x-toml"
}, {
  label: "TSX",
  identifiers: ["tsx"],
  codemirror_mode: "jsx",
  codemirror_mime_type: "text/jsx"
}, {
  label: "Tcl",
  identifiers: ["tcl", "adp", "tm"],
  codemirror_mode: "tcl",
  codemirror_mime_type: "text/x-tcl"
}, {
  label: "Tcsh",
  identifiers: ["tcsh", "csh"],
  codemirror_mode: "shell",
  codemirror_mime_type: "text/x-sh"
}, {
  label: "TeX",
  identifiers: ["tex", "latex", "aux", "bbx", "cbx", "cls", "dtx", "ins", "lbx", "ltx", "mkii", "mkiv", "mkvi", "sty", "toc"],
  codemirror_mode: "stex",
  codemirror_mime_type: "text/x-stex"
}, {
  label: "Terra",
  identifiers: ["terra", "t"],
  codemirror_mode: "lua",
  codemirror_mime_type: "text/x-lua"
}, {
  label: "Textile",
  identifiers: ["textile"],
  codemirror_mode: "textile",
  codemirror_mime_type: "text/x-textile"
}, {
  label: "Turtle",
  identifiers: ["turtle", "ttl"],
  codemirror_mode: "turtle",
  codemirror_mime_type: "text/turtle"
}, {
  label: "Twig",
  identifiers: ["twig"],
  codemirror_mode: "twig",
  codemirror_mime_type: "text/x-twig"
}, {
  label: "TypeScript",
  identifiers: ["typescript", "ts"],
  codemirror_mode: "javascript",
  codemirror_mime_type: "application/typescript"
}, {
  label: "Unified Parallel C",
  identifiers: ["upc"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-csrc"
}, {
  label: "Unity3D Asset",
  identifiers: ["anim", "asset", "mat", "meta", "prefab", "unity"],
  codemirror_mode: "yaml",
  codemirror_mime_type: "text/x-yaml"
}, {
  label: "Uno",
  identifiers: ["uno"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-csharp"
}, {
  label: "UnrealScript",
  identifiers: ["unrealscript", "uc"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-java"
}, {
  label: "V",
  identifiers: ["v", "vlang"],
  codemirror_mode: "go",
  codemirror_mime_type: "text/x-go"
}, {
  label: "VHDL",
  identifiers: ["vhdl", "vhd", "vhf", "vhi", "vho", "vhs", "vht", "vhw"],
  codemirror_mode: "vhdl",
  codemirror_mime_type: "text/x-vhdl"
}, {
  label: "Verilog",
  identifiers: ["verilog", "v", "veo"],
  codemirror_mode: "verilog",
  codemirror_mime_type: "text/x-verilog"
}, {
  label: "Visual Basic",
  identifiers: ["vbnet", "vb", "bas", "cls", "frm", "frx", "vba", "vbhtml", "vbs"],
  codemirror_mode: "vb",
  codemirror_mime_type: "text/x-vb"
}, {
  label: "Volt",
  identifiers: ["volt"],
  codemirror_mode: "d",
  codemirror_mime_type: "text/x-d"
}, {
  label: "WebAssembly",
  identifiers: ["webassembly", "wast", "wasm", "wat"],
  codemirror_mode: "commonlisp",
  codemirror_mime_type: "text/x-common-lisp"
}, {
  label: "WebIDL",
  identifiers: ["webidl"],
  codemirror_mode: "webidl",
  codemirror_mime_type: "text/x-webidl"
}, {
  label: "Windows Registry Entries",
  identifiers: ["reg"],
  codemirror_mode: "properties",
  codemirror_mime_type: "text/x-properties"
}, {
  label: "X BitMap",
  identifiers: ["xbm"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-csrc"
}, {
  label: "X PixMap",
  identifiers: ["xpm", "pm"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-csrc"
}, {
  label: "XC",
  identifiers: ["xc"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-csrc"
}, {
  label: "XML",
  identifiers: ["xml", "rss", "xsd", "wsdl", "adml", "admx", "ant", "axml", "builds", "ccproj", "ccxml", "clixml", "cproject", "cscfg", "csdef", "csl", "csproj", "ct", "depproj", "dita", "ditamap", "ditaval", "dotsettings", "filters", "fsproj", "fxml", "glade", "gml", "gmx", "grxml", "iml", "ivy", "jelly", "jsproj", "kml", "launch", "mdpolicy", "mjml", "mm", "mod", "mxml", "natvis", "ncl", "ndproj", "nproj", "nuspec", "odd", "osm", "pkgproj", "pluginspec", "proj", "props", "pt", "rdf", "resx", "sch", "scxml", "sfproj", "shproj", "srdf", "storyboard", "targets", "tml", "ts", "tsx", "ui", "urdf", "ux", "vbproj", "vcxproj", "vsixmanifest", "vssettings", "vstemplate", "vxml", "wixproj", "workflow", "wsf", "wxi", "wxl", "wxs", "xacro", "xaml", "xib", "xlf", "xliff", "xmi", "xproj", "xspec", "xul", "zcml"],
  codemirror_mode: "xml",
  codemirror_mime_type: "text/xml"
}, {
  label: "XML Property List",
  identifiers: ["plist", "stTheme", "tmCommand", "tmLanguage", "tmPreferences", "tmSnippet", "tmTheme"],
  codemirror_mode: "xml",
  codemirror_mime_type: "text/xml"
}, {
  label: "XPages",
  identifiers: ["xpages"],
  codemirror_mode: "xml",
  codemirror_mime_type: "text/xml"
}, {
  label: "XProc",
  identifiers: ["xproc", "xpl"],
  codemirror_mode: "xml",
  codemirror_mime_type: "text/xml"
}, {
  label: "XQuery",
  identifiers: ["xquery", "xq", "xql", "xqm", "xqy"],
  codemirror_mode: "xquery",
  codemirror_mime_type: "application/xquery"
}, {
  label: "XS",
  identifiers: ["xs"],
  codemirror_mode: "clike",
  codemirror_mime_type: "text/x-csrc"
}, {
  label: "XSLT",
  identifiers: ["xslt", "xsl"],
  codemirror_mode: "xml",
  codemirror_mime_type: "text/xml"
}, {
  label: "YAML",
  identifiers: ["yaml", "yml", "mir", "reek", "rviz", "syntax"],
  codemirror_mode: "yaml",
  codemirror_mime_type: "text/x-yaml"
}, {
  label: "edn",
  identifiers: ["edn"],
  codemirror_mode: "clojure",
  codemirror_mime_type: "text/x-clojure"
}, {
  label: "reStructuredText",
  identifiers: ["restructuredtext", "rst", "rest"],
  codemirror_mode: "rst",
  codemirror_mime_type: "text/x-rst"
}, {
  label: "wisp",
  identifiers: ["wisp"],
  codemirror_mode: "clojure",
  codemirror_mime_type: "text/x-clojure"
}]; // TODO: relocate as a utility function
function getChangedProps(previous, next, keys) {
  const propNames = keys || (0, _uniq2.default)(Object.keys(previous), Object.keys(next));
  const changedProps = propNames.reduce((acc, prop) => {
    if (previous[prop] !== next[prop]) {
      acc[prop] = next[prop];
    }
    return acc;
  }, {});
  if (!(0, _isEmpty2.default)(changedProps)) {
    return changedProps;
  }
}
const languages = languageData.map(lang => ({
  label: lang.label,
  name: lang.identifiers[0],
  mode: lang.codemirror_mode,
  mimeType: lang.codemirror_mime_type
}));
const styleString = `
  padding: 0;
`;
const defaultLang = {
  name: '',
  mode: '',
  label: 'none'
};
function valueToOption(val) {
  if (typeof val === 'string') {
    return {
      value: val,
      label: val
    };
  }
  return {
    value: val.name,
    label: val.label || val.name
  };
}
const modes = languages.map(valueToOption);
const themes = ['default', 'material'];
const settingsPersistKeys = {
  theme: 'cms.codemirror.theme',
  keyMap: 'cms.codemirror.keymap'
};
class CodeControl extends _react.default.Component {
  constructor(...args) {
    var _this$props$value;
    super(...args);
    _defineProperty(this, "keys", this.getKeys(this.props.field));
    _defineProperty(this, "state", {
      isActive: false,
      unknownLang: null,
      lang: '',
      keyMap: localStorage.getItem(settingsPersistKeys['keyMap']) || 'default',
      settingsVisible: false,
      codeMirrorKey: (0, _uuid.v4)(),
      theme: localStorage.getItem(settingsPersistKeys['theme']) || themes[themes.length - 1],
      lastKnownValue: this.valueIsMap() ? (_this$props$value = this.props.value) === null || _this$props$value === void 0 ? void 0 : _this$props$value.get(this.keys.code) : this.props.value
    });
    _defineProperty(this, "visibility", {
      isInvisibleOnInit: this.props.isParentListCollapsed === true,
      isRefreshedAfterInvisible: false
    });
    _defineProperty(this, "getLanguageByName", name => {
      return languages.find(lang => lang.name === name);
    });
    _defineProperty(this, "getKeyMapOptions", () => {
      return Object.keys(_codemirror.default.keyMap).sort().filter(keyMap => ['emacs', 'vim', 'sublime', 'default'].includes(keyMap)).map(keyMap => ({
        value: keyMap,
        label: keyMap
      }));
    });
    // This widget is not fully controlled, it only takes a value through props
    // upon initialization.
    _defineProperty(this, "getInitialLang", () => {
      const {
        value,
        field
      } = this.props;
      const lang = this.valueIsMap() && value && value.get(this.keys.lang) || field.get('default_language');
      const langInfo = this.getLanguageByName(lang);
      if (lang && !langInfo) {
        this.setState({
          unknownLang: lang
        });
      }
      return lang;
    });
    // If `allow_language_selection` is not set, default to true. Otherwise, use
    // its value.
    _defineProperty(this, "allowLanguageSelection", !this.props.field.has('allow_language_selection') || !!this.props.field.get('allow_language_selection'));
    _defineProperty(this, "toValue", this.valueIsMap() ? (type, value) => (this.props.value || (0, _immutable.Map)()).set(this.keys[type], value) : (type, value) => type === 'code' ? value : this.props.value);
    _defineProperty(this, "showSettings", () => {
      this.setState({
        settingsVisible: true
      });
    });
    _defineProperty(this, "hideSettings", () => {
      if (this.state.settingsVisible) {
        this.setState({
          settingsVisible: false
        });
      }
      this.cm.focus();
    });
    _defineProperty(this, "handleFocus", () => {
      this.hideSettings();
      this.props.setActiveStyle();
      this.setActive();
    });
    _defineProperty(this, "handleBlur", () => {
      this.setInactive();
      this.props.setInactiveStyle();
    });
    _defineProperty(this, "setActive", () => this.setState({
      isActive: true
    }));
    _defineProperty(this, "setInactive", () => this.setState({
      isActive: false
    }));
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !(0, _isEqual2.default)(this.state, nextState) || this.props.classNameWrapper !== nextProps.classNameWrapper || this.visibility.isInvisibleOnInit && !this.visibility.isRefreshedAfterInvisible;
  }
  componentDidMount() {
    this.setState({
      lang: this.getInitialLang() || ''
    });
  }
  componentDidUpdate(prevProps, prevState) {
    this.updateCodeMirrorProps(prevState);
    // when initially hidden and then shown, codeMirror content is not visible
    if (this.visibility.isInvisibleOnInit && !this.visibility.isRefreshedAfterInvisible && !this.props.isParentListCollapsed) {
      this.refreshCodeMirrorInstance();
    }
  }
  updateCodeMirrorProps(prevState) {
    const keys = ['lang', 'theme', 'keyMap'];
    const changedProps = getChangedProps(prevState, this.state, keys);
    if (changedProps) {
      this.handleChangeCodeMirrorProps(changedProps);
    }
  }
  refreshCodeMirrorInstance() {
    var _this$cm;
    if ((_this$cm = this.cm) !== null && _this$cm !== void 0 && _this$cm.getWrapperElement().offsetHeight) {
      this.cm.refresh();
      this.visibility.isRefreshedAfterInvisible = true;
    }
  }
  // If the value is a map, keys can be customized via config.
  getKeys(field) {
    const defaults = {
      code: 'code',
      lang: 'lang'
    };

    // Force default keys if widget is an editor component code block.
    if (this.props.isEditorComponent) {
      return defaults;
    }
    const keys = field.get('keys', (0, _immutable.Map)()).toJS();
    return _objectSpread(_objectSpread({}, defaults), keys);
  }

  // Determine if the persisted value is a map rather than a plain string. A map
  // value allows both the code string and the language to be persisted.
  valueIsMap() {
    const {
      field,
      isEditorComponent
    } = this.props;
    return !field.get('output_code_only') || isEditorComponent;
  }
  async handleChangeCodeMirrorProps(changedProps) {
    const {
      onChange
    } = this.props;
    if (changedProps.lang) {
      const {
        mode
      } = this.getLanguageByName(changedProps.lang) || {};
      if (mode) {
        require(`codemirror/mode/${mode}/${mode}.js`);
      }
    }

    // Changing CodeMirror props requires re-initializing the
    // detached/uncontrolled React CodeMirror component, so here we save and
    // restore the selections and cursor position after the state change.
    if (this.cm) {
      const cursor = this.cm.doc.getCursor();
      const selections = this.cm.doc.listSelections();
      this.setState({
        codeMirrorKey: (0, _uuid.v4)()
      }, () => {
        this.cm.doc.setCursor(cursor);
        this.cm.doc.setSelections(selections);
      });
    }
    for (const key of ['theme', 'keyMap']) {
      if (changedProps[key]) {
        localStorage.setItem(settingsPersistKeys[key], changedProps[key]);
      }
    }

    // Only persist the language change if supported - requires the value to be
    // a map rather than just a code string.
    if (changedProps.lang && this.valueIsMap()) {
      onChange(this.toValue('lang', changedProps.lang));
    }
  }
  handleChange(newValue) {
    const cursor = this.cm.doc.getCursor();
    const selections = this.cm.doc.listSelections();
    this.setState({
      lastKnownValue: newValue
    });
    this.props.onChange(this.toValue('code', newValue), {
      cursor,
      selections
    });
  }
  render() {
    const {
      classNameWrapper,
      forID,
      widget,
      isNewEditorComponent
    } = this.props;
    const {
      lang,
      settingsVisible,
      keyMap,
      codeMirrorKey,
      theme,
      lastKnownValue
    } = this.state;
    const langInfo = this.getLanguageByName(lang);
    const mode = (langInfo === null || langInfo === void 0 ? void 0 : langInfo.mimeType) || (langInfo === null || langInfo === void 0 ? void 0 : langInfo.mode);
    return (0, _react2.jsx)(_react2.ClassNames, null, ({
      css,
      cx
    }) => (0, _react2.jsx)("div", {
      className: cx(classNameWrapper, css`
                ${_codemirror2.default};
                ${_material.default};
                ${styleString};
              `)
    }, !settingsVisible && (0, _react2.jsx)(_SettingsButton.default, {
      onClick: this.showSettings
    }), settingsVisible && (0, _react2.jsx)(_SettingsPane.default, {
      hideSettings: this.hideSettings,
      forID: forID,
      modes: modes,
      mode: valueToOption(langInfo || defaultLang),
      theme: themes.find(t => t === theme),
      themes: themes,
      keyMap: {
        value: keyMap,
        label: keyMap
      },
      keyMaps: this.getKeyMapOptions(),
      allowLanguageSelection: this.allowLanguageSelection,
      onChangeLang: newLang => this.setState({
        lang: newLang
      }),
      onChangeTheme: newTheme => this.setState({
        theme: newTheme
      }),
      onChangeKeyMap: newKeyMap => this.setState({
        keyMap: newKeyMap
      })
    }), (0, _react2.jsx)(_reactCodemirror.UnControlled, {
      key: codeMirrorKey,
      id: forID,
      className: css`
                height: 100%;
                border-radius: 0 3px 3px;
                overflow: hidden;

                .CodeMirror {
                  height: auto !important;
                  cursor: text;
                  min-height: 300px;
                }

                .CodeMirror-scroll {
                  min-height: 300px;
                }
              `,
      options: _objectSpread(_objectSpread({
        lineNumbers: true
      }, widget.codeMirrorConfig), {}, {
        extraKeys: _objectSpread({
          'Shift-Tab': 'indentLess',
          Tab: 'indentMore'
        }, widget.codeMirrorConfig.extraKeys || {}),
        theme,
        mode,
        keyMap,
        viewportMargin: Infinity
      }),
      detach: true,
      editorDidMount: cm => {
        this.cm = cm;
        if (isNewEditorComponent) {
          this.handleFocus();
        }
      },
      value: lastKnownValue,
      onChange: (editor, data, newValue) => this.handleChange(newValue),
      onFocus: this.handleFocus,
      onBlur: this.handleBlur
    })));
  }
}
exports.default = CodeControl;
_defineProperty(CodeControl, "propTypes", {
  field: _reactImmutableProptypes.default.map.isRequired,
  onChange: _propTypes.default.func.isRequired,
  value: _propTypes.default.node,
  forID: _propTypes.default.string.isRequired,
  classNameWrapper: _propTypes.default.string.isRequired,
  widget: _propTypes.default.object.isRequired,
  isParentListCollapsed: _propTypes.default.bool
});