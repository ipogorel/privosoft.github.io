"use strict";

System.register(["lodash"], function (_export, _context) {
  var lodash, DataHelper;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_lodash) {
      lodash = _lodash.default;
    }],
    execute: function () {
      _export("DataHelper", DataHelper = function () {
        function DataHelper() {
          _classCallCheck(this, DataHelper);
        }

        DataHelper.getNumericFields = function getNumericFields(fields) {
          return _.filter(fields, function (f) {
            if (f.type == "number" || f.type == "currency") return f;
          });
        };

        DataHelper.getStringFields = function getStringFields(fields) {
          return _.filter(fields, { type: "string" });
        };

        DataHelper.getDateFields = function getDateFields(fields) {
          return _.filter(fields, { type: "date" });
        };

        DataHelper.getFieldType = function getFieldType(collection, fieldName) {
          var blankCount = 0;
          var result;
          for (var i = 0; i < collection.length; i++) {
            var val = collection[i][fieldName];
            if (val != undefined) {
              if (DataHelper.isString(val)) result = "string";else if (DataHelper.isNumber(val)) {
                if (DataHelper.isCurrency(collection, fieldName)) result = "currency";else result = "number";
              } else if (DataHelper.isDate(val)) result = "date";
              return result;
            } else {
              blankCount++;
            }
            if (blankCount > 300) {
              return undefined;
            }
          }
        };

        DataHelper.deserializeDates = function deserializeDates(jsonArray) {
          for (var r = 0; r < jsonArray.length; r++) {
            var jsonObj = jsonArray[r];
            for (var field in jsonObj) {
              if (jsonObj.hasOwnProperty(field)) {
                var value = jsonObj[field];
                if (value && typeof value == 'string' && value.indexOf('/Date') === 0) {
                  jsonObj[field] = new Date(parseInt(value.substr(6)));
                }
              }
            }
          }
          return jsonArray;
        };

        DataHelper.isCurrency = function isCurrency(collection, fieldName) {
          if (collection.length === 0 || !fieldName) return false;
          var largeValues = _.filter(collection, function (x) {
            return Math.abs(x[fieldName]) >= 1000;
          }).length;
          if (largeValues / collection.length > 0.4) return true;
          return false;
        };

        DataHelper.isDate = function isDate(value) {
          return new Date(value) !== "Invalid Date" && !isNaN(new Date(value));
        };

        DataHelper.isString = function isString(value) {
          return typeof value === 'string' || value instanceof String;
        };

        DataHelper.isNumber = function isNumber(value) {
          return typeof value === 'number';
        };

        return DataHelper;
      }());

      _export("DataHelper", DataHelper);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlbHBlcnMvZGF0YS1oZWxwZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFPOzs7NEJBRU07Ozs7O21CQUdKLDZDQUFpQixRQUFPO0FBQzdCLGlCQUFPLEVBQUUsTUFBRixDQUFTLE1BQVQsRUFBaUIsYUFBSztBQUMzQixnQkFBSSxDQUFDLENBQUUsSUFBRixJQUFVLFFBQVYsSUFBc0IsRUFBRSxJQUFGLElBQVUsVUFBVixFQUN6QixPQUFPLENBQVAsQ0FERjtXQURzQixDQUF4QixDQUQ2Qjs7O0FBSHBCLG1CQVNKLDJDQUFnQixRQUFPO0FBQzVCLGlCQUFPLEVBQUUsTUFBRixDQUFTLE1BQVQsRUFBZ0IsRUFBQyxNQUFLLFFBQUwsRUFBakIsQ0FBUCxDQUQ0Qjs7O0FBVG5CLG1CQWFKLHVDQUFjLFFBQU87QUFDMUIsaUJBQU8sRUFBRSxNQUFGLENBQVMsTUFBVCxFQUFnQixFQUFDLE1BQUssTUFBTCxFQUFqQixDQUFQLENBRDBCOzs7QUFiakIsbUJBaUJKLHFDQUFhLFlBQVksV0FBVztBQUN6QyxjQUFJLGFBQWEsQ0FBYixDQURxQztBQUV6QyxjQUFJLE1BQUosQ0FGeUM7QUFHekMsZUFBSSxJQUFJLElBQUUsQ0FBRixFQUFLLElBQUcsV0FBVyxNQUFYLEVBQW1CLEdBQW5DLEVBQXVDO0FBQ3JDLGdCQUFJLE1BQU0sV0FBVyxDQUFYLEVBQWMsU0FBZCxDQUFOLENBRGlDO0FBRXJDLGdCQUFHLE9BQUssU0FBTCxFQUFlO0FBQ2hCLGtCQUFJLFdBQVcsUUFBWCxDQUFvQixHQUFwQixDQUFKLEVBQ0UsU0FBUyxRQUFULENBREYsS0FFSyxJQUFJLFdBQVcsUUFBWCxDQUFvQixHQUFwQixDQUFKLEVBQThCO0FBQ2pDLG9CQUFJLFdBQVcsVUFBWCxDQUFzQixVQUF0QixFQUFrQyxTQUFsQyxDQUFKLEVBQ0UsU0FBUyxVQUFULENBREYsS0FHRSxTQUFTLFFBQVQsQ0FIRjtlQURHLE1BTUEsSUFBSSxXQUFXLE1BQVgsQ0FBa0IsR0FBbEIsQ0FBSixFQUNILFNBQVMsTUFBVCxDQURHO0FBRUwscUJBQU8sTUFBUCxDQVhnQjthQUFsQixNQWFJO0FBQ0YsMkJBREU7YUFiSjtBQWdCQSxnQkFBRyxhQUFXLEdBQVgsRUFBZTtBQUNoQixxQkFBTyxTQUFQLENBRGdCO2FBQWxCO1dBbEJGOzs7QUFwQlMsbUJBNENKLDZDQUFpQixXQUFXO0FBQ2pDLGVBQUksSUFBSSxJQUFJLENBQUosRUFBTyxJQUFHLFVBQVUsTUFBVixFQUFrQixHQUFwQyxFQUF5QztBQUN2QyxnQkFBSSxVQUFVLFVBQVUsQ0FBVixDQUFWLENBRG1DO0FBRXZDLGlCQUFLLElBQUksS0FBSixJQUFhLE9BQWxCLEVBQTJCO0FBQ3pCLGtCQUFJLFFBQVEsY0FBUixDQUF1QixLQUF2QixDQUFKLEVBQW1DO0FBQ2pDLG9CQUFJLFFBQVEsUUFBUSxLQUFSLENBQVIsQ0FENkI7QUFFakMsb0JBQUcsU0FBUyxPQUFPLEtBQVAsSUFBZ0IsUUFBaEIsSUFBNEIsTUFBTSxPQUFOLENBQWMsT0FBZCxNQUF5QixDQUF6QixFQUEyQjtBQUNqRSwwQkFBUSxLQUFSLElBQWlCLElBQUksSUFBSixDQUFTLFNBQVMsTUFBTSxNQUFOLENBQWEsQ0FBYixDQUFULENBQVQsQ0FBakIsQ0FEaUU7aUJBQW5FO2VBRkY7YUFERjtXQUZGO0FBV0EsaUJBQU8sU0FBUCxDQVppQzs7O0FBNUN4QixtQkEyREosaUNBQVcsWUFBWSxXQUFVO0FBQ3RDLGNBQUksVUFBQyxDQUFXLE1BQVgsS0FBb0IsQ0FBcEIsSUFBeUIsQ0FBQyxTQUFELEVBQzVCLE9BQU8sS0FBUCxDQURGO0FBRUEsY0FBSSxjQUFhLEVBQUUsTUFBRixDQUFTLFVBQVQsRUFBcUI7bUJBQUssS0FBSyxHQUFMLENBQVMsRUFBRSxTQUFGLENBQVQsS0FBd0IsSUFBeEI7V0FBTCxDQUFyQixDQUF5RCxNQUF6RCxDQUhxQjtBQUl0QyxjQUFJLFdBQUMsR0FBWSxXQUFXLE1BQVgsR0FBb0IsR0FBakMsRUFDRixPQUFPLElBQVAsQ0FERjtBQUVBLGlCQUFPLEtBQVAsQ0FOc0M7OztBQTNEN0IsbUJBb0VKLHlCQUFPLE9BQ2Q7QUFDRSxpQkFBUyxJQUFJLElBQUosQ0FBUyxLQUFULE1BQW9CLGNBQXBCLElBQXNDLENBQUMsTUFBTSxJQUFJLElBQUosQ0FBUyxLQUFULENBQU4sQ0FBRCxDQURqRDs7O0FBckVXLG1CQXlFSiw2QkFBUyxPQUNoQjtBQUNFLGlCQUFRLE9BQU8sS0FBUCxLQUFpQixRQUFqQixJQUE2QixpQkFBaUIsTUFBakIsQ0FEdkM7OztBQTFFVyxtQkE4RUosNkJBQVMsT0FDaEI7QUFDRSxpQkFBUSxPQUFPLEtBQVAsS0FBaUIsUUFBakIsQ0FEVjs7O2VBL0VXIiwiZmlsZSI6ImhlbHBlcnMvZGF0YS1oZWxwZXIuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
