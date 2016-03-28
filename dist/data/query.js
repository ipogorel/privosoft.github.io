"use strict";

System.register([], function (_export, _context) {
  var _createClass, Query;

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

      _export("Query", Query = function () {
        function Query() {
          _classCallCheck(this, Query);
        }

        _createClass(Query, [{
          key: "serverSideFilter",
          get: function get() {
            return this._serverSideFilter;
          },
          set: function set(value) {
            this._serverSideFilter = value;
          }
        }]);

        return Query;
      }());

      _export("Query", Query);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvcXVlcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBQWE7Ozs7Ozs7OEJBU1k7QUFDckIsbUJBQU8sS0FBSyxpQkFBTCxDQURjOzs0QkFHRixPQUFPO0FBQzFCLGlCQUFLLGlCQUFMLEdBQXlCLEtBQXpCLENBRDBCOzs7O2VBWmpCIiwiZmlsZSI6ImRhdGEvcXVlcnkuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
