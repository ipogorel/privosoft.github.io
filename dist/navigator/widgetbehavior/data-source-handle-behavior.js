'use strict';

System.register(['./widget-behavior'], function (_export, _context) {
  var WidgetBehavior, DataSourceHandleBehavior;

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
      _export('DataSourceHandleBehavior', DataSourceHandleBehavior = function (_WidgetBehavior) {
        _inherits(DataSourceHandleBehavior, _WidgetBehavior);

        function DataSourceHandleBehavior(channel, eventAggregator) {
          _classCallCheck(this, DataSourceHandleBehavior);

          var _this = _possibleConstructorReturn(this, _WidgetBehavior.call(this));

          _this._channel = channel;
          _this._eventAggregator = eventAggregator;
          return _this;
        }

        DataSourceHandleBehavior.prototype.attachToWidget = function attachToWidget(widget) {
          _WidgetBehavior.prototype.attachToWidget.call(this, widget);
          var me = this;
          this.subscription = this._eventAggregator.subscribe(this._channel, function (message) {
            me.widget.dataSource = message.dataSource;
            me.widget.refresh();
          });
        };

        DataSourceHandleBehavior.prototype.detach = function detach() {
          _WidgetBehavior.prototype.detach.call(this, dashboard);
          if (this.subscription) this.subscription.dispose();
        };

        return DataSourceHandleBehavior;
      }(WidgetBehavior));

      _export('DataSourceHandleBehavior', DataSourceHandleBehavior);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnYXRvci93aWRnZXRiZWhhdmlvci9kYXRhLXNvdXJjZS1oYW5kbGUtYmVoYXZpb3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFROzs7MENBQ0s7OztBQUVYLGlCQUZXLHdCQUVYLENBQVksT0FBWixFQUFxQixlQUFyQixFQUFzQztnQ0FGM0IsMEJBRTJCOzt1REFDcEMsNEJBRG9DOztBQUVwQyxnQkFBSyxRQUFMLEdBQWdCLE9BQWhCLENBRm9DO0FBR3BDLGdCQUFLLGdCQUFMLEdBQXdCLGVBQXhCLENBSG9DOztTQUF0Qzs7QUFGVywyQ0FRWCx5Q0FBZSxRQUFPO0FBQ3BCLG9DQUFNLGNBQU4sWUFBcUIsTUFBckIsRUFEb0I7QUFFcEIsY0FBSSxLQUFLLElBQUwsQ0FGZ0I7QUFHcEIsZUFBSyxZQUFMLEdBQW9CLEtBQUssZ0JBQUwsQ0FBc0IsU0FBdEIsQ0FBZ0MsS0FBSyxRQUFMLEVBQWUsbUJBQVc7QUFDNUUsZUFBRyxNQUFILENBQVUsVUFBVixHQUF1QixRQUFRLFVBQVIsQ0FEcUQ7QUFFNUUsZUFBRyxNQUFILENBQVUsT0FBVixHQUY0RTtXQUFYLENBQW5FLENBSG9COzs7QUFSWCwyQ0FpQlgsMkJBQVE7QUFDTixvQ0FBTSxNQUFOLFlBQWEsU0FBYixFQURNO0FBRU4sY0FBSSxLQUFLLFlBQUwsRUFDRixLQUFLLFlBQUwsQ0FBa0IsT0FBbEIsR0FERjs7O2VBbkJTO1FBQWlDIiwiZmlsZSI6Im5hdmlnYXRvci93aWRnZXRiZWhhdmlvci9kYXRhLXNvdXJjZS1oYW5kbGUtYmVoYXZpb3IuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
