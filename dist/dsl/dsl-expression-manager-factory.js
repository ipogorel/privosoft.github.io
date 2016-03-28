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

        DslExpressionManagerFactory.prototype.createInstance = function createInstance(dataHolder, fields) {
          var allFields = _.map(fields, "field");
          var numericFields = _.map(DataHelper.getNumericFields(fields), "field");
          var stringFields = _.map(DataHelper.getStringFields(fields), "field");
          var dateFields = _.map(DataHelper.getDateFields(fields), "field");
          return this.expressionParserFactory.createInstance(numericFields, stringFields, dateFields).then(function (parser) {
            return new DslExpressionManager(parser, dataHolder, allFields);
          });
        };

        return DslExpressionManagerFactory;
      }()) || _class));

      _export('DslExpressionManagerFactory', DslExpressionManagerFactory);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRzbC9kc2wtZXhwcmVzc2lvbi1tYW5hZ2VyLWZhY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFROztBQUNBOztBQUNEOztBQUNDOztBQUNBOzs7NkNBR0ssc0NBRFosT0FBTyx1QkFBUDtBQUdDLGlCQUZXLDJCQUVYLENBQVksdUJBQVosRUFBcUM7Z0NBRjFCLDZCQUUwQjs7QUFDbkMsZUFBSyx1QkFBTCxHQUErQix1QkFBL0IsQ0FEbUM7U0FBckM7O0FBRlcsOENBTVgseUNBQWUsWUFBWSxRQUFRO0FBQy9CLGNBQUksWUFBWSxFQUFFLEdBQUYsQ0FBTSxNQUFOLEVBQWEsT0FBYixDQUFaLENBRDJCO0FBRS9CLGNBQUksZ0JBQWdCLEVBQUUsR0FBRixDQUFNLFdBQVcsZ0JBQVgsQ0FBNEIsTUFBNUIsQ0FBTixFQUEwQyxPQUExQyxDQUFoQixDQUYyQjtBQUcvQixjQUFJLGVBQWUsRUFBRSxHQUFGLENBQU0sV0FBVyxlQUFYLENBQTJCLE1BQTNCLENBQU4sRUFBeUMsT0FBekMsQ0FBZixDQUgyQjtBQUkvQixjQUFJLGFBQWEsRUFBRSxHQUFGLENBQU0sV0FBVyxhQUFYLENBQXlCLE1BQXpCLENBQU4sRUFBdUMsT0FBdkMsQ0FBYixDQUoyQjtBQUsvQixpQkFBTyxLQUFLLHVCQUFMLENBQ0osY0FESSxDQUNXLGFBRFgsRUFDMEIsWUFEMUIsRUFDd0MsVUFEeEMsRUFFSixJQUZJLENBRUMsa0JBQVE7QUFDWixtQkFBTyxJQUFJLG9CQUFKLENBQXlCLE1BQXpCLEVBQWlDLFVBQWpDLEVBQTZDLFNBQTdDLENBQVAsQ0FEWTtXQUFSLENBRlIsQ0FMK0I7OztlQU54QiIsImZpbGUiOiJkc2wvZHNsLWV4cHJlc3Npb24tbWFuYWdlci1mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
