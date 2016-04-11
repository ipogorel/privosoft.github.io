'use strict';

System.register(['lodash'], function (_export, _context) {
  var lodash, _createClass, DashboardBase;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_lodash) {
      lodash = _lodash.default;
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

      _export('DashboardBase', DashboardBase = function () {
        function DashboardBase(name) {
          _classCallCheck(this, DashboardBase);

          this._layoutWidgets = [];
          this._behaviors = [];
          this._name = name;
        }

        DashboardBase.prototype.configure = function configure(dashboardConfiguration) {
          this._title = dashboardConfiguration.title;
          this._route = dashboardConfiguration.route;
        };

        DashboardBase.prototype.addWidget = function addWidget(widget, dimensions) {
          this._layoutWidgets.push({
            widget: widget,
            size_x: dimensions.size_x,
            size_y: dimensions.size_y,
            col: dimensions.col,
            row: dimensions.row
          });
          widget.dashboard = this;
        };

        DashboardBase.prototype.getWidgetByName = function getWidgetByName(widgetName) {
          var wl = _.find(this._layoutWidgets, function (w) {
            return w.widget.name === widgetName;
          });
          if (wl) return wl.widget;
        };

        DashboardBase.prototype.getWidgetDimensions = function getWidgetDimensions(widget) {
          var lw = _.find(this._layoutWidgets, function (w) {
            return w.widget === widget;
          });
          return { size_x: lw.size_x, size_y: lw.size_y, col: lw.col, row: lw.row };
        };

        DashboardBase.prototype.removeWidget = function removeWidget(widget) {
          _.remove(this._layoutWidgets, function (w) {
            if (w.widget === widget) {
              widget.dispose();
              return true;
            }
            return false;
          });
        };

        DashboardBase.prototype.replaceWidget = function replaceWidget(oldWidget, newWidget) {
          var lw = _.find(this._layoutWidgets, function (w) {
            return w.widget === oldWidget;
          });
          if (lw) {
            newWidget.dashboard = this;
            var newLayoutWidget = {
              widget: newWidget,
              size_x: lw.size_x,
              size_y: lw.size_y,
              col: lw.col,
              row: lw.row
            };

            this._layoutWidgets.splice(_.indexOf(this._layoutWidgets, lw), 1, newLayoutWidget);
          }
        };

        DashboardBase.prototype.resizeWidget = function resizeWidget(widget, dimensions) {
          var lw = _.find(this._layoutWidgets, function (w) {
            return w.widget === widget;
          });
          if (!lw) return;
          _.forOwn(dimensions, function (v, k) {
            lw[k] = v;
          });
        };

        DashboardBase.prototype.refresh = function refresh() {
          for (var i = 0; i < this._layoutWidgets.length; i++) {
            this._layoutWidgets[i].widget.refresh();
          }
        };

        DashboardBase.prototype.dispose = function dispose() {
          for (var i = 0; i < this._layoutWidgets.length; i++) {
            this._layoutWidgets[i].widget.dispose();
          }
          this._layoutWidgets = [];

          while (true) {
            if (this._behaviors.length > 0) this._behaviors[0].detach();else break;
          }
        };

        _createClass(DashboardBase, [{
          key: 'name',
          get: function get() {
            return this._name;
          }
        }, {
          key: 'route',
          get: function get() {
            return this._route;
          }
        }, {
          key: 'title',
          get: function get() {
            return this._title;
          }
        }, {
          key: 'layoutWidgets',
          get: function get() {
            return this._layoutWidgets;
          }
        }, {
          key: 'behaviors',
          get: function get() {
            return this._behaviors;
          }
        }]);

        return DashboardBase;
      }());

      _export('DashboardBase', DashboardBase);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC9kYXNoYm9hcmQtYmFzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQkFFTTtBQUVYLGlCQUZXLGFBRVgsQ0FBWSxJQUFaLEVBQWtCO2dDQUZQLGVBRU87O0FBQ2hCLGVBQUssY0FBTCxHQUFzQixFQUF0QixDQURnQjtBQUVoQixlQUFLLFVBQUwsR0FBa0IsRUFBbEIsQ0FGZ0I7QUFHaEIsZUFBSyxLQUFMLEdBQWEsSUFBYixDQUhnQjtTQUFsQjs7QUFGVyxnQ0E2QlgsK0JBQVUsd0JBQXVCO0FBQy9CLGVBQUssTUFBTCxHQUFjLHVCQUF1QixLQUF2QixDQURpQjtBQUUvQixlQUFLLE1BQUwsR0FBYyx1QkFBdUIsS0FBdkIsQ0FGaUI7OztBQTdCdEIsZ0NBa0NYLCtCQUFVLFFBQVEsWUFBWTtBQUM1QixlQUFLLGNBQUwsQ0FBb0IsSUFBcEIsQ0FBeUI7QUFDdkIsb0JBQVEsTUFBUjtBQUNBLG9CQUFRLFdBQVcsTUFBWDtBQUNSLG9CQUFRLFdBQVcsTUFBWDtBQUNSLGlCQUFLLFdBQVcsR0FBWDtBQUNMLGlCQUFLLFdBQVcsR0FBWDtXQUxQLEVBRDRCO0FBUTVCLGlCQUFPLFNBQVAsR0FBbUIsSUFBbkIsQ0FSNEI7OztBQWxDbkIsZ0NBK0NYLDJDQUFnQixZQUFZO0FBQzFCLGNBQUksS0FBSyxFQUFFLElBQUYsQ0FBTyxLQUFLLGNBQUwsRUFBcUIsYUFBSTtBQUFFLG1CQUFPLEVBQUUsTUFBRixDQUFTLElBQVQsS0FBa0IsVUFBbEIsQ0FBVDtXQUFKLENBQWpDLENBRHNCO0FBRTFCLGNBQUksRUFBSixFQUNFLE9BQU8sR0FBRyxNQUFILENBRFQ7OztBQWpEUyxnQ0FxRFgsbURBQW9CLFFBQU87QUFDekIsY0FBSSxLQUFLLEVBQUUsSUFBRixDQUFPLEtBQUssY0FBTCxFQUFxQixhQUFJO0FBQUUsbUJBQU8sRUFBRSxNQUFGLEtBQWEsTUFBYixDQUFUO1dBQUosQ0FBakMs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
