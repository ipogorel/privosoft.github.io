'use strict';

System.register(['./widget-behavior', '../events/widget-event-message'], function (_export, _context) {
  var WidgetBehavior, WidgetEventMessage, DataSourceChangedBehavior;

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
      _export('DataSourceChangedBehavior', DataSourceChangedBehavior = function (_WidgetBehavior) {
        _inherits(DataSourceChangedBehavior, _WidgetBehavior);

        function DataSourceChangedBehavior(channel, eventAggregator) {
          _classCallCheck(this, DataSourceChangedBehavior);

          var _this = _possibleConstructorReturn(this, _WidgetBehavior.call(this));

          _this._channel = channel;
          _this._eventAggregator = eventAggregator;
          return _this;
        }

        DataSourceChangedBehavior.prototype.attachToWidget = function attachToWidget(widget) {
          _WidgetBehavior.prototype.attachToWidget.call(this, widget);
          var me = this;
          widget.dataSourceChanged = function (dataSource) {
            var message = new WidgetEventMessage(me.widget.name);
            message.dataSource = dataSource;
            me._eventAggregator.publish(me._channel, message);
          };
        };

        DataSourceChangedBehavior.prototype.detach = function detach() {
          _WidgetBehavior.prototype.detach.call(this, dashboard);
        };

        return DataSourceChangedBehavior;
      }(WidgetBehavior));

      _export('DataSourceChangedBehavior', DataSourceChangedBehavior);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnYXRvci93aWRnZXRiZWhhdmlvci9kYXRhLXNvdXJjZS1jaGFuZ2VkLWJlaGF2aW9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBUTs7QUFDQTs7OzJDQUNLOzs7QUFFWCxpQkFGVyx5QkFFWCxDQUFZLE9BQVosRUFBcUIsZUFBckIsRUFBc0M7Z0NBRjNCLDJCQUUyQjs7dURBQ3BDLDRCQURvQzs7QUFFcEMsZ0JBQUssUUFBTCxHQUFnQixPQUFoQixDQUZvQztBQUdwQyxnQkFBSyxnQkFBTCxHQUF3QixlQUF4QixDQUhvQzs7U0FBdEM7O0FBRlcsNENBUVgseUNBQWUsUUFBUTtBQUNyQixvQ0FBTSxjQUFOLFlBQXFCLE1BQXJCLEVBRHFCO0FBRXJCLGNBQUksS0FBSyxJQUFMLENBRmlCO0FBR3JCLGlCQUFPLGlCQUFQLEdBQTJCLFVBQVMsVUFBVCxFQUMzQjtBQUNFLGdCQUFJLFVBQVUsSUFBSSxrQkFBSixDQUF1QixHQUFHLE1BQUgsQ0FBVSxJQUFWLENBQWpDLENBRE47QUFFRSxvQkFBUSxVQUFSLEdBQXFCLFVBQXJCLENBRkY7QUFHRSxlQUFHLGdCQUFILENBQW9CLE9BQXBCLENBQTRCLEdBQUcsUUFBSCxFQUFhLE9BQXpDLEVBSEY7V0FEMkIsQ0FITjs7O0FBUlosNENBbUJYLDJCQUFRO0FBQ04sb0NBQU0sTUFBTixZQUFhLFNBQWIsRUFETTs7O2VBbkJHO1FBQWtDIiwiZmlsZSI6Im5hdmlnYXRvci93aWRnZXRiZWhhdmlvci9kYXRhLXNvdXJjZS1jaGFuZ2VkLWJlaGF2aW9yLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
