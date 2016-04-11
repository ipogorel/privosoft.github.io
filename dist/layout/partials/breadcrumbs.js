'use strict';

System.register(['jquery', 'aurelia-framework', './../../navigator/periscope-router', './../../navigator/navigation-history', './../../state/user-state-storage'], function (_export, _context) {
  var $, computedFrom, inject, bindable, PeriscopeRouter, NavigationHistory, UserStateStorage, _createClass, _dec, _dec2, _class, _desc, _value, _class2, Breadcrumbs;

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
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_aureliaFramework) {
      computedFrom = _aureliaFramework.computedFrom;
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
    }, function (_navigatorPeriscopeRouter) {
      PeriscopeRouter = _navigatorPeriscopeRouter.PeriscopeRouter;
    }, function (_navigatorNavigationHistory) {
      NavigationHistory = _navigatorNavigationHistory.NavigationHistory;
    }, function (_stateUserStateStorage) {
      UserStateStorage = _stateUserStateStorage.UserStateStorage;
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

      _export('Breadcrumbs', Breadcrumbs = (_dec = inject(PeriscopeRouter, NavigationHistory, UserStateStorage), _dec2 = computedFrom('currentRoute'), _dec(_class = (_class2 = function () {
        function Breadcrumbs(router, navigationHistory, userStateStorage) {
          _classCallCheck(this, Breadcrumbs);

          this._router = router;
          this._navigationHistory = navigationHistory;
          this._userStateStorage = userStateStorage;
        }

        Breadcrumbs.prototype.navigate = function navigate(routeItem) {
          this._router.navigate(routeItem);
        };

        _createClass(Breadcrumbs, [{
          key: 'currentRoute',
          get: function get() {
            if (this._router.currentRouteItem) return this._router.currentRouteItem.route;
            return "";
          }
        }, {
          key: 'history',
          get: function get() {
            var nH = this._navigationHistory.items;
            var result = [];

            for (var i = 0; i < nH.length; i++) {
              result.push(nH[i]);
              if (nH[i].dashboardName === this._router.currentRouteItem.dashboardName) break;
            }

            return result;
          }
        }]);

        return Breadcrumbs;
      }(), (_applyDecoratedDescriptor(_class2.prototype, 'history', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'history'), _class2.prototype)), _class2)) || _class));

      _export('Breadcrumbs', Breadcrumbs);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC9wYXJ0aWFscy9icmVhZGNydW1icy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTzs7QUFDQztBQUNBO0FBQVE7O0FBQ1I7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFHSyxzQkFEWixPQUFPLGVBQVAsRUFBd0IsaUJBQXhCLEVBQTJDLGdCQUEzQyxXQWdCRSxhQUFhLGNBQWI7QUFiRCxpQkFGVyxXQUVYLENBQVksTUFBWixFQUFvQixpQkFBcEIsRUFBdUMsZ0JBQXZDLEVBQXdEO2dDQUY3QyxhQUU2Qzs7QUFDdEQsZUFBSyxPQUFMLEdBQWUsTUFBZixDQURzRDtBQUV0RCxlQUFLLGtCQUFMLEdBQTBCLGlCQUExQixDQUZzRDtBQUd0RCxlQUFLLGlCQUFMLEdBQXlCLGdCQUF6QixDQUhzRDtTQUF4RDs7QUFGVyw4QkE4QlgsNkJBQVMsV0FBVTtBQUNqQixlQUFLLE9BQUwsQ0FBYSxRQUFiLENBQXNCLFNBQXRCLEVBRGlCOzs7cUJBOUJSOzs4QkFRTztBQUNoQixnQkFBSSxLQUFLLE9BQUwsQ0FBYSxnQkFBYixFQUNGLE9BQU8sS0FBSyxPQUFMLENBQWEsZ0JBQWIsQ0FBOEIsS0FBOUIsQ0FEVDtBQUVBLG1CQUFPLEVBQVAsQ0FIZ0I7Ozs7OEJBUUw7QUFDWCxnQkFBSSxLQUFLLEtBQUssa0JBQUwsQ0FBd0IsS0FBeEIsQ0FERTtBQUVYLGdCQUFJLFNBQVMsRUFBVCxDQUZPOztBQUlYLGlCQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxHQUFHLE1BQUgsRUFBVyxHQUEvQixFQUFvQztBQUNsQyxxQkFBTyxJQUFQLENBQVksR0FBRyxDQUFILENBQVosRUFEa0M7QUFFbEMsa0JBQUksR0FBRyxDQUFILEVBQU0sYUFBTixLQUF3QixLQUFLLE9BQUwsQ0FBYSxnQkFBYixDQUE4QixhQUE5QixFQUMxQixNQURGO2FBRkY7O0FBTUEsbUJBQU8sTUFBUCxDQVZXOzs7O2VBaEJGIiwiZmlsZSI6ImxheW91dC9wYXJ0aWFscy9icmVhZGNydW1icy5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
