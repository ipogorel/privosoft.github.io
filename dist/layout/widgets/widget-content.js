"use strict";

System.register([], function (_export, _context) {
  var _createClass, WidgetContent;

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

      _export("WidgetContent", WidgetContent = function () {
        function WidgetContent(widget) {
          _classCallCheck(this, WidgetContent);

          this._widget = widget;
        }

        WidgetContent.prototype.refresh = function refresh() {};

        WidgetContent.prototype._calculateHeight = function _calculateHeight(contentContainerElement) {
          if (!contentContainerElement) return this.settings.minHeight;
          var p = $(contentContainerElement).parents(".widget-container");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC93aWRnZXRzL3dpZGdldC1jb250ZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OytCQUFhO0FBQ1gsaUJBRFcsYUFDWCxDQUFZLE1BQVosRUFBb0I7Z0NBRFQsZUFDUzs7QUFDbEIsZUFBSyxPQUFMLEdBQWUsTUFBZixDQURrQjtTQUFwQjs7QUFEVyxnQ0FhWCw2QkFBUzs7QUFiRSxnQ0FpQlgsNkNBQWlCLHlCQUF3QjtBQUN2QyxjQUFJLENBQUMsdUJBQUQsRUFDRixPQUFPLEtBQUssUUFBTCxDQUFjLFNBQWQsQ0FEVDtBQUVBLGNBQUksSUFBSSxFQUFFLHVCQUFGLEVBQTJCLE9BQTNCLENBQW1DLG1CQUFuQyxDQUFKLENBSG1DO0FBSXZDLGNBQUksZUFBZSxFQUFFLElBQUYsQ0FBTyxpQkFBUCxFQUEwQixDQUExQixFQUE2QixZQUE3QixDQUpvQjtBQUt2QyxjQUFJLGVBQWUsRUFBRSxDQUFGLEVBQUssWUFBTCxHQUFvQixZQUFwQixDQUxvQjtBQU12QyxpQkFBTyxlQUFlLEtBQUssUUFBTCxDQUFjLFNBQWQsR0FBeUIsWUFBeEMsR0FBdUQsS0FBSyxRQUFMLENBQWMsU0FBZCxDQU52Qjs7O3FCQWpCOUI7OzhCQUtFO0FBQ1gsbUJBQU8sS0FBSyxPQUFMLENBREk7Ozs7OEJBSUU7QUFDYixtQkFBTyxLQUFLLE1BQUwsQ0FBWSxRQUFaLENBRE07Ozs7ZUFUSiIsImZpbGUiOiJsYXlvdXQvd2lkZ2V0cy93aWRnZXQtY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
