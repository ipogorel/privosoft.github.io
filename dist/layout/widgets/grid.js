'use strict';

System.register(['aurelia-framework', './widget', './grid-content'], function (_export, _context) {
  var Decorators, customElement, bindable, inject, useView, noView, Widget, GridContent, _dec, _dec2, _class, Grid;

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
      Decorators = _aureliaFramework.Decorators;
      customElement = _aureliaFramework.customElement;
      bindable = _aureliaFramework.bindable;
      inject = _aureliaFramework.inject;
      useView = _aureliaFramework.useView;
      noView = _aureliaFramework.noView;
    }, function (_widget) {
      Widget = _widget.Widget;
    }, function (_gridContent) {
      GridContent = _gridContent.GridContent;
    }],
    execute: function () {
      _export('Grid', Grid = (_dec = customElement('grid'), _dec2 = useView('./widget.html'), _dec(_class = _dec2(_class = function (_Widget) {
        _inherits(Grid, _Widget);

        function Grid(settings) {
          _classCallCheck(this, Grid);

          var _this = _possibleConstructorReturn(this, _Widget.call(this, settings));

          _this.stateType = "gridState";
          _this.initContent();
          return _this;
        }

        Grid.prototype.initContent = function initContent() {
          this.content = new GridContent(this);
        };

        return Grid;
      }(Widget)) || _class) || _class));

      _export('Grid', Grid);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC93aWRnZXRzL2dyaWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFRO0FBQVk7QUFBZTtBQUFVO0FBQVE7QUFBUzs7QUFDdEQ7O0FBQ0E7OztzQkFLSyxlQUhaLGNBQWMsTUFBZCxXQUNBLFFBQVEsZUFBUjtrQkFFWTs7QUFDWCxpQkFEVyxJQUNYLENBQVksUUFBWixFQUFzQjtnQ0FEWCxNQUNXOzt1REFDcEIsbUJBQU0sUUFBTixHQURvQjs7QUFFcEIsZ0JBQUssU0FBTCxHQUFpQixXQUFqQixDQUZvQjtBQUdwQixnQkFBSyxXQUFMLEdBSG9COztTQUF0Qjs7QUFEVyx1QkFPWCxxQ0FBYztBQUNaLGVBQUssT0FBTCxHQUFlLElBQUksV0FBSixDQUFnQixJQUFoQixDQUFmLENBRFk7OztlQVBIO1FBQWEiLCJmaWxlIjoibGF5b3V0L3dpZGdldHMvZ3JpZC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
