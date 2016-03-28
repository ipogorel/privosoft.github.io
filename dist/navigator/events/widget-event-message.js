"use strict";

System.register([], function (_export, _context) {
  var _createClass, WidgetEventMessage;

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

      _export("WidgetEventMessage", WidgetEventMessage = function () {
        function WidgetEventMessage(widgetName) {
          _classCallCheck(this, WidgetEventMessage);

          this._originatorName = widgetName;
        }

        _createClass(WidgetEventMessage, [{
          key: "originatorName",
          get: function get() {
            return this._originatorName;
          }
        }]);

        return WidgetEventMessage;
      }());

      _export("WidgetEventMessage", WidgetEventMessage);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnYXRvci9ldmVudHMvd2lkZ2V0LWV2ZW50LW1lc3NhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0NBQWE7QUFFWCxpQkFGVyxrQkFFWCxDQUFZLFVBQVosRUFBd0I7Z0NBRmIsb0JBRWE7O0FBQ3RCLGVBQUssZUFBTCxHQUF1QixVQUF2QixDQURzQjtTQUF4Qjs7cUJBRlc7OzhCQUtXO0FBQ3BCLG1CQUFPLEtBQUssZUFBTCxDQURhOzs7O2VBTFgiLCJmaWxlIjoibmF2aWdhdG9yL2V2ZW50cy93aWRnZXQtZXZlbnQtbWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
