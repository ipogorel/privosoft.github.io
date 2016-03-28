'use strict';

System.register(['aurelia-framework', 'jquery'], function (_export, _context) {
  var inject, $, App;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_jquery) {
      $ = _jquery.default;
    }],
    execute: function () {
      _export('App', App = function () {
        function App() {
          _classCallCheck(this, App);
        }

        App.prototype.configureRouter = function configureRouter(config, router) {
          config.title = 'Periscope';
          config.map([{ route: ['/', '/:dashboard'], name: 'dashboard', moduleId: './dashboard', nav: true, title: 'Dashboard' }]);


          this.router = router;
        };

        App.prototype.attached = function attached() {
          var elementsHeight = $(".navbar")[0].scrollHeight + $(".mainnav")[0].scrollHeight - 8;
          if ($(".breadcrumb")[0]) elementsHeight += $("breadcrumb")[0].scrollHeight;

          $(".content").css("height", $("#wrapper")[0].clientHeight - elementsHeight);
        };

        return App;
      }());

      _export('App', App);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQVE7O0FBQ0Q7OztxQkFFTTtBQUNYLGlCQURXLEdBQ1gsR0FBYztnQ0FESCxLQUNHO1NBQWQ7O0FBRFcsc0JBS1gsMkNBQWdCLFFBQVEsUUFBTztBQUM3QixpQkFBTyxLQUFQLEdBQWUsV0FBZixDQUQ2QjtBQUU3QixpQkFBTyxHQUFQLENBQVcsQ0FDVCxFQUFFLE9BQU8sQ0FBQyxHQUFELEVBQU0sYUFBTixDQUFQLEVBQThCLE1BQU0sV0FBTixFQUFvQixVQUFVLGFBQVYsRUFBMEIsS0FBSyxJQUFMLEVBQVcsT0FBTSxXQUFOLEVBRGhGLENBQVgsRUFGNkI7OztBQWU3QixlQUFLLE1BQUwsR0FBYyxNQUFkLENBZjZCOzs7QUFMcEIsc0JBdUJYLCtCQUFVO0FBT1IsY0FBSSxpQkFBaUIsRUFBRSxTQUFGLEVBQWEsQ0FBYixFQUFnQixZQUFoQixHQUErQixFQUFFLFVBQUYsRUFBYyxDQUFkLEVBQWlCLFlBQWpCLEdBQThCLENBQTdELENBUGI7QUFRUixjQUFJLEVBQUUsYUFBRixFQUFpQixDQUFqQixDQUFKLEVBQ0Usa0JBQWdCLEVBQUUsWUFBRixFQUFnQixDQUFoQixFQUFtQixZQUFuQixDQURsQjs7QUFHQSxZQUFFLFVBQUYsRUFBYyxHQUFkLENBQWtCLFFBQWxCLEVBQTJCLEVBQUUsVUFBRixFQUFjLENBQWQsRUFBaUIsWUFBakIsR0FBOEIsY0FBOUIsQ0FBM0IsQ0FYUTs7O2VBdkJDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
