'use strict';

System.register(['../helpers/data-helper', '../helpers/string-helper', 'lodash'], function (_export, _context) {
  var DataHelper, StringHelper, lodash, _typeof, DslExpressionManager;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_helpersDataHelper) {
      DataHelper = _helpersDataHelper.DataHelper;
    }, function (_helpersStringHelper) {
      StringHelper = _helpersStringHelper.StringHelper;
    }, function (_lodash) {
      lodash = _lodash.default;
    }],
    execute: function () {
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
      };

      _export('DslExpressionManager', DslExpressionManager = function () {
        function DslExpressionManager(parser, dataHolder, fieldsList) {
          _classCallCheck(this, DslExpressionManager);

          this.dataHolder = dataHolder;
          this.fields = fieldsList;
          this.parser = parser;
        }

        DslExpressionManager.prototype.populate = function populate(searchStr, lastWord) {
          var parserError = this.getParserError(searchStr);
          return this._getIntellisenseData(searchStr, lastWord, parserError);
        };

        DslExpressionManager.prototype.parse = function parse(searchStr) {
          var expression = this.parser.parse(searchStr);
          return this._normalizeSerachExpression(expression);
        };

        DslExpressionManager.prototype.validate = function validate(searchStr) {
          return this.parser.validate(searchStr);
        };

        DslExpressionManager.prototype.expectedToken = function expectedToken(searchStr) {
          var tokenName = "";
          var parserError = this.getParserError(searchStr);
          if (parserError != null) tokenName = this._interpreteParserError(parserError);
          return tokenName;
        };

        DslExpressionManager.prototype.getParserError = function getParserError(searchStr) {
          var result = null;
          if (searchStr != "") {
            try {
              this.parse(searchStr);
              try {
                this.parse(searchStr + "^");
              } catch (ex2) {
                result = ex2;
              }
            } catch (ex) {
              result = ex;
            }
          }
          return result;
        };

        DslExpressionManager.prototype._getIntellisenseData = function _getIntellisenseData(searchStr, lastWord, pegException) {
          var _this = this;

          var type = '';
          var result = [];
          var lastFldName = '';

          if (!pegException) return new Promise(function (resolve, reject) {
            resolve([]);
          });

          var tokenName = this._interpreteParserError(pegException);
          return new Promise(function (resolve, reject) {
            switch (tokenName) {
              case "STRING_FIELD_NAME":
              case "NUMERIC_FIELD_NAME":
              case "DATE_FIELD_NAME":
                var filteredFields = lastWord ? _.filter(_this.fields, function (f) {
                  return f.startsWith(lastWord);
                }) : _this.fields;
                resolve(_this._normalizeData("field", filteredFields.sort()));
                break;
              case "STRING_OPERATOR_EQUAL":
              case "STRING_OPERATOR_IN":
                resolve(_this._normalizeData("operator", _this._getStringComparisonOperatorsArray()));
                break;
              case "STRING_VALUE":
              case "STRING_PATTERN":
                lastFldName = _this._getLastFieldName(searchStr, _this.fields, pegException.column);
                _this._getFieldValuesArray(lastFldName, lastWord).then(function (data) {
                  resolve(_this._normalizeData("string", data));
                });
                break;
              case "STRING_VALUES_ARRAY":
                lastFldName = _this._getLastFieldName(searchStr, _this.fields, pegException.column);
                _this._getFieldValuesArray(lastFldName, lastWord).then(function (data) {
                  resolve(_this._normalizeData("array_string", data));
                });
                break;
                resolve(_this._normalizeData("array_string", []));
                break;
              case "OPERATOR":
                resolve(_this._normalizeData("operator", _this._getComparisonOperatorsArray()));
                break;
              case "LOGIC_OPERATOR":
              case "end of input":
                resolve(_this._normalizeData("operator", _this._getLogicalOperatorsArray()));
                break;
              default:
                resolve([]);
                break;
            }
          });
        };

        DslExpressionManager.prototype._interpreteParserError = function _interpreteParserError(ex) {
          if (Object.prototype.toString.call(ex.expected) == "[object Array]") {
            for (var _iterator = ex.expected, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
              var _ref;

              if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
              } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
              }

              var desc = _ref;

              if (desc.type == "other" || desc.type == "end") {
                return desc.description;
              }
            }
          }
          return "";
        };

        DslExpressionManager.prototype._getLogicalOperatorsArray = function _getLogicalOperatorsArray() {
          return ["and", "or"];
        };

        DslExpressionManager.prototype._getComparisonOperatorsArray = function _getComparisonOperatorsArray() {
          return ["!=", "=", ">", "<", ">=", "<="];
        };

        DslExpressionManager.prototype._getLastFieldName = function _getLastFieldName(searchStr, fieldsArray, index) {
          var tmpArr = searchStr.substr(0, index).split(" ");

          var _loop = function _loop(i) {
            if (fieldsArray.findIndex(function (x) {
              return x == tmpArr[i].trim();
            }) >= 0) return {
                v: tmpArr[i].trim()
              };
          };

          for (var i = tmpArr.length - 1; i >= 0; i--) {
            var _ret = _loop(i);

            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
          }
          return "";
        };

        DslExpressionManager.prototype._getStringComparisonOperatorsArray = function _getStringComparisonOperatorsArray() {
          return ["=", "in"];
        };

        DslExpressionManager.prototype._getFieldValuesArray = function _getFieldValuesArray(fieldName, lastWord) {
          var _this2 = this;

          this.dataHolder.take = 100;
          this.dataHolder.skip = 0;
          if (lastWord) this.dataHolder.query.serverSideFilter = this.parse(fieldName + " = '" + lastWord + "%'");else this.dataHolder.query.serverSideFilter = "";
          this.dataHolder.fields = [fieldName];
          return this.dataHolder.load().then(function (d) {
            var result = _.map(_this2.dataHolder.data, fieldName);
            return _.uniq(result).sort();
          });
        };

        DslExpressionManager.prototype._normalizeData = function _normalizeData(type, dataArray) {
          return _.map(dataArray, function (d) {
            return { type: type, value: d };
          });
        };

        DslExpressionManager.prototype._normalizeSerachExpression = function _normalizeSerachExpression(searchExpression) {
          var expr = new RegExp('record.([a-zA-Z0-9\%\_\-]*)', 'g');
          var match;
          while ((match = expr.exec(searchExpression)) !== null) {
            for (var _iterator2 = this.fields, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
              var _ref2;

              if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
              } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
              }

              var fld = _ref2;

              if (match[1].toLowerCase() === fld.toLowerCase()) searchExpression = StringHelper.replaceAll(searchExpression, match[0], 'record.' + fld);
            }
          }
          return searchExpression;
        };

        return DslExpressionManager;
      }());

      _export('DslExpressionManager', DslExpressionManager);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRzbC9kc2wtZXhwcmVzc2lvbi1tYW5hZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBUTs7QUFDQTs7QUFDRDs7Ozs7Ozs7O3NDQUVNO0FBRVgsaUJBRlcsb0JBRVgsQ0FBWSxNQUFaLEVBQW9CLFVBQXBCLEVBQWdDLFVBQWhDLEVBQTRDO2dDQUZqQyxzQkFFaUM7O0FBQzFDLGVBQUssVUFBTCxHQUFrQixVQUFsQixDQUQwQztBQUUxQyxlQUFLLE1BQUwsR0FBYyxVQUFkLENBRjBDO0FBRzFDLGVBQUssTUFBTCxHQUFjLE1BQWQsQ0FIMEM7U0FBNUM7O0FBRlcsdUNBUVgsNkJBQVMsV0FBVyxVQUFVO0FBQzVCLGNBQUksY0FBYyxLQUFLLGNBQUwsQ0FBb0IsU0FBcEIsQ0FBZCxDQUR3QjtBQUU1QixpQkFBTyxLQUFLLG9CQUFMLENBQTBCLFNBQTFCLEVBQXFDLFFBQXJDLEVBQStDLFdBQS9DLENBQVAsQ0FGNEI7OztBQVJuQix1Q0FhWCx1QkFBTSxXQUFVO0FBQ2QsY0FBSSxhQUFhLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsU0FBbEIsQ0FBYixDQURVO0FBRWQsaUJBQU8sS0FBSywwQkFBTCxDQUFnQyxVQUFoQyxDQUFQLENBRmM7OztBQWJMLHVDQWtCWCw2QkFBUyxXQUFXO0FBQ2xCLGlCQUFPLEtBQUssTUFBTCxDQUFZLFFBQVosQ0FBcUIsU0FBckIsQ0FBUCxDQURrQjs7O0FBbEJULHVDQXNCWCx1Q0FBYyxXQUFXO0FBQ3ZCLGNBQUksWUFBWSxFQUFaLENBRG1CO0FBRXZCLGNBQUksY0FBYyxLQUFLLGNBQUwsQ0FBb0IsU0FBcEIsQ0FBZCxDQUZtQjtBQUd2QixjQUFJLGVBQWEsSUFBYixFQUNGLFlBQVksS0FBSyxzQkFBTCxDQUE0QixXQUE1QixDQUFaLENBREY7QUFFQSxpQkFBTyxTQUFQLENBTHVCOzs7QUF0QmQsdUNBK0JYLHlDQUFlLFdBQ2Y7QUFDRSxjQUFJLFNBQVMsSUFBVCxDQUROO0FBRUUsY0FB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K0M7OztBQTFIdEMsdUNBb0lYLG1GQUFxQztBQUNuQyxpQkFBUSxDQUFDLEdBQUQsRUFBTSxJQUFOLENBQVIsQ0FEbUM7OztBQXBJMUIsdUNBeUlYLHFEQUFxQixXQUFXLFVBQVU7OztBQUN4QyxlQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsR0FBdUIsR0FBdkIsQ0FEd0M7QUFFeEMsZUFBSyxVQUFMLENBQWdCLElBQWhCLEdBQXVCLENBQXZCLENBRndDO0FBR3hDLGNBQUksUUFBSixFQUNFLEtBQUssVUFBTCxDQUFnQixLQUFoQixDQUFzQixnQkFBdEIsR0FBeUMsS0FBSyxLQUFMLENBQVcsWUFBWSxNQUFaLEdBQXFCLFFBQXJCLEdBQWdDLElBQWhDLENBQXBELENBREYsS0FHRSxLQUFLLFVBQUwsQ0FBZ0IsS0FBaEIsQ0FBc0IsZ0JBQXRCLEdBQXdDLEVBQXhDLENBSEY7QUFJQSxlQUFLLFVBQUwsQ0FBZ0IsTUFBaEIsR0FBeUIsQ0FBQyxTQUFELENBQXpCLENBUHdDO0FBUXhDLGlCQUFPLEtBQUssVUFBTCxDQUFnQixJQUFoQixHQUF1QixJQUF2QixDQUE0QixhQUFHO0FBQ3BDLGdCQUFJLFNBQVMsRUFBRSxHQUFGLENBQU0sT0FBSyxVQUFMLENBQWdCLElBQWhCLEVBQXFCLFNBQTNCLENBQVQsQ0FEZ0M7QUFFcEMsbUJBQU8sRUFBRSxJQUFGLENBQU8sTUFBUCxFQUFlLElBQWYsRUFBUCxDQUZvQztXQUFILENBQW5DLENBUndDOzs7QUF6SS9CLHVDQXVKWCx5Q0FBZSxNQUFNLFdBQVc7QUFDOUIsaUJBQU8sRUFBRSxHQUFGLENBQU0sU0FBTixFQUFnQixhQUFHO0FBQUUsbUJBQU8sRUFBRSxNQUFNLElBQU4sRUFBWSxPQUFPLENBQVAsRUFBckIsQ0FBRjtXQUFILENBQXZCLENBRDhCOzs7QUF2SnJCLHVDQTJKWCxpRUFBMkIsa0JBQWlCO0FBQzFDLGNBQUksT0FBTyxJQUFJLE1BQUosQ0FBVyw2QkFBWCxFQUEwQyxHQUExQyxDQUFQLENBRHNDO0FBRTFDLGNBQUksS0FBSixDQUYwQztBQUcxQyxpQkFBTyxDQUFDLFFBQVEsS0FBSyxJQUFMLENBQVUsZ0JBQVYsQ0FBUixDQUFELEtBQTBDLElBQTFDLEVBQWdEO0FBQ3JELGtDQUFnQixLQUFLLE1BQUwscUhBQWhCLElBQTRCOzs7Ozs7Ozs7Ozs7a0JBQW5CLFlBQW1COztBQUMxQixrQkFBSSxNQUFNLENBQU4sRUFBUyxXQUFULE9BQXlCLElBQUksV0FBSixFQUF6QixFQUNBLG1CQUFtQixhQUFhLFVBQWIsQ0FBd0IsZ0JBQXhCLEVBQTBDLE1BQU0sQ0FBTixDQUExQyxFQUFvRCxZQUFZLEdBQVosQ0FBdkUsQ0FESjthQURGO1dBREY7QUFNQSxpQkFBTyxnQkFBUCxDQVQwQzs7O2VBM0pqQyIsImZpbGUiOiJkc2wvZHNsLWV4cHJlc3Npb24tbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
