'use strict';

System.register(['./widget-behavior'], function (_export, _context) {
  var WidgetBehavior, DataFilterHandleBehavior;

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
      _export('DataFilterHandleBehavior', DataFilterHandleBehavior = function (_WidgetBehavior) {
        _inherits(DataFilterHandleBehavior, _WidgetBehavior);

        function DataFilterHandleBehavior(channel, eventAggregator, filterMapper) {
          _classCallCheck(this, DataFilterHandleBehavior);

          var _this = _possibleConstructorReturn(this, _WidgetBehavior.call(this));

          _this._channel = channel;
          _this._eventAggregator = eventAggregator;
          _this._filterMapper = filterMapper;
          return _this;
        }

        DataFilterHandleBehavior.prototype.attachToWidget = function attachToWidget(widget) {
          _WidgetBehavior.prototype.attachToWidget.call(this, widget);
          var me = this;
          this.subscription = this._eventAggregator.subscribe(this._channel, function (message) {
            var filterToApply = me._filterMapper ? me._filterMapper(message) : message.dataFilter;
            me.widget.dataFilter = filterToApply;
            me.widget.refresh();
          });
        };

        DataFilterHandleBehavior.prototype.detach = function detach() {
          _WidgetBehavior.prototype.detach.call(this, dashboard);
          if (this.subscription) this.subscription.dispose();
        };

        return DataFilterHandleBehavior;
      }(WidgetBehavior));

      _export('DataFilterHandleBehavior', DataFilterHandleBehavior);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnYXRvci93aWRnZXRiZWhhdmlvci9kYXRhLWZpbHRlci1oYW5kbGUtYmVoYXZpb3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFROzs7MENBQ0s7OztBQUVYLGlCQUZXLHdCQUVYLENBQVksT0FBWixFQUFxQixlQUFyQixFQUFzQyxZQUF0QyxFQUFvRDtnQ0FGekMsMEJBRXlDOzt1REFDbEQsNEJBRGtEOztBQUVsRCxnQkFBSyxRQUFMLEdBQWdCLE9BQWhCLENBRmtEO0FBR2xELGdCQUFLLGdCQUFMLEdBQXdCLGVBQXhCLENBSGtEO0FBSWxELGdCQUFLLGFBQUwsR0FBcUIsWUFBckIsQ0FKa0Q7O1NBQXBEOztBQUZXLDJDQVNYLHlDQUFlLFFBQU87QUFDcEIsb0NBQU0sY0FBTixZQUFxQixNQUFyQixFQURvQjtBQUVwQixjQUFJLEtBQUssSUFBTCxDQUZnQjtBQUdwQixlQUFLLFlBQUwsR0FBb0IsS0FBSyxnQkFBTCxDQUFzQixTQUF0QixDQUFnQyxLQUFLLFFBQUwsRUFBZSxtQkFBVztBQUM1RSxnQkFBSSxnQkFBZ0IsR0FBRyxhQUFILEdBQW1CLEdBQUcsYUFBSCxDQUFpQixPQUFqQixDQUFuQixHQUErQyxRQUFRLFVBQVIsQ0FEUztBQUU1RSxlQUFHLE1BQUgsQ0FBVSxVQUFWLEdBQXVCLGFBQXZCLENBRjRFO0FBRzVFLGVBQUcsTUFBSCxDQUFVLE9BQVYsR0FINEU7V0FBWCxDQUFuRSxDQUhvQjs7O0FBVFgsMkNBbUJYLDJCQUFRO0FBQ04sb0NBQU0sTUFBTixZQUFhLFNBQWIsRUFETTtBQUVOLGNBQUksS0FBSyxZQUFMLEVBQ0YsS0FBSyxZQUFMLENBQWtCLE9BQWxCLEdBREY7OztlQXJCUztRQUFpQyIsImZpbGUiOiJuYXZpZ2F0b3Ivd2lkZ2V0YmVoYXZpb3IvZGF0YS1maWx0ZXItaGFuZGxlLWJlaGF2aW9yLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
