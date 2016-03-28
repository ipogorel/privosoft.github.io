'use strict';

System.register(['aurelia-framework', 'aurelia-fetch-client', '../dsl/expression-parser', 'pegjs'], function (_export, _context) {
  var inject, HttpClient, ExpressionParser, peg, _dec, _class, ExpressionParserFactory;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
    }, function (_dslExpressionParser) {
      ExpressionParser = _dslExpressionParser.ExpressionParser;
    }, function (_pegjs) {
      peg = _pegjs.default;
    }],
    execute: function () {
      _export('ExpressionParserFactory', ExpressionParserFactory = (_dec = inject(HttpClient), _dec(_class = function () {
        function ExpressionParserFactory(http) {
          _classCallCheck(this, ExpressionParserFactory);

          http.configure(function (config) {
            config.useStandardConfiguration();
          });
          this.http = http;
        }

        ExpressionParserFactory.prototype.createInstance = function createInstance(numericFieldList, stringFieldList, dateFieldList) {
          var that = this;
          return this.http.fetch('/parser_data/peg.js.grammar.txt').then(function (response) {
            return response.text();
          }).then(function (text) {
            var parserText = text.replace('@S@', that.concatenateFieldList(stringFieldList)).replace('@N@', that.concatenateFieldList(numericFieldList)).replace('@D@', that.concatenateFieldList(dateFieldList));
            return new ExpressionParser(peg.buildParser(parserText));
          });
        };

        ExpressionParserFactory.prototype.concatenateFieldList = function concatenateFieldList(fieldList) {
          for (var i = 0; i < fieldList.length; i++) {
            fieldList[i] = '\'' + fieldList[i] + '\'i';
          }
          if (fieldList.length > 0) return fieldList.join('/ ');else return "'unknown_field'";
        };

        return ExpressionParserFactory;
      }()) || _class));

      _export('ExpressionParserFactory', ExpressionParserFactory);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRzbC9leHByZXNzaW9uLXBhcnNlci1mYWN0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBUTs7QUFDQTs7QUFDQTs7QUFDRDs7O3lDQUdNLGtDQURaLE9BQU8sVUFBUDtBQUdDLGlCQUZXLHVCQUVYLENBQVksSUFBWixFQUFrQjtnQ0FGUCx5QkFFTzs7QUFDaEIsZUFBSyxTQUFMLENBQWUsa0JBQVU7QUFDdkIsbUJBQU8sd0JBQVAsR0FEdUI7V0FBVixDQUFmLENBRGdCO0FBSWhCLGVBQUssSUFBTCxHQUFZLElBQVosQ0FKZ0I7U0FBbEI7O0FBRlcsMENBU1gseUNBQWUsa0JBQWtCLGlCQUFpQixlQUFlO0FBQy9ELGNBQUksT0FBTyxJQUFQLENBRDJEO0FBRS9ELGlCQUFPLEtBQUssSUFBTCxDQUNKLEtBREksQ0FDRSxpQ0FERixFQUVKLElBRkksQ0FFQzttQkFBWSxTQUFTLElBQVQ7V0FBWixDQUZELENBR0osSUFISSxDQUdDLGdCQUFNO0FBQ1YsZ0JBQUksYUFBYSxLQUFLLE9BQUwsQ0FBYSxLQUFiLEVBQW9CLEtBQUssb0JBQUwsQ0FBMEIsZUFBMUIsQ0FBcEIsRUFDZCxPQURjLENBQ04sS0FETSxFQUNDLEtBQUssb0JBQUwsQ0FBMEIsZ0JBQTFCLENBREQsRUFFZCxPQUZjLENBRU4sS0FGTSxFQUVDLEtBQUssb0JBQUwsQ0FBMEIsYUFBMUIsQ0FGRCxDQUFiLENBRE07QUFJVixtQkFBTyxJQUFJLGdCQUFKLENBQXFCLElBQUksV0FBSixDQUFnQixVQUFoQixDQUFyQixDQUFQLENBSlU7V0FBTixDQUhSLENBRitEOzs7QUFUdEQsMENBc0JYLHFEQUFxQixXQUFVO0FBQzdCLGVBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLFVBQVUsTUFBVixFQUFrQixHQUF0QyxFQUEyQztBQUN6QyxzQkFBVSxDQUFWLElBQWUsT0FBTyxVQUFVLENBQVYsQ0FBUCxHQUFzQixLQUF0QixDQUQwQjtXQUEzQztBQUdBLGNBQUksVUFBVSxNQUFWLEdBQWlCLENBQWpCLEVBQ0YsT0FBTyxVQUFVLElBQVYsQ0FBZSxJQUFmLENBQVAsQ0FERixLQUdFLE9BQU8saUJBQVAsQ0FIRjs7O2VBMUJTIiwiZmlsZSI6ImRzbC9leHByZXNzaW9uLXBhcnNlci1mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
