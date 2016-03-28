'use strict';

System.register(['aurelia-framework'], function (_export, _context) {
  var inject, _createClass, CacheManager;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }],
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

      _export('CacheManager', CacheManager = function () {
        function CacheManager(storage) {
          _classCallCheck(this, CacheManager);

          this._cacheStorage = storage;
          this._cleanInterval = 5000;
        }

        CacheManager.prototype.startCleaner = function startCleaner() {
          if (!this.cleaner) {
            var self = this;
            this.cleaner = window.setInterval(function () {
              self._cacheStorage.removeExpired();
            }, this._cleanInterval);
          }
        };

        CacheManager.prototype.stopCleaner = function stopCleaner() {
          if (this.cleaner) window.clearInterval(this.cleaner);
        };

        CacheManager.prototype.getStorage = function getStorage() {
          return this._cacheStorage;
        };

        _createClass(CacheManager, [{
          key: 'cleanInterval',
          get: function get() {
            return this._cleanInterval;
          }
        }]);

        return CacheManager;
      }());

      _export('CacheManager', CacheManager);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhY2hlL2NhY2hlLW1hbmFnZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OEJBR0s7QUFDWCxpQkFEVyxZQUNYLENBQVksT0FBWixFQUFvQjtnQ0FEVCxjQUNTOztBQUNsQixlQUFLLGFBQUwsR0FBcUIsT0FBckIsQ0FEa0I7QUFFbEIsZUFBSyxjQUFMLEdBQXNCLElBQXRCLENBRmtCO1NBQXBCOztBQURXLCtCQVFYLHVDQUFjO0FBQ1osY0FBSSxDQUFDLEtBQUssT0FBTCxFQUFjO0FBQ2pCLGdCQUFJLE9BQU8sSUFBUCxDQURhO0FBRWpCLGlCQUFLLE9BQUwsR0FBZSxPQUFPLFdBQVAsQ0FBbUIsWUFBSztBQUNyQyxtQkFBSyxhQUFMLENBQW1CLGFBQW5CLEdBRHFDO2FBQUwsRUFFL0IsS0FBSyxjQUFMLENBRkgsQ0FGaUI7V0FBbkI7OztBQVRTLCtCQWlCWCxxQ0FBYTtBQUNYLGNBQUksS0FBSyxPQUFMLEVBQ0YsT0FBTyxhQUFQLENBQXFCLEtBQUssT0FBTCxDQUFyQixDQURGOzs7QUFsQlMsK0JBc0JYLG1DQUFZO0FBQ1YsaUJBQU8sS0FBSyxhQUFMLENBREc7OztxQkF0QkQ7OzhCQU1TO0FBQUMsbUJBQU8sS0FBSyxjQUFMLENBQVI7Ozs7ZUFOVCIsImZpbGUiOiJjYWNoZS9jYWNoZS1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
