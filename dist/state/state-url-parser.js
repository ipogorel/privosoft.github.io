"use strict";

System.register(["helpers/url-helper"], function (_export, _context) {
  var UrlHelper, StateUrlParser;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_helpersUrlHelper) {
      UrlHelper = _helpersUrlHelper.UrlHelper;
    }],
    execute: function () {
      _export("StateUrlParser", StateUrlParser = function () {
        function StateUrlParser() {
          _classCallCheck(this, StateUrlParser);
        }

        StateUrlParser.stateToQuery = function stateToQuery(widgetStates) {
          var params = [];
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

            var widgetState = _ref;

            params.push({ "sk": widgetState.key, "sv": widgetState.value });
          }
          return params.length > 0 ? "?q=" + UrlHelper.objectToQuery(params) : "";
        };

        StateUrlParser.queryToState = function queryToState(url) {
          var result = [];
          var q = UrlHelper.getParameterByName("q", url);
          if (q) {
            var widgetStates = UrlHelper.queryToObject(q);
            for (var _iterator2 = widgetStates, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
              var _ref2;

              if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
              } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
              }

              var ws = _ref2;

              result.push({ "key": ws.sk, "value": ws.sv });
            }
          }
          return result;
        };

        return StateUrlParser;
      }());

      _export("StateUrlParser", StateUrlParser);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXRlL3N0YXRlLXVybC1wYXJzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFROzs7Z0NBRUs7Ozs7O3VCQUNKLHFDQUFhLGNBQWE7QUFDL0IsY0FBSSxTQUFTLEVBQVQsQ0FEMkI7QUFFL0IsK0JBQXdCLDBIQUF4Qjs7Ozs7Ozs7Ozs7O2dCQUFTOztBQUNMLG1CQUFPLElBQVAsQ0FBWSxFQUFDLE1BQU0sWUFBWSxHQUFaLEVBQWlCLE1BQUssWUFBWSxLQUFaLEVBQXpDO1dBREo7QUFHQSxpQkFBUSxNQUFDLENBQU8sTUFBUCxHQUFjLENBQWQsR0FBa0IsUUFBUSxVQUFVLGFBQVYsQ0FBd0IsTUFBeEIsQ0FBUixHQUF5QyxFQUE1RCxDQUx1Qjs7O0FBRHRCLHVCQVNKLHFDQUFhLEtBQUk7QUFDdEIsY0FBSSxTQUFTLEVBQVQsQ0FEa0I7QUFFdEIsY0FBSSxJQUFJLFVBQVUsa0JBQVYsQ0FBNkIsR0FBN0IsRUFBa0MsR0FBbEMsQ0FBSixDQUZrQjtBQUd0QixjQUFJLENBQUosRUFBTTtBQUNKLGdCQUFJLGVBQWUsVUFBVSxhQUFWLENBQXdCLENBQXhCLENBQWYsQ0FEQTtBQUVKLGtDQUFlLGlJQUFmLElBQTRCOzs7Ozs7Ozs7Ozs7a0JBQW5CLFdBQW1COztBQUMxQixxQkFBTyxJQUFQLENBQVksRUFBQyxPQUFNLEdBQUcsRUFBSCxFQUFPLFNBQVEsR0FBRyxFQUFILEVBQWxDLEVBRDBCO2FBQTVCO1dBRkY7QUFNQSxpQkFBTyxNQUFQLENBVHNCOzs7ZUFUYiIsImZpbGUiOiJzdGF0ZS9zdGF0ZS11cmwtcGFyc2VyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
