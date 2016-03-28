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
          key: 'title',
          get: function get() {
            return this._title;
          },
          set: function set(value) {
            this._title = value;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC9kYXNoYm9hcmQtYmFzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQkFFTTtBQUVYLGlCQUZXLGFBRVgsQ0FBWSxJQUFaLEVBQWtCO2dDQUZQLGVBRU87O0FBQ2hCLGVBQUssY0FBTCxHQUFzQixFQUF0QixDQURnQjtBQUVoQixlQUFLLFVBQUwsR0FBa0IsRUFBbEIsQ0FGZ0I7QUFHaEIsZUFBSyxLQUFMLEdBQWEsSUFBYixDQUhnQjtTQUFsQjs7QUFGVyxnQ0E0QlgsK0JBQVUsUUFBUSxZQUFZO0FBQzVCLGVBQUssY0FBTCxDQUFvQixJQUFwQixDQUF5QjtBQUN2QixvQkFBUSxNQUFSO0FBQ0Esb0JBQVEsV0FBVyxNQUFYO0FBQ1Isb0JBQVEsV0FBVyxNQUFYO0FBQ1IsaUJBQUssV0FBVyxHQUFYO0FBQ0wsaUJBQUssV0FBVyxHQUFYO1dBTFAsRUFENEI7QUFRNUIsaUJBQU8sU0FBUCxHQUFtQixJQUFuQixDQVI0Qjs7O0FBNUJuQixnQ0EwQ1gsMkNBQWdCLFlBQVk7QUFDMUIsY0FBSSxLQUFLLEVBQUUsSUFBRixDQUFPLEtBQUssY0FBTCxFQUFxQixhQUFJO0FBQUUsbUJBQU8sRUFBRSxNQUFGLENBQVMsSUFBVCxLQUFrQixVQUFsQixDQUFUO1dBQUosQ0FBakMsQ0FEc0I7QUFFMUIsY0FBSSxFQUFKLEVBQ0UsT0FBTyxHQUFHLE1BQUgsQ0FEVDs7O0FBNUNTLGdDQWdEWCxtREFBb0IsUUFBTztBQUN6QixjQUFJLEtBQUssRUFBRSxJQUFGLENBQU8sS0FBSyxjQUFMLEVBQXFCLGFBQUk7QUFBRSxtQkFBTyxFQUFFLE1BQUYsS0FBYSxNQUFiLENBQVQ7V0FBSixDQUFqQyxDQURxQjtBQUV6QixpQkFBTyxFQUFDLFFBQVEsR0FBRyxNQUFILEVBQVcsUUFBUSxHQUFHLE1BQUgsRUFBWSxLQUFLLEdBQUcsR0FBSCxFQUFTLEtBQUssR0FBRyxHQUFILEVBQWxFLENBRnlC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
