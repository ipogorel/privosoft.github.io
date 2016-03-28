'use strict';

System.register(['./dashboard-base', 'jquery', 'gridster'], function (_export, _context) {
  var DashboardBase, $, gridster, GridsterDashboard;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_dashboardBase) {
      DashboardBase = _dashboardBase.DashboardBase;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_gridster) {
      gridster = _gridster.default;
    }],
    execute: function () {
      _export('GridsterDashboard', GridsterDashboard = function (_DashboardBase) {
        _inherits(GridsterDashboard, _DashboardBase);

        function GridsterDashboard(name) {
          _classCallCheck(this, GridsterDashboard);

          var _this = _possibleConstructorReturn(this, _DashboardBase.call(this, name));

          var self = _this;

          return _this;
        }

        GridsterDashboard.prototype.attached = function attached() {
          var widgetBaseWidth = $(this.layoutContainer).innerWidth() / 3;
          this.gridster = $(".gridster").gridster({
            widget_margins: [0, 0],
            widget_base_dimensions: [widgetBaseWidth, 90],
            max_cols: 3
          }).data('gridster');
          this.gridster.disable();
        };

        GridsterDashboard.prototype.replaceWidget = function replaceWidget(oldWidget, newWidget) {
          var self = this;
          var oldElement = self.getWidgetElement(oldWidget.name);
          var oldElementDimensions = {
            size_x: oldElement.attr("data-sizex"),
            size_y: oldElement.attr("data-sizey"),
            col: oldElement.attr("data-col"),
            row: oldElement.attr("data-row")
          };

          this.gridster.remove_widget(oldElement, function () {
            this.replaceWidget(oldWidget, newWidget);
            self._timer = window.setTimeout(function () {
              self.gridster.add_widget.apply(self.gridster, [self.getWidgetElement(newWidget.name), oldElementDimensions.size_x, oldElementDimensions.size_y, oldElementDimensions.col, oldElementDimensions.row]);
            }, 250);
          });
        };

        GridsterDashboard.prototype.getWidgetElement = function getWidgetElement(widgetName) {
          var selector = "[data-name='" + widgetName + "']";
          return $(selector);
        };

        GridsterDashboard.prototype.openPopup = function openPopup() {
          $(this.popWidgetHost).modal('show');
        };

        return GridsterDashboard;
      }(DashboardBase));

      _export('GridsterDashboard', GridsterDashboard);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC9ncmlkc3Rlci1kYXNoYm9hcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFROztBQUNEOztBQUNBOzs7bUNBRU07OztBQUNYLGlCQURXLGlCQUNYLENBQVksSUFBWixFQUFrQjtnQ0FEUCxtQkFDTzs7dURBQ2hCLDBCQUFNLElBQU4sR0FEZ0I7O0FBRWhCLGNBQUksWUFBSixDQUZnQjs7O1NBQWxCOztBQURXLG9DQU9YLCtCQUFXO0FBQ1QsY0FBSSxrQkFBa0IsRUFBRSxLQUFLLGVBQUwsQ0FBRixDQUF3QixVQUF4QixLQUFxQyxDQUFyQyxDQURiO0FBRVQsZUFBSyxRQUFMLEdBQWdCLEVBQUUsV0FBRixFQUFlLFFBQWYsQ0FBd0I7QUFDdEMsNEJBQWdCLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBaEI7QUFDQSxvQ0FBd0IsQ0FBQyxlQUFELEVBQWlCLEVBQWpCLENBQXhCO0FBQ0Esc0JBQVMsQ0FBVDtXQUhjLEVBUWIsSUFSYSxDQVFSLFVBUlEsQ0FBaEIsQ0FGUztBQVdULGVBQUssUUFBTCxDQUFjLE9BQWQsR0FYUzs7O0FBUEEsb0NBcUJYLHVDQUFjLFdBQVcsV0FBVztBQUNsQyxjQUFJLE9BQU8sSUFBUCxDQUQ4QjtBQUVsQyxjQUFJLGFBQWEsS0FBSyxnQkFBTCxDQUFzQixVQUFVLElBQVYsQ0FBbkMsQ0FGOEI7QUFHbEMsY0FBSSx1QkFBdUI7QUFDekIsb0JBQVEsV0FBVyxJQUFYLENBQWdCLFlBQWhCLENBQVI7QUFDQSxvQkFBUSxXQUFXLElBQVgsQ0FBZ0IsWUFBaEIsQ0FBUjtBQUNBLGlCQUFLLFdBQVcsSUFBWCxDQUFnQixVQUFoQixDQUFMO0FBQ0EsaUJBQUssV0FBVyxJQUFYLENBQWdCLFVBQWhCLENBQUw7V0FKRSxDQUg4Qjs7QUFVbEMsZUFBSyxRQUFMLENBQWMsYUFBZCxDQUE0QixVQUE1QixFQUF3QyxZQUFVO0FBQ2hELGlCQUFLLGFBQUwsQ0FBbUIsU0FBbkIsRUFBOEIsU0FBOUIsRUFEZ0Q7QUFFaEQsaUJBQUssTUFBTCxHQUFjLE9BQU8sVUFBUCxDQUFrQixZQUFZO0FBQzFDLG1CQUFLLFFBQUwsQ0FBYyxVQUFkLENBQXlCLEtBQXpCLENBQStCLEtBQUssUUFBTCxFQUFlLENBQUMsS0FBSyxnQkFBTCxDQUFzQixVQUFVLElBQVYsQ0FBdkIsRUFBd0MscUJBQXFCLE1BQXJCLEVBQTZCLHFCQUFxQixNQUFyQixFQUE2QixxQkFBcUIsR0FBckIsRUFBMEIscUJBQXFCLEdBQXJCLENBQTFLLEVBRDBDO2FBQVosRUFFN0IsR0FGVyxDQUFkLENBRmdEO1dBQVYsQ0FBeEMsQ0FWa0M7OztBQXJCekIsb0NBdUNYLDZDQUFpQixZQUFXO0FBQzFCLGNBQUksV0FBVyxpQkFBaUIsVUFBakIsR0FBOEIsSUFBOUIsQ0FEVztBQUUxQixpQkFBTyxFQUFFLFFBQUYsQ0FBUCxDQUYwQjs7O0FBdkNqQixvQ0E2Q1gsaUNBQVk7QUFDVixZQUFFLEtBQUssYUFBTCxDQUFGLENBQXNCLEtBQXRCLENBQTRCLE1BQTVCLEVBRFU7OztlQTdDRDtRQUEwQiIsImZpbGUiOiJsYXlvdXQvZ3JpZHN0ZXItZGFzaGJvYXJkLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
