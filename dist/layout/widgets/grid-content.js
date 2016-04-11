'use strict';

System.register(['./widget-content', './../../data/query', 'jquery', 'lodash', 'kendo-ui'], function (_export, _context) {
  var WidgetContent, Query, $, _, kendo, _createClass, GridContent;

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
    }, function (_dataQuery) {
      Query = _dataQuery.Query;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_lodash) {
      _ = _lodash;
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

          _this.columns = _this.settings.columns ? _this.settings.columns : [];
          _this.navigatable = _this.settings.navigatable;
          _this.autoGenerateColumns = _this.settings.autoGenerateColumns;

          var self = _this;
          _this._gridDataSource = new kendo.data.DataSource({
            type: "json",
            pageSize: self.widget.settings.pageSize ? self.widget.settings.pageSize : 20,
            serverPaging: true,
            serverSorting: true,
            group: self.widget.settings.group,
            transport: {
              read: function read(options) {
                if (self.widget.dataSource) {
                  var query = new Query();
                  query.sort = options.data.sort;
                  query.take = options.data.take;
                  query.skip = options.data.skip;
                  query.serverSideFilter = self.widget.dataFilter;
                  self.widget.dataSource.getData(query).then(function (dH) {
                    _this.data = dH.data;
                    options.success(dH);
                  }, function (error) {
                    _this.data = [];
                    options.success({ total: 0, data: [] });
                  });
                } else options.error();
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
          this.destroyGrid();
          if (this.autoGenerateColumns) this.columns = [];
          this.createGrid();
          this._gridDataSource.read().then(function (x) {});
        };

        GridContent.prototype.attached = function attached() {
          this.restoreState();
          this.createGrid();
          this._gridDataSource.read();
        };

        GridContent.prototype.destroyGrid = function destroyGrid() {
          if ($(this.gridElement).data("kendoGrid")) $(this.gridElement).data("kendoGrid").destroy();
          $(this.gridElement).empty();
        };

        GridContent.prototype.createGrid = function createGrid() {
          var _this2 = this;

          var me = this;
          me._grid = $(this.gridElement).kendoGrid({
            dataSource: this._gridDataSource,
            autoBind: false,
            groupable: true,
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

            navigatable: true,
            navigate: function navigate(e) {
              var row = $(e.element).closest("tr");
              var colIdx = $("td,th", row).index(e.element);
              var dataColIdx = $("td[role='gridcell']", row).index(e.element);
              var col;
              if (me.columns) col = me.columns[dataColIdx];
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
          if (c.hidden) $(this.gridElement).data("kendoGrid").hideColumn(c.field);else $(this.gridElement).data("kendoGrid").showColumn(c.field);

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
          key: 'autoGenerateColumns',
          get: function get() {
            return this._autoGenerateColumns;
          },
          set: function set(value) {
            this._autoGenerateColumns = value;
          }
        }, {
          key: 'data',
          get: function get() {
            return this._data;
          },
          set: function set(value) {
            this._data = value;
          }
        }, {
          key: 'kendoGrid',
          get: function get() {}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC93aWRnZXRzL2dyaWQtY29udGVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVE7O0FBQ0E7O0FBQ0Q7O0FBQ0s7O0FBQ0w7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFFTTs7O0FBQ1gsaUJBRFcsV0FDWCxDQUFZLE1BQVosRUFBb0I7Z0NBRFQsYUFDUzs7dURBQ2xCLDBCQUFNLE1BQU4sR0FEa0I7O0FBRWxCLGdCQUFLLE9BQUwsR0FBZSxNQUFLLFFBQUwsQ0FBYyxPQUFkLEdBQXVCLE1BQUssUUFBTCxDQUFjLE9BQWQsR0FBd0IsRUFBL0MsQ0FGRztBQUdsQixnQkFBSyxXQUFMLEdBQW1CLE1BQUssUUFBTCxDQUFjLFdBQWQsQ0FIRDtBQUlsQixnQkFBSyxtQkFBTCxHQUEyQixNQUFLLFFBQUwsQ0FBYyxtQkFBZCxDQUpUOztBQU1sQixjQUFJLFlBQUosQ0FOa0I7QUFPbEIsZ0JBQUssZUFBTCxHQUF1QixJQUFJLE1BQU0sSUFBTixDQUFXLFVBQVgsQ0FBc0I7QUFDL0Msa0JBQU0sTUFBTjtBQUNBLHNCQUFVLEtBQUssTUFBTCxDQUFZLFFBQVosQ0FBcUIsUUFBckIsR0FBZ0MsS0FBSyxNQUFMLENBQVksUUFBWixDQUFxQixRQUFyQixHQUFnQyxFQUFoRTtBQUNWLDBCQUFjLElBQWQ7QUFDQSwyQkFBZSxJQUFmO0FBQ0EsbUJBQU8sS0FBSyxNQUFMLENBQVksUUFBWixDQUFxQixLQUFyQjtBQUNQLHVCQUFXO0FBQ1Qsb0JBQU0sdUJBQVU7QUFDZCxvQkFBSSxLQUFLLE1BQUwsQ0FBWSxVQUFaLEVBQXVCO0FBQ3pCLHNCQUFJLFFBQVEsSUFBSSxLQUFKLEVBQVIsQ0FEcUI7QUFFekIsd0JBQU0sSUFBTixHQUFhLFFBQVEsSUFBUixDQUFhLElBQWIsQ0FGWTtBQUd6Qix3QkFBTSxJQUFOLEdBQWEsUUFBUSxJQUFSLENBQWEsSUFBYixDQUhZO0FBSXpCLHdCQUFNLElB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
