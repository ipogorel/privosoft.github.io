'use strict';

System.register(['aurelia-framework', './data-source', './data-service', './json-data-service', './static-json-data-service', '../cache/cache-manager', '../cache/memory-cache-storage', '../infrastructure/factory'], function (_export, _context) {
  var Container, inject, Datasource, DataServiceConfiguration, JsonDataService, StaticJsonDataService, CacheManager, MemoryCacheStorage, Factory, _dec, _class, Repository;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      Container = _aureliaFramework.Container;
      inject = _aureliaFramework.inject;
    }, function (_dataSource) {
      Datasource = _dataSource.Datasource;
    }, function (_dataService) {
      DataServiceConfiguration = _dataService.DataServiceConfiguration;
    }, function (_jsonDataService) {
      JsonDataService = _jsonDataService.JsonDataService;
    }, function (_staticJsonDataService) {
      StaticJsonDataService = _staticJsonDataService.StaticJsonDataService;
    }, function (_cacheCacheManager) {
      CacheManager = _cacheCacheManager.CacheManager;
    }, function (_cacheMemoryCacheStorage) {
      MemoryCacheStorage = _cacheMemoryCacheStorage.MemoryCacheStorage;
    }, function (_infrastructureFactory) {
      Factory = _infrastructureFactory.Factory;
    }],
    execute: function () {
      _export('Repository', Repository = (_dec = inject(Factory.of(StaticJsonDataService), Factory.of(CacheManager), MemoryCacheStorage), _dec(_class = function () {
        function Repository(dataServiceFactory, cacheManagerFactory, memoryCacheStorage) {
          _classCallCheck(this, Repository);

          this._dataServiceFactory = dataServiceFactory;
          this._cacheManagerFactory = cacheManagerFactory;
          this._memoryCacheStorage = memoryCacheStorage;
        }

        Repository.prototype.getDatasource = function getDatasource(name) {
          switch (name.toLowerCase()) {
            case 'customers':
              var config = new DataServiceConfiguration({
                url: '/data/customers.json',
                schema: {
                  fields: [{
                    field: "Id",
                    type: "string"
                  }, {
                    field: "CompanyName",
                    type: "string"
                  }, {
                    field: "ContactName",
                    type: "string"
                  }, {
                    field: "ContactTitle",
                    type: "string"
                  }, {
                    field: "Address",
                    type: "string"
                  }, {
                    field: "City",
                    type: "string"
                  }, {
                    field: "Country",
                    type: "string"
                  }, {
                    field: "PostalCode",
                    type: "string"
                  }, {
                    field: "Phone",
                    type: "string"
                  }, {
                    field: "Fax",
                    type: "string"
                  }]
                },
                dataMapper: function dataMapper(data) {
                  return data.Results;
                },
                totalMapper: function totalMapper(data) {
                  return data.Results.length;
                }
              });
              var jsonDataService = this._dataServiceFactory(config);
              var cacheManager = this._cacheManagerFactory(this._memoryCacheStorage);
              cacheManager.startCleaner();

              return new Datasource({
                name: name,
                cache: {
                  cacheTimeSeconds: 120,
                  cacheManager: cacheManager
                },
                transport: {
                  readService: jsonDataService
                }
              });
            case 'orders':
              var config = new DataServiceConfiguration({
                url: '/data/orders.json',
                schema: {
                  fields: [{
                    field: "Id",
                    type: "string"
                  }, {
                    field: "CustomerId",
                    type: "string"
                  }, {
                    field: "EmployeeId",
                    type: "string"
                  }, {
                    field: "OrderDate",
                    type: "date"
                  }, {
                    field: "RequiredDate",
                    type: "date"
                  }, {
                    field: "ShippedDate",
                    type: "date"
                  }, {
                    field: "ShipVia",
                    type: "number"
                  }, {
                    field: "Freight",
                    type: "number"
                  }, {
                    field: "ShipName",
                    type: "string"
                  }, {
                    field: "ShipAddress",
                    type: "string"
                  }, {
                    field: "ShipCity",
                    type: "string"
                  }, {
                    field: "ShipPostalCode",
                    type: "string"
                  }, {
                    field: "ShipCountry",
                    type: "string"
                  }]
                },
                dataMapper: function dataMapper(data) {
                  return data.Results;
                },
                totalMapper: function totalMapper(data) {
                  return data.Results.length;
                }
              });

              var jsonDataService = this._dataServiceFactory(config);
              var cacheManager = this._cacheManagerFactory(this._memoryCacheStorage);
              cacheManager.startCleaner();

              return new Datasource({
                name: name,
                cache: {
                  cacheTimeSeconds: 120,
                  cacheManager: cacheManager
                },
                transport: {
                  readService: jsonDataService
                }
              });
          }
        };

        return Repository;
      }()) || _class));

      _export('Repository', Repository);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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
