"use strict";

System.register(["state/presentation/search-expression-state-view"], function (_export, _context) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC9pbmZyYXN0cnVjdHVyZS9zdGF0ZS12aWV3LWZhY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFROzs7a0NBQ0s7QUFFWCxpQkFGVyxnQkFFWCxHQUFhO2dDQUZGLGtCQUVFO1NBQWI7O0FBRlcsbUNBS1gsMkNBQWdCLGlCQUFpQixhQUFhO0FBQzVDLGtCQUFRLGVBQVI7QUFDRSxpQkFBSyxnQkFBTDtBQUNNLHFCQUFPLElBQUkseUJBQUosQ0FBOEIsV0FBOUIsQ0FBUCxDQUROO0FBREY7QUFJUSxxQkFBTyxJQUFQLENBRE47QUFIRixXQUQ0Qzs7O2VBTG5DIiwiZmlsZSI6ImxheW91dC9pbmZyYXN0cnVjdHVyZS9zdGF0ZS12aWV3LWZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
