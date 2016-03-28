'use strict';

System.register(['./widget-behavior', '../events/widget-event-message'], function (_export, _context) {
  var WidgetBehavior, WidgetEventMessage, BackButtonPressedBehavior;

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
      _export('BackButtonPressedBehavior', BackButtonPressedBehavior = function (_WidgetBehavior) {
        _inherits(BackButtonPressedBehavior, _WidgetBehavior);

        function BackButtonPressedBehavior(eventAggregator) {
          _classCallCheck(this, BackButtonPressedBehavior);

          var _this = _possibleConstructorReturn(this, _WidgetBehavior.call(this));

          _this._eventAggregator = eventAggregator;
          return _this;
        }

        BackButtonPressedBehavior.prototype.attachToWidget = function attachToWidget(widget) {
          _WidgetBehavior.prototype.attachToWidget.call(this, widget);
          var me = this;
          widget.backButtonPressed = function (navigationStack) {
            var message = new WidgetEventMessage(me.widget.name);
            message.navigationStack = navigationStack;
            me._eventAggregator.publish("widget-back-button-channel", message);
          };
        };

        BackButtonPressedBehavior.prototype.detach = function detach() {
          _WidgetBehavior.prototype.detach.call(this, dashboard);
        };

        return BackButtonPressedBehavior;
      }(WidgetBehavior));

      _export('BackButtonPressedBehavior', BackButtonPressedBehavior);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnYXRvci93aWRnZXRiZWhhdmlvci9iYWNrLWJ1dHRvbi1wcmVzc2VkLWJlaGF2aW9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBUTs7QUFDQTs7OzJDQUVLOzs7QUFDWCxpQkFEVyx5QkFDWCxDQUFZLGVBQVosRUFBNkI7Z0NBRGxCLDJCQUNrQjs7dURBQzNCLDRCQUQyQjs7QUFFM0IsZ0JBQUssZ0JBQUwsR0FBd0IsZUFBeEIsQ0FGMkI7O1NBQTdCOztBQURXLDRDQU1YLHlDQUFlLFFBQVE7QUFDckIsb0NBQU0sY0FBTixZQUFxQixNQUFyQixFQURxQjtBQUVyQixjQUFJLEtBQUssSUFBTCxDQUZpQjtBQUdyQixpQkFBTyxpQkFBUCxHQUE0QixVQUFTLGVBQVQsRUFDNUI7QUFDRSxnQkFBSSxVQUFVLElBQUksa0JBQUosQ0FBdUIsR0FBRyxNQUFILENBQVUsSUFBVixDQUFqQyxDQUROO0FBRUUsb0JBQVEsZUFBUixHQUEwQixlQUExQixDQUZGO0FBR0UsZUFBRyxnQkFBSCxDQUFvQixPQUFwQixDQUE0Qiw0QkFBNUIsRUFBMEQsT0FBMUQsRUFIRjtXQUQ0QixDQUhQOzs7QUFOWiw0Q0FpQlgsMkJBQVE7QUFDTixvQ0FBTSxNQUFOLFlBQWEsU0FBYixFQURNOzs7ZUFqQkc7UUFBa0MiLCJmaWxlIjoibmF2aWdhdG9yL3dpZGdldGJlaGF2aW9yL2JhY2stYnV0dG9uLXByZXNzZWQtYmVoYXZpb3IuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
