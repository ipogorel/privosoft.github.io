'use strict';

System.register(['aurelia-framework', 'navigator/periscope-router', 'layout/infrastructure/dashboard-factory', 'aurelia-event-aggregator', 'state/user-state-storage'], function (_export, _context) {
  var inject, bindable, PeriscopeRouter, DashboardFactory, EventAggregator, UserStateStorage, _dec, _class, Index;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
    }, function (_navigatorPeriscopeRouter) {
      PeriscopeRouter = _navigatorPeriscopeRouter.PeriscopeRouter;
    }, function (_layoutInfrastructureDashboardFactory) {
      DashboardFactory = _layoutInfrastructureDashboardFactory.DashboardFactory;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_stateUserStateStorage) {
      UserStateStorage = _stateUserStateStorage.UserStateStorage;
    }],
    execute: function () {
      _export('Index', Index = (_dec = inject(DashboardFactory, PeriscopeRouter, EventAggregator, UserStateStorage), _dec(_class = function () {
        function Index(dashboardFactory, router, eventAggregator, userStateStorage) {
          _classCallCheck(this, Index);

          this._dashboardFactory = dashboardFactory;
          this._router = router;
          this._eventAggregator = eventAggregator;
          this._userStateStorage = userStateStorage;
        }

        Index.prototype.createDashboard = function createDashboard(dashboardName, params) {
          if (!dashboardName || dashboardName === "") return;
          var dashboard = this._dashboardFactory.getDashboard(dashboardName, params);
          dashboard.refresh();
          return dashboard;
        };

        Index.prototype.attached = function attached() {
          var _this = this;

          var self = this;
          this._eventAggregator.subscribe('router:navigation:complete', function (payload) {
            if (!payload.instruction.params.dashboard) {
              _this._userStateStorage.clearAll();
              self._router.navigate({
                title: "Customers",
                route: "/customers",
                dashboardName: "customers"
              });
            } else {
              if (self.dashboard) self.dashboard.dispose();
              self.dashboard = self.createDashboard(payload.instruction.params.dashboard, payload.instruction.queryParams);
            }
          });
        };

        return Index;
      }()) || _class));

      _export('Index', Index);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhc2hib2FyZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQVE7QUFBUTs7QUFDUjs7QUFDQTs7QUFDQTs7QUFDQTs7O3VCQUdLLGdCQURaLE9BQU8sZ0JBQVAsRUFBeUIsZUFBekIsRUFBMEMsZUFBMUMsRUFBMkQsZ0JBQTNEO0FBR0MsaUJBRlcsS0FFWCxDQUFZLGdCQUFaLEVBQThCLE1BQTlCLEVBQXNDLGVBQXRDLEVBQXVELGdCQUF2RCxFQUF5RTtnQ0FGOUQsT0FFOEQ7O0FBQ3ZFLGVBQUssaUJBQUwsR0FBeUIsZ0JBQXpCLENBRHVFO0FBRXZFLGVBQUssT0FBTCxHQUFlLE1BQWYsQ0FGdUU7QUFHdkUsZUFBSyxnQkFBTCxHQUF3QixlQUF4QixDQUh1RTtBQUl2RSxlQUFLLGlCQUFMLEdBQXlCLGdCQUF6QixDQUp1RTtTQUF6RTs7QUFGVyx3QkFVWCwyQ0FBZ0IsZUFBZSxRQUFRO0FBQ3JDLGNBQUksQ0FBRSxhQUFELElBQWtCLGtCQUFnQixFQUFoQixFQUNyQixPQURGO0FBRUEsY0FBSSxZQUFZLEtBQUssaUJBQUwsQ0FBdUIsWUFBdkIsQ0FBb0MsYUFBcEMsRUFBbUQsTUFBbkQsQ0FBWixDQUhpQztBQUlyQyxvQkFBVSxPQUFWLEdBSnFDO0FBS3JDLGlCQUFPLFNBQVAsQ0FMcUM7OztBQVY1Qix3QkFtQlgsK0JBQVU7OztBQUNSLGNBQUksT0FBTyxJQUFQLENBREk7QUFFUixlQUFLLGdCQUFMLENBQXNCLFNBQXRCLENBQWdDLDRCQUFoQyxFQUE4RCxVQUFDLE9BQUQsRUFBYTtBQUN6RSxnQkFBSSxDQUFDLFFBQVEsV0FBUixDQUFvQixNQUFwQixDQUEyQixTQUEzQixFQUFxQztBQUN4QyxvQkFBSyxpQkFBTCxDQUF1QixRQUF2QixHQUR3QztBQUV4QyxtQkFBSyxPQUFMLENBQWEsUUFBYixDQUFzQjtBQUNwQix1QkFBTyxXQUFQO0FBQ0EsdUJBQU8sWUFBUDtBQUNBLCtCQUFlLFdBQWY7ZUFIRixFQUZ3QzthQUExQyxNQVNBO0FBQ0Usa0JBQUksS0FBSyxTQUFMLEVBQ0YsS0FBSyxTQUFMLENBQWUsT0FBZixHQURGO0FBRUEsbUJBQUssU0FBTCxHQUFpQixLQUFLLGVBQUwsQ0FBcUIsUUFBUSxXQUFSLENBQW9CLE1BQXBCLENBQTJCLFNBQTNCLEVBQXNDLFFBQVEsV0FBUixDQUFvQixXQUFwQixDQUE1RSxDQUhGO2FBVEE7V0FENEQsQ0FBOUQsQ0FGUTs7O2VBbkJDIiwiZmlsZSI6ImRhc2hib2FyZC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
