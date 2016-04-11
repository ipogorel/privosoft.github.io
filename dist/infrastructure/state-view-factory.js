"use strict";

System.register(["./../state/presentation/search-expression-state-view"], function (_export, _context) {
  var SearchExpressionStateView, StateViewFactory;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_statePresentationSearchExpressionStateView) {
      SearchExpressionStateView = _statePresentationSearchExpressionStateView.SearchExpressionStateView;
    }],
    execute: function () {
      _export("StateViewFactory", StateViewFactory = function () {
        function StateViewFactory() {
          _classCallCheck(this, StateViewFactory);
        }

        StateViewFactory.prototype.createStateView = function createStateView(stateObjectType, stateObject) {
          switch (stateObjectType) {
            case "searchBoxState":
              return new SearchExpressionStateView(stateObject);
            default:
              return null;
          }
        };

        return StateViewFactory;
      }());

      _export("StateViewFactory", StateViewFactory);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZnJhc3RydWN0dXJlL3N0YXRlLXZpZXctZmFjdG9yeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQVE7OztrQ0FDSztBQUVYLGlCQUZXLGdCQUVYLEdBQWE7Z0NBRkYsa0JBRUU7U0FBYjs7QUFGVyxtQ0FLWCwyQ0FBZ0IsaUJBQWlCLGFBQWE7QUFDNUMsa0JBQVEsZUFBUjtBQUNFLGlCQUFLLGdCQUFMO0FBQ00scUJBQU8sSUFBSSx5QkFBSixDQUE4QixXQUE5QixDQUFQLENBRE47QUFERjtBQUlRLHFCQUFPLElBQVAsQ0FETjtBQUhGLFdBRDRDOzs7ZUFMbkMiLCJmaWxlIjoiaW5mcmFzdHJ1Y3R1cmUvc3RhdGUtdmlldy1mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
