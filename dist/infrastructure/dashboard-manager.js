'use strict';

System.register(['lodash', './../layout/bootstrap-dashboard'], function (_export, _context) {
  var lodash, BootstrapDashboard, _createClass, DashboardManager;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_lodash) {
      lodash = _lodash.default;
    }, function (_layoutBootstrapDashboard) {
      BootstrapDashboard = _layoutBootstrapDashboard.BootstrapDashboard;
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

      _export('DashboardManager', DashboardManager = function () {
        function DashboardManager() {
          _classCallCheck(this, DashboardManager);

          this._dashboards = [];
        }

        DashboardManager.prototype.find = function find(dashboardName) {
          return _.find(this._dashboards, { name: dashboardName });
        };

        DashboardManager.prototype.createDashboard = function createDashboard(name, dashboardConfiguration) {
          var dashboard = new BootstrapDashboard(name);
          dashboard.configure(dashboardConfiguration);
          this._dashboards.push(dashboard);
          return dashboard;
        };

        _createClass(DashboardManager, [{
          key: 'dashboards',
          get: function get() {
            return this._dashboards;
          }
        }]);

        return DashboardManager;
      }());

      _export('DashboardManager', DashboardManager);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZnJhc3RydWN0dXJlL2Rhc2hib2FyZC1tYW5hZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBTzs7QUFDQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQUVLO0FBQ1gsaUJBRFcsZ0JBQ1gsR0FBYTtnQ0FERixrQkFDRTs7QUFDWCxlQUFLLFdBQUwsR0FBbUIsRUFBbkIsQ0FEVztTQUFiOztBQURXLG1DQVNYLHFCQUFLLGVBQWM7QUFDakIsaUJBQVEsRUFBRSxJQUFGLENBQU8sS0FBSyxXQUFMLEVBQWtCLEVBQUMsTUFBSyxhQUFMLEVBQTFCLENBQVIsQ0FEaUI7OztBQVRSLG1DQWFYLDJDQUFnQixNQUFNLHdCQUF1QjtBQUMzQyxjQUFJLFlBQVksSUFBSSxrQkFBSixDQUF1QixJQUF2QixDQUFaLENBRHVDO0FBRTNDLG9CQUFVLFNBQVYsQ0FBb0Isc0JBQXBCLEVBRjJDO0FBRzNDLGVBQUssV0FBTCxDQUFpQixJQUFqQixDQUFzQixTQUF0QixFQUgyQztBQUkzQyxpQkFBTyxTQUFQLENBSjJDOzs7cUJBYmxDOzs4QkFLSztBQUNkLG1CQUFPLEtBQUssV0FBTCxDQURPOzs7O2VBTEwiLCJmaWxlIjoiaW5mcmFzdHJ1Y3R1cmUvZGFzaGJvYXJkLW1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
