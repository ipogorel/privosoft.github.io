'use strict';

System.register(['./widget-behavior', '../events/widget-event-message'], function (_export, _context) {
  var WidgetBehavior, WidgetEventMessage, DataFieldSelectedBehavior;

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
      _export('DataFieldSelectedBehavior', DataFieldSelectedBehavior = function (_WidgetBehavior) {
        _inherits(DataFieldSelectedBehavior, _WidgetBehavior);

        function DataFieldSelectedBehavior(chanel, eventAggregator) {
          _classCallCheck(this, DataFieldSelectedBehavior);

          var _this = _possibleConstructorReturn(this, _WidgetBehavior.call(this));

          _this._chanel = chanel;
          _this._eventAggregator = eventAggregator;
          return _this;
        }

        DataFieldSelectedBehavior.prototype.attachToWidget = function attachToWidget(widget) {
          _WidgetBehavior.prototype.attachToWidget.call(this, widget);
          var me = this;

          widget.dataFieldSelected = function (fieldName) {
            var message = new WidgetEventMessage(me.widget.name);
            message.fieldName = fieldName;
            me._eventAggregator.publish(me._chanel, message);
          };
        };

        DataFieldSelectedBehavior.prototype.detach = function detach() {
          _WidgetBehavior.prototype.detach.call(this, dashboard);
        };

        return DataFieldSelectedBehavior;
      }(WidgetBehavior));

      _export('DataFieldSelectedBehavior', DataFieldSelectedBehavior);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnYXRvci93aWRnZXRiZWhhdmlvci9kYXRhLWZpZWxkLXNlbGVjdGVkLWJlaGF2aW9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBUTs7QUFDQTs7OzJDQUVLOzs7QUFDWCxpQkFEVyx5QkFDWCxDQUFZLE1BQVosRUFBb0IsZUFBcEIsRUFBcUM7Z0NBRDFCLDJCQUMwQjs7dURBQ25DLDRCQURtQzs7QUFFbkMsZ0JBQUssT0FBTCxHQUFlLE1BQWYsQ0FGbUM7QUFHbkMsZ0JBQUssZ0JBQUwsR0FBd0IsZUFBeEIsQ0FIbUM7O1NBQXJDOztBQURXLDRDQU9YLHlDQUFlLFFBQVU7QUFDdkIsb0NBQU0sY0FBTixZQUFxQixNQUFyQixFQUR1QjtBQUV2QixjQUFJLEtBQUssSUFBTCxDQUZtQjs7QUFJdkIsaUJBQU8saUJBQVAsR0FBNEIsVUFBUyxTQUFULEVBQW9CO0FBQzlDLGdCQUFJLFVBQVUsSUFBSSxrQkFBSixDQUF1QixHQUFHLE1BQUgsQ0FBVSxJQUFWLENBQWpDLENBRDBDO0FBRTlDLG9CQUFRLFNBQVIsR0FBb0IsU0FBcEIsQ0FGOEM7QUFHOUMsZUFBRyxnQkFBSCxDQUFvQixPQUFwQixDQUE0QixHQUFHLE9BQUgsRUFBWSxPQUF4QyxFQUg4QztXQUFwQixDQUpMOzs7QUFQZCw0Q0FrQlgsMkJBQVE7QUFDTixvQ0FBTSxNQUFOLFlBQWEsU0FBYixFQURNOzs7ZUFsQkc7UUFBa0MiLCJmaWxlIjoibmF2aWdhdG9yL3dpZGdldGJlaGF2aW9yL2RhdGEtZmllbGQtc2VsZWN0ZWQtYmVoYXZpb3IuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
