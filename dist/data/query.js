"use strict";

System.register(["../helpers/string-helper"], function (_export, _context) {
  var StringHelper, _createClass, Query;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_helpersStringHelper) {
      StringHelper = _helpersStringHelper.StringHelper;
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

      _export("Query", Query = function () {
        function Query() {
          _classCallCheck(this, Query);
        }

        Query.prototype.cacheKey = function cacheKey() {
          return Math.abs(StringHelper.hashCode((this.serverSideFilter ? this.serverSideFilter : "") + (this.fields ? this.fields.join("") : "") + (this.sort ? this.sort : "") + (this.sortDir ? this.sortDir : "") + (this.take ? this.take : "0") + (this.skip ? this.skip : "0")));
        };

        _createClass(Query, [{
          key: "sort",
          get: function get() {
            return this._sort;
          },
          set: function set(value) {
            this._sort = value;
          }
        }, {
          key: "group",
          get: function get() {
            return this._group;
          },
          set: function set(value) {
            this._group = value;
          }
        }, {
          key: "sortDir",
          get: function get() {
            return this._sort;
          },
          set: function set(value) {
            this._sort = value;
          }
        }, {
          key: "take",
          get: function get() {
            return this._take;
          },
          set: function set(value) {
            this._take = value;
          }
        }, {
          key: "fields",
          get: function get() {
            return this._fields;
          },
          set: function set(value) {
            this._fields = value;
          }
        }, {
          key: "skip",
          get: function get() {
            return this._skip;
          },
          set: function set(value) {
            this._skip = value;
          }
        }, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvcXVlcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBRUs7Ozs7O3dCQTJEWCwrQkFBVTtBQUNSLGlCQUFPLEtBQUssR0FBTCxDQUFTLGFBQWEsUUFBYixDQUNaLENBQUMsSUFBQyxDQUFLLGdCQUFMLEdBQXVCLEtBQUssZ0JBQUwsR0FBc0IsRUFBOUMsQ0FBRCxJQUNDLEtBQUssTUFBTCxHQUFZLEtBQUssTUFBTCxDQUFZLElBQVosQ0FBaUIsRUFBakIsQ0FBWixHQUFpQyxFQUFqQyxDQURELElBRUMsS0FBSyxJQUFMLEdBQVUsS0FBSyxJQUFMLEdBQVUsRUFBcEIsQ0FGRCxJQUdDLEtBQUssT0FBTCxHQUFhLEtBQUssT0FBTCxHQUFhLEVBQTFCLENBSEQsSUFJQyxLQUFLLElBQUwsR0FBVSxLQUFLLElBQUwsR0FBVSxHQUFwQixDQUpELElBS0MsS0FBSyxJQUFMLEdBQVUsS0FBSyxJQUFMLEdBQVUsR0FBcEIsQ0FMRCxDQURHLENBQVAsQ0FEUTs7O3FCQTNEQzs7OEJBRUQ7QUFDUixtQkFBTyxLQUFLLEtBQUwsQ0FEQzs7NEJBR0QsT0FBTTtBQUNiLGlCQUFLLEtBQUwsR0FBYSxLQUFiLENBRGE7Ozs7OEJBSUo7QUFDVCxtQkFBTyxLQUFLLE1BQUwsQ0FERTs7NEJBR0QsT0FBTTtBQUNkLGlCQUFLLE1BQUwsR0FBYyxLQUFkLENBRGM7Ozs7OEJBSUg7QUFDWCxtQkFBTyxLQUFLLEtBQUwsQ0FESTs7NEJBR0QsT0FBTTtBQUNoQixpQkFBSyxLQUFMLEdBQWEsS0FBYixDQURnQjs7Ozs4QkFJUjtBQUNSLG1CQUFPLEtBQUssS0FBTCxDQURDOzs0QkFHRCxPQUFNO0FBQ2IsaUJBQUssS0FBTCxHQUFhLEtBQWIsQ0FEYTs7Ozs4QkFJSDtBQUNWLG1CQUFPLEtBQUssT0FBTCxDQURHOzs0QkFHRCxPQUFNO0FBQ2YsaUJBQUssT0FBTCxHQUFlLEtBQWYsQ0FEZTs7Ozs4QkFJUDtBQUNSLG1CQUFPLEtBQUssS0FBTCxDQURDOzs0QkFHRCxPQUFNO0FBQ2IsaUJBQUssS0FBTCxHQUFhLEtBQWIsQ0FEYTs7Ozs4QkFZUTtBQUNyQixtQkFBTyxLQUFLLGlCQUFMLENBRGM7OzRCQUdGLE9BQU87QUFDMUIsaUJBQUssaUJBQUwsR0FBeUIsS0FBekIsQ0FEMEI7Ozs7ZUF2RGpCIiwiZmlsZSI6ImRhdGEvcXVlcnkuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
