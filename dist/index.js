'use strict';

System.register(['aurelia-framework', 'aurelia-event-aggregator', './infrastructure/dashboard-manager', './navigator/periscope-router', './state/user-state-storage'], function (_export, _context) {
  var inject, EventAggregator, DashboardManager, PeriscopeRouter, UserStateStorage, _dec, _class, Index;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_infrastructureDashboardManager) {
      DashboardManager = _infrastructureDashboardManager.DashboardManager;
    }, function (_navigatorPeriscopeRouter) {
      PeriscopeRouter = _navigatorPeriscopeRouter.PeriscopeRouter;
    }, function (_stateUserStateStorage) {
      UserStateStorage = _stateUserStateStorage.UserStateStorage;
    }],
    execute: function () {
      _export('Index', Index = (_dec = inject(DashboardManager, PeriscopeRouter, EventAggregator, UserStateStorage), _dec(_class = function () {
        function Index(dashboardManager, periscopeRouter, eventAggregator, userStateStorage) {
          _classCallCheck(this, Index);

          this._router = periscopeRouter;
          this._dashboardManager = dashboardManager;
          this._eventAggregator = eventAggregator;
          this._userStateStorage = userStateStorage;
        }

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
              self.dashboard = self._dashboardManager.find(payload.instruction.params.dashboard);

              if (self.dashboard) self.dashboard.refresh();
            }
          });
        };

        return Index;
      }()) || _class));

      _export('Index', Index);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBUTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7O3VCQUlLLGdCQURaLE9BQU8sZ0JBQVAsRUFBeUIsZUFBekIsRUFBMEMsZUFBMUMsRUFBMkQsZ0JBQTNEO0FBR0MsaUJBRlcsS0FFWCxDQUFZLGdCQUFaLEVBQThCLGVBQTlCLEVBQStDLGVBQS9DLEVBQWdFLGdCQUFoRSxFQUFrRjtnQ0FGdkUsT0FFdUU7O0FBQ2hGLGVBQUssT0FBTCxHQUFlLGVBQWYsQ0FEZ0Y7QUFFaEYsZUFBSyxpQkFBTCxHQUF5QixnQkFBekIsQ0FGZ0Y7QUFHaEYsZUFBSyxnQkFBTCxHQUF3QixlQUF4QixDQUhnRjtBQUloRixlQUFLLGlCQUFMLEdBQXlCLGdCQUF6QixDQUpnRjtTQUFsRjs7QUFGVyx3QkFVWCwrQkFBVTs7O0FBQ1IsY0FBSSxPQUFPLElBQVAsQ0FESTtBQUVSLGVBQUssZ0JBQUwsQ0FBc0IsU0FBdEIsQ0FBZ0MsNEJBQWhDLEVBQThELFVBQUMsT0FBRCxFQUFhO0FBQ3pFLGdCQUFJLENBQUMsUUFBUSxXQUFSLENBQW9CLE1BQXBCLENBQTJCLFNBQTNCLEVBQXFDO0FBQ3hDLG9CQUFLLGlCQUFMLENBQXVCLFFBQXZCLEdBRHdDO0FBRXhDLG1CQUFLLE9BQUwsQ0FBYSxRQUFiLENBQXNCO0FBQ3BCLHVCQUFPLFdBQVA7QUFDQSx1QkFBTyxZQUFQO0FBQ0EsK0JBQWUsV0FBZjtlQUhGLEVBRndDO2FBQTFDLE1BU0E7QUFDRSxtQkFBSyxTQUFMLEdBQWlCLEtBQUssaUJBQUwsQ0FBdUIsSUFBdkIsQ0FBNEIsUUFBUSxXQUFSLENBQW9CLE1BQXBCLENBQTJCLFNBQTNCLENBQTdDLENBREY7O0FBR0Usa0JBQUksS0FBSyxTQUFMLEVBQ0YsS0FBSyxTQUFMLENBQWUsT0FBZixHQURGO2FBWkY7V0FENEQsQ0FBOUQsQ0FGUTs7O2VBVkMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
