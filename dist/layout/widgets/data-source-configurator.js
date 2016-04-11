'use strict';

System.register(['aurelia-framework', './widget', './data-source-configurator-content'], function (_export, _context) {
  var useView, Widget, DataSourceConfiguratorContent, _dec, _class, DataSourceConfigurator;

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
      useView = _aureliaFramework.useView;
    }, function (_widget) {
      Widget = _widget.Widget;
    }, function (_dataSourceConfiguratorContent) {
      DataSourceConfiguratorContent = _dataSourceConfiguratorContent.DataSourceConfiguratorContent;
    }],
    execute: function () {
      _export('DataSourceConfigurator', DataSourceConfigurator = (_dec = useView('./widget.html'), _dec(_class = function (_Widget) {
        _inherits(DataSourceConfigurator, _Widget);

        function DataSourceConfigurator(settings) {
          _classCallCheck(this, DataSourceConfigurator);

          var _this = _possibleConstructorReturn(this, _Widget.call(this, settings));

          _this.stateType = "dataSourceConfiguratorState";
          _this.initContent();
          return _this;
        }

        DataSourceConfigurator.prototype.initContent = function initContent() {
          this.content = new DataSourceConfiguratorContent(this);
        };

        return DataSourceConfigurator;
      }(Widget)) || _class));

      _export('DataSourceConfigurator', DataSourceConfigurator);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC93aWRnZXRzL2RhdGEtc291cmNlLWNvbmZpZ3VyYXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVE7O0FBQ0E7O0FBQ0E7Ozt3Q0FHSyxpQ0FEWixRQUFRLGVBQVI7a0JBQ1k7O0FBQ1gsaUJBRFcsc0JBQ1gsQ0FBWSxRQUFaLEVBQXNCO2dDQURYLHdCQUNXOzt1REFDcEIsbUJBQU0sUUFBTixHQURvQjs7QUFFcEIsZ0JBQUssU0FBTCxHQUFpQiw2QkFBakIsQ0FGb0I7QUFHcEIsZ0JBQUssV0FBTCxHQUhvQjs7U0FBdEI7O0FBRFcseUNBUVgscUNBQWM7QUFDWixlQUFLLE9BQUwsR0FBZSxJQUFJLDZCQUFKLENBQWtDLElBQWxDLENBQWYsQ0FEWTs7O2VBUkg7UUFBK0IiLCJmaWxlIjoibGF5b3V0L3dpZGdldHMvZGF0YS1zb3VyY2UtY29uZmlndXJhdG9yLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
