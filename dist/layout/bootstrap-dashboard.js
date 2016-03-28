'use strict';

System.register(['./dashboard-base', 'jquery', 'lodash', 'aurelia-framework'], function (_export, _context) {
  var DashboardBase, $, lodash, computedFrom, BootstrapDashboard;

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
    }, function (_aureliaFramework) {
      computedFrom = _aureliaFramework.computedFrom;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC9ib290c3RyYXAtZGFzaGJvYXJkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBUTs7QUFDRDs7QUFDQTs7QUFDQzs7O29DQUdLOzs7QUFDWCxpQkFEVyxrQkFDWCxDQUFZLElBQVosRUFBa0I7Z0NBRFAsb0JBQ087O3VEQUNoQiwwQkFBTSxJQUFOLEdBRGdCOztBQUVoQixnQkFBSyxnQkFBTCxHQUF3QixFQUF4QixDQUZnQjtBQUdoQixnQkFBSyxlQUFMLEdBQXVCLEVBQXZCLENBSGdCOzs7U0FBbEI7O0FBRFcscUNBU1gsdUNBQWMsV0FBVyxXQUFXLFVBQVM7QUFDM0MsbUNBQU0sYUFBTixZQUFvQixTQUFwQixFQUErQixTQUEvQixFQUEwQyxRQUExQyxFQUQyQztBQUUzQyxlQUFLLGVBQUwsR0FBc0IsS0FBSyxxQkFBTCxDQUEyQixLQUFLLGFBQUwsQ0FBakQsQ0FGMkM7OztBQVRsQyxxQ0FjWCwrQkFBVSxRQUFRLFlBQVc7QUFDM0IsbUNBQU0sU0FBTixZQUFnQixNQUFoQixFQUF3QixVQUF4QixFQUQyQjtBQUUzQixlQUFLLGVBQUwsR0FBc0IsS0FBSyxxQkFBTCxDQUEyQixLQUFLLGFBQUwsQ0FBakQsQ0FGMkI7OztBQWRsQixxQ0FtQlgscUNBQWEsUUFBTztBQUNsQixtQ0FBTSxZQUFOLFlBQW1CLE1BQW5CLEVBRGtCO0FBRWxCLGVBQUssZUFBTCxHQUF1QixLQUFLLHFCQUFMLENBQTJCLEtBQUssYUFBTCxDQUFsRCxDQUZrQjs7O0FBbkJULHFDQXdCWCxxQ0FBYSxRQUFRLFlBQVc7QUFDOUIsbUNBQU0sWUFBTixZQUFtQixNQUFuQixFQUEyQixVQUEzQixFQUQ4QjtBQUU5QixlQUFLLGVBQUwsR0FBdUIsS0FBSyxxQkFBTCxDQUEyQixLQUFLLGFBQUwsQ0FBbEQsQ0FGOEI7OztBQXhCckIscUNBNkJYLCtCQUFVO0FBQ1IsZUFBSyxlQUFMLEdBQXVCLEtBQUsscUJBQUwsQ0FBMkIsS0FBSyxhQUFMLENBQWxELENBRFE7OztBQTdCQyxxQ0FpQ1gsdURBQXNCLGVBQWM7QUFFbEMsY0FBSSxnQkFBZ0IsRUFBRSxNQUFGLENBQVMsYUFBVCxFQUF3QixVQUFTLENBQVQsRUFBWTtBQUFFLG1CQUFPLEVBQUUsR0FBRixDQUFUO1dBQVosQ0FBeEMsQ0FGOEI7QUFHbEMsY0FBSSxTQUFTLEVBQVQsQ0FIOEI7QUFJbEMsWUFBRSxNQUFGLENBQVMsRUFBRSxPQUFGLENBQVUsYUFBVixFQUF5QixLQUF6QixDQUFULEVBQTBDLFVBQUMsQ0FBRCxFQUFJLENBQUosRUFBUTtBQUVoRCxnQkFBSSxjQUFjLEVBQUUsTUFBRixDQUFTLENBQVQsRUFBWSxVQUFTLENBQVQsRUFBWTtBQUFFLHFCQUFPLEVBQUUsR0FBRixDQUFUO2FBQVosQ0FBMUIsQ0FGNEM7QUFHaEQsbUJBQU8sSUFBUCxDQUFZO0FBQ1YsbUJBQUssQ0FBTDtBQUNBLHVCQUFTLFdBQVQ7YUFGRixFQUhnRDtXQUFSLENBQTFDLENBSmtDO0FBWWxDLGlCQUFPLE1BQVAsQ0Faa0M7OztBQWpDekIscUNBZ0RYLG1DQUFZLGNBQWE7QUFDdkIsY0FBSSxhQUFhLE1BQWIsS0FBc0IsR0FBdEIsRUFBMkI7QUFDN0IsZ0JBQUksU0FBUyxFQUFFLEtBQUYsQ0FBUSxLQUFLLGFBQUwsRUFBb0IsYUFBSztBQUM1QyxrQkFBSSxPQUFRLEVBQUUsTUFBRixLQUFZLFFBQW5CLElBQStCLEVBQUUsR0FBRixJQUFPLGFBQWEsR0FBYixFQUN6QyxPQUFPLEVBQUUsTUFBRixDQURUO2FBRHVDLENBQXJDLENBRHlCO0FBSzdCLGdCQUFJLElBQUksTUFBTSxTQUFVLEtBQUssS0FBTCxDQUFXLFNBQVMsRUFBVCxDQUFYLEdBQXdCLEVBQXhCLENBQWhCLENBTHFCO0FBTTdCLG1CQUFPLGFBQWEsS0FBRyxDQUFILEdBQUssQ0FBTCxHQUFPLEVBQVAsQ0FBYixDQU5zQjtXQUEvQjtBQVFBLGlCQUFPLFlBQWEsYUFBYSxNQUFiLENBVEc7OztBQWhEZCxxQ0E0RFgscUNBQWEsY0FBYTs7O0FBQ3hCLGNBQUksU0FBUyxFQUFULENBRG9CO0FBRXhCLGNBQUksYUFBYSxNQUFiLEtBQXNCLEdBQXRCLEVBQTJCO0FBRTdCLGdCQUFJLGNBQWMsRUFBRSxLQUFGLENBQVEsS0FBSyxhQUFMLEVBQW9CLGFBQUs7QUFDakQsa0JBQUksT0FBUSxFQUFFLE1BQUYsS0FBWSxRQUFuQixJQUErQixhQUFhLEdBQWIsS0FBbUIsRUFBRSxHQUFGLEVBQ3JELE9BQU8sRUFBRSxNQUFGLEdBQVcsT0FBSyxnQkFBTCxDQURwQjthQUQ0QyxDQUExQyxDQUZ5QjtBQU03QixxQkFBUyxjQUFjLEVBQUUsWUFBRixFQUFnQixDQUFoQixFQUFtQixZQUFuQixHQUFrQyxXQUFsQyxHQUE4QyxFQUE5QyxDQUFkLEdBQWtFLEtBQWxFLENBTm9CO1dBQS9CLE1BUUk7QUFDRixnQkFBSSxhQUFhLE1BQWIsR0FBb0IsQ0FBcEIsRUFDRixTQUFTLGFBQWMsYUFBYSxNQUFiLEdBQXNCLEtBQUssZ0JBQUwsR0FBeUIsS0FBN0QsQ0FEWDtXQVRGO0FBWUEsaUJBQU8sTUFBUCxDQWR3Qjs7O0FBNURmLHFDQThFWCxpQ0FBWTtBQUNWLFlBQUUsS0FBSyxhQUFMLENBQUYsQ0FBc0IsS0FBdEIsQ0FBNEIsTUFBNUIsRUFEVTs7O2VBOUVEO1FBQTJCIiwiZmlsZSI6ImxheW91dC9ib290c3RyYXAtZGFzaGJvYXJkLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
