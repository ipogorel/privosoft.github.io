'use strict';

System.register([], function (_export, _context) {
  var Storage;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('Storage', Storage = function () {
        function Storage() {
          _classCallCheck(this, Storage);

          this._provider = this._initProvider('Warning: Local Storage is disabled or unavailable.');
        }

        Storage.prototype.set = function set(key, value) {
          if (this._provider) return this._provider.setItem(key, JSON.stringify(value));
          return undefined;
        };

        Storage.prototype.get = function get(key) {

          if (this._provider) return JSON.parse(this._provider.getItem(key));
          return undefined;
        };

        Storage.prototype.clear = function clear() {
          if (this._provider) this._provider.clear();
        };

        Storage.prototype._initProvider = function _initProvider(warning) {
          if ('sessionStorage' in window && window['sessionStorage'] !== null) {
            return sessionStorage;
          } else {
            console.warn(warning);
            return undefined;
          }
        };

        return Storage;
      }());

      _export('Storage', Storage);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXRlL3N0b3JhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7eUJBQWE7QUFDWCxpQkFEVyxPQUNYLEdBQWE7Z0NBREYsU0FDRTs7QUFDWCxlQUFLLFNBQUwsR0FBaUIsS0FBSyxhQUFMLENBQW1CLG9EQUFuQixDQUFqQixDQURXO1NBQWI7O0FBRFcsMEJBSVgsbUJBQUksS0FBSyxPQUFNO0FBQ2IsY0FBSSxLQUFLLFNBQUwsRUFDSCxPQUFPLEtBQUssU0FBTCxDQUFlLE9BQWYsQ0FBdUIsR0FBdkIsRUFBNEIsS0FBSyxTQUFMLENBQWUsS0FBZixDQUE1QixDQUFQLENBREQ7QUFFQSxpQkFBTyxTQUFQLENBSGE7OztBQUpKLDBCQVNYLG1CQUFJLEtBQUk7O0FBRU4sY0FBSSxLQUFLLFNBQUwsRUFDRixPQUFRLEtBQUssS0FBTCxDQUFXLEtBQUssU0FBTCxDQUFlLE9BQWYsQ0FBdUIsR0FBdkIsQ0FBWCxDQUFSLENBREY7QUFFQSxpQkFBTyxTQUFQLENBSk07OztBQVRHLDBCQWdCWCx5QkFBTztBQUNMLGNBQUksS0FBSyxTQUFMLEVBQ0YsS0FBSyxTQUFMLENBQWUsS0FBZixHQURGOzs7QUFqQlMsMEJBcUJYLHVDQUFjLFNBQVE7QUFDcEIsY0FBSSxvQkFBb0IsTUFBcEIsSUFBOEIsT0FBTyxnQkFBUCxNQUE2QixJQUE3QixFQUFtQztBQUNuRSxtQkFBTyxjQUFQLENBRG1FO1dBQXJFLE1BRU87QUFDTCxvQkFBUSxJQUFSLENBQWEsT0FBYixFQURLO0FBRUwsbUJBQU8sU0FBUCxDQUZLO1dBRlA7OztlQXRCUyIsImZpbGUiOiJzdGF0ZS9zdG9yYWdlLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
