'use strict';

System.register(['aurelia-framework', './../../infrastructure/dashboard-manager', './../../navigator/periscope-router'], function (_export, _context) {
  var inject, bindable, computedFrom, DashboardManager, PeriscopeRouter, _createClass, _dec, _class, DashboardsList;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
      computedFrom = _aureliaFramework.computedFrom;
    }, function (_infrastructureDashboardManager) {
      DashboardManager = _infrastructureDashboardManager.DashboardManager;
    }, function (_navigatorPeriscopeRouter) {
      PeriscopeRouter = _navigatorPeriscopeRouter.PeriscopeRouter;
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

      _export('DashboardsList', DashboardsList = (_dec = inject(PeriscopeRouter, DashboardManager), _dec(_class = function () {
        function DashboardsList(periscopeRouter, dashboardManager) {
          _classCallCheck(this, DashboardsList);

          this._periscopeRouter = periscopeRouter;
          this._dashboardManager = dashboardManager;
        }

        DashboardsList.prototype.navigate = function navigate(dashboard) {
          this._periscopeRouter.navigate({
            route: dashboard.route,
            title: dashboard.title,
            dashboardName: dashboard.name
          });
        };

        _createClass(DashboardsList, [{
          key: 'dashboards',
          get: function get() {
            return this._dashboardManager.dashboards;
          }
        }]);

        return DashboardsList;
      }()) || _class));

      _export('DashboardsList', DashboardsList);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC9wYXJ0aWFscy9kYXNoYm9hcmRzLWxpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFRO0FBQVE7QUFBVTs7QUFDbEI7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQ0FHSyx5QkFEWixPQUFPLGVBQVAsRUFBd0IsZ0JBQXhCO0FBRUMsaUJBRFcsY0FDWCxDQUFZLGVBQVosRUFBNkIsZ0JBQTdCLEVBQThDO2dDQURuQyxnQkFDbUM7O0FBQzVDLGVBQUssZ0JBQUwsR0FBd0IsZUFBeEIsQ0FENEM7QUFFNUMsZUFBSyxpQkFBTCxHQUF5QixnQkFBekIsQ0FGNEM7U0FBOUM7O0FBRFcsaUNBVVgsNkJBQVMsV0FBVTtBQUNqQixlQUFLLGdCQUFMLENBQXNCLFFBQXRCLENBQStCO0FBQzNCLG1CQUFPLFVBQVUsS0FBVjtBQUNQLG1CQUFPLFVBQVUsS0FBVjtBQUNQLDJCQUFlLFVBQVUsSUFBVjtXQUhuQixFQURpQjs7O3FCQVZSOzs4QkFNSztBQUNkLG1CQUFPLEtBQUssaUJBQUwsQ0FBdUIsVUFBdkIsQ0FETzs7OztlQU5MIiwiZmlsZSI6ImxheW91dC9wYXJ0aWFscy9kYXNoYm9hcmRzLWxpc3QuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
