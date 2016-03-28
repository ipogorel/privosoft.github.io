'use strict';

System.register(['./widget-content', 'jquery', 'kendo-ui'], function (_export, _context) {
  var WidgetContent, $, kendo, ChartContent;

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
    setters: [function (_widgetContent) {
      WidgetContent = _widgetContent.WidgetContent;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_kendoUi) {
      kendo = _kendoUi.default;
    }],
    execute: function () {
      _export('ChartContent', ChartContent = function (_WidgetContent) {
        _inherits(ChartContent, _WidgetContent);

        function ChartContent(widget) {
          _classCallCheck(this, ChartContent);

          var _this = _possibleConstructorReturn(this, _WidgetContent.call(this, widget));

          var self = _this;
          _this._chartDataSource = new kendo.data.DataSource({
            type: "json",
            transport: {
              read: function read(options) {
                self.dataHolder.load().then(function (d) {
                  self.dataHolder.data = self.mapData(self.dataHolder.data, self.settings.categoriesField);

                  options.success(self.dataHolder);
                });
              }
            },
            schema: {
              type: "json",
              data: "data"
            }
          });
          return _this;
        }

        ChartContent.prototype.refresh = function refresh() {
          this._chartDataSource.read();
        };

        ChartContent.prototype.attached = function attached() {
          $(this.chartElement).kendoChart({
            autoBind: false,
            dataSource: this._chartDataSource,
            legend: {
              visible: true
            },
            chartArea: {
              height: this._calculateHeight(this.chartElement)
            },
            seriesDefaults: this.settings.seriesDefaults,
            series: [{
              field: "value"
            }],
            valueAxis: {
              max: 100,
              majorGridLines: {
                visible: false
              },
              visible: true
            },
            categoryAxis: {
              field: "field",
              majorGridLines: {
                visible: false
              },
              line: {
                visible: true
              }
            }
          });
        };

        ChartContent.prototype.mapData = function mapData(data, categoryField) {
          var result = [];
          _.forOwn(_.groupBy(data, categoryField), function (v, k) {
            result.push({
              field: k,
              value: v.length
            });
          });
          return result;
        };

        return ChartContent;
      }(WidgetContent));

      _export('ChartContent', ChartContent);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC93aWRnZXRzL2NoYXJ0LWNvbnRlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFROztBQUNEOztBQUNBOzs7OEJBRU07OztBQUNYLGlCQURXLFlBQ1gsQ0FBWSxNQUFaLEVBQW9CO2dDQURULGNBQ1M7O3VEQUNsQiwwQkFBTSxNQUFOLEdBRGtCOztBQUdsQixjQUFJLFlBQUosQ0FIa0I7QUFJbEIsZ0JBQUssZ0JBQUwsR0FBd0IsSUFBSSxNQUFNLElBQU4sQ0FBVyxVQUFYLENBQXNCO0FBQ2hELGtCQUFNLE1BQU47QUFDQSx1QkFBVztBQUNULG9CQUFNLHVCQUFVO0FBQ2QscUJBQUssVUFBTCxDQUFnQixJQUFoQixHQUF1QixJQUF2QixDQUE0QixhQUFJO0FBQzlCLHVCQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsR0FBdUIsS0FBSyxPQUFMLENBQWEsS0FBSyxVQUFMLENBQWdCLElBQWhCLEVBQXNCLEtBQUssUUFBTCxDQUFjLGVBQWQsQ0FBMUQsQ0FEOEI7O0FBRzlCLDBCQUFRLE9BQVIsQ0FBZ0IsS0FBSyxVQUFMLENBQWhCLENBSDhCO2lCQUFKLENBQTVCLENBRGM7ZUFBVjthQURSO0FBU0Esb0JBQVE7QUFDTixvQkFBTSxNQUFOO0FBQ0Esb0JBQU0sTUFBTjthQUZGO1dBWHNCLENBQXhCLENBSmtCOztTQUFwQjs7QUFEVywrQkF1QlgsNkJBQVM7QUFDUCxlQUFLLGdCQUFMLENBQXNCLElBQXRCLEdBRE87OztBQXZCRSwrQkEyQlgsK0JBQVc7QUFDVCxZQUFFLEtBQUssWUFBTCxDQUFGLENBQXFCLFVBQXJCLENBQWdDO0FBQzlCLHNCQUFVLEtBQVY7QUFDQSx3QkFBWSxLQUFLLGdCQUFMO0FBQ1osb0JBQVE7QUFDTix1QkFBUyxJQUFUO2FBREY7QUFHQSx1QkFBVztBQUNULHNCQUFRLEtBQUssZ0JBQUwsQ0FBc0IsS0FBSyxZQUFMLENBQTlCO2FBREY7QUFHQSw0QkFBZ0IsS0FBSyxRQUFMLENBQWMsY0FBZDtBQUNoQixvQkFBUSxDQUFDO0FBQ1AscUJBQU8sT0FBUDthQURNLENBQVI7QUFHQSx1QkFBVztBQUNULG1CQUFLLEdBQUw7QUFDQSw4QkFBZ0I7QUFDZCx5QkFBUyxLQUFUO2VBREY7QUFHQSx1QkFBUyxJQUFUO2FBTEY7QUFPQSwwQkFBYztBQUNaLHFCQUFPLE9BQVA7QUFDQSw4QkFBZ0I7QUFDZCx5QkFBUyxLQUFUO2VBREY7QUFHQSxvQkFBTTtBQUNKLHlCQUFTLElBQVQ7ZUFERjthQUxGO1dBcEJGLEVBRFM7OztBQTNCQSwrQkE0RFgsMkJBQVEsTUFBTSxlQUFjO0FBQzFCLGNBQUksU0FBUyxFQUFULENBRHNCO0FBRTFCLFlBQUUsTUFBRixDQUFTLEVBQUUsT0FBRixDQUFVLElBQVYsRUFBZSxhQUFmLENBQVQsRUFBd0MsVUFBQyxDQUFELEVBQUksQ0FBSixFQUFTO0FBQy9DLG1CQUFPLElBQVAsQ0FBWTtBQUNWLHFCQUFPLENBQVA7QUFDQSxxQkFBTyxFQUFFLE1BQUY7YUFGVCxFQUQrQztXQUFULENBQXhDLENBRjBCO0FBUXpCLGlCQUFPLE1BQVAsQ0FSeUI7OztlQTVEakI7UUFBcUIiLCJmaWxlIjoibGF5b3V0L3dpZGdldHMvY2hhcnQtY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
