"use strict";

System.register([], function (_export, _context) {
  var _createClass, UserStateView;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
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

      _export("UserStateView", UserStateView = function () {
        function UserStateView(userStateObj) {
          _classCallCheck(this, UserStateView);

          this._stateObject = userStateObj;
        }

        _createClass(UserStateView, [{
          key: "stateObject",
          get: function get() {
            return this._stateObject;
          },
          set: function set(value) {
            this._stateObject = value;
          }
        }]);

        return UserStateView;
      }());

      _export("UserStateView", UserStateView);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXRlL3ByZXNlbnRhdGlvbi9zdGF0ZS12aWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OytCQUFhO0FBRVgsaUJBRlcsYUFFWCxDQUFZLFlBQVosRUFBMEI7Z0NBRmYsZUFFZTs7QUFDeEIsZUFBSyxZQUFMLEdBQW9CLFlBQXBCLENBRHdCO1NBQTFCOztxQkFGVzs7OEJBTU07QUFBRSxtQkFBTyxLQUFLLFlBQUwsQ0FBVDs7NEJBQ0QsT0FBTTtBQUFFLGlCQUFLLFlBQUwsR0FBb0IsS0FBcEIsQ0FBRjs7OztlQVBYIiwiZmlsZSI6InN0YXRlL3ByZXNlbnRhdGlvbi9zdGF0ZS12aWV3LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
