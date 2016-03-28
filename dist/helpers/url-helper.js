"use strict";

System.register([], function (_export, _context) {
  var UrlHelper;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("UrlHelper", UrlHelper = function () {
        function UrlHelper() {
          _classCallCheck(this, UrlHelper);
        }

        UrlHelper.objectToQuery = function objectToQuery(ar) {
          return encodeURIComponent(JSON.stringify(ar));
        };

        UrlHelper.queryToObject = function queryToObject(queryParam) {
          return JSON.parse(queryParam);
        };

        UrlHelper.getParameterByName = function getParameterByName(name, url) {
          name = name.replace(/[\[\]]/g, "\\$&");
          var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
              results = regex.exec(url);
          if (!results) return null;
          if (!results[2]) return '';
          return decodeURIComponent(results[2].replace(/\+/g, " "));
        };

        return UrlHelper;
      }());

      _export("UrlHelper", UrlHelper);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlbHBlcnMvdXJsLWhlbHBlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OzsyQkFBYTs7Ozs7a0JBRUosdUNBQWMsSUFBRztBQUN0QixpQkFBTyxtQkFBbUIsS0FBSyxTQUFMLENBQWUsRUFBZixDQUFuQixDQUFQLENBRHNCOzs7QUFGYixrQkFNSix1Q0FBYyxZQUFXO0FBQzlCLGlCQUFPLEtBQUssS0FBTCxDQUFXLFVBQVgsQ0FBUCxDQUQ4Qjs7O0FBTnJCLGtCQVVKLGlEQUFtQixNQUFNLEtBQUs7QUFDbkMsaUJBQU8sS0FBSyxPQUFMLENBQWEsU0FBYixFQUF3QixNQUF4QixDQUFQLENBRG1DO0FBRW5DLGNBQUksUUFBUSxJQUFJLE1BQUosQ0FBVyxTQUFTLElBQVQsR0FBZ0IsbUJBQWhCLENBQW5CO2NBQ0YsVUFBVSxNQUFNLElBQU4sQ0FBVyxHQUFYLENBQVYsQ0FIaUM7QUFJbkMsY0FBSSxDQUFDLE9BQUQsRUFBVSxPQUFPLElBQVAsQ0FBZDtBQUNBLGNBQUksQ0FBQyxRQUFRLENBQVIsQ0FBRCxFQUFhLE9BQU8sRUFBUCxDQUFqQjtBQUNBLGlCQUFPLG1CQUFtQixRQUFRLENBQVIsRUFBVyxPQUFYLENBQW1CLEtBQW5CLEVBQTBCLEdBQTFCLENBQW5CLENBQVAsQ0FObUM7OztlQVYxQiIsImZpbGUiOiJoZWxwZXJzL3VybC1oZWxwZXIuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
