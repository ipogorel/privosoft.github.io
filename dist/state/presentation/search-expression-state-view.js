'use strict';

System.register(['./state-view'], function (_export, _context) {
  var UserStateView, SearchExpressionStateView;

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
    setters: [function (_stateView) {
      UserStateView = _stateView.UserStateView;
    }],
    execute: function () {
      _export('SearchExpressionStateView', SearchExpressionStateView = function (_UserStateView) {
        _inherits(SearchExpressionStateView, _UserStateView);

        function SearchExpressionStateView(userStateObj) {
          _classCallCheck(this, SearchExpressionStateView);

          return _possibleConstructorReturn(this, _UserStateView.call(this, userStateObj));
        }

        return SearchExpressionStateView;
      }(UserStateView));

      _export('SearchExpressionStateView', SearchExpressionStateView);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXRlL3ByZXNlbnRhdGlvbi9zZWFyY2gtZXhwcmVzc2lvbi1zdGF0ZS12aWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBUTs7OzJDQUNLOzs7QUFFWCxpQkFGVyx5QkFFWCxDQUFZLFlBQVosRUFBMEI7Z0NBRmYsMkJBRWU7O2tEQUN4QiwwQkFBTSxZQUFOLEdBRHdCO1NBQTFCOztlQUZXO1FBQWtDIiwiZmlsZSI6InN0YXRlL3ByZXNlbnRhdGlvbi9zZWFyY2gtZXhwcmVzc2lvbi1zdGF0ZS12aWV3LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
