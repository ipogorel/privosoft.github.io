'use strict';

System.register(['./../../data/query', './widget-content', 'lodash', 'jquery', 'kendo-ui'], function (_export, _context) {
  var Query, WidgetContent, _, $, kendo, ChartContent;

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
    setters: [function (_dataQuery) {
      Query = _dataQuery.Query;
    }, function (_widgetContent) {
      WidgetContent = _widgetContent.WidgetContent;
    }, function (_lodash) {
      _ = _lodash;
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
                var query = new Query();
                query.serverSideFilter = self.widget.dataFilter;
                self.widget.dataSource.getData(query).then(function (dH) {
                  var a = 1;
                  options.success(self.mapData(dH.data, self.settings.categoriesField));
                });
              }
            },
            schema: {
              type: "json"
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
          $(this.chartElement).data("kendoChart").refresh();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC93aWRnZXRzL2NoYXJ0LWNvbnRlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFROztBQUNBOztBQUNJOztBQUNMOztBQUNBOzs7OEJBRU07OztBQUNYLGlCQURXLFlBQ1gsQ0FBWSxNQUFaLEVBQW9CO2dDQURULGNBQ1M7O3VEQUNsQiwwQkFBTSxNQUFOLEdBRGtCOztBQUdsQixjQUFJLFlBQUosQ0FIa0I7QUFJbEIsZ0JBQUssZ0JBQUwsR0FBd0IsSUFBSSxNQUFNLElBQU4sQ0FBVyxVQUFYLENBQXNCO0FBQ2hELGtCQUFNLE1BQU47QUFDQSx1QkFBVztBQUNULG9CQUFNLHVCQUFVO0FBQ2Qsb0JBQUksUUFBUSxJQUFJLEtBQUosRUFBUixDQURVO0FBRWQsc0JBQU0sZ0JBQU4sR0FBeUIsS0FBSyxNQUFMLENBQVksVUFBWixDQUZYO0FBR2QscUJBQUssTUFBTCxDQUFZLFVBQVosQ0FBdUIsT0FBdkIsQ0FBK0IsS0FBL0IsRUFBc0MsSUFBdEMsQ0FBMkMsY0FBSTtBQUM3QyxzQkFBSSxJQUFJLENBQUosQ0FEeUM7QUFFN0MsMEJBQVEsT0FBUixDQUFnQixLQUFLLE9BQUwsQ0FBYSxHQUFHLElBQUgsRUFBUyxLQUFLLFFBQUwsQ0FBYyxlQUFkLENBQXRDLEVBRjZDO2lCQUFKLENBQTNDLENBSGM7ZUFBVjthQURSO0FBVUEsb0JBQVE7QUFDTixvQkFBTSxNQUFOO2FBREY7V0Fac0IsQ0FBeEIsQ0FKa0I7O1NBQXBCOztBQURXLCtCQXVCWCw2QkFBUztBQUNQLGVBQUssZ0JBQUwsQ0FBc0IsSUFBdEIsR0FETzs7O0FBdkJFLCtCQTJCWCwrQkFBVTtBQUNSLFlBQUUsS0FBSyxZQUFMLENBQUYsQ0FBcUIsVUFBckIsQ0FBZ0M7QUFDOUIsc0JBQVUsS0FBVjtBQUNBLHdCQUFZLEtBQUssZ0JBQUw7QUFDWixvQkFBUTtBQUNOLHVCQUFTLElBQVQ7YUFERjtBQUdBLHVCQUFXO0FBQ1Qsc0JBQVEsS0FBSyxnQkFBTCxDQUFzQixLQUFLLFlBQUwsQ0FBOUI7YUFERjtBQUdBLDRCQUFnQixLQUFLLFFBQUwsQ0FBYyxjQUFkO0FBQ2hCLG9CQUFRLENBQUM7QUFDUCxxQkFBTyxPQUFQO2FBRE0sQ0FBUjtBQUdBLHVCQUFXO0FBQ1QsOEJBQWdCO0FBQ2QseUJBQVMsS0FBVDtlQURGO0FBR0EsdUJBQVMsSUFBVDthQUpGO0FBTUEsMEJBQWM7QUFDWixxQkFBTyxPQUFQO0FBQ0EsOEJBQWdCO0FBQ2QseUJBQVMsS0FBVDtlQURGO0FBR0Esb0JBQU07QUFDSix5QkFBUyxJQUFUO2VBREY7YUFMRjtXQW5CRixFQURRO0FBOEJSLFlBQUUsS0FBSyxZQUFMLENBQUYsQ0FBcUIsSUFBckIsQ0FBMEIsWUFBMUIsRUFBd0MsT0FBeEMsR0E5QlE7OztBQTNCQywrQkE4RFgsMkJBQVEsTUFBTSxlQUFjO0FBQzFCLGNBQUksU0FBUyxFQUFULENBRHNCO0FBRTFCLFlBQUUsTUFBRixDQUFTLEVBQUUsT0FBRixDQUFVLElBQVYsRUFBZSxhQUFmLENBQVQsRUFBd0MsVUFBQyxDQUFELEVBQUksQ0FBSixFQUFTO0FBQy9DLG1CQUFPLElBQVAsQ0FBWTtBQUNWLHFCQUFPLENBQVA7QUFDQSxxQkFBTyxFQUFFLE1BQUY7YUFGVCxFQUQrQztXQUFULENBQXhDLENBRjBCO0FBUXpCLGlCQUFPLE1BQVAsQ0FSeUI7OztlQTlEakI7UUFBcUIiLCJmaWxlIjoibGF5b3V0L3dpZGdldHMvY2hhcnQtY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
