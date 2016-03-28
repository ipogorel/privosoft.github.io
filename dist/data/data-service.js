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
            this._schema = options.schema ? options.schema : { fields: [] };
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
          key: "schema",
          get: function get() {
            return this._schema;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvZGF0YS1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzZCQUFhOzs7Ozs4QkFFWCxxQkFBSyxTQUFTOztBQUZILDhCQUdYLHlCQUFPLFFBQVE7O0FBSEosOEJBSVgseUJBQU8sSUFBSSxRQUFROztBQUpSLDhCQUtYLDBCQUFPLElBQUk7O2VBTEE7Ozs7OzBDQVFBO0FBRVgsaUJBRlcsd0JBRVgsQ0FBWSxPQUFaLEVBQW9CO2dDQUZULDBCQUVTOztBQUNsQixjQUFJLE9BQUosRUFBYTtBQUNYLGlCQUFLLElBQUwsR0FBWSxRQUFRLEdBQVIsQ0FERDtBQUVYLGlCQUFLLE9BQUwsR0FBZSxRQUFRLE1BQVIsR0FBZ0IsUUFBUSxNQUFSLEdBQWlCLEVBQUUsUUFBTyxFQUFQLEVBQW5DLENBRko7QUFHWCxpQkFBSyxZQUFMLEdBQW9CLFFBQVEsV0FBUixDQUhUO0FBSVgsaUJBQUssWUFBTCxHQUFvQixRQUFRLFdBQVIsQ0FKVDtBQUtYLGlCQUFLLFdBQUwsR0FBbUIsUUFBUSxVQUFSLENBTFI7V0FBYjtTQURGOztxQkFGVzs7OEJBWUQ7QUFDUixtQkFBTyxLQUFLLElBQUwsQ0FEQzs7Ozs4QkFJRztBQUNYLG1CQUFPLEtBQUssT0FBTCxDQURJOzs7OzhCQUlJO0FBQ2YsbUJBQU8sS0FBSyxZQUFMLENBRFE7Ozs7OEJBSUE7QUFDZixtQkFBTyxLQUFLLFlBQUwsQ0FEUTs7Ozs4QkFJRDtBQUNkLG1CQUFPLEtBQUssV0FBTCxDQURPOzs7O2VBNUJMIiwiZmlsZSI6ImRhdGEvZGF0YS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
