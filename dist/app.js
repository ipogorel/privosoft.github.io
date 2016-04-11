'use strict';

System.register(['aurelia-framework', './config/default-dashboard-configuration', 'jquery'], function (_export, _context) {
  var inject, DefaultDashboardConfiguration, $, _dec, _class, App;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_configDefaultDashboardConfiguration) {
      DefaultDashboardConfiguration = _configDefaultDashboardConfiguration.DefaultDashboardConfiguration;
    }, function (_jquery) {
      $ = _jquery.default;
    }],
    execute: function () {
      _export('App', App = (_dec = inject(DefaultDashboardConfiguration), _dec(_class = function () {
        function App(dashboardsConfiguration) {
          _classCallCheck(this, App);

          dashboardsConfiguration.invoke();
        }

        App.prototype.configureRouter = function configureRouter(config, router) {
          config.title = 'Periscope';
          config.map([{ route: ['/', '/:dashboard'], name: 'dashboard', moduleId: './index', nav: true, title: 'Dashboard' }]);
          this.router = router;
        };

        App.prototype.attached = function attached() {

          var elementsHeight = $(".navbar")[0].scrollHeight + $(".mainnav")[0].scrollHeight - 8;
          if ($(".breadcrumb")[0]) elementsHeight += $("breadcrumb")[0].scrollHeight;

          $(".content").css("height", $("#wrapper")[0].clientHeight - elementsHeight);
        };

        return App;
      }()) || _class));

      _export('App', App);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQVE7O0FBQ0E7O0FBQ0Q7OztxQkFHTSxjQURaLE9BQU8sNkJBQVA7QUFFQyxpQkFEVyxHQUNYLENBQVksdUJBQVosRUFBcUM7Z0NBRDFCLEtBQzBCOztBQUNuQyxrQ0FBd0IsTUFBeEIsR0FEbUM7U0FBckM7O0FBRFcsc0JBTVgsMkNBQWdCLFFBQVEsUUFBTztBQUM3QixpQkFBTyxLQUFQLEdBQWUsV0FBZixDQUQ2QjtBQUU3QixpQkFBTyxHQUFQLENBQVcsQ0FDVCxFQUFFLE9BQU8sQ0FBQyxHQUFELEVBQU0sYUFBTixDQUFQLEVBQThCLE1BQU0sV0FBTixFQUFvQixVQUFVLFNBQVYsRUFBc0IsS0FBSyxJQUFMLEVBQVcsT0FBTSxXQUFOLEVBRDVFLENBQVgsRUFGNkI7QUFLN0IsZUFBSyxNQUFMLEdBQWMsTUFBZCxDQUw2Qjs7O0FBTnBCLHNCQWdCWCwrQkFBVTs7QUFRUixjQUFJLGlCQUFpQixFQUFFLFNBQUYsRUFBYSxDQUFiLEVBQWdCLFlBQWhCLEdBQStCLEVBQUUsVUFBRixFQUFjLENBQWQsRUFBaUIsWUFBakIsR0FBOEIsQ0FBN0QsQ0FSYjtBQVNSLGNBQUksRUFBRSxhQUFGLEVBQWlCLENBQWpCLENBQUosRUFDRSxrQkFBZ0IsRUFBRSxZQUFGLEVBQWdCLENBQWhCLEVBQW1CLFlBQW5CLENBRGxCOztBQUdBLFlBQUUsVUFBRixFQUFjLEdBQWQsQ0FBa0IsUUFBbEIsRUFBMkIsRUFBRSxVQUFGLEVBQWMsQ0FBZCxFQUFpQixZQUFqQixHQUE4QixjQUE5QixDQUEzQixDQVpROzs7ZUFoQkMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
