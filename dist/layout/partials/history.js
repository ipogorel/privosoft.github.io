'use strict';

System.register(['aurelia-framework', './../../navigator/periscope-router', './../../navigator/navigation-history', './../../infrastructure/state-view-factory'], function (_export, _context) {
  var inject, bindable, computedFrom, PeriscopeRouter, NavigationHistory, StateViewFactory, _createClass, _dec, _dec2, _class, _desc, _value, _class2, History;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
      computedFrom = _aureliaFramework.computedFrom;
    }, function (_navigatorPeriscopeRouter) {
      PeriscopeRouter = _navigatorPeriscopeRouter.PeriscopeRouter;
    }, function (_navigatorNavigationHistory) {
      NavigationHistory = _navigatorNavigationHistory.NavigationHistory;
    }, function (_infrastructureStateViewFactory) {
      StateViewFactory = _infrastructureStateViewFactory.StateViewFactory;
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

      _export('History', History = (_dec = inject(PeriscopeRouter, NavigationHistory, StateViewFactory), _dec2 = computedFrom('currentRoute'), _dec(_class = (_class2 = function () {
        function History(router, navigationHistory, stateViewFactory) {
          _classCallCheck(this, History);

          this._router = router;
          this._navigationHistory = navigationHistory;
          this._stateViewFactory = stateViewFactory;
        }

        History.prototype.navigate = function navigate(historyItem) {
          this._router.navigate({
            route: historyItem.url,
            title: historyItem.title,
            dashboardName: historyItem.dashboard
          });
        };

        History.prototype.isCurrent = function isCurrent(historyItem) {
          if (this._router.currentRouteItem) return historyItem.url === this._router.currentRouteItem.route;
          return false;
        };

        History.prototype.getStateView = function getStateView(stateItem) {
          if (stateItem.value) return this._stateViewFactory.createStateView(stateItem.value.stateType, stateItem.value.stateObject);
        };

        _createClass(History, [{
          key: 'currentRoute',
          get: function get() {
            if (this._router.currentRouteItem) return this._router.currentRouteItem.route;
            return "";
          }
        }, {
          key: 'items',
          get: function get() {
            var ar = this._navigationHistory.items.slice(0);
            ar.sort(function (a, b) {
              a = new Date(a.dateTime);
              b = new Date(b.dateTime);
              return a > b ? -1 : a < b ? 1 : 0;
            });

            return ar;
          }
        }]);

        return History;
      }(), (_applyDecoratedDescriptor(_class2.prototype, 'items', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'items'), _class2.prototype)), _class2)) || _class));

      _export('History', History);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC9wYXJ0aWFscy9oaXN0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFRO0FBQVE7QUFBVTs7QUFDbEI7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5QkFHSyxrQkFEWixPQUFPLGVBQVAsRUFBd0IsaUJBQXhCLEVBQTJDLGdCQUEzQyxXQWdCRSxhQUFhLGNBQWI7QUFiRCxpQkFGVyxPQUVYLENBQVksTUFBWixFQUFvQixpQkFBcEIsRUFBdUMsZ0JBQXZDLEVBQXdEO2dDQUY3QyxTQUU2Qzs7QUFDdEQsZUFBSyxPQUFMLEdBQWUsTUFBZixDQURzRDtBQUV0RCxlQUFLLGtCQUFMLEdBQTBCLGlCQUExQixDQUZzRDtBQUd0RCxlQUFLLGlCQUFMLEdBQXlCLGdCQUF6QixDQUhzRDtTQUF4RDs7QUFGVywwQkEyQlgsNkJBQVMsYUFBWTtBQUNuQixlQUFLLE9BQUwsQ0FBYSxRQUFiLENBQXNCO0FBQ3BCLG1CQUFPLFlBQVksR0FBWjtBQUNQLG1CQUFPLFlBQVksS0FBWjtBQUNQLDJCQUFlLFlBQVksU0FBWjtXQUhqQixFQURtQjs7O0FBM0JWLDBCQW1DWCwrQkFBVSxhQUFZO0FBQ3BCLGNBQUksS0FBSyxPQUFMLENBQWEsZ0JBQWIsRUFDRixPQUFPLFlBQVksR0FBWixLQUFvQixLQUFLLE9BQUwsQ0FBYSxnQkFBYixDQUE4QixLQUE5QixDQUQ3QjtBQUVBLGlCQUFPLEtBQVAsQ0FIb0I7OztBQW5DWCwwQkEwQ1gscUNBQWEsV0FBVTtBQUNyQixjQUFJLFVBQVUsS0FBVixFQUNGLE9BQU8sS0FBSyxpQkFBTCxDQUF1QixlQUF2QixDQUF1QyxVQUFVLEtBQVYsQ0FBZ0IsU0FBaEIsRUFBMkIsVUFBVSxLQUFWLENBQWdCLFdBQWhCLENBQXpFLENBREY7OztxQkEzQ1M7OzhCQVNPO0FBQ2hCLGdCQUFJLEtBQUssT0FBTCxDQUFhLGdCQUFiLEVBQ0YsT0FBTyxLQUFLLE9BQUwsQ0FBYSxnQkFBYixDQUE4QixLQUE5QixDQURUO0FBRUEsbUJBQU8sRUFBUCxDQUhnQjs7Ozs4QkFPUDtBQUNULGdCQUFJLEtBQUssS0FBSyxrQkFBTCxDQUF3QixLQUF4QixDQUE4QixLQUE5QixDQUFvQyxDQUFwQyxDQUFMLENBREs7QUFFVCxlQUFHLElBQUgsQ0FBUSxVQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCO0FBQ3RCLGtCQUFJLElBQUksSUFBSixDQUFTLEVBQUUsUUFBRixDQUFiLENBRHNCO0FBRXRCLGtCQUFJLElBQUksSUFBSixDQUFTLEVBQUUsUUFBRixDQUFiLENBRnNCO0FBR3RCLHFCQUFPLElBQUUsQ0FBRixHQUFNLENBQUMsQ0FBRCxHQUFLLElBQUUsQ0FBRixHQUFNLENBQU4sR0FBVSxDQUFWLENBSEk7YUFBaEIsQ0FBUixDQUZTOztBQVFULG1CQUFPLEVBQVAsQ0FSUzs7OztlQWhCQSIsImZpbGUiOiJsYXlvdXQvcGFydGlhbHMvaGlzdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
