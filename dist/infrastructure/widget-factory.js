'use strict';

System.register(['aurelia-framework', 'aurelia-event-aggregator', './../navigator/widgetbehavior/back-button-pressed-behavior'], function (_export, _context) {
  var inject, EventAggregator, BackButtonPressedBehavior, _dec, _class, WidgetFactory;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_navigatorWidgetbehaviorBackButtonPressedBehavior) {
      BackButtonPressedBehavior = _navigatorWidgetbehaviorBackButtonPressedBehavior.BackButtonPressedBehavior;
    }],
    execute: function () {
      _export('WidgetFactory', WidgetFactory = (_dec = inject(EventAggregator), _dec(_class = function () {
        function WidgetFactory(eventAggregator) {
          _classCallCheck(this, WidgetFactory);

          this._eventAggregator = eventAggregator;
        }

        WidgetFactory.prototype.createWidget = function createWidget(type, settings) {
          var widget = new type(settings);
          var backButtonPressed = new BackButtonPressedBehavior(this._eventAggregator);
          backButtonPressed.attachToWidget(widget);
          return widget;
        };

        return WidgetFactory;
      }()) || _class));

      _export('WidgetFactory', WidgetFactory);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZnJhc3RydWN0dXJlL3dpZGdldC1mYWN0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBUTs7QUFDQTs7QUFDQTs7OytCQUdLLHdCQURaLE9BQU8sZUFBUDtBQUdDLGlCQUZXLGFBRVgsQ0FBYSxlQUFiLEVBQThCO2dDQUZuQixlQUVtQjs7QUFDNUIsZUFBSyxnQkFBTCxHQUF3QixlQUF4QixDQUQ0QjtTQUE5Qjs7QUFGVyxnQ0FNWCxxQ0FBYSxNQUFNLFVBQVU7QUFDM0IsY0FBSSxTQUFVLElBQUksSUFBSixDQUFTLFFBQVQsQ0FBVixDQUR1QjtBQUUzQixjQUFJLG9CQUFvQixJQUFJLHlCQUFKLENBQThCLEtBQUssZ0JBQUwsQ0FBbEQsQ0FGdUI7QUFHM0IsNEJBQWtCLGNBQWxCLENBQWlDLE1BQWpDLEVBSDJCO0FBSTNCLGlCQUFPLE1BQVAsQ0FKMkI7OztlQU5sQiIsImZpbGUiOiJpbmZyYXN0cnVjdHVyZS93aWRnZXQtZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
