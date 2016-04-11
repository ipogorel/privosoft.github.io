'use strict';

System.register(['./service/data-service', 'lodash', './data-holder', '../helpers/data-helper'], function (_export, _context) {
  var DataService, _, DataHolder, DataHelper, _createClass, Datasource, DataSourceConfiguration;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_serviceDataService) {
      DataService = _serviceDataService.DataService;
    }, function (_lodash) {
      _ = _lodash;
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
          this._schemeConfig = datasourceConfiguration.schemeConfig;
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

        Datasource.prototype.getData = function getData(query) {
          var _this = this;

          var dataHolder = new DataHolder();
          dataHolder.query = query;

          if (!this.transport && !this.transport.readService) throw "readService is not configured";

          var storage = void 0;
          var cacheKey = this.transport.readService.url + query.cacheKey();
          if (this._cache && this._cache.cacheManager) {
            storage = this._cache.cacheManager.getStorage();
            var cachedDataHolder = storage.getItem(cacheKey);
            if (cachedDataHolder) {
              dataHolder.data = cachedDataHolder.data;
              dataHolder.total = cachedDataHolder.total;
              return new Promise(function (resolve, reject) {
                resolve(dataHolder);
              });
            }
          }
          return this.transport.readService.read({
            fields: query.fields,
            filter: query.serverSideFilter ? query.serverSideFilter : "",
            take: query.take,
            skip: query.skip,
            sort: query.sort,
            sortDir: query.sortDir
          }).then(function (d) {
            dataHolder.data = _.isArray(d.data) ? d.data : [d.data];
            dataHolder.total = d.total;
            if (storage) storage.setItem(cacheKey, { data: dataHolder.data, total: dataHolder.total }, _this._cache.cacheTimeSeconds);
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

      _export('DataSourceConfiguration', DataSourceConfiguration = function () {
        function DataSourceConfiguration() {
          _classCallCheck(this, DataSourceConfiguration);
        }

        _createClass(DataSourceConfiguration, [{
          key: 'cache',
          get: function get() {
            return this._cache;
          },
          set: function set(value) {
            this._cache = value;
          }
        }, {
          key: 'transport',
          get: function get() {
            return this._transport;
          },
          set: function set(value) {
            this._transport = value;
          }
        }, {
          key: 'name',
          get: function get() {
            return this._name;
          },
          set: function set(value) {
            this._name = value;
          }
        }]);

        return DataSourceConfiguration;
      }());

      _export('DataSourceConfiguration', DataSourceConfiguration);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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
