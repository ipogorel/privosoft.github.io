"use strict";

System.register([], function (_export, _context) {
  var _createClass, WidgetBehavior;

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

      _export("WidgetBehavior", WidgetBehavior = function () {
        function WidgetBehavior() {
          _classCallCheck(this, WidgetBehavior);
        }

        WidgetBehavior.prototype.attachToWidget = function attachToWidget(widget) {
          this._widget = widget;
          this._widget.behaviors.push(this);
        };

        WidgetBehavior.prototype.detach = function detach() {
          for (var i = 0; i < this.widget.behaviors.length; i++) {
            if (this.widget.behaviors[i] === this) {
              this.widget.behaviors.splice(i, 1);
              break;
            }
          }
        };

        _createClass(WidgetBehavior, [{
          key: "widget",
          get: function get() {
            return this._widget;
          }
        }]);

        return WidgetBehavior;
      }());

      _export("WidgetBehavior", WidgetBehavior);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnYXRvci93aWRnZXRiZWhhdmlvci93aWRnZXQtYmVoYXZpb3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBQ2E7Ozs7O2lDQU1YLHlDQUFlLFFBQVE7QUFDckIsZUFBSyxPQUFMLEdBQWUsTUFBZixDQURxQjtBQUVyQixlQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLElBQXZCLENBQTRCLElBQTVCLEVBRnFCOzs7QUFOWixpQ0FXWCwyQkFBUTtBQUNOLGVBQUssSUFBSSxJQUFFLENBQUYsRUFBSyxJQUFFLEtBQUssTUFBTCxDQUFZLFNBQVosQ0FBc0IsTUFBdEIsRUFBOEIsR0FBOUMsRUFBbUQ7QUFDakQsZ0JBQUcsS0FBSyxNQUFMLENBQVksU0FBWixDQUFzQixDQUF0QixNQUE2QixJQUE3QixFQUFtQztBQUNwQyxtQkFBSyxNQUFMLENBQVksU0FBWixDQUFzQixNQUF0QixDQUE2QixDQUE3QixFQUFnQyxDQUFoQyxFQURvQztBQUVwQyxvQkFGb0M7YUFBdEM7V0FERjs7O3FCQVpTOzs4QkFFRTtBQUNYLG1CQUFPLEtBQUssT0FBTCxDQURJOzs7O2VBRkYiLCJmaWxlIjoibmF2aWdhdG9yL3dpZGdldGJlaGF2aW9yL3dpZGdldC1iZWhhdmlvci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
