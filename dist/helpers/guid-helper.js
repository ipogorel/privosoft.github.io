'use strict';

System.register([], function (_export, _context) {
  var GuidHelper;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('GuidHelper', GuidHelper = function () {
        function GuidHelper() {
          _classCallCheck(this, GuidHelper);
        }

        GuidHelper.guid = function guid() {
          return GuidHelper._s4() + GuidHelper._s4() + '-' + GuidHelper._s4() + '-' + GuidHelper._s4() + '-' + GuidHelper._s4() + '-' + GuidHelper._s4() + GuidHelper._s4() + GuidHelper._s4();
        };

        GuidHelper._s4 = function _s4() {
          return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        };

        return GuidHelper;
      }());

      _export('GuidHelper', GuidHelper);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlbHBlcnMvZ3VpZC1oZWxwZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7NEJBQWE7Ozs7O21CQUVKLHVCQUFPO0FBQ1osaUJBQU8sV0FBVyxHQUFYLEtBQW1CLFdBQVcsR0FBWCxFQUFuQixHQUFzQyxHQUF0QyxHQUE0QyxXQUFXLEdBQVgsRUFBNUMsR0FBK0QsR0FBL0QsR0FBcUUsV0FBVyxHQUFYLEVBQXJFLEdBQXdGLEdBQXhGLEdBQ0wsV0FBVyxHQUFYLEVBREssR0FDYyxHQURkLEdBQ29CLFdBQVcsR0FBWCxFQURwQixHQUN1QyxXQUFXLEdBQVgsRUFEdkMsR0FDMEQsV0FBVyxHQUFYLEVBRDFELENBREs7OztBQUZILG1CQU9KLHFCQUFNO0FBQ1gsaUJBQU8sS0FBSyxLQUFMLENBQVcsQ0FBQyxJQUFJLEtBQUssTUFBTCxFQUFKLENBQUQsR0FBc0IsT0FBdEIsQ0FBWCxDQUNKLFFBREksQ0FDSyxFQURMLEVBRUosU0FGSSxDQUVNLENBRk4sQ0FBUCxDQURXOzs7ZUFQRiIsImZpbGUiOiJoZWxwZXJzL2d1aWQtaGVscGVyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
