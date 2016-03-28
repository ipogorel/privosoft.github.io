'use strict';

System.register([], function (_export, _context) {
  var StringHelper;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('StringHelper', StringHelper = function () {
        function StringHelper() {
          _classCallCheck(this, StringHelper);
        }

        StringHelper.compare = function compare(string1, string2) {
          return string1.toUpperCase() === string2.toUpperCase();
        };

        StringHelper.replaceAll = function replaceAll(str, find, replace) {
          return str.replace(new RegExp(find, 'g'), replace);
        };

        StringHelper.hashCode = function hashCode(str) {
          var hash = 0;
          if (str.length == 0) return hash;
          for (var i = 0; i < str.length; i++) {
            var char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash;
          }
          return hash;
        };

        StringHelper.getEditDistance = function getEditDistance(a, b) {
          if (a.length == 0) return b.length;
          if (b.length == 0) return a.length;

          var matrix = [];

          var i;
          for (i = 0; i <= b.length; i++) {
            matrix[i] = [i];
          }

          var j;
          for (j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
          }

          for (i = 1; i <= b.length; i++) {
            for (j = 1; j <= a.length; j++) {
              if (b.charAt(i - 1) == a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
              } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
              }
            }
          }

          return matrix[b.length][a.length];
        };

        StringHelper.getPreviousWord = function getPreviousWord(str, position, separators) {
          var str = str.substring(0, position);
          var lastSeparatorIndex = 0;
          for (var i = 0; i < separators.length; i++) {
            if (str.lastIndexOf(separators[i]) > lastSeparatorIndex) lastSeparatorIndex = str.lastIndexOf(separators[i]);
          }
          if (lastSeparatorIndex == str.length) lastSeparatorIndex = 0;
          if (lastSeparatorIndex > 0 && lastSeparatorIndex < str.length) lastSeparatorIndex++;

          return str.substring(lastSeparatorIndex, str.length);
        };

        StringHelper.getNextWord = function getNextWord(str, position, separators) {
          var str = str.substring(position, str.length);
          var firstSeparatorIndex = str.length;
          for (var i = 0; i < separators.length; i++) {
            if (str.indexOf(separators[i]) < firstSeparatorIndex && str.indexOf(separators[i]) >= 0) firstSeparatorIndex = str.indexOf(separators[i]);
          }
          return str.substring(0, firstSeparatorIndex);
        };

        return StringHelper;
      }());

      _export('StringHelper', StringHelper);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlbHBlcnMvc3RyaW5nLWhlbHBlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs4QkFBYTs7Ozs7cUJBRUosMkJBQVMsU0FBUyxTQUFTO0FBQ2hDLGlCQUFPLFFBQVEsV0FBUixPQUEwQixRQUFRLFdBQVIsRUFBMUIsQ0FEeUI7OztBQUZ2QixxQkFNSixpQ0FBVyxLQUFLLE1BQU0sU0FBUztBQUNwQyxpQkFBTyxJQUFJLE9BQUosQ0FBWSxJQUFJLE1BQUosQ0FBVyxJQUFYLEVBQWlCLEdBQWpCLENBQVosRUFBbUMsT0FBbkMsQ0FBUCxDQURvQzs7O0FBTjNCLHFCQVVKLDZCQUFTLEtBQUk7QUFDbEIsY0FBSSxPQUFPLENBQVAsQ0FEYztBQUVsQixjQUFJLElBQUksTUFBSixJQUFjLENBQWQsRUFBaUIsT0FBTyxJQUFQLENBQXJCO0FBQ0EsZUFBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksSUFBSSxNQUFKLEVBQVksR0FBaEMsRUFBcUM7QUFDbkMsZ0JBQUksT0FBTyxJQUFJLFVBQUosQ0FBZSxDQUFmLENBQVAsQ0FEK0I7QUFFbkMsbUJBQU8sQ0FBRSxRQUFNLENBQU4sQ0FBRCxHQUFVLElBQVYsR0FBZ0IsSUFBakIsQ0FGNEI7QUFHbkMsbUJBQU8sT0FBTyxJQUFQLENBSDRCO1dBQXJDO0FBS0EsaUJBQU8sSUFBUCxDQVJrQjs7O0FBVlQscUJBcUJKLDJDQUFnQixHQUFHLEdBQUU7QUFDMUIsY0FBRyxFQUFFLE1BQUYsSUFBWSxDQUFaLEVBQWUsT0FBTyxFQUFFLE1BQUYsQ0FBekI7QUFDQSxjQUFHLEVBQUUsTUFBRixJQUFZLENBQVosRUFBZSxPQUFPLEVBQUUsTUFBRixDQUF6Qjs7QUFFQSxjQUFJLFNBQVMsRUFBVCxDQUpzQjs7QUFPMUIsY0FBSSxDQUFKLENBUDBCO0FBUTFCLGVBQUksSUFBSSxDQUFKLEVBQU8sS0FBSyxFQUFFLE1BQUYsRUFBVSxHQUExQixFQUE4QjtBQUM1QixtQkFBTyxDQUFQLElBQVksQ0FBQyxDQUFELENBQVosQ0FENEI7V0FBOUI7O0FBS0EsY0FBSSxDQUFKLENBYjBCO0FBYzFCLGVBQUksSUFBSSxDQUFKLEVBQU8sS0FBSyxFQUFFLE1BQUYsRUFBVSxHQUExQixFQUE4QjtBQUM1QixtQkFBTyxDQUFQLEVBQVUsQ0FBVixJQUFlLENBQWYsQ0FENEI7V0FBOUI7O0FBS0EsZUFBSSxJQUFJLENBQUosRUFBTyxLQUFLLEVBQUUsTUFBRixFQUFVLEdBQTFCLEVBQThCO0FBQzVCLGlCQUFJLElBQUksQ0FBSixFQUFPLEtBQUssRUFBRSxNQUFGLEVBQVUsR0FBMUIsRUFBOEI7QUFDNUIsa0JBQUcsRUFBRSxNQUFGLENBQVMsSUFBRSxDQUFGLENBQVQsSUFBaUIsRUFBRSxNQUFGLENBQVMsSUFBRSxDQUFGLENBQTFCLEVBQStCO0FBQ2hDLHVCQUFPLENBQVAsRUFBVSxDQUFWLElBQWUsT0FBTyxJQUFFLENBQUYsQ0FBUCxDQUFZLElBQUUsQ0FBRixDQUEzQixDQURnQztlQUFsQyxNQUVPO0FBQ0wsdUJBQU8sQ0FBUCxFQUFVLENBQVYsSUFBZSxLQUFLLEdBQUwsQ0FBUyxPQUFPLElBQUUsQ0FBRixDQUFQLENBQVksSUFBRSxDQUFGLENBQVosR0FBbUIsQ0FBbkIsRUFDdEIsS0FBSyxHQUFMLENBQVMsT0FBTyxDQUFQLEVBQVUsSUFBRSxDQUFGLENBQVYsR0FBaUIsQ0FBakIsRUFDUCxPQUFPLElBQUUsQ0FBRixDQUFQLENBQVksQ0FBWixJQUFpQixDQUFqQixDQUZXLENBQWYsQ0FESztlQUZQO2FBREY7V0FERjs7QUFZQSxpQkFBTyxPQUFPLEVBQUUsTUFBRixDQUFQLENBQWlCLEVBQUUsTUFBRixDQUF4QixDQS9CMEI7OztBQXJCakIscUJBdURKLDJDQUFnQixLQUFLLFVBQVUsWUFBVztBQUUvQyxjQUFJLE1BQU0sSUFBSSxTQUFKLENBQWMsQ0FBZCxFQUFpQixRQUFqQixDQUFOLENBRjJDO0FBRy9DLGNBQUkscUJBQXFCLENBQXJCLENBSDJDO0FBSS9DLGVBQUksSUFBSSxJQUFFLENBQUYsRUFBSyxJQUFJLFdBQVcsTUFBWCxFQUFtQixHQUFwQyxFQUF5QztBQUN2QyxnQkFBSSxJQUFJLFdBQUosQ0FBZ0IsV0FBVyxDQUFYLENBQWhCLElBQStCLGtCQUEvQixFQUNGLHFCQUFxQixJQUFJLFdBQUosQ0FBZ0IsV0FBVyxDQUFYLENBQWhCLENBQXJCLENBREY7V0FERjtBQUlBLGNBQUksc0JBQXNCLElBQUksTUFBSixFQUN4QixxQkFBbUIsQ0FBbkIsQ0FERjtBQUVBLGNBQUksa0JBQUMsR0FBbUIsQ0FBbkIsSUFBd0IscUJBQXFCLElBQUksTUFBSixFQUNoRCxxQkFERjs7QUFHQSxpQkFBTyxJQUFJLFNBQUosQ0FBYyxrQkFBZCxFQUFrQyxJQUFJLE1BQUosQ0FBekMsQ0FiK0M7OztBQXZEdEMscUJBdUVKLG1DQUFZLEtBQUssVUFBVSxZQUFXO0FBQzNDLGNBQUksTUFBTSxJQUFJLFNBQUosQ0FBYyxRQUFkLEVBQXdCLElBQUksTUFBSixDQUE5QixDQUR1QztBQUUzQyxjQUFJLHNCQUFzQixJQUFJLE1BQUosQ0FGaUI7QUFHM0MsZUFBSSxJQUFJLElBQUUsQ0FBRixFQUFLLElBQUksV0FBVyxNQUFYLEVBQW1CLEdBQXBDLEVBQXlDO0FBQ3ZDLGdCQUFJLEdBQUMsQ0FBSSxPQUFKLENBQVksV0FBVyxDQUFYLENBQVosSUFBMkIsbUJBQTNCLElBQWtELElBQUksT0FBSixDQUFZLFdBQVcsQ0FBWCxDQUFaLEtBQTRCLENBQTVCLEVBQ3JELHNCQUFzQixJQUFJLE9BQUosQ0FBWSxXQUFXLENBQVgsQ0FBWixDQUF0QixDQURGO1dBREY7QUFJQSxpQkFBTyxJQUFJLFNBQUosQ0FBYyxDQUFkLEVBQWlCLG1CQUFqQixDQUFQLENBUDJDOzs7ZUF2RWxDIiwiZmlsZSI6ImhlbHBlcnMvc3RyaW5nLWhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
