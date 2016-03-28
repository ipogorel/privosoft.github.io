"use strict";

System.register(["lodash"], function (_export, _context) {
  var lodash, StateDiscriminator;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_lodash) {
      lodash = _lodash.default;
    }],
    execute: function () {
      _export("StateDiscriminator", StateDiscriminator = function () {
        function StateDiscriminator() {
          _classCallCheck(this, StateDiscriminator);
        }

        StateDiscriminator.discriminate = function discriminate(widgetStates) {
          var result = [];
          for (var _iterator = widgetStates, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var ws = _ref;

            if (ws.value.stateType === "searchBoxState") result.push(ws);
          }
          return result;
        };

        return StateDiscriminator;
      }());

      _export("StateDiscriminator", StateDiscriminator);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXRlL3N0YXRlLWRpc2NyaW1pbmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFPOzs7b0NBRU07Ozs7OzJCQUNKLHFDQUFhLGNBQWE7QUFDL0IsY0FBSSxTQUFTLEVBQVQsQ0FEMkI7QUFFL0IsK0JBQWUsMEhBQWYsSUFBNEI7Ozs7Ozs7Ozs7OztnQkFBbkIsVUFBbUI7O0FBQzFCLGdCQUFJLEdBQUcsS0FBSCxDQUFTLFNBQVQsS0FBcUIsZ0JBQXJCLEVBQ0YsT0FBTyxJQUFQLENBQVksRUFBWixFQURGO1dBREY7QUFJQSxpQkFBTyxNQUFQLENBTitCOzs7ZUFEdEIiLCJmaWxlIjoic3RhdGUvc3RhdGUtZGlzY3JpbWluYXRvci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
