'use strict';

System.register(['./dashboard-base', 'jquery', 'lodash'], function (_export, _context) {
  var DashboardBase, $, lodash, BootstrapDashboard;

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
    }, function (_lodash) {
      lodash = _lodash.default;
    }],
    execute: function () {
      _export('BootstrapDashboard', BootstrapDashboard = function (_DashboardBase) {
        _inherits(BootstrapDashboard, _DashboardBase);

        function BootstrapDashboard(name) {
          _classCallCheck(this, BootstrapDashboard);

          var _this = _possibleConstructorReturn(this, _DashboardBase.call(this, name));

          _this.widgetBaseHeight = 70;
          _this.layoutStructure = [];
          return _this;
        }

        BootstrapDashboard.prototype.replaceWidget = function replaceWidget(oldWidget, newWidget, callback) {
          _DashboardBase.prototype.replaceWidget.call(this, oldWidget, newWidget, callback);
          this.layoutStructure = this.createLayoutStructure(this.layoutWidgets);
        };

        BootstrapDashboard.prototype.addWidget = function addWidget(widget, dimensions) {
          _DashboardBase.prototype.addWidget.call(this, widget, dimensions);
          this.layoutStructure = this.createLayoutStructure(this.layoutWidgets);
        };

        BootstrapDashboard.prototype.removeWidget = function removeWidget(widget) {
          _DashboardBase.prototype.removeWidget.call(this, widget);
          this.layoutStructure = this.createLayoutStructure(this.layoutWidgets);
        };

        BootstrapDashboard.prototype.resizeWidget = function resizeWidget(widget, dimensions) {
          _DashboardBase.prototype.resizeWidget.call(this, widget, dimensions);
          this.layoutStructure = this.createLayoutStructure(this.layoutWidgets);
        };

        BootstrapDashboard.prototype.attached = function attached() {
          this.layoutStructure = this.createLayoutStructure(this.layoutWidgets);
        };

        BootstrapDashboard.prototype.createLayoutStructure = function createLayoutStructure(layoutWidgets) {
          var sortedWidgets = _.sortBy(layoutWidgets, function (w) {
            return w.row;
          });
          var result = [];
          _.forOwn(_.groupBy(sortedWidgets, 'row'), function (v, k) {
            var sortedByCol = _.sortBy(v, function (w) {
              return w.col;
            });
            result.push({
              row: k,
              widgets: sortedByCol
            });
          });
          return result;
        };

        BootstrapDashboard.prototype.getColWidth = function getColWidth(layoutWidget) {
          if (layoutWidget.size_x === "*") {
            var totalX = _.sumBy(this.layoutWidgets, function (x) {
              if (typeof x.size_x === 'number' && x.row == layoutWidget.row) return x.size_x;
            });
            var x = 12 - (totalX - Math.floor(totalX / 12) * 12);
            return "col-md-" + (x != 0 ? x : 12);
          }
          return "col-md-" + layoutWidget.size_x;
        };

        BootstrapDashboard.prototype.getColHeight = function getColHeight(layoutWidget) {
          var _this2 = this;

          var result = "";
          if (layoutWidget.size_y === "*") {
            var totalHeight = _.sumBy(this.layoutWidgets, function (x) {
              if (typeof x.size_y === 'number' && layoutWidget.row !== x.row) return x.size_y * _this2.widgetBaseHeight;
            });
            result = "height: " + ($('#dashboard')[0].clientHeight - totalHeight - 80) + "px;";
          } else {
            if (layoutWidget.size_y > 0) result = "height: " + layoutWidget.size_y * this.widgetBaseHeight + "px;";
          }
          return result;
        };

        BootstrapDashboard.prototype.openPopup = function openPopup() {
          $(this.popWidgetHost).modal('show');
        };

        return BootstrapDashboard;
      }(DashboardBase));

      _export('BootstrapDashboard', BootstrapDashboard);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC9ib290c3RyYXAtZGFzaGJvYXJkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBUTs7QUFDRDs7QUFDQTs7O29DQUdNOzs7QUFDWCxpQkFEVyxrQkFDWCxDQUFZLElBQVosRUFBa0I7Z0NBRFAsb0JBQ087O3VEQUNoQiwwQkFBTSxJQUFOLEdBRGdCOztBQUVoQixnQkFBSyxnQkFBTCxHQUF3QixFQUF4QixDQUZnQjtBQUdoQixnQkFBSyxlQUFMLEdBQXVCLEVBQXZCLENBSGdCOztTQUFsQjs7QUFEVyxxQ0FRWCx1Q0FBYyxXQUFXLFdBQVcsVUFBUztBQUMzQyxtQ0FBTSxhQUFOLFlBQW9CLFNBQXBCLEVBQStCLFNBQS9CLEVBQTBDLFFBQTFDLEVBRDJDO0FBRTNDLGVBQUssZUFBTCxHQUF1QixLQUFLLHFCQUFMLENBQTJCLEtBQUssYUFBTCxDQUFsRCxDQUYyQzs7O0FBUmxDLHFDQWFYLCtCQUFVLFFBQVEsWUFBVztBQUMzQixtQ0FBTSxTQUFOLFlBQWdCLE1BQWhCLEVBQXdCLFVBQXhCLEVBRDJCO0FBRTNCLGVBQUssZUFBTCxHQUFzQixLQUFLLHFCQUFMLENBQTJCLEtBQUssYUFBTCxDQUFqRCxDQUYyQjs7O0FBYmxCLHFDQWtCWCxxQ0FBYSxRQUFPO0FBQ2xCLG1DQUFNLFlBQU4sWUFBbUIsTUFBbkIsRUFEa0I7QUFFbEIsZUFBSyxlQUFMLEdBQXVCLEtBQUsscUJBQUwsQ0FBMkIsS0FBSyxhQUFMLENBQWxELENBRmtCOzs7QUFsQlQscUNBdUJYLHFDQUFhLFFBQVEsWUFBVztBQUM5QixtQ0FBTSxZQUFOLFlBQW1CLE1BQW5CLEVBQTJCLFVBQTNCLEVBRDhCO0FBRTlCLGVBQUssZUFBTCxHQUF1QixLQUFLLHFCQUFMLENBQTJCLEtBQUssYUFBTCxDQUFsRCxDQUY4Qjs7O0FBdkJyQixxQ0E0QlgsK0JBQVU7QUFDUixlQUFLLGVBQUwsR0FBdUIsS0FBSyxxQkFBTCxDQUEyQixLQUFLLGFBQUwsQ0FBbEQsQ0FEUTs7O0FBNUJDLHFDQWdDWCx1REFBc0IsZUFBYztBQUVsQyxjQUFJLGdCQUFnQixFQUFFLE1BQUYsQ0FBUyxhQUFULEVBQXdCLFVBQVMsQ0FBVCxFQUFZO0FBQUUsbUJBQU8sRUFBRSxHQUFGLENBQVQ7V0FBWixDQUF4QyxDQUY4QjtBQUdsQyxjQUFJLFNBQVMsRUFBVCxDQUg4QjtBQUlsQyxZQUFFLE1BQUYsQ0FBUyxFQUFFLE9BQUYsQ0FBVSxhQUFWLEVBQXlCLEtBQXpCLENBQVQsRUFBMEMsVUFBQyxDQUFELEVBQUksQ0FBSixFQUFRO0FBRWhELGdCQUFJLGNBQWMsRUFBRSxNQUFGLENBQVMsQ0FBVCxFQUFZLFVBQVMsQ0FBVCxFQUFZO0FBQUUscUJBQU8sRUFBRSxHQUFGLENBQVQ7YUFBWixDQUExQixDQUY0QztBQUdoRCxtQkFBTyxJQUFQLENBQVk7QUFDVixtQkFBSyxDQUFMO0FBQ0EsdUJBQVMsV0FBVDthQUZGLEVBSGdEO1dBQVIsQ0FBMUMsQ0FKa0M7QUFZbEMsaUJBQU8sTUFBUCxDQVprQzs7O0FBaEN6QixxQ0ErQ1gsbUNBQVksY0FBYTtBQUN2QixjQUFJLGFBQWEsTUFBYixLQUFzQixHQUF0QixFQUEyQjtBQUM3QixnQkFBSSxTQUFTLEVBQUUsS0FBRixDQUFRLEtBQUssYUFBTCxFQUFvQixhQUFLO0FBQzVDLGtCQUFJLE9BQVEsRUFBRSxNQUFGLEtBQVksUUFBbkIsSUFBK0IsRUFBRSxHQUFGLElBQU8sYUFBYSxHQUFiLEVBQ3pDLE9BQU8sRUFBRSxNQUFGLENBRFQ7YUFEdUMsQ0FBckMsQ0FEeUI7QUFLN0IsZ0JBQUksSUFBSSxNQUFNLFNBQVUsS0FBSyxLQUFMLENBQVcsU0FBUyxFQUFULENBQVgsR0FBd0IsRUFBeEIsQ0FBaEIsQ0FMcUI7QUFNN0IsbUJBQU8sYUFBYSxLQUFHLENBQUgsR0FBSyxDQUFMLEdBQU8sRUFBUCxDQUFiLENBTnNCO1dBQS9CO0FBUUEsaUJBQU8sWUFBYSxhQUFhLE1BQWIsQ0FURzs7O0FBL0NkLHFDQTJEWCxxQ0FBYSxjQUFhOzs7QUFDeEIsY0FBSSxTQUFTLEVBQVQsQ0FEb0I7QUFFeEIsY0FBSSxhQUFhLE1BQWIsS0FBc0IsR0FBdEIsRUFBMkI7QUFFN0IsZ0JBQUksY0FBYyxFQUFFLEtBQUYsQ0FBUSxLQUFLLGFBQUwsRUFBb0IsYUFBSztBQUNqRCxrQkFBSSxPQUFRLEVBQUUsTUFBRixLQUFZLFFBQW5CLElBQStCLGFBQWEsR0FBYixLQUFtQixFQUFFLEdBQUYsRUFDckQsT0FBTyxFQUFFLE1BQUYsR0FBVyxPQUFLLGdCQUFMLENBRHBCO2FBRDRDLENBQTFDLENBRnlCO0FBTTdCLHFCQUFTLGNBQWMsRUFBRSxZQUFGLEVBQWdCLENBQWhCLEVBQW1CLFlBQW5CLEdBQWtDLFdBQWxDLEdBQThDLEVBQTlDLENBQWQsR0FBa0UsS0FBbEUsQ0FOb0I7V0FBL0IsTUFRSTtBQUNGLGdCQUFJLGFBQWEsTUFBYixHQUFvQixDQUFwQixFQUNGLFNBQVMsYUFBYyxhQUFhLE1BQWIsR0FBc0IsS0FBSyxnQkFBTCxHQUF5QixLQUE3RCxDQURYO1dBVEY7QUFZQSxpQkFBTyxNQUFQLENBZHdCOzs7QUEzRGYscUNBNkVYLGlDQUFZO0FBQ1YsWUFBRSxLQUFLLGFBQUwsQ0FBRixDQUFzQixLQUF0QixDQUE0QixNQUE1QixFQURVOzs7ZUE3RUQ7UUFBMkIiLCJmaWxlIjoibGF5b3V0L2Jvb3RzdHJhcC1kYXNoYm9hcmQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
