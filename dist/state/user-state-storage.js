'use strict';

System.register(['./storage', 'app-config', 'aurelia-framework', 'lodash'], function (_export, _context) {
  var Storage, AppConfig, inject, lodash, _dec, _class, UserStateStorage;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_storage) {
      Storage = _storage.Storage;
    }, function (_appConfig) {
      AppConfig = _appConfig.AppConfig;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_lodash) {
      lodash = _lodash.default;
    }],
    execute: function () {
      _export('UserStateStorage', UserStateStorage = (_dec = inject(Storage, AppConfig), _dec(_class = function () {
        function UserStateStorage(storage, config) {
          _classCallCheck(this, UserStateStorage);

          this._storage = storage;
          this._key = config.appStorageKey;
        }

        UserStateStorage.prototype.getAll = function getAll(namespace) {
          var data = this._storage.get(this._key);
          if (data) {
            if (!namespace) return data;
            namespace = this._createFullNamespace(namespace);
            return _.filter(data, function (x) {
              return x.key.indexOf(namespace) === 0;
            });
          }
          return [];
        };

        UserStateStorage.prototype.get = function get(key) {
          var o = this._getObj(key);
          if (o) return o.value;
          return undefined;
        };

        UserStateStorage.prototype.set = function set(key, value) {
          var all = this.getAll();
          var oldState = { key: key };
          var newState = { key: key, value: value };
          var item = _.find(all, { 'key': key });
          if (item) {
            oldState.value = item.value;
            item.value = value;
          } else all.push({ key: key, value: value });
          this._storage.set(this._key, all);
        };

        UserStateStorage.prototype.remove = function remove(key) {
          var all = this.getAll();
          _.remove(all, function (i) {
            return i.key == key;
          });
          this._storage.set(this._key, all);
        };

        UserStateStorage.prototype.clearAll = function clearAll() {
          this._storage.clear();
        };

        UserStateStorage.prototype.createKey = function createKey(namespace, key) {
          return this._createFullNamespace(namespace) + key;
        };

        UserStateStorage.prototype._createFullNamespace = function _createFullNamespace(namespace) {
          return namespace + ":";
        };

        UserStateStorage.prototype._getObj = function _getObj(k) {
          var data = this.getAll();
          var obj = _.find(data, { 'key': k });
          return obj;
        };

        return UserStateStorage;
      }()) || _class));

      _export('UserStateStorage', UserStateStorage);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXRlL3VzZXItc3RhdGUtc3RvcmFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQVE7O0FBQ0E7O0FBQ0E7O0FBQ0Q7OztrQ0FHTSwyQkFEWixPQUFPLE9BQVAsRUFBZ0IsU0FBaEI7QUFHRyxpQkFGUyxnQkFFVCxDQUFZLE9BQVosRUFBcUIsTUFBckIsRUFBNEI7Z0NBRm5CLGtCQUVtQjs7QUFDMUIsZUFBSyxRQUFMLEdBQWdCLE9BQWhCLENBRDBCO0FBRTFCLGVBQUssSUFBTCxHQUFZLE9BQU8sYUFBUCxDQUZjO1NBQTVCOztBQUZTLG1DQVFULHlCQUFRLFdBQVU7QUFDaEIsY0FBSSxPQUFPLEtBQUssUUFBTCxDQUFjLEdBQWQsQ0FBa0IsS0FBSyxJQUFMLENBQXpCLENBRFk7QUFFaEIsY0FBSSxJQUFKLEVBQVU7QUFDUixnQkFBSSxDQUFDLFNBQUQsRUFDRixPQUFPLElBQVAsQ0FERjtBQUVBLHdCQUFZLEtBQUssb0JBQUwsQ0FBMEIsU0FBMUIsQ0FBWixDQUhRO0FBSVIsbUJBQU8sRUFBRSxNQUFGLENBQVMsSUFBVCxFQUFlO3FCQUFNLEVBQUUsR0FBRixDQUFNLE9BQU4sQ0FBYyxTQUFkLE1BQTJCLENBQTNCO2FBQU4sQ0FBdEIsQ0FKUTtXQUFWO0FBTUEsaUJBQU8sRUFBUCxDQVJnQjs7O0FBUlQsbUNBbUJULG1CQUFJLEtBQUk7QUFDTixjQUFJLElBQUksS0FBSyxPQUFMLENBQWEsR0FBYixDQUFKLENBREU7QUFFTixjQUFJLENBQUosRUFDRSxPQUFPLEVBQUUsS0FBRixDQURUO0FBRUEsaUJBQU8sU0FBUCxDQUpNOzs7QUFuQkMsbUNBMEJULG1CQUFJLEtBQUssT0FBTTtBQUNiLGNBQUksTUFBTSxLQUFLLE1BQUwsRUFBTixDQURTO0FBRWIsY0FBSSxXQUFXLEVBQUMsUUFBRCxFQUFYLENBRlM7QUFHYixjQUFJLFdBQVcsRUFBQyxRQUFELEVBQU0sWUFBTixFQUFYLENBSFM7QUFJYixjQUFJLE9BQU8sRUFBRSxJQUFGLENBQU8sR0FBUCxFQUFZLEVBQUMsT0FBTyxHQUFQLEVBQWIsQ0FBUCxDQUpTO0FBS2IsY0FBSSxJQUFKLEVBQVU7QUFDUixxQkFBUyxLQUFULEdBQWlCLEtBQUssS0FBTCxDQURUO0FBRVIsaUJBQUssS0FBTCxHQUFhLEtBQWIsQ0FGUTtXQUFWLE1BS0UsSUFBSSxJQUFKLENBQVMsRUFBQyxLQUFLLEdBQUwsRUFBVSxPQUFPLEtBQVAsRUFBcEIsRUFMRjtBQU1BLGVBQUssUUFBTCxDQUFjLEdBQWQsQ0FBa0IsS0FBSyxJQUFMLEVBQVcsR0FBN0IsRUFYYTs7O0FBMUJOLG1DQXdDVCx5QkFBTyxLQUFJO0FBQ1QsY0FBSSxNQUFNLEtBQUssTUFBTCxFQUFOLENBREs7QUFFVCxZQUFFLE1BQUYsQ0FBUyxHQUFULEVBQWMsVUFBUyxDQUFULEVBQVc7QUFDckIsbUJBQU8sRUFBRSxHQUFGLElBQVMsR0FBVCxDQURjO1dBQVgsQ0FBZCxDQUZTO0FBTVQsZUFBSyxRQUFMLENBQWMsR0FBZCxDQUFrQixLQUFLLElBQUwsRUFBVyxHQUE3QixFQU5TOzs7QUF4Q0YsbUNBa0RULCtCQUFVO0FBQ1IsZUFBSyxRQUFMLENBQWMsS0FBZCxHQURROzs7QUFsREQsbUNBc0RULCtCQUFVLFdBQVcsS0FBSTtBQUN2QixpQkFBTyxLQUFLLG9CQUFMLENBQTBCLFNBQTFCLElBQXVDLEdBQXZDLENBRGdCOzs7QUF0RGhCLG1DQTBEVCxxREFBcUIsV0FBVTtBQUM3QixpQkFBTyxZQUFZLEdBQVosQ0FEc0I7OztBQTFEdEIsbUNBOERULDJCQUFRLEdBQUU7QUFDUixjQUFJLE9BQU8sS0FBSyxNQUFMLEVBQVAsQ0FESTtBQUVSLGNBQUksTUFBTSxFQUFFLElBQUYsQ0FBTyxJQUFQLEVBQWMsRUFBQyxPQUFNLENBQU4sRUFBZixDQUFOLENBRkk7QUFHUixpQkFBTyxHQUFQLENBSFE7OztlQTlERCIsImZpbGUiOiJzdGF0ZS91c2VyLXN0YXRlLXN0b3JhZ2UuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
