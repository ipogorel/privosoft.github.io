"use strict";

System.register([], function (_export, _context) {
  var _createClass, NavigationHistory;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export("NavigationHistory", NavigationHistory = function () {
        function NavigationHistory() {
          _classCallCheck(this, NavigationHistory);

          this._history = [];
        }

        NavigationHistory.prototype.add = function add(url, title, dashboard, state, dateTime) {
          this._history.push({ url: url, title: title, dashboard: dashboard, state: state, dateTime: dateTime });
        };

        NavigationHistory.prototype.update = function update(url, dateTime) {
          for (var _iterator = this._history, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var h = _ref;

            if (h.url === url) {
              h.dateTime = dateTime;
              break;
            }
          }
        };

        NavigationHistory.prototype.delete = function _delete(url) {
          for (var _iterator2 = this._history, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
              if (_i2 >= _iterator2.length) break;
              _ref2 = _iterator2[_i2++];
            } else {
              _i2 = _iterator2.next();
              if (_i2.done) break;
              _ref2 = _i2.value;
            }

            var i = _ref2;

            if (i.url === url) {
              this._history.splice(i, 1);
              break;
            }
          }
        };

        NavigationHistory.prototype.deleteAll = function deleteAll() {
          this._history = [];
        };

        NavigationHistory.prototype.trimRight = function trimRight(url) {
          for (var i = this._history.length - 1; i >= 0; i--) {
            if (this._history[i].url === url) {
              this._history.splice(i + 1);
              return;
            }
          }
        };

        NavigationHistory.prototype.exists = function exists(url) {
          for (var _iterator3 = this._history, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
            var _ref3;

            if (_isArray3) {
              if (_i3 >= _iterator3.length) break;
              _ref3 = _iterator3[_i3++];
            } else {
              _i3 = _iterator3.next();
              if (_i3.done) break;
              _ref3 = _i3.value;
            }

            var i = _ref3;

            if (i.route === url) return true;
          }
          return false;
        };

        _createClass(NavigationHistory, [{
          key: "items",
          get: function get() {
            return this._history;
          }
        }]);

        return NavigationHistory;
      }());

      _export("NavigationHistory", NavigationHistory);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnYXRvci9uYXZpZ2F0aW9uLWhpc3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUNBQWE7QUFDWCxpQkFEVyxpQkFDWCxHQUFjO2dDQURILG1CQUNHOztBQUNaLGVBQUssUUFBTCxHQUFnQixFQUFoQixDQURZO1NBQWQ7O0FBRFcsb0NBWVgsbUJBQUksS0FBSyxPQUFPLFdBQVcsT0FBTyxVQUFVO0FBQzFDLGVBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsRUFBQyxRQUFELEVBQU0sWUFBTixFQUFhLG9CQUFiLEVBQXdCLFlBQXhCLEVBQStCLGtCQUEvQixFQUFuQixFQUQwQzs7O0FBWmpDLG9DQWtCWCx5QkFBTyxLQUFLLFVBQVM7QUFDbkIsK0JBQWMsS0FBSyxRQUFMLDhHQUFkLElBQTRCOzs7Ozs7Ozs7Ozs7Z0JBQW5CLFNBQW1COztBQUMxQixnQkFBSSxFQUFFLEdBQUYsS0FBVSxHQUFWLEVBQWU7QUFDakIsZ0JBQUUsUUFBRixHQUFhLFFBQWIsQ0FEaUI7QUFFakIsb0JBRmlCO2FBQW5CO1dBREY7OztBQW5CUyxvQ0EyQlgsMEJBQU8sS0FBSTtBQUNULGdDQUFjLEtBQUssUUFBTCxxSEFBZCxJQUE0Qjs7Ozs7Ozs7Ozs7O2dCQUFuQixVQUFtQjs7QUFDMUIsZ0JBQUksRUFBRSxHQUFGLEtBQVUsR0FBVixFQUFlO0FBQ2pCLG1CQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBRGlCO0FBRWpCLG9CQUZpQjthQUFuQjtXQURGOzs7QUE1QlMsb0NBb0NYLGlDQUFXO0FBQ1QsZUFBSyxRQUFMLEdBQWdCLEVBQWhCLENBRFM7OztBQXBDQSxvQ0F3Q1gsK0JBQVUsS0FBSTtBQUNaLGVBQUssSUFBSSxJQUFJLEtBQUssUUFBTCxDQUFjLE1BQWQsR0FBdUIsQ0FBdkIsRUFBMEIsS0FBSyxDQUFMLEVBQVEsR0FBL0MsRUFBb0Q7QUFDbEQsZ0JBQUksS0FBSyxRQUFMLENBQWMsQ0FBZCxFQUFpQixHQUFqQixLQUF5QixHQUF6QixFQUE4QjtBQUNoQyxtQkFBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixJQUFJLENBQUosQ0FBckIsQ0FEZ0M7QUFFaEMscUJBRmdDO2FBQWxDO1dBREY7OztBQXpDUyxvQ0FpRFgseUJBQU8sS0FBSztBQUNWLGdDQUFjLEtBQUssUUFBTCxxSEFBZCxJQUE0Qjs7Ozs7Ozs7Ozs7O2dCQUFuQixVQUFtQjs7QUFDMUIsZ0JBQUksRUFBRSxLQUFGLEtBQVksR0FBWixFQUNGLE9BQU8sSUFBUCxDQURGO1dBREY7QUFJQSxpQkFBTyxLQUFQLENBTFU7OztxQkFqREQ7OzhCQU9BO0FBQ1QsbUJBQU8sS0FBSyxRQUFMLENBREU7Ozs7ZUFQQSIsImZpbGUiOiJuYXZpZ2F0b3IvbmF2aWdhdGlvbi1oaXN0b3J5LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
