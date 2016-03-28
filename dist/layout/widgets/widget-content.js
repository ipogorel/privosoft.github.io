"use strict";

System.register(["navigator/events/widget-event"], function (_export, _context) {
  var WidgetEvent, _createClass, WidgetContent;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_navigatorEventsWidgetEvent) {
      WidgetEvent = _navigatorEventsWidgetEvent.WidgetEvent;
    }],
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

      _export("WidgetContent", WidgetContent = function () {
        function WidgetContent(widget) {
          _classCallCheck(this, WidgetContent);

          this._widget = widget;
        }

        WidgetContent.prototype.refresh = function refresh() {
          this.dataHolder.cacheKey();
        };

        WidgetContent.prototype._calculateHeight = function _calculateHeight(contentRootElement) {
          var p = $(contentRootElement).parents(".widget-container");
          var headerHeight = p.find(".portlet-header")[0].scrollHeight;
          var parentHeight = p[0].offsetHeight - headerHeight;
          return parentHeight > this.settings.minHeight ? parentHeight : this.settings.minHeight;
        };

        _createClass(WidgetContent, [{
          key: "widget",
          get: function get() {
            return this._widget;
          }
        }, {
          key: "dataHolder",
          get: function get() {
            return this._widget.dataHolder;
          },
          set: function set(value) {
            this._widget.dataHolder = value;
          }
        }, {
          key: "settings",
          get: function get() {
            return this.widget.settings;
          }
        }]);

        return WidgetContent;
      }());

      _export("WidgetContent", WidgetContent);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC93aWRnZXRzL3dpZGdldC1jb250ZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OytCQUdLO0FBQ1gsaUJBRFcsYUFDWCxDQUFZLE1BQVosRUFBb0I7Z0NBRFQsZUFDUzs7QUFDbEIsZUFBSyxPQUFMLEdBQWUsTUFBZixDQURrQjtTQUFwQjs7QUFEVyxnQ0FxQlgsNkJBQVM7QUFDUCxlQUFLLFVBQUwsQ0FBZ0IsUUFBaEIsR0FETzs7O0FBckJFLGdDQXlCWCw2Q0FBaUIsb0JBQW1CO0FBQ2xDLGNBQUksSUFBSSxFQUFFLGtCQUFGLEVBQXNCLE9BQXRCLENBQThCLG1CQUE5QixDQUFKLENBRDhCO0FBRWxDLGNBQUksZUFBZSxFQUFFLElBQUYsQ0FBTyxpQkFBUCxFQUEwQixDQUExQixFQUE2QixZQUE3QixDQUZlO0FBR2xDLGNBQUksZUFBZSxFQUFFLENBQUYsRUFBSyxZQUFMLEdBQW9CLFlBQXBCLENBSGU7QUFJbEMsaUJBQU8sZUFBZSxLQUFLLFFBQUwsQ0FBYyxTQUFkLEdBQXlCLFlBQXhDLEdBQXVELEtBQUssUUFBTCxDQUFjLFNBQWQsQ0FKNUI7OztxQkF6QnpCOzs4QkFLRTtBQUNYLG1CQUFPLEtBQUssT0FBTCxDQURJOzs7OzhCQUtJO0FBQ2YsbUJBQU8sS0FBSyxPQUFMLENBQWEsVUFBYixDQURROzs0QkFHRixPQUFPO0FBQ3BCLGlCQUFLLE9BQUwsQ0FBYSxVQUFiLEdBQTBCLEtBQTFCLENBRG9COzs7OzhCQUdQO0FBQ2IsbUJBQU8sS0FBSyxNQUFMLENBQVksUUFBWixDQURNOzs7O2VBaEJKIiwiZmlsZSI6ImxheW91dC93aWRnZXRzL3dpZGdldC1jb250ZW50LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
