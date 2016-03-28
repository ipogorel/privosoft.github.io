"use strict";

System.register([], function (_export, _context) {
  var QueryExpressionEvaluator;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      String.prototype.in = function (array) {
        for (var i = 0; i < array.length; i++) {
          if (array[i] == this) return true;
        }
        return false;
      };

      _export("QueryExpressionEvaluator", QueryExpressionEvaluator = function () {
        function QueryExpressionEvaluator() {
          _classCallCheck(this, QueryExpressionEvaluator);
        }

        QueryExpressionEvaluator.prototype.evaluate = function evaluate(data, searchExpression) {
          var res = [];
          if (searchExpression != "") {
            for (var _iterator = data, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
              var _ref;

              if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
              } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
              }

              var record = _ref;

              if (eval(searchExpression)) {
                res.push(record);
              }
            }
          } else res = data;
          return res;
        };

        return QueryExpressionEvaluator;
      }());

      _export("QueryExpressionEvaluator", QueryExpressionEvaluator);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvcXVlcnktZXhwcmVzc2lvbi1ldmFsdWF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFHQSxhQUFPLFNBQVAsQ0FBaUIsRUFBakIsR0FBc0IsVUFBUyxLQUFULEVBQ3RCO0FBQ0UsYUFBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksTUFBTSxNQUFOLEVBQWMsR0FBbEMsRUFDQTtBQUNFLGNBQUksTUFBTSxDQUFOLEtBQVUsSUFBVixFQUNGLE9BQU8sSUFBUCxDQURGO1NBRkY7QUFLQSxlQUFPLEtBQVAsQ0FORjtPQURzQjs7MENBVVQ7Ozs7OzJDQUNYLDZCQUFTLE1BQU0sa0JBQ2Y7QUFDRSxjQUFJLE1BQU0sRUFBTixDQUROO0FBRUUsY0FBSSxvQkFBa0IsRUFBbEIsRUFBc0I7QUFDeEIsaUNBQW1CLGtIQUFuQixJQUF5Qjs7Ozs7Ozs7Ozs7O2tCQUFoQixjQUFnQjs7QUFDdkIsa0JBQUksS0FBSyxnQkFBTCxDQUFKLEVBQTRCO0FBQzFCLG9CQUFJLElBQUosQ0FBUyxNQUFULEVBRDBCO2VBQTVCO2FBREY7V0FERixNQVFFLE1BQU0sSUFBTixDQVJGO0FBU0EsaUJBQU8sR0FBUCxDQVhGOzs7ZUFGVyIsImZpbGUiOiJkYXRhL3F1ZXJ5LWV4cHJlc3Npb24tZXZhbHVhdG9yLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
