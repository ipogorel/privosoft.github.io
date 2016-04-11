'use strict';

System.register(['./cache-storage', 'lodash'], function (_export, _context) {
  var CacheStorage, _, MemoryCacheStorage;

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
    setters: [function (_cacheStorage) {
      CacheStorage = _cacheStorage.CacheStorage;
    }, function (_lodash) {
      _ = _lodash.default;
    }],
    execute: function () {
      _export('MemoryCacheStorage', MemoryCacheStorage = function (_CacheStorage) {
        _inherits(MemoryCacheStorage, _CacheStorage);

        function MemoryCacheStorage() {
          _classCallCheck(this, MemoryCacheStorage);

          var _this = _possibleConstructorReturn(this, _CacheStorage.call(this));

          _this._cache = {};
          return _this;
        }

        MemoryCacheStorage.prototype.setItem = function setItem(key, value, seconds) {
          var t = new Date();
          t.setSeconds(t.getSeconds() + seconds);
          var v = _.assign({}, value);
          this._cache[key] = {
            value: v,
            exp: t
          };
        };

        MemoryCacheStorage.prototype.getItem = function getItem(key) {
          if (this._cache[key] && this._cache[key].exp >= Date.now()) return this._cache[key].value;
        };

        MemoryCacheStorage.prototype.removeItem = function removeItem(key) {
          delete this._cache[key];
        };

        MemoryCacheStorage.prototype.removeExpired = function removeExpired() {
          var self = this;
          _.forOwn(self._cache, function (v, k) {
            if (self._cache[k].exp < Date.now()) {
              self.removeItem(k);
            }
          });
        };

        return MemoryCacheStorage;
      }(CacheStorage));

      _export('MemoryCacheStorage', MemoryCacheStorage);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhY2hlL21lbW9yeS1jYWNoZS1zdG9yYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBUTs7QUFDRDs7O29DQUVNOzs7QUFDWCxpQkFEVyxrQkFDWCxHQUFhO2dDQURGLG9CQUNFOzt1REFDWCwwQkFEVzs7QUFFWCxnQkFBSyxNQUFMLEdBQWMsRUFBZCxDQUZXOztTQUFiOztBQURXLHFDQUtYLDJCQUFRLEtBQUssT0FBTyxTQUFRO0FBQzFCLGNBQUksSUFBSSxJQUFJLElBQUosRUFBSixDQURzQjtBQUUxQixZQUFFLFVBQUYsQ0FBYSxFQUFFLFVBQUYsS0FBaUIsT0FBakIsQ0FBYixDQUYwQjtBQUcxQixjQUFJLElBQUksRUFBRSxNQUFGLENBQVMsRUFBVCxFQUFZLEtBQVosQ0FBSixDQUhzQjtBQUkxQixlQUFLLE1BQUwsQ0FBWSxHQUFaLElBQW1CO0FBQ2pCLG1CQUFPLENBQVA7QUFDQSxpQkFBSyxDQUFMO1dBRkYsQ0FKMEI7OztBQUxqQixxQ0FjWCwyQkFBUSxLQUFJO0FBQ1YsY0FBSSxLQUFLLE1BQUwsQ0FBWSxHQUFaLEtBQW9CLEtBQUssTUFBTCxDQUFZLEdBQVosRUFBaUIsR0FBakIsSUFBd0IsS0FBSyxHQUFMLEVBQXhCLEVBQ3RCLE9BQU8sS0FBSyxNQUFMLENBQVksR0FBWixFQUFpQixLQUFqQixDQURUOzs7QUFmUyxxQ0FrQlgsaUNBQVcsS0FBSTtBQUNiLGlCQUFPLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBUCxDQURhOzs7QUFsQkoscUNBcUJYLHlDQUFlO0FBQ2IsY0FBSSxPQUFPLElBQVAsQ0FEUztBQUViLFlBQUUsTUFBRixDQUFTLEtBQUssTUFBTCxFQUFhLFVBQVMsQ0FBVCxFQUFZLENBQVosRUFBZTtBQUNuQyxnQkFBSSxLQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsR0FBZixHQUFxQixLQUFLLEdBQUwsRUFBckIsRUFBZ0M7QUFDbEMsbUJBQUssVUFBTCxDQUFnQixDQUFoQixFQURrQzthQUFwQztXQURvQixDQUF0QixDQUZhOzs7ZUFyQko7UUFBMkIiLCJmaWxlIjoiY2FjaGUvbWVtb3J5LWNhY2hlLXN0b3JhZ2UuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
