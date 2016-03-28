'use strict';

System.register(['data/data-service', 'data/query', 'mike183/localDB', 'aurelia-framework', '../data/query-expression-evaluator'], function (_export, _context) {
  var DataService, JsonFileQuery, localDB, inject, transient, QueryExpressionEvaluator, _createClass, LocalStorageDataService;

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
    setters: [function (_dataDataService) {
      DataService = _dataDataService.DataService;
    }, function (_dataQuery) {
      JsonFileQuery = _dataQuery.JsonFileQuery;
    }, function (_mike183LocalDB) {
      localDB = _mike183LocalDB.localDB;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      transient = _aureliaFramework.transient;
    }, function (_dataQueryExpressionEvaluator) {
      QueryExpressionEvaluator = _dataQueryExpressionEvaluator.QueryExpressionEvaluator;
    }],
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

      _export('LocalStorageDataService', LocalStorageDataService = function (_DataService) {
        _inherits(LocalStorageDataService, _DataService);

        function LocalStorageDataService() {
          _classCallCheck(this, LocalStorageDataService);

          var _this = _possibleConstructorReturn(this, _DataService.call(this));

          _this._db = new localdb("periscopeDb");
          return _this;
        }

        LocalStorageDataService.prototype.read = function read(query) {
          var self = this;
          return new Promise(function (resolve, reject) {
            try {
              resolve(self._db.find(self.entityType, query));
            } catch (ex) {
              reject(ex);
            }
          });
        };

        LocalStorageDataService.prototype.create = function create(entity) {
          this._db.insert(this.entityType, entity);
        };

        LocalStorageDataService.prototype.update = function update(id, entity) {
          this._db.updateById(this.entityType, entity, id);
        };

        LocalStorageDataService.prototype.delete = function _delete(id) {
          this._db.removeById(id);
        };

        _createClass(LocalStorageDataService, [{
          key: 'entityType',
          get: function get() {
            return this._entityType;
          },
          set: function set(value) {
            this._entityType = value;
            if (!this._db.tableExists(value)) this._db.createTable(value);
          }
        }]);

        return LocalStorageDataService;
      }(DataService));

      _export('LocalStorageDataService', LocalStorageDataService);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvbG9jYWwtc3RvcmFnZS1kYXRhLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFROztBQUNBOztBQUNBOztBQUNBO0FBQVE7O0FBQ1I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5Q0FFSzs7O0FBRVgsaUJBRlcsdUJBRVgsR0FBYTtnQ0FGRix5QkFFRTs7dURBQ1gseUJBRFc7O0FBRVgsZ0JBQUssR0FBTCxHQUFXLElBQUksT0FBSixDQUFZLGFBQVosQ0FBWCxDQUZXOztTQUFiOztBQUZXLDBDQWdCWCxxQkFBSyxPQUFPO0FBQ1YsY0FBSSxPQUFPLElBQVAsQ0FETTtBQUVWLGlCQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBbUI7QUFDcEMsZ0JBQUc7QUFDRCxzQkFBUSxLQUFLLEdBQUwsQ0FBUyxJQUFULENBQWMsS0FBSyxVQUFMLEVBQWlCLEtBQS9CLENBQVIsRUFEQzthQUFILENBR0EsT0FBTyxFQUFQLEVBQVU7QUFDUixxQkFBTyxFQUFQLEVBRFE7YUFBVjtXQUppQixDQUFuQixDQUZVOzs7QUFoQkQsMENBNEJYLHlCQUFPLFFBQVE7QUFDYixlQUFLLEdBQUwsQ0FBUyxNQUFULENBQWdCLEtBQUssVUFBTCxFQUFnQixNQUFoQyxFQURhOzs7QUE1QkosMENBK0JYLHlCQUFPLElBQUksUUFBTztBQUNoQixlQUFLLEdBQUwsQ0FBUyxVQUFULENBQW9CLEtBQUssVUFBTCxFQUFpQixNQUFyQyxFQUE2QyxFQUE3QyxFQURnQjs7O0FBL0JQLDBDQW1DWCwwQkFBTyxJQUFHO0FBQ1IsZUFBSyxHQUFMLENBQVMsVUFBVCxDQUFvQixFQUFwQixFQURROzs7cUJBbkNDOzs4QkFPTTtBQUNmLG1CQUFPLEtBQUssV0FBTCxDQURROzs0QkFHRixPQUFPO0FBQ3BCLGlCQUFLLFdBQUwsR0FBbUIsS0FBbkIsQ0FEb0I7QUFFcEIsZ0JBQUksQ0FBQyxLQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFCLEtBQXJCLENBQUQsRUFDRixLQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFCLEtBQXJCLEVBREY7Ozs7ZUFaUztRQUFnQyIsImZpbGUiOiJkYXRhL2xvY2FsLXN0b3JhZ2UtZGF0YS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
