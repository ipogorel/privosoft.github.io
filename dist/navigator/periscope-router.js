'use strict';

System.register(['./navigation-history', 'aurelia-framework', 'aurelia-event-aggregator', './../state/user-state-storage', './../state/state-discriminator', './../state/state-url-parser', './../helpers/string-helper', './../helpers/url-helper', 'aurelia-router', 'lodash'], function (_export, _context) {
  var NavigationHistory, inject, EventAggregator, UserStateStorage, StateDiscriminator, StateUrlParser, StringHelper, UrlHelper, Router, lodash, _createClass, _dec, _class, PeriscopeRouter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_navigationHistory) {
      NavigationHistory = _navigationHistory.NavigationHistory;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_stateUserStateStorage) {
      UserStateStorage = _stateUserStateStorage.UserStateStorage;
    }, function (_stateStateDiscriminator) {
      StateDiscriminator = _stateStateDiscriminator.StateDiscriminator;
    }, function (_stateStateUrlParser) {
      StateUrlParser = _stateStateUrlParser.StateUrlParser;
    }, function (_helpersStringHelper) {
      StringHelper = _helpersStringHelper.StringHelper;
    }, function (_helpersUrlHelper) {
      UrlHelper = _helpersUrlHelper.UrlHelper;
    }, function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
    }, function (_lodash) {
      lodash = _lodash.default;
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

      _export('PeriscopeRouter', PeriscopeRouter = (_dec = inject(Router, EventAggregator, UserStateStorage, NavigationHistory, StateUrlParser), _dec(_class = function () {
        function PeriscopeRouter(aureliaRouter, eventAggregator, userStateStorage, navigationHistory) {
          _classCallCheck(this, PeriscopeRouter);

          this._aureliaRouter = aureliaRouter;
          this._navigationHistory = navigationHistory;
          this._userStateStorage = userStateStorage;
          this._eventAggregator = eventAggregator;
        }

        PeriscopeRouter.prototype.navigate = function navigate(routeItem) {
          if (this.currentRouteItem) {
            var currentWidgetsState = StateDiscriminator.discriminate(this._userStateStorage.getAll(this.currentRouteItem.dashboardName));
            var url = "/" + this.currentRouteItem.dashboardName + StateUrlParser.stateToQuery(currentWidgetsState);
            if (_.filter(this._navigationHistory.items, function (i) {
              return StringHelper.compare(i.url, url);
            }).length === 0) {
              this._navigationHistory.add(url, this.currentRouteItem.title, this.currentRouteItem.dashboardName, currentWidgetsState, new Date());
            } else if (!StringHelper.compare(url, this.currentRouteItem.route)) {
              this._navigationHistory.update(url, new Date());
            }
          }

          var routeWidgetsState = StateUrlParser.queryToState(routeItem.route);
          var storageWidgetsState = StateDiscriminator.discriminate(this._userStateStorage.getAll(routeItem.dashboardName));
          for (var _iterator = storageWidgetsState, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var oldSt = _ref;

            this._userStateStorage.remove(oldSt.key);
          }for (var _iterator2 = routeWidgetsState, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
              if (_i2 >= _iterator2.length) break;
              _ref2 = _iterator2[_i2++];
            } else {
              _i2 = _iterator2.next();
              if (_i2.done) break;
              _ref2 = _i2.value;
            }

            var newSt = _ref2;

            this._userStateStorage.set(newSt.key, newSt.value);
          }
          if (_.filter(this._navigationHistory.items, function (i) {
            return StringHelper.compare(i.url, routeItem.route);
          }).length === 0) {
            this._navigationHistory.add(routeItem.route, routeItem.title, routeItem.dashboardName, this._userStateStorage.getAll(routeItem.dashboardName), new Date());
          }

          this.currentRouteItem = routeItem;
          this._aureliaRouter.navigate(routeItem.route);
        };

        _createClass(PeriscopeRouter, [{
          key: 'currentRouteItem',
          get: function get() {
            return this._currentRoute;
          },
          set: function set(value) {
            this._currentRoute = value;
          }
        }]);

        return PeriscopeRouter;
      }()) || _class));

      _export('PeriscopeRouter', PeriscopeRouter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnYXRvci9wZXJpc2NvcGUtcm91dGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBUTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lDQUlNLDBCQURaLE9BQU8sTUFBUCxFQUFlLGVBQWYsRUFBZ0MsZ0JBQWhDLEVBQWtELGlCQUFsRCxFQUFxRSxjQUFyRTtBQUVDLGlCQURXLGVBQ1gsQ0FBWSxhQUFaLEVBQTJCLGVBQTNCLEVBQTRDLGdCQUE1QyxFQUE4RCxpQkFBOUQsRUFBZ0Y7Z0NBRHJFLGlCQUNxRTs7QUFDOUUsZUFBSyxjQUFMLEdBQXNCLGFBQXRCLENBRDhFO0FBRTlFLGVBQUssa0JBQUwsR0FBMEIsaUJBQTFCLENBRjhFO0FBRzlFLGVBQUssaUJBQUwsR0FBeUIsZ0JBQXpCLENBSDhFO0FBSTlFLGVBQUssZ0JBQUwsR0FBd0IsZUFBeEIsQ0FKOEU7U0FBaEY7O0FBRFcsa0NBZ0JYLDZCQUFTLFdBQVU7QUFFakIsY0FBSSxLQUFLLGdCQUFMLEVBQXNCO0FBQ3hCLGdCQUFJLHNCQUFzQixtQkFBbUIsWUFBbkIsQ0FBZ0MsS0FBSyxpQkFBTCxDQUF1QixNQUF2QixDQUE4QixLQUFLLGdCQUFMLENBQXNCLGFBQXRCLENBQTlELENBQXRCLENBRG9CO0FBRXhCLGdCQUFJLE1BQU0sTUFBTSxLQUFLLGdCQUFMLENBQXNCLGFBQXRCLEdBQXNDLGVBQWUsWUFBZixDQUE0QixtQkFBNUIsQ0FBNUMsQ0FGYztBQUd4QixnQkFBSSxFQUFFLE1BQUYsQ0FBUyxLQUFLLGtCQUFMLENBQXdCLEtBQXhCLEVBQThCO3FCQUFHLGFBQWEsT0FBYixDQUFxQixFQUFFLEdBQUYsRUFBTyxHQUE1QjthQUFILENBQXZDLENBQTRFLE1BQTVFLEtBQXFGLENBQXJGLEVBQXVGO0FBQ3pGLG1CQUFLLGtCQUFMLENBQXdCLEdBQXhCLENBQTRCLEdBQTVCLEVBQWlDLEtBQUssZ0JBQUwsQ0FBc0IsS0FBdEIsRUFBNkIsS0FBSyxnQkFBTCxDQUFzQixhQUF0QixFQUFxQyxtQkFBbkcsRUFBd0gsSUFBSSxJQUFKLEVBQXhILEVBRHlGO2FBQTNGLE1BR0ssSUFBSSxDQUFDLGFBQWEsT0FBYixDQUFxQixHQUFyQixFQUF5QixLQUFLLGdCQUFMLENBQXNCLEtBQXRCLENBQTFCLEVBQXdEO0FBQy9ELG1CQUFLLGtCQUFMLENBQXdCLE1BQXhCLENBQStCLEdBQS9CLEVBQW1DLElBQUksSUFBSixFQUFuQyxFQUQrRDthQUE1RDtXQU5QOztBQVlBLGNBQUksb0JBQW9CLGVBQWUsWUFBZixDQUE0QixVQUFVLEtBQVYsQ0FBaEQsQ0FkYTtBQWVqQixjQUFJLHNCQUFzQixtQkFBbUIsWUFBbkIsQ0FBZ0MsS0FBSyxpQkFBTCxDQUF1QixNQUF2QixDQUE4QixVQUFVLGFBQVYsQ0FBOUQsQ0FBdEIsQ0FmYTtBQWdCakIsK0JBQWtCLGlJQUFsQjs7Ozs7Ozs7Ozs7O2dCQUFTOztBQUNQLGlCQUFLLGlCQUFMLENBQXVCLE1BQXZCLENBQThCLE1BQU0sR0FBTixDQUE5QjtXQURGLHNCQUVrQixzSUFBbEI7Ozs7Ozs7Ozs7OztnQkFBUzs7QUFDUCxpQkFBSyxpQkFBTCxDQUF1QixHQUF2QixDQUEyQixNQUFNLEdBQU4sRUFBVSxNQUFNLEtBQU4sQ0FBckM7V0FERjtBQUlBLGNBQUksRUFBRSxNQUFGLENBQVMsS0FBSyxrQkFBTCxDQUF3QixLQUF4QixFQUE4QjttQkFBRyxhQUFhLE9BQWIsQ0FBcUIsRUFBRSxHQUFGLEVBQU8sVUFBVSxLQUFWO1dBQS9CLENBQXZDLENBQXdGLE1BQXhGLEtBQWlHLENBQWpHLEVBQW1HO0FBQ3JHLGlCQUFLLGtCQUFMLENBQXdCLEdBQXhCLENBQTRCLFVBQVUsS0FBVixFQUFpQixVQUFVLEtBQVYsRUFBaUIsVUFBVSxhQUFWLEVBQXlCLEtBQUssaUJBQUwsQ0FBdUIsTUFBdkIsQ0FBOEIsVUFBVSxhQUFWLENBQXJILEVBQStJLElBQUksSUFBSixFQUEvSSxFQURxRztXQUF2Rzs7QUFJQSxlQUFLLGdCQUFMLEdBQXdCLFNBQXhCLENBMUJpQjtBQTJCakIsZUFBSyxjQUFMLENBQW9CLFFBQXBCLENBQTZCLFVBQVUsS0FBVixDQUE3QixDQTNCaUI7OztxQkFoQlI7OzhCQVNZO0FBQ3JCLG1CQUFPLEtBQUssYUFBTCxDQURjOzs0QkFHRixPQUFPO0FBQzFCLGlCQUFLLGFBQUwsR0FBcUIsS0FBckIsQ0FEMEI7Ozs7ZUFaakIiLCJmaWxlIjoibmF2aWdhdG9yL3BlcmlzY29wZS1yb3V0ZXIuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
