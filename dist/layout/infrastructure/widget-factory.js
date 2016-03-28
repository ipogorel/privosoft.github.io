'use strict';

System.register(['aurelia-framework', 'layout/widgets/widget', 'aurelia-event-aggregator', 'navigator/widgetbehavior/back-button-pressed-behavior', 'data/repository'], function (_export, _context) {
  var inject, Widget, EventAggregator, BackButtonPressedBehavior, Repository, _dec, _class, WidgetFactory;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_layoutWidgetsWidget) {
      Widget = _layoutWidgetsWidget.Widget;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_navigatorWidgetbehaviorBackButtonPressedBehavior) {
      BackButtonPressedBehavior = _navigatorWidgetbehaviorBackButtonPressedBehavior.BackButtonPressedBehavior;
    }, function (_dataRepository) {
      Repository = _dataRepository.Repository;
    }],
    execute: function () {
      _export('WidgetFactory', WidgetFactory = (_dec = inject(Repository, EventAggregator), _dec(_class = function () {
        function WidgetFactory(repository, eventAggregator) {
          _classCallCheck(this, WidgetFactory);

          this._repository = repository;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC9pbmZyYXN0cnVjdHVyZS93aWRnZXQtZmFjdG9yeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQVE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7OzsrQkFHSyx3QkFEWixPQUFPLFVBQVAsRUFBbUIsZUFBbkI7QUFHQyxpQkFGVyxhQUVYLENBQWEsVUFBYixFQUF5QixlQUF6QixFQUEwQztnQ0FGL0IsZUFFK0I7O0FBQ3hDLGVBQUssV0FBTCxHQUFtQixVQUFuQixDQUR3QztBQUV4QyxlQUFLLGdCQUFMLEdBQXdCLGVBQXhCLENBRndDO1NBQTFDOztBQUZXLGdDQU9YLHFDQUFhLE1BQU0sVUFBVTtBQUMzQixjQUFJLFNBQVUsSUFBSSxJQUFKLENBQVMsUUFBVCxDQUFWLENBRHVCO0FBRTNCLGNBQUksb0JBQW9CLElBQUkseUJBQUosQ0FBOEIsS0FBSyxnQkFBTCxDQUFsRCxDQUZ1QjtBQUczQiw0QkFBa0IsY0FBbEIsQ0FBaUMsTUFBakMsRUFIMkI7QUFJM0IsaUJBQU8sTUFBUCxDQUoyQjs7O2VBUGxCIiwiZmlsZSI6ImxheW91dC9pbmZyYXN0cnVjdHVyZS93aWRnZXQtZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
