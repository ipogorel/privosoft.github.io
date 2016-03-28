"use strict";

System.register([], function (_export, _context) {
  var _createClass, WidgetEvent;

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

      _export("WidgetEvent", WidgetEvent = function () {
        function WidgetEvent(widgetName) {
          _classCallCheck(this, WidgetEvent);

          this._handlers = [];
          this._originatorName = widgetName;
        }

        WidgetEvent.prototype.attach = function attach(handler) {
          if (this._handlers.some(function (e) {
            return e === handler;
          })) {
            return;
          }
          this._handlers.push(handler);
        };

        WidgetEvent.prototype.detach = function detach(handler) {
          var idx = this._handlers.indexOf(handler);
          if (idx < 0) {
            return;
          }
          this.handler.splice(idx, 1);
        };

        WidgetEvent.prototype.raise = function raise() {
          for (var i = 0; i < this._handlers.length; i++) {
            this._handlers[i].apply(this, arguments);
          }
        };

        _createClass(WidgetEvent, [{
          key: "originatorName",
          get: function get() {
            return this._originatorName;
          }
        }]);

        return WidgetEvent;
      }());

      _export("WidgetEvent", WidgetEvent);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnYXRvci9ldmVudHMvd2lkZ2V0LWV2ZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzZCQUFhO0FBRVgsaUJBRlcsV0FFWCxDQUFZLFVBQVosRUFBd0I7Z0NBRmIsYUFFYTs7QUFDdEIsZUFBSyxTQUFMLEdBQWlCLEVBQWpCLENBRHNCO0FBRXRCLGVBQUssZUFBTCxHQUF1QixVQUF2QixDQUZzQjtTQUF4Qjs7QUFGVyw4QkFXWCx5QkFBTyxTQUFRO0FBQ2IsY0FBRyxLQUFLLFNBQUwsQ0FBZSxJQUFmLENBQW9CO21CQUFHLE1BQU0sT0FBTjtXQUFILENBQXZCLEVBQTBDO0FBQ3hDLG1CQUR3QztXQUExQztBQUdBLGVBQUssU0FBTCxDQUFlLElBQWYsQ0FBb0IsT0FBcEIsRUFKYTs7O0FBWEosOEJBa0JYLHlCQUFPLFNBQVM7QUFDZCxjQUFJLE1BQU0sS0FBSyxTQUFMLENBQWUsT0FBZixDQUF1QixPQUF2QixDQUFOLENBRFU7QUFFZCxjQUFHLE1BQU0sQ0FBTixFQUFRO0FBQ1QsbUJBRFM7V0FBWDtBQUdBLGVBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsR0FBcEIsRUFBd0IsQ0FBeEIsRUFMYzs7O0FBbEJMLDhCQTBCWCx5QkFBTztBQUNMLGVBQUksSUFBSSxJQUFJLENBQUosRUFBTyxJQUFHLEtBQUssU0FBTCxDQUFlLE1BQWYsRUFBdUIsR0FBekMsRUFBOEM7QUFDNUMsaUJBQUssU0FBTCxDQUFlLENBQWYsRUFBa0IsS0FBbEIsQ0FBd0IsSUFBeEIsRUFBOEIsU0FBOUIsRUFENEM7V0FBOUM7OztxQkEzQlM7OzhCQU9XO0FBQ3BCLG1CQUFPLEtBQUssZUFBTCxDQURhOzs7O2VBUFgiLCJmaWxlIjoibmF2aWdhdG9yL2V2ZW50cy93aWRnZXQtZXZlbnQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
