"use strict";

System.register([], function (_export, _context) {
  var ExpressionParser;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("ExpressionParser", ExpressionParser = function () {
        function ExpressionParser(pegParser) {
          _classCallCheck(this, ExpressionParser);

          this.parser = pegParser;
        }

        ExpressionParser.prototype.parse = function parse(searchString) {
          return this.parser.parse(searchString);
        };

        ExpressionParser.prototype.validate = function validate(searchString) {
          try {
            this.parser.parse(searchString);
            return true;
          } catch (ex) {
            return false;
          }
        };

        return ExpressionParser;
      }());

      _export("ExpressionParser", ExpressionParser);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRzbC9leHByZXNzaW9uLXBhcnNlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztrQ0FHYTtBQUVYLGlCQUZXLGdCQUVYLENBQVksU0FBWixFQUNBO2dDQUhXLGtCQUdYOztBQUNFLGVBQUssTUFBTCxHQUFlLFNBQWYsQ0FERjtTQURBOztBQUZXLG1DQU9YLHVCQUFNLGNBQ047QUFDRSxpQkFBTyxLQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLFlBQWxCLENBQVAsQ0FERjs7O0FBUlcsbUNBWVgsNkJBQVMsY0FDVDtBQUNFLGNBQUc7QUFDRCxpQkFBSyxNQUFMLENBQVksS0FBWixDQUFrQixZQUFsQixFQURDO0FBRUQsbUJBQU8sSUFBUCxDQUZDO1dBQUgsQ0FJQSxPQUFNLEVBQU4sRUFDQTtBQUNFLG1CQUFPLEtBQVAsQ0FERjtXQURBOzs7ZUFsQlMiLCJmaWxlIjoiZHNsL2V4cHJlc3Npb24tcGFyc2VyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
