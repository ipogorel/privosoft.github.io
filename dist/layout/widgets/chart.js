'use strict';

System.register(['aurelia-framework', './widget', './chart-content'], function (_export, _context) {
  var customElement, inject, useView, Widget, ChartContent, _dec, _dec2, _class, Chart;

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
      customElement = _aureliaFramework.customElement;
      inject = _aureliaFramework.inject;
      useView = _aureliaFramework.useView;
    }, function (_widget) {
      Widget = _widget.Widget;
    }, function (_chartContent) {
      ChartContent = _chartContent.ChartContent;
    }],
    execute: function () {
      _export('Chart', Chart = (_dec = customElement('chart'), _dec2 = useView('./widget.html'), _dec(_class = _dec2(_class = function (_Widget) {
        _inherits(Chart, _Widget);

        function Chart(settings) {
          _classCallCheck(this, Chart);

          var _this = _possibleConstructorReturn(this, _Widget.call(this, settings));

          _this.stateType = "chartState";
          _this.initContent();
          return _this;
        }

        Chart.prototype.initContent = function initContent() {
          this.content = new ChartContent(this);
        };

        return Chart;
      }(Widget)) || _class) || _class));

      _export('Chart', Chart);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC93aWRnZXRzL2NoYXJ0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBUTtBQUFlO0FBQVE7O0FBQ3ZCOztBQUNBOzs7dUJBS0ssZ0JBRlosY0FBYyxPQUFkLFdBQ0EsUUFBUSxlQUFSO2tCQUNZOztBQUNYLGlCQURXLEtBQ1gsQ0FBWSxRQUFaLEVBQXNCO2dDQURYLE9BQ1c7O3VEQUNwQixtQkFBTSxRQUFOLEdBRG9COztBQUVwQixnQkFBSyxTQUFMLEdBQWlCLFlBQWpCLENBRm9CO0FBR3BCLGdCQUFLLFdBQUwsR0FIb0I7O1NBQXRCOztBQURXLHdCQU9YLHFDQUFjO0FBQ1osZUFBSyxPQUFMLEdBQWUsSUFBSSxZQUFKLENBQWlCLElBQWpCLENBQWYsQ0FEWTs7O2VBUEg7UUFBYyIsImZpbGUiOiJsYXlvdXQvd2lkZ2V0cy9jaGFydC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
