'use strict';

System.register(['./widget-content', 'helpers/data-helper', 'jquery', 'kendo-ui'], function (_export, _context) {
  var WidgetContent, DataHelper, $, kendo, _createClass, GridContent;

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
    }, function (_helpersDataHelper) {
      DataHelper = _helpersDataHelper.DataHelper;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_kendoUi) {
      kendo = _kendoUi.default;
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

      _export('GridContent', GridContent = function (_WidgetContent) {
        _inherits(GridContent, _WidgetContent);

        function GridContent(widget) {
          _classCallCheck(this, GridContent);

          var _this = _possibleConstructorReturn(this, _WidgetContent.call(this, widget));

          _this.columns = _this.settings.columns;
          _this.navigatable = _this.settings.navigatable;

          var self = _this;
          _this._gridDataSource = new kendo.data.DataSource({
            type: "json",
            pageSize: self.dataHolder.take,
            serverPaging: true,
            serverSorting: true,
            group: self.dataHolder.group,
            transport: {
              read: function read(options) {
                self.dataHolder.sort = options.data.sort;
                self.dataHolder.take = options.data.take;
                self.dataHolder.skip = options.data.skip;
                self.dataHolder.load().then(function (d) {
                  options.success(self.dataHolder);
                });
              }
            },
            schema: {
              type: "json",
              data: "data",
              total: "total"
            }
          });
          return _this;
        }

        GridContent.prototype.refresh = function refresh() {
          this._gridDataSource.read();
        };

        GridContent.prototype.attached = function attached() {
          var _this2 = this;

          this.restoreState();

          var me = this;
          me._grid = $(this.gridElement).kendoGrid({
            dataSource: this._gridDataSource,
            autoBind: false,
            height: this._calculateHeight(this.gridElement),
            sortable: true,
            scrollable: {
              virtual: true
            },
            selectable: "row",
            pageable: {
              numeric: false,
              previousNext: false,
              messages: {
                display: "{2} data items"
              }
            },
            filterable: {
              mode: "row"
            },
            navigatable: true,
            navigate: function navigate(e) {
              var row = $(e.element).closest("tr");

              var colIdx = $("td,th", row).index(e.element);
              var col = me.columns[colIdx - 1];
              if (col && col.selectable) {
                if (col != _this2.selectedCol) {
                  $(me.gridElement).find('th').removeClass("col-selected");
                  var th = $(me.gridElement).find('th').eq(colIdx);
                  th.addClass("col-selected");
                  _this2.selectedCol = col;
                  me.onColumnSelected(col.field);
                }
              } else $(me.gridElement).find('th').removeClass("col-selected");
              me._grid.data("kendoGrid").select(row);
            },
            groupable: true,
            columnMenu: true,
            columnMenuInit: function columnMenuInit(e) {
              var menu = e.container.find(".k-menu").data("kendoMenu");
              var field = e.field;
              menu.remove($(menu.element).find('li:contains("Columns")'));
              menu.append({ text: "Columns" });
              menu.bind("select", function (x) {
                if ($(x.item).text() == "Columns") {
                  $(me.columnsChooserPopup).modal('show');
                }
              });
            },
            columns: this.columns,
            change: function change(e) {
              var selectedRows = me._grid.data("kendoGrid").select();
              if (selectedRows.length == 0) return;
              if (_this2.selectedRow != me._grid.data("kendoGrid").dataItem(selectedRows[0])) {
                _this2.selectedRow = me._grid.data("kendoGrid").dataItem(selectedRows[0]);
                me.onSelected(_this2.selectedRow);
              }
            },
            dataBound: function dataBound(e) {
              $(me.gridElement).find("tr[data-uid]").dblclick(function (e) {
                var selectedData = me._grid.data("kendoGrid").select();
                me.onActivated(me._grid.data("kendoGrid").dataItem(selectedData[0]));
              });
            }
          });
          this._gridDataSource.read();
        };

        GridContent.prototype.resreshColumns = function resreshColumns(columnsSet) {
          if ($(this.gridElement).data("kendoGrid")) {
            for (var _iterator = columnsSet, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
              var _ref;

              if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
              } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
              }

              var fld = _ref;

              var c = _.find(this.columns, { 'field': fld.field });
              if (!c) self.columns.push({ field: fld.field, hidden: true });else if (!c.hidden && !c.format) c.format = this.getColumnFormat(c.field, fld.type);
            }
            $(this.gridElement).data("kendoGrid").setOptions({
              columns: this.columns
            });
          }
        };

        GridContent.prototype.saveState = function saveState() {
          this.widget.state = { columns: this.columns };
        };

        GridContent.prototype.restoreState = function restoreState() {
          if (this.widget.state) this.columns = this.widget.state.columns;
        };

        GridContent.prototype.onColumnSelected = function onColumnSelected(colName) {
          this.widget.dataFieldSelected.raise(colName);
        };

        GridContent.prototype.onActivated = function onActivated(dataItem) {
          var currentRecord = new Map();
          _.forOwn(dataItem, function (v, k) {
            currentRecord.set(k, v);
          });
          this.widget.dataActivated.raise(currentRecord);
        };

        GridContent.prototype.onSelected = function onSelected(dataItem) {
          var currentRecord = new Map();
          _.forOwn(dataItem, function (v, k) {
            currentRecord.set(k, v);
          });
          this.widget.dataSelected.raise(currentRecord);
        };

        GridContent.prototype.getColumnFormat = function getColumnFormat(columnName, type) {
          switch (type) {
            case "date":
              return "{0:MMM.dd yyyy}";
            case "currency":
              return "{0:n2}";
            default:
              return "";
          }
        };

        GridContent.prototype.selectColumn = function selectColumn(column) {
          var c = _.find(this.columns, { "field": column.field });
          c.hidden = !c.hidden;
          if (!c.format) c.format = this.getColumnFormat(c.field, this._gridDataSource.data());
          $(this.gridElement).data("kendoGrid").setOptions({
            columns: this.columns
          });
          this.saveState();
          return true;
        };

        _createClass(GridContent, [{
          key: 'selectedCol',
          get: function get() {
            return this._selectedCol;
          },
          set: function set(value) {
            this._selectedCol = value;
          }
        }, {
          key: 'selectedRow',
          get: function get() {
            return this._selectedRow;
          },
          set: function set(value) {
            this._selectedRow = value;
          }
        }, {
          key: 'columns',
          set: function set(value) {
            this._columns = value;
          },
          get: function get() {
            return this._columns;
          }
        }, {
          key: 'columnsFilterExpression',
          get: function get() {
            return this._columnsFilterExpression;
          },
          set: function set(value) {
            this._columnsFilterExpression = value;
          }
        }, {
          key: 'filteredColumns',
          get: function get() {
            var _this3 = this;

            if (this.columnsFilterExpression) return _.filter(this.columns, function (x) {
              return x.field.toLowerCase().indexOf(_this3.columnsFilterExpression.toLowerCase()) == 0;
            });
            return this.columns;
          }
        }]);

        return GridContent;
      }(WidgetContent));

      _export('GridContent', GridContent);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC93aWRnZXRzL2dyaWQtY29udGVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVE7O0FBQ0E7O0FBQ0Q7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFFTTs7O0FBQ1gsaUJBRFcsV0FDWCxDQUFZLE1BQVosRUFBb0I7Z0NBRFQsYUFDUzs7dURBQ2xCLDBCQUFNLE1BQU4sR0FEa0I7O0FBRWxCLGdCQUFLLE9BQUwsR0FBZSxNQUFLLFFBQUwsQ0FBYyxPQUFkLENBRkc7QUFHbEIsZ0JBQUssV0FBTCxHQUFtQixNQUFLLFFBQUwsQ0FBYyxXQUFkLENBSEQ7O0FBS2xCLGNBQUksWUFBSixDQUxrQjtBQU1sQixnQkFBSyxlQUFMLEdBQXVCLElBQUksTUFBTSxJQUFOLENBQVcsVUFBWCxDQUFzQjtBQUMvQyxrQkFBTSxNQUFOO0FBQ0Esc0JBQVUsS0FBSyxVQUFMLENBQWdCLElBQWhCO0FBQ1YsMEJBQWMsSUFBZDtBQUNBLDJCQUFlLElBQWY7QUFDQSxtQkFBTyxLQUFLLFVBQUwsQ0FBZ0IsS0FBaEI7QUFDUCx1QkFBVztBQUNULG9CQUFNLHVCQUFVO0FBQ2QscUJBQUssVUFBTCxDQUFnQixJQUFoQixHQUF1QixRQUFRLElBQVIsQ0FBYSxJQUFiLENBRFQ7QUFFZCxxQkFBSyxVQUFMLENBQWdCLElBQWhCLEdBQXVCLFFBQVEsSUFBUixDQUFhLElBQWIsQ0FGVDtBQUdkLHFCQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsR0FBdUIsUUFBUSxJQUFSLENBQWEsSUFBYixDQUhUO0FBSWQscUJBQUssVUFBTCxDQUFnQixJQUFoQixHQUF1QixJQUF2QixDQUE0QixhQUFHO0FBQzdCLDBCQUFRLE9BQVIsQ0FBZ0IsS0FBSyxVQUFMLENBQWhCLENBRDZCO2lCQUFILENBQTVCLENBSmM7ZUFBVjthQURSO0FBV0Esb0JBQVE7QUFDTixvQkFBTSxNQUFOO0FBQ0Esb0JBQU0sTUFBTjtBQUNB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VCxFQUFtQixVQUFDLENBQUQsRUFBSSxDQUFKLEVBQVE7QUFDekIsMEJBQWMsR0FBZCxDQUFrQixDQUFsQixFQUFvQixDQUFwQixFQUR5QjtXQUFSLENBQW5CLENBRmtCO0FBS2xCLGVBQUssTUFBTCxDQUFZLFlBQVosQ0FBeUIsS0FBekIsQ0FBK0IsYUFBL0IsRUFMa0I7OztBQTNLVCw4QkFxTFgsMkNBQWdCLFlBQVksTUFBSztBQUMvQixrQkFBUSxJQUFSO0FBQ0UsaUJBQUssTUFBTDtBQUNFLHFCQUFPLGlCQUFQLENBREY7QUFERixpQkFHTyxVQUFMO0FBQ0UscUJBQU8sUUFBUCxDQURGO0FBSEY7QUFNSSxxQkFBTyxFQUFQLENBREY7QUFMRixXQUQrQjs7O0FBckx0Qiw4QkErTVgscUNBQWEsUUFBTztBQUNsQixjQUFJLElBQUksRUFBRSxJQUFGLENBQU8sS0FBSyxPQUFMLEVBQWMsRUFBQyxTQUFTLE9BQU8sS0FBUCxFQUEvQixDQUFKLENBRGM7QUFFbEIsWUFBRSxNQUFGLEdBQVUsQ0FBQyxFQUFFLE1BQUYsQ0FGTztBQUdsQixjQUFJLENBQUMsRUFBRSxNQUFGLEVBQ0gsRUFBRSxNQUFGLEdBQVcsS0FBSyxlQUFMLENBQXFCLEVBQUUsS0FBRixFQUFTLEtBQUssZUFBTCxDQUFxQixJQUFyQixFQUE5QixDQUFYLENBREY7QUFFQSxZQUFFLEtBQUssV0FBTCxDQUFGLENBQW9CLElBQXBCLENBQXlCLFdBQXpCLEVBQXNDLFVBQXRDLENBQWlEO0FBQy9DLHFCQUFTLEtBQUssT0FBTDtXQURYLEVBTGtCO0FBUWxCLGVBQUssU0FBTCxHQVJrQjtBQVNsQixpQkFBTyxJQUFQLENBVGtCOzs7cUJBL01UOzs4QkFpQ007QUFDZixtQkFBTyxLQUFLLFlBQUwsQ0FEUTs7NEJBR0QsT0FBTTtBQUNwQixpQkFBSyxZQUFMLEdBQW9CLEtBQXBCLENBRG9COzs7OzhCQUlMO0FBQ2YsbUJBQU8sS0FBSyxZQUFMLENBRFE7OzRCQUdELE9BQU07QUFDcEIsaUJBQUssWUFBTCxHQUFvQixLQUFwQixDQURvQjs7Ozs0QkFJVixPQUFNO0FBQ2hCLGlCQUFLLFFBQUwsR0FBZ0IsS0FBaEIsQ0FEZ0I7OzhCQUdMO0FBQ1gsbUJBQU8sS0FBSyxRQUFMLENBREk7Ozs7OEJBK0lnQjtBQUMzQixtQkFBTyxLQUFLLHdCQUFMLENBRG9COzs0QkFHRCxPQUFNO0FBQ2hDLGlCQUFLLHdCQUFMLEdBQWdDLEtBQWhDLENBRGdDOzs7OzhCQUliOzs7QUFDbkIsZ0JBQUksS0FBSyx1QkFBTCxFQUNGLE9BQU8sRUFBRSxNQUFGLENBQVMsS0FBSyxPQUFMLEVBQWM7cUJBQU0sRUFBRSxLQUFGLENBQVEsV0FBUixHQUFzQixPQUF0QixDQUE4QixPQUFLLHVCQUFMLENBQTZCLFdBQTdCLEVBQTlCLEtBQTJFLENBQTNFO2FBQU4sQ0FBOUIsQ0FERjtBQUVBLG1CQUFPLEtBQUssT0FBTCxDQUhZOzs7O2VBeE1WO1FBQW9CIiwiZmlsZSI6ImxheW91dC93aWRnZXRzL2dyaWQtY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
