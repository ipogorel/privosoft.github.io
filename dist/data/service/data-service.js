"use strict";

System.register([], function (_export, _context) {
  var _createClass, DataService, DataServiceConfiguration;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
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

      _export("DataService", DataService = function () {
        function DataService() {
          _classCallCheck(this, DataService);
        }

        DataService.prototype.configure = function configure(configuration) {
          this.url = configuration.url;
          this.schemaProvider = configuration.schemaProvider;
          this.queryMapper = configuration.queryMapper;
          this.totalMapper = configuration.totalMapper;
          this.dataMapper = configuration.dataMapper;
        };

        DataService.prototype.getSchema = function getSchema() {
          return this.schemaProvider.getSchema();
        };

        DataService.prototype.read = function read(options) {};

        DataService.prototype.create = function create(entity) {};

        DataService.prototype.update = function update(id, entity) {};

        DataService.prototype.delete = function _delete(id) {};

        return DataService;
      }());

      _export("DataService", DataService);

      _export("DataServiceConfiguration", DataServiceConfiguration = function () {
        function DataServiceConfiguration(options) {
          _classCallCheck(this, DataServiceConfiguration);

          if (options) {
            this._url = options.url;
            this._schemaProvider = options.schemaProvider;
            this._totalMapper = options.totalMapper;
            this._queryMapper = options.queryMapper;
            this._dataMapper = options.dataMapper;
          }
        }

        _createClass(DataServiceConfiguration, [{
          key: "url",
          get: function get() {
            return this._url;
          }
        }, {
          key: "schemaProvider",
          get: function get() {
            return this._schemaProvider;
          }
        }, {
          key: "totalMapper",
          get: function get() {
            return this._totalMapper;
          }
        }, {
          key: "queryMapper",
          get: function get() {
            return this._queryMapper;
          }
        }, {
          key: "dataMapper",
          get: function get() {
            return this._dataMapper;
          }
        }]);

        return DataServiceConfiguration;
      }());

      _export("DataServiceConfiguration", DataServiceConfiguration);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvc2VydmljZS9kYXRhLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBQWE7Ozs7OzhCQUNYLCtCQUFVLGVBQWM7QUFDdEIsZUFBSyxHQUFMLEdBQVcsY0FBYyxHQUFkLENBRFc7QUFFdEIsZUFBSyxjQUFMLEdBQXNCLGNBQWMsY0FBZCxDQUZBO0FBR3RCLGVBQUssV0FBTCxHQUFtQixjQUFjLFdBQWQsQ0FIRztBQUl0QixlQUFLLFdBQUwsR0FBbUIsY0FBYyxXQUFkLENBSkc7QUFLdEIsZUFBSyxVQUFMLEdBQWtCLGNBQWMsVUFBZCxDQUxJOzs7QUFEYiw4QkFRWCxpQ0FBVztBQUNULGlCQUFPLEtBQUssY0FBTCxDQUFvQixTQUFwQixFQUFQLENBRFM7OztBQVJBLDhCQVdYLHFCQUFLLFNBQVM7O0FBWEgsOEJBWVgseUJBQU8sUUFBUTs7QUFaSiw4QkFhWCx5QkFBTyxJQUFJLFFBQVE7O0FBYlIsOEJBY1gsMEJBQU8sSUFBSTs7ZUFkQTs7Ozs7MENBaUJBO0FBRVgsaUJBRlcsd0JBRVgsQ0FBWSxPQUFaLEVBQW9CO2dDQUZULDBCQUVTOztBQUNsQixjQUFJLE9BQUosRUFBYTtBQUNYLGlCQUFLLElBQUwsR0FBWSxRQUFRLEdBQVIsQ0FERDtBQUVYLGlCQUFLLGVBQUwsR0FBdUIsUUFBUSxjQUFSLENBRlo7QUFHWCxpQkFBSyxZQUFMLEdBQW9CLFFBQVEsV0FBUixDQUhUO0FBSVgsaUJBQUssWUFBTCxHQUFvQixRQUFRLFdBQVIsQ0FKVDtBQUtYLGlCQUFLLFdBQUwsR0FBbUIsUUFBUSxVQUFSLENBTFI7V0FBYjtTQURGOztxQkFGVzs7OEJBWUQ7QUFDUixtQkFBTyxLQUFLLElBQUwsQ0FEQzs7Ozs4QkFJVTtBQUNsQixtQkFBTyxLQUFLLGVBQUwsQ0FEVzs7Ozs4QkFJSDtBQUNmLG1CQUFPLEtBQUssWUFBTCxDQURROzs7OzhCQUlBO0FBQ2YsbUJBQU8sS0FBSyxZQUFMLENBRFE7Ozs7OEJBSUQ7QUFDZCxtQkFBTyxLQUFLLFdBQUwsQ0FETzs7OztlQTVCTCIsImZpbGUiOiJkYXRhL3NlcnZpY2UvZGF0YS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
