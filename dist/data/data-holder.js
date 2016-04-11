"use strict";

System.register([], function (_export, _context) {
  var _createClass, DataHolder;

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

      _export("DataHolder", DataHolder = function () {
        function DataHolder() {
          _classCallCheck(this, DataHolder);
        }

        _createClass(DataHolder, [{
          key: "data",
          get: function get() {
            return this._data;
          },
          set: function set(value) {
            this._data = value;
          }
        }, {
          key: "total",
          get: function get() {
            return this._total;
          },
          set: function set(value) {
            this._total = value;
          }
        }, {
          key: "query",
          get: function get() {
            return this._query;
          },
          set: function set(value) {
            this._query = value;
          }
        }]);

        return DataHolder;
      }());

      _export("DataHolder", DataHolder);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvZGF0YS1ob2xkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBQ2E7QUFDWCxpQkFEVyxVQUNYLEdBQWE7Z0NBREYsWUFDRTtTQUFiOztxQkFEVzs7OEJBR0Q7QUFDUixtQkFBTyxLQUFLLEtBQUwsQ0FEQzs7NEJBR0QsT0FBTTtBQUNiLGlCQUFLLEtBQUwsR0FBYSxLQUFiLENBRGE7Ozs7OEJBSUo7QUFDVCxtQkFBTyxLQUFLLE1BQUwsQ0FERTs7NEJBR0QsT0FBTTtBQUNkLGlCQUFLLE1BQUwsR0FBYyxLQUFkLENBRGM7Ozs7OEJBS0w7QUFDVCxtQkFBTyxLQUFLLE1BQUwsQ0FERTs7NEJBR0QsT0FBTTtBQUNkLGlCQUFLLE1BQUwsR0FBYyxLQUFkLENBRGM7Ozs7ZUFyQkwiLCJmaWxlIjoiZGF0YS9kYXRhLWhvbGRlci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
