'use strict';

System.register(['aurelia-framework', 'aurelia-event-aggregator', './../navigator/dashboardbehavior/manage-navigation-stack-behavior', './../navigator/widgetbehavior/data-field-selected-behavior', './../navigator/widgetbehavior/data-selected-behavior', './../navigator/widgetbehavior/data-activated-behavior', './../navigator/widgetbehavior/data-filter-changed-behavior', './../navigator/widgetbehavior/data-filter-handle-behavior', './../navigator/widgetbehavior/settings-handle-behavior', './../navigator/dashboardbehavior/create-widget-behavior', './../navigator/dashboardbehavior/replace-widget-behavior', './../navigator/dashboardbehavior/change-route-behavior', './../navigator/widgetbehavior/data-source-changed-behavior', './../navigator/widgetbehavior/data-source-handle-behavior', './../cache/cache-manager', './../cache/memory-cache-storage', './../infrastructure/factory', './../data/service/static-json-data-service', './../data/service/json-data-service', './../data/data-source', './../data/schema/providers/static-schema-provider', './../infrastructure/widget-factory', './../state/user-state-storage', './../state/state-url-parser', './../infrastructure/dashboard-manager', './../navigator/periscope-router', './../layout/widgets/grid', './../layout/widgets/chart', './../layout/widgets/search-box', './../layout/widgets/detailed-view', './../layout/widgets/data-source-configurator', './dashboard-configuration'], function (_export, _context) {
  var inject, EventAggregator, ManageNavigationStackBehavior, DataFieldSelectedBehavior, DataSelectedBehavior, DataActivatedBehavior, DataFilterChangedBehavior, DataFilterHandleBehavior, SettingsHandleBehavior, CreateWidgetBehavior, ReplaceWidgetBehavior, ChangeRouteBehavior, DataSourceChangedBehavior, DataSourceHandleBehavior, CacheManager, MemoryCacheStorage, Factory, StaticJsonDataService, JsonDataService, Datasource, StaticSchemaProvider, WidgetFactory, UserStateStorage, StateUrlParser, DashboardManager, PeriscopeRouter, Grid, Chart, SearchBox, DetailedView, DataSourceConfigurator, DashboardConfiguration, _dec, _class, DefaultDashboardConfiguration;

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
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_navigatorDashboardbehaviorManageNavigationStackBehavior) {
      ManageNavigationStackBehavior = _navigatorDashboardbehaviorManageNavigationStackBehavior.ManageNavigationStackBehavior;
    }, function (_navigatorWidgetbehaviorDataFieldSelectedBehavior) {
      DataFieldSelectedBehavior = _navigatorWidgetbehaviorDataFieldSelectedBehavior.DataFieldSelectedBehavior;
    }, function (_navigatorWidgetbehaviorDataSelectedBehavior) {
      DataSelectedBehavior = _navigatorWidgetbehaviorDataSelectedBehavior.DataSelectedBehavior;
    }, function (_navigatorWidgetbehaviorDataActivatedBehavior) {
      DataActivatedBehavior = _navigatorWidgetbehaviorDataActivatedBehavior.DataActivatedBehavior;
    }, function (_navigatorWidgetbehaviorDataFilterChangedBehavior) {
      DataFilterChangedBehavior = _navigatorWidgetbehaviorDataFilterChangedBehavior.DataFilterChangedBehavior;
    }, function (_navigatorWidgetbehaviorDataFilterHandleBehavior) {
      DataFilterHandleBehavior = _navigatorWidgetbehaviorDataFilterHandleBehavior.DataFilterHandleBehavior;
    }, function (_navigatorWidgetbehaviorSettingsHandleBehavior) {
      SettingsHandleBehavior = _navigatorWidgetbehaviorSettingsHandleBehavior.SettingsHandleBehavior;
    }, function (_navigatorDashboardbehaviorCreateWidgetBehavior) {
      CreateWidgetBehavior = _navigatorDashboardbehaviorCreateWidgetBehavior.CreateWidgetBehavior;
    }, function (_navigatorDashboardbehaviorReplaceWidgetBehavior) {
      ReplaceWidgetBehavior = _navigatorDashboardbehaviorReplaceWidgetBehavior.ReplaceWidgetBehavior;
    }, function (_navigatorDashboardbehaviorChangeRouteBehavior) {
      ChangeRouteBehavior = _navigatorDashboardbehaviorChangeRouteBehavior.ChangeRouteBehavior;
    }, function (_navigatorWidgetbehaviorDataSourceChangedBehavior) {
      DataSourceChangedBehavior = _navigatorWidgetbehaviorDataSourceChangedBehavior.DataSourceChangedBehavior;
    }, function (_navigatorWidgetbehaviorDataSourceHandleBehavior) {
      DataSourceHandleBehavior = _navigatorWidgetbehaviorDataSourceHandleBehavior.DataSourceHandleBehavior;
    }, function (_cacheCacheManager) {
      CacheManager = _cacheCacheManager.CacheManager;
    }, function (_cacheMemoryCacheStorage) {
      MemoryCacheStorage = _cacheMemoryCacheStorage.MemoryCacheStorage;
    }, function (_infrastructureFactory) {
      Factory = _infrastructureFactory.Factory;
    }, function (_dataServiceStaticJsonDataService) {
      StaticJsonDataService = _dataServiceStaticJsonDataService.StaticJsonDataService;
    }, function (_dataServiceJsonDataService) {
      JsonDataService = _dataServiceJsonDataService.JsonDataService;
    }, function (_dataDataSource) {
      Datasource = _dataDataSource.Datasource;
    }, function (_dataSchemaProvidersStaticSchemaProvider) {
      StaticSchemaProvider = _dataSchemaProvidersStaticSchemaProvider.StaticSchemaProvider;
    }, function (_infrastructureWidgetFactory) {
      WidgetFactory = _infrastructureWidgetFactory.WidgetFactory;
    }, function (_stateUserStateStorage) {
      UserStateStorage = _stateUserStateStorage.UserStateStorage;
    }, function (_stateStateUrlParser) {
      StateUrlParser = _stateStateUrlParser.StateUrlParser;
    }, function (_infrastructureDashboardManager) {
      DashboardManager = _infrastructureDashboardManager.DashboardManager;
    }, function (_navigatorPeriscopeRouter) {
      PeriscopeRouter = _navigatorPeriscopeRouter.PeriscopeRouter;
    }, function (_layoutWidgetsGrid) {
      Grid = _layoutWidgetsGrid.Grid;
    }, function (_layoutWidgetsChart) {
      Chart = _layoutWidgetsChart.Chart;
    }, function (_layoutWidgetsSearchBox) {
      SearchBox = _layoutWidgetsSearchBox.SearchBox;
    }, function (_layoutWidgetsDetailedView) {
      DetailedView = _layoutWidgetsDetailedView.DetailedView;
    }, function (_layoutWidgetsDataSourceConfigurator) {
      DataSourceConfigurator = _layoutWidgetsDataSourceConfigurator.DataSourceConfigurator;
    }, function (_dashboardConfiguration) {
      DashboardConfiguration = _dashboardConfiguration.DashboardConfiguration;
    }],
    execute: function () {
      _export('DefaultDashboardConfiguration', DefaultDashboardConfiguration = (_dec = inject(EventAggregator, WidgetFactory, UserStateStorage, DashboardManager, PeriscopeRouter, Factory.of(StaticJsonDataService), Factory.of(JsonDataService), Factory.of(CacheManager)), _dec(_class = function (_DashboardConfigurati) {
        _inherits(DefaultDashboardConfiguration, _DashboardConfigurati);

        function DefaultDashboardConfiguration(eventAggregator, widgetFactory, userStateStorage, dashboardManager, periscopeRouter, dataServiceFactory, swaggerServiceFactory, cacheManagerFactory) {
          _classCallCheck(this, DefaultDashboardConfiguration);

          var _this = _possibleConstructorReturn(this, _DashboardConfigurati.call(this));

          _this._eventAggregator = eventAggregator;
          _this._periscopeRouter = periscopeRouter;
          _this._dashboardManager = dashboardManager;
          _this._stateStorage = userStateStorage;
          _this._widgetFactory = widgetFactory;
          _this._dataServiceFactory = dataServiceFactory;
          _this._swaggerServiceFactory = swaggerServiceFactory;
          _this._cacheManager = cacheManagerFactory(new MemoryCacheStorage());
          return _this;
        }

        DefaultDashboardConfiguration.prototype.invoke = function invoke() {
          var customersDataService = this._dataServiceFactory();
          customersDataService.configure({
            url: '/data/customers.json',
            schemaProvider: new StaticSchemaProvider({
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
            }),
            dataMapper: function dataMapper(data) {
              return data.Results;
            }
          });
          var dsCustomers = new Datasource({
            name: "customers",
            cache: {
              cacheTimeSeconds: 120,
              cacheManager: this._cacheManager
            },
            transport: {
              readService: customersDataService
            }
          });

          var searchBox = this._widgetFactory.createWidget(SearchBox, {
            name: "positionsSearchWidget",
            header: "Positions",
            showHeader: false,
            dataSource: dsCustomers,
            dataFilter: "",
            stateStorage: this._stateStorage,
            behavior: [new DataFilterChangedBehavior("searchBoxChannel", this._eventAggregator)]
          });

          var customersGrid = this._widgetFactory.createWidget(Grid, {
            name: "gridWidget",
            header: "Customers",
            showHeader: true,
            minHeight: 450,
            pageSize: 40,
            stateStorage: this._stateStorage,
            navigatable: true,
            behavior: [new DataFilterHandleBehavior("searchBoxChannel", this._eventAggregator), new DataSelectedBehavior("gridSelectionChannel", this._eventAggregator), new DataActivatedBehavior("gridCommandChannel", this._eventAggregator), new DataFieldSelectedBehavior("gridFieldSelectionChannel", this._eventAggregator)],
            dataSource: dsCustomers,
            dataFilter: "",
            columns: [{
              field: "Id",
              title: "#"
            }, {
              field: "ContactName",
              title: "Contact Name"
            }, {
              field: "ContactTitle",
              title: "Contact Title",
              selectable: true
            }, {
              field: "Country",
              selectable: true
            }, {
              field: "City"
            }],
            group: {
              field: "Country",
              dir: "asc"
            }
          });

          var chart = this._widgetFactory.createWidget(Chart, {
            name: "chartWidget",
            header: "Country",
            dataSource: dsCustomers,
            showHeader: true,
            dataFilter: "",
            behavior: [new DataFilterHandleBehavior("searchBoxChannel", this._eventAggregator), new SettingsHandleBehavior("gridFieldSelectionChannel", this._eventAggregator, function (message) {
              return {
                header: message.fieldName,
                categoriesField: message.fieldName
              };
            })],
            seriesDefaults: {
              type: "bar",
              labels: {
                visible: true,
                background: "transparent"
              }
            },
            categoriesField: "Country",
            minHeight: 450
          });

          var changeRoureBefavior = new ChangeRouteBehavior({
            chanel: "gridCommandChannel",
            newRoute: {
              title: 'Orders',
              route: '/orders',
              dashboardName: 'orders'
            },
            paramsMapper: function paramsMapper(filterEvent) {
              return StateUrlParser.stateToQuery([{
                key: "orders:ordersSearchWidget",
                value: {
                  stateType: "searchBoxState",
                  stateObject: "CustomerId = '" + filterEvent.activatedData.get("Id").toString() + "'"
                }
              }]);
            },
            eventAggregator: this._eventAggregator,
            router: this._periscopeRouter
          });

          var createWidgetBehavior = new CreateWidgetBehavior('gridSelectionChannel', DetailedView, {
            name: "detailsWidgetCustomers",
            header: "Customer details",
            behavior: [],
            dataSource: dsCustomers,
            showHeader: true
          }, { size_x: 3, size_y: "*", col: 6, row: 2 }, this._eventAggregator, this._widgetFactory, function (message) {
            return "record.Id=='" + message.selectedData.get("Id").toString() + "'";
          });

          var dbCustomers = this._dashboardManager.createDashboard("customers", {
            title: "Customers",
            route: "/customers"
          });
          dbCustomers.addWidget(searchBox, { size_x: 12, size_y: 1, col: 1, row: 1 });
          dbCustomers.addWidget(customersGrid, { size_x: 6, size_y: "*", col: 1, row: 2 });
          dbCustomers.addWidget(chart, { size_x: "*", size_y: "*", col: 7, row: 2 });

          changeRoureBefavior.attach(dbCustomers);
          createWidgetBehavior.attach(dbCustomers);

          var ordersDataService = this._dataServiceFactory();
          ordersDataService.configure({
            url: '/data/orders.json',
            schemaProvider: new StaticSchemaProvider({
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
            }),
            dataMapper: function dataMapper(data) {
              return data.Results;
            }
          });

          var dsOrders = new Datasource({
            name: "orders",
            cache: {
              cacheTimeSeconds: 120,
              cacheManager: this._cacheManager
            },
            transport: {
              readService: ordersDataService
            }
          });

          var ordersGrid = this._widgetFactory.createWidget(Grid, {
            name: "gridWidgetOrders",
            header: "Orders",
            stateStorage: this._stateStorage,
            minHeight: 450,
            pageSize: 40,
            behavior: [new DataFilterHandleBehavior("ordersSearchChannel", this._eventAggregator), new DataActivatedBehavior("order-details", this._eventAggregator)],
            dataSource: dsOrders,
            showHeader: true,
            dataFilter: "",
            columns: [{
              field: "Id",
              title: "#"
            }, {
              field: "CustomerId",
              title: "Customer"
            }, {
              field: "OrderDate",
              title: "Order Date",
              format: "{0: MMM.dd yyyy}"
            }, {
              field: "Freight"
            }, {
              field: "ShipName",
              title: "Ship Name"
            }, {
              field: "ShipCountry",
              title: "Ship Country"
            }]
          });

          var searchBox = this._widgetFactory.createWidget(SearchBox, {
            name: "ordersSearchWidget",
            header: "Orders",
            showHeader: false,
            dataSource: dsOrders,
            dataFilter: "",
            stateStorage: this._stateStorage,
            behavior: [new DataFilterChangedBehavior("ordersSearchChannel", this._eventAggregator)]
          });

          var dbOrders = this._dashboardManager.createDashboard("orders", {
            title: "Orders",
            route: "/orders"
          });
          dbOrders.addWidget(searchBox, { size_x: 12, size_y: 1, col: 1, row: 1 });
          dbOrders.addWidget(ordersGrid, { size_x: 12, size_y: '*', col: 1, row: 2 });
          var replaceWidgetBehavior = new ReplaceWidgetBehavior('order-details', this._eventAggregator, this._widgetFactory, "gridWidgetOrders", DetailedView, {
            name: "detailsWidgetOrder",
            header: "Order Details",
            behavior: [],
            dataSource: dsOrders,
            showHeader: true
          }, function (message) {
            return "record.Id=='" + message.activatedData.get("Id").toString() + "'";
          });
          var manageNavigationStackBehavior = new ManageNavigationStackBehavior(this._eventAggregator);
          replaceWidgetBehavior.attach(dbOrders);
          manageNavigationStackBehavior.attach(dbOrders);

          var swaggerDataService = this._swaggerServiceFactory();
          var dsSwagger = new Datasource({
            name: "datasource",
            cache: {
              cacheTimeSeconds: 120,
              cacheManager: this._cacheManager
            },
            transport: {
              readService: swaggerDataService
            }
          });

          var swGrid = this._widgetFactory.createWidget(Grid, {
            name: "swaggerGridWidget",
            header: "Swagger Data",
            showHeader: true,
            minHeight: 450,
            pageSize: 40,
            stateStorage: this._stateStorage,
            navigatable: true,
            autoGenerateColumns: true,
            behavior: [new DataSourceHandleBehavior("dataSourceConfigChannel", this._eventAggregator)],
            dataFilter: ""
          });

          var swgConfiguratorWidget = this._widgetFactory.createWidget(DataSourceConfigurator, {
            name: "dsConfiguratorWidget",
            header: "Swagger Configuration",
            showHeader: true,
            minHeight: 450,
            stateStorage: this._stateStorage,
            definitionsUrl: "http://petstore.swagger.io/v2/swagger.json",
            dataSourceToConfigurate: dsSwagger,
            behavior: [new DataSourceChangedBehavior("dataSourceConfigChannel", this._eventAggregator)]
          });

          var dbSwagger = this._dashboardManager.createDashboard("swagger-api", {
            title: "Swagger",
            route: "/swagger-api"
          });
          dbSwagger.addWidget(swgConfiguratorWidget, { size_x: 4, size_y: "*", col: 1, row: 1 });
          dbSwagger.addWidget(swGrid, { size_x: 8, size_y: "*", col: 5, row: 1 });
        };

        return DefaultDashboardConfiguration;
      }(DashboardConfiguration)) || _class));

      _export('DefaultDashboardConfiguration', DefaultDashboardConfiguration);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZy9kZWZhdWx0LWRhc2hib2FyZC1jb25maWd1cmF0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBUTs7QUFDQTs7QUFHQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7OytDQUdLLHdDQURaLE9BQU8sZUFBUCxFQUF3QixhQUF4QixFQUF1QyxnQkFBdkMsRUFBeUQsZ0JBQXpELEVBQTJFLGVBQTNFLEVBQTRGLFFBQVEsRUFBUixDQUFXLHFCQUFYLENBQTVGLEVBQStILFFBQVEsRUFBUixDQUFXLGVBQVgsQ0FBL0gsRUFBNEosUUFBUSxFQUFSLENBQVcsWUFBWCxDQUE1SjtrQkFDWTs7QUFDWCxpQkFEVyw2QkFDWCxDQUFZLGVBQVosRUFBNkIsYUFBN0IsRUFBNEMsZ0JBQTVDLEVBQThELGdCQUE5RCxFQUFnRixlQUFoRixFQUFpRyxrQkFBakcsRUFBcUgscUJBQXJILEVBQTRJLG1CQUE1SSxFQUFnSztnQ0FEckosK0JBQ3FKOzt1REFDOUosa0NBRDhKOztBQUU5SixnQkFBSyxnQkFBTCxHQUF3QixlQUF4QixDQUY4SjtBQUc5SixnQkFBSyxnQkFBTCxHQUF3QixlQUF4QixDQUg4SjtBQUk5SixnQkFBSyxpQkFBTCxHQUF5QixnQkFBekIsQ0FKOEo7QUFLOUosZ0JBQUssYUFBTCxHQUFxQixnQkFBckIsQ0FMOEo7QUFNOUosZ0JBQUssY0FBTCxHQUFzQixhQUF0QixDQU44SjtBQU85SixnQkFBSyxtQkFBTCxHQUEyQixrQkFBM0IsQ0FQOEo7QUFROUosZ0JBQUssc0JBQUwsR0FBOEIscUJBQTlCLENB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
