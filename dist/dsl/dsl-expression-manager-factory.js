'use strict';

System.register(['aurelia-framework', '../helpers/data-helper', 'lodash', '../dsl/dsl-expression-manager', '../dsl/expression-parser-factory'], function (_export, _context) {
  var inject, DataHelper, lodash, DslExpressionManager, ExpressionParserFactory, _dec, _class, DslExpressionManagerFactory;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_helpersDataHelper) {
      DataHelper = _helpersDataHelper.DataHelper;
    }, function (_lodash) {
      lodash = _lodash.default;
    }, function (_dslDslExpressionManager) {
      DslExpressionManager = _dslDslExpressionManager.DslExpressionManager;
    }, function (_dslExpressionParserFactory) {
      ExpressionParserFactory = _dslExpressionParserFactory.ExpressionParserFactory;
    }],
    execute: function () {
      _export('DslExpressionManagerFactory', DslExpressionManagerFactory = (_dec = inject(ExpressionParserFactory), _dec(_class = function () {
        function DslExpressionManagerFactory(expressionParserFactory) {
          _classCallCheck(this, DslExpressionManagerFactory);

          this.expressionParserFactory = expressionParserFactory;
        }

        DslExpressionManagerFactory.prototype.createInstance = function createInstance(dataSource, fields) {
          var _this = this;

          return dataSource.transport.readService.getSchema().then(function (schema) {
            var fields = schema.fields;
            var allFields = _.map(fields, "field");
            var numericFields = _.map(DataHelper.getNumericFields(fields), "field");
            var stringFields = _.map(DataHelper.getStringFields(fields), "field");
            var dateFields = _.map(DataHelper.getDateFields(fields), "field");
            return _this.expressionParserFactory.createInstance(numericFields, stringFields, dateFields).then(function (parser) {
              return new DslExpressionManager(parser, dataSource, allFields);
            });
          });
        };

        return DslExpressionManagerFactory;
      }()) || _class));

      _export('DslExpressionManagerFactory', DslExpressionManagerFactory);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRzbC9kc2wtZXhwcmVzc2lvbi1tYW5hZ2VyLWZhY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFROztBQUNBOztBQUNEOztBQUNDOztBQUNBOzs7NkNBR0ssc0NBRFosT0FBTyx1QkFBUDtBQUdDLGlCQUZXLDJCQUVYLENBQVksdUJBQVosRUFBcUM7Z0NBRjFCLDZCQUUwQjs7QUFDbkMsZUFBSyx1QkFBTCxHQUErQix1QkFBL0IsQ0FEbUM7U0FBckM7O0FBRlcsOENBTVgseUNBQWUsWUFBWSxRQUFROzs7QUFDakMsaUJBQU8sV0FBVyxTQUFYLENBQXFCLFdBQXJCLENBQWlDLFNBQWpDLEdBQTZDLElBQTdDLENBQWtELGtCQUFRO0FBQy9ELGdCQUFJLFNBQVMsT0FBTyxNQUFQLENBRGtEO0FBRS9ELGdCQUFJLFlBQVksRUFBRSxHQUFGLENBQU0sTUFBTixFQUFhLE9BQWIsQ0FBWixDQUYyRDtBQUcvRCxnQkFBSSxnQkFBZ0IsRUFBRSxHQUFGLENBQU0sV0FBVyxnQkFBWCxDQUE0QixNQUE1QixDQUFOLEVBQTBDLE9BQTFDLENBQWhCLENBSDJEO0FBSS9ELGdCQUFJLGVBQWUsRUFBRSxHQUFGLENBQU0sV0FBVyxlQUFYLENBQTJCLE1BQTNCLENBQU4sRUFBeUMsT0FBekMsQ0FBZixDQUoyRDtBQUsvRCxnQkFBSSxhQUFhLEVBQUUsR0FBRixDQUFNLFdBQVcsYUFBWCxDQUF5QixNQUF6QixDQUFOLEVBQXVDLE9BQXZDLENBQWIsQ0FMMkQ7QUFNL0QsbUJBQU8sTUFBSyx1QkFBTCxDQUNKLGNBREksQ0FDVyxhQURYLEVBQzBCLFlBRDFCLEVBQ3dDLFVBRHhDLEVBRUosSUFGSSxDQUVDLGtCQUFRO0FBQ1oscUJBQU8sSUFBSSxvQkFBSixDQUF5QixNQUF6QixFQUFpQyxVQUFqQyxFQUE2QyxTQUE3QyxDQUFQLENBRFk7YUFBUixDQUZSLENBTitEO1dBQVIsQ0FBekQsQ0FEaUM7OztlQU54QiIsImZpbGUiOiJkc2wvZHNsLWV4cHJlc3Npb24tbWFuYWdlci1mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
