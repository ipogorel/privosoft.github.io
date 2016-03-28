'use strict';

System.register(['./data-service', './data-holder', '../helpers/data-helper'], function (_export, _context) {
  var DataService, DataHolder, DataHelper, _createClass, Datasource;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_dataService) {
      DataService = _dataService.DataService;
    }, function (_dataHolder) {
      DataHolder = _dataHolder.DataHolder;
    }, function (_helpersDataHelper) {
      DataHelper = _helpersDataHelper.DataHelper;
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

      _export('Datasource', Datasource = function () {
        function Datasource(datasourceConfiguration) {
          _classCallCheck(this, Datasource);

          this._name = datasourceConfiguration.name;
          this._transport = datasourceConfiguration.transport;
          this._cache = datasourceConfiguration.cache;
        }

        Datasource.prototype.createDataHolder = function createDataHolder() {
          return new DataHolder(this);
        };

        Datasource.prototype.cacheOn = function cacheOn(cacheKey) {
          if (this._cache && this._cache.cacheManager) {
            var storage = this._cache.cacheManager.getStorage();
            return storage.getItem(cacheKey);
          }
        };

        Datasource.prototype.fill = function fill(dataHolder) {
          var _this = this;

          if (!this.transport && !this.transport.readService) throw "readService is not configured";
          var storage;
          if (this._cache && this._cache.cacheManager) {
            storage = this._cache.cacheManager.getStorage();
            var cachedDataHolder = storage.getItem(dataHolder.cacheKey());
            if (cachedDataHolder) {
              dataHolder.data = cachedDataHolder.data;
              dataHolder.total = cachedDataHolder.total;
              return new Promise(function (resolve, reject) {
                resolve(dataHolder);
              });
            }
          }
          return this.transport.readService.read({
            fields: dataHolder.fields,
            filter: dataHolder.query.serverSideFilter,
            take: dataHolder.take,
            skip: dataHolder.skip,
            sort: dataHolder.sort,
            sortDir: dataHolder.sortDir
          }).then(function (d) {
            dataHolder.data = d.data;
            dataHolder.total = d.total;
            if (storage) storage.setItem(dataHolder.cacheKey(), { data: dataHolder.data, total: dataHolder.total }, _this._cache.cacheTimeSeconds);
            return dataHolder;
          });
        };

        Datasource.prototype.create = function create(entity) {
          if (!this.transport && !this.transport.createService) throw "createService is not configured";
          return this.transport.createService.create(entity);
        };

        Datasource.prototype.update = function update(id, entity) {
          if (!this.transport && !this.transport.updateService) throw "updateService is not configured";
          return this.transport.updateService.update(id, entity);
        };

        Datasource.prototype.delete = function _delete(id, entity) {
          if (!this.transport && !this.transport.deleteService) throw "deleteService is not configured";
          return this.transport.updateService.delete(entity);
        };

        _createClass(Datasource, [{
          key: 'name',
          get: function get() {
            return this._name;
          }
        }, {
          key: 'transport',
          get: function get() {
            return this._transport;
          }
        }, {
          key: 'cacheManager',
          get: function get() {
            return this._cacheManager;
          }
        }]);

        return Datasource;
      }());

      _export('Datasource', Datasource);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvZGF0YS1zb3VyY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFROztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBRUs7QUFFVCxpQkFGUyxVQUVULENBQVksdUJBQVosRUFBcUM7Z0NBRjVCLFlBRTRCOztBQUNqQyxlQUFLLEtBQUwsR0FBYSx3QkFBd0IsSUFBeEIsQ0FEb0I7QUFFakMsZUFBSyxVQUFMLEdBQWtCLHdCQUF3QixTQUF4QixDQUZlO0FBR2pDLGVBQUssTUFBTCxHQUFjLHdCQUF3QixLQUF4QixDQUhtQjtTQUFyQzs7QUFGUyw2QkFvQlQsK0NBQWtCO0FBQ2hCLGlCQUFPLElBQUksVUFBSixDQUFlLElBQWYsQ0FBUCxDQURnQjs7O0FBcEJULDZCQXdCVCwyQkFBUSxVQUFTO0FBQ2YsY0FBSSxLQUFLLE1BQUwsSUFBYSxLQUFLLE1BQUwsQ0FBWSxZQUFaLEVBQTBCO0FBQ3pDLGdCQUFJLFVBQVUsS0FBSyxNQUFMLENBQVksWUFBWixDQUF5QixVQUF6QixFQUFWLENBRHFDO0FBRXpDLG1CQUFPLFFBQVEsT0FBUixDQUFnQixRQUFoQixDQUFQLENBRnlDO1dBQTNDOzs7QUF6Qk8sNkJBK0JULHFCQUFLLFlBQVk7OztBQUNmLGNBQUksQ0FBRSxLQUFLLFNBQUwsSUFBa0IsQ0FBQyxLQUFLLFNBQUwsQ0FBZSxXQUFmLEVBQ3ZCLE1BQU0sK0JBQU4sQ0FERjtBQUVBLGNBQUksT0FBSixDQUhlO0FBSWYsY0FBSSxLQUFLLE1BQUwsSUFBYSxLQUFLLE1BQUwsQ0FBWSxZQUFaLEVBQXlCO0FBQ3hDLHNCQUFVLEtBQUssTUFBTCxDQUFZLFlBQVosQ0FBeUIsVUFBekIsRUFBVixDQUR3QztBQUV4QyxnQkFBSSxtQkFBbUIsUUFBUSxPQUFSLENBQWdCLFdBQVcsUUFBWCxFQUFoQixDQUFuQixDQUZvQztBQUd4QyxnQkFBSSxnQkFBSixFQUFzQjtBQUNwQix5QkFBVyxJQUFYLEdBQWtCLGlCQUFpQixJQUFqQixDQURFO0FBRXBCLHlCQUFXLEtBQVgsR0FBbUIsaUJBQWlCLEtBQWpCLENBRkM7QUFHcEIscUJBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFvQjtBQUNyQyx3QkFBUSxVQUFSLEVBRHFDO2VBQXBCLENBQW5CLENBSG9CO2FBQXRCO1dBSEY7QUFXQSxpQkFBTyxLQUFLLFNBQUwsQ0FBZSxXQUFmLENBQTJCLElBQTNCLENBQ0g7QUFDRSxvQkFBUSxXQUFXLE1BQVg7QUFDUixvQkFBUSxXQUFXLEtBQVgsQ0FBaUIsZ0JBQWpCO0FBQ1Isa0JBQU0sV0FBVyxJQUFYO0FBQ04sa0JBQU0sV0FBVyxJQUFYO0FBQ04sa0JBQU0sV0FBVyxJQUFYO0FBQ04scUJBQVMsV0FBVyxPQUFYO1dBUFIsRUFTRixJQVRFLENBU0csYUFBSztBQUNULHVCQUFXLElBQVgsR0FBa0IsRUFBRSxJQUFGLENBRFQ7QUFFVCx1QkFBVyxLQUFYLEdBQW1CLEVBQUUsS0FBRixDQUZWO0FBR1QsZ0JBQUksT0FBSixFQUNFLFFBQVEsT0FBUixDQUFnQixXQUFXLFFBQVgsRUFBaEIsRUFBdUMsRUFBQyxNQUFLLFdBQVcsSUFBWCxFQUFpQixPQUFNLFdBQVcsS0FBWCxFQUFwRSxFQUF1RixNQUFLLE1BQUwsQ0FBWSxnQkFBWixDQUF2RixDQURGO0FBRUEsbUJBQU8sVUFBUCxDQUxTO1dBQUwsQ0FUVixDQWZlOzs7QUEvQlIsNkJBZ0VULHlCQUFPLFFBQU87QUFDWixjQUFJLENBQUUsS0FBSyxTQUFMLElBQWtCLENBQUMsS0FBSyxTQUFMLENBQWUsYUFBZixFQUN2QixNQUFNLGlDQUFOLENBREY7QUFFQSxpQkFBTyxLQUFLLFNBQUwsQ0FBZSxhQUFmLENBQTZCLE1BQTdCLENBQW9DLE1BQXBDLENBQVAsQ0FIWTs7O0FBaEVMLDZCQXNFVCx5QkFBTyxJQUFJLFFBQU87QUFDaEIsY0FBSSxDQUFFLEtBQUssU0FBTCxJQUFrQixDQUFDLEtBQUssU0FBTCxDQUFlLGFBQWYsRUFDdkIsTUFBTSxpQ0FBTixDQURGO0FBRUEsaUJBQU8sS0FBSyxTQUFMLENBQWUsYUFBZixDQUE2QixNQUE3QixDQUFvQyxFQUFwQyxFQUF3QyxNQUF4QyxDQUFQLENBSGdCOzs7QUF0RVQsNkJBNEVULDBCQUFPLElBQUksUUFBTztBQUNoQixjQUFJLENBQUUsS0FBSyxTQUFMLElBQWtCLENBQUMsS0FBSyxTQUFMLENBQWUsYUFBZixFQUN2QixNQUFNLGlDQUFOLENBREY7QUFFQSxpQkFBTyxLQUFLLFNBQUwsQ0FBZSxhQUFmLENBQTZCLE1BQTdCLENBQW9DLE1BQXBDLENBQVAsQ0FIZ0I7OztxQkE1RVQ7OzhCQVFFO0FBQ1AsbUJBQU8sS0FBSyxLQUFMLENBREE7Ozs7OEJBSUk7QUFDYixtQkFBTyxLQUFLLFVBQUwsQ0FETTs7Ozs4QkFJRztBQUNoQixtQkFBTyxLQUFLLGFBQUwsQ0FEUzs7OztlQWhCVCIsImZpbGUiOiJkYXRhL2RhdGEtc291cmNlLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
