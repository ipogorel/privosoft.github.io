'use strict';

System.register(['aurelia-framework', './widget', './dsl-search-box-content'], function (_export, _context) {
  var customElement, useView, Widget, DslSearchBoxContent, _dec, _dec2, _class, SearchBox;

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
      useView = _aureliaFramework.useView;
    }, function (_widget) {
      Widget = _widget.Widget;
    }, function (_dslSearchBoxContent) {
      DslSearchBoxContent = _dslSearchBoxContent.DslSearchBoxContent;
    }],
    execute: function () {
      _export('SearchBox', SearchBox = (_dec = customElement('search-box'), _dec2 = useView('./widget.html'), _dec(_class = _dec2(_class = function (_Widget) {
        _inherits(SearchBox, _Widget);

        function SearchBox(settings) {
          _classCallCheck(this, SearchBox);

          var _this = _possibleConstructorReturn(this, _Widget.call(this, settings));

          _this.stateType = "searchBoxState";
          _this.initContent();
          return _this;
        }

        SearchBox.prototype.initContent = function initContent() {
          this.content = new DslSearchBoxContent(this);
        };

        return SearchBox;
      }(Widget)) || _class) || _class));

      _export('SearchBox', SearchBox);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC93aWRnZXRzL3NlYXJjaC1ib3guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFRO0FBQWU7O0FBQ2Y7O0FBQ0E7OzsyQkFJSyxvQkFGWixjQUFjLFlBQWQsV0FDQSxRQUFRLGVBQVI7a0JBQ1k7O0FBQ1gsaUJBRFcsU0FDWCxDQUFZLFFBQVosRUFBc0I7Z0NBRFgsV0FDVzs7dURBQ3BCLG1CQUFNLFFBQU4sR0FEb0I7O0FBRXBCLGdCQUFLLFNBQUwsR0FBaUIsZ0JBQWpCLENBRm9CO0FBR3BCLGdCQUFLLFdBQUwsR0FIb0I7O1NBQXRCOztBQURXLDRCQVFYLHFDQUFjO0FBQ1osZUFBSyxPQUFMLEdBQWUsSUFBSSxtQkFBSixDQUF3QixJQUF4QixDQUFmLENBRFk7OztlQVJIO1FBQWtCIiwiZmlsZSI6ImxheW91dC93aWRnZXRzL3NlYXJjaC1ib3guanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
