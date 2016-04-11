/* */ 
"format cjs";
(function(Buffer, process) {
  (function(f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = f();
    } else if (typeof define === "function" && define.amd) {
      define([], f);
    } else {
      var g;
      if (typeof window !== "undefined") {
        g = window;
      } else if (typeof global !== "undefined") {
        g = global;
      } else if (typeof self !== "undefined") {
        g = self;
      } else {
        g = this;
      }
      g.SwaggerClient = f();
    }
  })(function() {
    var define,
        module,
        exports;
    return (function e(t, n, r) {
      function s(o, u) {
        if (!n[o]) {
          if (!t[o]) {
            var a = typeof require == "function" && require;
            if (!u && a)
              return a(o, !0);
            if (i)
              return i(o, !0);
            var f = new Error("Cannot find module '" + o + "'");
            throw f.code = "MODULE_NOT_FOUND", f;
          }
          var l = n[o] = {exports: {}};
          t[o][0].call(l.exports, function(e) {
            var n = t[o][1][e];
            return s(n ? n : e);
          }, l, l.exports, e, t, n, r);
        }
        return n[o].exports;
      }
      var i = typeof require == "function" && require;
      for (var o = 0; o < r.length; o++)
        s(r[o]);
      return s;
    })({
      1: [function(require, module, exports) {
        'use strict';
        var auth = require('./lib/auth');
        var helpers = require('./lib/helpers');
        var SwaggerClient = require('./lib/client');
        var deprecationWrapper = function(url, options) {
          helpers.log('This is deprecated, use "new SwaggerClient" instead.');
          return new SwaggerClient(url, options);
        };
        if (!Array.prototype.indexOf) {
          Array.prototype.indexOf = function(obj, start) {
            for (var i = (start || 0),
                j = this.length; i < j; i++) {
              if (this[i] === obj) {
                return i;
              }
            }
            return -1;
          };
        }
        if (!String.prototype.trim) {
          String.prototype.trim = function() {
            return this.replace(/^\s+|\s+$/g, '');
          };
        }
        if (!String.prototype.endsWith) {
          String.prototype.endsWith = function(suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
          };
        }
        module.exports = SwaggerClient;
        SwaggerClient.ApiKeyAuthorization = auth.ApiKeyAuthorization;
        SwaggerClient.PasswordAuthorization = auth.PasswordAuthorization;
        SwaggerClient.CookieAuthorization = auth.CookieAuthorization;
        SwaggerClient.SwaggerApi = deprecationWrapper;
        SwaggerClient.SwaggerClient = deprecationWrapper;
        SwaggerClient.SchemaMarkup = require('./lib/schema-markup');
      }, {
        "./lib/auth": 2,
        "./lib/client": 3,
        "./lib/helpers": 4,
        "./lib/schema-markup": 7
      }],
      2: [function(require, module, exports) {
        'use strict';
        var helpers = require('./helpers');
        var btoa = require('btoa');
        var CookieJar = require('cookiejar').CookieJar;
        var _ = {
          each: require('lodash-compat/collection/each'),
          includes: require('lodash-compat/collection/includes'),
          isObject: require('lodash-compat/lang/isObject'),
          isArray: require('lodash-compat/lang/isArray')
        };
        var SwaggerAuthorizations = module.exports.SwaggerAuthorizations = function(authz) {
          this.authz = authz || {};
        };
        SwaggerAuthorizations.prototype.add = function(name, auth) {
          if (_.isObject(name)) {
            for (var key in name) {
              this.authz[key] = name[key];
            }
          } else if (typeof name === 'string') {
            this.authz[name] = auth;
          }
          return auth;
        };
        SwaggerAuthorizations.prototype.remove = function(name) {
          return delete this.authz[name];
        };
        SwaggerAuthorizations.prototype.apply = function(obj, securities) {
          var status = true;
          var applyAll = !securities;
          var flattenedSecurities = [];
          _.each(securities, function(obj, key) {
            if (typeof key === 'string') {
              flattenedSecurities.push(key);
            }
            _.each(obj, function(val, key) {
              flattenedSecurities.push(key);
            });
          });
          _.each(this.authz, function(auth, authName) {
            if (applyAll || _.includes(flattenedSecurities, authName)) {
              var newStatus = auth.apply(obj);
              status = status && !!newStatus;
            }
          });
          return status;
        };
        var ApiKeyAuthorization = module.exports.ApiKeyAuthorization = function(name, value, type) {
          this.name = name;
          this.value = value;
          this.type = type;
        };
        ApiKeyAuthorization.prototype.apply = function(obj) {
          if (this.type === 'query') {
            var qp;
            if (obj.url.indexOf('?') > 0) {
              qp = obj.url.substring(obj.url.indexOf('?') + 1);
              var parts = qp.split('&');
              if (parts && parts.length > 0) {
                for (var i = 0; i < parts.length; i++) {
                  var kv = parts[i].split('=');
                  if (kv && kv.length > 0) {
                    if (kv[0] === this.name) {
                      return false;
                    }
                  }
                }
              }
            }
            if (obj.url.indexOf('?') > 0) {
              obj.url = obj.url + '&' + this.name + '=' + this.value;
            } else {
              obj.url = obj.url + '?' + this.name + '=' + this.value;
            }
            return true;
          } else if (this.type === 'header') {
            if (typeof obj.headers[this.name] === 'undefined') {
              obj.headers[this.name] = this.value;
            }
            return true;
          }
        };
        var CookieAuthorization = module.exports.CookieAuthorization = function(cookie) {
          this.cookie = cookie;
        };
        CookieAuthorization.prototype.apply = function(obj) {
          obj.cookieJar = obj.cookieJar || new CookieJar();
          obj.cookieJar.setCookie(this.cookie);
          return true;
        };
        var PasswordAuthorization = module.exports.PasswordAuthorization = function(username, password) {
          if (arguments.length === 3) {
            helpers.log('PasswordAuthorization: the \'name\' argument has been removed, pass only username and password');
            username = arguments[1];
            password = arguments[2];
          }
          this.username = username;
          this.password = password;
        };
        PasswordAuthorization.prototype.apply = function(obj) {
          if (typeof obj.headers.Authorization === 'undefined') {
            obj.headers.Authorization = 'Basic ' + btoa(this.username + ':' + this.password);
          }
          return true;
        };
      }, {
        "./helpers": 4,
        "btoa": 14,
        "cookiejar": 19,
        "lodash-compat/collection/each": 53,
        "lodash-compat/collection/includes": 56,
        "lodash-compat/lang/isArray": 141,
        "lodash-compat/lang/isObject": 145
      }],
      3: [function(require, module, exports) {
        'use strict';
        var _ = {
          bind: require('lodash-compat/function/bind'),
          cloneDeep: require('lodash-compat/lang/cloneDeep'),
          find: require('lodash-compat/collection/find'),
          forEach: require('lodash-compat/collection/forEach'),
          indexOf: require('lodash-compat/array/indexOf'),
          isArray: require('lodash-compat/lang/isArray'),
          isObject: require('lodash-compat/lang/isObject'),
          isFunction: require('lodash-compat/lang/isFunction'),
          isPlainObject: require('lodash-compat/lang/isPlainObject'),
          isUndefined: require('lodash-compat/lang/isUndefined')
        };
        var auth = require('./auth');
        var helpers = require('./helpers');
        var Model = require('./types/model');
        var Operation = require('./types/operation');
        var OperationGroup = require('./types/operationGroup');
        var Resolver = require('./resolver');
        var SwaggerHttp = require('./http');
        var SwaggerSpecConverter = require('./spec-converter');
        var Q = require('q');
        var reservedClientTags = ['apis', 'authorizationScheme', 'authorizations', 'basePath', 'build', 'buildFrom1_1Spec', 'buildFrom1_2Spec', 'buildFromSpec', 'clientAuthorizations', 'convertInfo', 'debug', 'defaultErrorCallback', 'defaultSuccessCallback', 'enableCookies', 'fail', 'failure', 'finish', 'help', 'idFromOp', 'info', 'initialize', 'isBuilt', 'isValid', 'modelPropertyMacro', 'models', 'modelsArray', 'options', 'parameterMacro', 'parseUri', 'progress', 'resourceCount', 'sampleModels', 'selfReflect', 'setConsolidatedModels', 'spec', 'supportedSubmitMethods', 'swaggerRequestHeaders', 'tagFromLabel', 'title', 'url', 'useJQuery'];
        var reservedApiTags = ['apis', 'asCurl', 'description', 'externalDocs', 'help', 'label', 'name', 'operation', 'operations', 'operationsArray', 'path', 'tag'];
        var supportedOperationMethods = ['delete', 'get', 'head', 'options', 'patch', 'post', 'put'];
        var SwaggerClient = module.exports = function(url, options) {
          this.authorizations = null;
          this.authorizationScheme = null;
          this.basePath = null;
          this.debug = false;
          this.enableCookies = false;
          this.info = null;
          this.isBuilt = false;
          this.isValid = false;
          this.modelsArray = [];
          this.resourceCount = 0;
          this.url = null;
          this.useJQuery = false;
          this.swaggerObject = {};
          this.deferredClient = Q.defer();
          this.clientAuthorizations = new auth.SwaggerAuthorizations();
          if (typeof url !== 'undefined') {
            return this.initialize(url, options);
          } else {
            return this;
          }
        };
        SwaggerClient.prototype.initialize = function(url, options) {
          this.models = {};
          this.sampleModels = {};
          if (typeof url === 'string') {
            this.url = url;
          } else if (_.isObject(url)) {
            options = url;
            this.url = options.url;
          }
          options = options || {};
          this.clientAuthorizations.add(options.authorizations);
          this.swaggerRequestHeaders = options.swaggerRequestHeaders || 'application/json;charset=utf-8,*/*';
          this.defaultSuccessCallback = options.defaultSuccessCallback || null;
          this.defaultErrorCallback = options.defaultErrorCallback || null;
          this.modelPropertyMacro = options.modelPropertyMacro || null;
          this.parameterMacro = options.parameterMacro || null;
          this.usePromise = options.usePromise || null;
          if (typeof options.success === 'function') {
            this.success = options.success;
          }
          if (options.useJQuery) {
            this.useJQuery = options.useJQuery;
          }
          if (options.enableCookies) {
            this.enableCookies = options.enableCookies;
          }
          this.options = options || {};
          this.supportedSubmitMethods = options.supportedSubmitMethods || [];
          this.failure = options.failure || function(err) {
            throw err;
          };
          this.progress = options.progress || function() {};
          this.spec = _.cloneDeep(options.spec);
          if (options.scheme) {
            this.scheme = options.scheme;
          }
          if (this.usePromise || typeof options.success === 'function') {
            this.ready = true;
            return this.build();
          }
        };
        SwaggerClient.prototype.build = function(mock) {
          if (this.isBuilt) {
            return this;
          }
          var self = this;
          this.progress('fetching resource list: ' + this.url + '; Please wait.');
          var obj = {
            useJQuery: this.useJQuery,
            url: this.url,
            method: 'get',
            headers: {accept: this.swaggerRequestHeaders},
            on: {
              error: function(response) {
                if (self.url.substring(0, 4) !== 'http') {
                  return self.fail('Please specify the protocol for ' + self.url);
                } else if (response.status === 0) {
                  return self.fail('Can\'t read from server.  It may not have the appropriate access-control-origin settings.');
                } else if (response.status === 404) {
                  return self.fail('Can\'t read swagger JSON from ' + self.url);
                } else {
                  return self.fail(response.status + ' : ' + response.statusText + ' ' + self.url);
                }
              },
              response: function(resp) {
                var responseObj = resp.obj;
                if (!responseObj) {
                  return self.fail('failed to parse JSON/YAML response');
                }
                self.swaggerVersion = responseObj.swaggerVersion;
                self.swaggerObject = responseObj;
                if (responseObj.swagger && parseInt(responseObj.swagger) === 2) {
                  self.swaggerVersion = responseObj.swagger;
                  new Resolver().resolve(responseObj, self.url, self.buildFromSpec, self);
                  self.isValid = true;
                } else {
                  var converter = new SwaggerSpecConverter();
                  self.oldSwaggerObject = self.swaggerObject;
                  converter.setDocumentationLocation(self.url);
                  converter.convert(responseObj, self.clientAuthorizations, self.options, function(spec) {
                    self.swaggerObject = spec;
                    new Resolver().resolve(spec, self.url, self.buildFromSpec, self);
                    self.isValid = true;
                  });
                }
              }
            }
          };
          if (this.spec) {
            self.swaggerObject = this.spec;
            setTimeout(function() {
              new Resolver().resolve(self.spec, self.url, self.buildFromSpec, self);
            }, 10);
          } else {
            this.clientAuthorizations.apply(obj);
            if (mock) {
              return obj;
            }
            new SwaggerHttp().execute(obj, this.options);
          }
          return (this.usePromise) ? this.deferredClient.promise : this;
        };
        SwaggerClient.prototype.buildFromSpec = function(response) {
          if (this.isBuilt) {
            return this;
          }
          this.apis = {};
          this.apisArray = [];
          this.basePath = response.basePath || '';
          this.consumes = response.consumes;
          this.host = response.host || '';
          this.info = response.info || {};
          this.produces = response.produces;
          this.schemes = response.schemes || [];
          this.securityDefinitions = response.securityDefinitions;
          this.title = response.title || '';
          if (response.externalDocs) {
            this.externalDocs = response.externalDocs;
          }
          this.authSchemes = response.securityDefinitions;
          var definedTags = {};
          var k;
          if (Array.isArray(response.tags)) {
            definedTags = {};
            for (k = 0; k < response.tags.length; k++) {
              var t = response.tags[k];
              definedTags[t.name] = t;
            }
          }
          var location;
          if (typeof this.url === 'string') {
            location = this.parseUri(this.url);
            if (typeof this.scheme === 'undefined' && typeof this.schemes === 'undefined' || this.schemes.length === 0) {
              this.scheme = location.scheme || 'http';
            } else if (typeof this.scheme === 'undefined') {
              this.scheme = this.schemes[0] || location.scheme;
            }
            if (typeof this.host === 'undefined' || this.host === '') {
              this.host = location.host;
              if (location.port) {
                this.host = this.host + ':' + location.port;
              }
            }
          } else {
            if (typeof this.schemes === 'undefined' || this.schemes.length === 0) {
              this.scheme = 'http';
            } else if (typeof this.scheme === 'undefined') {
              this.scheme = this.schemes[0];
            }
          }
          this.definitions = response.definitions;
          var key;
          for (key in this.definitions) {
            var model = new Model(key, this.definitions[key], this.models, this.modelPropertyMacro);
            if (model) {
              this.models[key] = model;
            }
          }
          var self = this;
          self.apis.help = _.bind(self.help, self);
          _.forEach(response.paths, function(pathObj, path) {
            if (!_.isPlainObject(pathObj)) {
              return;
            }
            _.forEach(supportedOperationMethods, function(method) {
              var operation = pathObj[method];
              if (_.isUndefined(operation)) {
                return;
              } else if (!_.isPlainObject(operation)) {
                helpers.log('The \'' + method + '\' operation for \'' + path + '\' path is not an Operation Object');
                return;
              }
              var tags = operation.tags;
              if (_.isUndefined(tags) || !_.isArray(tags) || tags.length === 0) {
                tags = operation.tags = ['default'];
              }
              var operationId = self.idFromOp(path, method, operation);
              var operationObject = new Operation(self, operation.scheme, operationId, method, path, operation, self.definitions, self.models, self.clientAuthorizations);
              _.forEach(tags, function(tag) {
                var clientProperty = _.indexOf(reservedClientTags, tag) > -1 ? '_' + tag : tag;
                var apiProperty = _.indexOf(reservedApiTags, tag) > -1 ? '_' + tag : tag;
                var operationGroup = self[clientProperty];
                if (clientProperty !== tag) {
                  helpers.log('The \'' + tag + '\' tag conflicts with a SwaggerClient function/property name.  Use \'client.' + clientProperty + '\' or \'client.apis.' + tag + '\' instead of \'client.' + tag + '\'.');
                }
                if (apiProperty !== tag) {
                  helpers.log('The \'' + tag + '\' tag conflicts with a SwaggerClient operation function/property name.  Use ' + '\'client.apis.' + apiProperty + '\' instead of \'client.apis.' + tag + '\'.');
                }
                if (_.indexOf(reservedApiTags, operationId) > -1) {
                  helpers.log('The \'' + operationId + '\' operationId conflicts with a SwaggerClient operation ' + 'function/property name.  Use \'client.apis.' + apiProperty + '._' + operationId + '\' instead of \'client.apis.' + apiProperty + '.' + operationId + '\'.');
                  operationId = '_' + operationId;
                  operationObject.nickname = operationId;
                }
                if (_.isUndefined(operationGroup)) {
                  operationGroup = self[clientProperty] = self.apis[apiProperty] = {};
                  operationGroup.operations = {};
                  operationGroup.label = apiProperty;
                  operationGroup.apis = {};
                  var tagDef = definedTags[tag];
                  if (!_.isUndefined(tagDef)) {
                    operationGroup.description = tagDef.description;
                    operationGroup.externalDocs = tagDef.externalDocs;
                  }
                  self[clientProperty].help = _.bind(self.help, operationGroup);
                  self.apisArray.push(new OperationGroup(tag, operationGroup.description, operationGroup.externalDocs, operationObject));
                }
                operationId = self.makeUniqueOperationId(operationId, self.apis[apiProperty]);
                if (!_.isFunction(operationGroup.help)) {
                  operationGroup.help = _.bind(self.help, operationGroup);
                }
                self.apis[apiProperty][operationId] = operationGroup[operationId] = _.bind(operationObject.execute, operationObject);
                self.apis[apiProperty][operationId].help = operationGroup[operationId].help = _.bind(operationObject.help, operationObject);
                self.apis[apiProperty][operationId].asCurl = operationGroup[operationId].asCurl = _.bind(operationObject.asCurl, operationObject);
                operationGroup.apis[operationId] = operationGroup.operations[operationId] = operationObject;
                var api = _.find(self.apisArray, function(api) {
                  return api.tag === tag;
                });
                if (api) {
                  api.operationsArray.push(operationObject);
                }
              });
            });
          });
          _.forEach(response.definitions, function(definitionObj, definition) {
            definitionObj['id'] = definition.toLowerCase();
            definitionObj['name'] = definition;
            self.modelsArray.push(definitionObj);
          });
          this.isBuilt = true;
          if (this.usePromise) {
            this.isValid = true;
            this.isBuilt = true;
            this.deferredClient.resolve(this);
            return this.deferredClient.promise;
          }
          if (this.success) {
            this.success();
          }
          return this;
        };
        SwaggerClient.prototype.makeUniqueOperationId = function(operationId, api) {
          var count = 0;
          var name = operationId;
          while (true) {
            var matched = false;
            _.forEach(api.operations, function(operation) {
              if (operation.nickname === name) {
                matched = true;
              }
            });
            if (!matched) {
              return name;
            }
            name = operationId + '_' + count;
            count++;
          }
          return operationId;
        };
        SwaggerClient.prototype.parseUri = function(uri) {
          var urlParseRE = /^(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/;
          var parts = urlParseRE.exec(uri);
          return {
            scheme: parts[4] ? parts[4].replace(':', '') : undefined,
            host: parts[11],
            port: parts[12],
            path: parts[15]
          };
        };
        SwaggerClient.prototype.help = function(dontPrint) {
          var output = '';
          if (this instanceof SwaggerClient) {
            _.forEach(this.apis, function(api, name) {
              if (_.isPlainObject(api)) {
                output += 'operations for the \'' + name + '\' tag\n';
                _.forEach(api.operations, function(operation, name) {
                  output += '  * ' + name + ': ' + operation.summary + '\n';
                });
              }
            });
          } else if (this instanceof OperationGroup || _.isPlainObject(this)) {
            output += 'operations for the \'' + this.label + '\' tag\n';
            _.forEach(this.apis, function(operation, name) {
              output += '  * ' + name + ': ' + operation.summary + '\n';
            });
          }
          if (dontPrint) {
            return output;
          } else {
            helpers.log(output);
            return output;
          }
        };
        SwaggerClient.prototype.tagFromLabel = function(label) {
          return label;
        };
        SwaggerClient.prototype.idFromOp = function(path, httpMethod, op) {
          if (!op || !op.operationId) {
            op = op || {};
            op.operationId = httpMethod + '_' + path;
          }
          var opId = op.operationId.replace(/[\s!@#$%^&*()_+=\[{\]};:<>|.\/?,\\'""-]/g, '_') || (path.substring(1) + '_' + httpMethod);
          opId = opId.replace(/((_){2,})/g, '_');
          opId = opId.replace(/^(_)*/g, '');
          opId = opId.replace(/([_])*$/g, '');
          return opId;
        };
        SwaggerClient.prototype.setHost = function(host) {
          this.host = host;
          if (this.apis) {
            _.forEach(this.apis, function(api) {
              if (api.operations) {
                _.forEach(api.operations, function(operation) {
                  operation.host = host;
                });
              }
            });
          }
        };
        SwaggerClient.prototype.setBasePath = function(basePath) {
          this.basePath = basePath;
          if (this.apis) {
            _.forEach(this.apis, function(api) {
              if (api.operations) {
                _.forEach(api.operations, function(operation) {
                  operation.basePath = basePath;
                });
              }
            });
          }
        };
        SwaggerClient.prototype.fail = function(message) {
          if (this.usePromise) {
            this.deferredClient.reject(message);
            return this.deferredClient.promise;
          } else {
            if (this.failure) {
              this.failure(message);
            } else {
              this.failure(message);
            }
          }
        };
      }, {
        "./auth": 2,
        "./helpers": 4,
        "./http": 5,
        "./resolver": 6,
        "./spec-converter": 8,
        "./types/model": 9,
        "./types/operation": 10,
        "./types/operationGroup": 11,
        "lodash-compat/array/indexOf": 50,
        "lodash-compat/collection/find": 54,
        "lodash-compat/collection/forEach": 55,
        "lodash-compat/function/bind": 59,
        "lodash-compat/lang/cloneDeep": 139,
        "lodash-compat/lang/isArray": 141,
        "lodash-compat/lang/isFunction": 143,
        "lodash-compat/lang/isObject": 145,
        "lodash-compat/lang/isPlainObject": 146,
        "lodash-compat/lang/isUndefined": 149,
        "q": 158
      }],
      4: [function(require, module, exports) {
        (function(process) {
          'use strict';
          var _ = {
            isPlainObject: require('lodash-compat/lang/isPlainObject'),
            indexOf: require('lodash-compat/array/indexOf')
          };
          module.exports.__bind = function(fn, me) {
            return function() {
              return fn.apply(me, arguments);
            };
          };
          var log = module.exports.log = function() {
            if (console && process.env.NODE_ENV !== 'test') {
              console.log(Array.prototype.slice.call(arguments)[0]);
            }
          };
          module.exports.fail = function(message) {
            log(message);
          };
          var optionHtml = module.exports.optionHtml = function(label, value) {
            return '<tr><td class="optionName">' + label + ':</td><td>' + value + '</td></tr>';
          };
          var resolveSchema = module.exports.resolveSchema = function(schema) {
            if (_.isPlainObject(schema.schema)) {
              schema = resolveSchema(schema.schema);
            }
            return schema;
          };
          var simpleRef = module.exports.simpleRef = function(name) {
            if (typeof name === 'undefined') {
              return null;
            }
            if (name.indexOf('#/definitions/') === 0) {
              return name.substring('#/definitions/'.length);
            } else {
              return name;
            }
          };
        }).call(this, require('_process'));
      }, {
        "_process": 13,
        "lodash-compat/array/indexOf": 50,
        "lodash-compat/lang/isPlainObject": 146
      }],
      5: [function(require, module, exports) {
        'use strict';
        var helpers = require('./helpers');
        var request = require('superagent');
        var jsyaml = require('js-yaml');
        var _ = {isObject: require('lodash-compat/lang/isObject')};
        var JQueryHttpClient = function() {
          this.type = 'JQueryHttpClient';
        };
        var SuperagentHttpClient = function() {
          this.type = 'SuperagentHttpClient';
        };
        var SwaggerHttp = module.exports = function() {};
        SwaggerHttp.prototype.execute = function(obj, opts) {
          var client;
          if (opts && opts.client) {
            client = opts.client;
          } else {
            client = new SuperagentHttpClient(opts);
          }
          client.opts = opts || {};
          var hasJQuery = false;
          if (typeof window !== 'undefined') {
            if (typeof window.jQuery !== 'undefined') {
              hasJQuery = true;
            }
          }
          if (obj.method.toLowerCase() === 'options' && client.type === 'SuperagentHttpClient') {
            log('forcing jQuery as OPTIONS are not supported by SuperAgent');
            obj.useJQuery = true;
          }
          if (this.isInternetExplorer() && (obj.useJQuery === false || !hasJQuery)) {
            throw new Error('Unsupported configuration! JQuery is required but not available');
          }
          if ((obj && obj.useJQuery === true) || this.isInternetExplorer() && hasJQuery) {
            client = new JQueryHttpClient(opts);
          }
          var success = obj.on.response;
          var requestInterceptor = function(data) {
            if (opts && opts.requestInterceptor) {
              data = opts.requestInterceptor.apply(data);
            }
            return data;
          };
          var responseInterceptor = function(data) {
            if (opts && opts.responseInterceptor) {
              data = opts.responseInterceptor.apply(data);
            }
            return success(data);
          };
          obj.on.response = function(data) {
            responseInterceptor(data);
          };
          if (_.isObject(obj) && _.isObject(obj.body)) {
            if (obj.body.type && obj.body.type === 'formData') {
              obj.contentType = false;
              obj.processData = false;
              delete obj.headers['Content-Type'];
            } else {
              obj.body = JSON.stringify(obj.body);
            }
          }
          obj = requestInterceptor(obj) || obj;
          if (obj.beforeSend) {
            obj.beforeSend(function(_obj) {
              client.execute(_obj || obj);
            });
          } else {
            client.execute(obj);
          }
          return (obj.deferred) ? obj.deferred.promise : obj;
        };
        SwaggerHttp.prototype.isInternetExplorer = function() {
          var detectedIE = false;
          if (typeof navigator !== 'undefined' && navigator.userAgent) {
            var nav = navigator.userAgent.toLowerCase();
            if (nav.indexOf('msie') !== -1) {
              var version = parseInt(nav.split('msie')[1]);
              if (version <= 8) {
                detectedIE = true;
              }
            }
          }
          return detectedIE;
        };
        JQueryHttpClient.prototype.execute = function(obj) {
          var jq = this.jQuery || (typeof window !== 'undefined' && window.jQuery);
          var cb = obj.on;
          var request = obj;
          if (typeof jq === 'undefined' || jq === false) {
            throw new Error('Unsupported configuration! JQuery is required but not available');
          }
          obj.type = obj.method;
          obj.cache = false;
          delete obj.useJQuery;
          obj.data = obj.body;
          delete obj.body;
          obj.complete = function(response) {
            var headers = {};
            var headerArray = response.getAllResponseHeaders().split('\n');
            for (var i = 0; i < headerArray.length; i++) {
              var toSplit = headerArray[i].trim();
              if (toSplit.length === 0) {
                continue;
              }
              var separator = toSplit.indexOf(':');
              if (separator === -1) {
                headers[toSplit] = null;
                continue;
              }
              var name = toSplit.substring(0, separator).trim();
              var value = toSplit.substring(separator + 1).trim();
              headers[name] = value;
            }
            var out = {
              url: request.url,
              method: request.method,
              status: response.status,
              statusText: response.statusText,
              data: response.responseText,
              headers: headers
            };
            try {
              var possibleObj = response.responseJSON || jsyaml.safeLoad(response.responseText);
              out.obj = (typeof possibleObj === 'string') ? {} : possibleObj;
            } catch (ex) {
              helpers.log('unable to parse JSON/YAML content');
            }
            out.obj = out.obj || null;
            if (response.status >= 200 && response.status < 300) {
              cb.response(out);
            } else if (response.status === 0 || (response.status >= 400 && response.status < 599)) {
              cb.error(out);
            } else {
              return cb.response(out);
            }
          };
          jq.support.cors = true;
          return jq.ajax(obj);
        };
        SuperagentHttpClient.prototype.execute = function(obj) {
          var method = obj.method.toLowerCase();
          if (method === 'delete') {
            method = 'del';
          }
          var headers = obj.headers || {};
          var r = request[method](obj.url);
          var name;
          for (name in headers) {
            r.set(name, headers[name]);
          }
          if (obj.enableCookies) {
            r.withCredentials();
          }
          if (obj.body) {
            r.send(obj.body);
          }
          if (typeof r.buffer === 'function') {
            r.buffer();
          }
          r.end(function(err, res) {
            res = res || {
              status: 0,
              headers: {error: 'no response from server'}
            };
            var response = {
              url: obj.url,
              method: obj.method,
              headers: res.headers
            };
            var cb;
            if (!err && res.error) {
              err = res.error;
            }
            if (err && obj.on && obj.on.error) {
              response.errObj = err;
              response.status = res ? res.status : 500;
              response.statusText = res ? res.text : err.message;
              if (res.headers && res.headers['content-type']) {
                if (res.headers['content-type'].indexOf('application/json') >= 0) {
                  try {
                    response.obj = JSON.parse(response.statusText);
                  } catch (e) {
                    response.obj = null;
                  }
                }
              }
              cb = obj.on.error;
            } else if (res && obj.on && obj.on.response) {
              var possibleObj;
              if (res.body && Object.keys(res.body).length > 0) {
                possibleObj = res.body;
              } else {
                try {
                  possibleObj = jsyaml.safeLoad(res.text);
                  possibleObj = (typeof possibleObj === 'string') ? null : possibleObj;
                } catch (e) {
                  helpers.log('cannot parse JSON/YAML content');
                }
              }
              response.obj = (typeof possibleObj === 'object') ? possibleObj : null;
              response.status = res.status;
              response.statusText = res.text;
              cb = obj.on.response;
            }
            response.data = response.statusText;
            if (cb) {
              cb(response);
            }
          });
        };
      }, {
        "./helpers": 4,
        "js-yaml": 20,
        "lodash-compat/lang/isObject": 145,
        "superagent": 159
      }],
      6: [function(require, module, exports) {
        'use strict';
        var SwaggerHttp = require('./http');
        var _ = {
          isObject: require('lodash-compat/lang/isObject'),
          cloneDeep: require('lodash-compat/lang/cloneDeep'),
          isArray: require('lodash-compat/lang/isArray')
        };
        var Resolver = module.exports = function() {
          this.failedUrls = [];
        };
        Resolver.prototype.processAllOf = function(root, name, definition, resolutionTable, unresolvedRefs, spec) {
          var i,
              location,
              property;
          definition['x-resolved-from'] = ['#/definitions/' + name];
          var allOf = definition.allOf;
          allOf.sort(function(a, b) {
            if (a.$ref && b.$ref) {
              return 0;
            } else if (a.$ref) {
              return -1;
            } else {
              return 1;
            }
          });
          for (i = 0; i < allOf.length; i++) {
            property = allOf[i];
            location = '/definitions/' + name + '/allOf';
            this.resolveInline(root, spec, property, resolutionTable, unresolvedRefs, location);
          }
        };
        Resolver.prototype.resolve = function(spec, arg1, arg2, arg3) {
          this.spec = spec;
          var root = arg1,
              callback = arg2,
              scope = arg3,
              opts = {},
              location,
              i;
          if (typeof arg1 === 'function') {
            root = null;
            callback = arg1;
            scope = arg2;
          }
          var _root = root;
          this.scope = (scope || this);
          this.iteration = this.iteration || 0;
          if (this.scope.options && this.scope.options.requestInterceptor) {
            opts.requestInterceptor = this.scope.options.requestInterceptor;
          }
          if (this.scope.options && this.scope.options.responseInterceptor) {
            opts.responseInterceptor = this.scope.options.responseInterceptor;
          }
          var name,
              path,
              property,
              propertyName;
          var processedCalls = 0,
              resolvedRefs = {},
              unresolvedRefs = {};
          var resolutionTable = [];
          spec.definitions = spec.definitions || {};
          for (name in spec.definitions) {
            var definition = spec.definitions[name];
            for (propertyName in definition.properties) {
              property = definition.properties[propertyName];
              if (_.isArray(property.allOf)) {
                this.processAllOf(root, name, property, resolutionTable, unresolvedRefs, spec);
              } else {
                this.resolveTo(root, property, resolutionTable, '/definitions');
              }
            }
            if (definition.allOf) {
              this.processAllOf(root, name, definition, resolutionTable, unresolvedRefs, spec);
            }
          }
          for (name in spec.paths) {
            var method,
                operation,
                responseCode;
            path = spec.paths[name];
            for (method in path) {
              if (method === '$ref') {
                location = '/paths' + name;
                this.resolveInline(root, spec, path, resolutionTable, unresolvedRefs, location);
              } else {
                operation = path[method];
                var sharedParameters = path.parameters || [];
                var parameters = operation.parameters || [];
                for (i in sharedParameters) {
                  var parameter = sharedParameters[i];
                  parameters.unshift(parameter);
                }
                if (method !== 'parameters' && _.isObject(operation)) {
                  operation.parameters = operation.parameters || parameters;
                }
                for (i in parameters) {
                  var parameter = parameters[i];
                  location = '/paths' + name + '/' + method + '/parameters';
                  if (parameter.in === 'body' && parameter.schema) {
                    if (_.isArray(parameter.schema.allOf)) {
                      var modelName = 'inline_model';
                      var name = modelName;
                      var done = false;
                      var counter = 0;
                      while (!done) {
                        if (typeof spec.definitions[name] === 'undefined') {
                          done = true;
                          break;
                        }
                        name = modelName + '_' + counter;
                        counter++;
                      }
                      spec.definitions[name] = {allOf: parameter.schema.allOf};
                      delete parameter.schema.allOf;
                      parameter.schema.$ref = '#/definitions/' + name;
                      this.processAllOf(root, name, spec.definitions[name], resolutionTable, unresolvedRefs, spec);
                    } else {
                      this.resolveTo(root, parameter.schema, resolutionTable, location);
                    }
                  }
                  if (parameter.$ref) {
                    this.resolveInline(root, spec, parameter, resolutionTable, unresolvedRefs, parameter.$ref);
                  }
                }
                for (responseCode in operation.responses) {
                  var response = operation.responses[responseCode];
                  location = '/paths' + name + '/' + method + '/responses/' + responseCode;
                  if (_.isObject(response)) {
                    if (response.$ref) {
                      this.resolveInline(root, spec, response, resolutionTable, unresolvedRefs, location);
                    }
                    if (response.schema) {
                      var responseObj = response;
                      if (_.isArray(responseObj.schema.allOf)) {
                        var modelName = 'inline_model';
                        var name = modelName;
                        var done = false;
                        var counter = 0;
                        while (!done) {
                          if (typeof spec.definitions[name] === 'undefined') {
                            done = true;
                            break;
                          }
                          name = modelName + '_' + counter;
                          counter++;
                        }
                        spec.definitions[name] = {allOf: responseObj.schema.allOf};
                        delete responseObj.schema.allOf;
                        delete responseObj.schema.type;
                        responseObj.schema.$ref = '#/definitions/' + name;
                        this.processAllOf(root, name, spec.definitions[name], resolutionTable, unresolvedRefs, spec);
                      } else {
                        this.resolveTo(root, response.schema, resolutionTable, location);
                      }
                    }
                  }
                }
              }
            }
            path.parameters = [];
          }
          var expectedCalls = 0,
              toResolve = [];
          var all = resolutionTable;
          var parts;
          for (i = 0; i < all.length; i++) {
            var a = all[i];
            if (root === a.root) {
              if (a.resolveAs === 'ref') {
                var joined = ((a.root || '') + '/' + a.key).split('/');
                var normalized = [];
                var url = '';
                var k;
                if (a.key.indexOf('../') >= 0) {
                  for (var j = 0; j < joined.length; j++) {
                    if (joined[j] === '..') {
                      normalized = normalized.slice(0, normalized.length - 1);
                    } else {
                      normalized.push(joined[j]);
                    }
                  }
                  for (k = 0; k < normalized.length; k++) {
                    if (k > 0) {
                      url += '/';
                    }
                    url += normalized[k];
                  }
                  a.root = url;
                  toResolve.push(a);
                } else {
                  parts = a.key.split('#');
                  if (parts.length === 2) {
                    if (parts[0].indexOf('http://') === 0 || parts[0].indexOf('https://') === 0) {
                      a.root = parts[0];
                    }
                    location = parts[1].split('/');
                    var r;
                    var s = spec;
                    for (k = 0; k < location.length; k++) {
                      var part = location[k];
                      if (part !== '') {
                        s = s[part];
                        if (typeof s !== 'undefined') {
                          r = s;
                        } else {
                          r = null;
                          break;
                        }
                      }
                    }
                    if (r === null) {
                      toResolve.push(a);
                    }
                  }
                }
              } else {
                if (a.resolveAs === 'inline') {
                  if (a.key && a.key.indexOf('#') === -1 && a.key.charAt(0) !== '/') {
                    parts = a.root.split('/');
                    location = '';
                    for (i = 0; i < parts.length - 1; i++) {
                      location += parts[i] + '/';
                    }
                    location += a.key;
                    a.root = location;
                    a.location = '';
                  }
                  toResolve.push(a);
                }
              }
            } else {
              toResolve.push(a);
            }
          }
          expectedCalls = toResolve.length;
          for (var ii = 0; ii < toResolve.length; ii++) {
            (function(item, spec, self) {
              if (!item.root || item.root === root) {
                self.resolveItem(spec, _root, resolutionTable, resolvedRefs, unresolvedRefs, item);
                processedCalls += 1;
                if (processedCalls === expectedCalls) {
                  self.finish(spec, root, resolutionTable, resolvedRefs, unresolvedRefs, callback, true);
                }
              } else if (self.failedUrls.indexOf(item.root) === -1) {
                var obj = {
                  useJQuery: false,
                  url: item.root,
                  method: 'get',
                  headers: {accept: self.scope.swaggerRequestHeaders || 'application/json'},
                  on: {
                    error: function(error) {
                      processedCalls += 1;
                      console.log('failed url: ' + obj.url);
                      self.failedUrls.push(obj.url);
                      unresolvedRefs[item.key] = {
                        root: item.root,
                        location: item.location
                      };
                      if (processedCalls === expectedCalls) {
                        self.finish(spec, _root, resolutionTable, resolvedRefs, unresolvedRefs, callback);
                      }
                    },
                    response: function(response) {
                      var swagger = response.obj;
                      self.resolveItem(swagger, item.root, resolutionTable, resolvedRefs, unresolvedRefs, item);
                      processedCalls += 1;
                      if (processedCalls === expectedCalls) {
                        self.finish(spec, _root, resolutionTable, resolvedRefs, unresolvedRefs, callback);
                      }
                    }
                  }
                };
                if (scope && scope.clientAuthorizations) {
                  scope.clientAuthorizations.apply(obj);
                }
                new SwaggerHttp().execute(obj, opts);
              } else {
                processedCalls += 1;
                unresolvedRefs[item.key] = {
                  root: item.root,
                  location: item.location
                };
                if (processedCalls === expectedCalls) {
                  self.finish(spec, _root, resolutionTable, resolvedRefs, unresolvedRefs, callback);
                }
              }
            }(toResolve[ii], spec, this));
          }
          if (Object.keys(toResolve).length === 0) {
            this.finish(spec, _root, resolutionTable, resolvedRefs, unresolvedRefs, callback);
          }
        };
        Resolver.prototype.resolveItem = function(spec, root, resolutionTable, resolvedRefs, unresolvedRefs, item) {
          var path = item.location;
          var location = spec,
              parts = path.split('/');
          if (path !== '') {
            for (var j = 0; j < parts.length; j++) {
              var segment = parts[j];
              if (segment.indexOf('~1') !== -1) {
                segment = parts[j].replace(/~0/g, '~').replace(/~1/g, '/');
                if (segment.charAt(0) !== '/') {
                  segment = '/' + segment;
                }
              }
              if (typeof location === 'undefined' || location === null) {
                break;
              }
              if (segment === '' && j === (parts.length - 1) && parts.length > 1) {
                location = null;
                break;
              }
              if (segment.length > 0) {
                location = location[segment];
              }
            }
          }
          var resolved = item.key;
          parts = item.key.split('/');
          var resolvedName = parts[parts.length - 1];
          if (resolvedName.indexOf('#') >= 0) {
            resolvedName = resolvedName.split('#')[1];
          }
          if (location !== null && typeof location !== 'undefined') {
            resolvedRefs[resolved] = {
              name: resolvedName,
              obj: location,
              key: item.key,
              root: item.root
            };
          } else {
            unresolvedRefs[resolved] = {
              root: item.root,
              location: item.location
            };
          }
        };
        Resolver.prototype.finish = function(spec, root, resolutionTable, resolvedRefs, unresolvedRefs, callback, localResolve) {
          var ref;
          for (ref in resolutionTable) {
            var item = resolutionTable[ref];
            var key = item.key;
            var resolvedTo = resolvedRefs[key];
            if (resolvedTo) {
              spec.definitions = spec.definitions || {};
              if (item.resolveAs === 'ref') {
                if (localResolve !== true) {
                  for (key in resolvedTo.obj) {
                    var abs = this.retainRoot(resolvedTo.obj[key], item.root);
                  }
                }
                spec.definitions[resolvedTo.name] = resolvedTo.obj;
                item.obj.$ref = '#/definitions/' + resolvedTo.name;
              } else if (item.resolveAs === 'inline') {
                var targetObj = item.obj;
                targetObj['x-resolved-from'] = [item.key];
                delete targetObj.$ref;
                for (key in resolvedTo.obj) {
                  var abs = resolvedTo.obj[key];
                  if (localResolve !== true) {
                    abs = this.retainRoot(resolvedTo.obj[key], item.root);
                  }
                  targetObj[key] = abs;
                }
              }
            }
          }
          var existingUnresolved = this.countUnresolvedRefs(spec);
          if (existingUnresolved === 0 || this.iteration > 5) {
            this.resolveAllOf(spec.definitions);
            callback.call(this.scope, spec, unresolvedRefs);
          } else {
            this.iteration += 1;
            this.resolve(spec, root, callback, this.scope);
          }
        };
        Resolver.prototype.countUnresolvedRefs = function(spec) {
          var i;
          var refs = this.getRefs(spec);
          var keys = [];
          var unresolvedKeys = [];
          for (i in refs) {
            if (i.indexOf('#') === 0) {
              keys.push(i.substring(1));
            } else {
              unresolvedKeys.push(i);
            }
          }
          for (i = 0; i < keys.length; i++) {
            var part = keys[i];
            var parts = part.split('/');
            var obj = spec;
            for (var k = 0; k < parts.length; k++) {
              var key = parts[k];
              if (key !== '') {
                obj = obj[key];
                if (typeof obj === 'undefined') {
                  unresolvedKeys.push(part);
                  break;
                }
              }
            }
          }
          return unresolvedKeys.length;
        };
        Resolver.prototype.getRefs = function(spec, obj) {
          obj = obj || spec;
          var output = {};
          for (var key in obj) {
            if (!obj.hasOwnProperty(key)) {
              continue;
            }
            var item = obj[key];
            if (key === '$ref' && typeof item === 'string') {
              output[item] = null;
            } else if (_.isObject(item)) {
              var o = this.getRefs(item);
              for (var k in o) {
                output[k] = null;
              }
            }
          }
          return output;
        };
        Resolver.prototype.retainRoot = function(obj, root) {
          for (var key in obj) {
            var item = obj[key];
            if (key === '$ref' && typeof item === 'string') {
              if (item.indexOf('http://') !== 0 && item.indexOf('https://') !== 0) {
                var appendHash = true;
                var oldRoot = root;
                if (root) {
                  var lastChar = root.slice(-1);
                  if (lastChar !== '/' && (item.indexOf('#') !== 0 && item.indexOf('http://') !== 0 && item.indexOf('https://'))) {
                    console.log('working with ' + item);
                    appendHash = false;
                    var parts = root.split('\/');
                    parts = parts.splice(0, parts.length - 1);
                    root = '';
                    for (var i = 0; i < parts.length; i++) {
                      root += parts[i] + '/';
                    }
                  }
                }
                if (item.indexOf('#') !== 0 && appendHash) {
                  item = '#' + item;
                }
                item = (root || '') + item;
                obj[key] = item;
              }
            } else if (_.isObject(item)) {
              this.retainRoot(item, root);
            }
          }
          return obj;
        };
        Resolver.prototype.resolveInline = function(root, spec, property, resolutionTable, unresolvedRefs, location) {
          var key = property.$ref,
              ref = property.$ref,
              i,
              p,
              p2,
              rs;
          var rootTrimmed = false;
          root = root || '';
          if (ref) {
            if (ref.indexOf('../') === 0) {
              p = ref.split('../');
              p2 = root.split('/');
              ref = '';
              for (i = 0; i < p.length; i++) {
                if (p[i] === '') {
                  p2 = p2.slice(0, p2.length - 1);
                } else {
                  ref += p[i];
                }
              }
              root = '';
              for (i = 0; i < p2.length - 1; i++) {
                if (i > 0) {
                  root += '/';
                }
                root += p2[i];
              }
              rootTrimmed = true;
            }
            if (ref.indexOf('#') >= 0) {
              if (ref.indexOf('/') === 0) {
                rs = ref.split('#');
                p = root.split('//');
                p2 = p[1].split('/');
                root = p[0] + '//' + p2[0] + rs[0];
                location = rs[1];
              } else {
                rs = ref.split('#');
                if (rs[0] !== '') {
                  p2 = root.split('/');
                  p2 = p2.slice(0, p2.length - 1);
                  if (!rootTrimmed) {
                    root = '';
                    for (var k = 0; k < p2.length; k++) {
                      if (k > 0) {
                        root += '/';
                      }
                      root += p2[k];
                    }
                  }
                  root += '/' + ref.split('#')[0];
                }
                location = rs[1];
              }
            }
            if (ref.indexOf('http') === 0) {
              if (ref.indexOf('#') >= 0) {
                root = ref.split('#')[0];
                location = ref.split('#')[1];
              } else {
                root = ref;
                location = '';
              }
              resolutionTable.push({
                obj: property,
                resolveAs: 'inline',
                root: root,
                key: key,
                location: location
              });
            } else if (ref.indexOf('#') === 0) {
              location = ref.split('#')[1];
              resolutionTable.push({
                obj: property,
                resolveAs: 'inline',
                root: root,
                key: key,
                location: location
              });
            } else {
              resolutionTable.push({
                obj: property,
                resolveAs: 'inline',
                root: root,
                key: key,
                location: location
              });
            }
          } else if (property.type === 'array') {
            this.resolveTo(root, property.items, resolutionTable, location);
          }
        };
        Resolver.prototype.resolveTo = function(root, property, resolutionTable, location) {
          var sp,
              i;
          var ref = property.$ref;
          var lroot = root;
          if ((typeof ref !== 'undefined') && (ref !== null)) {
            if (ref.indexOf('#') >= 0) {
              var parts = ref.split('#');
              if (parts[0] && ref.indexOf('/') === 0) {} else if (parts[0] && parts[0].indexOf('http') === 0) {
                lroot = parts[0];
                ref = parts[1];
              } else if (parts[0] && parts[0].length > 0) {
                sp = root.split('/');
                lroot = '';
                for (i = 0; i < sp.length - 1; i++) {
                  lroot += sp[i] + '/';
                }
                lroot += parts[0];
              } else {}
              location = parts[1];
            } else if (ref.indexOf('http://') === 0 || ref.indexOf('https://') === 0) {
              lroot = ref;
              location = '';
            } else {
              sp = root.split('/');
              lroot = '';
              for (i = 0; i < sp.length - 1; i++) {
                lroot += sp[i] + '/';
              }
              lroot += ref;
              location = '';
            }
            resolutionTable.push({
              obj: property,
              resolveAs: 'ref',
              root: lroot,
              key: ref,
              location: location
            });
          } else if (property.type === 'array') {
            var items = property.items;
            this.resolveTo(root, items, resolutionTable, location);
          } else {
            if (property && property.properties) {
              var name = this.uniqueName('inline_model');
              if (property.title) {
                name = this.uniqueName(property.title);
              }
              delete property.title;
              this.spec.definitions[name] = _.cloneDeep(property);
              property['$ref'] = '#/definitions/' + name;
              delete property.type;
              delete property.properties;
            }
          }
        };
        Resolver.prototype.uniqueName = function(base) {
          var name = base;
          var count = 0;
          while (true) {
            if (!_.isObject(this.spec.definitions[name])) {
              return name;
            }
            name = base + '_' + count;
            count++;
          }
        };
        Resolver.prototype.resolveAllOf = function(spec, obj, depth) {
          depth = depth || 0;
          obj = obj || spec;
          var name;
          for (var key in obj) {
            if (!obj.hasOwnProperty(key)) {
              continue;
            }
            var item = obj[key];
            if (item === null) {
              throw new TypeError('Swagger 2.0 does not support null types (' + obj + ').  See https://github.com/swagger-api/swagger-spec/issues/229.');
            }
            if (typeof item === 'object') {
              this.resolveAllOf(spec, item, depth + 1);
            }
            if (item && typeof item.allOf !== 'undefined') {
              var allOf = item.allOf;
              if (_.isArray(allOf)) {
                var output = _.cloneDeep(item);
                delete output.allOf;
                output['x-composed'] = true;
                if (typeof item['x-resolved-from'] !== 'undefined') {
                  output['x-resolved-from'] = item['x-resolved-from'];
                }
                for (var i = 0; i < allOf.length; i++) {
                  var component = allOf[i];
                  var source = 'self';
                  if (typeof component['x-resolved-from'] !== 'undefined') {
                    source = component['x-resolved-from'][0];
                  }
                  for (var part in component) {
                    if (!output.hasOwnProperty(part)) {
                      output[part] = _.cloneDeep(component[part]);
                      if (part === 'properties') {
                        for (name in output[part]) {
                          output[part][name]['x-resolved-from'] = source;
                        }
                      }
                    } else {
                      if (part === 'properties') {
                        var properties = component[part];
                        for (name in properties) {
                          output.properties[name] = _.cloneDeep(properties[name]);
                          var resolvedFrom = properties[name]['x-resolved-from'];
                          if (typeof resolvedFrom === 'undefined' || resolvedFrom === 'self') {
                            resolvedFrom = source;
                          }
                          output.properties[name]['x-resolved-from'] = resolvedFrom;
                        }
                      } else if (part === 'required') {
                        var a = output.required.concat(component[part]);
                        for (var k = 0; k < a.length; ++k) {
                          for (var j = k + 1; j < a.length; ++j) {
                            if (a[k] === a[j]) {
                              a.splice(j--, 1);
                            }
                          }
                        }
                        output.required = a;
                      } else if (part === 'x-resolved-from') {
                        output['x-resolved-from'].push(source);
                      } else {}
                    }
                  }
                }
                obj[key] = output;
              }
            }
          }
        };
      }, {
        "./http": 5,
        "lodash-compat/lang/cloneDeep": 139,
        "lodash-compat/lang/isArray": 141,
        "lodash-compat/lang/isObject": 145
      }],
      7: [function(require, module, exports) {
        'use strict';
        var Helpers = require('./helpers');
        var _ = {
          isPlainObject: require('lodash-compat/lang/isPlainObject'),
          isUndefined: require('lodash-compat/lang/isUndefined'),
          isArray: require('lodash-compat/lang/isArray'),
          isObject: require('lodash-compat/lang/isObject'),
          isEmpty: require('lodash-compat/lang/isEmpty'),
          map: require('lodash-compat/collection/map'),
          indexOf: require('lodash-compat/array/indexOf'),
          cloneDeep: require('lodash-compat/lang/cloneDeep'),
          keys: require('lodash-compat/object/keys'),
          forEach: require('lodash-compat/collection/forEach')
        };
        module.exports.optionHtml = optionHtml;
        module.exports.typeFromJsonSchema = typeFromJsonSchema;
        module.exports.getStringSignature = getStringSignature;
        module.exports.schemaToHTML = schemaToHTML;
        module.exports.schemaToJSON = schemaToJSON;
        function optionHtml(label, value) {
          return '<tr><td class="optionName">' + label + ':</td><td>' + value + '</td></tr>';
        }
        function typeFromJsonSchema(type, format) {
          var str;
          if (type === 'integer' && format === 'int32') {
            str = 'integer';
          } else if (type === 'integer' && format === 'int64') {
            str = 'long';
          } else if (type === 'integer' && typeof format === 'undefined') {
            str = 'long';
          } else if (type === 'string' && format === 'date-time') {
            str = 'date-time';
          } else if (type === 'string' && format === 'date') {
            str = 'date';
          } else if (type === 'number' && format === 'float') {
            str = 'float';
          } else if (type === 'number' && format === 'double') {
            str = 'double';
          } else if (type === 'number' && typeof format === 'undefined') {
            str = 'double';
          } else if (type === 'boolean') {
            str = 'boolean';
          } else if (type === 'string') {
            str = 'string';
          }
          return str;
        }
        function getStringSignature(obj, baseComponent) {
          var str = '';
          if (typeof obj.$ref !== 'undefined') {
            str += Helpers.simpleRef(obj.$ref);
          } else if (typeof obj.type === 'undefined') {
            str += 'object';
          } else if (obj.type === 'array') {
            if (baseComponent) {
              str += getStringSignature((obj.items || obj.$ref || {}));
            } else {
              str += 'Array[';
              str += getStringSignature((obj.items || obj.$ref || {}));
              str += ']';
            }
          } else if (obj.type === 'integer' && obj.format === 'int32') {
            str += 'integer';
          } else if (obj.type === 'integer' && obj.format === 'int64') {
            str += 'long';
          } else if (obj.type === 'integer' && typeof obj.format === 'undefined') {
            str += 'long';
          } else if (obj.type === 'string' && obj.format === 'date-time') {
            str += 'date-time';
          } else if (obj.type === 'string' && obj.format === 'date') {
            str += 'date';
          } else if (obj.type === 'string' && typeof obj.format === 'undefined') {
            str += 'string';
          } else if (obj.type === 'number' && obj.format === 'float') {
            str += 'float';
          } else if (obj.type === 'number' && obj.format === 'double') {
            str += 'double';
          } else if (obj.type === 'number' && typeof obj.format === 'undefined') {
            str += 'double';
          } else if (obj.type === 'boolean') {
            str += 'boolean';
          } else if (obj.$ref) {
            str += Helpers.simpleRef(obj.$ref);
          } else {
            str += obj.type;
          }
          return str;
        }
        function schemaToJSON(schema, models, modelsToIgnore, modelPropertyMacro) {
          schema = Helpers.resolveSchema(schema);
          if (typeof modelPropertyMacro !== 'function') {
            modelPropertyMacro = function(prop) {
              return (prop || {}).default;
            };
          }
          modelsToIgnore = modelsToIgnore || {};
          var type = schema.type || 'object';
          var format = schema.format;
          var model;
          var output;
          if (!_.isUndefined(schema.example)) {
            output = schema.example;
          } else if (_.isUndefined(schema.items) && _.isArray(schema.enum)) {
            output = schema.enum[0];
          }
          if (_.isUndefined(output)) {
            if (schema.$ref) {
              model = models[Helpers.simpleRef(schema.$ref)];
              if (!_.isUndefined(model)) {
                if (_.isUndefined(modelsToIgnore[model.name])) {
                  modelsToIgnore[model.name] = model;
                  output = schemaToJSON(model.definition, models, modelsToIgnore, modelPropertyMacro);
                  delete modelsToIgnore[model.name];
                } else {
                  if (model.type === 'array') {
                    output = [];
                  } else {
                    output = {};
                  }
                }
              }
            } else if (!_.isUndefined(schema.default)) {
              output = schema.default;
            } else if (type === 'string') {
              if (format === 'date-time') {
                output = new Date().toISOString();
              } else if (format === 'date') {
                output = new Date().toISOString().split('T')[0];
              } else {
                output = 'string';
              }
            } else if (type === 'integer') {
              output = 0;
            } else if (type === 'number') {
              output = 0.0;
            } else if (type === 'boolean') {
              output = true;
            } else if (type === 'object') {
              output = {};
              _.forEach(schema.properties, function(property, name) {
                var cProperty = _.cloneDeep(property);
                cProperty.default = modelPropertyMacro(property);
                output[name] = schemaToJSON(cProperty, models, modelsToIgnore, modelPropertyMacro);
              });
            } else if (type === 'array') {
              output = [];
              if (_.isArray(schema.items)) {
                _.forEach(schema.items, function(item) {
                  output.push(schemaToJSON(item, models, modelsToIgnore, modelPropertyMacro));
                });
              } else if (_.isPlainObject(schema.items)) {
                output.push(schemaToJSON(schema.items, models, modelsToIgnore, modelPropertyMacro));
              } else if (_.isUndefined(schema.items)) {
                output.push({});
              } else {
                Helpers.log('Array type\'s \'items\' property is not an array or an object, cannot process');
              }
            }
          }
          return output;
        }
        function schemaToHTML(name, schema, models, modelPropertyMacro) {
          var strongOpen = '<span class="strong">';
          var strongClose = '</span>';
          if (_.isObject(arguments[0])) {
            name = void 0;
            schema = arguments[0];
            models = arguments[1];
            modelPropertyMacro = arguments[2];
          }
          models = models || {};
          schema = Helpers.resolveSchema(schema);
          if (_.isEmpty(schema)) {
            return strongOpen + 'Empty' + strongClose;
          }
          if (typeof schema.$ref === 'string') {
            name = Helpers.simpleRef(schema.$ref);
            schema = models[name];
            if (typeof schema === 'undefined') {
              return strongOpen + name + ' is not defined!' + strongClose;
            }
          }
          if (typeof name !== 'string') {
            name = schema.title || 'Inline Model';
          }
          if (schema.definition) {
            schema = schema.definition;
          }
          if (typeof modelPropertyMacro !== 'function') {
            modelPropertyMacro = function(prop) {
              return (prop || {}).default;
            };
          }
          var references = {};
          var seenModels = [];
          var inlineModels = 0;
          var html = processModel(schema, name);
          while (_.keys(references).length > 0) {
            _.forEach(references, function(schema, name) {
              var seenModel = _.indexOf(seenModels, name) > -1;
              delete references[name];
              if (!seenModel) {
                seenModels.push(name);
                html += '<br />' + processModel(schema, name);
              }
            });
          }
          return html;
          function addReference(schema, name, skipRef) {
            var modelName = name;
            var model;
            if (schema.$ref) {
              modelName = schema.title || Helpers.simpleRef(schema.$ref);
              model = models[modelName];
            } else if (_.isUndefined(name)) {
              modelName = schema.title || 'Inline Model ' + (++inlineModels);
              model = {definition: schema};
            }
            if (skipRef !== true) {
              references[modelName] = _.isUndefined(model) ? {} : model.definition;
            }
            return modelName;
          }
          function primitiveToHTML(schema) {
            var html = '<span class="propType">';
            var type = schema.type || 'object';
            if (schema.$ref) {
              html += addReference(schema, Helpers.simpleRef(schema.$ref));
            } else if (type === 'object') {
              if (!_.isUndefined(schema.properties)) {
                html += addReference(schema);
              } else {
                html += 'object';
              }
            } else if (type === 'array') {
              html += 'Array[';
              if (_.isArray(schema.items)) {
                html += _.map(schema.items, addReference).join(',');
              } else if (_.isPlainObject(schema.items)) {
                if (_.isUndefined(schema.items.$ref)) {
                  if (!_.isUndefined(schema.items.type) && _.indexOf(['array', 'object'], schema.items.type) === -1) {
                    html += schema.items.type;
                  } else {
                    html += addReference(schema.items);
                  }
                } else {
                  html += addReference(schema.items, Helpers.simpleRef(schema.items.$ref));
                }
              } else {
                Helpers.log('Array type\'s \'items\' schema is not an array or an object, cannot process');
                html += 'object';
              }
              html += ']';
            } else {
              html += schema.type;
            }
            html += '</span>';
            return html;
          }
          function primitiveToOptionsHTML(schema, html) {
            var options = '';
            var type = schema.type || 'object';
            var isArray = type === 'array';
            if (isArray) {
              if (_.isPlainObject(schema.items) && !_.isUndefined(schema.items.type)) {
                type = schema.items.type;
              } else {
                type = 'object';
              }
            }
            if (!_.isUndefined(schema.default)) {
              options += optionHtml('Default', schema.default);
            }
            switch (type) {
              case 'string':
                if (schema.minLength) {
                  options += optionHtml('Min. Length', schema.minLength);
                }
                if (schema.maxLength) {
                  options += optionHtml('Max. Length', schema.maxLength);
                }
                if (schema.pattern) {
                  options += optionHtml('Reg. Exp.', schema.pattern);
                }
                break;
              case 'integer':
              case 'number':
                if (schema.minimum) {
                  options += optionHtml('Min. Value', schema.minimum);
                }
                if (schema.exclusiveMinimum) {
                  options += optionHtml('Exclusive Min.', 'true');
                }
                if (schema.maximum) {
                  options += optionHtml('Max. Value', schema.maximum);
                }
                if (schema.exclusiveMaximum) {
                  options += optionHtml('Exclusive Max.', 'true');
                }
                if (schema.multipleOf) {
                  options += optionHtml('Multiple Of', schema.multipleOf);
                }
                break;
            }
            if (isArray) {
              if (schema.minItems) {
                options += optionHtml('Min. Items', schema.minItems);
              }
              if (schema.maxItems) {
                options += optionHtml('Max. Items', schema.maxItems);
              }
              if (schema.uniqueItems) {
                options += optionHtml('Unique Items', 'true');
              }
              if (schema.collectionFormat) {
                options += optionHtml('Coll. Format', schema.collectionFormat);
              }
            }
            if (_.isUndefined(schema.items)) {
              if (_.isArray(schema.enum)) {
                var enumString;
                if (type === 'number' || type === 'integer') {
                  enumString = schema.enum.join(', ');
                } else {
                  enumString = '"' + schema.enum.join('", "') + '"';
                }
                options += optionHtml('Enum', enumString);
              }
            }
            if (options.length > 0) {
              html = '<span class="propWrap">' + html + '<table class="optionsWrapper"><tr><th colspan="2">' + type + '</th></tr>' + options + '</table></span>';
            }
            return html;
          }
          function processModel(schema, name) {
            var type = schema.type || 'object';
            var isArray = schema.type === 'array';
            var html = strongOpen + name + ' ' + (isArray ? '[' : '{') + strongClose;
            if (name) {
              seenModels.push(name);
            }
            if (isArray) {
              if (_.isArray(schema.items)) {
                html += '<div>' + _.map(schema.items, function(item) {
                  var type = item.type || 'object';
                  if (_.isUndefined(item.$ref)) {
                    if (_.indexOf(['array', 'object'], type) > -1) {
                      if (type === 'object' && _.isUndefined(item.properties)) {
                        return 'object';
                      } else {
                        return addReference(item);
                      }
                    } else {
                      return primitiveToOptionsHTML(item, type);
                    }
                  } else {
                    return addReference(item, Helpers.simpleRef(item.$ref));
                  }
                }).join(',</div><div>');
              } else if (_.isPlainObject(schema.items)) {
                if (_.isUndefined(schema.items.$ref)) {
                  if (_.indexOf(['array', 'object'], schema.items.type || 'object') > -1) {
                    if ((_.isUndefined(schema.items.type) || schema.items.type === 'object') && _.isUndefined(schema.items.properties)) {
                      html += '<div>object</div>';
                    } else {
                      html += '<div>' + addReference(schema.items) + '</div>';
                    }
                  } else {
                    html += '<div>' + primitiveToOptionsHTML(schema.items, schema.items.type) + '</div>';
                  }
                } else {
                  html += '<div>' + addReference(schema.items, Helpers.simpleRef(schema.items.$ref)) + '</div>';
                }
              } else {
                Helpers.log('Array type\'s \'items\' property is not an array or an object, cannot process');
                html += '<div>object</div>';
              }
            } else {
              if (schema.$ref) {
                html += '<div>' + addReference(schema, name) + '</div>';
              } else if (type === 'object') {
                if (_.isPlainObject(schema.properties)) {
                  var contents = _.map(schema.properties, function(property, name) {
                    var propertyIsRequired = (_.indexOf(schema.required, name) >= 0);
                    var cProperty = _.cloneDeep(property);
                    var requiredClass = propertyIsRequired ? 'required' : '';
                    var html = '<span class="propName ' + requiredClass + '">' + name + '</span> (';
                    var model;
                    var propDescription;
                    cProperty.default = modelPropertyMacro(cProperty);
                    cProperty = Helpers.resolveSchema(cProperty);
                    propDescription = property.description || cProperty.description;
                    if (!_.isUndefined(cProperty.$ref)) {
                      model = models[Helpers.simpleRef(cProperty.$ref)];
                      if (!_.isUndefined(model) && _.indexOf([undefined, 'array', 'object'], model.definition.type) === -1) {
                        cProperty = Helpers.resolveSchema(model.definition);
                      }
                    }
                    html += primitiveToHTML(cProperty);
                    if (!propertyIsRequired) {
                      html += ', <span class="propOptKey">optional</span>';
                    }
                    if (property.readOnly) {
                      html += ', <span class="propReadOnly">read only</span>';
                    }
                    html += ')';
                    if (!_.isUndefined(propDescription)) {
                      html += ': ' + '<span class="propDesc">' + propDescription + '</span>';
                    }
                    if (cProperty.enum) {
                      html += ' = <span class="propVals">[\'' + cProperty.enum.join('\', \'') + '\']</span>';
                    }
                    return '<div' + (property.readOnly ? ' class="readOnly"' : '') + '>' + primitiveToOptionsHTML(cProperty, html);
                  }).join(',</div>');
                  if (contents) {
                    html += contents + '</div>';
                  }
                }
              } else {
                html += '<div>' + primitiveToOptionsHTML(schema, type) + '</div>';
              }
            }
            return html + strongOpen + (isArray ? ']' : '}') + strongClose;
          }
        }
      }, {
        "./helpers": 4,
        "lodash-compat/array/indexOf": 50,
        "lodash-compat/collection/forEach": 55,
        "lodash-compat/collection/map": 57,
        "lodash-compat/lang/cloneDeep": 139,
        "lodash-compat/lang/isArray": 141,
        "lodash-compat/lang/isEmpty": 142,
        "lodash-compat/lang/isObject": 145,
        "lodash-compat/lang/isPlainObject": 146,
        "lodash-compat/lang/isUndefined": 149,
        "lodash-compat/object/keys": 150
      }],
      8: [function(require, module, exports) {
        'use strict';
        var SwaggerHttp = require('./http');
        var _ = {isObject: require('lodash-compat/lang/isObject')};
        var SwaggerSpecConverter = module.exports = function() {
          this.errors = [];
          this.warnings = [];
          this.modelMap = {};
        };
        SwaggerSpecConverter.prototype.setDocumentationLocation = function(location) {
          this.docLocation = location;
        };
        SwaggerSpecConverter.prototype.convert = function(obj, clientAuthorizations, opts, callback) {
          if (!obj || !Array.isArray(obj.apis)) {
            return this.finish(callback, null);
          }
          this.clientAuthorizations = clientAuthorizations;
          var swagger = {swagger: '2.0'};
          swagger.originalVersion = obj.swaggerVersion;
          this.apiInfo(obj, swagger);
          this.securityDefinitions(obj, swagger);
          if (obj.basePath) {
            this.setDocumentationLocation(obj.basePath);
          }
          var isSingleFileSwagger = false;
          var i;
          for (i = 0; i < obj.apis.length; i++) {
            var api = obj.apis[i];
            if (Array.isArray(api.operations)) {
              isSingleFileSwagger = true;
            }
          }
          if (isSingleFileSwagger) {
            this.declaration(obj, swagger);
            this.finish(callback, swagger);
          } else {
            this.resourceListing(obj, swagger, opts, callback);
          }
        };
        SwaggerSpecConverter.prototype.declaration = function(obj, swagger) {
          var name,
              i,
              p,
              pos;
          if (!obj.apis) {
            return;
          }
          if (obj.basePath.indexOf('http://') === 0) {
            p = obj.basePath.substring('http://'.length);
            pos = p.indexOf('/');
            if (pos > 0) {
              swagger.host = p.substring(0, pos);
              swagger.basePath = p.substring(pos);
            } else {
              swagger.host = p;
              swagger.basePath = '/';
            }
          } else if (obj.basePath.indexOf('https://') === 0) {
            p = obj.basePath.substring('https://'.length);
            pos = p.indexOf('/');
            if (pos > 0) {
              swagger.host = p.substring(0, pos);
              swagger.basePath = p.substring(pos);
            } else {
              swagger.host = p;
              swagger.basePath = '/';
            }
          } else {
            swagger.basePath = obj.basePath;
          }
          var resourceLevelAuth;
          if (obj.authorizations) {
            resourceLevelAuth = obj.authorizations;
          }
          if (obj.consumes) {
            swagger.consumes = obj.consumes;
          }
          if (obj.produces) {
            swagger.produces = obj.produces;
          }
          if (_.isObject(obj)) {
            for (name in obj.models) {
              var existingModel = obj.models[name];
              var key = (existingModel.id || name);
              this.modelMap[key] = name;
            }
          }
          for (i = 0; i < obj.apis.length; i++) {
            var api = obj.apis[i];
            var path = api.path;
            var operations = api.operations;
            this.operations(path, obj.resourcePath, operations, resourceLevelAuth, swagger);
          }
          var models = obj.models || {};
          this.models(models, swagger);
        };
        SwaggerSpecConverter.prototype.models = function(obj, swagger) {
          if (!_.isObject(obj)) {
            return;
          }
          var name;
          swagger.definitions = swagger.definitions || {};
          for (name in obj) {
            var existingModel = obj[name];
            var _required = [];
            var schema = {properties: {}};
            var propertyName;
            for (propertyName in existingModel.properties) {
              var existingProperty = existingModel.properties[propertyName];
              var property = {};
              this.dataType(existingProperty, property);
              if (existingProperty.description) {
                property.description = existingProperty.description;
              }
              if (existingProperty['enum']) {
                property['enum'] = existingProperty['enum'];
              }
              if (typeof existingProperty.required === 'boolean' && existingProperty.required === true) {
                _required.push(propertyName);
              }
              if (typeof existingProperty.required === 'string' && existingProperty.required === 'true') {
                _required.push(propertyName);
              }
              schema.properties[propertyName] = property;
            }
            if (_required.length > 0) {
              schema.required = _required;
            } else {
              schema.required = existingModel.required;
            }
            swagger.definitions[name] = schema;
          }
        };
        SwaggerSpecConverter.prototype.extractTag = function(resourcePath) {
          var pathString = resourcePath || 'default';
          if (pathString.indexOf('http:') === 0 || pathString.indexOf('https:') === 0) {
            pathString = pathString.split(['/']);
            pathString = pathString[pathString.length - 1].substring();
          }
          if (pathString.endsWith('.json')) {
            pathString = pathString.substring(0, pathString.length - '.json'.length);
          }
          return pathString.replace('/', '');
        };
        SwaggerSpecConverter.prototype.operations = function(path, resourcePath, obj, resourceLevelAuth, swagger) {
          if (!Array.isArray(obj)) {
            return;
          }
          var i;
          if (!swagger.paths) {
            swagger.paths = {};
          }
          var pathObj = swagger.paths[path] || {};
          var tag = this.extractTag(resourcePath);
          swagger.tags = swagger.tags || [];
          var matched = false;
          for (i = 0; i < swagger.tags.length; i++) {
            var tagObject = swagger.tags[i];
            if (tagObject.name === tag) {
              matched = true;
            }
          }
          if (!matched) {
            swagger.tags.push({name: tag});
          }
          for (i = 0; i < obj.length; i++) {
            var existingOperation = obj[i];
            var method = (existingOperation.method || existingOperation.httpMethod).toLowerCase();
            var operation = {tags: [tag]};
            var existingAuthorizations = existingOperation.authorizations;
            if (existingAuthorizations && Object.keys(existingAuthorizations).length === 0) {
              existingAuthorizations = resourceLevelAuth;
            }
            if (typeof existingAuthorizations !== 'undefined') {
              var scopesObject;
              for (var key in existingAuthorizations) {
                operation.security = operation.security || [];
                var scopes = existingAuthorizations[key];
                if (scopes) {
                  var securityScopes = [];
                  for (var j in scopes) {
                    securityScopes.push(scopes[j].scope);
                  }
                  scopesObject = {};
                  scopesObject[key] = securityScopes;
                  operation.security.push(scopesObject);
                } else {
                  scopesObject = {};
                  scopesObject[key] = [];
                  operation.security.push(scopesObject);
                }
              }
            }
            if (existingOperation.consumes) {
              operation.consumes = existingOperation.consumes;
            } else if (swagger.consumes) {
              operation.consumes = swagger.consumes;
            }
            if (existingOperation.produces) {
              operation.produces = existingOperation.produces;
            } else if (swagger.produces) {
              operation.produces = swagger.produces;
            }
            if (existingOperation.summary) {
              operation.summary = existingOperation.summary;
            }
            if (existingOperation.notes) {
              operation.description = existingOperation.notes;
            }
            if (existingOperation.nickname) {
              operation.operationId = existingOperation.nickname;
            }
            if (existingOperation.deprecated) {
              operation.deprecated = existingOperation.deprecated;
            }
            this.authorizations(existingAuthorizations, swagger);
            this.parameters(operation, existingOperation.parameters, swagger);
            this.responseMessages(operation, existingOperation, swagger);
            pathObj[method] = operation;
          }
          swagger.paths[path] = pathObj;
        };
        SwaggerSpecConverter.prototype.responseMessages = function(operation, existingOperation) {
          if (!_.isObject(existingOperation)) {
            return;
          }
          var defaultResponse = {};
          this.dataType(existingOperation, defaultResponse);
          if (!defaultResponse.schema && defaultResponse.type) {
            defaultResponse = {schema: defaultResponse};
          }
          operation.responses = operation.responses || {};
          var has200 = false;
          if (Array.isArray(existingOperation.responseMessages)) {
            var i;
            var existingResponses = existingOperation.responseMessages;
            for (i = 0; i < existingResponses.length; i++) {
              var existingResponse = existingResponses[i];
              var response = {description: existingResponse.message};
              if (existingResponse.code === 200) {
                has200 = true;
              }
              if (existingResponse.responseModel) {
                response.schema = {'$ref': '#/definitions/' + existingResponse.responseModel};
              }
              operation.responses['' + existingResponse.code] = response;
            }
          }
          if (has200) {
            operation.responses['default'] = defaultResponse;
          } else {
            operation.responses['200'] = defaultResponse;
          }
        };
        SwaggerSpecConverter.prototype.authorizations = function(obj) {
          if (!_.isObject(obj)) {
            return;
          }
        };
        SwaggerSpecConverter.prototype.parameters = function(operation, obj) {
          if (!Array.isArray(obj)) {
            return;
          }
          var i;
          for (i = 0; i < obj.length; i++) {
            var existingParameter = obj[i];
            var parameter = {};
            parameter.name = existingParameter.name;
            parameter.description = existingParameter.description;
            parameter.required = existingParameter.required;
            parameter.in = existingParameter.paramType;
            if (parameter.in === 'body') {
              parameter.name = 'body';
            }
            if (parameter.in === 'form') {
              parameter.in = 'formData';
            }
            if (existingParameter.enum) {
              parameter.enum = existingParameter.enum;
            }
            if (existingParameter.allowMultiple === true || existingParameter.allowMultiple === 'true') {
              var innerType = {};
              this.dataType(existingParameter, innerType);
              parameter.type = 'array';
              parameter.items = innerType;
              if (existingParameter.allowableValues) {
                var av = existingParameter.allowableValues;
                if (av.valueType === 'LIST') {
                  parameter['enum'] = av.values;
                }
              }
            } else {
              this.dataType(existingParameter, parameter);
            }
            if (typeof existingParameter.defaultValue !== 'undefined') {
              parameter.default = existingParameter.defaultValue;
            }
            operation.parameters = operation.parameters || [];
            operation.parameters.push(parameter);
          }
        };
        SwaggerSpecConverter.prototype.dataType = function(source, target) {
          if (!_.isObject(source)) {
            return;
          }
          if (source.minimum) {
            target.minimum = source.minimum;
          }
          if (source.maximum) {
            target.maximum = source.maximum;
          }
          if (source.format) {
            target.format = source.format;
          }
          if (typeof source.defaultValue !== 'undefined') {
            target.default = source.defaultValue;
          }
          var jsonSchemaType = this.toJsonSchema(source);
          if (jsonSchemaType) {
            target = target || {};
            if (jsonSchemaType.type) {
              target.type = jsonSchemaType.type;
            }
            if (jsonSchemaType.format) {
              target.format = jsonSchemaType.format;
            }
            if (jsonSchemaType.$ref) {
              target.schema = {$ref: jsonSchemaType.$ref};
            }
            if (jsonSchemaType.items) {
              target.items = jsonSchemaType.items;
            }
          }
        };
        SwaggerSpecConverter.prototype.toJsonSchema = function(source) {
          if (!source) {
            return 'object';
          }
          var detectedType = (source.type || source.dataType || source.responseClass || '');
          var lcType = detectedType.toLowerCase();
          var format = (source.format || '').toLowerCase();
          if (lcType.indexOf('list[') === 0) {
            var innerType = detectedType.substring(5, detectedType.length - 1);
            var jsonType = this.toJsonSchema({type: innerType});
            return {
              type: 'array',
              items: jsonType
            };
          } else if (lcType === 'int' || (lcType === 'integer' && format === 'int32')) {
            {
              return {
                type: 'integer',
                format: 'int32'
              };
            }
          } else if (lcType === 'long' || (lcType === 'integer' && format === 'int64')) {
            {
              return {
                type: 'integer',
                format: 'int64'
              };
            }
          } else if (lcType === 'integer') {
            {
              return {
                type: 'integer',
                format: 'int64'
              };
            }
          } else if (lcType === 'float' || (lcType === 'number' && format === 'float')) {
            {
              return {
                type: 'number',
                format: 'float'
              };
            }
          } else if (lcType === 'double' || (lcType === 'number' && format === 'double')) {
            {
              return {
                type: 'number',
                format: 'double'
              };
            }
          } else if ((lcType === 'string' && format === 'date-time') || (lcType === 'date')) {
            {
              return {
                type: 'string',
                format: 'date-time'
              };
            }
          } else if (lcType === 'string') {
            {
              return {type: 'string'};
            }
          } else if (lcType === 'file') {
            {
              return {type: 'file'};
            }
          } else if (lcType === 'boolean') {
            {
              return {type: 'boolean'};
            }
          } else if (lcType === 'boolean') {
            {
              return {type: 'boolean'};
            }
          } else if (lcType === 'array' || lcType === 'list') {
            if (source.items) {
              var it = this.toJsonSchema(source.items);
              return {
                type: 'array',
                items: it
              };
            } else {
              return {
                type: 'array',
                items: {type: 'object'}
              };
            }
          } else if (source.$ref) {
            return {$ref: this.modelMap[source.$ref] ? '#/definitions/' + this.modelMap[source.$ref] : source.$ref};
          } else if (lcType === 'void' || lcType === '') {
            {
              return {};
            }
          } else if (this.modelMap[source.type]) {
            return {$ref: '#/definitions/' + this.modelMap[source.type]};
          } else {
            return {type: source.type};
          }
        };
        SwaggerSpecConverter.prototype.resourceListing = function(obj, swagger, opts, callback) {
          var i;
          var processedCount = 0;
          var self = this;
          var expectedCount = obj.apis.length;
          var _swagger = swagger;
          var _opts = {};
          if (opts && opts.requestInterceptor) {
            _opts.requestInterceptor = opts.requestInterceptor;
          }
          if (opts && opts.responseInterceptor) {
            _opts.responseInterceptor = opts.responseInterceptor;
          }
          if (expectedCount === 0) {
            this.finish(callback, swagger);
          }
          for (i = 0; i < expectedCount; i++) {
            var api = obj.apis[i];
            var path = api.path;
            var absolutePath = this.getAbsolutePath(obj.swaggerVersion, this.docLocation, path);
            if (api.description) {
              swagger.tags = swagger.tags || [];
              swagger.tags.push({
                name: this.extractTag(api.path),
                description: api.description || ''
              });
            }
            var http = {
              url: absolutePath,
              headers: {accept: 'application/json'},
              on: {},
              method: 'get'
            };
            http.on.response = function(data) {
              processedCount += 1;
              var obj = data.obj;
              if (obj) {
                self.declaration(obj, _swagger);
              }
              if (processedCount === expectedCount) {
                self.finish(callback, _swagger);
              }
            };
            http.on.error = function(data) {
              console.error(data);
              processedCount += 1;
              if (processedCount === expectedCount) {
                self.finish(callback, _swagger);
              }
            };
            if (this.clientAuthorizations && typeof this.clientAuthorizations.apply === 'function') {
              this.clientAuthorizations.apply(http);
            }
            new SwaggerHttp().execute(http, _opts);
          }
        };
        SwaggerSpecConverter.prototype.getAbsolutePath = function(version, docLocation, path) {
          if (version === '1.0') {
            if (docLocation.endsWith('.json')) {
              var pos = docLocation.lastIndexOf('/');
              if (pos > 0) {
                docLocation = docLocation.substring(0, pos);
              }
            }
          }
          var location = docLocation;
          if (path.indexOf('http://') === 0 || path.indexOf('https://') === 0) {
            location = path;
          } else {
            if (docLocation.endsWith('/')) {
              location = docLocation.substring(0, docLocation.length - 1);
            }
            location += path;
          }
          location = location.replace('{format}', 'json');
          return location;
        };
        SwaggerSpecConverter.prototype.securityDefinitions = function(obj, swagger) {
          if (obj.authorizations) {
            var name;
            for (name in obj.authorizations) {
              var isValid = false;
              var securityDefinition = {};
              var definition = obj.authorizations[name];
              if (definition.type === 'apiKey') {
                securityDefinition.type = 'apiKey';
                securityDefinition.in = definition.passAs;
                securityDefinition.name = definition.keyname || name;
                isValid = true;
              } else if (definition.type === 'basicAuth') {
                securityDefinition.type = 'basicAuth';
                isValid = true;
              } else if (definition.type === 'oauth2') {
                var existingScopes = definition.scopes || [];
                var scopes = {};
                var i;
                for (i in existingScopes) {
                  var scope = existingScopes[i];
                  scopes[scope.scope] = scope.description;
                }
                securityDefinition.type = 'oauth2';
                if (i > 0) {
                  securityDefinition.scopes = scopes;
                }
                if (definition.grantTypes) {
                  if (definition.grantTypes.implicit) {
                    var implicit = definition.grantTypes.implicit;
                    securityDefinition.flow = 'implicit';
                    securityDefinition.authorizationUrl = implicit.loginEndpoint;
                    isValid = true;
                  }
                  if (definition.grantTypes['authorization_code']) {
                    if (!securityDefinition.flow) {
                      var authCode = definition.grantTypes['authorization_code'];
                      securityDefinition.flow = 'accessCode';
                      securityDefinition.authorizationUrl = authCode.tokenRequestEndpoint.url;
                      securityDefinition.tokenUrl = authCode.tokenEndpoint.url;
                      isValid = true;
                    }
                  }
                }
              }
              if (isValid) {
                swagger.securityDefinitions = swagger.securityDefinitions || {};
                swagger.securityDefinitions[name] = securityDefinition;
              }
            }
          }
        };
        SwaggerSpecConverter.prototype.apiInfo = function(obj, swagger) {
          if (obj.info) {
            var info = obj.info;
            swagger.info = {};
            if (info.contact) {
              swagger.info.contact = {};
              swagger.info.contact.email = info.contact;
            }
            if (info.description) {
              swagger.info.description = info.description;
            }
            if (info.title) {
              swagger.info.title = info.title;
            }
            if (info.termsOfServiceUrl) {
              swagger.info.termsOfService = info.termsOfServiceUrl;
            }
            if (info.license || info.licenseUrl) {
              swagger.license = {};
              if (info.license) {
                swagger.license.name = info.license;
              }
              if (info.licenseUrl) {
                swagger.license.url = info.licenseUrl;
              }
            }
          } else {
            this.warnings.push('missing info section');
          }
        };
        SwaggerSpecConverter.prototype.finish = function(callback, obj) {
          callback(obj);
        };
      }, {
        "./http": 5,
        "lodash-compat/lang/isObject": 145
      }],
      9: [function(require, module, exports) {
        'use strict';
        var log = require('../helpers').log;
        var _ = {
          isPlainObject: require('lodash-compat/lang/isPlainObject'),
          isString: require('lodash-compat/lang/isString')
        };
        var SchemaMarkup = require('../schema-markup');
        var jsyaml = require('js-yaml');
        var Model = module.exports = function(name, definition, models, modelPropertyMacro) {
          this.definition = definition || {};
          this.isArray = definition.type === 'array';
          this.models = models || {};
          this.name = definition.title || name || 'Inline Model';
          this.modelPropertyMacro = modelPropertyMacro || function(property) {
            return property.default;
          };
          return this;
        };
        Model.prototype.createJSONSample = Model.prototype.getSampleValue = function(modelsToIgnore) {
          modelsToIgnore = modelsToIgnore || {};
          modelsToIgnore[this.name] = this;
          if (this.examples && _.isPlainObject(this.examples) && this.examples['application/json']) {
            this.definition.example = this.examples['application/json'];
            if (_.isString(this.definition.example)) {
              this.definition.example = jsyaml.safeLoad(this.definition.example);
            }
          } else if (!this.definition.example) {
            this.definition.example = this.examples;
          }
          return SchemaMarkup.schemaToJSON(this.definition, this.models, modelsToIgnore, this.modelPropertyMacro);
        };
        Model.prototype.getMockSignature = function() {
          return SchemaMarkup.schemaToHTML(this.name, this.definition, this.models, this.modelPropertyMacro);
        };
      }, {
        "../helpers": 4,
        "../schema-markup.js": 7,
        "js-yaml": 20,
        "lodash-compat/lang/isPlainObject": 146,
        "lodash-compat/lang/isString": 147
      }],
      10: [function(require, module, exports) {
        'use strict';
        var _ = {
          cloneDeep: require('lodash-compat/lang/cloneDeep'),
          isUndefined: require('lodash-compat/lang/isUndefined'),
          isEmpty: require('lodash-compat/lang/isEmpty'),
          isObject: require('lodash-compat/lang/isObject')
        };
        var helpers = require('../helpers');
        var Model = require('./model');
        var SwaggerHttp = require('../http');
        var Q = require('q');
        var Operation = module.exports = function(parent, scheme, operationId, httpMethod, path, args, definitions, models, clientAuthorizations) {
          var errors = [];
          parent = parent || {};
          args = args || {};
          if (parent && parent.options) {
            this.client = parent.options.client || null;
            this.requestInterceptor = parent.options.requestInterceptor || null;
            this.responseInterceptor = parent.options.responseInterceptor || null;
          }
          this.authorizations = args.security;
          this.basePath = parent.basePath || '/';
          this.clientAuthorizations = clientAuthorizations;
          this.consumes = args.consumes || parent.consumes || ['application/json'];
          this.produces = args.produces || parent.produces || ['application/json'];
          this.deprecated = args.deprecated;
          this.description = args.description;
          this.host = parent.host || 'localhost';
          this.method = (httpMethod || errors.push('Operation ' + operationId + ' is missing method.'));
          this.models = models || {};
          this.nickname = (operationId || errors.push('Operations must have a nickname.'));
          this.operation = args;
          this.operations = {};
          this.parameters = args !== null ? (args.parameters || []) : {};
          this.parent = parent;
          this.path = (path || errors.push('Operation ' + this.nickname + ' is missing path.'));
          this.responses = (args.responses || {});
          this.scheme = scheme || parent.scheme || 'http';
          this.schemes = args.schemes || parent.schemes;
          this.security = args.security;
          this.summary = args.summary || '';
          this.type = null;
          this.useJQuery = parent.useJQuery;
          this.enableCookies = parent.enableCookies;
          this.parameterMacro = parent.parameterMacro || function(operation, parameter) {
            return parameter.default;
          };
          this.inlineModels = [];
          if (typeof this.deprecated === 'string') {
            switch (this.deprecated.toLowerCase()) {
              case 'true':
              case 'yes':
              case '1':
                {
                  this.deprecated = true;
                  break;
                }
              case 'false':
              case 'no':
              case '0':
              case null:
                {
                  this.deprecated = false;
                  break;
                }
              default:
                this.deprecated = Boolean(this.deprecated);
            }
          }
          var i,
              model;
          if (definitions) {
            var key;
            for (key in definitions) {
              model = new Model(key, definitions[key], this.models, parent.modelPropertyMacro);
              if (model) {
                this.models[key] = model;
              }
            }
          } else {
            definitions = {};
          }
          for (i = 0; i < this.parameters.length; i++) {
            var param = this.parameters[i];
            param.default = this.parameterMacro(this, param);
            if (param.type === 'array') {
              param.isList = true;
              param.allowMultiple = true;
            }
            var innerType = this.getType(param);
            if (innerType && innerType.toString().toLowerCase() === 'boolean') {
              param.allowableValues = {};
              param.isList = true;
              param['enum'] = [true, false];
            }
            if (typeof param['x-example'] !== 'undefined') {
              var d = param['x-example'];
              param.default = d;
            }
            if (param['x-examples']) {
              var d = param['x-examples'].default;
              if (typeof d !== 'undefined') {
                param.default = d;
              }
            }
            if (typeof param['enum'] !== 'undefined') {
              var id;
              param.allowableValues = {};
              param.allowableValues.values = [];
              param.allowableValues.descriptiveValues = [];
              for (id = 0; id < param['enum'].length; id++) {
                var value = param['enum'][id];
                var isDefault = (value === param.default || value + '' === param.default);
                param.allowableValues.values.push(value);
                param.allowableValues.descriptiveValues.push({
                  value: value + '',
                  isDefault: isDefault
                });
              }
            }
            if (param.type === 'array') {
              innerType = [innerType];
              if (typeof param.allowableValues === 'undefined') {
                delete param.isList;
                delete param.allowMultiple;
              }
            }
            param.modelSignature = {
              type: innerType,
              definitions: this.models
            };
            param.signature = this.getModelSignature(innerType, this.models).toString();
            param.sampleJSON = this.getModelSampleJSON(innerType, this.models);
            param.responseClassSignature = param.signature;
          }
          var defaultResponseCode,
              response,
              responses = this.responses;
          if (responses['200']) {
            response = responses['200'];
            defaultResponseCode = '200';
          } else if (responses['201']) {
            response = responses['201'];
            defaultResponseCode = '201';
          } else if (responses['202']) {
            response = responses['202'];
            defaultResponseCode = '202';
          } else if (responses['203']) {
            response = responses['203'];
            defaultResponseCode = '203';
          } else if (responses['204']) {
            response = responses['204'];
            defaultResponseCode = '204';
          } else if (responses['205']) {
            response = responses['205'];
            defaultResponseCode = '205';
          } else if (responses['206']) {
            response = responses['206'];
            defaultResponseCode = '206';
          } else if (responses['default']) {
            response = responses['default'];
            defaultResponseCode = 'default';
          }
          if (response && response.schema) {
            var resolvedModel = this.resolveModel(response.schema, definitions);
            var successResponse;
            delete responses[defaultResponseCode];
            if (resolvedModel) {
              this.successResponse = {};
              successResponse = this.successResponse[defaultResponseCode] = resolvedModel;
            } else if (!response.schema.type || response.schema.type === 'object' || response.schema.type === 'array') {
              this.successResponse = {};
              successResponse = this.successResponse[defaultResponseCode] = new Model(undefined, response.schema || {}, this.models, parent.modelPropertyMacro);
            } else {
              this.successResponse = {};
              successResponse = this.successResponse[defaultResponseCode] = response.schema;
            }
            if (successResponse) {
              if (response.description) {
                successResponse.description = response.description;
              }
              if (response.examples) {
                successResponse.examples = response.examples;
              }
              if (response.headers) {
                successResponse.headers = response.headers;
              }
            }
            this.type = response;
          }
          if (errors.length > 0) {
            if (this.resource && this.resource.api && this.resource.api.fail) {
              this.resource.api.fail(errors);
            }
          }
          return this;
        };
        Operation.prototype.isDefaultArrayItemValue = function(value, param) {
          if (param.default && Array.isArray(param.default)) {
            return param.default.indexOf(value) !== -1;
          }
          return value === param.default;
        };
        Operation.prototype.getType = function(param) {
          var type = param.type;
          var format = param.format;
          var isArray = false;
          var str;
          if (type === 'integer' && format === 'int32') {
            str = 'integer';
          } else if (type === 'integer' && format === 'int64') {
            str = 'long';
          } else if (type === 'integer') {
            str = 'integer';
          } else if (type === 'string') {
            if (format === 'date-time') {
              str = 'date-time';
            } else if (format === 'date') {
              str = 'date';
            } else {
              str = 'string';
            }
          } else if (type === 'number' && format === 'float') {
            str = 'float';
          } else if (type === 'number' && format === 'double') {
            str = 'double';
          } else if (type === 'number') {
            str = 'double';
          } else if (type === 'boolean') {
            str = 'boolean';
          } else if (type === 'array') {
            isArray = true;
            if (param.items) {
              str = this.getType(param.items);
            }
          } else if (type === 'file') {
            str = 'file';
          }
          if (param.$ref) {
            str = helpers.simpleRef(param.$ref);
          }
          var schema = param.schema;
          if (schema) {
            var ref = schema.$ref;
            if (ref) {
              ref = helpers.simpleRef(ref);
              if (isArray) {
                return [ref];
              } else {
                return ref;
              }
            } else {
              if (schema.type === 'object') {
                return this.addInlineModel(schema);
              }
              return this.getType(schema);
            }
          }
          if (isArray) {
            return [str];
          } else {
            return str;
          }
        };
        Operation.prototype.addInlineModel = function(schema) {
          var len = this.inlineModels.length;
          var model = this.resolveModel(schema, {});
          if (model) {
            this.inlineModels.push(model);
            return 'Inline Model ' + len;
          }
          return null;
        };
        Operation.prototype.getInlineModel = function(inlineStr) {
          if (/^Inline Model \d+$/.test(inlineStr)) {
            var id = parseInt(inlineStr.substr('Inline Model'.length).trim(), 10);
            var model = this.inlineModels[id];
            return model;
          }
          return null;
        };
        Operation.prototype.resolveModel = function(schema, definitions) {
          if (typeof schema.$ref !== 'undefined') {
            var ref = schema.$ref;
            if (ref.indexOf('#/definitions/') === 0) {
              ref = ref.substring('#/definitions/'.length);
            }
            if (definitions[ref]) {
              return new Model(ref, definitions[ref], this.models, this.parent.modelPropertyMacro);
            }
          } else if (schema && typeof schema === 'object' && (schema.type === 'object' || _.isUndefined(schema.type))) {
            return new Model(undefined, schema, this.models, this.parent.modelPropertyMacro);
          }
          return null;
        };
        Operation.prototype.help = function(dontPrint) {
          var out = this.nickname + ': ' + this.summary + '\n';
          for (var i = 0; i < this.parameters.length; i++) {
            var param = this.parameters[i];
            var typeInfo = param.signature;
            out += '\n  * ' + param.name + ' (' + typeInfo + '): ' + param.description;
          }
          if (typeof dontPrint === 'undefined') {
            helpers.log(out);
          }
          return out;
        };
        Operation.prototype.getModelSignature = function(type, definitions) {
          var isPrimitive,
              listType;
          if (type instanceof Array) {
            listType = true;
            type = type[0];
          }
          if (typeof type === 'undefined') {
            type = 'undefined';
            isPrimitive = true;
          } else if (definitions[type]) {
            type = definitions[type];
            isPrimitive = false;
          } else if (this.getInlineModel(type)) {
            type = this.getInlineModel(type);
            isPrimitive = false;
          } else {
            isPrimitive = true;
          }
          if (isPrimitive) {
            if (listType) {
              return 'Array[' + type + ']';
            } else {
              return type.toString();
            }
          } else {
            if (listType) {
              return 'Array[' + type.getMockSignature() + ']';
            } else {
              return type.getMockSignature();
            }
          }
        };
        Operation.prototype.supportHeaderParams = function() {
          return true;
        };
        Operation.prototype.supportedSubmitMethods = function() {
          return this.parent.supportedSubmitMethods;
        };
        Operation.prototype.getHeaderParams = function(args) {
          var headers = this.setContentTypes(args, {});
          for (var i = 0; i < this.parameters.length; i++) {
            var param = this.parameters[i];
            if (typeof args[param.name] !== 'undefined') {
              if (param.in === 'header') {
                var value = args[param.name];
                if (Array.isArray(value)) {
                  value = value.toString();
                }
                headers[param.name] = value;
              }
            }
          }
          return headers;
        };
        Operation.prototype.urlify = function(args) {
          var formParams = {};
          var requestUrl = this.path;
          var querystring = '';
          for (var i = 0; i < this.parameters.length; i++) {
            var param = this.parameters[i];
            if (typeof args[param.name] !== 'undefined') {
              if (param.in === 'path') {
                var reg = new RegExp('\{' + param.name + '\}', 'gi');
                var value = args[param.name];
                if (Array.isArray(value)) {
                  value = this.encodePathCollection(param.collectionFormat, param.name, value);
                } else {
                  value = this.encodePathParam(value);
                }
                requestUrl = requestUrl.replace(reg, value);
              } else if (param.in === 'query' && typeof args[param.name] !== 'undefined') {
                if (querystring === '') {
                  querystring += '?';
                } else {
                  querystring += '&';
                }
                if (typeof param.collectionFormat !== 'undefined') {
                  var qp = args[param.name];
                  if (Array.isArray(qp)) {
                    querystring += this.encodeQueryCollection(param.collectionFormat, param.name, qp);
                  } else {
                    querystring += this.encodeQueryParam(param.name) + '=' + this.encodeQueryParam(args[param.name]);
                  }
                } else {
                  querystring += this.encodeQueryParam(param.name) + '=' + this.encodeQueryParam(args[param.name]);
                }
              } else if (param.in === 'formData') {
                formParams[param.name] = args[param.name];
              }
            }
          }
          var url = this.scheme + '://' + this.host;
          if (this.basePath !== '/') {
            url += this.basePath;
          }
          return url + requestUrl + querystring;
        };
        Operation.prototype.getMissingParams = function(args) {
          var missingParams = [];
          var i;
          for (i = 0; i < this.parameters.length; i++) {
            var param = this.parameters[i];
            if (param.required === true) {
              if (typeof args[param.name] === 'undefined') {
                missingParams = param.name;
              }
            }
          }
          return missingParams;
        };
        Operation.prototype.getBody = function(headers, args, opts) {
          var formParams = {},
              hasFormParams,
              body,
              key,
              value,
              hasBody = false;
          for (var i = 0; i < this.parameters.length; i++) {
            var param = this.parameters[i];
            if (typeof args[param.name] !== 'undefined') {
              if (param.in === 'body') {
                body = args[param.name];
              } else if (param.in === 'formData') {
                formParams[param.name] = args[param.name];
                hasFormParams = true;
              }
            } else {
              if (param.in === 'body') {
                hasBody = true;
              }
            }
          }
          if (hasBody && typeof body === 'undefined') {
            var contentType = headers['Content-Type'];
            if (contentType && contentType.indexOf('application/json') === 0) {
              body = '{}';
            }
          }
          var isMultiPart = false;
          if (headers['Content-Type'] && headers['Content-Type'].indexOf('multipart/form-data') >= 0) {
            isMultiPart = true;
          }
          if (hasFormParams && !isMultiPart) {
            var encoded = '';
            for (key in formParams) {
              value = formParams[key];
              if (typeof value !== 'undefined') {
                if (encoded !== '') {
                  encoded += '&';
                }
                encoded += encodeURIComponent(key) + '=' + encodeURIComponent(value);
              }
            }
            body = encoded;
          } else if (isMultiPart) {
            if (opts.useJQuery) {
              var bodyParam = new FormData();
              bodyParam.type = 'formData';
              for (key in formParams) {
                value = args[key];
                if (typeof value !== 'undefined') {
                  if (value.type === 'file' && value.value) {
                    delete headers['Content-Type'];
                    bodyParam.append(key, value.value);
                  } else {
                    bodyParam.append(key, value);
                  }
                }
              }
              body = bodyParam;
            }
          }
          return body;
        };
        Operation.prototype.getModelSampleJSON = function(type, models) {
          var listType,
              sampleJson,
              innerType;
          models = models || {};
          listType = (type instanceof Array);
          innerType = listType ? type[0] : type;
          if (models[innerType]) {
            sampleJson = models[innerType].createJSONSample();
          } else if (this.getInlineModel(innerType)) {
            sampleJson = this.getInlineModel(innerType).createJSONSample();
          }
          if (sampleJson) {
            sampleJson = listType ? [sampleJson] : sampleJson;
            if (typeof sampleJson === 'string') {
              return sampleJson;
            } else if (_.isObject(sampleJson)) {
              var t = sampleJson;
              if (sampleJson instanceof Array && sampleJson.length > 0) {
                t = sampleJson[0];
              }
              if (t.nodeName && typeof t === 'Node') {
                var xmlString = new XMLSerializer().serializeToString(t);
                return this.formatXml(xmlString);
              } else {
                return JSON.stringify(sampleJson, null, 2);
              }
            } else {
              return sampleJson;
            }
          }
        };
        Operation.prototype.do = function(args, opts, callback, error, parent) {
          return this.execute(args, opts, callback, error, parent);
        };
        Operation.prototype.execute = function(arg1, arg2, arg3, arg4, parent) {
          var args = arg1 || {};
          var opts = {},
              success,
              error,
              deferred;
          if (_.isObject(arg2)) {
            opts = arg2;
            success = arg3;
            error = arg4;
          }
          if (this.client) {
            opts.client = this.client;
          }
          if (!opts.requestInterceptor && this.requestInterceptor) {
            opts.requestInterceptor = this.requestInterceptor;
          }
          if (!opts.responseInterceptor && this.responseInterceptor) {
            opts.responseInterceptor = this.responseInterceptor;
          }
          if (typeof arg2 === 'function') {
            success = arg2;
            error = arg3;
          }
          if (this.parent.usePromise) {
            deferred = Q.defer();
          } else {
            success = (success || this.parent.defaultSuccessCallback || helpers.log);
            error = (error || this.parent.defaultErrorCallback || helpers.log);
          }
          if (typeof opts.useJQuery === 'undefined') {
            opts.useJQuery = this.useJQuery;
          }
          if (typeof opts.enableCookies === 'undefined') {
            opts.enableCookies = this.enableCookies;
          }
          var missingParams = this.getMissingParams(args);
          if (missingParams.length > 0) {
            var message = 'missing required params: ' + missingParams;
            helpers.fail(message);
            if (this.parent.usePromise) {
              deferred.reject(message);
              return deferred.promise;
            } else {
              error(message, parent);
              return {};
            }
          }
          var allHeaders = this.getHeaderParams(args);
          var contentTypeHeaders = this.setContentTypes(args, opts);
          var headers = {},
              attrname;
          for (attrname in allHeaders) {
            headers[attrname] = allHeaders[attrname];
          }
          for (attrname in contentTypeHeaders) {
            headers[attrname] = contentTypeHeaders[attrname];
          }
          var body = this.getBody(contentTypeHeaders, args, opts);
          var url = this.urlify(args);
          if (url.indexOf('.{format}') > 0) {
            if (headers) {
              var format = headers.Accept || headers.accept;
              if (format && format.indexOf('json') > 0) {
                url = url.replace('.{format}', '.json');
              } else if (format && format.indexOf('xml') > 0) {
                url = url.replace('.{format}', '.xml');
              }
            }
          }
          var obj = {
            url: url,
            method: this.method.toUpperCase(),
            body: body,
            enableCookies: opts.enableCookies,
            useJQuery: opts.useJQuery,
            deferred: deferred,
            headers: headers,
            on: {
              response: function(response) {
                if (deferred) {
                  deferred.resolve(response);
                  return deferred.promise;
                } else {
                  return success(response, parent);
                }
              },
              error: function(response) {
                if (deferred) {
                  deferred.reject(response);
                  return deferred.promise;
                } else {
                  return error(response, parent);
                }
              }
            }
          };
          this.clientAuthorizations.apply(obj, this.operation.security);
          if (opts.mock === true) {
            return obj;
          } else {
            return new SwaggerHttp().execute(obj, opts);
          }
        };
        function itemByPriority(col, itemPriority) {
          if (_.isEmpty(itemPriority)) {
            return col[0];
          }
          for (var i = 0,
              len = itemPriority.length; i < len; i++) {
            if (col.indexOf(itemPriority[i]) > -1) {
              return itemPriority[i];
            }
          }
          return col[0];
        }
        Operation.prototype.setContentTypes = function(args, opts) {
          var allDefinedParams = this.parameters;
          var body;
          var consumes = args.parameterContentType || itemByPriority(this.consumes, ['application/json', 'application/yaml']);
          var accepts = opts.responseContentType || itemByPriority(this.produces, ['application/json', 'application/yaml']);
          var definedFileParams = [];
          var definedFormParams = [];
          var headers = {};
          var i;
          for (i = 0; i < allDefinedParams.length; i++) {
            var param = allDefinedParams[i];
            if (param.in === 'formData') {
              if (param.type === 'file') {
                definedFileParams.push(param);
              } else {
                definedFormParams.push(param);
              }
            } else if (param.in === 'header' && opts) {
              var key = param.name;
              var headerValue = opts[param.name];
              if (typeof opts[param.name] !== 'undefined') {
                headers[key] = headerValue;
              }
            } else if (param.in === 'body' && typeof args[param.name] !== 'undefined') {
              body = args[param.name];
            }
          }
          if (this.method === 'post' || this.method === 'put' || this.method === 'patch' || ((this.method === 'delete' || this.method === 'get') && body)) {
            if (opts.requestContentType) {
              consumes = opts.requestContentType;
            }
            if (definedFormParams.length > 0) {
              if (opts.requestContentType) {
                consumes = opts.requestContentType;
              } else if (definedFileParams.length > 0) {
                consumes = 'multipart/form-data';
              } else {
                consumes = 'application/x-www-form-urlencoded';
              }
            }
          } else {
            consumes = null;
          }
          if (consumes && this.consumes) {
            if (this.consumes.indexOf(consumes) === -1) {
              helpers.log('server doesn\'t consume ' + consumes + ', try ' + JSON.stringify(this.consumes));
            }
          }
          if (!this.matchesAccept(accepts)) {
            helpers.log('server can\'t produce ' + accepts);
          }
          if ((consumes && body !== '') || (consumes === 'application/x-www-form-urlencoded')) {
            headers['Content-Type'] = consumes;
          }
          if (accepts) {
            headers.Accept = accepts;
          }
          return headers;
        };
        Operation.prototype.matchesAccept = function(accepts) {
          if (!accepts || !this.produces) {
            return true;
          }
          return this.produces.indexOf(accepts) !== -1 || this.produces.indexOf('*/*') !== -1;
        };
        Operation.prototype.asCurl = function(args1, args2) {
          var opts = {mock: true};
          if (typeof args2 === 'object') {
            for (var argKey in args2) {
              opts[argKey] = args2[argKey];
            }
          }
          var obj = this.execute(args1, opts);
          this.clientAuthorizations.apply(obj, this.operation.security);
          var results = [];
          results.push('-X ' + this.method.toUpperCase());
          if (typeof obj.headers !== 'undefined') {
            var key;
            for (key in obj.headers) {
              var value = obj.headers[key];
              if (typeof value === 'string') {
                value = value.replace(/\'/g, '\\u0027');
              }
              results.push('--header \'' + key + ': ' + value + '\'');
            }
          }
          if (obj.body) {
            var body;
            if (_.isObject(obj.body)) {
              body = JSON.stringify(obj.body);
            } else {
              body = obj.body;
            }
            results.push('-d \'' + body.replace(/\'/g, '\\u0027') + '\'');
          }
          return 'curl ' + (results.join(' ')) + ' \'' + obj.url + '\'';
        };
        Operation.prototype.encodePathCollection = function(type, name, value) {
          var encoded = '';
          var i;
          var separator = '';
          if (type === 'ssv') {
            separator = '%20';
          } else if (type === 'tsv') {
            separator = '\\t';
          } else if (type === 'pipes') {
            separator = '|';
          } else {
            separator = ',';
          }
          for (i = 0; i < value.length; i++) {
            if (i === 0) {
              encoded = this.encodeQueryParam(value[i]);
            } else {
              encoded += separator + this.encodeQueryParam(value[i]);
            }
          }
          return encoded;
        };
        Operation.prototype.encodeQueryCollection = function(type, name, value) {
          var encoded = '';
          var i;
          if (type === 'default' || type === 'multi') {
            for (i = 0; i < value.length; i++) {
              if (i > 0) {
                encoded += '&';
              }
              encoded += this.encodeQueryParam(name) + '=' + this.encodeQueryParam(value[i]);
            }
          } else {
            var separator = '';
            if (type === 'csv') {
              separator = ',';
            } else if (type === 'ssv') {
              separator = '%20';
            } else if (type === 'tsv') {
              separator = '\\t';
            } else if (type === 'pipes') {
              separator = '|';
            } else if (type === 'brackets') {
              for (i = 0; i < value.length; i++) {
                if (i !== 0) {
                  encoded += '&';
                }
                encoded += this.encodeQueryParam(name) + '[]=' + this.encodeQueryParam(value[i]);
              }
            }
            if (separator !== '') {
              for (i = 0; i < value.length; i++) {
                if (i === 0) {
                  encoded = this.encodeQueryParam(name) + '=' + this.encodeQueryParam(value[i]);
                } else {
                  encoded += separator + this.encodeQueryParam(value[i]);
                }
              }
            }
          }
          return encoded;
        };
        Operation.prototype.encodeQueryParam = function(arg) {
          return encodeURIComponent(arg);
        };
        Operation.prototype.encodePathParam = function(pathParam) {
          return encodeURIComponent(pathParam);
        };
      }, {
        "../helpers": 4,
        "../http": 5,
        "./model": 9,
        "lodash-compat/lang/cloneDeep": 139,
        "lodash-compat/lang/isEmpty": 142,
        "lodash-compat/lang/isObject": 145,
        "lodash-compat/lang/isUndefined": 149,
        "q": 158
      }],
      11: [function(require, module, exports) {
        'use strict';
        var OperationGroup = module.exports = function(tag, description, externalDocs, operation) {
          this.description = description;
          this.externalDocs = externalDocs;
          this.name = tag;
          this.operation = operation;
          this.operationsArray = [];
          this.path = tag;
          this.tag = tag;
        };
        OperationGroup.prototype.sort = function() {};
      }, {}],
      12: [function(require, module, exports) {}, {}],
      13: [function(require, module, exports) {
        var process = module.exports = {};
        var queue = [];
        var draining = false;
        function drainQueue() {
          if (draining) {
            return;
          }
          draining = true;
          var currentQueue;
          var len = queue.length;
          while (len) {
            currentQueue = queue;
            queue = [];
            var i = -1;
            while (++i < len) {
              currentQueue[i]();
            }
            len = queue.length;
          }
          draining = false;
        }
        process.nextTick = function(fun) {
          queue.push(fun);
          if (!draining) {
            setTimeout(drainQueue, 0);
          }
        };
        process.title = 'browser';
        process.browser = true;
        process.env = {};
        process.argv = [];
        process.version = '';
        process.versions = {};
        function noop() {}
        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.binding = function(name) {
          throw new Error('process.binding is not supported');
        };
        process.cwd = function() {
          return '/';
        };
        process.chdir = function(dir) {
          throw new Error('process.chdir is not supported');
        };
        process.umask = function() {
          return 0;
        };
      }, {}],
      14: [function(require, module, exports) {
        (function(Buffer) {
          (function() {
            "use strict";
            function btoa(str) {
              var buffer;
              ;
              if (str instanceof Buffer) {
                buffer = str;
              } else {
                buffer = new Buffer(str.toString(), 'binary');
              }
              return buffer.toString('base64');
            }
            module.exports = btoa;
          }());
        }).call(this, require('buffer').Buffer);
      }, {"buffer": 15}],
      15: [function(require, module, exports) {
        var base64 = require('base64-js');
        var ieee754 = require('ieee754');
        var isArray = require('is-array');
        exports.Buffer = Buffer;
        exports.SlowBuffer = SlowBuffer;
        exports.INSPECT_MAX_BYTES = 50;
        Buffer.poolSize = 8192;
        var rootParent = {};
        Buffer.TYPED_ARRAY_SUPPORT = (function() {
          function Bar() {}
          try {
            var arr = new Uint8Array(1);
            arr.foo = function() {
              return 42;
            };
            arr.constructor = Bar;
            return arr.foo() === 42 && arr.constructor === Bar && typeof arr.subarray === 'function' && arr.subarray(1, 1).byteLength === 0;
          } catch (e) {
            return false;
          }
        })();
        function kMaxLength() {
          return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
        }
        function Buffer(arg) {
          if (!(this instanceof Buffer)) {
            if (arguments.length > 1)
              return new Buffer(arg, arguments[1]);
            return new Buffer(arg);
          }
          this.length = 0;
          this.parent = undefined;
          if (typeof arg === 'number') {
            return fromNumber(this, arg);
          }
          if (typeof arg === 'string') {
            return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8');
          }
          return fromObject(this, arg);
        }
        function fromNumber(that, length) {
          that = allocate(that, length < 0 ? 0 : checked(length) | 0);
          if (!Buffer.TYPED_ARRAY_SUPPORT) {
            for (var i = 0; i < length; i++) {
              that[i] = 0;
            }
          }
          return that;
        }
        function fromString(that, string, encoding) {
          if (typeof encoding !== 'string' || encoding === '')
            encoding = 'utf8';
          var length = byteLength(string, encoding) | 0;
          that = allocate(that, length);
          that.write(string, encoding);
          return that;
        }
        function fromObject(that, object) {
          if (Buffer.isBuffer(object))
            return fromBuffer(that, object);
          if (isArray(object))
            return fromArray(that, object);
          if (object == null) {
            throw new TypeError('must start with number, buffer, array or string');
          }
          if (typeof ArrayBuffer !== 'undefined') {
            if (object.buffer instanceof ArrayBuffer) {
              return fromTypedArray(that, object);
            }
            if (object instanceof ArrayBuffer) {
              return fromArrayBuffer(that, object);
            }
          }
          if (object.length)
            return fromArrayLike(that, object);
          return fromJsonObject(that, object);
        }
        function fromBuffer(that, buffer) {
          var length = checked(buffer.length) | 0;
          that = allocate(that, length);
          buffer.copy(that, 0, 0, length);
          return that;
        }
        function fromArray(that, array) {
          var length = checked(array.length) | 0;
          that = allocate(that, length);
          for (var i = 0; i < length; i += 1) {
            that[i] = array[i] & 255;
          }
          return that;
        }
        function fromTypedArray(that, array) {
          var length = checked(array.length) | 0;
          that = allocate(that, length);
          for (var i = 0; i < length; i += 1) {
            that[i] = array[i] & 255;
          }
          return that;
        }
        function fromArrayBuffer(that, array) {
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            array.byteLength;
            that = Buffer._augment(new Uint8Array(array));
          } else {
            that = fromTypedArray(that, new Uint8Array(array));
          }
          return that;
        }
        function fromArrayLike(that, array) {
          var length = checked(array.length) | 0;
          that = allocate(that, length);
          for (var i = 0; i < length; i += 1) {
            that[i] = array[i] & 255;
          }
          return that;
        }
        function fromJsonObject(that, object) {
          var array;
          var length = 0;
          if (object.type === 'Buffer' && isArray(object.data)) {
            array = object.data;
            length = checked(array.length) | 0;
          }
          that = allocate(that, length);
          for (var i = 0; i < length; i += 1) {
            that[i] = array[i] & 255;
          }
          return that;
        }
        function allocate(that, length) {
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            that = Buffer._augment(new Uint8Array(length));
          } else {
            that.length = length;
            that._isBuffer = true;
          }
          var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1;
          if (fromPool)
            that.parent = rootParent;
          return that;
        }
        function checked(length) {
          if (length >= kMaxLength()) {
            throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
          }
          return length | 0;
        }
        function SlowBuffer(subject, encoding) {
          if (!(this instanceof SlowBuffer))
            return new SlowBuffer(subject, encoding);
          var buf = new Buffer(subject, encoding);
          delete buf.parent;
          return buf;
        }
        Buffer.isBuffer = function isBuffer(b) {
          return !!(b != null && b._isBuffer);
        };
        Buffer.compare = function compare(a, b) {
          if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
            throw new TypeError('Arguments must be Buffers');
          }
          if (a === b)
            return 0;
          var x = a.length;
          var y = b.length;
          var i = 0;
          var len = Math.min(x, y);
          while (i < len) {
            if (a[i] !== b[i])
              break;
            ++i;
          }
          if (i !== len) {
            x = a[i];
            y = b[i];
          }
          if (x < y)
            return -1;
          if (y < x)
            return 1;
          return 0;
        };
        Buffer.isEncoding = function isEncoding(encoding) {
          switch (String(encoding).toLowerCase()) {
            case 'hex':
            case 'utf8':
            case 'utf-8':
            case 'ascii':
            case 'binary':
            case 'base64':
            case 'raw':
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return true;
            default:
              return false;
          }
        };
        Buffer.concat = function concat(list, length) {
          if (!isArray(list))
            throw new TypeError('list argument must be an Array of Buffers.');
          if (list.length === 0) {
            return new Buffer(0);
          }
          var i;
          if (length === undefined) {
            length = 0;
            for (i = 0; i < list.length; i++) {
              length += list[i].length;
            }
          }
          var buf = new Buffer(length);
          var pos = 0;
          for (i = 0; i < list.length; i++) {
            var item = list[i];
            item.copy(buf, pos);
            pos += item.length;
          }
          return buf;
        };
        function byteLength(string, encoding) {
          if (typeof string !== 'string')
            string = '' + string;
          var len = string.length;
          if (len === 0)
            return 0;
          var loweredCase = false;
          for (; ; ) {
            switch (encoding) {
              case 'ascii':
              case 'binary':
              case 'raw':
              case 'raws':
                return len;
              case 'utf8':
              case 'utf-8':
                return utf8ToBytes(string).length;
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return len * 2;
              case 'hex':
                return len >>> 1;
              case 'base64':
                return base64ToBytes(string).length;
              default:
                if (loweredCase)
                  return utf8ToBytes(string).length;
                encoding = ('' + encoding).toLowerCase();
                loweredCase = true;
            }
          }
        }
        Buffer.byteLength = byteLength;
        Buffer.prototype.length = undefined;
        Buffer.prototype.parent = undefined;
        function slowToString(encoding, start, end) {
          var loweredCase = false;
          start = start | 0;
          end = end === undefined || end === Infinity ? this.length : end | 0;
          if (!encoding)
            encoding = 'utf8';
          if (start < 0)
            start = 0;
          if (end > this.length)
            end = this.length;
          if (end <= start)
            return '';
          while (true) {
            switch (encoding) {
              case 'hex':
                return hexSlice(this, start, end);
              case 'utf8':
              case 'utf-8':
                return utf8Slice(this, start, end);
              case 'ascii':
                return asciiSlice(this, start, end);
              case 'binary':
                return binarySlice(this, start, end);
              case 'base64':
                return base64Slice(this, start, end);
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return utf16leSlice(this, start, end);
              default:
                if (loweredCase)
                  throw new TypeError('Unknown encoding: ' + encoding);
                encoding = (encoding + '').toLowerCase();
                loweredCase = true;
            }
          }
        }
        Buffer.prototype.toString = function toString() {
          var length = this.length | 0;
          if (length === 0)
            return '';
          if (arguments.length === 0)
            return utf8Slice(this, 0, length);
          return slowToString.apply(this, arguments);
        };
        Buffer.prototype.equals = function equals(b) {
          if (!Buffer.isBuffer(b))
            throw new TypeError('Argument must be a Buffer');
          if (this === b)
            return true;
          return Buffer.compare(this, b) === 0;
        };
        Buffer.prototype.inspect = function inspect() {
          var str = '';
          var max = exports.INSPECT_MAX_BYTES;
          if (this.length > 0) {
            str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
            if (this.length > max)
              str += ' ... ';
          }
          return '<Buffer ' + str + '>';
        };
        Buffer.prototype.compare = function compare(b) {
          if (!Buffer.isBuffer(b))
            throw new TypeError('Argument must be a Buffer');
          if (this === b)
            return 0;
          return Buffer.compare(this, b);
        };
        Buffer.prototype.indexOf = function indexOf(val, byteOffset) {
          if (byteOffset > 0x7fffffff)
            byteOffset = 0x7fffffff;
          else if (byteOffset < -0x80000000)
            byteOffset = -0x80000000;
          byteOffset >>= 0;
          if (this.length === 0)
            return -1;
          if (byteOffset >= this.length)
            return -1;
          if (byteOffset < 0)
            byteOffset = Math.max(this.length + byteOffset, 0);
          if (typeof val === 'string') {
            if (val.length === 0)
              return -1;
            return String.prototype.indexOf.call(this, val, byteOffset);
          }
          if (Buffer.isBuffer(val)) {
            return arrayIndexOf(this, val, byteOffset);
          }
          if (typeof val === 'number') {
            if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
              return Uint8Array.prototype.indexOf.call(this, val, byteOffset);
            }
            return arrayIndexOf(this, [val], byteOffset);
          }
          function arrayIndexOf(arr, val, byteOffset) {
            var foundIndex = -1;
            for (var i = 0; byteOffset + i < arr.length; i++) {
              if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
                if (foundIndex === -1)
                  foundIndex = i;
                if (i - foundIndex + 1 === val.length)
                  return byteOffset + foundIndex;
              } else {
                foundIndex = -1;
              }
            }
            return -1;
          }
          throw new TypeError('val must be string, number or Buffer');
        };
        Buffer.prototype.get = function get(offset) {
          console.log('.get() is deprecated. Access using array indexes instead.');
          return this.readUInt8(offset);
        };
        Buffer.prototype.set = function set(v, offset) {
          console.log('.set() is deprecated. Access using array indexes instead.');
          return this.writeUInt8(v, offset);
        };
        function hexWrite(buf, string, offset, length) {
          offset = Number(offset) || 0;
          var remaining = buf.length - offset;
          if (!length) {
            length = remaining;
          } else {
            length = Number(length);
            if (length > remaining) {
              length = remaining;
            }
          }
          var strLen = string.length;
          if (strLen % 2 !== 0)
            throw new Error('Invalid hex string');
          if (length > strLen / 2) {
            length = strLen / 2;
          }
          for (var i = 0; i < length; i++) {
            var parsed = parseInt(string.substr(i * 2, 2), 16);
            if (isNaN(parsed))
              throw new Error('Invalid hex string');
            buf[offset + i] = parsed;
          }
          return i;
        }
        function utf8Write(buf, string, offset, length) {
          return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
        }
        function asciiWrite(buf, string, offset, length) {
          return blitBuffer(asciiToBytes(string), buf, offset, length);
        }
        function binaryWrite(buf, string, offset, length) {
          return asciiWrite(buf, string, offset, length);
        }
        function base64Write(buf, string, offset, length) {
          return blitBuffer(base64ToBytes(string), buf, offset, length);
        }
        function ucs2Write(buf, string, offset, length) {
          return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
        }
        Buffer.prototype.write = function write(string, offset, length, encoding) {
          if (offset === undefined) {
            encoding = 'utf8';
            length = this.length;
            offset = 0;
          } else if (length === undefined && typeof offset === 'string') {
            encoding = offset;
            length = this.length;
            offset = 0;
          } else if (isFinite(offset)) {
            offset = offset | 0;
            if (isFinite(length)) {
              length = length | 0;
              if (encoding === undefined)
                encoding = 'utf8';
            } else {
              encoding = length;
              length = undefined;
            }
          } else {
            var swap = encoding;
            encoding = offset;
            offset = length | 0;
            length = swap;
          }
          var remaining = this.length - offset;
          if (length === undefined || length > remaining)
            length = remaining;
          if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
            throw new RangeError('attempt to write outside buffer bounds');
          }
          if (!encoding)
            encoding = 'utf8';
          var loweredCase = false;
          for (; ; ) {
            switch (encoding) {
              case 'hex':
                return hexWrite(this, string, offset, length);
              case 'utf8':
              case 'utf-8':
                return utf8Write(this, string, offset, length);
              case 'ascii':
                return asciiWrite(this, string, offset, length);
              case 'binary':
                return binaryWrite(this, string, offset, length);
              case 'base64':
                return base64Write(this, string, offset, length);
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return ucs2Write(this, string, offset, length);
              default:
                if (loweredCase)
                  throw new TypeError('Unknown encoding: ' + encoding);
                encoding = ('' + encoding).toLowerCase();
                loweredCase = true;
            }
          }
        };
        Buffer.prototype.toJSON = function toJSON() {
          return {
            type: 'Buffer',
            data: Array.prototype.slice.call(this._arr || this, 0)
          };
        };
        function base64Slice(buf, start, end) {
          if (start === 0 && end === buf.length) {
            return base64.fromByteArray(buf);
          } else {
            return base64.fromByteArray(buf.slice(start, end));
          }
        }
        function utf8Slice(buf, start, end) {
          end = Math.min(buf.length, end);
          var res = [];
          var i = start;
          while (i < end) {
            var firstByte = buf[i];
            var codePoint = null;
            var bytesPerSequence = (firstByte > 0xEF) ? 4 : (firstByte > 0xDF) ? 3 : (firstByte > 0xBF) ? 2 : 1;
            if (i + bytesPerSequence <= end) {
              var secondByte,
                  thirdByte,
                  fourthByte,
                  tempCodePoint;
              switch (bytesPerSequence) {
                case 1:
                  if (firstByte < 0x80) {
                    codePoint = firstByte;
                  }
                  break;
                case 2:
                  secondByte = buf[i + 1];
                  if ((secondByte & 0xC0) === 0x80) {
                    tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
                    if (tempCodePoint > 0x7F) {
                      codePoint = tempCodePoint;
                    }
                  }
                  break;
                case 3:
                  secondByte = buf[i + 1];
                  thirdByte = buf[i + 2];
                  if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                    tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
                    if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                      codePoint = tempCodePoint;
                    }
                  }
                  break;
                case 4:
                  secondByte = buf[i + 1];
                  thirdByte = buf[i + 2];
                  fourthByte = buf[i + 3];
                  if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                    tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
                    if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                      codePoint = tempCodePoint;
                    }
                  }
              }
            }
            if (codePoint === null) {
              codePoint = 0xFFFD;
              bytesPerSequence = 1;
            } else if (codePoint > 0xFFFF) {
              codePoint -= 0x10000;
              res.push(codePoint >>> 10 & 0x3FF | 0xD800);
              codePoint = 0xDC00 | codePoint & 0x3FF;
            }
            res.push(codePoint);
            i += bytesPerSequence;
          }
          return decodeCodePointsArray(res);
        }
        var MAX_ARGUMENTS_LENGTH = 0x1000;
        function decodeCodePointsArray(codePoints) {
          var len = codePoints.length;
          if (len <= MAX_ARGUMENTS_LENGTH) {
            return String.fromCharCode.apply(String, codePoints);
          }
          var res = '';
          var i = 0;
          while (i < len) {
            res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
          }
          return res;
        }
        function asciiSlice(buf, start, end) {
          var ret = '';
          end = Math.min(buf.length, end);
          for (var i = start; i < end; i++) {
            ret += String.fromCharCode(buf[i] & 0x7F);
          }
          return ret;
        }
        function binarySlice(buf, start, end) {
          var ret = '';
          end = Math.min(buf.length, end);
          for (var i = start; i < end; i++) {
            ret += String.fromCharCode(buf[i]);
          }
          return ret;
        }
        function hexSlice(buf, start, end) {
          var len = buf.length;
          if (!start || start < 0)
            start = 0;
          if (!end || end < 0 || end > len)
            end = len;
          var out = '';
          for (var i = start; i < end; i++) {
            out += toHex(buf[i]);
          }
          return out;
        }
        function utf16leSlice(buf, start, end) {
          var bytes = buf.slice(start, end);
          var res = '';
          for (var i = 0; i < bytes.length; i += 2) {
            res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
          }
          return res;
        }
        Buffer.prototype.slice = function slice(start, end) {
          var len = this.length;
          start = ~~start;
          end = end === undefined ? len : ~~end;
          if (start < 0) {
            start += len;
            if (start < 0)
              start = 0;
          } else if (start > len) {
            start = len;
          }
          if (end < 0) {
            end += len;
            if (end < 0)
              end = 0;
          } else if (end > len) {
            end = len;
          }
          if (end < start)
            end = start;
          var newBuf;
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            newBuf = Buffer._augment(this.subarray(start, end));
          } else {
            var sliceLen = end - start;
            newBuf = new Buffer(sliceLen, undefined);
            for (var i = 0; i < sliceLen; i++) {
              newBuf[i] = this[i + start];
            }
          }
          if (newBuf.length)
            newBuf.parent = this.parent || this;
          return newBuf;
        };
        function checkOffset(offset, ext, length) {
          if ((offset % 1) !== 0 || offset < 0)
            throw new RangeError('offset is not uint');
          if (offset + ext > length)
            throw new RangeError('Trying to access beyond buffer length');
        }
        Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
          offset = offset | 0;
          byteLength = byteLength | 0;
          if (!noAssert)
            checkOffset(offset, byteLength, this.length);
          var val = this[offset];
          var mul = 1;
          var i = 0;
          while (++i < byteLength && (mul *= 0x100)) {
            val += this[offset + i] * mul;
          }
          return val;
        };
        Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
          offset = offset | 0;
          byteLength = byteLength | 0;
          if (!noAssert) {
            checkOffset(offset, byteLength, this.length);
          }
          var val = this[offset + --byteLength];
          var mul = 1;
          while (byteLength > 0 && (mul *= 0x100)) {
            val += this[offset + --byteLength] * mul;
          }
          return val;
        };
        Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 1, this.length);
          return this[offset];
        };
        Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 2, this.length);
          return this[offset] | (this[offset + 1] << 8);
        };
        Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 2, this.length);
          return (this[offset] << 8) | this[offset + 1];
        };
        Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 4, this.length);
          return ((this[offset]) | (this[offset + 1] << 8) | (this[offset + 2] << 16)) + (this[offset + 3] * 0x1000000);
        };
        Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 4, this.length);
          return (this[offset] * 0x1000000) + ((this[offset + 1] << 16) | (this[offset + 2] << 8) | this[offset + 3]);
        };
        Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
          offset = offset | 0;
          byteLength = byteLength | 0;
          if (!noAssert)
            checkOffset(offset, byteLength, this.length);
          var val = this[offset];
          var mul = 1;
          var i = 0;
          while (++i < byteLength && (mul *= 0x100)) {
            val += this[offset + i] * mul;
          }
          mul *= 0x80;
          if (val >= mul)
            val -= Math.pow(2, 8 * byteLength);
          return val;
        };
        Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
          offset = offset | 0;
          byteLength = byteLength | 0;
          if (!noAssert)
            checkOffset(offset, byteLength, this.length);
          var i = byteLength;
          var mul = 1;
          var val = this[offset + --i];
          while (i > 0 && (mul *= 0x100)) {
            val += this[offset + --i] * mul;
          }
          mul *= 0x80;
          if (val >= mul)
            val -= Math.pow(2, 8 * byteLength);
          return val;
        };
        Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 1, this.length);
          if (!(this[offset] & 0x80))
            return (this[offset]);
          return ((0xff - this[offset] + 1) * -1);
        };
        Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 2, this.length);
          var val = this[offset] | (this[offset + 1] << 8);
          return (val & 0x8000) ? val | 0xFFFF0000 : val;
        };
        Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 2, this.length);
          var val = this[offset + 1] | (this[offset] << 8);
          return (val & 0x8000) ? val | 0xFFFF0000 : val;
        };
        Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 4, this.length);
          return (this[offset]) | (this[offset + 1] << 8) | (this[offset + 2] << 16) | (this[offset + 3] << 24);
        };
        Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 4, this.length);
          return (this[offset] << 24) | (this[offset + 1] << 16) | (this[offset + 2] << 8) | (this[offset + 3]);
        };
        Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 4, this.length);
          return ieee754.read(this, offset, true, 23, 4);
        };
        Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 4, this.length);
          return ieee754.read(this, offset, false, 23, 4);
        };
        Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 8, this.length);
          return ieee754.read(this, offset, true, 52, 8);
        };
        Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 8, this.length);
          return ieee754.read(this, offset, false, 52, 8);
        };
        function checkInt(buf, value, offset, ext, max, min) {
          if (!Buffer.isBuffer(buf))
            throw new TypeError('buffer must be a Buffer instance');
          if (value > max || value < min)
            throw new RangeError('value is out of bounds');
          if (offset + ext > buf.length)
            throw new RangeError('index out of range');
        }
        Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
          value = +value;
          offset = offset | 0;
          byteLength = byteLength | 0;
          if (!noAssert)
            checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0);
          var mul = 1;
          var i = 0;
          this[offset] = value & 0xFF;
          while (++i < byteLength && (mul *= 0x100)) {
            this[offset + i] = (value / mul) & 0xFF;
          }
          return offset + byteLength;
        };
        Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
          value = +value;
          offset = offset | 0;
          byteLength = byteLength | 0;
          if (!noAssert)
            checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0);
          var i = byteLength - 1;
          var mul = 1;
          this[offset + i] = value & 0xFF;
          while (--i >= 0 && (mul *= 0x100)) {
            this[offset + i] = (value / mul) & 0xFF;
          }
          return offset + byteLength;
        };
        Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 1, 0xff, 0);
          if (!Buffer.TYPED_ARRAY_SUPPORT)
            value = Math.floor(value);
          this[offset] = value;
          return offset + 1;
        };
        function objectWriteUInt16(buf, value, offset, littleEndian) {
          if (value < 0)
            value = 0xffff + value + 1;
          for (var i = 0,
              j = Math.min(buf.length - offset, 2); i < j; i++) {
            buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>> (littleEndian ? i : 1 - i) * 8;
          }
        }
        Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 2, 0xffff, 0);
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset] = value;
            this[offset + 1] = (value >>> 8);
          } else {
            objectWriteUInt16(this, value, offset, true);
          }
          return offset + 2;
        };
        Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 2, 0xffff, 0);
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset] = (value >>> 8);
            this[offset + 1] = value;
          } else {
            objectWriteUInt16(this, value, offset, false);
          }
          return offset + 2;
        };
        function objectWriteUInt32(buf, value, offset, littleEndian) {
          if (value < 0)
            value = 0xffffffff + value + 1;
          for (var i = 0,
              j = Math.min(buf.length - offset, 4); i < j; i++) {
            buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
          }
        }
        Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 4, 0xffffffff, 0);
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset + 3] = (value >>> 24);
            this[offset + 2] = (value >>> 16);
            this[offset + 1] = (value >>> 8);
            this[offset] = value;
          } else {
            objectWriteUInt32(this, value, offset, true);
          }
          return offset + 4;
        };
        Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 4, 0xffffffff, 0);
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset] = (value >>> 24);
            this[offset + 1] = (value >>> 16);
            this[offset + 2] = (value >>> 8);
            this[offset + 3] = value;
          } else {
            objectWriteUInt32(this, value, offset, false);
          }
          return offset + 4;
        };
        Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert) {
            var limit = Math.pow(2, 8 * byteLength - 1);
            checkInt(this, value, offset, byteLength, limit - 1, -limit);
          }
          var i = 0;
          var mul = 1;
          var sub = value < 0 ? 1 : 0;
          this[offset] = value & 0xFF;
          while (++i < byteLength && (mul *= 0x100)) {
            this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
          }
          return offset + byteLength;
        };
        Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert) {
            var limit = Math.pow(2, 8 * byteLength - 1);
            checkInt(this, value, offset, byteLength, limit - 1, -limit);
          }
          var i = byteLength - 1;
          var mul = 1;
          var sub = value < 0 ? 1 : 0;
          this[offset + i] = value & 0xFF;
          while (--i >= 0 && (mul *= 0x100)) {
            this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
          }
          return offset + byteLength;
        };
        Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 1, 0x7f, -0x80);
          if (!Buffer.TYPED_ARRAY_SUPPORT)
            value = Math.floor(value);
          if (value < 0)
            value = 0xff + value + 1;
          this[offset] = value;
          return offset + 1;
        };
        Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 2, 0x7fff, -0x8000);
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset] = value;
            this[offset + 1] = (value >>> 8);
          } else {
            objectWriteUInt16(this, value, offset, true);
          }
          return offset + 2;
        };
        Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 2, 0x7fff, -0x8000);
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset] = (value >>> 8);
            this[offset + 1] = value;
          } else {
            objectWriteUInt16(this, value, offset, false);
          }
          return offset + 2;
        };
        Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset] = value;
            this[offset + 1] = (value >>> 8);
            this[offset + 2] = (value >>> 16);
            this[offset + 3] = (value >>> 24);
          } else {
            objectWriteUInt32(this, value, offset, true);
          }
          return offset + 4;
        };
        Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
          if (value < 0)
            value = 0xffffffff + value + 1;
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset] = (value >>> 24);
            this[offset + 1] = (value >>> 16);
            this[offset + 2] = (value >>> 8);
            this[offset + 3] = value;
          } else {
            objectWriteUInt32(this, value, offset, false);
          }
          return offset + 4;
        };
        function checkIEEE754(buf, value, offset, ext, max, min) {
          if (value > max || value < min)
            throw new RangeError('value is out of bounds');
          if (offset + ext > buf.length)
            throw new RangeError('index out of range');
          if (offset < 0)
            throw new RangeError('index out of range');
        }
        function writeFloat(buf, value, offset, littleEndian, noAssert) {
          if (!noAssert) {
            checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
          }
          ieee754.write(buf, value, offset, littleEndian, 23, 4);
          return offset + 4;
        }
        Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
          return writeFloat(this, value, offset, true, noAssert);
        };
        Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
          return writeFloat(this, value, offset, false, noAssert);
        };
        function writeDouble(buf, value, offset, littleEndian, noAssert) {
          if (!noAssert) {
            checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
          }
          ieee754.write(buf, value, offset, littleEndian, 52, 8);
          return offset + 8;
        }
        Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
          return writeDouble(this, value, offset, true, noAssert);
        };
        Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
          return writeDouble(this, value, offset, false, noAssert);
        };
        Buffer.prototype.copy = function copy(target, targetStart, start, end) {
          if (!start)
            start = 0;
          if (!end && end !== 0)
            end = this.length;
          if (targetStart >= target.length)
            targetStart = target.length;
          if (!targetStart)
            targetStart = 0;
          if (end > 0 && end < start)
            end = start;
          if (end === start)
            return 0;
          if (target.length === 0 || this.length === 0)
            return 0;
          if (targetStart < 0) {
            throw new RangeError('targetStart out of bounds');
          }
          if (start < 0 || start >= this.length)
            throw new RangeError('sourceStart out of bounds');
          if (end < 0)
            throw new RangeError('sourceEnd out of bounds');
          if (end > this.length)
            end = this.length;
          if (target.length - targetStart < end - start) {
            end = target.length - targetStart + start;
          }
          var len = end - start;
          var i;
          if (this === target && start < targetStart && targetStart < end) {
            for (i = len - 1; i >= 0; i--) {
              target[i + targetStart] = this[i + start];
            }
          } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
            for (i = 0; i < len; i++) {
              target[i + targetStart] = this[i + start];
            }
          } else {
            target._set(this.subarray(start, start + len), targetStart);
          }
          return len;
        };
        Buffer.prototype.fill = function fill(value, start, end) {
          if (!value)
            value = 0;
          if (!start)
            start = 0;
          if (!end)
            end = this.length;
          if (end < start)
            throw new RangeError('end < start');
          if (end === start)
            return;
          if (this.length === 0)
            return;
          if (start < 0 || start >= this.length)
            throw new RangeError('start out of bounds');
          if (end < 0 || end > this.length)
            throw new RangeError('end out of bounds');
          var i;
          if (typeof value === 'number') {
            for (i = start; i < end; i++) {
              this[i] = value;
            }
          } else {
            var bytes = utf8ToBytes(value.toString());
            var len = bytes.length;
            for (i = start; i < end; i++) {
              this[i] = bytes[i % len];
            }
          }
          return this;
        };
        Buffer.prototype.toArrayBuffer = function toArrayBuffer() {
          if (typeof Uint8Array !== 'undefined') {
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              return (new Buffer(this)).buffer;
            } else {
              var buf = new Uint8Array(this.length);
              for (var i = 0,
                  len = buf.length; i < len; i += 1) {
                buf[i] = this[i];
              }
              return buf.buffer;
            }
          } else {
            throw new TypeError('Buffer.toArrayBuffer not supported in this browser');
          }
        };
        var BP = Buffer.prototype;
        Buffer._augment = function _augment(arr) {
          arr.constructor = Buffer;
          arr._isBuffer = true;
          arr._set = arr.set;
          arr.get = BP.get;
          arr.set = BP.set;
          arr.write = BP.write;
          arr.toString = BP.toString;
          arr.toLocaleString = BP.toString;
          arr.toJSON = BP.toJSON;
          arr.equals = BP.equals;
          arr.compare = BP.compare;
          arr.indexOf = BP.indexOf;
          arr.copy = BP.copy;
          arr.slice = BP.slice;
          arr.readUIntLE = BP.readUIntLE;
          arr.readUIntBE = BP.readUIntBE;
          arr.readUInt8 = BP.readUInt8;
          arr.readUInt16LE = BP.readUInt16LE;
          arr.readUInt16BE = BP.readUInt16BE;
          arr.readUInt32LE = BP.readUInt32LE;
          arr.readUInt32BE = BP.readUInt32BE;
          arr.readIntLE = BP.readIntLE;
          arr.readIntBE = BP.readIntBE;
          arr.readInt8 = BP.readInt8;
          arr.readInt16LE = BP.readInt16LE;
          arr.readInt16BE = BP.readInt16BE;
          arr.readInt32LE = BP.readInt32LE;
          arr.readInt32BE = BP.readInt32BE;
          arr.readFloatLE = BP.readFloatLE;
          arr.readFloatBE = BP.readFloatBE;
          arr.readDoubleLE = BP.readDoubleLE;
          arr.readDoubleBE = BP.readDoubleBE;
          arr.writeUInt8 = BP.writeUInt8;
          arr.writeUIntLE = BP.writeUIntLE;
          arr.writeUIntBE = BP.writeUIntBE;
          arr.writeUInt16LE = BP.writeUInt16LE;
          arr.writeUInt16BE = BP.writeUInt16BE;
          arr.writeUInt32LE = BP.writeUInt32LE;
          arr.writeUInt32BE = BP.writeUInt32BE;
          arr.writeIntLE = BP.writeIntLE;
          arr.writeIntBE = BP.writeIntBE;
          arr.writeInt8 = BP.writeInt8;
          arr.writeInt16LE = BP.writeInt16LE;
          arr.writeInt16BE = BP.writeInt16BE;
          arr.writeInt32LE = BP.writeInt32LE;
          arr.writeInt32BE = BP.writeInt32BE;
          arr.writeFloatLE = BP.writeFloatLE;
          arr.writeFloatBE = BP.writeFloatBE;
          arr.writeDoubleLE = BP.writeDoubleLE;
          arr.writeDoubleBE = BP.writeDoubleBE;
          arr.fill = BP.fill;
          arr.inspect = BP.inspect;
          arr.toArrayBuffer = BP.toArrayBuffer;
          return arr;
        };
        var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
        function base64clean(str) {
          str = stringtrim(str).replace(INVALID_BASE64_RE, '');
          if (str.length < 2)
            return '';
          while (str.length % 4 !== 0) {
            str = str + '=';
          }
          return str;
        }
        function stringtrim(str) {
          if (str.trim)
            return str.trim();
          return str.replace(/^\s+|\s+$/g, '');
        }
        function toHex(n) {
          if (n < 16)
            return '0' + n.toString(16);
          return n.toString(16);
        }
        function utf8ToBytes(string, units) {
          units = units || Infinity;
          var codePoint;
          var length = string.length;
          var leadSurrogate = null;
          var bytes = [];
          for (var i = 0; i < length; i++) {
            codePoint = string.charCodeAt(i);
            if (codePoint > 0xD7FF && codePoint < 0xE000) {
              if (!leadSurrogate) {
                if (codePoint > 0xDBFF) {
                  if ((units -= 3) > -1)
                    bytes.push(0xEF, 0xBF, 0xBD);
                  continue;
                } else if (i + 1 === length) {
                  if ((units -= 3) > -1)
                    bytes.push(0xEF, 0xBF, 0xBD);
                  continue;
                }
                leadSurrogate = codePoint;
                continue;
              }
              if (codePoint < 0xDC00) {
                if ((units -= 3) > -1)
                  bytes.push(0xEF, 0xBF, 0xBD);
                leadSurrogate = codePoint;
                continue;
              }
              codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000;
            } else if (leadSurrogate) {
              if ((units -= 3) > -1)
                bytes.push(0xEF, 0xBF, 0xBD);
            }
            leadSurrogate = null;
            if (codePoint < 0x80) {
              if ((units -= 1) < 0)
                break;
              bytes.push(codePoint);
            } else if (codePoint < 0x800) {
              if ((units -= 2) < 0)
                break;
              bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
            } else if (codePoint < 0x10000) {
              if ((units -= 3) < 0)
                break;
              bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
            } else if (codePoint < 0x110000) {
              if ((units -= 4) < 0)
                break;
              bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
            } else {
              throw new Error('Invalid code point');
            }
          }
          return bytes;
        }
        function asciiToBytes(str) {
          var byteArray = [];
          for (var i = 0; i < str.length; i++) {
            byteArray.push(str.charCodeAt(i) & 0xFF);
          }
          return byteArray;
        }
        function utf16leToBytes(str, units) {
          var c,
              hi,
              lo;
          var byteArray = [];
          for (var i = 0; i < str.length; i++) {
            if ((units -= 2) < 0)
              break;
            c = str.charCodeAt(i);
            hi = c >> 8;
            lo = c % 256;
            byteArray.push(lo);
            byteArray.push(hi);
          }
          return byteArray;
        }
        function base64ToBytes(str) {
          return base64.toByteArray(base64clean(str));
        }
        function blitBuffer(src, dst, offset, length) {
          for (var i = 0; i < length; i++) {
            if ((i + offset >= dst.length) || (i >= src.length))
              break;
            dst[i + offset] = src[i];
          }
          return i;
        }
      }, {
        "base64-js": 16,
        "ieee754": 17,
        "is-array": 18
      }],
      16: [function(require, module, exports) {
        var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        ;
        (function(exports) {
          'use strict';
          var Arr = (typeof Uint8Array !== 'undefined') ? Uint8Array : Array;
          var PLUS = '+'.charCodeAt(0);
          var SLASH = '/'.charCodeAt(0);
          var NUMBER = '0'.charCodeAt(0);
          var LOWER = 'a'.charCodeAt(0);
          var UPPER = 'A'.charCodeAt(0);
          var PLUS_URL_SAFE = '-'.charCodeAt(0);
          var SLASH_URL_SAFE = '_'.charCodeAt(0);
          function decode(elt) {
            var code = elt.charCodeAt(0);
            if (code === PLUS || code === PLUS_URL_SAFE)
              return 62;
            if (code === SLASH || code === SLASH_URL_SAFE)
              return 63;
            if (code < NUMBER)
              return -1;
            if (code < NUMBER + 10)
              return code - NUMBER + 26 + 26;
            if (code < UPPER + 26)
              return code - UPPER;
            if (code < LOWER + 26)
              return code - LOWER + 26;
          }
          function b64ToByteArray(b64) {
            var i,
                j,
                l,
                tmp,
                placeHolders,
                arr;
            if (b64.length % 4 > 0) {
              throw new Error('Invalid string. Length must be a multiple of 4');
            }
            var len = b64.length;
            placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0;
            arr = new Arr(b64.length * 3 / 4 - placeHolders);
            l = placeHolders > 0 ? b64.length - 4 : b64.length;
            var L = 0;
            function push(v) {
              arr[L++] = v;
            }
            for (i = 0, j = 0; i < l; i += 4, j += 3) {
              tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3));
              push((tmp & 0xFF0000) >> 16);
              push((tmp & 0xFF00) >> 8);
              push(tmp & 0xFF);
            }
            if (placeHolders === 2) {
              tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4);
              push(tmp & 0xFF);
            } else if (placeHolders === 1) {
              tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2);
              push((tmp >> 8) & 0xFF);
              push(tmp & 0xFF);
            }
            return arr;
          }
          function uint8ToBase64(uint8) {
            var i,
                extraBytes = uint8.length % 3,
                output = "",
                temp,
                length;
            function encode(num) {
              return lookup.charAt(num);
            }
            function tripletToBase64(num) {
              return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F);
            }
            for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
              temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
              output += tripletToBase64(temp);
            }
            switch (extraBytes) {
              case 1:
                temp = uint8[uint8.length - 1];
                output += encode(temp >> 2);
                output += encode((temp << 4) & 0x3F);
                output += '==';
                break;
              case 2:
                temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1]);
                output += encode(temp >> 10);
                output += encode((temp >> 4) & 0x3F);
                output += encode((temp << 2) & 0x3F);
                output += '=';
                break;
            }
            return output;
          }
          exports.toByteArray = b64ToByteArray;
          exports.fromByteArray = uint8ToBase64;
        }(typeof exports === 'undefined' ? (this.base64js = {}) : exports));
      }, {}],
      17: [function(require, module, exports) {
        exports.read = function(buffer, offset, isLE, mLen, nBytes) {
          var e,
              m;
          var eLen = nBytes * 8 - mLen - 1;
          var eMax = (1 << eLen) - 1;
          var eBias = eMax >> 1;
          var nBits = -7;
          var i = isLE ? (nBytes - 1) : 0;
          var d = isLE ? -1 : 1;
          var s = buffer[offset + i];
          i += d;
          e = s & ((1 << (-nBits)) - 1);
          s >>= (-nBits);
          nBits += eLen;
          for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
          m = e & ((1 << (-nBits)) - 1);
          e >>= (-nBits);
          nBits += mLen;
          for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
          if (e === 0) {
            e = 1 - eBias;
          } else if (e === eMax) {
            return m ? NaN : ((s ? -1 : 1) * Infinity);
          } else {
            m = m + Math.pow(2, mLen);
            e = e - eBias;
          }
          return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
        };
        exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
          var e,
              m,
              c;
          var eLen = nBytes * 8 - mLen - 1;
          var eMax = (1 << eLen) - 1;
          var eBias = eMax >> 1;
          var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
          var i = isLE ? 0 : (nBytes - 1);
          var d = isLE ? 1 : -1;
          var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;
          value = Math.abs(value);
          if (isNaN(value) || value === Infinity) {
            m = isNaN(value) ? 1 : 0;
            e = eMax;
          } else {
            e = Math.floor(Math.log(value) / Math.LN2);
            if (value * (c = Math.pow(2, -e)) < 1) {
              e--;
              c *= 2;
            }
            if (e + eBias >= 1) {
              value += rt / c;
            } else {
              value += rt * Math.pow(2, 1 - eBias);
            }
            if (value * c >= 2) {
              e++;
              c /= 2;
            }
            if (e + eBias >= eMax) {
              m = 0;
              e = eMax;
            } else if (e + eBias >= 1) {
              m = (value * c - 1) * Math.pow(2, mLen);
              e = e + eBias;
            } else {
              m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
              e = 0;
            }
          }
          for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
          e = (e << mLen) | m;
          eLen += mLen;
          for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
          buffer[offset + i - d] |= s * 128;
        };
      }, {}],
      18: [function(require, module, exports) {
        var isArray = Array.isArray;
        var str = Object.prototype.toString;
        module.exports = isArray || function(val) {
          return !!val && '[object Array]' == str.call(val);
        };
      }, {}],
      19: [function(require, module, exports) {
        (function() {
          "use strict";
          function CookieAccessInfo(domain, path, secure, script) {
            if (this instanceof CookieAccessInfo) {
              this.domain = domain || undefined;
              this.path = path || "/";
              this.secure = !!secure;
              this.script = !!script;
              return this;
            }
            return new CookieAccessInfo(domain, path, secure, script);
          }
          exports.CookieAccessInfo = CookieAccessInfo;
          function Cookie(cookiestr, request_domain, request_path) {
            if (cookiestr instanceof Cookie) {
              return cookiestr;
            }
            if (this instanceof Cookie) {
              this.name = null;
              this.value = null;
              this.expiration_date = Infinity;
              this.path = String(request_path || "/");
              this.explicit_path = false;
              this.domain = request_domain || null;
              this.explicit_domain = false;
              this.secure = false;
              this.noscript = false;
              if (cookiestr) {
                this.parse(cookiestr, request_domain, request_path);
              }
              return this;
            }
            return new Cookie(cookiestr, request_domain, request_path);
          }
          exports.Cookie = Cookie;
          Cookie.prototype.toString = function toString() {
            var str = [this.name + "=" + this.value];
            if (this.expiration_date !== Infinity) {
              str.push("expires=" + (new Date(this.expiration_date)).toGMTString());
            }
            if (this.domain) {
              str.push("domain=" + this.domain);
            }
            if (this.path) {
              str.push("path=" + this.path);
            }
            if (this.secure) {
              str.push("secure");
            }
            if (this.noscript) {
              str.push("httponly");
            }
            return str.join("; ");
          };
          Cookie.prototype.toValueString = function toValueString() {
            return this.name + "=" + this.value;
          };
          var cookie_str_splitter = /[:](?=\s*[a-zA-Z0-9_\-]+\s*[=])/g;
          Cookie.prototype.parse = function parse(str, request_domain, request_path) {
            if (this instanceof Cookie) {
              var parts = str.split(";").filter(function(value) {
                return !!value;
              }),
                  pair = parts[0].match(/([^=]+)=([\s\S]*)/),
                  key = pair[1],
                  value = pair[2],
                  i;
              this.name = key;
              this.value = value;
              for (i = 1; i < parts.length; i += 1) {
                pair = parts[i].match(/([^=]+)(?:=([\s\S]*))?/);
                key = pair[1].trim().toLowerCase();
                value = pair[2];
                switch (key) {
                  case "httponly":
                    this.noscript = true;
                    break;
                  case "expires":
                    this.expiration_date = value ? Number(Date.parse(value)) : Infinity;
                    break;
                  case "path":
                    this.path = value ? value.trim() : "";
                    this.explicit_path = true;
                    break;
                  case "domain":
                    this.domain = value ? value.trim() : "";
                    this.explicit_domain = !!this.domain;
                    break;
                  case "secure":
                    this.secure = true;
                    break;
                }
              }
              if (!this.explicit_path) {
                this.path = request_path || "/";
              }
              if (!this.explicit_domain) {
                this.domain = request_domain;
              }
              return this;
            }
            return new Cookie().parse(str, request_domain, request_path);
          };
          Cookie.prototype.matches = function matches(access_info) {
            if (this.noscript && access_info.script || this.secure && !access_info.secure || !this.collidesWith(access_info)) {
              return false;
            }
            return true;
          };
          Cookie.prototype.collidesWith = function collidesWith(access_info) {
            if ((this.path && !access_info.path) || (this.domain && !access_info.domain)) {
              return false;
            }
            if (this.path && access_info.path.indexOf(this.path) !== 0) {
              return false;
            }
            if (this.explicit_path && access_info.path.indexOf(this.path) !== 0) {
              return false;
            }
            var access_domain = access_info.domain && access_info.domain.replace(/^[\.]/, '');
            var cookie_domain = this.domain && this.domain.replace(/^[\.]/, '');
            if (cookie_domain === access_domain) {
              return true;
            }
            if (cookie_domain) {
              if (!this.explicit_domain) {
                return false;
              }
              var wildcard = access_domain.indexOf(cookie_domain);
              if (wildcard === -1 || wildcard !== access_domain.length - cookie_domain.length) {
                return false;
              }
              return true;
            }
            return true;
          };
          function CookieJar() {
            var cookies,
                cookies_list,
                collidable_cookie;
            if (this instanceof CookieJar) {
              cookies = Object.create(null);
              this.setCookie = function setCookie(cookie, request_domain, request_path) {
                var remove,
                    i;
                cookie = new Cookie(cookie, request_domain, request_path);
                remove = cookie.expiration_date <= Date.now();
                if (cookies[cookie.name] !== undefined) {
                  cookies_list = cookies[cookie.name];
                  for (i = 0; i < cookies_list.length; i += 1) {
                    collidable_cookie = cookies_list[i];
                    if (collidable_cookie.collidesWith(cookie)) {
                      if (remove) {
                        cookies_list.splice(i, 1);
                        if (cookies_list.length === 0) {
                          delete cookies[cookie.name];
                        }
                        return false;
                      }
                      cookies_list[i] = cookie;
                      return cookie;
                    }
                  }
                  if (remove) {
                    return false;
                  }
                  cookies_list.push(cookie);
                  return cookie;
                }
                if (remove) {
                  return false;
                }
                cookies[cookie.name] = [cookie];
                return cookies[cookie.name];
              };
              this.getCookie = function getCookie(cookie_name, access_info) {
                var cookie,
                    i;
                cookies_list = cookies[cookie_name];
                if (!cookies_list) {
                  return;
                }
                for (i = 0; i < cookies_list.length; i += 1) {
                  cookie = cookies_list[i];
                  if (cookie.expiration_date <= Date.now()) {
                    if (cookies_list.length === 0) {
                      delete cookies[cookie.name];
                    }
                    continue;
                  }
                  if (cookie.matches(access_info)) {
                    return cookie;
                  }
                }
              };
              this.getCookies = function getCookies(access_info) {
                var matches = [],
                    cookie_name,
                    cookie;
                for (cookie_name in cookies) {
                  cookie = this.getCookie(cookie_name, access_info);
                  if (cookie) {
                    matches.push(cookie);
                  }
                }
                matches.toString = function toString() {
                  return matches.join(":");
                };
                matches.toValueString = function toValueString() {
                  return matches.map(function(c) {
                    return c.toValueString();
                  }).join(';');
                };
                return matches;
              };
              return this;
            }
            return new CookieJar();
          }
          exports.CookieJar = CookieJar;
          CookieJar.prototype.setCookies = function setCookies(cookies, request_domain, request_path) {
            cookies = Array.isArray(cookies) ? cookies : cookies.split(cookie_str_splitter);
            var successful = [],
                i,
                cookie;
            cookies = cookies.map(function(item) {
              return new Cookie(item, request_domain, request_path);
            });
            for (i = 0; i < cookies.length; i += 1) {
              cookie = cookies[i];
              if (this.setCookie(cookie, request_domain, request_path)) {
                successful.push(cookie);
              }
            }
            return successful;
          };
        }());
      }, {}],
      20: [function(require, module, exports) {
        'use strict';
        var yaml = require('./lib/js-yaml');
        module.exports = yaml;
      }, {"./lib/js-yaml.js": 21}],
      21: [function(require, module, exports) {
        'use strict';
        var loader = require('./js-yaml/loader');
        var dumper = require('./js-yaml/dumper');
        function deprecated(name) {
          return function() {
            throw new Error('Function ' + name + ' is deprecated and cannot be used.');
          };
        }
        module.exports.Type = require('./js-yaml/type');
        module.exports.Schema = require('./js-yaml/schema');
        module.exports.FAILSAFE_SCHEMA = require('./js-yaml/schema/failsafe');
        module.exports.JSON_SCHEMA = require('./js-yaml/schema/json');
        module.exports.CORE_SCHEMA = require('./js-yaml/schema/core');
        module.exports.DEFAULT_SAFE_SCHEMA = require('./js-yaml/schema/default_safe');
        module.exports.DEFAULT_FULL_SCHEMA = require('./js-yaml/schema/default_full');
        module.exports.load = loader.load;
        module.exports.loadAll = loader.loadAll;
        module.exports.safeLoad = loader.safeLoad;
        module.exports.safeLoadAll = loader.safeLoadAll;
        module.exports.dump = dumper.dump;
        module.exports.safeDump = dumper.safeDump;
        module.exports.YAMLException = require('./js-yaml/exception');
        module.exports.MINIMAL_SCHEMA = require('./js-yaml/schema/failsafe');
        module.exports.SAFE_SCHEMA = require('./js-yaml/schema/default_safe');
        module.exports.DEFAULT_SCHEMA = require('./js-yaml/schema/default_full');
        module.exports.scan = deprecated('scan');
        module.exports.parse = deprecated('parse');
        module.exports.compose = deprecated('compose');
        module.exports.addConstructor = deprecated('addConstructor');
      }, {
        "./js-yaml/dumper": 23,
        "./js-yaml/exception": 24,
        "./js-yaml/loader": 25,
        "./js-yaml/schema": 27,
        "./js-yaml/schema/core": 28,
        "./js-yaml/schema/default_full": 29,
        "./js-yaml/schema/default_safe": 30,
        "./js-yaml/schema/failsafe": 31,
        "./js-yaml/schema/json": 32,
        "./js-yaml/type": 33
      }],
      22: [function(require, module, exports) {
        'use strict';
        function isNothing(subject) {
          return (typeof subject === 'undefined') || (subject === null);
        }
        function isObject(subject) {
          return (typeof subject === 'object') && (subject !== null);
        }
        function toArray(sequence) {
          if (Array.isArray(sequence))
            return sequence;
          else if (isNothing(sequence))
            return [];
          return [sequence];
        }
        function extend(target, source) {
          var index,
              length,
              key,
              sourceKeys;
          if (source) {
            sourceKeys = Object.keys(source);
            for (index = 0, length = sourceKeys.length; index < length; index += 1) {
              key = sourceKeys[index];
              target[key] = source[key];
            }
          }
          return target;
        }
        function repeat(string, count) {
          var result = '',
              cycle;
          for (cycle = 0; cycle < count; cycle += 1) {
            result += string;
          }
          return result;
        }
        function isNegativeZero(number) {
          return (number === 0) && (Number.NEGATIVE_INFINITY === 1 / number);
        }
        module.exports.isNothing = isNothing;
        module.exports.isObject = isObject;
        module.exports.toArray = toArray;
        module.exports.repeat = repeat;
        module.exports.isNegativeZero = isNegativeZero;
        module.exports.extend = extend;
      }, {}],
      23: [function(require, module, exports) {
        'use strict';
        var common = require('./common');
        var YAMLException = require('./exception');
        var DEFAULT_FULL_SCHEMA = require('./schema/default_full');
        var DEFAULT_SAFE_SCHEMA = require('./schema/default_safe');
        var _toString = Object.prototype.toString;
        var _hasOwnProperty = Object.prototype.hasOwnProperty;
        var CHAR_TAB = 0x09;
        var CHAR_LINE_FEED = 0x0A;
        var CHAR_CARRIAGE_RETURN = 0x0D;
        var CHAR_SPACE = 0x20;
        var CHAR_EXCLAMATION = 0x21;
        var CHAR_DOUBLE_QUOTE = 0x22;
        var CHAR_SHARP = 0x23;
        var CHAR_PERCENT = 0x25;
        var CHAR_AMPERSAND = 0x26;
        var CHAR_SINGLE_QUOTE = 0x27;
        var CHAR_ASTERISK = 0x2A;
        var CHAR_COMMA = 0x2C;
        var CHAR_MINUS = 0x2D;
        var CHAR_COLON = 0x3A;
        var CHAR_GREATER_THAN = 0x3E;
        var CHAR_QUESTION = 0x3F;
        var CHAR_COMMERCIAL_AT = 0x40;
        var CHAR_LEFT_SQUARE_BRACKET = 0x5B;
        var CHAR_RIGHT_SQUARE_BRACKET = 0x5D;
        var CHAR_GRAVE_ACCENT = 0x60;
        var CHAR_LEFT_CURLY_BRACKET = 0x7B;
        var CHAR_VERTICAL_LINE = 0x7C;
        var CHAR_RIGHT_CURLY_BRACKET = 0x7D;
        var ESCAPE_SEQUENCES = {};
        ESCAPE_SEQUENCES[0x00] = '\\0';
        ESCAPE_SEQUENCES[0x07] = '\\a';
        ESCAPE_SEQUENCES[0x08] = '\\b';
        ESCAPE_SEQUENCES[0x09] = '\\t';
        ESCAPE_SEQUENCES[0x0A] = '\\n';
        ESCAPE_SEQUENCES[0x0B] = '\\v';
        ESCAPE_SEQUENCES[0x0C] = '\\f';
        ESCAPE_SEQUENCES[0x0D] = '\\r';
        ESCAPE_SEQUENCES[0x1B] = '\\e';
        ESCAPE_SEQUENCES[0x22] = '\\"';
        ESCAPE_SEQUENCES[0x5C] = '\\\\';
        ESCAPE_SEQUENCES[0x85] = '\\N';
        ESCAPE_SEQUENCES[0xA0] = '\\_';
        ESCAPE_SEQUENCES[0x2028] = '\\L';
        ESCAPE_SEQUENCES[0x2029] = '\\P';
        var DEPRECATED_BOOLEANS_SYNTAX = ['y', 'Y', 'yes', 'Yes', 'YES', 'on', 'On', 'ON', 'n', 'N', 'no', 'No', 'NO', 'off', 'Off', 'OFF'];
        function compileStyleMap(schema, map) {
          var result,
              keys,
              index,
              length,
              tag,
              style,
              type;
          if (map === null)
            return {};
          result = {};
          keys = Object.keys(map);
          for (index = 0, length = keys.length; index < length; index += 1) {
            tag = keys[index];
            style = String(map[tag]);
            if (tag.slice(0, 2) === '!!') {
              tag = 'tag:yaml.org,2002:' + tag.slice(2);
            }
            type = schema.compiledTypeMap[tag];
            if (type && _hasOwnProperty.call(type.styleAliases, style)) {
              style = type.styleAliases[style];
            }
            result[tag] = style;
          }
          return result;
        }
        function encodeHex(character) {
          var string,
              handle,
              length;
          string = character.toString(16).toUpperCase();
          if (character <= 0xFF) {
            handle = 'x';
            length = 2;
          } else if (character <= 0xFFFF) {
            handle = 'u';
            length = 4;
          } else if (character <= 0xFFFFFFFF) {
            handle = 'U';
            length = 8;
          } else {
            throw new YAMLException('code point within a string may not be greater than 0xFFFFFFFF');
          }
          return '\\' + handle + common.repeat('0', length - string.length) + string;
        }
        function State(options) {
          this.schema = options['schema'] || DEFAULT_FULL_SCHEMA;
          this.indent = Math.max(1, (options['indent'] || 2));
          this.skipInvalid = options['skipInvalid'] || false;
          this.flowLevel = (common.isNothing(options['flowLevel']) ? -1 : options['flowLevel']);
          this.styleMap = compileStyleMap(this.schema, options['styles'] || null);
          this.sortKeys = options['sortKeys'] || false;
          this.lineWidth = options['lineWidth'] || 80;
          this.noRefs = options['noRefs'] || false;
          this.implicitTypes = this.schema.compiledImplicit;
          this.explicitTypes = this.schema.compiledExplicit;
          this.tag = null;
          this.result = '';
          this.duplicates = [];
          this.usedDuplicates = null;
        }
        function indentString(string, spaces) {
          var ind = common.repeat(' ', spaces),
              position = 0,
              next = -1,
              result = '',
              line,
              length = string.length;
          while (position < length) {
            next = string.indexOf('\n', position);
            if (next === -1) {
              line = string.slice(position);
              position = length;
            } else {
              line = string.slice(position, next + 1);
              position = next + 1;
            }
            if (line.length && line !== '\n')
              result += ind;
            result += line;
          }
          return result;
        }
        function generateNextLine(state, level) {
          return '\n' + common.repeat(' ', state.indent * level);
        }
        function testImplicitResolving(state, str) {
          var index,
              length,
              type;
          for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
            type = state.implicitTypes[index];
            if (type.resolve(str)) {
              return true;
            }
          }
          return false;
        }
        function StringBuilder(source) {
          this.source = source;
          this.result = '';
          this.checkpoint = 0;
        }
        StringBuilder.prototype.takeUpTo = function(position) {
          var er;
          if (position < this.checkpoint) {
            er = new Error('position should be > checkpoint');
            er.position = position;
            er.checkpoint = this.checkpoint;
            throw er;
          }
          this.result += this.source.slice(this.checkpoint, position);
          this.checkpoint = position;
          return this;
        };
        StringBuilder.prototype.escapeChar = function() {
          var character,
              esc;
          character = this.source.charCodeAt(this.checkpoint);
          esc = ESCAPE_SEQUENCES[character] || encodeHex(character);
          this.result += esc;
          this.checkpoint += 1;
          return this;
        };
        StringBuilder.prototype.finish = function() {
          if (this.source.length > this.checkpoint) {
            this.takeUpTo(this.source.length);
          }
        };
        function writeScalar(state, object, level, iskey) {
          var simple,
              first,
              spaceWrap,
              folded,
              literal,
              single,
              double,
              sawLineFeed,
              linePosition,
              longestLine,
              indent,
              max,
              character,
              position,
              escapeSeq,
              hexEsc,
              previous,
              lineLength,
              modifier,
              trailingLineBreaks,
              result;
          if (object.length === 0) {
            state.dump = "''";
            return;
          }
          if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(object) !== -1) {
            state.dump = "'" + object + "'";
            return;
          }
          simple = true;
          first = object.length ? object.charCodeAt(0) : 0;
          spaceWrap = (CHAR_SPACE === first || CHAR_SPACE === object.charCodeAt(object.length - 1));
          if (CHAR_MINUS === first || CHAR_QUESTION === first || CHAR_COMMERCIAL_AT === first || CHAR_GRAVE_ACCENT === first) {
            simple = false;
          }
          if (spaceWrap || (state.flowLevel > -1 && state.flowLevel <= level)) {
            if (spaceWrap)
              simple = false;
            folded = false;
            literal = false;
          } else {
            folded = !iskey;
            literal = !iskey;
          }
          single = true;
          double = new StringBuilder(object);
          sawLineFeed = false;
          linePosition = 0;
          longestLine = 0;
          indent = state.indent * level;
          max = state.lineWidth;
          if (max === -1)
            max = 9007199254740991;
          if (indent < 40)
            max -= indent;
          else
            max = 40;
          for (position = 0; position < object.length; position++) {
            character = object.charCodeAt(position);
            if (simple) {
              if (!simpleChar(character)) {
                simple = false;
              } else {
                continue;
              }
            }
            if (single && character === CHAR_SINGLE_QUOTE) {
              single = false;
            }
            escapeSeq = ESCAPE_SEQUENCES[character];
            hexEsc = needsHexEscape(character);
            if (!escapeSeq && !hexEsc) {
              continue;
            }
            if (character !== CHAR_LINE_FEED && character !== CHAR_DOUBLE_QUOTE && character !== CHAR_SINGLE_QUOTE) {
              folded = false;
              literal = false;
            } else if (character === CHAR_LINE_FEED) {
              sawLineFeed = true;
              single = false;
              if (position > 0) {
                previous = object.charCodeAt(position - 1);
                if (previous === CHAR_SPACE) {
                  literal = false;
                  folded = false;
                }
              }
              if (folded) {
                lineLength = position - linePosition;
                linePosition = position;
                if (lineLength > longestLine)
                  longestLine = lineLength;
              }
            }
            if (character !== CHAR_DOUBLE_QUOTE)
              single = false;
            double.takeUpTo(position);
            double.escapeChar();
          }
          if (simple && testImplicitResolving(state, object))
            simple = false;
          modifier = '';
          if (folded || literal) {
            trailingLineBreaks = 0;
            if (object.charCodeAt(object.length - 1) === CHAR_LINE_FEED) {
              trailingLineBreaks += 1;
              if (object.charCodeAt(object.length - 2) === CHAR_LINE_FEED) {
                trailingLineBreaks += 1;
              }
            }
            if (trailingLineBreaks === 0)
              modifier = '-';
            else if (trailingLineBreaks === 2)
              modifier = '+';
          }
          if (literal && longestLine < max || state.tag !== null) {
            folded = false;
          }
          if (!sawLineFeed)
            literal = false;
          if (simple) {
            state.dump = object;
          } else if (single) {
            state.dump = '\'' + object + '\'';
          } else if (folded) {
            result = fold(object, max);
            state.dump = '>' + modifier + '\n' + indentString(result, indent);
          } else if (literal) {
            if (!modifier)
              object = object.replace(/\n$/, '');
            state.dump = '|' + modifier + '\n' + indentString(object, indent);
          } else if (double) {
            double.finish();
            state.dump = '"' + double.result + '"';
          } else {
            throw new Error('Failed to dump scalar value');
          }
          return;
        }
        function fold(object, max) {
          var result = '',
              position = 0,
              length = object.length,
              trailing = /\n+$/.exec(object),
              newLine;
          if (trailing) {
            length = trailing.index + 1;
          }
          while (position < length) {
            newLine = object.indexOf('\n', position);
            if (newLine > length || newLine === -1) {
              if (result)
                result += '\n\n';
              result += foldLine(object.slice(position, length), max);
              position = length;
            } else {
              if (result)
                result += '\n\n';
              result += foldLine(object.slice(position, newLine), max);
              position = newLine + 1;
            }
          }
          if (trailing && trailing[0] !== '\n')
            result += trailing[0];
          return result;
        }
        function foldLine(line, max) {
          if (line === '')
            return line;
          var foldRe = /[^\s] [^\s]/g,
              result = '',
              prevMatch = 0,
              foldStart = 0,
              match = foldRe.exec(line),
              index,
              foldEnd,
              folded;
          while (match) {
            index = match.index;
            if (index - foldStart > max) {
              if (prevMatch !== foldStart)
                foldEnd = prevMatch;
              else
                foldEnd = index;
              if (result)
                result += '\n';
              folded = line.slice(foldStart, foldEnd);
              result += folded;
              foldStart = foldEnd + 1;
            }
            prevMatch = index + 1;
            match = foldRe.exec(line);
          }
          if (result)
            result += '\n';
          if (foldStart !== prevMatch && line.length - foldStart > max) {
            result += line.slice(foldStart, prevMatch) + '\n' + line.slice(prevMatch + 1);
          } else {
            result += line.slice(foldStart);
          }
          return result;
        }
        function simpleChar(character) {
          return CHAR_TAB !== character && CHAR_LINE_FEED !== character && CHAR_CARRIAGE_RETURN !== character && CHAR_COMMA !== character && CHAR_LEFT_SQUARE_BRACKET !== character && CHAR_RIGHT_SQUARE_BRACKET !== character && CHAR_LEFT_CURLY_BRACKET !== character && CHAR_RIGHT_CURLY_BRACKET !== character && CHAR_SHARP !== character && CHAR_AMPERSAND !== character && CHAR_ASTERISK !== character && CHAR_EXCLAMATION !== character && CHAR_VERTICAL_LINE !== character && CHAR_GREATER_THAN !== character && CHAR_SINGLE_QUOTE !== character && CHAR_DOUBLE_QUOTE !== character && CHAR_PERCENT !== character && CHAR_COLON !== character && !ESCAPE_SEQUENCES[character] && !needsHexEscape(character);
        }
        function needsHexEscape(character) {
          return !((0x00020 <= character && character <= 0x00007E) || (character === 0x00085) || (0x000A0 <= character && character <= 0x00D7FF) || (0x0E000 <= character && character <= 0x00FFFD) || (0x10000 <= character && character <= 0x10FFFF));
        }
        function writeFlowSequence(state, level, object) {
          var _result = '',
              _tag = state.tag,
              index,
              length;
          for (index = 0, length = object.length; index < length; index += 1) {
            if (writeNode(state, level, object[index], false, false)) {
              if (index !== 0)
                _result += ', ';
              _result += state.dump;
            }
          }
          state.tag = _tag;
          state.dump = '[' + _result + ']';
        }
        function writeBlockSequence(state, level, object, compact) {
          var _result = '',
              _tag = state.tag,
              index,
              length;
          for (index = 0, length = object.length; index < length; index += 1) {
            if (writeNode(state, level + 1, object[index], true, true)) {
              if (!compact || index !== 0) {
                _result += generateNextLine(state, level);
              }
              _result += '- ' + state.dump;
            }
          }
          state.tag = _tag;
          state.dump = _result || '[]';
        }
        function writeFlowMapping(state, level, object) {
          var _result = '',
              _tag = state.tag,
              objectKeyList = Object.keys(object),
              index,
              length,
              objectKey,
              objectValue,
              pairBuffer;
          for (index = 0, length = objectKeyList.length; index < length; index += 1) {
            pairBuffer = '';
            if (index !== 0)
              pairBuffer += ', ';
            objectKey = objectKeyList[index];
            objectValue = object[objectKey];
            if (!writeNode(state, level, objectKey, false, false)) {
              continue;
            }
            if (state.dump.length > 1024)
              pairBuffer += '? ';
            pairBuffer += state.dump + ': ';
            if (!writeNode(state, level, objectValue, false, false)) {
              continue;
            }
            pairBuffer += state.dump;
            _result += pairBuffer;
          }
          state.tag = _tag;
          state.dump = '{' + _result + '}';
        }
        function writeBlockMapping(state, level, object, compact) {
          var _result = '',
              _tag = state.tag,
              objectKeyList = Object.keys(object),
              index,
              length,
              objectKey,
              objectValue,
              explicitPair,
              pairBuffer;
          if (state.sortKeys === true) {
            objectKeyList.sort();
          } else if (typeof state.sortKeys === 'function') {
            objectKeyList.sort(state.sortKeys);
          } else if (state.sortKeys) {
            throw new YAMLException('sortKeys must be a boolean or a function');
          }
          for (index = 0, length = objectKeyList.length; index < length; index += 1) {
            pairBuffer = '';
            if (!compact || index !== 0) {
              pairBuffer += generateNextLine(state, level);
            }
            objectKey = objectKeyList[index];
            objectValue = object[objectKey];
            if (!writeNode(state, level + 1, objectKey, true, true, true)) {
              continue;
            }
            explicitPair = (state.tag !== null && state.tag !== '?') || (state.dump && state.dump.length > 1024);
            if (explicitPair) {
              if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
                pairBuffer += '?';
              } else {
                pairBuffer += '? ';
              }
            }
            pairBuffer += state.dump;
            if (explicitPair) {
              pairBuffer += generateNextLine(state, level);
            }
            if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
              continue;
            }
            if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
              pairBuffer += ':';
            } else {
              pairBuffer += ': ';
            }
            pairBuffer += state.dump;
            _result += pairBuffer;
          }
          state.tag = _tag;
          state.dump = _result || '{}';
        }
        function detectType(state, object, explicit) {
          var _result,
              typeList,
              index,
              length,
              type,
              style;
          typeList = explicit ? state.explicitTypes : state.implicitTypes;
          for (index = 0, length = typeList.length; index < length; index += 1) {
            type = typeList[index];
            if ((type.instanceOf || type.predicate) && (!type.instanceOf || ((typeof object === 'object') && (object instanceof type.instanceOf))) && (!type.predicate || type.predicate(object))) {
              state.tag = explicit ? type.tag : '?';
              if (type.represent) {
                style = state.styleMap[type.tag] || type.defaultStyle;
                if (_toString.call(type.represent) === '[object Function]') {
                  _result = type.represent(object, style);
                } else if (_hasOwnProperty.call(type.represent, style)) {
                  _result = type.represent[style](object, style);
                } else {
                  throw new YAMLException('!<' + type.tag + '> tag resolver accepts not "' + style + '" style');
                }
                state.dump = _result;
              }
              return true;
            }
          }
          return false;
        }
        function writeNode(state, level, object, block, compact, iskey) {
          state.tag = null;
          state.dump = object;
          if (!detectType(state, object, false)) {
            detectType(state, object, true);
          }
          var type = _toString.call(state.dump);
          if (block) {
            block = (state.flowLevel < 0 || state.flowLevel > level);
          }
          var objectOrArray = type === '[object Object]' || type === '[object Array]',
              duplicateIndex,
              duplicate;
          if (objectOrArray) {
            duplicateIndex = state.duplicates.indexOf(object);
            duplicate = duplicateIndex !== -1;
          }
          if ((state.tag !== null && state.tag !== '?') || duplicate || (state.indent !== 2 && level > 0)) {
            compact = false;
          }
          if (duplicate && state.usedDuplicates[duplicateIndex]) {
            state.dump = '*ref_' + duplicateIndex;
          } else {
            if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
              state.usedDuplicates[duplicateIndex] = true;
            }
            if (type === '[object Object]') {
              if (block && (Object.keys(state.dump).length !== 0)) {
                writeBlockMapping(state, level, state.dump, compact);
                if (duplicate) {
                  state.dump = '&ref_' + duplicateIndex + state.dump;
                }
              } else {
                writeFlowMapping(state, level, state.dump);
                if (duplicate) {
                  state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
                }
              }
            } else if (type === '[object Array]') {
              if (block && (state.dump.length !== 0)) {
                writeBlockSequence(state, level, state.dump, compact);
                if (duplicate) {
                  state.dump = '&ref_' + duplicateIndex + state.dump;
                }
              } else {
                writeFlowSequence(state, level, state.dump);
                if (duplicate) {
                  state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
                }
              }
            } else if (type === '[object String]') {
              if (state.tag !== '?') {
                writeScalar(state, state.dump, level, iskey);
              }
            } else {
              if (state.skipInvalid)
                return false;
              throw new YAMLException('unacceptable kind of an object to dump ' + type);
            }
            if (state.tag !== null && state.tag !== '?') {
              state.dump = '!<' + state.tag + '> ' + state.dump;
            }
          }
          return true;
        }
        function getDuplicateReferences(object, state) {
          var objects = [],
              duplicatesIndexes = [],
              index,
              length;
          inspectNode(object, objects, duplicatesIndexes);
          for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
            state.duplicates.push(objects[duplicatesIndexes[index]]);
          }
          state.usedDuplicates = new Array(length);
        }
        function inspectNode(object, objects, duplicatesIndexes) {
          var objectKeyList,
              index,
              length;
          if (object !== null && typeof object === 'object') {
            index = objects.indexOf(object);
            if (index !== -1) {
              if (duplicatesIndexes.indexOf(index) === -1) {
                duplicatesIndexes.push(index);
              }
            } else {
              objects.push(object);
              if (Array.isArray(object)) {
                for (index = 0, length = object.length; index < length; index += 1) {
                  inspectNode(object[index], objects, duplicatesIndexes);
                }
              } else {
                objectKeyList = Object.keys(object);
                for (index = 0, length = objectKeyList.length; index < length; index += 1) {
                  inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
                }
              }
            }
          }
        }
        function dump(input, options) {
          options = options || {};
          var state = new State(options);
          if (!state.noRefs)
            getDuplicateReferences(input, state);
          if (writeNode(state, 0, input, true, true))
            return state.dump + '\n';
          return '';
        }
        function safeDump(input, options) {
          return dump(input, common.extend({schema: DEFAULT_SAFE_SCHEMA}, options));
        }
        module.exports.dump = dump;
        module.exports.safeDump = safeDump;
      }, {
        "./common": 22,
        "./exception": 24,
        "./schema/default_full": 29,
        "./schema/default_safe": 30
      }],
      24: [function(require, module, exports) {
        'use strict';
        function YAMLException(reason, mark) {
          Error.call(this);
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
          } else {
            this.stack = (new Error()).stack || '';
          }
          this.name = 'YAMLException';
          this.reason = reason;
          this.mark = mark;
          this.message = (this.reason || '(unknown reason)') + (this.mark ? ' ' + this.mark.toString() : '');
        }
        YAMLException.prototype = Object.create(Error.prototype);
        YAMLException.prototype.constructor = YAMLException;
        YAMLException.prototype.toString = function toString(compact) {
          var result = this.name + ': ';
          result += this.reason || '(unknown reason)';
          if (!compact && this.mark) {
            result += ' ' + this.mark.toString();
          }
          return result;
        };
        module.exports = YAMLException;
      }, {}],
      25: [function(require, module, exports) {
        'use strict';
        var common = require('./common');
        var YAMLException = require('./exception');
        var Mark = require('./mark');
        var DEFAULT_SAFE_SCHEMA = require('./schema/default_safe');
        var DEFAULT_FULL_SCHEMA = require('./schema/default_full');
        var _hasOwnProperty = Object.prototype.hasOwnProperty;
        var CONTEXT_FLOW_IN = 1;
        var CONTEXT_FLOW_OUT = 2;
        var CONTEXT_BLOCK_IN = 3;
        var CONTEXT_BLOCK_OUT = 4;
        var CHOMPING_CLIP = 1;
        var CHOMPING_STRIP = 2;
        var CHOMPING_KEEP = 3;
        var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
        var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
        var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
        var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
        var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
        function is_EOL(c) {
          return (c === 0x0A) || (c === 0x0D);
        }
        function is_WHITE_SPACE(c) {
          return (c === 0x09) || (c === 0x20);
        }
        function is_WS_OR_EOL(c) {
          return (c === 0x09) || (c === 0x20) || (c === 0x0A) || (c === 0x0D);
        }
        function is_FLOW_INDICATOR(c) {
          return c === 0x2C || c === 0x5B || c === 0x5D || c === 0x7B || c === 0x7D;
        }
        function fromHexCode(c) {
          var lc;
          if ((0x30 <= c) && (c <= 0x39)) {
            return c - 0x30;
          }
          lc = c | 0x20;
          if ((0x61 <= lc) && (lc <= 0x66)) {
            return lc - 0x61 + 10;
          }
          return -1;
        }
        function escapedHexLen(c) {
          if (c === 0x78) {
            return 2;
          }
          if (c === 0x75) {
            return 4;
          }
          if (c === 0x55) {
            return 8;
          }
          return 0;
        }
        function fromDecimalCode(c) {
          if ((0x30 <= c) && (c <= 0x39)) {
            return c - 0x30;
          }
          return -1;
        }
        function simpleEscapeSequence(c) {
          return (c === 0x30) ? '\x00' : (c === 0x61) ? '\x07' : (c === 0x62) ? '\x08' : (c === 0x74) ? '\x09' : (c === 0x09) ? '\x09' : (c === 0x6E) ? '\x0A' : (c === 0x76) ? '\x0B' : (c === 0x66) ? '\x0C' : (c === 0x72) ? '\x0D' : (c === 0x65) ? '\x1B' : (c === 0x20) ? ' ' : (c === 0x22) ? '\x22' : (c === 0x2F) ? '/' : (c === 0x5C) ? '\x5C' : (c === 0x4E) ? '\x85' : (c === 0x5F) ? '\xA0' : (c === 0x4C) ? '\u2028' : (c === 0x50) ? '\u2029' : '';
        }
        function charFromCodepoint(c) {
          if (c <= 0xFFFF) {
            return String.fromCharCode(c);
          }
          return String.fromCharCode(((c - 0x010000) >> 10) + 0xD800, ((c - 0x010000) & 0x03FF) + 0xDC00);
        }
        var simpleEscapeCheck = new Array(256);
        var simpleEscapeMap = new Array(256);
        for (var i = 0; i < 256; i++) {
          simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
          simpleEscapeMap[i] = simpleEscapeSequence(i);
        }
        function State(input, options) {
          this.input = input;
          this.filename = options['filename'] || null;
          this.schema = options['schema'] || DEFAULT_FULL_SCHEMA;
          this.onWarning = options['onWarning'] || null;
          this.legacy = options['legacy'] || false;
          this.json = options['json'] || false;
          this.listener = options['listener'] || null;
          this.implicitTypes = this.schema.compiledImplicit;
          this.typeMap = this.schema.compiledTypeMap;
          this.length = input.length;
          this.position = 0;
          this.line = 0;
          this.lineStart = 0;
          this.lineIndent = 0;
          this.documents = [];
        }
        function generateError(state, message) {
          return new YAMLException(message, new Mark(state.filename, state.input, state.position, state.line, (state.position - state.lineStart)));
        }
        function throwError(state, message) {
          throw generateError(state, message);
        }
        function throwWarning(state, message) {
          if (state.onWarning) {
            state.onWarning.call(null, generateError(state, message));
          }
        }
        var directiveHandlers = {
          YAML: function handleYamlDirective(state, name, args) {
            var match,
                major,
                minor;
            if (state.version !== null) {
              throwError(state, 'duplication of %YAML directive');
            }
            if (args.length !== 1) {
              throwError(state, 'YAML directive accepts exactly one argument');
            }
            match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
            if (match === null) {
              throwError(state, 'ill-formed argument of the YAML directive');
            }
            major = parseInt(match[1], 10);
            minor = parseInt(match[2], 10);
            if (major !== 1) {
              throwError(state, 'unacceptable YAML version of the document');
            }
            state.version = args[0];
            state.checkLineBreaks = (minor < 2);
            if (minor !== 1 && minor !== 2) {
              throwWarning(state, 'unsupported YAML version of the document');
            }
          },
          TAG: function handleTagDirective(state, name, args) {
            var handle,
                prefix;
            if (args.length !== 2) {
              throwError(state, 'TAG directive accepts exactly two arguments');
            }
            handle = args[0];
            prefix = args[1];
            if (!PATTERN_TAG_HANDLE.test(handle)) {
              throwError(state, 'ill-formed tag handle (first argument) of the TAG directive');
            }
            if (_hasOwnProperty.call(state.tagMap, handle)) {
              throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
            }
            if (!PATTERN_TAG_URI.test(prefix)) {
              throwError(state, 'ill-formed tag prefix (second argument) of the TAG directive');
            }
            state.tagMap[handle] = prefix;
          }
        };
        function captureSegment(state, start, end, checkJson) {
          var _position,
              _length,
              _character,
              _result;
          if (start < end) {
            _result = state.input.slice(start, end);
            if (checkJson) {
              for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
                _character = _result.charCodeAt(_position);
                if (!(_character === 0x09 || (0x20 <= _character && _character <= 0x10FFFF))) {
                  throwError(state, 'expected valid JSON character');
                }
              }
            } else if (PATTERN_NON_PRINTABLE.test(_result)) {
              throwError(state, 'the stream contains non-printable characters');
            }
            state.result += _result;
          }
        }
        function mergeMappings(state, destination, source, overridableKeys) {
          var sourceKeys,
              key,
              index,
              quantity;
          if (!common.isObject(source)) {
            throwError(state, 'cannot merge mappings; the provided source object is unacceptable');
          }
          sourceKeys = Object.keys(source);
          for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
            key = sourceKeys[index];
            if (!_hasOwnProperty.call(destination, key)) {
              destination[key] = source[key];
              overridableKeys[key] = true;
            }
          }
        }
        function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode) {
          var index,
              quantity;
          keyNode = String(keyNode);
          if (_result === null) {
            _result = {};
          }
          if (keyTag === 'tag:yaml.org,2002:merge') {
            if (Array.isArray(valueNode)) {
              for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
                mergeMappings(state, _result, valueNode[index], overridableKeys);
              }
            } else {
              mergeMappings(state, _result, valueNode, overridableKeys);
            }
          } else {
            if (!state.json && !_hasOwnProperty.call(overridableKeys, keyNode) && _hasOwnProperty.call(_result, keyNode)) {
              throwError(state, 'duplicated mapping key');
            }
            _result[keyNode] = valueNode;
            delete overridableKeys[keyNode];
          }
          return _result;
        }
        function readLineBreak(state) {
          var ch;
          ch = state.input.charCodeAt(state.position);
          if (ch === 0x0A) {
            state.position++;
          } else if (ch === 0x0D) {
            state.position++;
            if (state.input.charCodeAt(state.position) === 0x0A) {
              state.position++;
            }
          } else {
            throwError(state, 'a line break is expected');
          }
          state.line += 1;
          state.lineStart = state.position;
        }
        function skipSeparationSpace(state, allowComments, checkIndent) {
          var lineBreaks = 0,
              ch = state.input.charCodeAt(state.position);
          while (ch !== 0) {
            while (is_WHITE_SPACE(ch)) {
              ch = state.input.charCodeAt(++state.position);
            }
            if (allowComments && ch === 0x23) {
              do {
                ch = state.input.charCodeAt(++state.position);
              } while (ch !== 0x0A && ch !== 0x0D && ch !== 0);
            }
            if (is_EOL(ch)) {
              readLineBreak(state);
              ch = state.input.charCodeAt(state.position);
              lineBreaks++;
              state.lineIndent = 0;
              while (ch === 0x20) {
                state.lineIndent++;
                ch = state.input.charCodeAt(++state.position);
              }
            } else {
              break;
            }
          }
          if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
            throwWarning(state, 'deficient indentation');
          }
          return lineBreaks;
        }
        function testDocumentSeparator(state) {
          var _position = state.position,
              ch;
          ch = state.input.charCodeAt(_position);
          if ((ch === 0x2D || ch === 0x2E) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
            _position += 3;
            ch = state.input.charCodeAt(_position);
            if (ch === 0 || is_WS_OR_EOL(ch)) {
              return true;
            }
          }
          return false;
        }
        function writeFoldedLines(state, count) {
          if (count === 1) {
            state.result += ' ';
          } else if (count > 1) {
            state.result += common.repeat('\n', count - 1);
          }
        }
        function readPlainScalar(state, nodeIndent, withinFlowCollection) {
          var preceding,
              following,
              captureStart,
              captureEnd,
              hasPendingContent,
              _line,
              _lineStart,
              _lineIndent,
              _kind = state.kind,
              _result = state.result,
              ch;
          ch = state.input.charCodeAt(state.position);
          if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 0x23 || ch === 0x26 || ch === 0x2A || ch === 0x21 || ch === 0x7C || ch === 0x3E || ch === 0x27 || ch === 0x22 || ch === 0x25 || ch === 0x40 || ch === 0x60) {
            return false;
          }
          if (ch === 0x3F || ch === 0x2D) {
            following = state.input.charCodeAt(state.position + 1);
            if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
              return false;
            }
          }
          state.kind = 'scalar';
          state.result = '';
          captureStart = captureEnd = state.position;
          hasPendingContent = false;
          while (ch !== 0) {
            if (ch === 0x3A) {
              following = state.input.charCodeAt(state.position + 1);
              if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
                break;
              }
            } else if (ch === 0x23) {
              preceding = state.input.charCodeAt(state.position - 1);
              if (is_WS_OR_EOL(preceding)) {
                break;
              }
            } else if ((state.position === state.lineStart && testDocumentSeparator(state)) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
              break;
            } else if (is_EOL(ch)) {
              _line = state.line;
              _lineStart = state.lineStart;
              _lineIndent = state.lineIndent;
              skipSeparationSpace(state, false, -1);
              if (state.lineIndent >= nodeIndent) {
                hasPendingContent = true;
                ch = state.input.charCodeAt(state.position);
                continue;
              } else {
                state.position = captureEnd;
                state.line = _line;
                state.lineStart = _lineStart;
                state.lineIndent = _lineIndent;
                break;
              }
            }
            if (hasPendingContent) {
              captureSegment(state, captureStart, captureEnd, false);
              writeFoldedLines(state, state.line - _line);
              captureStart = captureEnd = state.position;
              hasPendingContent = false;
            }
            if (!is_WHITE_SPACE(ch)) {
              captureEnd = state.position + 1;
            }
            ch = state.input.charCodeAt(++state.position);
          }
          captureSegment(state, captureStart, captureEnd, false);
          if (state.result) {
            return true;
          }
          state.kind = _kind;
          state.result = _result;
          return false;
        }
        function readSingleQuotedScalar(state, nodeIndent) {
          var ch,
              captureStart,
              captureEnd;
          ch = state.input.charCodeAt(state.position);
          if (ch !== 0x27) {
            return false;
          }
          state.kind = 'scalar';
          state.result = '';
          state.position++;
          captureStart = captureEnd = state.position;
          while ((ch = state.input.charCodeAt(state.position)) !== 0) {
            if (ch === 0x27) {
              captureSegment(state, captureStart, state.position, true);
              ch = state.input.charCodeAt(++state.position);
              if (ch === 0x27) {
                captureStart = captureEnd = state.position;
                state.position++;
              } else {
                return true;
              }
            } else if (is_EOL(ch)) {
              captureSegment(state, captureStart, captureEnd, true);
              writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
              captureStart = captureEnd = state.position;
            } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
              throwError(state, 'unexpected end of the document within a single quoted scalar');
            } else {
              state.position++;
              captureEnd = state.position;
            }
          }
          throwError(state, 'unexpected end of the stream within a single quoted scalar');
        }
        function readDoubleQuotedScalar(state, nodeIndent) {
          var captureStart,
              captureEnd,
              hexLength,
              hexResult,
              tmp,
              ch;
          ch = state.input.charCodeAt(state.position);
          if (ch !== 0x22) {
            return false;
          }
          state.kind = 'scalar';
          state.result = '';
          state.position++;
          captureStart = captureEnd = state.position;
          while ((ch = state.input.charCodeAt(state.position)) !== 0) {
            if (ch === 0x22) {
              captureSegment(state, captureStart, state.position, true);
              state.position++;
              return true;
            } else if (ch === 0x5C) {
              captureSegment(state, captureStart, state.position, true);
              ch = state.input.charCodeAt(++state.position);
              if (is_EOL(ch)) {
                skipSeparationSpace(state, false, nodeIndent);
              } else if (ch < 256 && simpleEscapeCheck[ch]) {
                state.result += simpleEscapeMap[ch];
                state.position++;
              } else if ((tmp = escapedHexLen(ch)) > 0) {
                hexLength = tmp;
                hexResult = 0;
                for (; hexLength > 0; hexLength--) {
                  ch = state.input.charCodeAt(++state.position);
                  if ((tmp = fromHexCode(ch)) >= 0) {
                    hexResult = (hexResult << 4) + tmp;
                  } else {
                    throwError(state, 'expected hexadecimal character');
                  }
                }
                state.result += charFromCodepoint(hexResult);
                state.position++;
              } else {
                throwError(state, 'unknown escape sequence');
              }
              captureStart = captureEnd = state.position;
            } else if (is_EOL(ch)) {
              captureSegment(state, captureStart, captureEnd, true);
              writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
              captureStart = captureEnd = state.position;
            } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
              throwError(state, 'unexpected end of the document within a double quoted scalar');
            } else {
              state.position++;
              captureEnd = state.position;
            }
          }
          throwError(state, 'unexpected end of the stream within a double quoted scalar');
        }
        function readFlowCollection(state, nodeIndent) {
          var readNext = true,
              _line,
              _tag = state.tag,
              _result,
              _anchor = state.anchor,
              following,
              terminator,
              isPair,
              isExplicitPair,
              isMapping,
              overridableKeys = {},
              keyNode,
              keyTag,
              valueNode,
              ch;
          ch = state.input.charCodeAt(state.position);
          if (ch === 0x5B) {
            terminator = 0x5D;
            isMapping = false;
            _result = [];
          } else if (ch === 0x7B) {
            terminator = 0x7D;
            isMapping = true;
            _result = {};
          } else {
            return false;
          }
          if (state.anchor !== null) {
            state.anchorMap[state.anchor] = _result;
          }
          ch = state.input.charCodeAt(++state.position);
          while (ch !== 0) {
            skipSeparationSpace(state, true, nodeIndent);
            ch = state.input.charCodeAt(state.position);
            if (ch === terminator) {
              state.position++;
              state.tag = _tag;
              state.anchor = _anchor;
              state.kind = isMapping ? 'mapping' : 'sequence';
              state.result = _result;
              return true;
            } else if (!readNext) {
              throwError(state, 'missed comma between flow collection entries');
            }
            keyTag = keyNode = valueNode = null;
            isPair = isExplicitPair = false;
            if (ch === 0x3F) {
              following = state.input.charCodeAt(state.position + 1);
              if (is_WS_OR_EOL(following)) {
                isPair = isExplicitPair = true;
                state.position++;
                skipSeparationSpace(state, true, nodeIndent);
              }
            }
            _line = state.line;
            composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
            keyTag = state.tag;
            keyNode = state.result;
            skipSeparationSpace(state, true, nodeIndent);
            ch = state.input.charCodeAt(state.position);
            if ((isExplicitPair || state.line === _line) && ch === 0x3A) {
              isPair = true;
              ch = state.input.charCodeAt(++state.position);
              skipSeparationSpace(state, true, nodeIndent);
              composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
              valueNode = state.result;
            }
            if (isMapping) {
              storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode);
            } else if (isPair) {
              _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode));
            } else {
              _result.push(keyNode);
            }
            skipSeparationSpace(state, true, nodeIndent);
            ch = state.input.charCodeAt(state.position);
            if (ch === 0x2C) {
              readNext = true;
              ch = state.input.charCodeAt(++state.position);
            } else {
              readNext = false;
            }
          }
          throwError(state, 'unexpected end of the stream within a flow collection');
        }
        function readBlockScalar(state, nodeIndent) {
          var captureStart,
              folding,
              chomping = CHOMPING_CLIP,
              detectedIndent = false,
              textIndent = nodeIndent,
              emptyLines = 0,
              atMoreIndented = false,
              tmp,
              ch;
          ch = state.input.charCodeAt(state.position);
          if (ch === 0x7C) {
            folding = false;
          } else if (ch === 0x3E) {
            folding = true;
          } else {
            return false;
          }
          state.kind = 'scalar';
          state.result = '';
          while (ch !== 0) {
            ch = state.input.charCodeAt(++state.position);
            if (ch === 0x2B || ch === 0x2D) {
              if (CHOMPING_CLIP === chomping) {
                chomping = (ch === 0x2B) ? CHOMPING_KEEP : CHOMPING_STRIP;
              } else {
                throwError(state, 'repeat of a chomping mode identifier');
              }
            } else if ((tmp = fromDecimalCode(ch)) >= 0) {
              if (tmp === 0) {
                throwError(state, 'bad explicit indentation width of a block scalar; it cannot be less than one');
              } else if (!detectedIndent) {
                textIndent = nodeIndent + tmp - 1;
                detectedIndent = true;
              } else {
                throwError(state, 'repeat of an indentation width identifier');
              }
            } else {
              break;
            }
          }
          if (is_WHITE_SPACE(ch)) {
            do {
              ch = state.input.charCodeAt(++state.position);
            } while (is_WHITE_SPACE(ch));
            if (ch === 0x23) {
              do {
                ch = state.input.charCodeAt(++state.position);
              } while (!is_EOL(ch) && (ch !== 0));
            }
          }
          while (ch !== 0) {
            readLineBreak(state);
            state.lineIndent = 0;
            ch = state.input.charCodeAt(state.position);
            while ((!detectedIndent || state.lineIndent < textIndent) && (ch === 0x20)) {
              state.lineIndent++;
              ch = state.input.charCodeAt(++state.position);
            }
            if (!detectedIndent && state.lineIndent > textIndent) {
              textIndent = state.lineIndent;
            }
            if (is_EOL(ch)) {
              emptyLines++;
              continue;
            }
            if (state.lineIndent < textIndent) {
              if (chomping === CHOMPING_KEEP) {
                state.result += common.repeat('\n', emptyLines);
              } else if (chomping === CHOMPING_CLIP) {
                if (detectedIndent) {
                  state.result += '\n';
                }
              }
              break;
            }
            if (folding) {
              if (is_WHITE_SPACE(ch)) {
                atMoreIndented = true;
                state.result += common.repeat('\n', emptyLines + 1);
              } else if (atMoreIndented) {
                atMoreIndented = false;
                state.result += common.repeat('\n', emptyLines + 1);
              } else if (emptyLines === 0) {
                if (detectedIndent) {
                  state.result += ' ';
                }
              } else {
                state.result += common.repeat('\n', emptyLines);
              }
            } else if (detectedIndent) {
              state.result += common.repeat('\n', emptyLines + 1);
            } else {
              state.result += common.repeat('\n', emptyLines);
            }
            detectedIndent = true;
            emptyLines = 0;
            captureStart = state.position;
            while (!is_EOL(ch) && (ch !== 0)) {
              ch = state.input.charCodeAt(++state.position);
            }
            captureSegment(state, captureStart, state.position, false);
          }
          return true;
        }
        function readBlockSequence(state, nodeIndent) {
          var _line,
              _tag = state.tag,
              _anchor = state.anchor,
              _result = [],
              following,
              detected = false,
              ch;
          if (state.anchor !== null) {
            state.anchorMap[state.anchor] = _result;
          }
          ch = state.input.charCodeAt(state.position);
          while (ch !== 0) {
            if (ch !== 0x2D) {
              break;
            }
            following = state.input.charCodeAt(state.position + 1);
            if (!is_WS_OR_EOL(following)) {
              break;
            }
            detected = true;
            state.position++;
            if (skipSeparationSpace(state, true, -1)) {
              if (state.lineIndent <= nodeIndent) {
                _result.push(null);
                ch = state.input.charCodeAt(state.position);
                continue;
              }
            }
            _line = state.line;
            composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
            _result.push(state.result);
            skipSeparationSpace(state, true, -1);
            ch = state.input.charCodeAt(state.position);
            if ((state.line === _line || state.lineIndent > nodeIndent) && (ch !== 0)) {
              throwError(state, 'bad indentation of a sequence entry');
            } else if (state.lineIndent < nodeIndent) {
              break;
            }
          }
          if (detected) {
            state.tag = _tag;
            state.anchor = _anchor;
            state.kind = 'sequence';
            state.result = _result;
            return true;
          }
          return false;
        }
        function readBlockMapping(state, nodeIndent, flowIndent) {
          var following,
              allowCompact,
              _line,
              _tag = state.tag,
              _anchor = state.anchor,
              _result = {},
              overridableKeys = {},
              keyTag = null,
              keyNode = null,
              valueNode = null,
              atExplicitKey = false,
              detected = false,
              ch;
          if (state.anchor !== null) {
            state.anchorMap[state.anchor] = _result;
          }
          ch = state.input.charCodeAt(state.position);
          while (ch !== 0) {
            following = state.input.charCodeAt(state.position + 1);
            _line = state.line;
            if ((ch === 0x3F || ch === 0x3A) && is_WS_OR_EOL(following)) {
              if (ch === 0x3F) {
                if (atExplicitKey) {
                  storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
                  keyTag = keyNode = valueNode = null;
                }
                detected = true;
                atExplicitKey = true;
                allowCompact = true;
              } else if (atExplicitKey) {
                atExplicitKey = false;
                allowCompact = true;
              } else {
                throwError(state, 'incomplete explicit mapping pair; a key node is missed');
              }
              state.position += 1;
              ch = following;
            } else if (composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
              if (state.line === _line) {
                ch = state.input.charCodeAt(state.position);
                while (is_WHITE_SPACE(ch)) {
                  ch = state.input.charCodeAt(++state.position);
                }
                if (ch === 0x3A) {
                  ch = state.input.charCodeAt(++state.position);
                  if (!is_WS_OR_EOL(ch)) {
                    throwError(state, 'a whitespace character is expected after the key-value separator within a block mapping');
                  }
                  if (atExplicitKey) {
                    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
                    keyTag = keyNode = valueNode = null;
                  }
                  detected = true;
                  atExplicitKey = false;
                  allowCompact = false;
                  keyTag = state.tag;
                  keyNode = state.result;
                } else if (detected) {
                  throwError(state, 'can not read an implicit mapping pair; a colon is missed');
                } else {
                  state.tag = _tag;
                  state.anchor = _anchor;
                  return true;
                }
              } else if (detected) {
                throwError(state, 'can not read a block mapping entry; a multiline key may not be an implicit key');
              } else {
                state.tag = _tag;
                state.anchor = _anchor;
                return true;
              }
            } else {
              break;
            }
            if (state.line === _line || state.lineIndent > nodeIndent) {
              if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
                if (atExplicitKey) {
                  keyNode = state.result;
                } else {
                  valueNode = state.result;
                }
              }
              if (!atExplicitKey) {
                storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode);
                keyTag = keyNode = valueNode = null;
              }
              skipSeparationSpace(state, true, -1);
              ch = state.input.charCodeAt(state.position);
            }
            if (state.lineIndent > nodeIndent && (ch !== 0)) {
              throwError(state, 'bad indentation of a mapping entry');
            } else if (state.lineIndent < nodeIndent) {
              break;
            }
          }
          if (atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
          }
          if (detected) {
            state.tag = _tag;
            state.anchor = _anchor;
            state.kind = 'mapping';
            state.result = _result;
          }
          return detected;
        }
        function readTagProperty(state) {
          var _position,
              isVerbatim = false,
              isNamed = false,
              tagHandle,
              tagName,
              ch;
          ch = state.input.charCodeAt(state.position);
          if (ch !== 0x21)
            return false;
          if (state.tag !== null) {
            throwError(state, 'duplication of a tag property');
          }
          ch = state.input.charCodeAt(++state.position);
          if (ch === 0x3C) {
            isVerbatim = true;
            ch = state.input.charCodeAt(++state.position);
          } else if (ch === 0x21) {
            isNamed = true;
            tagHandle = '!!';
            ch = state.input.charCodeAt(++state.position);
          } else {
            tagHandle = '!';
          }
          _position = state.position;
          if (isVerbatim) {
            do {
              ch = state.input.charCodeAt(++state.position);
            } while (ch !== 0 && ch !== 0x3E);
            if (state.position < state.length) {
              tagName = state.input.slice(_position, state.position);
              ch = state.input.charCodeAt(++state.position);
            } else {
              throwError(state, 'unexpected end of the stream within a verbatim tag');
            }
          } else {
            while (ch !== 0 && !is_WS_OR_EOL(ch)) {
              if (ch === 0x21) {
                if (!isNamed) {
                  tagHandle = state.input.slice(_position - 1, state.position + 1);
                  if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
                    throwError(state, 'named tag handle cannot contain such characters');
                  }
                  isNamed = true;
                  _position = state.position + 1;
                } else {
                  throwError(state, 'tag suffix cannot contain exclamation marks');
                }
              }
              ch = state.input.charCodeAt(++state.position);
            }
            tagName = state.input.slice(_position, state.position);
            if (PATTERN_FLOW_INDICATORS.test(tagName)) {
              throwError(state, 'tag suffix cannot contain flow indicator characters');
            }
          }
          if (tagName && !PATTERN_TAG_URI.test(tagName)) {
            throwError(state, 'tag name cannot contain such characters: ' + tagName);
          }
          if (isVerbatim) {
            state.tag = tagName;
          } else if (_hasOwnProperty.call(state.tagMap, tagHandle)) {
            state.tag = state.tagMap[tagHandle] + tagName;
          } else if (tagHandle === '!') {
            state.tag = '!' + tagName;
          } else if (tagHandle === '!!') {
            state.tag = 'tag:yaml.org,2002:' + tagName;
          } else {
            throwError(state, 'undeclared tag handle "' + tagHandle + '"');
          }
          return true;
        }
        function readAnchorProperty(state) {
          var _position,
              ch;
          ch = state.input.charCodeAt(state.position);
          if (ch !== 0x26)
            return false;
          if (state.anchor !== null) {
            throwError(state, 'duplication of an anchor property');
          }
          ch = state.input.charCodeAt(++state.position);
          _position = state.position;
          while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          if (state.position === _position) {
            throwError(state, 'name of an anchor node must contain at least one character');
          }
          state.anchor = state.input.slice(_position, state.position);
          return true;
        }
        function readAlias(state) {
          var _position,
              alias,
              ch;
          ch = state.input.charCodeAt(state.position);
          if (ch !== 0x2A)
            return false;
          ch = state.input.charCodeAt(++state.position);
          _position = state.position;
          while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          if (state.position === _position) {
            throwError(state, 'name of an alias node must contain at least one character');
          }
          alias = state.input.slice(_position, state.position);
          if (!state.anchorMap.hasOwnProperty(alias)) {
            throwError(state, 'unidentified alias "' + alias + '"');
          }
          state.result = state.anchorMap[alias];
          skipSeparationSpace(state, true, -1);
          return true;
        }
        function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
          var allowBlockStyles,
              allowBlockScalars,
              allowBlockCollections,
              indentStatus = 1,
              atNewLine = false,
              hasContent = false,
              typeIndex,
              typeQuantity,
              type,
              flowIndent,
              blockIndent;
          if (state.listener !== null) {
            state.listener('open', state);
          }
          state.tag = null;
          state.anchor = null;
          state.kind = null;
          state.result = null;
          allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
          if (allowToSeek) {
            if (skipSeparationSpace(state, true, -1)) {
              atNewLine = true;
              if (state.lineIndent > parentIndent) {
                indentStatus = 1;
              } else if (state.lineIndent === parentIndent) {
                indentStatus = 0;
              } else if (state.lineIndent < parentIndent) {
                indentStatus = -1;
              }
            }
          }
          if (indentStatus === 1) {
            while (readTagProperty(state) || readAnchorProperty(state)) {
              if (skipSeparationSpace(state, true, -1)) {
                atNewLine = true;
                allowBlockCollections = allowBlockStyles;
                if (state.lineIndent > parentIndent) {
                  indentStatus = 1;
                } else if (state.lineIndent === parentIndent) {
                  indentStatus = 0;
                } else if (state.lineIndent < parentIndent) {
                  indentStatus = -1;
                }
              } else {
                allowBlockCollections = false;
              }
            }
          }
          if (allowBlockCollections) {
            allowBlockCollections = atNewLine || allowCompact;
          }
          if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
            if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
              flowIndent = parentIndent;
            } else {
              flowIndent = parentIndent + 1;
            }
            blockIndent = state.position - state.lineStart;
            if (indentStatus === 1) {
              if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
                hasContent = true;
              } else {
                if ((allowBlockScalars && readBlockScalar(state, flowIndent)) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
                  hasContent = true;
                } else if (readAlias(state)) {
                  hasContent = true;
                  if (state.tag !== null || state.anchor !== null) {
                    throwError(state, 'alias node should not have any properties');
                  }
                } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
                  hasContent = true;
                  if (state.tag === null) {
                    state.tag = '?';
                  }
                }
                if (state.anchor !== null) {
                  state.anchorMap[state.anchor] = state.result;
                }
              }
            } else if (indentStatus === 0) {
              hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
            }
          }
          if (state.tag !== null && state.tag !== '!') {
            if (state.tag === '?') {
              for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
                type = state.implicitTypes[typeIndex];
                if (type.resolve(state.result)) {
                  state.result = type.construct(state.result);
                  state.tag = type.tag;
                  if (state.anchor !== null) {
                    state.anchorMap[state.anchor] = state.result;
                  }
                  break;
                }
              }
            } else if (_hasOwnProperty.call(state.typeMap, state.tag)) {
              type = state.typeMap[state.tag];
              if (state.result !== null && type.kind !== state.kind) {
                throwError(state, 'unacceptable node kind for !<' + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
              }
              if (!type.resolve(state.result)) {
                throwError(state, 'cannot resolve a node with !<' + state.tag + '> explicit tag');
              } else {
                state.result = type.construct(state.result);
                if (state.anchor !== null) {
                  state.anchorMap[state.anchor] = state.result;
                }
              }
            } else {
              throwError(state, 'unknown tag !<' + state.tag + '>');
            }
          }
          if (state.listener !== null) {
            state.listener('close', state);
          }
          return state.tag !== null || state.anchor !== null || hasContent;
        }
        function readDocument(state) {
          var documentStart = state.position,
              _position,
              directiveName,
              directiveArgs,
              hasDirectives = false,
              ch;
          state.version = null;
          state.checkLineBreaks = state.legacy;
          state.tagMap = {};
          state.anchorMap = {};
          while ((ch = state.input.charCodeAt(state.position)) !== 0) {
            skipSeparationSpace(state, true, -1);
            ch = state.input.charCodeAt(state.position);
            if (state.lineIndent > 0 || ch !== 0x25) {
              break;
            }
            hasDirectives = true;
            ch = state.input.charCodeAt(++state.position);
            _position = state.position;
            while (ch !== 0 && !is_WS_OR_EOL(ch)) {
              ch = state.input.charCodeAt(++state.position);
            }
            directiveName = state.input.slice(_position, state.position);
            directiveArgs = [];
            if (directiveName.length < 1) {
              throwError(state, 'directive name must not be less than one character in length');
            }
            while (ch !== 0) {
              while (is_WHITE_SPACE(ch)) {
                ch = state.input.charCodeAt(++state.position);
              }
              if (ch === 0x23) {
                do {
                  ch = state.input.charCodeAt(++state.position);
                } while (ch !== 0 && !is_EOL(ch));
                break;
              }
              if (is_EOL(ch))
                break;
              _position = state.position;
              while (ch !== 0 && !is_WS_OR_EOL(ch)) {
                ch = state.input.charCodeAt(++state.position);
              }
              directiveArgs.push(state.input.slice(_position, state.position));
            }
            if (ch !== 0)
              readLineBreak(state);
            if (_hasOwnProperty.call(directiveHandlers, directiveName)) {
              directiveHandlers[directiveName](state, directiveName, directiveArgs);
            } else {
              throwWarning(state, 'unknown document directive "' + directiveName + '"');
            }
          }
          skipSeparationSpace(state, true, -1);
          if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 0x2D && state.input.charCodeAt(state.position + 1) === 0x2D && state.input.charCodeAt(state.position + 2) === 0x2D) {
            state.position += 3;
            skipSeparationSpace(state, true, -1);
          } else if (hasDirectives) {
            throwError(state, 'directives end mark is expected');
          }
          composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
          skipSeparationSpace(state, true, -1);
          if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
            throwWarning(state, 'non-ASCII line breaks are interpreted as content');
          }
          state.documents.push(state.result);
          if (state.position === state.lineStart && testDocumentSeparator(state)) {
            if (state.input.charCodeAt(state.position) === 0x2E) {
              state.position += 3;
              skipSeparationSpace(state, true, -1);
            }
            return;
          }
          if (state.position < (state.length - 1)) {
            throwError(state, 'end of the stream or a document separator is expected');
          } else {
            return;
          }
        }
        function loadDocuments(input, options) {
          input = String(input);
          options = options || {};
          if (input.length !== 0) {
            if (input.charCodeAt(input.length - 1) !== 0x0A && input.charCodeAt(input.length - 1) !== 0x0D) {
              input += '\n';
            }
            if (input.charCodeAt(0) === 0xFEFF) {
              input = input.slice(1);
            }
          }
          var state = new State(input, options);
          state.input += '\0';
          while (state.input.charCodeAt(state.position) === 0x20) {
            state.lineIndent += 1;
            state.position += 1;
          }
          while (state.position < (state.length - 1)) {
            readDocument(state);
          }
          return state.documents;
        }
        function loadAll(input, iterator, options) {
          var documents = loadDocuments(input, options),
              index,
              length;
          for (index = 0, length = documents.length; index < length; index += 1) {
            iterator(documents[index]);
          }
        }
        function load(input, options) {
          var documents = loadDocuments(input, options);
          if (documents.length === 0) {
            return undefined;
          } else if (documents.length === 1) {
            return documents[0];
          }
          throw new YAMLException('expected a single document in the stream, but found more');
        }
        function safeLoadAll(input, output, options) {
          loadAll(input, output, common.extend({schema: DEFAULT_SAFE_SCHEMA}, options));
        }
        function safeLoad(input, options) {
          return load(input, common.extend({schema: DEFAULT_SAFE_SCHEMA}, options));
        }
        module.exports.loadAll = loadAll;
        module.exports.load = load;
        module.exports.safeLoadAll = safeLoadAll;
        module.exports.safeLoad = safeLoad;
      }, {
        "./common": 22,
        "./exception": 24,
        "./mark": 26,
        "./schema/default_full": 29,
        "./schema/default_safe": 30
      }],
      26: [function(require, module, exports) {
        'use strict';
        var common = require('./common');
        function Mark(name, buffer, position, line, column) {
          this.name = name;
          this.buffer = buffer;
          this.position = position;
          this.line = line;
          this.column = column;
        }
        Mark.prototype.getSnippet = function getSnippet(indent, maxLength) {
          var head,
              start,
              tail,
              end,
              snippet;
          if (!this.buffer)
            return null;
          indent = indent || 4;
          maxLength = maxLength || 75;
          head = '';
          start = this.position;
          while (start > 0 && '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(start - 1)) === -1) {
            start -= 1;
            if (this.position - start > (maxLength / 2 - 1)) {
              head = ' ... ';
              start += 5;
              break;
            }
          }
          tail = '';
          end = this.position;
          while (end < this.buffer.length && '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(end)) === -1) {
            end += 1;
            if (end - this.position > (maxLength / 2 - 1)) {
              tail = ' ... ';
              end -= 5;
              break;
            }
          }
          snippet = this.buffer.slice(start, end);
          return common.repeat(' ', indent) + head + snippet + tail + '\n' + common.repeat(' ', indent + this.position - start + head.length) + '^';
        };
        Mark.prototype.toString = function toString(compact) {
          var snippet,
              where = '';
          if (this.name) {
            where += 'in "' + this.name + '" ';
          }
          where += 'at line ' + (this.line + 1) + ', column ' + (this.column + 1);
          if (!compact) {
            snippet = this.getSnippet();
            if (snippet) {
              where += ':\n' + snippet;
            }
          }
          return where;
        };
        module.exports = Mark;
      }, {"./common": 22}],
      27: [function(require, module, exports) {
        'use strict';
        var common = require('./common');
        var YAMLException = require('./exception');
        var Type = require('./type');
        function compileList(schema, name, result) {
          var exclude = [];
          schema.include.forEach(function(includedSchema) {
            result = compileList(includedSchema, name, result);
          });
          schema[name].forEach(function(currentType) {
            result.forEach(function(previousType, previousIndex) {
              if (previousType.tag === currentType.tag) {
                exclude.push(previousIndex);
              }
            });
            result.push(currentType);
          });
          return result.filter(function(type, index) {
            return exclude.indexOf(index) === -1;
          });
        }
        function compileMap() {
          var result = {},
              index,
              length;
          function collectType(type) {
            result[type.tag] = type;
          }
          for (index = 0, length = arguments.length; index < length; index += 1) {
            arguments[index].forEach(collectType);
          }
          return result;
        }
        function Schema(definition) {
          this.include = definition.include || [];
          this.implicit = definition.implicit || [];
          this.explicit = definition.explicit || [];
          this.implicit.forEach(function(type) {
            if (type.loadKind && type.loadKind !== 'scalar') {
              throw new YAMLException('There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.');
            }
          });
          this.compiledImplicit = compileList(this, 'implicit', []);
          this.compiledExplicit = compileList(this, 'explicit', []);
          this.compiledTypeMap = compileMap(this.compiledImplicit, this.compiledExplicit);
        }
        Schema.DEFAULT = null;
        Schema.create = function createSchema() {
          var schemas,
              types;
          switch (arguments.length) {
            case 1:
              schemas = Schema.DEFAULT;
              types = arguments[0];
              break;
            case 2:
              schemas = arguments[0];
              types = arguments[1];
              break;
            default:
              throw new YAMLException('Wrong number of arguments for Schema.create function');
          }
          schemas = common.toArray(schemas);
          types = common.toArray(types);
          if (!schemas.every(function(schema) {
            return schema instanceof Schema;
          })) {
            throw new YAMLException('Specified list of super schemas (or a single Schema object) contains a non-Schema object.');
          }
          if (!types.every(function(type) {
            return type instanceof Type;
          })) {
            throw new YAMLException('Specified list of YAML types (or a single Type object) contains a non-Type object.');
          }
          return new Schema({
            include: schemas,
            explicit: types
          });
        };
        module.exports = Schema;
      }, {
        "./common": 22,
        "./exception": 24,
        "./type": 33
      }],
      28: [function(require, module, exports) {
        'use strict';
        var Schema = require('../schema');
        module.exports = new Schema({include: [require('./json')]});
      }, {
        "../schema": 27,
        "./json": 32
      }],
      29: [function(require, module, exports) {
        'use strict';
        var Schema = require('../schema');
        module.exports = Schema.DEFAULT = new Schema({
          include: [require('./default_safe')],
          explicit: [require('../type/js/undefined'), require('../type/js/regexp'), require('../type/js/function')]
        });
      }, {
        "../schema": 27,
        "../type/js/function": 38,
        "../type/js/regexp": 39,
        "../type/js/undefined": 40,
        "./default_safe": 30
      }],
      30: [function(require, module, exports) {
        'use strict';
        var Schema = require('../schema');
        module.exports = new Schema({
          include: [require('./core')],
          implicit: [require('../type/timestamp'), require('../type/merge')],
          explicit: [require('../type/binary'), require('../type/omap'), require('../type/pairs'), require('../type/set')]
        });
      }, {
        "../schema": 27,
        "../type/binary": 34,
        "../type/merge": 42,
        "../type/omap": 44,
        "../type/pairs": 45,
        "../type/set": 47,
        "../type/timestamp": 49,
        "./core": 28
      }],
      31: [function(require, module, exports) {
        'use strict';
        var Schema = require('../schema');
        module.exports = new Schema({explicit: [require('../type/str'), require('../type/seq'), require('../type/map')]});
      }, {
        "../schema": 27,
        "../type/map": 41,
        "../type/seq": 46,
        "../type/str": 48
      }],
      32: [function(require, module, exports) {
        'use strict';
        var Schema = require('../schema');
        module.exports = new Schema({
          include: [require('./failsafe')],
          implicit: [require('../type/null'), require('../type/bool'), require('../type/int'), require('../type/float')]
        });
      }, {
        "../schema": 27,
        "../type/bool": 35,
        "../type/float": 36,
        "../type/int": 37,
        "../type/null": 43,
        "./failsafe": 31
      }],
      33: [function(require, module, exports) {
        'use strict';
        var YAMLException = require('./exception');
        var TYPE_CONSTRUCTOR_OPTIONS = ['kind', 'resolve', 'construct', 'instanceOf', 'predicate', 'represent', 'defaultStyle', 'styleAliases'];
        var YAML_NODE_KINDS = ['scalar', 'sequence', 'mapping'];
        function compileStyleAliases(map) {
          var result = {};
          if (map !== null) {
            Object.keys(map).forEach(function(style) {
              map[style].forEach(function(alias) {
                result[String(alias)] = style;
              });
            });
          }
          return result;
        }
        function Type(tag, options) {
          options = options || {};
          Object.keys(options).forEach(function(name) {
            if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
              throw new YAMLException('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
            }
          });
          this.tag = tag;
          this.kind = options['kind'] || null;
          this.resolve = options['resolve'] || function() {
            return true;
          };
          this.construct = options['construct'] || function(data) {
            return data;
          };
          this.instanceOf = options['instanceOf'] || null;
          this.predicate = options['predicate'] || null;
          this.represent = options['represent'] || null;
          this.defaultStyle = options['defaultStyle'] || null;
          this.styleAliases = compileStyleAliases(options['styleAliases'] || null);
          if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
            throw new YAMLException('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
          }
        }
        module.exports = Type;
      }, {"./exception": 24}],
      34: [function(require, module, exports) {
        'use strict';
        var NodeBuffer = require('buffer').Buffer;
        var Type = require('../type');
        var BASE64_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r';
        function resolveYamlBinary(data) {
          if (data === null)
            return false;
          var code,
              idx,
              bitlen = 0,
              max = data.length,
              map = BASE64_MAP;
          for (idx = 0; idx < max; idx++) {
            code = map.indexOf(data.charAt(idx));
            if (code > 64)
              continue;
            if (code < 0)
              return false;
            bitlen += 6;
          }
          return (bitlen % 8) === 0;
        }
        function constructYamlBinary(data) {
          var idx,
              tailbits,
              input = data.replace(/[\r\n=]/g, ''),
              max = input.length,
              map = BASE64_MAP,
              bits = 0,
              result = [];
          for (idx = 0; idx < max; idx++) {
            if ((idx % 4 === 0) && idx) {
              result.push((bits >> 16) & 0xFF);
              result.push((bits >> 8) & 0xFF);
              result.push(bits & 0xFF);
            }
            bits = (bits << 6) | map.indexOf(input.charAt(idx));
          }
          tailbits = (max % 4) * 6;
          if (tailbits === 0) {
            result.push((bits >> 16) & 0xFF);
            result.push((bits >> 8) & 0xFF);
            result.push(bits & 0xFF);
          } else if (tailbits === 18) {
            result.push((bits >> 10) & 0xFF);
            result.push((bits >> 2) & 0xFF);
          } else if (tailbits === 12) {
            result.push((bits >> 4) & 0xFF);
          }
          if (NodeBuffer)
            return new NodeBuffer(result);
          return result;
        }
        function representYamlBinary(object) {
          var result = '',
              bits = 0,
              idx,
              tail,
              max = object.length,
              map = BASE64_MAP;
          for (idx = 0; idx < max; idx++) {
            if ((idx % 3 === 0) && idx) {
              result += map[(bits >> 18) & 0x3F];
              result += map[(bits >> 12) & 0x3F];
              result += map[(bits >> 6) & 0x3F];
              result += map[bits & 0x3F];
            }
            bits = (bits << 8) + object[idx];
          }
          tail = max % 3;
          if (tail === 0) {
            result += map[(bits >> 18) & 0x3F];
            result += map[(bits >> 12) & 0x3F];
            result += map[(bits >> 6) & 0x3F];
            result += map[bits & 0x3F];
          } else if (tail === 2) {
            result += map[(bits >> 10) & 0x3F];
            result += map[(bits >> 4) & 0x3F];
            result += map[(bits << 2) & 0x3F];
            result += map[64];
          } else if (tail === 1) {
            result += map[(bits >> 2) & 0x3F];
            result += map[(bits << 4) & 0x3F];
            result += map[64];
            result += map[64];
          }
          return result;
        }
        function isBinary(object) {
          return NodeBuffer && NodeBuffer.isBuffer(object);
        }
        module.exports = new Type('tag:yaml.org,2002:binary', {
          kind: 'scalar',
          resolve: resolveYamlBinary,
          construct: constructYamlBinary,
          predicate: isBinary,
          represent: representYamlBinary
        });
      }, {
        "../type": 33,
        "buffer": 12
      }],
      35: [function(require, module, exports) {
        'use strict';
        var Type = require('../type');
        function resolveYamlBoolean(data) {
          if (data === null)
            return false;
          var max = data.length;
          return (max === 4 && (data === 'true' || data === 'True' || data === 'TRUE')) || (max === 5 && (data === 'false' || data === 'False' || data === 'FALSE'));
        }
        function constructYamlBoolean(data) {
          return data === 'true' || data === 'True' || data === 'TRUE';
        }
        function isBoolean(object) {
          return Object.prototype.toString.call(object) === '[object Boolean]';
        }
        module.exports = new Type('tag:yaml.org,2002:bool', {
          kind: 'scalar',
          resolve: resolveYamlBoolean,
          construct: constructYamlBoolean,
          predicate: isBoolean,
          represent: {
            lowercase: function(object) {
              return object ? 'true' : 'false';
            },
            uppercase: function(object) {
              return object ? 'TRUE' : 'FALSE';
            },
            camelcase: function(object) {
              return object ? 'True' : 'False';
            }
          },
          defaultStyle: 'lowercase'
        });
      }, {"../type": 33}],
      36: [function(require, module, exports) {
        'use strict';
        var common = require('../common');
        var Type = require('../type');
        var YAML_FLOAT_PATTERN = new RegExp('^(?:[-+]?(?:[0-9][0-9_]*)\\.[0-9_]*(?:[eE][-+][0-9]+)?' + '|\\.[0-9_]+(?:[eE][-+][0-9]+)?' + '|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*' + '|[-+]?\\.(?:inf|Inf|INF)' + '|\\.(?:nan|NaN|NAN))$');
        function resolveYamlFloat(data) {
          if (data === null)
            return false;
          if (!YAML_FLOAT_PATTERN.test(data))
            return false;
          return true;
        }
        function constructYamlFloat(data) {
          var value,
              sign,
              base,
              digits;
          value = data.replace(/_/g, '').toLowerCase();
          sign = value[0] === '-' ? -1 : 1;
          digits = [];
          if ('+-'.indexOf(value[0]) >= 0) {
            value = value.slice(1);
          }
          if (value === '.inf') {
            return (sign === 1) ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
          } else if (value === '.nan') {
            return NaN;
          } else if (value.indexOf(':') >= 0) {
            value.split(':').forEach(function(v) {
              digits.unshift(parseFloat(v, 10));
            });
            value = 0.0;
            base = 1;
            digits.forEach(function(d) {
              value += d * base;
              base *= 60;
            });
            return sign * value;
          }
          return sign * parseFloat(value, 10);
        }
        var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
        function representYamlFloat(object, style) {
          var res;
          if (isNaN(object)) {
            switch (style) {
              case 'lowercase':
                return '.nan';
              case 'uppercase':
                return '.NAN';
              case 'camelcase':
                return '.NaN';
            }
          } else if (Number.POSITIVE_INFINITY === object) {
            switch (style) {
              case 'lowercase':
                return '.inf';
              case 'uppercase':
                return '.INF';
              case 'camelcase':
                return '.Inf';
            }
          } else if (Number.NEGATIVE_INFINITY === object) {
            switch (style) {
              case 'lowercase':
                return '-.inf';
              case 'uppercase':
                return '-.INF';
              case 'camelcase':
                return '-.Inf';
            }
          } else if (common.isNegativeZero(object)) {
            return '-0.0';
          }
          res = object.toString(10);
          return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace('e', '.e') : res;
        }
        function isFloat(object) {
          return (Object.prototype.toString.call(object) === '[object Number]') && (object % 1 !== 0 || common.isNegativeZero(object));
        }
        module.exports = new Type('tag:yaml.org,2002:float', {
          kind: 'scalar',
          resolve: resolveYamlFloat,
          construct: constructYamlFloat,
          predicate: isFloat,
          represent: representYamlFloat,
          defaultStyle: 'lowercase'
        });
      }, {
        "../common": 22,
        "../type": 33
      }],
      37: [function(require, module, exports) {
        'use strict';
        var common = require('../common');
        var Type = require('../type');
        function isHexCode(c) {
          return ((0x30 <= c) && (c <= 0x39)) || ((0x41 <= c) && (c <= 0x46)) || ((0x61 <= c) && (c <= 0x66));
        }
        function isOctCode(c) {
          return ((0x30 <= c) && (c <= 0x37));
        }
        function isDecCode(c) {
          return ((0x30 <= c) && (c <= 0x39));
        }
        function resolveYamlInteger(data) {
          if (data === null)
            return false;
          var max = data.length,
              index = 0,
              hasDigits = false,
              ch;
          if (!max)
            return false;
          ch = data[index];
          if (ch === '-' || ch === '+') {
            ch = data[++index];
          }
          if (ch === '0') {
            if (index + 1 === max)
              return true;
            ch = data[++index];
            if (ch === 'b') {
              index++;
              for (; index < max; index++) {
                ch = data[index];
                if (ch === '_')
                  continue;
                if (ch !== '0' && ch !== '1')
                  return false;
                hasDigits = true;
              }
              return hasDigits;
            }
            if (ch === 'x') {
              index++;
              for (; index < max; index++) {
                ch = data[index];
                if (ch === '_')
                  continue;
                if (!isHexCode(data.charCodeAt(index)))
                  return false;
                hasDigits = true;
              }
              return hasDigits;
            }
            for (; index < max; index++) {
              ch = data[index];
              if (ch === '_')
                continue;
              if (!isOctCode(data.charCodeAt(index)))
                return false;
              hasDigits = true;
            }
            return hasDigits;
          }
          for (; index < max; index++) {
            ch = data[index];
            if (ch === '_')
              continue;
            if (ch === ':')
              break;
            if (!isDecCode(data.charCodeAt(index))) {
              return false;
            }
            hasDigits = true;
          }
          if (!hasDigits)
            return false;
          if (ch !== ':')
            return true;
          return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
        }
        function constructYamlInteger(data) {
          var value = data,
              sign = 1,
              ch,
              base,
              digits = [];
          if (value.indexOf('_') !== -1) {
            value = value.replace(/_/g, '');
          }
          ch = value[0];
          if (ch === '-' || ch === '+') {
            if (ch === '-')
              sign = -1;
            value = value.slice(1);
            ch = value[0];
          }
          if (value === '0')
            return 0;
          if (ch === '0') {
            if (value[1] === 'b')
              return sign * parseInt(value.slice(2), 2);
            if (value[1] === 'x')
              return sign * parseInt(value, 16);
            return sign * parseInt(value, 8);
          }
          if (value.indexOf(':') !== -1) {
            value.split(':').forEach(function(v) {
              digits.unshift(parseInt(v, 10));
            });
            value = 0;
            base = 1;
            digits.forEach(function(d) {
              value += (d * base);
              base *= 60;
            });
            return sign * value;
          }
          return sign * parseInt(value, 10);
        }
        function isInteger(object) {
          return (Object.prototype.toString.call(object)) === '[object Number]' && (object % 1 === 0 && !common.isNegativeZero(object));
        }
        module.exports = new Type('tag:yaml.org,2002:int', {
          kind: 'scalar',
          resolve: resolveYamlInteger,
          construct: constructYamlInteger,
          predicate: isInteger,
          represent: {
            binary: function(object) {
              return '0b' + object.toString(2);
            },
            octal: function(object) {
              return '0' + object.toString(8);
            },
            decimal: function(object) {
              return object.toString(10);
            },
            hexadecimal: function(object) {
              return '0x' + object.toString(16).toUpperCase();
            }
          },
          defaultStyle: 'decimal',
          styleAliases: {
            binary: [2, 'bin'],
            octal: [8, 'oct'],
            decimal: [10, 'dec'],
            hexadecimal: [16, 'hex']
          }
        });
      }, {
        "../common": 22,
        "../type": 33
      }],
      38: [function(require, module, exports) {
        'use strict';
        var esprima;
        try {
          var _require = require;
          esprima = _require('esprima');
        } catch (_) {
          if (typeof window !== 'undefined')
            esprima = window.esprima;
        }
        var Type = require('../../type');
        function resolveJavascriptFunction(data) {
          if (data === null)
            return false;
          try {
            var source = '(' + data + ')',
                ast = esprima.parse(source, {range: true});
            if (ast.type !== 'Program' || ast.body.length !== 1 || ast.body[0].type !== 'ExpressionStatement' || ast.body[0].expression.type !== 'FunctionExpression') {
              return false;
            }
            return true;
          } catch (err) {
            return false;
          }
        }
        function constructJavascriptFunction(data) {
          var source = '(' + data + ')',
              ast = esprima.parse(source, {range: true}),
              params = [],
              body;
          if (ast.type !== 'Program' || ast.body.length !== 1 || ast.body[0].type !== 'ExpressionStatement' || ast.body[0].expression.type !== 'FunctionExpression') {
            throw new Error('Failed to resolve function');
          }
          ast.body[0].expression.params.forEach(function(param) {
            params.push(param.name);
          });
          body = ast.body[0].expression.body.range;
          return new Function(params, source.slice(body[0] + 1, body[1] - 1));
        }
        function representJavascriptFunction(object) {
          return object.toString();
        }
        function isFunction(object) {
          return Object.prototype.toString.call(object) === '[object Function]';
        }
        module.exports = new Type('tag:yaml.org,2002:js/function', {
          kind: 'scalar',
          resolve: resolveJavascriptFunction,
          construct: constructJavascriptFunction,
          predicate: isFunction,
          represent: representJavascriptFunction
        });
      }, {"../../type": 33}],
      39: [function(require, module, exports) {
        'use strict';
        var Type = require('../../type');
        function resolveJavascriptRegExp(data) {
          if (data === null)
            return false;
          if (data.length === 0)
            return false;
          var regexp = data,
              tail = /\/([gim]*)$/.exec(data),
              modifiers = '';
          if (regexp[0] === '/') {
            if (tail)
              modifiers = tail[1];
            if (modifiers.length > 3)
              return false;
            if (regexp[regexp.length - modifiers.length - 1] !== '/')
              return false;
          }
          return true;
        }
        function constructJavascriptRegExp(data) {
          var regexp = data,
              tail = /\/([gim]*)$/.exec(data),
              modifiers = '';
          if (regexp[0] === '/') {
            if (tail)
              modifiers = tail[1];
            regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
          }
          return new RegExp(regexp, modifiers);
        }
        function representJavascriptRegExp(object) {
          var result = '/' + object.source + '/';
          if (object.global)
            result += 'g';
          if (object.multiline)
            result += 'm';
          if (object.ignoreCase)
            result += 'i';
          return result;
        }
        function isRegExp(object) {
          return Object.prototype.toString.call(object) === '[object RegExp]';
        }
        module.exports = new Type('tag:yaml.org,2002:js/regexp', {
          kind: 'scalar',
          resolve: resolveJavascriptRegExp,
          construct: constructJavascriptRegExp,
          predicate: isRegExp,
          represent: representJavascriptRegExp
        });
      }, {"../../type": 33}],
      40: [function(require, module, exports) {
        'use strict';
        var Type = require('../../type');
        function resolveJavascriptUndefined() {
          return true;
        }
        function constructJavascriptUndefined() {
          return undefined;
        }
        function representJavascriptUndefined() {
          return '';
        }
        function isUndefined(object) {
          return typeof object === 'undefined';
        }
        module.exports = new Type('tag:yaml.org,2002:js/undefined', {
          kind: 'scalar',
          resolve: resolveJavascriptUndefined,
          construct: constructJavascriptUndefined,
          predicate: isUndefined,
          represent: representJavascriptUndefined
        });
      }, {"../../type": 33}],
      41: [function(require, module, exports) {
        'use strict';
        var Type = require('../type');
        module.exports = new Type('tag:yaml.org,2002:map', {
          kind: 'mapping',
          construct: function(data) {
            return data !== null ? data : {};
          }
        });
      }, {"../type": 33}],
      42: [function(require, module, exports) {
        'use strict';
        var Type = require('../type');
        function resolveYamlMerge(data) {
          return data === '<<' || data === null;
        }
        module.exports = new Type('tag:yaml.org,2002:merge', {
          kind: 'scalar',
          resolve: resolveYamlMerge
        });
      }, {"../type": 33}],
      43: [function(require, module, exports) {
        'use strict';
        var Type = require('../type');
        function resolveYamlNull(data) {
          if (data === null)
            return true;
          var max = data.length;
          return (max === 1 && data === '~') || (max === 4 && (data === 'null' || data === 'Null' || data === 'NULL'));
        }
        function constructYamlNull() {
          return null;
        }
        function isNull(object) {
          return object === null;
        }
        module.exports = new Type('tag:yaml.org,2002:null', {
          kind: 'scalar',
          resolve: resolveYamlNull,
          construct: constructYamlNull,
          predicate: isNull,
          represent: {
            canonical: function() {
              return '~';
            },
            lowercase: function() {
              return 'null';
            },
            uppercase: function() {
              return 'NULL';
            },
            camelcase: function() {
              return 'Null';
            }
          },
          defaultStyle: 'lowercase'
        });
      }, {"../type": 33}],
      44: [function(require, module, exports) {
        'use strict';
        var Type = require('../type');
        var _hasOwnProperty = Object.prototype.hasOwnProperty;
        var _toString = Object.prototype.toString;
        function resolveYamlOmap(data) {
          if (data === null)
            return true;
          var objectKeys = [],
              index,
              length,
              pair,
              pairKey,
              pairHasKey,
              object = data;
          for (index = 0, length = object.length; index < length; index += 1) {
            pair = object[index];
            pairHasKey = false;
            if (_toString.call(pair) !== '[object Object]')
              return false;
            for (pairKey in pair) {
              if (_hasOwnProperty.call(pair, pairKey)) {
                if (!pairHasKey)
                  pairHasKey = true;
                else
                  return false;
              }
            }
            if (!pairHasKey)
              return false;
            if (objectKeys.indexOf(pairKey) === -1)
              objectKeys.push(pairKey);
            else
              return false;
          }
          return true;
        }
        function constructYamlOmap(data) {
          return data !== null ? data : [];
        }
        module.exports = new Type('tag:yaml.org,2002:omap', {
          kind: 'sequence',
          resolve: resolveYamlOmap,
          construct: constructYamlOmap
        });
      }, {"../type": 33}],
      45: [function(require, module, exports) {
        'use strict';
        var Type = require('../type');
        var _toString = Object.prototype.toString;
        function resolveYamlPairs(data) {
          if (data === null)
            return true;
          var index,
              length,
              pair,
              keys,
              result,
              object = data;
          result = new Array(object.length);
          for (index = 0, length = object.length; index < length; index += 1) {
            pair = object[index];
            if (_toString.call(pair) !== '[object Object]')
              return false;
            keys = Object.keys(pair);
            if (keys.length !== 1)
              return false;
            result[index] = [keys[0], pair[keys[0]]];
          }
          return true;
        }
        function constructYamlPairs(data) {
          if (data === null)
            return [];
          var index,
              length,
              pair,
              keys,
              result,
              object = data;
          result = new Array(object.length);
          for (index = 0, length = object.length; index < length; index += 1) {
            pair = object[index];
            keys = Object.keys(pair);
            result[index] = [keys[0], pair[keys[0]]];
          }
          return result;
        }
        module.exports = new Type('tag:yaml.org,2002:pairs', {
          kind: 'sequence',
          resolve: resolveYamlPairs,
          construct: constructYamlPairs
        });
      }, {"../type": 33}],
      46: [function(require, module, exports) {
        'use strict';
        var Type = require('../type');
        module.exports = new Type('tag:yaml.org,2002:seq', {
          kind: 'sequence',
          construct: function(data) {
            return data !== null ? data : [];
          }
        });
      }, {"../type": 33}],
      47: [function(require, module, exports) {
        'use strict';
        var Type = require('../type');
        var _hasOwnProperty = Object.prototype.hasOwnProperty;
        function resolveYamlSet(data) {
          if (data === null)
            return true;
          var key,
              object = data;
          for (key in object) {
            if (_hasOwnProperty.call(object, key)) {
              if (object[key] !== null)
                return false;
            }
          }
          return true;
        }
        function constructYamlSet(data) {
          return data !== null ? data : {};
        }
        module.exports = new Type('tag:yaml.org,2002:set', {
          kind: 'mapping',
          resolve: resolveYamlSet,
          construct: constructYamlSet
        });
      }, {"../type": 33}],
      48: [function(require, module, exports) {
        'use strict';
        var Type = require('../type');
        module.exports = new Type('tag:yaml.org,2002:str', {
          kind: 'scalar',
          construct: function(data) {
            return data !== null ? data : '';
          }
        });
      }, {"../type": 33}],
      49: [function(require, module, exports) {
        'use strict';
        var Type = require('../type');
        var YAML_TIMESTAMP_REGEXP = new RegExp('^([0-9][0-9][0-9][0-9])' + '-([0-9][0-9]?)' + '-([0-9][0-9]?)' + '(?:(?:[Tt]|[ \\t]+)' + '([0-9][0-9]?)' + ':([0-9][0-9])' + ':([0-9][0-9])' + '(?:\\.([0-9]*))?' + '(?:[ \\t]*(Z|([-+])([0-9][0-9]?)' + '(?::([0-9][0-9]))?))?)?$');
        function resolveYamlTimestamp(data) {
          if (data === null)
            return false;
          if (YAML_TIMESTAMP_REGEXP.exec(data) === null)
            return false;
          return true;
        }
        function constructYamlTimestamp(data) {
          var match,
              year,
              month,
              day,
              hour,
              minute,
              second,
              fraction = 0,
              delta = null,
              tz_hour,
              tz_minute,
              date;
          match = YAML_TIMESTAMP_REGEXP.exec(data);
          if (match === null)
            throw new Error('Date resolve error');
          year = +(match[1]);
          month = +(match[2]) - 1;
          day = +(match[3]);
          if (!match[4]) {
            return new Date(Date.UTC(year, month, day));
          }
          hour = +(match[4]);
          minute = +(match[5]);
          second = +(match[6]);
          if (match[7]) {
            fraction = match[7].slice(0, 3);
            while (fraction.length < 3) {
              fraction += '0';
            }
            fraction = +fraction;
          }
          if (match[9]) {
            tz_hour = +(match[10]);
            tz_minute = +(match[11] || 0);
            delta = (tz_hour * 60 + tz_minute) * 60000;
            if (match[9] === '-')
              delta = -delta;
          }
          date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
          if (delta)
            date.setTime(date.getTime() - delta);
          return date;
        }
        function representYamlTimestamp(object) {
          return object.toISOString();
        }
        module.exports = new Type('tag:yaml.org,2002:timestamp', {
          kind: 'scalar',
          resolve: resolveYamlTimestamp,
          construct: constructYamlTimestamp,
          instanceOf: Date,
          represent: representYamlTimestamp
        });
      }, {"../type": 33}],
      50: [function(require, module, exports) {
        var baseIndexOf = require('../internal/baseIndexOf'),
            binaryIndex = require('../internal/binaryIndex');
        var nativeMax = Math.max;
        function indexOf(array, value, fromIndex) {
          var length = array ? array.length : 0;
          if (!length) {
            return -1;
          }
          if (typeof fromIndex == 'number') {
            fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : fromIndex;
          } else if (fromIndex) {
            var index = binaryIndex(array, value);
            if (index < length && (value === value ? (value === array[index]) : (array[index] !== array[index]))) {
              return index;
            }
            return -1;
          }
          return baseIndexOf(array, value, fromIndex || 0);
        }
        module.exports = indexOf;
      }, {
        "../internal/baseIndexOf": 79,
        "../internal/binaryIndex": 93
      }],
      51: [function(require, module, exports) {
        function last(array) {
          var length = array ? array.length : 0;
          return length ? array[length - 1] : undefined;
        }
        module.exports = last;
      }, {}],
      52: [function(require, module, exports) {
        var LazyWrapper = require('../internal/LazyWrapper'),
            LodashWrapper = require('../internal/LodashWrapper'),
            baseLodash = require('../internal/baseLodash'),
            isArray = require('../lang/isArray'),
            isObjectLike = require('../internal/isObjectLike'),
            wrapperClone = require('../internal/wrapperClone');
        var objectProto = Object.prototype;
        var hasOwnProperty = objectProto.hasOwnProperty;
        function lodash(value) {
          if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
            if (value instanceof LodashWrapper) {
              return value;
            }
            if (hasOwnProperty.call(value, '__chain__') && hasOwnProperty.call(value, '__wrapped__')) {
              return wrapperClone(value);
            }
          }
          return new LodashWrapper(value);
        }
        lodash.prototype = baseLodash.prototype;
        module.exports = lodash;
      }, {
        "../internal/LazyWrapper": 61,
        "../internal/LodashWrapper": 62,
        "../internal/baseLodash": 83,
        "../internal/isObjectLike": 127,
        "../internal/wrapperClone": 138,
        "../lang/isArray": 141
      }],
      53: [function(require, module, exports) {
        module.exports = require('./forEach');
      }, {"./forEach": 55}],
      54: [function(require, module, exports) {
        var baseEach = require('../internal/baseEach'),
            createFind = require('../internal/createFind');
        var find = createFind(baseEach);
        module.exports = find;
      }, {
        "../internal/baseEach": 72,
        "../internal/createFind": 103
      }],
      55: [function(require, module, exports) {
        var arrayEach = require('../internal/arrayEach'),
            baseEach = require('../internal/baseEach'),
            createForEach = require('../internal/createForEach');
        var forEach = createForEach(arrayEach, baseEach);
        module.exports = forEach;
      }, {
        "../internal/arrayEach": 64,
        "../internal/baseEach": 72,
        "../internal/createForEach": 104
      }],
      56: [function(require, module, exports) {
        var baseIndexOf = require('../internal/baseIndexOf'),
            getLength = require('../internal/getLength'),
            isArray = require('../lang/isArray'),
            isIterateeCall = require('../internal/isIterateeCall'),
            isLength = require('../internal/isLength'),
            isString = require('../lang/isString'),
            values = require('../object/values');
        var nativeMax = Math.max;
        function includes(collection, target, fromIndex, guard) {
          var length = collection ? getLength(collection) : 0;
          if (!isLength(length)) {
            collection = values(collection);
            length = collection.length;
          }
          if (typeof fromIndex != 'number' || (guard && isIterateeCall(target, fromIndex, guard))) {
            fromIndex = 0;
          } else {
            fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : (fromIndex || 0);
          }
          return (typeof collection == 'string' || !isArray(collection) && isString(collection)) ? (fromIndex <= length && collection.indexOf(target, fromIndex) > -1) : (!!length && baseIndexOf(collection, target, fromIndex) > -1);
        }
        module.exports = includes;
      }, {
        "../internal/baseIndexOf": 79,
        "../internal/getLength": 113,
        "../internal/isIterateeCall": 123,
        "../internal/isLength": 126,
        "../lang/isArray": 141,
        "../lang/isString": 147,
        "../object/values": 153
      }],
      57: [function(require, module, exports) {
        var arrayMap = require('../internal/arrayMap'),
            baseCallback = require('../internal/baseCallback'),
            baseMap = require('../internal/baseMap'),
            isArray = require('../lang/isArray');
        function map(collection, iteratee, thisArg) {
          var func = isArray(collection) ? arrayMap : baseMap;
          iteratee = baseCallback(iteratee, thisArg, 3);
          return func(collection, iteratee);
        }
        module.exports = map;
      }, {
        "../internal/arrayMap": 65,
        "../internal/baseCallback": 68,
        "../internal/baseMap": 84,
        "../lang/isArray": 141
      }],
      58: [function(require, module, exports) {
        var getNative = require('../internal/getNative');
        var nativeNow = getNative(Date, 'now');
        var now = nativeNow || function() {
          return new Date().getTime();
        };
        module.exports = now;
      }, {"../internal/getNative": 115}],
      59: [function(require, module, exports) {
        var createWrapper = require('../internal/createWrapper'),
            replaceHolders = require('../internal/replaceHolders'),
            restParam = require('./restParam');
        var BIND_FLAG = 1,
            PARTIAL_FLAG = 32;
        var bind = restParam(function(func, thisArg, partials) {
          var bitmask = BIND_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, bind.placeholder);
            bitmask |= PARTIAL_FLAG;
          }
          return createWrapper(func, bitmask, thisArg, partials, holders);
        });
        bind.placeholder = {};
        module.exports = bind;
      }, {
        "../internal/createWrapper": 107,
        "../internal/replaceHolders": 133,
        "./restParam": 60
      }],
      60: [function(require, module, exports) {
        var FUNC_ERROR_TEXT = 'Expected a function';
        var nativeMax = Math.max;
        function restParam(func, start) {
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
          return function() {
            var args = arguments,
                index = -1,
                length = nativeMax(args.length - start, 0),
                rest = Array(length);
            while (++index < length) {
              rest[index] = args[start + index];
            }
            switch (start) {
              case 0:
                return func.call(this, rest);
              case 1:
                return func.call(this, args[0], rest);
              case 2:
                return func.call(this, args[0], args[1], rest);
            }
            var otherArgs = Array(start + 1);
            index = -1;
            while (++index < start) {
              otherArgs[index] = args[index];
            }
            otherArgs[start] = rest;
            return func.apply(this, otherArgs);
          };
        }
        module.exports = restParam;
      }, {}],
      61: [function(require, module, exports) {
        var baseCreate = require('./baseCreate'),
            baseLodash = require('./baseLodash');
        var POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
        function LazyWrapper(value) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__dir__ = 1;
          this.__filtered__ = false;
          this.__iteratees__ = [];
          this.__takeCount__ = POSITIVE_INFINITY;
          this.__views__ = [];
        }
        LazyWrapper.prototype = baseCreate(baseLodash.prototype);
        LazyWrapper.prototype.constructor = LazyWrapper;
        module.exports = LazyWrapper;
      }, {
        "./baseCreate": 71,
        "./baseLodash": 83
      }],
      62: [function(require, module, exports) {
        var baseCreate = require('./baseCreate'),
            baseLodash = require('./baseLodash');
        function LodashWrapper(value, chainAll, actions) {
          this.__wrapped__ = value;
          this.__actions__ = actions || [];
          this.__chain__ = !!chainAll;
        }
        LodashWrapper.prototype = baseCreate(baseLodash.prototype);
        LodashWrapper.prototype.constructor = LodashWrapper;
        module.exports = LodashWrapper;
      }, {
        "./baseCreate": 71,
        "./baseLodash": 83
      }],
      63: [function(require, module, exports) {
        function arrayCopy(source, array) {
          var index = -1,
              length = source.length;
          array || (array = Array(length));
          while (++index < length) {
            array[index] = source[index];
          }
          return array;
        }
        module.exports = arrayCopy;
      }, {}],
      64: [function(require, module, exports) {
        function arrayEach(array, iteratee) {
          var index = -1,
              length = array.length;
          while (++index < length) {
            if (iteratee(array[index], index, array) === false) {
              break;
            }
          }
          return array;
        }
        module.exports = arrayEach;
      }, {}],
      65: [function(require, module, exports) {
        function arrayMap(array, iteratee) {
          var index = -1,
              length = array.length,
              result = Array(length);
          while (++index < length) {
            result[index] = iteratee(array[index], index, array);
          }
          return result;
        }
        module.exports = arrayMap;
      }, {}],
      66: [function(require, module, exports) {
        function arraySome(array, predicate) {
          var index = -1,
              length = array.length;
          while (++index < length) {
            if (predicate(array[index], index, array)) {
              return true;
            }
          }
          return false;
        }
        module.exports = arraySome;
      }, {}],
      67: [function(require, module, exports) {
        var baseCopy = require('./baseCopy'),
            keys = require('../object/keys');
        function baseAssign(object, source) {
          return source == null ? object : baseCopy(source, keys(source), object);
        }
        module.exports = baseAssign;
      }, {
        "../object/keys": 150,
        "./baseCopy": 70
      }],
      68: [function(require, module, exports) {
        var baseMatches = require('./baseMatches'),
            baseMatchesProperty = require('./baseMatchesProperty'),
            bindCallback = require('./bindCallback'),
            identity = require('../utility/identity'),
            property = require('../utility/property');
        function baseCallback(func, thisArg, argCount) {
          var type = typeof func;
          if (type == 'function') {
            return thisArg === undefined ? func : bindCallback(func, thisArg, argCount);
          }
          if (func == null) {
            return identity;
          }
          if (type == 'object') {
            return baseMatches(func);
          }
          return thisArg === undefined ? property(func) : baseMatchesProperty(func, thisArg);
        }
        module.exports = baseCallback;
      }, {
        "../utility/identity": 155,
        "../utility/property": 157,
        "./baseMatches": 85,
        "./baseMatchesProperty": 86,
        "./bindCallback": 95
      }],
      69: [function(require, module, exports) {
        var arrayCopy = require('./arrayCopy'),
            arrayEach = require('./arrayEach'),
            baseAssign = require('./baseAssign'),
            baseForOwn = require('./baseForOwn'),
            initCloneArray = require('./initCloneArray'),
            initCloneByTag = require('./initCloneByTag'),
            initCloneObject = require('./initCloneObject'),
            isArray = require('../lang/isArray'),
            isHostObject = require('./isHostObject'),
            isObject = require('../lang/isObject');
        var argsTag = '[object Arguments]',
            arrayTag = '[object Array]',
            boolTag = '[object Boolean]',
            dateTag = '[object Date]',
            errorTag = '[object Error]',
            funcTag = '[object Function]',
            mapTag = '[object Map]',
            numberTag = '[object Number]',
            objectTag = '[object Object]',
            regexpTag = '[object RegExp]',
            setTag = '[object Set]',
            stringTag = '[object String]',
            weakMapTag = '[object WeakMap]';
        var arrayBufferTag = '[object ArrayBuffer]',
            float32Tag = '[object Float32Array]',
            float64Tag = '[object Float64Array]',
            int8Tag = '[object Int8Array]',
            int16Tag = '[object Int16Array]',
            int32Tag = '[object Int32Array]',
            uint8Tag = '[object Uint8Array]',
            uint8ClampedTag = '[object Uint8ClampedArray]',
            uint16Tag = '[object Uint16Array]',
            uint32Tag = '[object Uint32Array]';
        var cloneableTags = {};
        cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[stringTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
        cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[mapTag] = cloneableTags[setTag] = cloneableTags[weakMapTag] = false;
        var objectProto = Object.prototype;
        var objToString = objectProto.toString;
        function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
          var result;
          if (customizer) {
            result = object ? customizer(value, key, object) : customizer(value);
          }
          if (result !== undefined) {
            return result;
          }
          if (!isObject(value)) {
            return value;
          }
          var isArr = isArray(value);
          if (isArr) {
            result = initCloneArray(value);
            if (!isDeep) {
              return arrayCopy(value, result);
            }
          } else {
            var tag = objToString.call(value),
                isFunc = tag == funcTag;
            if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
              if (isHostObject(value)) {
                return object ? value : {};
              }
              result = initCloneObject(isFunc ? {} : value);
              if (!isDeep) {
                return baseAssign(result, value);
              }
            } else {
              return cloneableTags[tag] ? initCloneByTag(value, tag, isDeep) : (object ? value : {});
            }
          }
          stackA || (stackA = []);
          stackB || (stackB = []);
          var length = stackA.length;
          while (length--) {
            if (stackA[length] == value) {
              return stackB[length];
            }
          }
          stackA.push(value);
          stackB.push(result);
          (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
            result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
          });
          return result;
        }
        module.exports = baseClone;
      }, {
        "../lang/isArray": 141,
        "../lang/isObject": 145,
        "./arrayCopy": 63,
        "./arrayEach": 64,
        "./baseAssign": 67,
        "./baseForOwn": 77,
        "./initCloneArray": 117,
        "./initCloneByTag": 118,
        "./initCloneObject": 119,
        "./isHostObject": 121
      }],
      70: [function(require, module, exports) {
        function baseCopy(source, props, object) {
          object || (object = {});
          var index = -1,
              length = props.length;
          while (++index < length) {
            var key = props[index];
            object[key] = source[key];
          }
          return object;
        }
        module.exports = baseCopy;
      }, {}],
      71: [function(require, module, exports) {
        var isObject = require('../lang/isObject');
        var baseCreate = (function() {
          function object() {}
          return function(prototype) {
            if (isObject(prototype)) {
              object.prototype = prototype;
              var result = new object;
              object.prototype = undefined;
            }
            return result || {};
          };
        }());
        module.exports = baseCreate;
      }, {"../lang/isObject": 145}],
      72: [function(require, module, exports) {
        var baseForOwn = require('./baseForOwn'),
            createBaseEach = require('./createBaseEach');
        var baseEach = createBaseEach(baseForOwn);
        module.exports = baseEach;
      }, {
        "./baseForOwn": 77,
        "./createBaseEach": 99
      }],
      73: [function(require, module, exports) {
        function baseFind(collection, predicate, eachFunc, retKey) {
          var result;
          eachFunc(collection, function(value, key, collection) {
            if (predicate(value, key, collection)) {
              result = retKey ? key : value;
              return false;
            }
          });
          return result;
        }
        module.exports = baseFind;
      }, {}],
      74: [function(require, module, exports) {
        function baseFindIndex(array, predicate, fromRight) {
          var length = array.length,
              index = fromRight ? length : -1;
          while ((fromRight ? index-- : ++index < length)) {
            if (predicate(array[index], index, array)) {
              return index;
            }
          }
          return -1;
        }
        module.exports = baseFindIndex;
      }, {}],
      75: [function(require, module, exports) {
        var createBaseFor = require('./createBaseFor');
        var baseFor = createBaseFor();
        module.exports = baseFor;
      }, {"./createBaseFor": 100}],
      76: [function(require, module, exports) {
        var baseFor = require('./baseFor'),
            keysIn = require('../object/keysIn');
        function baseForIn(object, iteratee) {
          return baseFor(object, iteratee, keysIn);
        }
        module.exports = baseForIn;
      }, {
        "../object/keysIn": 151,
        "./baseFor": 75
      }],
      77: [function(require, module, exports) {
        var baseFor = require('./baseFor'),
            keys = require('../object/keys');
        function baseForOwn(object, iteratee) {
          return baseFor(object, iteratee, keys);
        }
        module.exports = baseForOwn;
      }, {
        "../object/keys": 150,
        "./baseFor": 75
      }],
      78: [function(require, module, exports) {
        var toObject = require('./toObject');
        function baseGet(object, path, pathKey) {
          if (object == null) {
            return;
          }
          object = toObject(object);
          if (pathKey !== undefined && pathKey in object) {
            path = [pathKey];
          }
          var index = 0,
              length = path.length;
          while (object != null && index < length) {
            object = toObject(object)[path[index++]];
          }
          return (index && index == length) ? object : undefined;
        }
        module.exports = baseGet;
      }, {"./toObject": 136}],
      79: [function(require, module, exports) {
        var indexOfNaN = require('./indexOfNaN');
        function baseIndexOf(array, value, fromIndex) {
          if (value !== value) {
            return indexOfNaN(array, fromIndex);
          }
          var index = fromIndex - 1,
              length = array.length;
          while (++index < length) {
            if (array[index] === value) {
              return index;
            }
          }
          return -1;
        }
        module.exports = baseIndexOf;
      }, {"./indexOfNaN": 116}],
      80: [function(require, module, exports) {
        var baseIsEqualDeep = require('./baseIsEqualDeep'),
            isObject = require('../lang/isObject'),
            isObjectLike = require('./isObjectLike');
        function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
          if (value === other) {
            return true;
          }
          if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
            return value !== value && other !== other;
          }
          return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
        }
        module.exports = baseIsEqual;
      }, {
        "../lang/isObject": 145,
        "./baseIsEqualDeep": 81,
        "./isObjectLike": 127
      }],
      81: [function(require, module, exports) {
        var equalArrays = require('./equalArrays'),
            equalByTag = require('./equalByTag'),
            equalObjects = require('./equalObjects'),
            isArray = require('../lang/isArray'),
            isHostObject = require('./isHostObject'),
            isTypedArray = require('../lang/isTypedArray');
        var argsTag = '[object Arguments]',
            arrayTag = '[object Array]',
            objectTag = '[object Object]';
        var objectProto = Object.prototype;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var objToString = objectProto.toString;
        function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
          var objIsArr = isArray(object),
              othIsArr = isArray(other),
              objTag = arrayTag,
              othTag = arrayTag;
          if (!objIsArr) {
            objTag = objToString.call(object);
            if (objTag == argsTag) {
              objTag = objectTag;
            } else if (objTag != objectTag) {
              objIsArr = isTypedArray(object);
            }
          }
          if (!othIsArr) {
            othTag = objToString.call(other);
            if (othTag == argsTag) {
              othTag = objectTag;
            } else if (othTag != objectTag) {
              othIsArr = isTypedArray(other);
            }
          }
          var objIsObj = objTag == objectTag && !isHostObject(object),
              othIsObj = othTag == objectTag && !isHostObject(other),
              isSameTag = objTag == othTag;
          if (isSameTag && !(objIsArr || objIsObj)) {
            return equalByTag(object, other, objTag);
          }
          if (!isLoose) {
            var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
                othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
            if (objIsWrapped || othIsWrapped) {
              return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
            }
          }
          if (!isSameTag) {
            return false;
          }
          stackA || (stackA = []);
          stackB || (stackB = []);
          var length = stackA.length;
          while (length--) {
            if (stackA[length] == object) {
              return stackB[length] == other;
            }
          }
          stackA.push(object);
          stackB.push(other);
          var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);
          stackA.pop();
          stackB.pop();
          return result;
        }
        module.exports = baseIsEqualDeep;
      }, {
        "../lang/isArray": 141,
        "../lang/isTypedArray": 148,
        "./equalArrays": 108,
        "./equalByTag": 109,
        "./equalObjects": 110,
        "./isHostObject": 121
      }],
      82: [function(require, module, exports) {
        var baseIsEqual = require('./baseIsEqual'),
            toObject = require('./toObject');
        function baseIsMatch(object, matchData, customizer) {
          var index = matchData.length,
              length = index,
              noCustomizer = !customizer;
          if (object == null) {
            return !length;
          }
          object = toObject(object);
          while (index--) {
            var data = matchData[index];
            if ((noCustomizer && data[2]) ? data[1] !== object[data[0]] : !(data[0] in object)) {
              return false;
            }
          }
          while (++index < length) {
            data = matchData[index];
            var key = data[0],
                objValue = object[key],
                srcValue = data[1];
            if (noCustomizer && data[2]) {
              if (objValue === undefined && !(key in object)) {
                return false;
              }
            } else {
              var result = customizer ? customizer(objValue, srcValue, key) : undefined;
              if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
                return false;
              }
            }
          }
          return true;
        }
        module.exports = baseIsMatch;
      }, {
        "./baseIsEqual": 80,
        "./toObject": 136
      }],
      83: [function(require, module, exports) {
        function baseLodash() {}
        module.exports = baseLodash;
      }, {}],
      84: [function(require, module, exports) {
        var baseEach = require('./baseEach'),
            isArrayLike = require('./isArrayLike');
        function baseMap(collection, iteratee) {
          var index = -1,
              result = isArrayLike(collection) ? Array(collection.length) : [];
          baseEach(collection, function(value, key, collection) {
            result[++index] = iteratee(value, key, collection);
          });
          return result;
        }
        module.exports = baseMap;
      }, {
        "./baseEach": 72,
        "./isArrayLike": 120
      }],
      85: [function(require, module, exports) {
        var baseIsMatch = require('./baseIsMatch'),
            getMatchData = require('./getMatchData'),
            toObject = require('./toObject');
        function baseMatches(source) {
          var matchData = getMatchData(source);
          if (matchData.length == 1 && matchData[0][2]) {
            var key = matchData[0][0],
                value = matchData[0][1];
            return function(object) {
              if (object == null) {
                return false;
              }
              object = toObject(object);
              return object[key] === value && (value !== undefined || (key in object));
            };
          }
          return function(object) {
            return baseIsMatch(object, matchData);
          };
        }
        module.exports = baseMatches;
      }, {
        "./baseIsMatch": 82,
        "./getMatchData": 114,
        "./toObject": 136
      }],
      86: [function(require, module, exports) {
        var baseGet = require('./baseGet'),
            baseIsEqual = require('./baseIsEqual'),
            baseSlice = require('./baseSlice'),
            isArray = require('../lang/isArray'),
            isKey = require('./isKey'),
            isStrictComparable = require('./isStrictComparable'),
            last = require('../array/last'),
            toObject = require('./toObject'),
            toPath = require('./toPath');
        function baseMatchesProperty(path, srcValue) {
          var isArr = isArray(path),
              isCommon = isKey(path) && isStrictComparable(srcValue),
              pathKey = (path + '');
          path = toPath(path);
          return function(object) {
            if (object == null) {
              return false;
            }
            var key = pathKey;
            object = toObject(object);
            if ((isArr || !isCommon) && !(key in object)) {
              object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
              if (object == null) {
                return false;
              }
              key = last(path);
              object = toObject(object);
            }
            return object[key] === srcValue ? (srcValue !== undefined || (key in object)) : baseIsEqual(srcValue, object[key], undefined, true);
          };
        }
        module.exports = baseMatchesProperty;
      }, {
        "../array/last": 51,
        "../lang/isArray": 141,
        "./baseGet": 78,
        "./baseIsEqual": 80,
        "./baseSlice": 90,
        "./isKey": 124,
        "./isStrictComparable": 128,
        "./toObject": 136,
        "./toPath": 137
      }],
      87: [function(require, module, exports) {
        var toObject = require('./toObject');
        function baseProperty(key) {
          return function(object) {
            return object == null ? undefined : toObject(object)[key];
          };
        }
        module.exports = baseProperty;
      }, {"./toObject": 136}],
      88: [function(require, module, exports) {
        var baseGet = require('./baseGet'),
            toPath = require('./toPath');
        function basePropertyDeep(path) {
          var pathKey = (path + '');
          path = toPath(path);
          return function(object) {
            return baseGet(object, path, pathKey);
          };
        }
        module.exports = basePropertyDeep;
      }, {
        "./baseGet": 78,
        "./toPath": 137
      }],
      89: [function(require, module, exports) {
        var identity = require('../utility/identity'),
            metaMap = require('./metaMap');
        var baseSetData = !metaMap ? identity : function(func, data) {
          metaMap.set(func, data);
          return func;
        };
        module.exports = baseSetData;
      }, {
        "../utility/identity": 155,
        "./metaMap": 130
      }],
      90: [function(require, module, exports) {
        function baseSlice(array, start, end) {
          var index = -1,
              length = array.length;
          start = start == null ? 0 : (+start || 0);
          if (start < 0) {
            start = -start > length ? 0 : (length + start);
          }
          end = (end === undefined || end > length) ? length : (+end || 0);
          if (end < 0) {
            end += length;
          }
          length = start > end ? 0 : ((end - start) >>> 0);
          start >>>= 0;
          var result = Array(length);
          while (++index < length) {
            result[index] = array[index + start];
          }
          return result;
        }
        module.exports = baseSlice;
      }, {}],
      91: [function(require, module, exports) {
        function baseToString(value) {
          return value == null ? '' : (value + '');
        }
        module.exports = baseToString;
      }, {}],
      92: [function(require, module, exports) {
        function baseValues(object, props) {
          var index = -1,
              length = props.length,
              result = Array(length);
          while (++index < length) {
            result[index] = object[props[index]];
          }
          return result;
        }
        module.exports = baseValues;
      }, {}],
      93: [function(require, module, exports) {
        var binaryIndexBy = require('./binaryIndexBy'),
            identity = require('../utility/identity');
        var MAX_ARRAY_LENGTH = 4294967295,
            HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
        function binaryIndex(array, value, retHighest) {
          var low = 0,
              high = array ? array.length : low;
          if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
            while (low < high) {
              var mid = (low + high) >>> 1,
                  computed = array[mid];
              if ((retHighest ? (computed <= value) : (computed < value)) && computed !== null) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return high;
          }
          return binaryIndexBy(array, value, identity, retHighest);
        }
        module.exports = binaryIndex;
      }, {
        "../utility/identity": 155,
        "./binaryIndexBy": 94
      }],
      94: [function(require, module, exports) {
        var nativeFloor = Math.floor,
            nativeMin = Math.min;
        var MAX_ARRAY_LENGTH = 4294967295,
            MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1;
        function binaryIndexBy(array, value, iteratee, retHighest) {
          value = iteratee(value);
          var low = 0,
              high = array ? array.length : 0,
              valIsNaN = value !== value,
              valIsNull = value === null,
              valIsUndef = value === undefined;
          while (low < high) {
            var mid = nativeFloor((low + high) / 2),
                computed = iteratee(array[mid]),
                isDef = computed !== undefined,
                isReflexive = computed === computed;
            if (valIsNaN) {
              var setLow = isReflexive || retHighest;
            } else if (valIsNull) {
              setLow = isReflexive && isDef && (retHighest || computed != null);
            } else if (valIsUndef) {
              setLow = isReflexive && (retHighest || isDef);
            } else if (computed == null) {
              setLow = false;
            } else {
              setLow = retHighest ? (computed <= value) : (computed < value);
            }
            if (setLow) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return nativeMin(high, MAX_ARRAY_INDEX);
        }
        module.exports = binaryIndexBy;
      }, {}],
      95: [function(require, module, exports) {
        var identity = require('../utility/identity');
        function bindCallback(func, thisArg, argCount) {
          if (typeof func != 'function') {
            return identity;
          }
          if (thisArg === undefined) {
            return func;
          }
          switch (argCount) {
            case 1:
              return function(value) {
                return func.call(thisArg, value);
              };
            case 3:
              return function(value, index, collection) {
                return func.call(thisArg, value, index, collection);
              };
            case 4:
              return function(accumulator, value, index, collection) {
                return func.call(thisArg, accumulator, value, index, collection);
              };
            case 5:
              return function(value, other, key, object, source) {
                return func.call(thisArg, value, other, key, object, source);
              };
          }
          return function() {
            return func.apply(thisArg, arguments);
          };
        }
        module.exports = bindCallback;
      }, {"../utility/identity": 155}],
      96: [function(require, module, exports) {
        (function(global) {
          var ArrayBuffer = global.ArrayBuffer,
              Uint8Array = global.Uint8Array;
          function bufferClone(buffer) {
            var result = new ArrayBuffer(buffer.byteLength),
                view = new Uint8Array(result);
            view.set(new Uint8Array(buffer));
            return result;
          }
          module.exports = bufferClone;
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {}],
      97: [function(require, module, exports) {
        var nativeMax = Math.max;
        function composeArgs(args, partials, holders) {
          var holdersLength = holders.length,
              argsIndex = -1,
              argsLength = nativeMax(args.length - holdersLength, 0),
              leftIndex = -1,
              leftLength = partials.length,
              result = Array(leftLength + argsLength);
          while (++leftIndex < leftLength) {
            result[leftIndex] = partials[leftIndex];
          }
          while (++argsIndex < holdersLength) {
            result[holders[argsIndex]] = args[argsIndex];
          }
          while (argsLength--) {
            result[leftIndex++] = args[argsIndex++];
          }
          return result;
        }
        module.exports = composeArgs;
      }, {}],
      98: [function(require, module, exports) {
        var nativeMax = Math.max;
        function composeArgsRight(args, partials, holders) {
          var holdersIndex = -1,
              holdersLength = holders.length,
              argsIndex = -1,
              argsLength = nativeMax(args.length - holdersLength, 0),
              rightIndex = -1,
              rightLength = partials.length,
              result = Array(argsLength + rightLength);
          while (++argsIndex < argsLength) {
            result[argsIndex] = args[argsIndex];
          }
          var offset = argsIndex;
          while (++rightIndex < rightLength) {
            result[offset + rightIndex] = partials[rightIndex];
          }
          while (++holdersIndex < holdersLength) {
            result[offset + holders[holdersIndex]] = args[argsIndex++];
          }
          return result;
        }
        module.exports = composeArgsRight;
      }, {}],
      99: [function(require, module, exports) {
        var getLength = require('./getLength'),
            isLength = require('./isLength'),
            toObject = require('./toObject');
        function createBaseEach(eachFunc, fromRight) {
          return function(collection, iteratee) {
            var length = collection ? getLength(collection) : 0;
            if (!isLength(length)) {
              return eachFunc(collection, iteratee);
            }
            var index = fromRight ? length : -1,
                iterable = toObject(collection);
            while ((fromRight ? index-- : ++index < length)) {
              if (iteratee(iterable[index], index, iterable) === false) {
                break;
              }
            }
            return collection;
          };
        }
        module.exports = createBaseEach;
      }, {
        "./getLength": 113,
        "./isLength": 126,
        "./toObject": 136
      }],
      100: [function(require, module, exports) {
        var toObject = require('./toObject');
        function createBaseFor(fromRight) {
          return function(object, iteratee, keysFunc) {
            var iterable = toObject(object),
                props = keysFunc(object),
                length = props.length,
                index = fromRight ? length : -1;
            while ((fromRight ? index-- : ++index < length)) {
              var key = props[index];
              if (iteratee(iterable[key], key, iterable) === false) {
                break;
              }
            }
            return object;
          };
        }
        module.exports = createBaseFor;
      }, {"./toObject": 136}],
      101: [function(require, module, exports) {
        (function(global) {
          var createCtorWrapper = require('./createCtorWrapper');
          function createBindWrapper(func, thisArg) {
            var Ctor = createCtorWrapper(func);
            function wrapper() {
              var fn = (this && this !== global && this instanceof wrapper) ? Ctor : func;
              return fn.apply(thisArg, arguments);
            }
            return wrapper;
          }
          module.exports = createBindWrapper;
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {"./createCtorWrapper": 102}],
      102: [function(require, module, exports) {
        var baseCreate = require('./baseCreate'),
            isObject = require('../lang/isObject');
        function createCtorWrapper(Ctor) {
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return new Ctor;
              case 1:
                return new Ctor(args[0]);
              case 2:
                return new Ctor(args[0], args[1]);
              case 3:
                return new Ctor(args[0], args[1], args[2]);
              case 4:
                return new Ctor(args[0], args[1], args[2], args[3]);
              case 5:
                return new Ctor(args[0], args[1], args[2], args[3], args[4]);
              case 6:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
              case 7:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
            }
            var thisBinding = baseCreate(Ctor.prototype),
                result = Ctor.apply(thisBinding, args);
            return isObject(result) ? result : thisBinding;
          };
        }
        module.exports = createCtorWrapper;
      }, {
        "../lang/isObject": 145,
        "./baseCreate": 71
      }],
      103: [function(require, module, exports) {
        var baseCallback = require('./baseCallback'),
            baseFind = require('./baseFind'),
            baseFindIndex = require('./baseFindIndex'),
            isArray = require('../lang/isArray');
        function createFind(eachFunc, fromRight) {
          return function(collection, predicate, thisArg) {
            predicate = baseCallback(predicate, thisArg, 3);
            if (isArray(collection)) {
              var index = baseFindIndex(collection, predicate, fromRight);
              return index > -1 ? collection[index] : undefined;
            }
            return baseFind(collection, predicate, eachFunc);
          };
        }
        module.exports = createFind;
      }, {
        "../lang/isArray": 141,
        "./baseCallback": 68,
        "./baseFind": 73,
        "./baseFindIndex": 74
      }],
      104: [function(require, module, exports) {
        var bindCallback = require('./bindCallback'),
            isArray = require('../lang/isArray');
        function createForEach(arrayFunc, eachFunc) {
          return function(collection, iteratee, thisArg) {
            return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection)) ? arrayFunc(collection, iteratee) : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
          };
        }
        module.exports = createForEach;
      }, {
        "../lang/isArray": 141,
        "./bindCallback": 95
      }],
      105: [function(require, module, exports) {
        (function(global) {
          var arrayCopy = require('./arrayCopy'),
              composeArgs = require('./composeArgs'),
              composeArgsRight = require('./composeArgsRight'),
              createCtorWrapper = require('./createCtorWrapper'),
              isLaziable = require('./isLaziable'),
              reorder = require('./reorder'),
              replaceHolders = require('./replaceHolders'),
              setData = require('./setData');
          var BIND_FLAG = 1,
              BIND_KEY_FLAG = 2,
              CURRY_BOUND_FLAG = 4,
              CURRY_FLAG = 8,
              CURRY_RIGHT_FLAG = 16,
              PARTIAL_FLAG = 32,
              PARTIAL_RIGHT_FLAG = 64,
              ARY_FLAG = 128;
          var nativeMax = Math.max;
          function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
            var isAry = bitmask & ARY_FLAG,
                isBind = bitmask & BIND_FLAG,
                isBindKey = bitmask & BIND_KEY_FLAG,
                isCurry = bitmask & CURRY_FLAG,
                isCurryBound = bitmask & CURRY_BOUND_FLAG,
                isCurryRight = bitmask & CURRY_RIGHT_FLAG,
                Ctor = isBindKey ? undefined : createCtorWrapper(func);
            function wrapper() {
              var length = arguments.length,
                  index = length,
                  args = Array(length);
              while (index--) {
                args[index] = arguments[index];
              }
              if (partials) {
                args = composeArgs(args, partials, holders);
              }
              if (partialsRight) {
                args = composeArgsRight(args, partialsRight, holdersRight);
              }
              if (isCurry || isCurryRight) {
                var placeholder = wrapper.placeholder,
                    argsHolders = replaceHolders(args, placeholder);
                length -= argsHolders.length;
                if (length < arity) {
                  var newArgPos = argPos ? arrayCopy(argPos) : undefined,
                      newArity = nativeMax(arity - length, 0),
                      newsHolders = isCurry ? argsHolders : undefined,
                      newHoldersRight = isCurry ? undefined : argsHolders,
                      newPartials = isCurry ? args : undefined,
                      newPartialsRight = isCurry ? undefined : args;
                  bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
                  bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);
                  if (!isCurryBound) {
                    bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
                  }
                  var newData = [func, bitmask, thisArg, newPartials, newsHolders, newPartialsRight, newHoldersRight, newArgPos, ary, newArity],
                      result = createHybridWrapper.apply(undefined, newData);
                  if (isLaziable(func)) {
                    setData(result, newData);
                  }
                  result.placeholder = placeholder;
                  return result;
                }
              }
              var thisBinding = isBind ? thisArg : this,
                  fn = isBindKey ? thisBinding[func] : func;
              if (argPos) {
                args = reorder(args, argPos);
              }
              if (isAry && ary < args.length) {
                args.length = ary;
              }
              if (this && this !== global && this instanceof wrapper) {
                fn = Ctor || createCtorWrapper(func);
              }
              return fn.apply(thisBinding, args);
            }
            return wrapper;
          }
          module.exports = createHybridWrapper;
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {
        "./arrayCopy": 63,
        "./composeArgs": 97,
        "./composeArgsRight": 98,
        "./createCtorWrapper": 102,
        "./isLaziable": 125,
        "./reorder": 132,
        "./replaceHolders": 133,
        "./setData": 134
      }],
      106: [function(require, module, exports) {
        (function(global) {
          var createCtorWrapper = require('./createCtorWrapper');
          var BIND_FLAG = 1;
          function createPartialWrapper(func, bitmask, thisArg, partials) {
            var isBind = bitmask & BIND_FLAG,
                Ctor = createCtorWrapper(func);
            function wrapper() {
              var argsIndex = -1,
                  argsLength = arguments.length,
                  leftIndex = -1,
                  leftLength = partials.length,
                  args = Array(leftLength + argsLength);
              while (++leftIndex < leftLength) {
                args[leftIndex] = partials[leftIndex];
              }
              while (argsLength--) {
                args[leftIndex++] = arguments[++argsIndex];
              }
              var fn = (this && this !== global && this instanceof wrapper) ? Ctor : func;
              return fn.apply(isBind ? thisArg : this, args);
            }
            return wrapper;
          }
          module.exports = createPartialWrapper;
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {"./createCtorWrapper": 102}],
      107: [function(require, module, exports) {
        var baseSetData = require('./baseSetData'),
            createBindWrapper = require('./createBindWrapper'),
            createHybridWrapper = require('./createHybridWrapper'),
            createPartialWrapper = require('./createPartialWrapper'),
            getData = require('./getData'),
            mergeData = require('./mergeData'),
            setData = require('./setData');
        var BIND_FLAG = 1,
            BIND_KEY_FLAG = 2,
            PARTIAL_FLAG = 32,
            PARTIAL_RIGHT_FLAG = 64;
        var FUNC_ERROR_TEXT = 'Expected a function';
        var nativeMax = Math.max;
        function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
          var isBindKey = bitmask & BIND_KEY_FLAG;
          if (!isBindKey && typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          var length = partials ? partials.length : 0;
          if (!length) {
            bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
            partials = holders = undefined;
          }
          length -= (holders ? holders.length : 0);
          if (bitmask & PARTIAL_RIGHT_FLAG) {
            var partialsRight = partials,
                holdersRight = holders;
            partials = holders = undefined;
          }
          var data = isBindKey ? undefined : getData(func),
              newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];
          if (data) {
            mergeData(newData, data);
            bitmask = newData[1];
            arity = newData[9];
          }
          newData[9] = arity == null ? (isBindKey ? 0 : func.length) : (nativeMax(arity - length, 0) || 0);
          if (bitmask == BIND_FLAG) {
            var result = createBindWrapper(newData[0], newData[2]);
          } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !newData[4].length) {
            result = createPartialWrapper.apply(undefined, newData);
          } else {
            result = createHybridWrapper.apply(undefined, newData);
          }
          var setter = data ? baseSetData : setData;
          return setter(result, newData);
        }
        module.exports = createWrapper;
      }, {
        "./baseSetData": 89,
        "./createBindWrapper": 101,
        "./createHybridWrapper": 105,
        "./createPartialWrapper": 106,
        "./getData": 111,
        "./mergeData": 129,
        "./setData": 134
      }],
      108: [function(require, module, exports) {
        var arraySome = require('./arraySome');
        function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
          var index = -1,
              arrLength = array.length,
              othLength = other.length;
          if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
            return false;
          }
          while (++index < arrLength) {
            var arrValue = array[index],
                othValue = other[index],
                result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;
            if (result !== undefined) {
              if (result) {
                continue;
              }
              return false;
            }
            if (isLoose) {
              if (!arraySome(other, function(othValue) {
                return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
              })) {
                return false;
              }
            } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
              return false;
            }
          }
          return true;
        }
        module.exports = equalArrays;
      }, {"./arraySome": 66}],
      109: [function(require, module, exports) {
        var boolTag = '[object Boolean]',
            dateTag = '[object Date]',
            errorTag = '[object Error]',
            numberTag = '[object Number]',
            regexpTag = '[object RegExp]',
            stringTag = '[object String]';
        function equalByTag(object, other, tag) {
          switch (tag) {
            case boolTag:
            case dateTag:
              return +object == +other;
            case errorTag:
              return object.name == other.name && object.message == other.message;
            case numberTag:
              return (object != +object) ? other != +other : object == +other;
            case regexpTag:
            case stringTag:
              return object == (other + '');
          }
          return false;
        }
        module.exports = equalByTag;
      }, {}],
      110: [function(require, module, exports) {
        var keys = require('../object/keys');
        var objectProto = Object.prototype;
        var hasOwnProperty = objectProto.hasOwnProperty;
        function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
          var objProps = keys(object),
              objLength = objProps.length,
              othProps = keys(other),
              othLength = othProps.length;
          if (objLength != othLength && !isLoose) {
            return false;
          }
          var index = objLength;
          while (index--) {
            var key = objProps[index];
            if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
              return false;
            }
          }
          var skipCtor = isLoose;
          while (++index < objLength) {
            key = objProps[index];
            var objValue = object[key],
                othValue = other[key],
                result = customizer ? customizer(isLoose ? othValue : objValue, isLoose ? objValue : othValue, key) : undefined;
            if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
              return false;
            }
            skipCtor || (skipCtor = key == 'constructor');
          }
          if (!skipCtor) {
            var objCtor = object.constructor,
                othCtor = other.constructor;
            if (objCtor != othCtor && ('constructor' in object && 'constructor' in other) && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
              return false;
            }
          }
          return true;
        }
        module.exports = equalObjects;
      }, {"../object/keys": 150}],
      111: [function(require, module, exports) {
        var metaMap = require('./metaMap'),
            noop = require('../utility/noop');
        var getData = !metaMap ? noop : function(func) {
          return metaMap.get(func);
        };
        module.exports = getData;
      }, {
        "../utility/noop": 156,
        "./metaMap": 130
      }],
      112: [function(require, module, exports) {
        var realNames = require('./realNames');
        function getFuncName(func) {
          var result = (func.name + ''),
              array = realNames[result],
              length = array ? array.length : 0;
          while (length--) {
            var data = array[length],
                otherFunc = data.func;
            if (otherFunc == null || otherFunc == func) {
              return data.name;
            }
          }
          return result;
        }
        module.exports = getFuncName;
      }, {"./realNames": 131}],
      113: [function(require, module, exports) {
        var baseProperty = require('./baseProperty');
        var getLength = baseProperty('length');
        module.exports = getLength;
      }, {"./baseProperty": 87}],
      114: [function(require, module, exports) {
        var isStrictComparable = require('./isStrictComparable'),
            pairs = require('../object/pairs');
        function getMatchData(object) {
          var result = pairs(object),
              length = result.length;
          while (length--) {
            result[length][2] = isStrictComparable(result[length][1]);
          }
          return result;
        }
        module.exports = getMatchData;
      }, {
        "../object/pairs": 152,
        "./isStrictComparable": 128
      }],
      115: [function(require, module, exports) {
        var isNative = require('../lang/isNative');
        function getNative(object, key) {
          var value = object == null ? undefined : object[key];
          return isNative(value) ? value : undefined;
        }
        module.exports = getNative;
      }, {"../lang/isNative": 144}],
      116: [function(require, module, exports) {
        function indexOfNaN(array, fromIndex, fromRight) {
          var length = array.length,
              index = fromIndex + (fromRight ? 0 : -1);
          while ((fromRight ? index-- : ++index < length)) {
            var other = array[index];
            if (other !== other) {
              return index;
            }
          }
          return -1;
        }
        module.exports = indexOfNaN;
      }, {}],
      117: [function(require, module, exports) {
        var objectProto = Object.prototype;
        var hasOwnProperty = objectProto.hasOwnProperty;
        function initCloneArray(array) {
          var length = array.length,
              result = new array.constructor(length);
          if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
            result.index = array.index;
            result.input = array.input;
          }
          return result;
        }
        module.exports = initCloneArray;
      }, {}],
      118: [function(require, module, exports) {
        (function(global) {
          var bufferClone = require('./bufferClone');
          var boolTag = '[object Boolean]',
              dateTag = '[object Date]',
              numberTag = '[object Number]',
              regexpTag = '[object RegExp]',
              stringTag = '[object String]';
          var arrayBufferTag = '[object ArrayBuffer]',
              float32Tag = '[object Float32Array]',
              float64Tag = '[object Float64Array]',
              int8Tag = '[object Int8Array]',
              int16Tag = '[object Int16Array]',
              int32Tag = '[object Int32Array]',
              uint8Tag = '[object Uint8Array]',
              uint8ClampedTag = '[object Uint8ClampedArray]',
              uint16Tag = '[object Uint16Array]',
              uint32Tag = '[object Uint32Array]';
          var reFlags = /\w*$/;
          var Uint8Array = global.Uint8Array;
          var ctorByTag = {};
          ctorByTag[float32Tag] = global.Float32Array;
          ctorByTag[float64Tag] = global.Float64Array;
          ctorByTag[int8Tag] = global.Int8Array;
          ctorByTag[int16Tag] = global.Int16Array;
          ctorByTag[int32Tag] = global.Int32Array;
          ctorByTag[uint8Tag] = Uint8Array;
          ctorByTag[uint8ClampedTag] = global.Uint8ClampedArray;
          ctorByTag[uint16Tag] = global.Uint16Array;
          ctorByTag[uint32Tag] = global.Uint32Array;
          function initCloneByTag(object, tag, isDeep) {
            var Ctor = object.constructor;
            switch (tag) {
              case arrayBufferTag:
                return bufferClone(object);
              case boolTag:
              case dateTag:
                return new Ctor(+object);
              case float32Tag:
              case float64Tag:
              case int8Tag:
              case int16Tag:
              case int32Tag:
              case uint8Tag:
              case uint8ClampedTag:
              case uint16Tag:
              case uint32Tag:
                if (Ctor instanceof Ctor) {
                  Ctor = ctorByTag[tag];
                }
                var buffer = object.buffer;
                return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);
              case numberTag:
              case stringTag:
                return new Ctor(object);
              case regexpTag:
                var result = new Ctor(object.source, reFlags.exec(object));
                result.lastIndex = object.lastIndex;
            }
            return result;
          }
          module.exports = initCloneByTag;
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {"./bufferClone": 96}],
      119: [function(require, module, exports) {
        function initCloneObject(object) {
          var Ctor = object.constructor;
          if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
            Ctor = Object;
          }
          return new Ctor;
        }
        module.exports = initCloneObject;
      }, {}],
      120: [function(require, module, exports) {
        var getLength = require('./getLength'),
            isLength = require('./isLength');
        function isArrayLike(value) {
          return value != null && isLength(getLength(value));
        }
        module.exports = isArrayLike;
      }, {
        "./getLength": 113,
        "./isLength": 126
      }],
      121: [function(require, module, exports) {
        var isHostObject = (function() {
          try {
            Object({'toString': 0} + '');
          } catch (e) {
            return function() {
              return false;
            };
          }
          return function(value) {
            return typeof value.toString != 'function' && typeof(value + '') == 'string';
          };
        }());
        module.exports = isHostObject;
      }, {}],
      122: [function(require, module, exports) {
        var reIsUint = /^\d+$/;
        var MAX_SAFE_INTEGER = 9007199254740991;
        function isIndex(value, length) {
          value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
          length = length == null ? MAX_SAFE_INTEGER : length;
          return value > -1 && value % 1 == 0 && value < length;
        }
        module.exports = isIndex;
      }, {}],
      123: [function(require, module, exports) {
        var isArrayLike = require('./isArrayLike'),
            isIndex = require('./isIndex'),
            isObject = require('../lang/isObject');
        function isIterateeCall(value, index, object) {
          if (!isObject(object)) {
            return false;
          }
          var type = typeof index;
          if (type == 'number' ? (isArrayLike(object) && isIndex(index, object.length)) : (type == 'string' && index in object)) {
            var other = object[index];
            return value === value ? (value === other) : (other !== other);
          }
          return false;
        }
        module.exports = isIterateeCall;
      }, {
        "../lang/isObject": 145,
        "./isArrayLike": 120,
        "./isIndex": 122
      }],
      124: [function(require, module, exports) {
        var isArray = require('../lang/isArray'),
            toObject = require('./toObject');
        var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
            reIsPlainProp = /^\w*$/;
        function isKey(value, object) {
          var type = typeof value;
          if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
            return true;
          }
          if (isArray(value)) {
            return false;
          }
          var result = !reIsDeepProp.test(value);
          return result || (object != null && value in toObject(object));
        }
        module.exports = isKey;
      }, {
        "../lang/isArray": 141,
        "./toObject": 136
      }],
      125: [function(require, module, exports) {
        var LazyWrapper = require('./LazyWrapper'),
            getData = require('./getData'),
            getFuncName = require('./getFuncName'),
            lodash = require('../chain/lodash');
        function isLaziable(func) {
          var funcName = getFuncName(func),
              other = lodash[funcName];
          if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
            return false;
          }
          if (func === other) {
            return true;
          }
          var data = getData(other);
          return !!data && func === data[0];
        }
        module.exports = isLaziable;
      }, {
        "../chain/lodash": 52,
        "./LazyWrapper": 61,
        "./getData": 111,
        "./getFuncName": 112
      }],
      126: [function(require, module, exports) {
        var MAX_SAFE_INTEGER = 9007199254740991;
        function isLength(value) {
          return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }
        module.exports = isLength;
      }, {}],
      127: [function(require, module, exports) {
        function isObjectLike(value) {
          return !!value && typeof value == 'object';
        }
        module.exports = isObjectLike;
      }, {}],
      128: [function(require, module, exports) {
        var isObject = require('../lang/isObject');
        function isStrictComparable(value) {
          return value === value && !isObject(value);
        }
        module.exports = isStrictComparable;
      }, {"../lang/isObject": 145}],
      129: [function(require, module, exports) {
        var arrayCopy = require('./arrayCopy'),
            composeArgs = require('./composeArgs'),
            composeArgsRight = require('./composeArgsRight'),
            replaceHolders = require('./replaceHolders');
        var BIND_FLAG = 1,
            CURRY_BOUND_FLAG = 4,
            CURRY_FLAG = 8,
            ARY_FLAG = 128,
            REARG_FLAG = 256;
        var PLACEHOLDER = '__lodash_placeholder__';
        var nativeMin = Math.min;
        function mergeData(data, source) {
          var bitmask = data[1],
              srcBitmask = source[1],
              newBitmask = bitmask | srcBitmask,
              isCommon = newBitmask < ARY_FLAG;
          var isCombo = (srcBitmask == ARY_FLAG && bitmask == CURRY_FLAG) || (srcBitmask == ARY_FLAG && bitmask == REARG_FLAG && data[7].length <= source[8]) || (srcBitmask == (ARY_FLAG | REARG_FLAG) && bitmask == CURRY_FLAG);
          if (!(isCommon || isCombo)) {
            return data;
          }
          if (srcBitmask & BIND_FLAG) {
            data[2] = source[2];
            newBitmask |= (bitmask & BIND_FLAG) ? 0 : CURRY_BOUND_FLAG;
          }
          var value = source[3];
          if (value) {
            var partials = data[3];
            data[3] = partials ? composeArgs(partials, value, source[4]) : arrayCopy(value);
            data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : arrayCopy(source[4]);
          }
          value = source[5];
          if (value) {
            partials = data[5];
            data[5] = partials ? composeArgsRight(partials, value, source[6]) : arrayCopy(value);
            data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : arrayCopy(source[6]);
          }
          value = source[7];
          if (value) {
            data[7] = arrayCopy(value);
          }
          if (srcBitmask & ARY_FLAG) {
            data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
          }
          if (data[9] == null) {
            data[9] = source[9];
          }
          data[0] = source[0];
          data[1] = newBitmask;
          return data;
        }
        module.exports = mergeData;
      }, {
        "./arrayCopy": 63,
        "./composeArgs": 97,
        "./composeArgsRight": 98,
        "./replaceHolders": 133
      }],
      130: [function(require, module, exports) {
        (function(global) {
          var getNative = require('./getNative');
          var WeakMap = getNative(global, 'WeakMap');
          var metaMap = WeakMap && new WeakMap;
          module.exports = metaMap;
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {"./getNative": 115}],
      131: [function(require, module, exports) {
        var realNames = {};
        module.exports = realNames;
      }, {}],
      132: [function(require, module, exports) {
        var arrayCopy = require('./arrayCopy'),
            isIndex = require('./isIndex');
        var nativeMin = Math.min;
        function reorder(array, indexes) {
          var arrLength = array.length,
              length = nativeMin(indexes.length, arrLength),
              oldArray = arrayCopy(array);
          while (length--) {
            var index = indexes[length];
            array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
          }
          return array;
        }
        module.exports = reorder;
      }, {
        "./arrayCopy": 63,
        "./isIndex": 122
      }],
      133: [function(require, module, exports) {
        var PLACEHOLDER = '__lodash_placeholder__';
        function replaceHolders(array, placeholder) {
          var index = -1,
              length = array.length,
              resIndex = -1,
              result = [];
          while (++index < length) {
            if (array[index] === placeholder) {
              array[index] = PLACEHOLDER;
              result[++resIndex] = index;
            }
          }
          return result;
        }
        module.exports = replaceHolders;
      }, {}],
      134: [function(require, module, exports) {
        var baseSetData = require('./baseSetData'),
            now = require('../date/now');
        var HOT_COUNT = 150,
            HOT_SPAN = 16;
        var setData = (function() {
          var count = 0,
              lastCalled = 0;
          return function(key, value) {
            var stamp = now(),
                remaining = HOT_SPAN - (stamp - lastCalled);
            lastCalled = stamp;
            if (remaining > 0) {
              if (++count >= HOT_COUNT) {
                return key;
              }
            } else {
              count = 0;
            }
            return baseSetData(key, value);
          };
        }());
        module.exports = setData;
      }, {
        "../date/now": 58,
        "./baseSetData": 89
      }],
      135: [function(require, module, exports) {
        var isArguments = require('../lang/isArguments'),
            isArray = require('../lang/isArray'),
            isIndex = require('./isIndex'),
            isLength = require('./isLength'),
            isString = require('../lang/isString'),
            keysIn = require('../object/keysIn');
        var objectProto = Object.prototype;
        var hasOwnProperty = objectProto.hasOwnProperty;
        function shimKeys(object) {
          var props = keysIn(object),
              propsLength = props.length,
              length = propsLength && object.length;
          var allowIndexes = !!length && isLength(length) && (isArray(object) || isArguments(object) || isString(object));
          var index = -1,
              result = [];
          while (++index < propsLength) {
            var key = props[index];
            if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
              result.push(key);
            }
          }
          return result;
        }
        module.exports = shimKeys;
      }, {
        "../lang/isArguments": 140,
        "../lang/isArray": 141,
        "../lang/isString": 147,
        "../object/keysIn": 151,
        "./isIndex": 122,
        "./isLength": 126
      }],
      136: [function(require, module, exports) {
        var isObject = require('../lang/isObject'),
            isString = require('../lang/isString'),
            support = require('../support');
        function toObject(value) {
          if (support.unindexedChars && isString(value)) {
            var index = -1,
                length = value.length,
                result = Object(value);
            while (++index < length) {
              result[index] = value.charAt(index);
            }
            return result;
          }
          return isObject(value) ? value : Object(value);
        }
        module.exports = toObject;
      }, {
        "../lang/isObject": 145,
        "../lang/isString": 147,
        "../support": 154
      }],
      137: [function(require, module, exports) {
        var baseToString = require('./baseToString'),
            isArray = require('../lang/isArray');
        var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;
        var reEscapeChar = /\\(\\)?/g;
        function toPath(value) {
          if (isArray(value)) {
            return value;
          }
          var result = [];
          baseToString(value).replace(rePropName, function(match, number, quote, string) {
            result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
          });
          return result;
        }
        module.exports = toPath;
      }, {
        "../lang/isArray": 141,
        "./baseToString": 91
      }],
      138: [function(require, module, exports) {
        var LazyWrapper = require('./LazyWrapper'),
            LodashWrapper = require('./LodashWrapper'),
            arrayCopy = require('./arrayCopy');
        function wrapperClone(wrapper) {
          return wrapper instanceof LazyWrapper ? wrapper.clone() : new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__, arrayCopy(wrapper.__actions__));
        }
        module.exports = wrapperClone;
      }, {
        "./LazyWrapper": 61,
        "./LodashWrapper": 62,
        "./arrayCopy": 63
      }],
      139: [function(require, module, exports) {
        var baseClone = require('../internal/baseClone'),
            bindCallback = require('../internal/bindCallback');
        function cloneDeep(value, customizer, thisArg) {
          return typeof customizer == 'function' ? baseClone(value, true, bindCallback(customizer, thisArg, 3)) : baseClone(value, true);
        }
        module.exports = cloneDeep;
      }, {
        "../internal/baseClone": 69,
        "../internal/bindCallback": 95
      }],
      140: [function(require, module, exports) {
        var isArrayLike = require('../internal/isArrayLike'),
            isObjectLike = require('../internal/isObjectLike');
        var objectProto = Object.prototype;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var propertyIsEnumerable = objectProto.propertyIsEnumerable;
        function isArguments(value) {
          return isObjectLike(value) && isArrayLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
        }
        module.exports = isArguments;
      }, {
        "../internal/isArrayLike": 120,
        "../internal/isObjectLike": 127
      }],
      141: [function(require, module, exports) {
        var getNative = require('../internal/getNative'),
            isLength = require('../internal/isLength'),
            isObjectLike = require('../internal/isObjectLike');
        var arrayTag = '[object Array]';
        var objectProto = Object.prototype;
        var objToString = objectProto.toString;
        var nativeIsArray = getNative(Array, 'isArray');
        var isArray = nativeIsArray || function(value) {
          return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
        };
        module.exports = isArray;
      }, {
        "../internal/getNative": 115,
        "../internal/isLength": 126,
        "../internal/isObjectLike": 127
      }],
      142: [function(require, module, exports) {
        var isArguments = require('./isArguments'),
            isArray = require('./isArray'),
            isArrayLike = require('../internal/isArrayLike'),
            isFunction = require('./isFunction'),
            isObjectLike = require('../internal/isObjectLike'),
            isString = require('./isString'),
            keys = require('../object/keys');
        function isEmpty(value) {
          if (value == null) {
            return true;
          }
          if (isArrayLike(value) && (isArray(value) || isString(value) || isArguments(value) || (isObjectLike(value) && isFunction(value.splice)))) {
            return !value.length;
          }
          return !keys(value).length;
        }
        module.exports = isEmpty;
      }, {
        "../internal/isArrayLike": 120,
        "../internal/isObjectLike": 127,
        "../object/keys": 150,
        "./isArguments": 140,
        "./isArray": 141,
        "./isFunction": 143,
        "./isString": 147
      }],
      143: [function(require, module, exports) {
        var isObject = require('./isObject');
        var funcTag = '[object Function]';
        var objectProto = Object.prototype;
        var objToString = objectProto.toString;
        function isFunction(value) {
          return isObject(value) && objToString.call(value) == funcTag;
        }
        module.exports = isFunction;
      }, {"./isObject": 145}],
      144: [function(require, module, exports) {
        var isFunction = require('./isFunction'),
            isHostObject = require('../internal/isHostObject'),
            isObjectLike = require('../internal/isObjectLike');
        var reIsHostCtor = /^\[object .+?Constructor\]$/;
        var objectProto = Object.prototype;
        var fnToString = Function.prototype.toString;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var reIsNative = RegExp('^' + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
        function isNative(value) {
          if (value == null) {
            return false;
          }
          if (isFunction(value)) {
            return reIsNative.test(fnToString.call(value));
          }
          return isObjectLike(value) && (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
        }
        module.exports = isNative;
      }, {
        "../internal/isHostObject": 121,
        "../internal/isObjectLike": 127,
        "./isFunction": 143
      }],
      145: [function(require, module, exports) {
        function isObject(value) {
          var type = typeof value;
          return !!value && (type == 'object' || type == 'function');
        }
        module.exports = isObject;
      }, {}],
      146: [function(require, module, exports) {
        var baseForIn = require('../internal/baseForIn'),
            isArguments = require('./isArguments'),
            isHostObject = require('../internal/isHostObject'),
            isObjectLike = require('../internal/isObjectLike'),
            support = require('../support');
        var objectTag = '[object Object]';
        var objectProto = Object.prototype;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var objToString = objectProto.toString;
        function isPlainObject(value) {
          var Ctor;
          if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isHostObject(value) && !isArguments(value)) || (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
            return false;
          }
          var result;
          if (support.ownLast) {
            baseForIn(value, function(subValue, key, object) {
              result = hasOwnProperty.call(object, key);
              return false;
            });
            return result !== false;
          }
          baseForIn(value, function(subValue, key) {
            result = key;
          });
          return result === undefined || hasOwnProperty.call(value, result);
        }
        module.exports = isPlainObject;
      }, {
        "../internal/baseForIn": 76,
        "../internal/isHostObject": 121,
        "../internal/isObjectLike": 127,
        "../support": 154,
        "./isArguments": 140
      }],
      147: [function(require, module, exports) {
        var isObjectLike = require('../internal/isObjectLike');
        var stringTag = '[object String]';
        var objectProto = Object.prototype;
        var objToString = objectProto.toString;
        function isString(value) {
          return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
        }
        module.exports = isString;
      }, {"../internal/isObjectLike": 127}],
      148: [function(require, module, exports) {
        var isLength = require('../internal/isLength'),
            isObjectLike = require('../internal/isObjectLike');
        var argsTag = '[object Arguments]',
            arrayTag = '[object Array]',
            boolTag = '[object Boolean]',
            dateTag = '[object Date]',
            errorTag = '[object Error]',
            funcTag = '[object Function]',
            mapTag = '[object Map]',
            numberTag = '[object Number]',
            objectTag = '[object Object]',
            regexpTag = '[object RegExp]',
            setTag = '[object Set]',
            stringTag = '[object String]',
            weakMapTag = '[object WeakMap]';
        var arrayBufferTag = '[object ArrayBuffer]',
            float32Tag = '[object Float32Array]',
            float64Tag = '[object Float64Array]',
            int8Tag = '[object Int8Array]',
            int16Tag = '[object Int16Array]',
            int32Tag = '[object Int32Array]',
            uint8Tag = '[object Uint8Array]',
            uint8ClampedTag = '[object Uint8ClampedArray]',
            uint16Tag = '[object Uint16Array]',
            uint32Tag = '[object Uint32Array]';
        var typedArrayTags = {};
        typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
        typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
        var objectProto = Object.prototype;
        var objToString = objectProto.toString;
        function isTypedArray(value) {
          return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
        }
        module.exports = isTypedArray;
      }, {
        "../internal/isLength": 126,
        "../internal/isObjectLike": 127
      }],
      149: [function(require, module, exports) {
        function isUndefined(value) {
          return value === undefined;
        }
        module.exports = isUndefined;
      }, {}],
      150: [function(require, module, exports) {
        var getNative = require('../internal/getNative'),
            isArrayLike = require('../internal/isArrayLike'),
            isObject = require('../lang/isObject'),
            shimKeys = require('../internal/shimKeys'),
            support = require('../support');
        var nativeKeys = getNative(Object, 'keys');
        var keys = !nativeKeys ? shimKeys : function(object) {
          var Ctor = object == null ? undefined : object.constructor;
          if ((typeof Ctor == 'function' && Ctor.prototype === object) || (typeof object == 'function' ? support.enumPrototypes : isArrayLike(object))) {
            return shimKeys(object);
          }
          return isObject(object) ? nativeKeys(object) : [];
        };
        module.exports = keys;
      }, {
        "../internal/getNative": 115,
        "../internal/isArrayLike": 120,
        "../internal/shimKeys": 135,
        "../lang/isObject": 145,
        "../support": 154
      }],
      151: [function(require, module, exports) {
        var arrayEach = require('../internal/arrayEach'),
            isArguments = require('../lang/isArguments'),
            isArray = require('../lang/isArray'),
            isFunction = require('../lang/isFunction'),
            isIndex = require('../internal/isIndex'),
            isLength = require('../internal/isLength'),
            isObject = require('../lang/isObject'),
            isString = require('../lang/isString'),
            support = require('../support');
        var arrayTag = '[object Array]',
            boolTag = '[object Boolean]',
            dateTag = '[object Date]',
            errorTag = '[object Error]',
            funcTag = '[object Function]',
            numberTag = '[object Number]',
            objectTag = '[object Object]',
            regexpTag = '[object RegExp]',
            stringTag = '[object String]';
        var shadowProps = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];
        var errorProto = Error.prototype,
            objectProto = Object.prototype,
            stringProto = String.prototype;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var objToString = objectProto.toString;
        var nonEnumProps = {};
        nonEnumProps[arrayTag] = nonEnumProps[dateTag] = nonEnumProps[numberTag] = {
          'constructor': true,
          'toLocaleString': true,
          'toString': true,
          'valueOf': true
        };
        nonEnumProps[boolTag] = nonEnumProps[stringTag] = {
          'constructor': true,
          'toString': true,
          'valueOf': true
        };
        nonEnumProps[errorTag] = nonEnumProps[funcTag] = nonEnumProps[regexpTag] = {
          'constructor': true,
          'toString': true
        };
        nonEnumProps[objectTag] = {'constructor': true};
        arrayEach(shadowProps, function(key) {
          for (var tag in nonEnumProps) {
            if (hasOwnProperty.call(nonEnumProps, tag)) {
              var props = nonEnumProps[tag];
              props[key] = hasOwnProperty.call(props, key);
            }
          }
        });
        function keysIn(object) {
          if (object == null) {
            return [];
          }
          if (!isObject(object)) {
            object = Object(object);
          }
          var length = object.length;
          length = (length && isLength(length) && (isArray(object) || isArguments(object) || isString(object)) && length) || 0;
          var Ctor = object.constructor,
              index = -1,
              proto = (isFunction(Ctor) && Ctor.prototype) || objectProto,
              isProto = proto === object,
              result = Array(length),
              skipIndexes = length > 0,
              skipErrorProps = support.enumErrorProps && (object === errorProto || object instanceof Error),
              skipProto = support.enumPrototypes && isFunction(object);
          while (++index < length) {
            result[index] = (index + '');
          }
          for (var key in object) {
            if (!(skipProto && key == 'prototype') && !(skipErrorProps && (key == 'message' || key == 'name')) && !(skipIndexes && isIndex(key, length)) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
              result.push(key);
            }
          }
          if (support.nonEnumShadows && object !== objectProto) {
            var tag = object === stringProto ? stringTag : (object === errorProto ? errorTag : objToString.call(object)),
                nonEnums = nonEnumProps[tag] || nonEnumProps[objectTag];
            if (tag == objectTag) {
              proto = objectProto;
            }
            length = shadowProps.length;
            while (length--) {
              key = shadowProps[length];
              var nonEnum = nonEnums[key];
              if (!(isProto && nonEnum) && (nonEnum ? hasOwnProperty.call(object, key) : object[key] !== proto[key])) {
                result.push(key);
              }
            }
          }
          return result;
        }
        module.exports = keysIn;
      }, {
        "../internal/arrayEach": 64,
        "../internal/isIndex": 122,
        "../internal/isLength": 126,
        "../lang/isArguments": 140,
        "../lang/isArray": 141,
        "../lang/isFunction": 143,
        "../lang/isObject": 145,
        "../lang/isString": 147,
        "../support": 154
      }],
      152: [function(require, module, exports) {
        var keys = require('./keys'),
            toObject = require('../internal/toObject');
        function pairs(object) {
          object = toObject(object);
          var index = -1,
              props = keys(object),
              length = props.length,
              result = Array(length);
          while (++index < length) {
            var key = props[index];
            result[index] = [key, object[key]];
          }
          return result;
        }
        module.exports = pairs;
      }, {
        "../internal/toObject": 136,
        "./keys": 150
      }],
      153: [function(require, module, exports) {
        var baseValues = require('../internal/baseValues'),
            keys = require('./keys');
        function values(object) {
          return baseValues(object, keys(object));
        }
        module.exports = values;
      }, {
        "../internal/baseValues": 92,
        "./keys": 150
      }],
      154: [function(require, module, exports) {
        var arrayProto = Array.prototype,
            errorProto = Error.prototype,
            objectProto = Object.prototype;
        var propertyIsEnumerable = objectProto.propertyIsEnumerable,
            splice = arrayProto.splice;
        var support = {};
        (function(x) {
          var Ctor = function() {
            this.x = x;
          },
              object = {
                '0': x,
                'length': x
              },
              props = [];
          Ctor.prototype = {
            'valueOf': x,
            'y': x
          };
          for (var key in new Ctor) {
            props.push(key);
          }
          support.enumErrorProps = propertyIsEnumerable.call(errorProto, 'message') || propertyIsEnumerable.call(errorProto, 'name');
          support.enumPrototypes = propertyIsEnumerable.call(Ctor, 'prototype');
          support.nonEnumShadows = !/valueOf/.test(props);
          support.ownLast = props[0] != 'x';
          support.spliceObjects = (splice.call(object, 0, 1), !object[0]);
          support.unindexedChars = ('x'[0] + Object('x')[0]) != 'xx';
        }(1, 0));
        module.exports = support;
      }, {}],
      155: [function(require, module, exports) {
        function identity(value) {
          return value;
        }
        module.exports = identity;
      }, {}],
      156: [function(require, module, exports) {
        function noop() {}
        module.exports = noop;
      }, {}],
      157: [function(require, module, exports) {
        var baseProperty = require('../internal/baseProperty'),
            basePropertyDeep = require('../internal/basePropertyDeep'),
            isKey = require('../internal/isKey');
        function property(path) {
          return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
        }
        module.exports = property;
      }, {
        "../internal/baseProperty": 87,
        "../internal/basePropertyDeep": 88,
        "../internal/isKey": 124
      }],
      158: [function(require, module, exports) {
        (function(process) {
          (function(definition) {
            "use strict";
            if (typeof bootstrap === "function") {
              bootstrap("promise", definition);
            } else if (typeof exports === "object" && typeof module === "object") {
              module.exports = definition();
            } else if (typeof define === "function" && define.amd) {
              define(definition);
            } else if (typeof ses !== "undefined") {
              if (!ses.ok()) {
                return;
              } else {
                ses.makeQ = definition;
              }
            } else if (typeof window !== "undefined" || typeof self !== "undefined") {
              var global = typeof window !== "undefined" ? window : self;
              var previousQ = global.Q;
              global.Q = definition();
              global.Q.noConflict = function() {
                global.Q = previousQ;
                return this;
              };
            } else {
              throw new Error("This environment was not anticipated by Q. Please file a bug.");
            }
          })(function() {
            "use strict";
            var hasStacks = false;
            try {
              throw new Error();
            } catch (e) {
              hasStacks = !!e.stack;
            }
            var qStartingLine = captureLine();
            var qFileName;
            var noop = function() {};
            var nextTick = (function() {
              var head = {
                task: void 0,
                next: null
              };
              var tail = head;
              var flushing = false;
              var requestTick = void 0;
              var isNodeJS = false;
              var laterQueue = [];
              function flush() {
                var task,
                    domain;
                while (head.next) {
                  head = head.next;
                  task = head.task;
                  head.task = void 0;
                  domain = head.domain;
                  if (domain) {
                    head.domain = void 0;
                    domain.enter();
                  }
                  runSingle(task, domain);
                }
                while (laterQueue.length) {
                  task = laterQueue.pop();
                  runSingle(task);
                }
                flushing = false;
              }
              function runSingle(task, domain) {
                try {
                  task();
                } catch (e) {
                  if (isNodeJS) {
                    if (domain) {
                      domain.exit();
                    }
                    setTimeout(flush, 0);
                    if (domain) {
                      domain.enter();
                    }
                    throw e;
                  } else {
                    setTimeout(function() {
                      throw e;
                    }, 0);
                  }
                }
                if (domain) {
                  domain.exit();
                }
              }
              nextTick = function(task) {
                tail = tail.next = {
                  task: task,
                  domain: isNodeJS && process.domain,
                  next: null
                };
                if (!flushing) {
                  flushing = true;
                  requestTick();
                }
              };
              if (typeof process === "object" && process.toString() === "[object process]" && process.nextTick) {
                isNodeJS = true;
                requestTick = function() {
                  process.nextTick(flush);
                };
              } else if (typeof setImmediate === "function") {
                if (typeof window !== "undefined") {
                  requestTick = setImmediate.bind(window, flush);
                } else {
                  requestTick = function() {
                    setImmediate(flush);
                  };
                }
              } else if (typeof MessageChannel !== "undefined") {
                var channel = new MessageChannel();
                channel.port1.onmessage = function() {
                  requestTick = requestPortTick;
                  channel.port1.onmessage = flush;
                  flush();
                };
                var requestPortTick = function() {
                  channel.port2.postMessage(0);
                };
                requestTick = function() {
                  setTimeout(flush, 0);
                  requestPortTick();
                };
              } else {
                requestTick = function() {
                  setTimeout(flush, 0);
                };
              }
              nextTick.runAfter = function(task) {
                laterQueue.push(task);
                if (!flushing) {
                  flushing = true;
                  requestTick();
                }
              };
              return nextTick;
            })();
            var call = Function.call;
            function uncurryThis(f) {
              return function() {
                return call.apply(f, arguments);
              };
            }
            var array_slice = uncurryThis(Array.prototype.slice);
            var array_reduce = uncurryThis(Array.prototype.reduce || function(callback, basis) {
              var index = 0,
                  length = this.length;
              if (arguments.length === 1) {
                do {
                  if (index in this) {
                    basis = this[index++];
                    break;
                  }
                  if (++index >= length) {
                    throw new TypeError();
                  }
                } while (1);
              }
              for (; index < length; index++) {
                if (index in this) {
                  basis = callback(basis, this[index], index);
                }
              }
              return basis;
            });
            var array_indexOf = uncurryThis(Array.prototype.indexOf || function(value) {
              for (var i = 0; i < this.length; i++) {
                if (this[i] === value) {
                  return i;
                }
              }
              return -1;
            });
            var array_map = uncurryThis(Array.prototype.map || function(callback, thisp) {
              var self = this;
              var collect = [];
              array_reduce(self, function(undefined, value, index) {
                collect.push(callback.call(thisp, value, index, self));
              }, void 0);
              return collect;
            });
            var object_create = Object.create || function(prototype) {
              function Type() {}
              Type.prototype = prototype;
              return new Type();
            };
            var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
            var object_keys = Object.keys || function(object) {
              var keys = [];
              for (var key in object) {
                if (object_hasOwnProperty(object, key)) {
                  keys.push(key);
                }
              }
              return keys;
            };
            var object_toString = uncurryThis(Object.prototype.toString);
            function isObject(value) {
              return value === Object(value);
            }
            function isStopIteration(exception) {
              return (object_toString(exception) === "[object StopIteration]" || exception instanceof QReturnValue);
            }
            var QReturnValue;
            if (typeof ReturnValue !== "undefined") {
              QReturnValue = ReturnValue;
            } else {
              QReturnValue = function(value) {
                this.value = value;
              };
            }
            var STACK_JUMP_SEPARATOR = "From previous event:";
            function makeStackTraceLong(error, promise) {
              if (hasStacks && promise.stack && typeof error === "object" && error !== null && error.stack && error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1) {
                var stacks = [];
                for (var p = promise; !!p; p = p.source) {
                  if (p.stack) {
                    stacks.unshift(p.stack);
                  }
                }
                stacks.unshift(error.stack);
                var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
                error.stack = filterStackString(concatedStacks);
              }
            }
            function filterStackString(stackString) {
              var lines = stackString.split("\n");
              var desiredLines = [];
              for (var i = 0; i < lines.length; ++i) {
                var line = lines[i];
                if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
                  desiredLines.push(line);
                }
              }
              return desiredLines.join("\n");
            }
            function isNodeFrame(stackLine) {
              return stackLine.indexOf("(module.js:") !== -1 || stackLine.indexOf("(node.js:") !== -1;
            }
            function getFileNameAndLineNumber(stackLine) {
              var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
              if (attempt1) {
                return [attempt1[1], Number(attempt1[2])];
              }
              var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
              if (attempt2) {
                return [attempt2[1], Number(attempt2[2])];
              }
              var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
              if (attempt3) {
                return [attempt3[1], Number(attempt3[2])];
              }
            }
            function isInternalFrame(stackLine) {
              var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);
              if (!fileNameAndLineNumber) {
                return false;
              }
              var fileName = fileNameAndLineNumber[0];
              var lineNumber = fileNameAndLineNumber[1];
              return fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine;
            }
            function captureLine() {
              if (!hasStacks) {
                return;
              }
              try {
                throw new Error();
              } catch (e) {
                var lines = e.stack.split("\n");
                var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
                var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
                if (!fileNameAndLineNumber) {
                  return;
                }
                qFileName = fileNameAndLineNumber[0];
                return fileNameAndLineNumber[1];
              }
            }
            function deprecate(callback, name, alternative) {
              return function() {
                if (typeof console !== "undefined" && typeof console.warn === "function") {
                  console.warn(name + " is deprecated, use " + alternative + " instead.", new Error("").stack);
                }
                return callback.apply(callback, arguments);
              };
            }
            function Q(value) {
              if (value instanceof Promise) {
                return value;
              }
              if (isPromiseAlike(value)) {
                return coerce(value);
              } else {
                return fulfill(value);
              }
            }
            Q.resolve = Q;
            Q.nextTick = nextTick;
            Q.longStackSupport = false;
            if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
              Q.longStackSupport = true;
            }
            Q.defer = defer;
            function defer() {
              var messages = [],
                  progressListeners = [],
                  resolvedPromise;
              var deferred = object_create(defer.prototype);
              var promise = object_create(Promise.prototype);
              promise.promiseDispatch = function(resolve, op, operands) {
                var args = array_slice(arguments);
                if (messages) {
                  messages.push(args);
                  if (op === "when" && operands[1]) {
                    progressListeners.push(operands[1]);
                  }
                } else {
                  Q.nextTick(function() {
                    resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
                  });
                }
              };
              promise.valueOf = function() {
                if (messages) {
                  return promise;
                }
                var nearerValue = nearer(resolvedPromise);
                if (isPromise(nearerValue)) {
                  resolvedPromise = nearerValue;
                }
                return nearerValue;
              };
              promise.inspect = function() {
                if (!resolvedPromise) {
                  return {state: "pending"};
                }
                return resolvedPromise.inspect();
              };
              if (Q.longStackSupport && hasStacks) {
                try {
                  throw new Error();
                } catch (e) {
                  promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
                }
              }
              function become(newPromise) {
                resolvedPromise = newPromise;
                promise.source = newPromise;
                array_reduce(messages, function(undefined, message) {
                  Q.nextTick(function() {
                    newPromise.promiseDispatch.apply(newPromise, message);
                  });
                }, void 0);
                messages = void 0;
                progressListeners = void 0;
              }
              deferred.promise = promise;
              deferred.resolve = function(value) {
                if (resolvedPromise) {
                  return;
                }
                become(Q(value));
              };
              deferred.fulfill = function(value) {
                if (resolvedPromise) {
                  return;
                }
                become(fulfill(value));
              };
              deferred.reject = function(reason) {
                if (resolvedPromise) {
                  return;
                }
                become(reject(reason));
              };
              deferred.notify = function(progress) {
                if (resolvedPromise) {
                  return;
                }
                array_reduce(progressListeners, function(undefined, progressListener) {
                  Q.nextTick(function() {
                    progressListener(progress);
                  });
                }, void 0);
              };
              return deferred;
            }
            defer.prototype.makeNodeResolver = function() {
              var self = this;
              return function(error, value) {
                if (error) {
                  self.reject(error);
                } else if (arguments.length > 2) {
                  self.resolve(array_slice(arguments, 1));
                } else {
                  self.resolve(value);
                }
              };
            };
            Q.Promise = promise;
            Q.promise = promise;
            function promise(resolver) {
              if (typeof resolver !== "function") {
                throw new TypeError("resolver must be a function.");
              }
              var deferred = defer();
              try {
                resolver(deferred.resolve, deferred.reject, deferred.notify);
              } catch (reason) {
                deferred.reject(reason);
              }
              return deferred.promise;
            }
            promise.race = race;
            promise.all = all;
            promise.reject = reject;
            promise.resolve = Q;
            Q.passByCopy = function(object) {
              return object;
            };
            Promise.prototype.passByCopy = function() {
              return this;
            };
            Q.join = function(x, y) {
              return Q(x).join(y);
            };
            Promise.prototype.join = function(that) {
              return Q([this, that]).spread(function(x, y) {
                if (x === y) {
                  return x;
                } else {
                  throw new Error("Can't join: not the same: " + x + " " + y);
                }
              });
            };
            Q.race = race;
            function race(answerPs) {
              return promise(function(resolve, reject) {
                for (var i = 0,
                    len = answerPs.length; i < len; i++) {
                  Q(answerPs[i]).then(resolve, reject);
                }
              });
            }
            Promise.prototype.race = function() {
              return this.then(Q.race);
            };
            Q.makePromise = Promise;
            function Promise(descriptor, fallback, inspect) {
              if (fallback === void 0) {
                fallback = function(op) {
                  return reject(new Error("Promise does not support operation: " + op));
                };
              }
              if (inspect === void 0) {
                inspect = function() {
                  return {state: "unknown"};
                };
              }
              var promise = object_create(Promise.prototype);
              promise.promiseDispatch = function(resolve, op, args) {
                var result;
                try {
                  if (descriptor[op]) {
                    result = descriptor[op].apply(promise, args);
                  } else {
                    result = fallback.call(promise, op, args);
                  }
                } catch (exception) {
                  result = reject(exception);
                }
                if (resolve) {
                  resolve(result);
                }
              };
              promise.inspect = inspect;
              if (inspect) {
                var inspected = inspect();
                if (inspected.state === "rejected") {
                  promise.exception = inspected.reason;
                }
                promise.valueOf = function() {
                  var inspected = inspect();
                  if (inspected.state === "pending" || inspected.state === "rejected") {
                    return promise;
                  }
                  return inspected.value;
                };
              }
              return promise;
            }
            Promise.prototype.toString = function() {
              return "[object Promise]";
            };
            Promise.prototype.then = function(fulfilled, rejected, progressed) {
              var self = this;
              var deferred = defer();
              var done = false;
              function _fulfilled(value) {
                try {
                  return typeof fulfilled === "function" ? fulfilled(value) : value;
                } catch (exception) {
                  return reject(exception);
                }
              }
              function _rejected(exception) {
                if (typeof rejected === "function") {
                  makeStackTraceLong(exception, self);
                  try {
                    return rejected(exception);
                  } catch (newException) {
                    return reject(newException);
                  }
                }
                return reject(exception);
              }
              function _progressed(value) {
                return typeof progressed === "function" ? progressed(value) : value;
              }
              Q.nextTick(function() {
                self.promiseDispatch(function(value) {
                  if (done) {
                    return;
                  }
                  done = true;
                  deferred.resolve(_fulfilled(value));
                }, "when", [function(exception) {
                  if (done) {
                    return;
                  }
                  done = true;
                  deferred.resolve(_rejected(exception));
                }]);
              });
              self.promiseDispatch(void 0, "when", [void 0, function(value) {
                var newValue;
                var threw = false;
                try {
                  newValue = _progressed(value);
                } catch (e) {
                  threw = true;
                  if (Q.onerror) {
                    Q.onerror(e);
                  } else {
                    throw e;
                  }
                }
                if (!threw) {
                  deferred.notify(newValue);
                }
              }]);
              return deferred.promise;
            };
            Q.tap = function(promise, callback) {
              return Q(promise).tap(callback);
            };
            Promise.prototype.tap = function(callback) {
              callback = Q(callback);
              return this.then(function(value) {
                return callback.fcall(value).thenResolve(value);
              });
            };
            Q.when = when;
            function when(value, fulfilled, rejected, progressed) {
              return Q(value).then(fulfilled, rejected, progressed);
            }
            Promise.prototype.thenResolve = function(value) {
              return this.then(function() {
                return value;
              });
            };
            Q.thenResolve = function(promise, value) {
              return Q(promise).thenResolve(value);
            };
            Promise.prototype.thenReject = function(reason) {
              return this.then(function() {
                throw reason;
              });
            };
            Q.thenReject = function(promise, reason) {
              return Q(promise).thenReject(reason);
            };
            Q.nearer = nearer;
            function nearer(value) {
              if (isPromise(value)) {
                var inspected = value.inspect();
                if (inspected.state === "fulfilled") {
                  return inspected.value;
                }
              }
              return value;
            }
            Q.isPromise = isPromise;
            function isPromise(object) {
              return object instanceof Promise;
            }
            Q.isPromiseAlike = isPromiseAlike;
            function isPromiseAlike(object) {
              return isObject(object) && typeof object.then === "function";
            }
            Q.isPending = isPending;
            function isPending(object) {
              return isPromise(object) && object.inspect().state === "pending";
            }
            Promise.prototype.isPending = function() {
              return this.inspect().state === "pending";
            };
            Q.isFulfilled = isFulfilled;
            function isFulfilled(object) {
              return !isPromise(object) || object.inspect().state === "fulfilled";
            }
            Promise.prototype.isFulfilled = function() {
              return this.inspect().state === "fulfilled";
            };
            Q.isRejected = isRejected;
            function isRejected(object) {
              return isPromise(object) && object.inspect().state === "rejected";
            }
            Promise.prototype.isRejected = function() {
              return this.inspect().state === "rejected";
            };
            var unhandledReasons = [];
            var unhandledRejections = [];
            var reportedUnhandledRejections = [];
            var trackUnhandledRejections = true;
            function resetUnhandledRejections() {
              unhandledReasons.length = 0;
              unhandledRejections.length = 0;
              if (!trackUnhandledRejections) {
                trackUnhandledRejections = true;
              }
            }
            function trackRejection(promise, reason) {
              if (!trackUnhandledRejections) {
                return;
              }
              if (typeof process === "object" && typeof process.emit === "function") {
                Q.nextTick.runAfter(function() {
                  if (array_indexOf(unhandledRejections, promise) !== -1) {
                    process.emit("unhandledRejection", reason, promise);
                    reportedUnhandledRejections.push(promise);
                  }
                });
              }
              unhandledRejections.push(promise);
              if (reason && typeof reason.stack !== "undefined") {
                unhandledReasons.push(reason.stack);
              } else {
                unhandledReasons.push("(no stack) " + reason);
              }
            }
            function untrackRejection(promise) {
              if (!trackUnhandledRejections) {
                return;
              }
              var at = array_indexOf(unhandledRejections, promise);
              if (at !== -1) {
                if (typeof process === "object" && typeof process.emit === "function") {
                  Q.nextTick.runAfter(function() {
                    var atReport = array_indexOf(reportedUnhandledRejections, promise);
                    if (atReport !== -1) {
                      process.emit("rejectionHandled", unhandledReasons[at], promise);
                      reportedUnhandledRejections.splice(atReport, 1);
                    }
                  });
                }
                unhandledRejections.splice(at, 1);
                unhandledReasons.splice(at, 1);
              }
            }
            Q.resetUnhandledRejections = resetUnhandledRejections;
            Q.getUnhandledReasons = function() {
              return unhandledReasons.slice();
            };
            Q.stopUnhandledRejectionTracking = function() {
              resetUnhandledRejections();
              trackUnhandledRejections = false;
            };
            resetUnhandledRejections();
            Q.reject = reject;
            function reject(reason) {
              var rejection = Promise({"when": function(rejected) {
                  if (rejected) {
                    untrackRejection(this);
                  }
                  return rejected ? rejected(reason) : this;
                }}, function fallback() {
                return this;
              }, function inspect() {
                return {
                  state: "rejected",
                  reason: reason
                };
              });
              trackRejection(rejection, reason);
              return rejection;
            }
            Q.fulfill = fulfill;
            function fulfill(value) {
              return Promise({
                "when": function() {
                  return value;
                },
                "get": function(name) {
                  return value[name];
                },
                "set": function(name, rhs) {
                  value[name] = rhs;
                },
                "delete": function(name) {
                  delete value[name];
                },
                "post": function(name, args) {
                  if (name === null || name === void 0) {
                    return value.apply(void 0, args);
                  } else {
                    return value[name].apply(value, args);
                  }
                },
                "apply": function(thisp, args) {
                  return value.apply(thisp, args);
                },
                "keys": function() {
                  return object_keys(value);
                }
              }, void 0, function inspect() {
                return {
                  state: "fulfilled",
                  value: value
                };
              });
            }
            function coerce(promise) {
              var deferred = defer();
              Q.nextTick(function() {
                try {
                  promise.then(deferred.resolve, deferred.reject, deferred.notify);
                } catch (exception) {
                  deferred.reject(exception);
                }
              });
              return deferred.promise;
            }
            Q.master = master;
            function master(object) {
              return Promise({"isDef": function() {}}, function fallback(op, args) {
                return dispatch(object, op, args);
              }, function() {
                return Q(object).inspect();
              });
            }
            Q.spread = spread;
            function spread(value, fulfilled, rejected) {
              return Q(value).spread(fulfilled, rejected);
            }
            Promise.prototype.spread = function(fulfilled, rejected) {
              return this.all().then(function(array) {
                return fulfilled.apply(void 0, array);
              }, rejected);
            };
            Q.async = async;
            function async(makeGenerator) {
              return function() {
                function continuer(verb, arg) {
                  var result;
                  if (typeof StopIteration === "undefined") {
                    try {
                      result = generator[verb](arg);
                    } catch (exception) {
                      return reject(exception);
                    }
                    if (result.done) {
                      return Q(result.value);
                    } else {
                      return when(result.value, callback, errback);
                    }
                  } else {
                    try {
                      result = generator[verb](arg);
                    } catch (exception) {
                      if (isStopIteration(exception)) {
                        return Q(exception.value);
                      } else {
                        return reject(exception);
                      }
                    }
                    return when(result, callback, errback);
                  }
                }
                var generator = makeGenerator.apply(this, arguments);
                var callback = continuer.bind(continuer, "next");
                var errback = continuer.bind(continuer, "throw");
                return callback();
              };
            }
            Q.spawn = spawn;
            function spawn(makeGenerator) {
              Q.done(Q.async(makeGenerator)());
            }
            Q["return"] = _return;
            function _return(value) {
              throw new QReturnValue(value);
            }
            Q.promised = promised;
            function promised(callback) {
              return function() {
                return spread([this, all(arguments)], function(self, args) {
                  return callback.apply(self, args);
                });
              };
            }
            Q.dispatch = dispatch;
            function dispatch(object, op, args) {
              return Q(object).dispatch(op, args);
            }
            Promise.prototype.dispatch = function(op, args) {
              var self = this;
              var deferred = defer();
              Q.nextTick(function() {
                self.promiseDispatch(deferred.resolve, op, args);
              });
              return deferred.promise;
            };
            Q.get = function(object, key) {
              return Q(object).dispatch("get", [key]);
            };
            Promise.prototype.get = function(key) {
              return this.dispatch("get", [key]);
            };
            Q.set = function(object, key, value) {
              return Q(object).dispatch("set", [key, value]);
            };
            Promise.prototype.set = function(key, value) {
              return this.dispatch("set", [key, value]);
            };
            Q.del = Q["delete"] = function(object, key) {
              return Q(object).dispatch("delete", [key]);
            };
            Promise.prototype.del = Promise.prototype["delete"] = function(key) {
              return this.dispatch("delete", [key]);
            };
            Q.mapply = Q.post = function(object, name, args) {
              return Q(object).dispatch("post", [name, args]);
            };
            Promise.prototype.mapply = Promise.prototype.post = function(name, args) {
              return this.dispatch("post", [name, args]);
            };
            Q.send = Q.mcall = Q.invoke = function(object, name) {
              return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
            };
            Promise.prototype.send = Promise.prototype.mcall = Promise.prototype.invoke = function(name) {
              return this.dispatch("post", [name, array_slice(arguments, 1)]);
            };
            Q.fapply = function(object, args) {
              return Q(object).dispatch("apply", [void 0, args]);
            };
            Promise.prototype.fapply = function(args) {
              return this.dispatch("apply", [void 0, args]);
            };
            Q["try"] = Q.fcall = function(object) {
              return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
            };
            Promise.prototype.fcall = function() {
              return this.dispatch("apply", [void 0, array_slice(arguments)]);
            };
            Q.fbind = function(object) {
              var promise = Q(object);
              var args = array_slice(arguments, 1);
              return function fbound() {
                return promise.dispatch("apply", [this, args.concat(array_slice(arguments))]);
              };
            };
            Promise.prototype.fbind = function() {
              var promise = this;
              var args = array_slice(arguments);
              return function fbound() {
                return promise.dispatch("apply", [this, args.concat(array_slice(arguments))]);
              };
            };
            Q.keys = function(object) {
              return Q(object).dispatch("keys", []);
            };
            Promise.prototype.keys = function() {
              return this.dispatch("keys", []);
            };
            Q.all = all;
            function all(promises) {
              return when(promises, function(promises) {
                var pendingCount = 0;
                var deferred = defer();
                array_reduce(promises, function(undefined, promise, index) {
                  var snapshot;
                  if (isPromise(promise) && (snapshot = promise.inspect()).state === "fulfilled") {
                    promises[index] = snapshot.value;
                  } else {
                    ++pendingCount;
                    when(promise, function(value) {
                      promises[index] = value;
                      if (--pendingCount === 0) {
                        deferred.resolve(promises);
                      }
                    }, deferred.reject, function(progress) {
                      deferred.notify({
                        index: index,
                        value: progress
                      });
                    });
                  }
                }, void 0);
                if (pendingCount === 0) {
                  deferred.resolve(promises);
                }
                return deferred.promise;
              });
            }
            Promise.prototype.all = function() {
              return all(this);
            };
            Q.any = any;
            function any(promises) {
              if (promises.length === 0) {
                return Q.resolve();
              }
              var deferred = Q.defer();
              var pendingCount = 0;
              array_reduce(promises, function(prev, current, index) {
                var promise = promises[index];
                pendingCount++;
                when(promise, onFulfilled, onRejected, onProgress);
                function onFulfilled(result) {
                  deferred.resolve(result);
                }
                function onRejected() {
                  pendingCount--;
                  if (pendingCount === 0) {
                    deferred.reject(new Error("Can't get fulfillment value from any promise, all " + "promises were rejected."));
                  }
                }
                function onProgress(progress) {
                  deferred.notify({
                    index: index,
                    value: progress
                  });
                }
              }, undefined);
              return deferred.promise;
            }
            Promise.prototype.any = function() {
              return any(this);
            };
            Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
            function allResolved(promises) {
              return when(promises, function(promises) {
                promises = array_map(promises, Q);
                return when(all(array_map(promises, function(promise) {
                  return when(promise, noop, noop);
                })), function() {
                  return promises;
                });
              });
            }
            Promise.prototype.allResolved = function() {
              return allResolved(this);
            };
            Q.allSettled = allSettled;
            function allSettled(promises) {
              return Q(promises).allSettled();
            }
            Promise.prototype.allSettled = function() {
              return this.then(function(promises) {
                return all(array_map(promises, function(promise) {
                  promise = Q(promise);
                  function regardless() {
                    return promise.inspect();
                  }
                  return promise.then(regardless, regardless);
                }));
              });
            };
            Q.fail = Q["catch"] = function(object, rejected) {
              return Q(object).then(void 0, rejected);
            };
            Promise.prototype.fail = Promise.prototype["catch"] = function(rejected) {
              return this.then(void 0, rejected);
            };
            Q.progress = progress;
            function progress(object, progressed) {
              return Q(object).then(void 0, void 0, progressed);
            }
            Promise.prototype.progress = function(progressed) {
              return this.then(void 0, void 0, progressed);
            };
            Q.fin = Q["finally"] = function(object, callback) {
              return Q(object)["finally"](callback);
            };
            Promise.prototype.fin = Promise.prototype["finally"] = function(callback) {
              callback = Q(callback);
              return this.then(function(value) {
                return callback.fcall().then(function() {
                  return value;
                });
              }, function(reason) {
                return callback.fcall().then(function() {
                  throw reason;
                });
              });
            };
            Q.done = function(object, fulfilled, rejected, progress) {
              return Q(object).done(fulfilled, rejected, progress);
            };
            Promise.prototype.done = function(fulfilled, rejected, progress) {
              var onUnhandledError = function(error) {
                Q.nextTick(function() {
                  makeStackTraceLong(error, promise);
                  if (Q.onerror) {
                    Q.onerror(error);
                  } else {
                    throw error;
                  }
                });
              };
              var promise = fulfilled || rejected || progress ? this.then(fulfilled, rejected, progress) : this;
              if (typeof process === "object" && process && process.domain) {
                onUnhandledError = process.domain.bind(onUnhandledError);
              }
              promise.then(void 0, onUnhandledError);
            };
            Q.timeout = function(object, ms, error) {
              return Q(object).timeout(ms, error);
            };
            Promise.prototype.timeout = function(ms, error) {
              var deferred = defer();
              var timeoutId = setTimeout(function() {
                if (!error || "string" === typeof error) {
                  error = new Error(error || "Timed out after " + ms + " ms");
                  error.code = "ETIMEDOUT";
                }
                deferred.reject(error);
              }, ms);
              this.then(function(value) {
                clearTimeout(timeoutId);
                deferred.resolve(value);
              }, function(exception) {
                clearTimeout(timeoutId);
                deferred.reject(exception);
              }, deferred.notify);
              return deferred.promise;
            };
            Q.delay = function(object, timeout) {
              if (timeout === void 0) {
                timeout = object;
                object = void 0;
              }
              return Q(object).delay(timeout);
            };
            Promise.prototype.delay = function(timeout) {
              return this.then(function(value) {
                var deferred = defer();
                setTimeout(function() {
                  deferred.resolve(value);
                }, timeout);
                return deferred.promise;
              });
            };
            Q.nfapply = function(callback, args) {
              return Q(callback).nfapply(args);
            };
            Promise.prototype.nfapply = function(args) {
              var deferred = defer();
              var nodeArgs = array_slice(args);
              nodeArgs.push(deferred.makeNodeResolver());
              this.fapply(nodeArgs).fail(deferred.reject);
              return deferred.promise;
            };
            Q.nfcall = function(callback) {
              var args = array_slice(arguments, 1);
              return Q(callback).nfapply(args);
            };
            Promise.prototype.nfcall = function() {
              var nodeArgs = array_slice(arguments);
              var deferred = defer();
              nodeArgs.push(deferred.makeNodeResolver());
              this.fapply(nodeArgs).fail(deferred.reject);
              return deferred.promise;
            };
            Q.nfbind = Q.denodeify = function(callback) {
              var baseArgs = array_slice(arguments, 1);
              return function() {
                var nodeArgs = baseArgs.concat(array_slice(arguments));
                var deferred = defer();
                nodeArgs.push(deferred.makeNodeResolver());
                Q(callback).fapply(nodeArgs).fail(deferred.reject);
                return deferred.promise;
              };
            };
            Promise.prototype.nfbind = Promise.prototype.denodeify = function() {
              var args = array_slice(arguments);
              args.unshift(this);
              return Q.denodeify.apply(void 0, args);
            };
            Q.nbind = function(callback, thisp) {
              var baseArgs = array_slice(arguments, 2);
              return function() {
                var nodeArgs = baseArgs.concat(array_slice(arguments));
                var deferred = defer();
                nodeArgs.push(deferred.makeNodeResolver());
                function bound() {
                  return callback.apply(thisp, arguments);
                }
                Q(bound).fapply(nodeArgs).fail(deferred.reject);
                return deferred.promise;
              };
            };
            Promise.prototype.nbind = function() {
              var args = array_slice(arguments, 0);
              args.unshift(this);
              return Q.nbind.apply(void 0, args);
            };
            Q.nmapply = Q.npost = function(object, name, args) {
              return Q(object).npost(name, args);
            };
            Promise.prototype.nmapply = Promise.prototype.npost = function(name, args) {
              var nodeArgs = array_slice(args || []);
              var deferred = defer();
              nodeArgs.push(deferred.makeNodeResolver());
              this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
              return deferred.promise;
            };
            Q.nsend = Q.nmcall = Q.ninvoke = function(object, name) {
              var nodeArgs = array_slice(arguments, 2);
              var deferred = defer();
              nodeArgs.push(deferred.makeNodeResolver());
              Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
              return deferred.promise;
            };
            Promise.prototype.nsend = Promise.prototype.nmcall = Promise.prototype.ninvoke = function(name) {
              var nodeArgs = array_slice(arguments, 1);
              var deferred = defer();
              nodeArgs.push(deferred.makeNodeResolver());
              this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
              return deferred.promise;
            };
            Q.nodeify = nodeify;
            function nodeify(object, nodeback) {
              return Q(object).nodeify(nodeback);
            }
            Promise.prototype.nodeify = function(nodeback) {
              if (nodeback) {
                this.then(function(value) {
                  Q.nextTick(function() {
                    nodeback(null, value);
                  });
                }, function(error) {
                  Q.nextTick(function() {
                    nodeback(error);
                  });
                });
              } else {
                return this;
              }
            };
            Q.noConflict = function() {
              throw new Error("Q.noConflict only works when Q is used as a global");
            };
            var qEndingLine = captureLine();
            return Q;
          });
        }).call(this, require('_process'));
      }, {"_process": 13}],
      159: [function(require, module, exports) {
        var Emitter = require('emitter');
        var reduce = require('reduce');
        var root;
        if (typeof window !== 'undefined') {
          root = window;
        } else if (typeof self !== 'undefined') {
          root = self;
        } else {
          root = this;
        }
        function noop() {}
        ;
        function isHost(obj) {
          var str = {}.toString.call(obj);
          switch (str) {
            case '[object File]':
            case '[object Blob]':
            case '[object FormData]':
              return true;
            default:
              return false;
          }
        }
        request.getXHR = function() {
          if (root.XMLHttpRequest && (!root.location || 'file:' != root.location.protocol || !root.ActiveXObject)) {
            return new XMLHttpRequest;
          } else {
            try {
              return new ActiveXObject('Microsoft.XMLHTTP');
            } catch (e) {}
            try {
              return new ActiveXObject('Msxml2.XMLHTTP.6.0');
            } catch (e) {}
            try {
              return new ActiveXObject('Msxml2.XMLHTTP.3.0');
            } catch (e) {}
            try {
              return new ActiveXObject('Msxml2.XMLHTTP');
            } catch (e) {}
          }
          return false;
        };
        var trim = ''.trim ? function(s) {
          return s.trim();
        } : function(s) {
          return s.replace(/(^\s*|\s*$)/g, '');
        };
        function isObject(obj) {
          return obj === Object(obj);
        }
        function serialize(obj) {
          if (!isObject(obj))
            return obj;
          var pairs = [];
          for (var key in obj) {
            if (null != obj[key]) {
              pushEncodedKeyValuePair(pairs, key, obj[key]);
            }
          }
          return pairs.join('&');
        }
        function pushEncodedKeyValuePair(pairs, key, val) {
          if (Array.isArray(val)) {
            return val.forEach(function(v) {
              pushEncodedKeyValuePair(pairs, key, v);
            });
          }
          pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
        }
        request.serializeObject = serialize;
        function parseString(str) {
          var obj = {};
          var pairs = str.split('&');
          var parts;
          var pair;
          for (var i = 0,
              len = pairs.length; i < len; ++i) {
            pair = pairs[i];
            parts = pair.split('=');
            obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
          }
          return obj;
        }
        request.parseString = parseString;
        request.types = {
          html: 'text/html',
          json: 'application/json',
          xml: 'application/xml',
          urlencoded: 'application/x-www-form-urlencoded',
          'form': 'application/x-www-form-urlencoded',
          'form-data': 'application/x-www-form-urlencoded'
        };
        request.serialize = {
          'application/x-www-form-urlencoded': serialize,
          'application/json': JSON.stringify
        };
        request.parse = {
          'application/x-www-form-urlencoded': parseString,
          'application/json': JSON.parse
        };
        function parseHeader(str) {
          var lines = str.split(/\r?\n/);
          var fields = {};
          var index;
          var line;
          var field;
          var val;
          lines.pop();
          for (var i = 0,
              len = lines.length; i < len; ++i) {
            line = lines[i];
            index = line.indexOf(':');
            field = line.slice(0, index).toLowerCase();
            val = trim(line.slice(index + 1));
            fields[field] = val;
          }
          return fields;
        }
        function isJSON(mime) {
          return /[\/+]json\b/.test(mime);
        }
        function type(str) {
          return str.split(/ *; */).shift();
        }
        ;
        function params(str) {
          return reduce(str.split(/ *; */), function(obj, str) {
            var parts = str.split(/ *= */),
                key = parts.shift(),
                val = parts.shift();
            if (key && val)
              obj[key] = val;
            return obj;
          }, {});
        }
        ;
        function Response(req, options) {
          options = options || {};
          this.req = req;
          this.xhr = this.req.xhr;
          this.text = ((this.req.method != 'HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined') ? this.xhr.responseText : null;
          this.statusText = this.req.xhr.statusText;
          this.setStatusProperties(this.xhr.status);
          this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
          this.header['content-type'] = this.xhr.getResponseHeader('content-type');
          this.setHeaderProperties(this.header);
          this.body = this.req.method != 'HEAD' ? this.parseBody(this.text ? this.text : this.xhr.response) : null;
        }
        Response.prototype.get = function(field) {
          return this.header[field.toLowerCase()];
        };
        Response.prototype.setHeaderProperties = function(header) {
          var ct = this.header['content-type'] || '';
          this.type = type(ct);
          var obj = params(ct);
          for (var key in obj)
            this[key] = obj[key];
        };
        Response.prototype.parseBody = function(str) {
          var parse = request.parse[this.type];
          return parse && str && (str.length || str instanceof Object) ? parse(str) : null;
        };
        Response.prototype.setStatusProperties = function(status) {
          if (status === 1223) {
            status = 204;
          }
          var type = status / 100 | 0;
          this.status = this.statusCode = status;
          this.statusType = type;
          this.info = 1 == type;
          this.ok = 2 == type;
          this.clientError = 4 == type;
          this.serverError = 5 == type;
          this.error = (4 == type || 5 == type) ? this.toError() : false;
          this.accepted = 202 == status;
          this.noContent = 204 == status;
          this.badRequest = 400 == status;
          this.unauthorized = 401 == status;
          this.notAcceptable = 406 == status;
          this.notFound = 404 == status;
          this.forbidden = 403 == status;
        };
        Response.prototype.toError = function() {
          var req = this.req;
          var method = req.method;
          var url = req.url;
          var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
          var err = new Error(msg);
          err.status = this.status;
          err.method = method;
          err.url = url;
          return err;
        };
        request.Response = Response;
        function Request(method, url) {
          var self = this;
          Emitter.call(this);
          this._query = this._query || [];
          this.method = method;
          this.url = url;
          this.header = {};
          this._header = {};
          this.on('end', function() {
            var err = null;
            var res = null;
            try {
              res = new Response(self);
            } catch (e) {
              err = new Error('Parser is unable to parse the response');
              err.parse = true;
              err.original = e;
              err.rawResponse = self.xhr && self.xhr.responseText ? self.xhr.responseText : null;
              return self.callback(err);
            }
            self.emit('response', res);
            if (err) {
              return self.callback(err, res);
            }
            if (res.status >= 200 && res.status < 300) {
              return self.callback(err, res);
            }
            var new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
            new_err.original = err;
            new_err.response = res;
            new_err.status = res.status;
            self.callback(new_err, res);
          });
        }
        Emitter(Request.prototype);
        Request.prototype.use = function(fn) {
          fn(this);
          return this;
        };
        Request.prototype.timeout = function(ms) {
          this._timeout = ms;
          return this;
        };
        Request.prototype.clearTimeout = function() {
          this._timeout = 0;
          clearTimeout(this._timer);
          return this;
        };
        Request.prototype.abort = function() {
          if (this.aborted)
            return;
          this.aborted = true;
          this.xhr.abort();
          this.clearTimeout();
          this.emit('abort');
          return this;
        };
        Request.prototype.set = function(field, val) {
          if (isObject(field)) {
            for (var key in field) {
              this.set(key, field[key]);
            }
            return this;
          }
          this._header[field.toLowerCase()] = val;
          this.header[field] = val;
          return this;
        };
        Request.prototype.unset = function(field) {
          delete this._header[field.toLowerCase()];
          delete this.header[field];
          return this;
        };
        Request.prototype.getHeader = function(field) {
          return this._header[field.toLowerCase()];
        };
        Request.prototype.type = function(type) {
          this.set('Content-Type', request.types[type] || type);
          return this;
        };
        Request.prototype.parse = function(fn) {
          this._parser = fn;
          return this;
        };
        Request.prototype.accept = function(type) {
          this.set('Accept', request.types[type] || type);
          return this;
        };
        Request.prototype.auth = function(user, pass) {
          var str = btoa(user + ':' + pass);
          this.set('Authorization', 'Basic ' + str);
          return this;
        };
        Request.prototype.query = function(val) {
          if ('string' != typeof val)
            val = serialize(val);
          if (val)
            this._query.push(val);
          return this;
        };
        Request.prototype.field = function(name, val) {
          if (!this._formData)
            this._formData = new root.FormData();
          this._formData.append(name, val);
          return this;
        };
        Request.prototype.attach = function(field, file, filename) {
          if (!this._formData)
            this._formData = new root.FormData();
          this._formData.append(field, file, filename || file.name);
          return this;
        };
        Request.prototype.send = function(data) {
          var obj = isObject(data);
          var type = this.getHeader('Content-Type');
          if (obj && isObject(this._data)) {
            for (var key in data) {
              this._data[key] = data[key];
            }
          } else if ('string' == typeof data) {
            if (!type)
              this.type('form');
            type = this.getHeader('Content-Type');
            if ('application/x-www-form-urlencoded' == type) {
              this._data = this._data ? this._data + '&' + data : data;
            } else {
              this._data = (this._data || '') + data;
            }
          } else {
            this._data = data;
          }
          if (!obj || isHost(data))
            return this;
          if (!type)
            this.type('json');
          return this;
        };
        Request.prototype.callback = function(err, res) {
          var fn = this._callback;
          this.clearTimeout();
          fn(err, res);
        };
        Request.prototype.crossDomainError = function() {
          var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
          err.crossDomain = true;
          err.status = this.status;
          err.method = this.method;
          err.url = this.url;
          this.callback(err);
        };
        Request.prototype.timeoutError = function() {
          var timeout = this._timeout;
          var err = new Error('timeout of ' + timeout + 'ms exceeded');
          err.timeout = timeout;
          this.callback(err);
        };
        Request.prototype.withCredentials = function() {
          this._withCredentials = true;
          return this;
        };
        Request.prototype.end = function(fn) {
          var self = this;
          var xhr = this.xhr = request.getXHR();
          var query = this._query.join('&');
          var timeout = this._timeout;
          var data = this._formData || this._data;
          this._callback = fn || noop;
          xhr.onreadystatechange = function() {
            if (4 != xhr.readyState)
              return;
            var status;
            try {
              status = xhr.status;
            } catch (e) {
              status = 0;
            }
            if (0 == status) {
              if (self.timedout)
                return self.timeoutError();
              if (self.aborted)
                return;
              return self.crossDomainError();
            }
            self.emit('end');
          };
          var handleProgress = function(e) {
            if (e.total > 0) {
              e.percent = e.loaded / e.total * 100;
            }
            e.direction = 'download';
            self.emit('progress', e);
          };
          if (this.hasListeners('progress')) {
            xhr.onprogress = handleProgress;
          }
          try {
            if (xhr.upload && this.hasListeners('progress')) {
              xhr.upload.onprogress = handleProgress;
            }
          } catch (e) {}
          if (timeout && !this._timer) {
            this._timer = setTimeout(function() {
              self.timedout = true;
              self.abort();
            }, timeout);
          }
          if (query) {
            query = request.serializeObject(query);
            this.url += ~this.url.indexOf('?') ? '&' + query : '?' + query;
          }
          xhr.open(this.method, this.url, true);
          if (this._withCredentials)
            xhr.withCredentials = true;
          if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
            var contentType = this.getHeader('Content-Type');
            var serialize = this._parser || request.serialize[contentType ? contentType.split(';')[0] : ''];
            if (!serialize && isJSON(contentType))
              serialize = request.serialize['application/json'];
            if (serialize)
              data = serialize(data);
          }
          for (var field in this.header) {
            if (null == this.header[field])
              continue;
            xhr.setRequestHeader(field, this.header[field]);
          }
          this.emit('request', this);
          xhr.send(typeof data !== 'undefined' ? data : null);
          return this;
        };
        Request.prototype.then = function(fulfill, reject) {
          return this.end(function(err, res) {
            err ? reject(err) : fulfill(res);
          });
        };
        request.Request = Request;
        function request(method, url) {
          if ('function' == typeof url) {
            return new Request('GET', method).end(url);
          }
          if (1 == arguments.length) {
            return new Request('GET', method);
          }
          return new Request(method, url);
        }
        request.get = function(url, data, fn) {
          var req = request('GET', url);
          if ('function' == typeof data)
            fn = data, data = null;
          if (data)
            req.query(data);
          if (fn)
            req.end(fn);
          return req;
        };
        request.head = function(url, data, fn) {
          var req = request('HEAD', url);
          if ('function' == typeof data)
            fn = data, data = null;
          if (data)
            req.send(data);
          if (fn)
            req.end(fn);
          return req;
        };
        function del(url, fn) {
          var req = request('DELETE', url);
          if (fn)
            req.end(fn);
          return req;
        }
        ;
        request['del'] = del;
        request['delete'] = del;
        request.patch = function(url, data, fn) {
          var req = request('PATCH', url);
          if ('function' == typeof data)
            fn = data, data = null;
          if (data)
            req.send(data);
          if (fn)
            req.end(fn);
          return req;
        };
        request.post = function(url, data, fn) {
          var req = request('POST', url);
          if ('function' == typeof data)
            fn = data, data = null;
          if (data)
            req.send(data);
          if (fn)
            req.end(fn);
          return req;
        };
        request.put = function(url, data, fn) {
          var req = request('PUT', url);
          if ('function' == typeof data)
            fn = data, data = null;
          if (data)
            req.send(data);
          if (fn)
            req.end(fn);
          return req;
        };
        module.exports = request;
      }, {
        "emitter": 160,
        "reduce": 161
      }],
      160: [function(require, module, exports) {
        module.exports = Emitter;
        function Emitter(obj) {
          if (obj)
            return mixin(obj);
        }
        ;
        function mixin(obj) {
          for (var key in Emitter.prototype) {
            obj[key] = Emitter.prototype[key];
          }
          return obj;
        }
        Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
          this._callbacks = this._callbacks || {};
          (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
          return this;
        };
        Emitter.prototype.once = function(event, fn) {
          function on() {
            this.off(event, on);
            fn.apply(this, arguments);
          }
          on.fn = fn;
          this.on(event, on);
          return this;
        };
        Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
          this._callbacks = this._callbacks || {};
          if (0 == arguments.length) {
            this._callbacks = {};
            return this;
          }
          var callbacks = this._callbacks['$' + event];
          if (!callbacks)
            return this;
          if (1 == arguments.length) {
            delete this._callbacks['$' + event];
            return this;
          }
          var cb;
          for (var i = 0; i < callbacks.length; i++) {
            cb = callbacks[i];
            if (cb === fn || cb.fn === fn) {
              callbacks.splice(i, 1);
              break;
            }
          }
          return this;
        };
        Emitter.prototype.emit = function(event) {
          this._callbacks = this._callbacks || {};
          var args = [].slice.call(arguments, 1),
              callbacks = this._callbacks['$' + event];
          if (callbacks) {
            callbacks = callbacks.slice(0);
            for (var i = 0,
                len = callbacks.length; i < len; ++i) {
              callbacks[i].apply(this, args);
            }
          }
          return this;
        };
        Emitter.prototype.listeners = function(event) {
          this._callbacks = this._callbacks || {};
          return this._callbacks['$' + event] || [];
        };
        Emitter.prototype.hasListeners = function(event) {
          return !!this.listeners(event).length;
        };
      }, {}],
      161: [function(require, module, exports) {
        module.exports = function(arr, fn, initial) {
          var idx = 0;
          var len = arr.length;
          var curr = arguments.length == 3 ? initial : arr[idx++];
          while (idx < len) {
            curr = fn.call(null, curr, arr[idx], ++idx, arr);
          }
          return curr;
        };
      }, {}]
    }, {}, [1])(1);
  });
})(require('buffer').Buffer, require('process'));
