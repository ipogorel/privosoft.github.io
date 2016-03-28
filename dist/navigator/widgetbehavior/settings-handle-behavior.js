'use strict';

System.register(['./widget-behavior'], function (_export, _context) {
  var WidgetBehavior, SettingsHandleBehavior;

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
    }],
    execute: function () {
      _export('SettingsHandleBehavior', SettingsHandleBehavior = function (_WidgetBehavior) {
        _inherits(SettingsHandleBehavior, _WidgetBehavior);

        function SettingsHandleBehavior(channel, eventAggregator, messageMapper) {
          _classCallCheck(this, SettingsHandleBehavior);

          var _this = _possibleConstructorReturn(this, _WidgetBehavior.call(this));

          _this._channel = channel;
          _this._eventAggregator = eventAggregator;
          _this._messageMapper = messageMapper;
          return _this;
        }

        SettingsHandleBehavior.prototype.attachToWidget = function attachToWidget(widget) {
          _WidgetBehavior.prototype.attachToWidget.call(this, widget);
          var me = this;
          this.subscription = this._eventAggregator.subscribe(this._channel, function (message) {
            var settingsToApply = me._messageMapper ? me._messageMapper(message) : message;
            me.widget.changeSettings(settingsToApply);
          });
        };

        SettingsHandleBehavior.prototype.detach = function detach() {
          _WidgetBehavior.prototype.detach.call(this, dashboard);
          if (this.subscription) this.subscription.dispose();
        };

        return SettingsHandleBehavior;
      }(WidgetBehavior));

      _export('SettingsHandleBehavior', SettingsHandleBehavior);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnYXRvci93aWRnZXRiZWhhdmlvci9zZXR0aW5ncy1oYW5kbGUtYmVoYXZpb3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFROzs7d0NBQ0s7OztBQUVYLGlCQUZXLHNCQUVYLENBQVksT0FBWixFQUFxQixlQUFyQixFQUFzQyxhQUF0QyxFQUFxRDtnQ0FGMUMsd0JBRTBDOzt1REFDbkQsNEJBRG1EOztBQUVuRCxnQkFBSyxRQUFMLEdBQWdCLE9BQWhCLENBRm1EO0FBR25ELGdCQUFLLGdCQUFMLEdBQXdCLGVBQXhCLENBSG1EO0FBSW5ELGdCQUFLLGNBQUwsR0FBc0IsYUFBdEIsQ0FKbUQ7O1NBQXJEOztBQUZXLHlDQVNYLHlDQUFlLFFBQU87QUFDcEIsb0NBQU0sY0FBTixZQUFxQixNQUFyQixFQURvQjtBQUVwQixjQUFJLEtBQUssSUFBTCxDQUZnQjtBQUdwQixlQUFLLFlBQUwsR0FBb0IsS0FBSyxnQkFBTCxDQUFzQixTQUF0QixDQUFnQyxLQUFLLFFBQUwsRUFBZSxtQkFBVztBQUM1RSxnQkFBSSxrQkFBa0IsR0FBRyxjQUFILEdBQW9CLEdBQUcsY0FBSCxDQUFrQixPQUFsQixDQUFwQixHQUFpRCxPQUFqRCxDQURzRDtBQUU1RSxlQUFHLE1BQUgsQ0FBVSxjQUFWLENBQXlCLGVBQXpCLEVBRjRFO1dBQVgsQ0FBbkUsQ0FIb0I7OztBQVRYLHlDQW1CWCwyQkFBUTtBQUNOLG9DQUFNLE1BQU4sWUFBYSxTQUFiLEVBRE07QUFFTixjQUFJLEtBQUssWUFBTCxFQUNGLEtBQUssWUFBTCxDQUFrQixPQUFsQixHQURGOzs7ZUFyQlM7UUFBK0IiLCJmaWxlIjoibmF2aWdhdG9yL3dpZGdldGJlaGF2aW9yL3NldHRpbmdzLWhhbmRsZS1iZWhhdmlvci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
