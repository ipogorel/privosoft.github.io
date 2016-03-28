'use strict';

System.register(['aurelia-framework', 'aurelia-router', 'aurelia-event-aggregator', 'layout/widgets/grid', 'layout/widgets/chart', 'layout/widgets/search-box', 'layout/widgets/detailed-view', 'data/repository', 'navigator/dashboardbehavior/manage-navigation-stack-behavior', 'navigator/widgetbehavior/data-field-selected-behavior', 'navigator/widgetbehavior/data-selected-behavior', 'navigator/widgetbehavior/data-activated-behavior', 'navigator/widgetbehavior/data-filter-changed-behavior', 'navigator/widgetbehavior/data-filter-handle-behavior', 'navigator/widgetbehavior/settings-handle-behavior', 'navigator/dashboardbehavior/create-widget-behavior', 'navigator/dashboardbehavior/replace-widget-behavior', 'navigator/dashboardbehavior/change-route-behavior', 'layout/infrastructure/widget-factory', 'layout/gridster-dashboard', 'layout/bootstrap-dashboard', 'navigator/periscope-router', 'navigator/navigation-history', 'state/user-state-storage', 'state/state-url-parser', 'helpers/string-helper'], function (_export, _context) {
  var inject, bindable, Router, EventAggregator, Grid, Chart, SearchBox, DetailedView, Repository, ManageNavigationStackBehavior, DataFieldSelectedBehavior, DataSelectedBehavior, DataActivatedBehavior, DataFilterChangedBehavior, DataFilterHandleBehavior, SettingsHandleBehavior, CreateWidgetBehavior, ReplaceWidgetBehavior, ChangeRouteBehavior, WidgetFactory, GridsterDashboard, BootstrapDashboard, PeriscopeRouter, NavigationHistory, UserStateStorage, StateUrlParser, StringHelper, _dec, _class, DashboardFactory;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
    }, function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_layoutWidgetsGrid) {
      Grid = _layoutWidgetsGrid.Grid;
    }, function (_layoutWidgetsChart) {
      Chart = _layoutWidgetsChart.Chart;
    }, function (_layoutWidgetsSearchBox) {
      SearchBox = _layoutWidgetsSearchBox.SearchBox;
    }, function (_layoutWidgetsDetailedView) {
      DetailedView = _layoutWidgetsDetailedView.DetailedView;
    }, function (_dataRepository) {
      Repository = _dataRepository.Repository;
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
    }, function (_layoutInfrastructureWidgetFactory) {
      WidgetFactory = _layoutInfrastructureWidgetFactory.WidgetFactory;
    }, function (_layoutGridsterDashboard) {
      GridsterDashboard = _layoutGridsterDashboard.GridsterDashboard;
    }, function (_layoutBootstrapDashboard) {
      BootstrapDashboard = _layoutBootstrapDashboard.BootstrapDashboard;
    }, function (_navigatorPeriscopeRouter) {
      PeriscopeRouter = _navigatorPeriscopeRouter.PeriscopeRouter;
    }, function (_navigatorNavigationHistory) {
      NavigationHistory = _navigatorNavigationHistory.NavigationHistory;
    }, function (_stateUserStateStorage) {
      UserStateStorage = _stateUserStateStorage.UserStateStorage;
    }, function (_stateStateUrlParser) {
      StateUrlParser = _stateStateUrlParser.StateUrlParser;
    }, function (_helpersStringHelper) {
      StringHelper = _helpersStringHelper.StringHelper;
    }],
    execute: function () {
      _export('DashboardFactory', DashboardFactory = (_dec = inject(Repository, EventAggregator, WidgetFactory, PeriscopeRouter, UserStateStorage, NavigationHistory), _dec(_class = function () {
        function DashboardFactory(repository, eventAggregator, widgetFactory, periscopeRouter, userStateStorage, navigationHistory) {
          _classCallCheck(this, DashboardFactory);

          this._repository = repository;
          this._eventAggregator = eventAggregator;
          this._widgetFactory = widgetFactory;
          this._router = periscopeRouter;
          this._stateStorage = userStateStorage;
          this._navigationHistory = navigationHistory;
        }

        DashboardFactory.prototype.getDashboard = function getDashboard(name, params) {
          var dashboard;
          switch (name.toLowerCase()) {
            case 'customers':
              dashboard = this._getDefaultDashboard(params);
              break;
            case 'orders':
              dashboard = this._getOrdersDashboard(params);
              break;
          }
          if (dashboard) {
            var stackBehavior = new ManageNavigationStackBehavior(this._eventAggregator);
            stackBehavior.attach(dashboard);
          }
          return dashboard;
        };

        DashboardFactory.prototype._getDefaultDashboard = function _getDefaultDashboard(params) {
          var dsCustomers = this._repository.getDatasource("customers");

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

          var dashboard = new BootstrapDashboard("customers");
          dashboard.title = "Customers";

          dashboard.addWidget(searchBox, { size_x: 12, size_y: 1, col: 1, row: 1 });
          dashboard.addWidget(customersGrid, { size_x: 6, size_y: "*", col: 1, row: 2 });
          dashboard.addWidget(chart, { size_x: "*", size_y: "*", col: 7, row: 2 });

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
            router: this._router
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
          changeRoureBefavior.attach(dashboard);
          createWidgetBehavior.attach(dashboard);

          return dashboard;
        };

        DashboardFactory.prototype._getOrdersDashboard = function _getOrdersDashboard(params) {

          var dsOrders = this._repository.getDatasource("orders");

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

          var searchBoxName = "ordersSearchWidget";

          var searchBox = this._widgetFactory.createWidget(SearchBox, {
            name: searchBoxName,
            header: "Orders",
            showHeader: false,
            dataSource: dsOrders,
            dataFilter: "",
            stateStorage: this._stateStorage,
            behavior: [new DataFilterChangedBehavior("ordersSearchChannel", this._eventAggregator)]
          });

          var dashboard = new BootstrapDashboard("orders");
          dashboard.title = "Orders";

          dashboard.addWidget(searchBox, { size_x: 12, size_y: 1, col: 1, row: 1 });
          dashboard.addWidget(ordersGrid, { size_x: 12, size_y: '*', col: 1, row: 2 });

          var replaceWidgetBehavior = new ReplaceWidgetBehavior('order-details', this._eventAggregator, this._widgetFactory, "gridWidgetOrders", DetailedView, {
            name: "detailsWidgetOrder",
            header: "Order Details",
            behavior: [],
            dataSource: dsOrders,
            showHeader: true
          }, function (message) {
            return "record.Id=='" + message.activatedData.get("Id").toString() + "'";
          });
          replaceWidgetBehavior.attach(dashboard);

          return dashboard;
        };

        return DashboardFactory;
      }()) || _class));

      _export('DashboardFactory', DashboardFactory);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC9pbmZyYXN0cnVjdHVyZS9kYXNoYm9hcmQtZmFjdG9yeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQVE7QUFBUTs7QUFDUjs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7O2tDQUtLLDJCQURaLE9BQU8sVUFBUCxFQUFtQixlQUFuQixFQUFvQyxhQUFwQyxFQUFtRCxlQUFuRCxFQUFvRSxnQkFBcEUsRUFBc0YsaUJBQXRGO0FBR0MsaUJBRlcsZ0JBRVgsQ0FBWSxVQUFaLEVBQXdCLGVBQXhCLEVBQXlDLGFBQXpDLEVBQXdELGVBQXhELEVBQXlFLGdCQUF6RSxFQUEyRixpQkFBM0YsRUFBOEc7Z0NBRm5HLGtCQUVtRzs7QUFDNUcsZUFBSyxXQUFMLEdBQW1CLFVBQW5CLENBRDRHO0FBRTVHLGVBQUssZ0JBQUwsR0FBd0IsZUFBeEIsQ0FGNEc7QUFHNUcsZUFBSyxjQUFMLEdBQXNCLGFBQXRCLENBSDRHO0FBSTVHLGVBQUssT0FBTCxHQUFlLGVBQWYsQ0FKNEc7QUFLNUcsZUFBSyxhQUFMLEdBQXFCLGdCQUFyQixDQUw0RztBQU01RyxlQUFLLGtCQUFMLEdBQTBCLGlCQUExQixDQU40RztTQUE5Rzs7QUFGVyxtQ0FZWCxxQ0FBYSxNQUFNLFFBQU87QUFDeEIsY0FBSSxTQUFKLENBRHdCO0FBRXhCLGtCQUFRLEtBQUssV0FBTCxFQUFSO0FBQ0UsaUJBQUssV0FBTDtBQUNFLDBCQUFZLEtBQUssb0JBQUwsQ0FBMEIsTUFBMUIsQ0FBWixDQURGO0FBRUUsb0JBRkY7QUFERixpQkFJTyxRQUFMO0FBQ0UsMEJBQVksS0FBSyxtQkFBTCxDQUF5QixNQUF6QixDQUFaLENBREY7QUFFRSxvQkFGRjtBQUpGLFdB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QUFQO0FBQ0EscUJBQU8sY0FBUDthQXhCSSxDQUFSO1dBYlcsQ0FBYixDQUxtQjs7QUFnRHZCLGNBQUksZ0JBQWdCLG9CQUFoQixDQWhEbUI7O0FBbUR2QixjQUFJLFlBQVksS0FBSyxjQUFMLENBQW9CLFlBQXBCLENBQWlDLFNBQWpDLEVBQTRDO0FBQzFELGtCQUFLLGFBQUw7QUFDQSxvQkFBTyxRQUFQO0FBQ0Esd0JBQVcsS0FBWDtBQUNBLHdCQUFZLFFBQVo7QUFDQSx3QkFBVyxFQUFYO0FBQ0EsMEJBQWMsS0FBSyxhQUFMO0FBQ2Qsc0JBQVMsQ0FDUCxJQUFJLHlCQUFKLENBQThCLHFCQUE5QixFQUFvRCxLQUFLLGdCQUFMLENBRDdDLENBQVQ7V0FQYyxDQUFaLENBbkRtQjs7QUFnRXZCLGNBQUksWUFBWSxJQUFJLGtCQUFKLENBQXVCLFFBQXZCLENBQVosQ0FoRW1CO0FBaUV2QixvQkFBVSxLQUFWLEdBQWtCLFFBQWxCLENBakV1Qjs7QUFtRXZCLG9CQUFVLFNBQVYsQ0FBb0IsU0FBcEIsRUFBK0IsRUFBQyxRQUFPLEVBQVAsRUFBVyxRQUFPLENBQVAsRUFBVSxLQUFJLENBQUosRUFBTyxLQUFJLENBQUosRUFBNUQsRUFuRXVCO0FBb0V2QixvQkFBVSxTQUFWLENBQW9CLFVBQXBCLEVBQWdDLEVBQUMsUUFBTyxFQUFQLEVBQVcsUUFBTyxHQUFQLEVBQVksS0FBSSxDQUFKLEVBQU8sS0FBSSxDQUFKLEVBQS9ELEVBcEV1Qjs7QUFzRXZCLGNBQUksd0JBQXdCLElBQUkscUJBQUosQ0FDeEIsZUFEd0IsRUFFeEIsS0FBSyxnQkFBTCxFQUNBLEtBQUssY0FBTCxFQUNBLGtCQUp3QixFQUt4QixZQUx3QixFQU14QjtBQUNFLGtCQUFLLG9CQUFMO0FBQ0Esb0JBQU8sZUFBUDtBQUNBLHNCQUFTLEVBQVQ7QUFDQSx3QkFBWSxRQUFaO0FBQ0Esd0JBQVcsSUFBWDtXQVhzQixFQTZDeEIsbUJBQVc7QUFBRSxtQkFBUSxpQkFBaUIsUUFBUSxhQUFSLENBQXNCLEdBQXRCLENBQTBCLElBQTFCLEVBQWdDLFFBQWhDLEVBQWpCLEdBQThELEdBQTlELENBQVY7V0FBWCxDQTdDQSxDQXRFbUI7QUFxSHZCLGdDQUFzQixNQUF0QixDQUE2QixTQUE3QixFQXJIdUI7O0FBdUh2QixpQkFBTyxTQUFQLENBdkh1Qjs7O2VBN0tsQiIsImZpbGUiOiJsYXlvdXQvaW5mcmFzdHJ1Y3R1cmUvZGFzaGJvYXJkLWZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
