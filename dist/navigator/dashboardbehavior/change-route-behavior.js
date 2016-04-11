'use strict';

System.register(['./dashboard-behavior', 'aurelia-event-aggregator'], function (_export, _context) {
  var DashboardBehavior, EventAggregator, ChangeRouteBehavior;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_dashboardBehavior) {
      DashboardBehavior = _dashboardBehavior.DashboardBehavior;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }],
    execute: function () {
      _export('ChangeRouteBehavior', ChangeRouteBehavior = function (_DashboardBehavior) {
        _inherits(ChangeRouteBehavior, _DashboardBehavior);

        function ChangeRouteBehavior(settings) {
          _classCallCheck(this, ChangeRouteBehavior);

          var _this = _possibleConstructorReturn(this, _DashboardBehavior.call(this));

          _this._chanel = settings.chanel;
          _this._eventAggregator = settings.eventAggregator;

          _this._newRoute = settings.newRoute;
          _this._router = settings.router;
          _this._paramsMapper = settings.paramsMapper;
          return _this;
        }

        ChangeRouteBehavior.prototype.attach = function attach(dashboard) {
          _DashboardBehavior.prototype.attach.call(this, dashboard);
          var me = this;
          this.subscription = this._eventAggregator.subscribe(this._chanel, function (message) {
            var params = me._paramsMapper ? me._paramsMapper(message) : "";
            if (params !== "" && params.indexOf("?") != 0) params = "?" + params;
            var navItem = {
              route: me._newRoute.route + (params !== "" ? params : ""),
              title: me._newRoute.title,
              dashboardName: me._newRoute.dashboardName
            };
            me._router.navigate(navItem);
          });
        };

        ChangeRouteBehavior.prototype.detach = function detach() {
          _DashboardBehavior.prototype.detach.call(this, dashboard);
          if (this.subscription) this.subscription.dispose();
        };

        return ChangeRouteBehavior;
      }(DashboardBehavior));

      _export('ChangeRouteBehavior', ChangeRouteBehavior);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnYXRvci9kYXNoYm9hcmRiZWhhdmlvci9jaGFuZ2Utcm91dGUtYmVoYXZpb3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFROztBQUNBOzs7cUNBR0s7OztBQUNYLGlCQURXLG1CQUNYLENBQVksUUFBWixFQUFzQjtnQ0FEWCxxQkFDVzs7dURBQ3BCLCtCQURvQjs7QUFFcEIsZ0JBQUssT0FBTCxHQUFlLFNBQVMsTUFBVCxDQUZLO0FBR3BCLGdCQUFLLGdCQUFMLEdBQXdCLFNBQVMsZUFBVCxDQUhKOztBQU1wQixnQkFBSyxTQUFMLEdBQWlCLFNBQVMsUUFBVCxDQU5HO0FBT3BCLGdCQUFLLE9BQUwsR0FBZSxTQUFTLE1BQVQsQ0FQSztBQVFwQixnQkFBSyxhQUFMLEdBQXFCLFNBQVMsWUFBVCxDQVJEOztTQUF0Qjs7QUFEVyxzQ0FZWCx5QkFBTyxXQUFXO0FBQ2hCLHVDQUFNLE1BQU4sWUFBYSxTQUFiLEVBRGdCO0FBRWhCLGNBQUksS0FBSyxJQUFMLENBRlk7QUFHaEIsZUFBSyxZQUFMLEdBQW9CLEtBQUssZ0JBQUwsQ0FBc0IsU0FBdEIsQ0FBZ0MsS0FBSyxPQUFMLEVBQWMsbUJBQVc7QUFDM0UsZ0JBQUksU0FBUyxHQUFHLGFBQUgsR0FBbUIsR0FBRyxhQUFILENBQWlCLE9BQWpCLENBQW5CLEdBQStDLEVBQS9DLENBRDhEO0FBRTNFLGdCQUFJLE1BQUMsS0FBUyxFQUFULElBQWUsT0FBTyxPQUFQLENBQWUsR0FBZixLQUFxQixDQUFyQixFQUNsQixTQUFPLE1BQU0sTUFBTixDQURUO0FBRUEsZ0JBQUksVUFBVTtBQUVWLHFCQUFPLEdBQUcsU0FBSCxDQUFhLEtBQWIsSUFBc0IsV0FBUyxFQUFULEdBQWEsTUFBYixHQUFzQixFQUF0QixDQUF0QjtBQUNQLHFCQUFPLEdBQUcsU0FBSCxDQUFhLEtBQWI7QUFDUCw2QkFBZSxHQUFHLFNBQUgsQ0FBYSxhQUFiO2FBSmYsQ0FKdUU7QUFVM0UsZUFBRyxPQUFILENBQVcsUUFBWCxDQUFvQixPQUFwQixFQVYyRTtXQUFYLENBQWxFLENBSGdCOzs7QUFaUCxzQ0E2QlgsMkJBQVE7QUFDTix1Q0FBTSxNQUFOLFlBQWEsU0FBYixFQURNO0FBRU4sY0FBSSxLQUFLLFlBQUwsRUFDRixLQUFLLFlBQUwsQ0FBa0IsT0FBbEIsR0FERjs7O2VBL0JTO1FBQTRCIiwiZmlsZSI6Im5hdmlnYXRvci9kYXNoYm9hcmRiZWhhdmlvci9jaGFuZ2Utcm91dGUtYmVoYXZpb3IuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
