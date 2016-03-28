"use strict";

System.register(["../helpers/string-helper"], function (_export, _context) {
  var StringHelper, _createClass, DataHolder;

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

      _export("DataHolder", DataHolder = function () {
        function DataHolder(dataSource) {
          _classCallCheck(this, DataHolder);

          this._dataSource = dataSource;
        }

        DataHolder.prototype.load = function load() {
          return this.dataSource.fill(this).then(function (dh) {
            return dh;
          });
        };

        DataHolder.prototype.cacheKey = function cacheKey() {
          return this._dataSource.name + Math.abs(StringHelper.hashCode((this.query.serverSideFilter ? this.query.serverSideFilter : "") + (this.sort ? this.sort : "") + (this.sortDir ? this.sortDir : "") + (this.take ? this.take : "0") + (this.skip ? this.skip : "0")));
        };

        _createClass(DataHolder, [{
          key: "dataSource",
          get: function get() {
            return this._dataSource;
          }
        }, {
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
        }, {
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
        }]);

        return DataHolder;
      }());

      _export("DataHolder", DataHolder);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvZGF0YS1ob2xkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBRUs7QUFDWCxpQkFEVyxVQUNYLENBQVksVUFBWixFQUF1QjtnQ0FEWixZQUNZOztBQUNyQixlQUFLLFdBQUwsR0FBbUIsVUFBbkIsQ0FEcUI7U0FBdkI7O0FBRFcsNkJBeUVYLHVCQUFNO0FBQ0osaUJBQU8sS0FBSyxVQUFMLENBQWdCLElBQWhCLENBQXFCLElBQXJCLEVBQTJCLElBQTNCLENBQWdDLGNBQUk7QUFDekMsbUJBQU8sRUFBUCxDQUR5QztXQUFKLENBQXZDLENBREk7OztBQXpFSyw2QkErRVgsK0JBQVU7QUFDUixpQkFBTyxLQUFLLFdBQUwsQ0FBaUIsSUFBakIsR0FBd0IsS0FBSyxHQUFMLENBQVMsYUFBYSxRQUFiLENBQ3RDLENBQUMsS0FBSyxLQUFMLENBQVcsZ0JBQVgsR0FBNEIsS0FBSyxLQUFMLENBQVcsZ0JBQVgsR0FBNEIsRUFBeEQsQ0FBRCxJQUNDLEtBQUssSUFBTCxHQUFVLEtBQUssSUFBTCxHQUFVLEVBQXBCLENBREQsSUFFQyxLQUFLLE9BQUwsR0FBYSxLQUFLLE9BQUwsR0FBYSxFQUExQixDQUZELElBR0MsS0FBSyxJQUFMLEdBQVUsS0FBSyxJQUFMLEdBQVUsR0FBcEIsQ0FIRCxJQUlDLEtBQUssSUFBTCxHQUFVLEtBQUssSUFBTCxHQUFVLEdBQXBCLENBSkQsQ0FENkIsQ0FBeEIsQ0FEQzs7O3FCQS9FQzs7OEJBS0s7QUFDZCxtQkFBTyxLQUFLLFdBQUwsQ0FETzs7Ozs4QkFJTjtBQUNSLG1CQUFPLEtBQUssS0FBTCxDQURDOzs0QkFHRCxPQUFNO0FBQ2IsaUJBQUssS0FBTCxHQUFhLEtBQWIsQ0FEYTs7Ozs4QkFJSjtBQUNULG1CQUFPLEtBQUssTUFBTCxDQURFOzs0QkFHRCxPQUFNO0FBQ2QsaUJBQUssTUFBTCxHQUFjLEtBQWQsQ0FEYzs7Ozs4QkFLTDtBQUNULG1CQUFPLEtBQUssTUFBTCxDQURFOzs0QkFHRCxPQUFNO0FBQ2QsaUJBQUssTUFBTCxHQUFjLEtBQWQsQ0FEYzs7Ozs4QkFJTjtBQUNSLG1CQUFPLEtBQUssS0FBTCxDQURDOzs0QkFHRCxPQUFNO0FBQ2IsaUJBQUssS0FBTCxHQUFhLEtBQWIsQ0FEYTs7Ozs4QkFJSjtBQUNULG1CQUFPLEtBQUssTUFBTCxDQURFOzs0QkFHRCxPQUFNO0FBQ2QsaUJBQUssTUFBTCxHQUFjLEtBQWQsQ0FEYzs7Ozs4QkFJSDtBQUNYLG1CQUFPLEtBQUssS0FBTCxDQURJOzs0QkFHRCxPQUFNO0FBQ2hCLGlCQUFLLEtBQUwsR0FBYSxLQUFiLENBRGdCOzs7OzhCQUlSO0FBQ1IsbUJBQU8sS0FBSyxLQUFMLENBREM7OzRCQUdELE9BQU07QUFDYixpQkFBSyxLQUFMLEdBQWEsS0FBYixDQURhOzs7OzhCQUlIO0FBQ1YsbUJBQU8sS0FBSyxPQUFMLENBREc7OzRCQUdELE9BQU07QUFDZixpQkFBSyxPQUFMLEdBQWUsS0FBZixDQURlOzs7OzhCQUlQO0FBQ1IsbUJBQU8sS0FBSyxLQUFMLENBREM7OzRCQUdELE9BQU07QUFDYixpQkFBSyxLQUFMLEdBQWEsS0FBYixDQURhOzs7O2VBckVKIiwiZmlsZSI6ImRhdGEvZGF0YS1ob2xkZXIuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
