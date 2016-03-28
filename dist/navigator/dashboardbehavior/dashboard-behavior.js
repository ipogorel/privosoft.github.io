"use strict";

System.register([], function (_export, _context) {
  var _createClass, DashboardBehavior;

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

      _export("DashboardBehavior", DashboardBehavior = function () {
        function DashboardBehavior() {
          _classCallCheck(this, DashboardBehavior);
        }

        DashboardBehavior.prototype.attach = function attach(dashboard) {
          this._dashboard = dashboard;
          this._dashboard.behaviors.push(this);
        };

        DashboardBehavior.prototype.detach = function detach() {
          for (var i = 0; i < this.dashboard.behaviors.length; i++) {
            if (this.dashboard.behaviors[i] === this) {
              this.dashboard.behaviors.splice(i, 1);
              break;
            }
          }
        };

        _createClass(DashboardBehavior, [{
          key: "dashboard",
          get: function get() {
            return this._dashboard;
          }
        }]);

        return DashboardBehavior;
      }());

      _export("DashboardBehavior", DashboardBehavior);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnYXRvci9kYXNoYm9hcmRiZWhhdmlvci9kYXNoYm9hcmQtYmVoYXZpb3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUNBQ2E7Ozs7O29DQU1YLHlCQUFPLFdBQVc7QUFDaEIsZUFBSyxVQUFMLEdBQWtCLFNBQWxCLENBRGdCO0FBRWhCLGVBQUssVUFBTCxDQUFnQixTQUFoQixDQUEwQixJQUExQixDQUErQixJQUEvQixFQUZnQjs7O0FBTlAsb0NBV1gsMkJBQVE7QUFDTixlQUFLLElBQUksSUFBRSxDQUFGLEVBQUssSUFBRSxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLE1BQXpCLEVBQWlDLEdBQWpELEVBQXNEO0FBQ3BELGdCQUFHLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsQ0FBekIsTUFBZ0MsSUFBaEMsRUFBc0M7QUFDdkMsbUJBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsTUFBekIsQ0FBZ0MsQ0FBaEMsRUFBbUMsQ0FBbkMsRUFEdUM7QUFFdkMsb0JBRnVDO2FBQXpDO1dBREY7OztxQkFaUzs7OEJBRUs7QUFDZCxtQkFBTyxLQUFLLFVBQUwsQ0FETzs7OztlQUZMIiwiZmlsZSI6Im5hdmlnYXRvci9kYXNoYm9hcmRiZWhhdmlvci9kYXNoYm9hcmQtYmVoYXZpb3IuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
