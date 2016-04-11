'use strict';

System.register(['aurelia-framework', './widget', './detailed-view-content'], function (_export, _context) {
  var customElement, inject, useView, Widget, DetailedViewContent, _dec, _dec2, _class, DetailedView;

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
    }, function (_detailedViewContent) {
      DetailedViewContent = _detailedViewContent.DetailedViewContent;
    }],
    execute: function () {
      _export('DetailedView', DetailedView = (_dec = customElement('detailed-view'), _dec2 = useView('./widget.html'), _dec(_class = _dec2(_class = function (_Widget) {
        _inherits(DetailedView, _Widget);

        function DetailedView(settings) {
          _classCallCheck(this, DetailedView);

          var _this = _possibleConstructorReturn(this, _Widget.call(this, settings));

          _this.stateType = "detailedViewState";
          _this.initContent();
          return _this;
        }

        DetailedView.prototype.initContent = function initContent() {
          this.content = new DetailedViewContent(this);
        };

        return DetailedView;
      }(Widget)) || _class) || _class));

      _export('DetailedView', DetailedView);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC93aWRnZXRzL2RldGFpbGVkLXZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFRO0FBQWU7QUFBUTs7QUFDdkI7O0FBQ0E7Ozs4QkFJSyx1QkFGWixjQUFjLGVBQWQsV0FDQSxRQUFRLGVBQVI7a0JBQ1k7O0FBQ1gsaUJBRFcsWUFDWCxDQUFZLFFBQVosRUFBc0I7Z0NBRFgsY0FDVzs7dURBQ3BCLG1CQUFNLFFBQU4sR0FEb0I7O0FBRXBCLGdCQUFLLFNBQUwsR0FBaUIsbUJBQWpCLENBRm9CO0FBR3BCLGdCQUFLLFdBQUwsR0FIb0I7O1NBQXRCOztBQURXLCtCQU9YLHFDQUFjO0FBQ1osZUFBSyxPQUFMLEdBQWUsSUFBSSxtQkFBSixDQUF3QixJQUF4QixDQUFmLENBRFk7OztlQVBIO1FBQXFCIiwiZmlsZSI6ImxheW91dC93aWRnZXRzL2RldGFpbGVkLXZpZXcuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
