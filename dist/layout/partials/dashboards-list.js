'use strict';

System.register(['aurelia-framework', 'navigator/periscope-router'], function (_export, _context) {
  var inject, bindable, computedFrom, PeriscopeRouter, _dec, _class, DashboardsList;

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
    }, function (_navigatorPeriscopeRouter) {
      PeriscopeRouter = _navigatorPeriscopeRouter.PeriscopeRouter;
    }],
    execute: function () {
      _export('DashboardsList', DashboardsList = (_dec = inject(PeriscopeRouter), _dec(_class = function () {
        function DashboardsList(periscopeRouter) {
          _classCallCheck(this, DashboardsList);

          this._periscopeRouter = periscopeRouter;
        }

        DashboardsList.prototype.navigate = function navigate(dashboard) {
          this._periscopeRouter.navigate({
            route: dashboard.url,
            title: dashboard.title,
            dashboardName: dashboard.name
          });
        };

        return DashboardsList;
      }()) || _class));

      _export('DashboardsList', DashboardsList);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC9wYXJ0aWFscy9kYXNoYm9hcmRzLWxpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFRO0FBQVE7QUFBVTs7QUFDbEI7OztnQ0FHSyx5QkFEWixPQUFPLGVBQVA7QUFFQyxpQkFEVyxjQUNYLENBQVksZUFBWixFQUE0QjtnQ0FEakIsZ0JBQ2lCOztBQUMxQixlQUFLLGdCQUFMLEdBQXdCLGVBQXhCLENBRDBCO1NBQTVCOztBQURXLGlDQUtYLDZCQUFTLFdBQVU7QUFDakIsZUFBSyxnQkFBTCxDQUFzQixRQUF0QixDQUErQjtBQUMzQixtQkFBTyxVQUFVLEdBQVY7QUFDUCxtQkFBTyxVQUFVLEtBQVY7QUFDUCwyQkFBZSxVQUFVLElBQVY7V0FIbkIsRUFEaUI7OztlQUxSIiwiZmlsZSI6ImxheW91dC9wYXJ0aWFscy9kYXNoYm9hcmRzLWxpc3QuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
