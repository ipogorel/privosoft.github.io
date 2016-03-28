'use strict';

System.register(['./widget-behavior', '../events/widget-event-message'], function (_export, _context) {
  var WidgetBehavior, WidgetEventMessage, DataActivatedBehavior;

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
    setters: [function (_widgetBehavior) {
      WidgetBehavior = _widgetBehavior.WidgetBehavior;
    }, function (_eventsWidgetEventMessage) {
      WidgetEventMessage = _eventsWidgetEventMessage.WidgetEventMessage;
    }],
    execute: function () {
      _export('DataActivatedBehavior', DataActivatedBehavior = function (_WidgetBehavior) {
        _inherits(DataActivatedBehavior, _WidgetBehavior);

        function DataActivatedBehavior(chanel, eventAggregator) {
          _classCallCheck(this, DataActivatedBehavior);

          var _this = _possibleConstructorReturn(this, _WidgetBehavior.call(this));

          _this._chanel = chanel;
          _this._eventAggregator = eventAggregator;
          return _this;
        }

        DataActivatedBehavior.prototype.attachToWidget = function attachToWidget(widget) {
          _WidgetBehavior.prototype.attachToWidget.call(this, widget);
          var me = this;

          widget.dataActivated = function (currentRecord) {
            var message = new WidgetEventMessage(me.widget.name);
            message.activatedData = currentRecord;
            me._eventAggregator.publish(me._chanel, message);
          };
        };

        DataActivatedBehavior.prototype.detach = function detach() {
          _WidgetBehavior.prototype.detach.call(this, dashboard);
        };

        return DataActivatedBehavior;
      }(WidgetBehavior));

      _export('DataActivatedBehavior', DataActivatedBehavior);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnYXRvci93aWRnZXRiZWhhdmlvci9kYXRhLWFjdGl2YXRlZC1iZWhhdmlvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVE7O0FBQ0E7Ozt1Q0FFSzs7O0FBQ1gsaUJBRFcscUJBQ1gsQ0FBWSxNQUFaLEVBQW9CLGVBQXBCLEVBQXFDO2dDQUQxQix1QkFDMEI7O3VEQUNuQyw0QkFEbUM7O0FBRW5DLGdCQUFLLE9BQUwsR0FBZSxNQUFmLENBRm1DO0FBR25DLGdCQUFLLGdCQUFMLEdBQXdCLGVBQXhCLENBSG1DOztTQUFyQzs7QUFEVyx3Q0FPWCx5Q0FBZSxRQUFVO0FBQ3ZCLG9DQUFNLGNBQU4sWUFBcUIsTUFBckIsRUFEdUI7QUFFdkIsY0FBSSxLQUFLLElBQUwsQ0FGbUI7O0FBSXZCLGlCQUFPLGFBQVAsR0FBd0IsVUFBUyxhQUFULEVBQXdCO0FBQzlDLGdCQUFJLFVBQVUsSUFBSSxrQkFBSixDQUF1QixHQUFHLE1BQUgsQ0FBVSxJQUFWLENBQWpDLENBRDBDO0FBRTlDLG9CQUFRLGFBQVIsR0FBd0IsYUFBeEIsQ0FGOEM7QUFHOUMsZUFBRyxnQkFBSCxDQUFvQixPQUFwQixDQUE0QixHQUFHLE9BQUgsRUFBWSxPQUF4QyxFQUg4QztXQUF4QixDQUpEOzs7QUFQZCx3Q0FrQlgsMkJBQVE7QUFDTixvQ0FBTSxNQUFOLFlBQWEsU0FBYixFQURNOzs7ZUFsQkc7UUFBOEIiLCJmaWxlIjoibmF2aWdhdG9yL3dpZGdldGJlaGF2aW9yL2RhdGEtYWN0aXZhdGVkLWJlaGF2aW9yLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
