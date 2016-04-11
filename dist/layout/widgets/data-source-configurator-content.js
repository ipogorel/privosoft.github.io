'use strict';

System.register(['aurelia-framework', './../../data/data-source', './../../data/schema/providers/swagger-schema-provider', './widget-content', 'swagger-client', 'lodash'], function (_export, _context) {
  var computedFrom, Datasource, SwaggerSchemaProvider, WidgetContent, Swagger, _, _typeof, _createClass, _dec, _dec2, _desc, _value, _class, DataSourceConfiguratorContent;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  return {
    setters: [function (_aureliaFramework) {
      computedFrom = _aureliaFramework.computedFrom;
    }, function (_dataDataSource) {
      Datasource = _dataDataSource.Datasource;
    }, function (_dataSchemaProvidersSwaggerSchemaProvider) {
      SwaggerSchemaProvider = _dataSchemaProvidersSwaggerSchemaProvider.SwaggerSchemaProvider;
    }, function (_widgetContent) {
      WidgetContent = _widgetContent.WidgetContent;
    }, function (_swaggerClient) {
      Swagger = _swaggerClient.default;
    }, function (_lodash) {
      _ = _lodash;
    }],
    execute: function () {
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
      };

      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('DataSourceConfiguratorContent', DataSourceConfiguratorContent = (_dec = computedFrom("api"), _dec2 = computedFrom("method"), (_class = function (_WidgetContent) {
        _inherits(DataSourceConfiguratorContent, _WidgetContent);

        function DataSourceConfiguratorContent(widget) {
          _classCallCheck(this, DataSourceConfiguratorContent);

          var _this = _possibleConstructorReturn(this, _WidgetContent.call(this, widget));

          _this.definitionUrl = widget.settings.definitionsUrl.trim();
          _this._initSwaggerClient(_this.definitionUrl);
          return _this;
        }

        DataSourceConfiguratorContent.prototype.submit = function submit() {
          if (!this.widget.settings.dataSourceToConfigurate) throw "dataSourceToConfigurate is not provided";
          var ds = this.widget.settings.dataSourceToConfigurate;
          var url = this.client.scheme + "://" + this.client.host + this.client.basePath + this.client.apis[this.api].apis[this.method].path;

          var queryParams = _.map(_.filter(this.parameters, function (x) {
            return x.value && x.in == "query";
          }), function (p) {
            if (p.value) return p.name + "=" + p.value;
          });

          var definitionModelName = void 0;
          var responseDef = this.client[this.api].apis[this.method].successResponse["200"].definition;
          if (responseDef.type === "array") {
            if (responseDef.items.$ref.indexOf('#/definitions/') === 0) {
              if (this.client.definitions[responseDef.items.$ref.substring('#/definitions/'.length)]) definitionModelName = this.client.definitions[responseDef.items.$ref.substring('#/definitions/'.length)].name;
            }
          } else if (responseDef.name) {
            definitionModelName = responseDef.name;
          }

          _.forEach(_.filter(this.parameters, function (x) {
            return x.value && x.in == "path";
          }), function (pathParam) {
            url = url.replace("{" + pathParam.name + "}", pathParam.value);
          });

          if (queryParams.length > 0) url = url + "?" + queryParams.join("&");

          ds.transport.readService.configure({
            url: url,
            schemaProvider: new SwaggerSchemaProvider(this.definitionUrl, this.api, this.method, definitionModelName)
          });
          this.widget.dataSourceChanged.raise(ds);
        };

        DataSourceConfiguratorContent.prototype._initSwaggerClient = function _initSwaggerClient(url) {
          var _this2 = this;

          return new Swagger({
            url: url,
            usePromise: true }).then(function (client) {
            _this2.client = client;
          });
        };

        _createClass(DataSourceConfiguratorContent, [{
          key: 'client',
          get: function get() {
            return this._client;
          },
          set: function set(value) {
            this._client = value;
          }
        }, {
          key: 'definitionUrl',
          get: function get() {
            return this._definitionUrl;
          },
          set: function set(value) {
            this._definitionUrl = value;
          }
        }, {
          key: 'apis',
          get: function get() {
            if (this.client) return _.map(this.client.apisArray, 'name');else return [];
          }
        }, {
          key: 'methods',
          get: function get() {
            var _this3 = this;

            if (this.client && this.api) {
              var _ret = function () {
                var m = [];
                _.forOwn(_this3.client.apis[_this3.api].apis, function (a) {
                  if (a.method.toLowerCase() === "get") m.push(a.nickname);
                });
                return {
                  v: m
                };
              }();

              if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            } else return [];
          }
        }, {
          key: 'parameters',
          get: function get() {
            if (this.client && this.method && this.api) {
              return this.client.apis[this.api].apis[this.method].parameters;
            } else return [];
          },
          set: function set(value) {
            this._parameters = value;
          }
        }, {
          key: 'api',
          get: function get() {
            return this._api;
          },
          set: function set(value) {
            this._api = value;
          }
        }, {
          key: 'method',
          get: function get() {
            return this._method;
          },
          set: function set(value) {
            this._method = value;
          }
        }]);

        return DataSourceConfiguratorContent;
      }(WidgetContent), (_applyDecoratedDescriptor(_class.prototype, 'methods', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'methods'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'parameters', [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'parameters'), _class.prototype)), _class)));

      _export('DataSourceConfiguratorContent', DataSourceConfiguratorContent);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC93aWRnZXRzL2RhdGEtc291cmNlLWNvbmZpZ3VyYXRvci1jb250ZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFROztBQUNBOztBQUNBOztBQUNBOztBQUNEOztBQUNLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7K0NBRUMsd0NBNEJWLGFBQWEsS0FBYixXQWNBLGFBQWEsUUFBYjtrQkExQ1U7O0FBQ1gsaUJBRFcsNkJBQ1gsQ0FBWSxNQUFaLEVBQW1CO2dDQURSLCtCQUNROzt1REFDakIsMEJBQU0sTUFBTixHQURpQjs7QUFFakIsZ0JBQUssYUFBTCxHQUFxQixPQUFPLFFBQVAsQ0FBZ0IsY0FBaEIsQ0FBK0IsSUFBL0IsRUFBckIsQ0FGaUI7QUFHakIsZ0JBQUssa0JBQUwsQ0FBd0IsTUFBSyxhQUFMLENBQXhCLENBSGlCOztTQUFuQjs7QUFEVyxnREFvRVgsMkJBQVE7QUFDTixjQUFJLENBQUMsS0FBSyxNQUFMLENBQVksUUFBWixDQUFxQix1QkFBckIsRUFDSCxNQUFNLHlDQUFOLENBREY7QUFFQSxjQUFJLEtBQUssS0FBSyxNQUFMLENBQVksUUFBWixDQUFxQix1QkFBckIsQ0FISDtBQUlOLGNBQUksTUFBTSxLQUFLLE1BQUwsQ0FBWSxNQUFaLEdBQXFCLEtBQXJCLEdBQTZCLEtBQUssTUFBTCxDQUFZLElBQVosR0FBbUIsS0FBSyxNQUFMLENBQVksUUFBWixHQUF1QixLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLEtBQUssR0FBTCxDQUFqQixDQUEyQixJQUEzQixDQUFnQyxLQUFLLE1BQUwsQ0FBaEMsQ0FBNkMsSUFBN0MsQ0FKM0U7O0FBTU4sY0FBSSxjQUFjLEVBQUUsR0FBRixDQUFNLEVBQUUsTUFBRixDQUFTLEtBQUssVUFBTCxFQUFpQixhQUFHO0FBQUUsbUJBQVEsRUFBRSxLQUFGLElBQVcs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LEdBQUwsQ0FBakIsQ0FBMkIsSUFBM0IsRUFBaUMsYUFBRztBQUMzQyxzQkFBSSxFQUFFLE1BQUYsQ0FBUyxXQUFULE9BQTJCLEtBQTNCLEVBQ0YsRUFBRSxJQUFGLENBQU8sRUFBRSxRQUFGLENBQVAsQ0FERjtpQkFEd0MsQ0FBMUM7QUFJQTtxQkFBTztpQkFBUDtrQkFOMEI7OzthQUE1QixNQVNFLE9BQU8sRUFBUCxDQVRGOzs7OzhCQWFjO0FBQ2QsZ0JBQUksS0FBSyxNQUFMLElBQWUsS0FBSyxNQUFMLElBQWUsS0FBSyxHQUFMLEVBQVM7QUFDekMscUJBQU8sS0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixLQUFLLEdBQUwsQ0FBakIsQ0FBMkIsSUFBM0IsQ0FBZ0MsS0FBSyxNQUFMLENBQWhDLENBQTZDLFVBQTdDLENBRGtDO2FBQTNDLE1BSUUsT0FBTyxFQUFQLENBSkY7OzRCQU1hLE9BQU07QUFDbkIsaUJBQUssV0FBTCxHQUFtQixLQUFuQixDQURtQjs7Ozs4QkFJWjtBQUNQLG1CQUFPLEtBQUssSUFBTCxDQURBOzs0QkFHRCxPQUFNO0FBQ1osaUJBQUssSUFBTCxHQUFZLEtBQVosQ0FEWTs7Ozs4QkFHRjtBQUNWLG1CQUFPLEtBQUssT0FBTCxDQURHOzs0QkFHRCxPQUFNO0FBQ2YsaUJBQUssT0FBTCxHQUFlLEtBQWYsQ0FEZTs7OztlQS9ETjtRQUFzQyIsImZpbGUiOiJsYXlvdXQvd2lkZ2V0cy9kYXRhLXNvdXJjZS1jb25maWd1cmF0b3ItY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
