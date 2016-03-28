'use strict';

System.register(['layout/infrastructure/widget-factory', './dashboard-behavior'], function (_export, _context) {
  var WidgetFactory, DashboardBehavior, ReplaceWidgetBehavior;

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
    setters: [function (_layoutInfrastructureWidgetFactory) {
      WidgetFactory = _layoutInfrastructureWidgetFactory.WidgetFactory;
    }, function (_dashboardBehavior) {
      DashboardBehavior = _dashboardBehavior.DashboardBehavior;
    }],
    execute: function () {
      _export('ReplaceWidgetBehavior', ReplaceWidgetBehavior = function (_DashboardBehavior) {
        _inherits(ReplaceWidgetBehavior, _DashboardBehavior);

        function ReplaceWidgetBehavior(chanel, eventAggregator, widgetFactory, widgetToReplaceName, widgetType, widgetSettings, mapper) {
          _classCallCheck(this, ReplaceWidgetBehavior);

          var _this = _possibleConstructorReturn(this, _DashboardBehavior.call(this));

          _this._chanel = chanel;
          _this._widgetType = widgetType;
          _this._widgetSettings = widgetSettings;
          _this._eventAggregator = eventAggregator;
          _this._widgetFactory = widgetFactory;
          _this._widgetToReplaceName = widgetToReplaceName;
          _this._mapper = mapper;
          return _this;
        }

        ReplaceWidgetBehavior.prototype.attach = function attach(dashboard) {
          _DashboardBehavior.prototype.attach.call(this, dashboard);
          var me = this;
          this.subscription = this._eventAggregator.subscribe(this._chanel, function (message) {
            var originatorWidget = dashboard.getWidgetByName(me._widgetToReplaceName);
            var w = me._widgetFactory.createWidget(me._widgetType, me._widgetSettings);
            w.navigationStack.push(originatorWidget);
            dashboard.replaceWidget(originatorWidget, w);
            if (me._mapper) w.dataFilter = me._mapper(message);
            w.refresh();
          });
        };

        ReplaceWidgetBehavior.prototype.detach = function detach() {
          _DashboardBehavior.prototype.detach.call(this, dashboard);
          if (this.subscription) this.subscription.dispose();
        };

        return ReplaceWidgetBehavior;
      }(DashboardBehavior));

      _export('ReplaceWidgetBehavior', ReplaceWidgetBehavior);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnYXRvci9kYXNoYm9hcmRiZWhhdmlvci9yZXBsYWNlLXdpZGdldC1iZWhhdmlvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVE7O0FBQ0E7Ozt1Q0FFSzs7O0FBRVgsaUJBRlcscUJBRVgsQ0FBWSxNQUFaLEVBQW9CLGVBQXBCLEVBQXFDLGFBQXJDLEVBQW9ELG1CQUFwRCxFQUF5RSxVQUF6RSxFQUFxRixjQUFyRixFQUFxRyxNQUFyRyxFQUE2RztnQ0FGbEcsdUJBRWtHOzt1REFDM0csK0JBRDJHOztBQUUzRyxnQkFBSyxPQUFMLEdBQWUsTUFBZixDQUYyRztBQUczRyxnQkFBSyxXQUFMLEdBQW1CLFVBQW5CLENBSDJHO0FBSTNHLGdCQUFLLGVBQUwsR0FBdUIsY0FBdkIsQ0FKMkc7QUFLM0csZ0JBQUssZ0JBQUwsR0FBd0IsZUFBeEIsQ0FMMkc7QUFNM0csZ0JBQUssY0FBTCxHQUFzQixhQUF0QixDQU4yRztBQU8zRyxnQkFBSyxvQkFBTCxHQUE0QixtQkFBNUIsQ0FQMkc7QUFRM0csZ0JBQUssT0FBTCxHQUFlLE1BQWYsQ0FSMkc7O1NBQTdHOztBQUZXLHdDQWFYLHlCQUFPLFdBQVU7QUFDZix1Q0FBTSxNQUFOLFlBQWEsU0FBYixFQURlO0FBRWYsY0FBSSxLQUFLLElBQUwsQ0FGVztBQUdmLGVBQUssWUFBTCxHQUFvQixLQUFLLGdCQUFMLENBQXNCLFNBQXRCLENBQWdDLEtBQUssT0FBTCxFQUFjLG1CQUFXO0FBQzNFLGdCQUFJLG1CQUFtQixVQUFVLGVBQVYsQ0FBMEIsR0FBRyxvQkFBSCxDQUE3QyxDQUR1RTtBQUUzRSxnQkFBSSxJQUFJLEdBQUcsY0FBSCxDQUFrQixZQUFsQixDQUErQixHQUFHLFdBQUgsRUFBZ0IsR0FBRyxlQUFILENBQW5ELENBRnVFO0FBRzNFLGNBQUUsZUFBRixDQUFrQixJQUFsQixDQUF1QixnQkFBdkIsRUFIMkU7QUFJM0Usc0JBQVUsYUFBVixDQUF3QixnQkFBeEIsRUFBMEMsQ0FBMUMsRUFKMkU7QUFLM0UsZ0JBQUksR0FBRyxPQUFILEVBQ0YsRUFBRSxVQUFGLEdBQWdCLEdBQUcsT0FBSCxDQUFXLE9BQVgsQ0FBaEIsQ0FERjtBQUVBLGNBQUUsT0FBRixHQVAyRTtXQUFYLENBQWxFLENBSGU7OztBQWJOLHdDQTJCWCwyQkFBUTtBQUNOLHVDQUFNLE1BQU4sWUFBYSxTQUFiLEVBRE07QUFFTixjQUFJLEtBQUssWUFBTCxFQUNGLEtBQUssWUFBTCxDQUFrQixPQUFsQixHQURGOzs7ZUE3QlM7UUFBOEIiLCJmaWxlIjoibmF2aWdhdG9yL2Rhc2hib2FyZGJlaGF2aW9yL3JlcGxhY2Utd2lkZ2V0LWJlaGF2aW9yLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
