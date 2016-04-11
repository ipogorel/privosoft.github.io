"use strict";

System.register(["./schema-provider", "swagger-client", "../schema", "lodash"], function (_export, _context) {
  var SchemaProvider, Swagger, Schema, _, SwaggerSchemaProvider;

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

  return {
    setters: [function (_schemaProvider) {
      SchemaProvider = _schemaProvider.SchemaProvider;
    }, function (_swaggerClient) {
      Swagger = _swaggerClient.default;
    }, function (_schema) {
      Schema = _schema.Schema;
    }, function (_lodash) {
      _ = _lodash;
    }],
    execute: function () {
      _export("SwaggerSchemaProvider", SwaggerSchemaProvider = function (_SchemaProvider) {
        _inherits(SwaggerSchemaProvider, _SchemaProvider);

        function SwaggerSchemaProvider(definitionUrl, apiName, methodName, modelName) {
          _classCallCheck(this, SwaggerSchemaProvider);

          var _this = _possibleConstructorReturn(this, _SchemaProvider.call(this));

          _this._modelName = modelName;
          _this._methodName = methodName;
          _this._apiName = apiName;
          _this._definitionUrl = definitionUrl;
          return _this;
        }

        SwaggerSchemaProvider.prototype.getSchema = function getSchema() {
          var self = this;
          return new Swagger({
            url: this._definitionUrl,
            usePromise: true }).then(function (client) {
            var result = new Schema();
            _.forEach(client.apis[self._apiName].apis[self._methodName].parameters, function (p) {
              result.parameters.push(p);
            });
            if (client.definitions[self._modelName]) {
              _.forOwn(client.definitions[self._modelName].properties, function (value, key) {
                result.fields.push({ field: key, type: value.type });
              });
            }
            return result;
          });
        };

        return SwaggerSchemaProvider;
      }(SchemaProvider));

      _export("SwaggerSchemaProvider", SwaggerSchemaProvider);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvc2NoZW1hL3Byb3ZpZGVycy9zd2FnZ2VyLXNjaGVtYS1wcm92aWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVE7O0FBQ0Q7O0FBQ0M7O0FBQ0k7Ozt1Q0FFQzs7O0FBQ1gsaUJBRFcscUJBQ1gsQ0FBWSxhQUFaLEVBQTJCLE9BQTNCLEVBQW9DLFVBQXBDLEVBQWdELFNBQWhELEVBQTBEO2dDQUQvQyx1QkFDK0M7O3VEQUN4RCw0QkFEd0Q7O0FBRXhELGdCQUFLLFVBQUwsR0FBa0IsU0FBbEIsQ0FGd0Q7QUFHeEQsZ0JBQUssV0FBTCxHQUFtQixVQUFuQixDQUh3RDtBQUl4RCxnQkFBSyxRQUFMLEdBQWdCLE9BQWhCLENBSndEO0FBS3hELGdCQUFLLGNBQUwsR0FBc0IsYUFBdEIsQ0FMd0Q7O1NBQTFEOztBQURXLHdDQVFYLGlDQUFXO0FBQ1QsY0FBSSxPQUFPLElBQVAsQ0FESztBQUVULGlCQUFPLElBQUksT0FBSixDQUFZO0FBQ2pCLGlCQUFLLEtBQUssY0FBTDtBQUNMLHdCQUFZLElBQVosRUFGSyxFQUVjLElBRmQsQ0FFbUIsa0JBQVU7QUFDaEMsZ0JBQUksU0FBUyxJQUFJLE1BQUosRUFBVCxDQUQ0QjtBQUVoQyxjQUFFLE9BQUYsQ0FBVSxPQUFPLElBQVAsQ0FBWSxLQUFLLFFBQUwsQ0FBWixDQUEyQixJQUEzQixDQUFnQyxLQUFLLFdBQUwsQ0FBaEMsQ0FBa0QsVUFBbEQsRUFBOEQsYUFBRztBQUN6RSxxQkFBTyxVQUFQLENBQWtCLElBQWxCLENBQXVCLENBQXZCLEVBRHlFO2FBQUgsQ0FBeEUsQ0FGZ0M7QUFLaEMsZ0JBQUksT0FBTyxXQUFQLENBQW1CLEtBQUssVUFBTCxDQUF2QixFQUF5QztBQUN2QyxnQkFBRSxNQUFGLENBQVMsT0FBTyxXQUFQLENBQW1CLEtBQUssVUFBTCxDQUFuQixDQUFvQyxVQUFwQyxFQUFnRCxVQUFDLEtBQUQsRUFBUSxHQUFSLEVBQWU7QUFDdEUsdUJBQU8sTUFBUCxDQUFjLElBQWQsQ0FBbUIsRUFBQyxPQUFPLEdBQVAsRUFBWSxNQUFNLE1BQU0sSUFBTixFQUF0QyxFQURzRTtlQUFmLENBQXpELENBRHVDO2FBQXpDO0FBS0EsbUJBQU8sTUFBUCxDQVZnQztXQUFWLENBRjFCLENBRlM7OztlQVJBO1FBQThCIiwiZmlsZSI6ImRhdGEvc2NoZW1hL3Byb3ZpZGVycy9zd2FnZ2VyLXNjaGVtYS1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
