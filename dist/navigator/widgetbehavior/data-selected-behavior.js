'use strict';

System.register(['./widget-behavior', '../events/widget-event-message'], function (_export, _context) {
  var WidgetBehavior, WidgetEventMessage, DataSelectedBehavior;

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
      _export('DataSelectedBehavior', DataSelectedBehavior = function (_WidgetBehavior) {
        _inherits(DataSelectedBehavior, _WidgetBehavior);

        function DataSelectedBehavior(chanel, eventAggregator) {
          _classCallCheck(this, DataSelectedBehavior);

          var _this = _possibleConstructorReturn(this, _WidgetBehavior.call(this));

          _this._chanel = chanel;
          _this._eventAggregator = eventAggregator;
          return _this;
        }

        DataSelectedBehavior.prototype.attachToWidget = function attachToWidget(widget) {
          _WidgetBehavior.prototype.attachToWidget.call(this, widget);
          var me = this;

          widget.dataSelected = function (currentRecord) {
            var message = new WidgetEventMessage(me.widget.name);
            message.selectedData = currentRecord;
            me._eventAggregator.publish(me._chanel, message);
          };
        };

        DataSelectedBehavior.prototype.detach = function detach() {
          _WidgetBehavior.prototype.detach.call(this, dashboard);
        };

        return DataSelectedBehavior;
      }(WidgetBehavior));

      _export('DataSelectedBehavior', DataSelectedBehavior);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnYXRvci93aWRnZXRiZWhhdmlvci9kYXRhLXNlbGVjdGVkLWJlaGF2aW9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBUTs7QUFDQTs7O3NDQUVLOzs7QUFDWCxpQkFEVyxvQkFDWCxDQUFZLE1BQVosRUFBb0IsZUFBcEIsRUFBcUM7Z0NBRDFCLHNCQUMwQjs7dURBQ25DLDRCQURtQzs7QUFFbkMsZ0JBQUssT0FBTCxHQUFlLE1BQWYsQ0FGbUM7QUFHbkMsZ0JBQUssZ0JBQUwsR0FBd0IsZUFBeEIsQ0FIbUM7O1NBQXJDOztBQURXLHVDQU9YLHlDQUFlLFFBQVU7QUFDdkIsb0NBQU0sY0FBTixZQUFxQixNQUFyQixFQUR1QjtBQUV2QixjQUFJLEtBQUssSUFBTCxDQUZtQjs7QUFJdkIsaUJBQU8sWUFBUCxHQUF1QixVQUFTLGFBQVQsRUFBd0I7QUFDN0MsZ0JBQUksVUFBVSxJQUFJLGtCQUFKLENBQXVCLEdBQUcsTUFBSCxDQUFVLElBQVYsQ0FBakMsQ0FEeUM7QUFFN0Msb0JBQVEsWUFBUixHQUF1QixhQUF2QixDQUY2QztBQUc3QyxlQUFHLGdCQUFILENBQW9CLE9BQXBCLENBQTRCLEdBQUcsT0FBSCxFQUFZLE9BQXhDLEVBSDZDO1dBQXhCLENBSkE7OztBQVBkLHVDQWtCWCwyQkFBUTtBQUNOLG9DQUFNLE1BQU4sWUFBYSxTQUFiLEVBRE07OztlQWxCRztRQUE2QiIsImZpbGUiOiJuYXZpZ2F0b3Ivd2lkZ2V0YmVoYXZpb3IvZGF0YS1zZWxlY3RlZC1iZWhhdmlvci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
