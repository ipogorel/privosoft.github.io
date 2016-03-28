'use strict';

System.register(['aurelia-framework'], function (_export, _context) {
  var resolver, _class, Factory;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      resolver = _aureliaFramework.resolver;
    }],
    execute: function () {
      _export('Factory', Factory = resolver(_class = function () {
        function Factory(Type) {
          _classCallCheck(this, Factory);

          this.Type = Type;
        }

        Factory.prototype.get = function get(container) {
          var _this = this;

          return function () {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
              rest[_key] = arguments[_key];
            }

            return container.invoke(_this.Type, rest);
          };
        };

        Factory.of = function of(Type) {
          return new Factory(Type);
        };

        return Factory;
      }()) || _class);

      _export('Factory', Factory);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZnJhc3RydWN0dXJlL2ZhY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFROzs7eUJBR0ssVUFEWjtBQUVDLGlCQURXLE9BQ1gsQ0FBWSxJQUFaLEVBQWlCO2dDQUROLFNBQ007O0FBQ2YsZUFBSyxJQUFMLEdBQVksSUFBWixDQURlO1NBQWpCOztBQURXLDBCQUtYLG1CQUFJLFdBQVU7OztBQUNaLGlCQUFPLFlBQVc7OENBQVA7O2FBQU87O0FBQ2hCLG1CQUFPLFVBQVUsTUFBVixDQUFpQixNQUFLLElBQUwsRUFBVyxJQUE1QixDQUFQLENBRGdCO1dBQVgsQ0FESzs7O0FBTEgsZ0JBV0osaUJBQUcsTUFBSztBQUNiLGlCQUFPLElBQUksT0FBSixDQUFZLElBQVosQ0FBUCxDQURhOzs7ZUFYSiIsImZpbGUiOiJpbmZyYXN0cnVjdHVyZS9mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
