'use strict';

System.register(['aurelia-framework', 'aurelia-event-aggregator', 'layout/infrastructure/widget-factory', './dashboard-behavior'], function (_export, _context) {
  var Container, EventAggregator, WidgetFactory, DashboardBehavior, CreateWidgetBehavior;

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
    setters: [function (_aureliaFramework) {
      Container = _aureliaFramework.Container;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_layoutInfrastructureWidgetFactory) {
      WidgetFactory = _layoutInfrastructureWidgetFactory.WidgetFactory;
    }, function (_dashboardBehavior) {
      DashboardBehavior = _dashboardBehavior.DashboardBehavior;
    }],
    execute: function () {
      _export('CreateWidgetBehavior', CreateWidgetBehavior = function (_DashboardBehavior) {
        _inherits(CreateWidgetBehavior, _DashboardBehavior);

        function CreateWidgetBehavior(chanel, widgetType, widgetSettings, widgetDimensions, eventAggregator, widgetFactory, filterMapper) {
          _classCallCheck(this, CreateWidgetBehavior);

          var _this = _possibleConstructorReturn(this, _DashboardBehavior.call(this));

          _this._chanel = chanel;
          _this._widgetType = widgetType;
          _this._widgetSettings = widgetSettings;
          _this._widgetDimensions = widgetDimensions;
          _this._eventAggregator = eventAggregator;
          _this._widgetFactory = widgetFactory;
          _this._filterMapper = filterMapper;
          return _this;
        }

        CreateWidgetBehavior.prototype.attach = function attach(dashboard) {
          var _this2 = this;

          _DashboardBehavior.prototype.attach.call(this, dashboard);
          var me = this;
          this.subscription = this._eventAggregator.subscribe(this._chanel, function (message) {
            var w = dashboard.getWidgetByName(me._widgetSettings.name);
            if (!w) {
              var w = _this2._widgetFactory.createWidget(me._widgetType, me._widgetSettings);
              dashboard.addWidget(w, _this2._widgetDimensions);
            }
            w.dataFilter = me._filterMapper ? me._filterMapper(message) : "";
            w.refresh();
          });
        };

        CreateWidgetBehavior.prototype.detach = function detach() {
          _DashboardBehavior.prototype.detach.call(this, dashboard);
          if (this.subscription) this.subscription.dispose();
        };

        return CreateWidgetBehavior;
      }(DashboardBehavior));

      _export('CreateWidgetBehavior', CreateWidgetBehavior);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnYXRvci9kYXNoYm9hcmRiZWhhdmlvci9jcmVhdGUtd2lkZ2V0LWJlaGF2aW9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBUTs7QUFDQTs7QUFDQTs7QUFDQTs7O3NDQUVLOzs7QUFFWCxpQkFGVyxvQkFFWCxDQUFZLE1BQVosRUFBb0IsVUFBcEIsRUFBZ0MsY0FBaEMsRUFBZ0QsZ0JBQWhELEVBQWtFLGVBQWxFLEVBQW1GLGFBQW5GLEVBQWtHLFlBQWxHLEVBQWdIO2dDQUZyRyxzQkFFcUc7O3VEQUM5RywrQkFEOEc7O0FBRTlHLGdCQUFLLE9BQUwsR0FBZSxNQUFmLENBRjhHO0FBRzlHLGdCQUFLLFdBQUwsR0FBbUIsVUFBbkIsQ0FIOEc7QUFJOUcsZ0JBQUssZUFBTCxHQUF1QixjQUF2QixDQUo4RztBQUs5RyxnQkFBSyxpQkFBTCxHQUF5QixnQkFBekIsQ0FMOEc7QUFNOUcsZ0JBQUssZ0JBQUwsR0FBd0IsZUFBeEIsQ0FOOEc7QUFPOUcsZ0JBQUssY0FBTCxHQUFzQixhQUF0QixDQVA4RztBQVE5RyxnQkFBSyxhQUFMLEdBQXFCLFlBQXJCLENBUjhHOztTQUFoSDs7QUFGVyx1Q0FhWCx5QkFBTyxXQUFVOzs7QUFDZix1Q0FBTSxNQUFOLFlBQWEsU0FBYixFQURlO0FBRWYsY0FBSSxLQUFLLElBQUwsQ0FGVztBQUdmLGVBQUssWUFBTCxHQUFvQixLQUFLLGdCQUFMLENBQXNCLFNBQXRCLENBQWdDLEtBQUssT0FBTCxFQUFjLG1CQUFXO0FBRTNFLGdCQUFJLElBQUksVUFBVSxlQUFWLENBQTBCLEdBQUcsZUFBSCxDQUFtQixJQUFuQixDQUE5QixDQUZ1RTtBQUczRSxnQkFBRyxDQUFDLENBQUQsRUFBRztBQUNKLGtCQUFJLElBQUksT0FBSyxjQUFMLENBQW9CLFlBQXBCLENBQWlDLEdBQUcsV0FBSCxFQUFnQixHQUFHLGVBQUgsQ0FBckQsQ0FEQTtBQUVKLHdCQUFVLFNBQVYsQ0FBb0IsQ0FBcEIsRUFBdUIsT0FBSyxpQkFBTCxDQUF2QixDQUZJO2FBQU47QUFJQSxjQUFFLFVBQUYsR0FBZ0IsR0FBRyxhQUFILEdBQW1CLEdBQUcsYUFBSCxDQUFpQixPQUFqQixDQUFuQixHQUErQyxFQUEvQyxDQVAyRDtBQVEzRSxjQUFFLE9BQUYsR0FSMkU7V0FBWCxDQUFsRSxDQUhlOzs7QUFiTix1Q0E2QlgsMkJBQVE7QUFDTix1Q0FBTSxNQUFOLFlBQWEsU0FBYixFQURNO0FBRU4sY0FBSSxLQUFLLFlBQUwsRUFDRixLQUFLLFlBQUwsQ0FBa0IsT0FBbEIsR0FERjs7O2VBL0JTO1FBQTZCIiwiZmlsZSI6Im5hdmlnYXRvci9kYXNoYm9hcmRiZWhhdmlvci9jcmVhdGUtd2lkZ2V0LWJlaGF2aW9yLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
