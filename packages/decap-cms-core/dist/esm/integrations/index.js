"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIntegrationProvider = void 0;
exports.resolveIntegrations = resolveIntegrations;
var _immutable = require("immutable");
var _implementation = _interopRequireDefault(require("./providers/algolia/implementation"));
var _implementation2 = _interopRequireDefault(require("./providers/assetStore/implementation"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function resolveIntegrations(integrationsConfig, getToken) {
  let integrationInstances = (0, _immutable.Map)({});
  integrationsConfig.get('providers').forEach((providerData, providerName) => {
    switch (providerName) {
      case 'algolia':
        integrationInstances = integrationInstances.set('algolia', new _implementation.default(providerData));
        break;
      case 'assetStore':
        integrationInstances = integrationInstances.set('assetStore', new _implementation2.default(providerData, getToken));
        break;
    }
  });
  return integrationInstances;
}
const getIntegrationProvider = exports.getIntegrationProvider = function () {
  let integrations = null;
  return (integrationsConfig, getToken, provider) => {
    if (integrations) {
      return integrations.get(provider);
    } else {
      integrations = resolveIntegrations(integrationsConfig, getToken);
      return integrations.get(provider);
    }
  };
}();