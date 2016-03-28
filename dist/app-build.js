"bundle";
(function() {
var define = System.amdDefine;
define("app.html!github:systemjs/plugin-text@0.0.3.js", [], function() {
  return "<template>\n  <require from='./layout/partials/nav-bar'></require>\n  <require from='./layout/partials/nav-menu'></require>\n  <require from='./layout/partials/app-footer'></require>\n  <div id=\"wrapper\">\n    <header class=\"navbar\">\n      <div class=\"container\">\n        <nav-bar router.bind=\"router\"></nav-bar>\n      </div>\n    </header>\n    <nav-menu router.bind=\"router\"></nav-menu>\n    <div class=\"content\">\n      <div class=\"container\">\n          <div class=\"layout layout-stack-sm layout-main-right\">\n            <div class=\"col-sm-12 col-md-12 layout-main\">\n              <router-view name=\"default\"></router-view>\n            </div>\n          </div>\n      </div>\n    </div>\n    <!--<app-footer></app-footer>-->\n  </div>\n</template>\n";
});

})();
'use strict';
System.register("app.js", ["aurelia-framework", "jquery"], function(_export, _context) {
  var inject,
      $,
      App;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [function(_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function(_jquery) {
      $ = _jquery.default;
    }],
    execute: function() {
      _export('App', App = function() {
        function App() {
          _classCallCheck(this, App);
        }
        App.prototype.configureRouter = function configureRouter(config, router) {
          config.title = 'Periscope';
          config.map([{
            route: ['/', '/:dashboard'],
            name: 'dashboard',
            moduleId: './dashboard',
            nav: true,
            title: 'Dashboard'
          }]);
          this.router = router;
        };
        App.prototype.attached = function attached() {
          var elementsHeight = $(".navbar")[0].scrollHeight + $(".mainnav")[0].scrollHeight - 8;
          if ($(".breadcrumb")[0])
            elementsHeight += $("breadcrumb")[0].scrollHeight;
          $(".content").css("height", $("#wrapper")[0].clientHeight - elementsHeight);
        };
        return App;
      }());
      _export('App', App);
    }
  };
});

(function() {
var define = System.amdDefine;
define("dashboard.html!github:systemjs/plugin-text@0.0.3.js", [], function() {
  return "<template>\n  <require from='./layout/partials/breadcrumbs'></require>\n  <section id=\"dashboard\" class=\"au-animate\">\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <!--<breadcrumbs></breadcrumbs>-->\n        </div>\n      </div>\n      <div class=\"row dashboard-container\">\n        <div class=\"col-md-12\">\n          <compose  view-model.bind='dashboard'></compose>\n        </div>\n      </div>\n  </section>\n</template>\n";
});

})();
'use strict';
System.register("layout/widgets/grid-content.js", ["./widget-content", "helpers/data-helper", "jquery", "kendo-ui"], function(_export, _context) {
  var WidgetContent,
      DataHelper,
      $,
      kendo,
      _createClass,
      GridContent;
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
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  return {
    setters: [function(_widgetContent) {
      WidgetContent = _widgetContent.WidgetContent;
    }, function(_helpersDataHelper) {
      DataHelper = _helpersDataHelper.DataHelper;
    }, function(_jquery) {
      $ = _jquery.default;
    }, function(_kendoUi) {
      kendo = _kendoUi.default;
    }],
    execute: function() {
      _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      _export('GridContent', GridContent = function(_WidgetContent) {
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
            transport: {read: function read(options) {
                self.dataHolder.sort = options.data.sort;
                self.dataHolder.take = options.data.take;
                self.dataHolder.skip = options.data.skip;
                self.dataHolder.load().then(function(d) {
                  options.success(self.dataHolder);
                });
              }},
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
            scrollable: {virtual: true},
            selectable: "row",
            pageable: {
              numeric: false,
              previousNext: false,
              messages: {display: "{2} data items"}
            },
            filterable: {mode: "row"},
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
              } else
                $(me.gridElement).find('th').removeClass("col-selected");
              me._grid.data("kendoGrid").select(row);
            },
            groupable: true,
            columnMenu: true,
            columnMenuInit: function columnMenuInit(e) {
              var menu = e.container.find(".k-menu").data("kendoMenu");
              var field = e.field;
              menu.remove($(menu.element).find('li:contains("Columns")'));
              menu.append({text: "Columns"});
              menu.bind("select", function(x) {
                if ($(x.item).text() == "Columns") {
                  $(me.columnsChooserPopup).modal('show');
                }
              });
            },
            columns: this.columns,
            change: function change(e) {
              var selectedRows = me._grid.data("kendoGrid").select();
              if (selectedRows.length == 0)
                return;
              if (_this2.selectedRow != me._grid.data("kendoGrid").dataItem(selectedRows[0])) {
                _this2.selectedRow = me._grid.data("kendoGrid").dataItem(selectedRows[0]);
                me.onSelected(_this2.selectedRow);
              }
            },
            dataBound: function dataBound(e) {
              $(me.gridElement).find("tr[data-uid]").dblclick(function(e) {
                var selectedData = me._grid.data("kendoGrid").select();
                me.onActivated(me._grid.data("kendoGrid").dataItem(selectedData[0]));
              });
            }
          });
          this._gridDataSource.read();
        };
        GridContent.prototype.resreshColumns = function resreshColumns(columnsSet) {
          if ($(this.gridElement).data("kendoGrid")) {
            for (var _iterator = columnsSet,
                _isArray = Array.isArray(_iterator),
                _i = 0,
                _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
              var _ref;
              if (_isArray) {
                if (_i >= _iterator.length)
                  break;
                _ref = _iterator[_i++];
              } else {
                _i = _iterator.next();
                if (_i.done)
                  break;
                _ref = _i.value;
              }
              var fld = _ref;
              var c = _.find(this.columns, {'field': fld.field});
              if (!c)
                self.columns.push({
                  field: fld.field,
                  hidden: true
                });
              else if (!c.hidden && !c.format)
                c.format = this.getColumnFormat(c.field, fld.type);
            }
            $(this.gridElement).data("kendoGrid").setOptions({columns: this.columns});
          }
        };
        GridContent.prototype.saveState = function saveState() {
          this.widget.state = {columns: this.columns};
        };
        GridContent.prototype.restoreState = function restoreState() {
          if (this.widget.state)
            this.columns = this.widget.state.columns;
        };
        GridContent.prototype.onColumnSelected = function onColumnSelected(colName) {
          this.widget.dataFieldSelected.raise(colName);
        };
        GridContent.prototype.onActivated = function onActivated(dataItem) {
          var currentRecord = new Map();
          _.forOwn(dataItem, function(v, k) {
            currentRecord.set(k, v);
          });
          this.widget.dataActivated.raise(currentRecord);
        };
        GridContent.prototype.onSelected = function onSelected(dataItem) {
          var currentRecord = new Map();
          _.forOwn(dataItem, function(v, k) {
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
          var c = _.find(this.columns, {"field": column.field});
          c.hidden = !c.hidden;
          if (!c.format)
            c.format = this.getColumnFormat(c.field, this._gridDataSource.data());
          $(this.gridElement).data("kendoGrid").setOptions({columns: this.columns});
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
            if (this.columnsFilterExpression)
              return _.filter(this.columns, function(x) {
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

'use strict';
System.register("layout/widgets/grid.js", ["aurelia-framework", "./widget", "./grid-content"], function(_export, _context) {
  var Decorators,
      customElement,
      bindable,
      inject,
      useView,
      noView,
      Widget,
      GridContent,
      _dec,
      _dec2,
      _class,
      Grid;
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
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  return {
    setters: [function(_aureliaFramework) {
      Decorators = _aureliaFramework.Decorators;
      customElement = _aureliaFramework.customElement;
      bindable = _aureliaFramework.bindable;
      inject = _aureliaFramework.inject;
      useView = _aureliaFramework.useView;
      noView = _aureliaFramework.noView;
    }, function(_widget) {
      Widget = _widget.Widget;
    }, function(_gridContent) {
      GridContent = _gridContent.GridContent;
    }],
    execute: function() {
      _export('Grid', Grid = (_dec = customElement('grid'), _dec2 = useView('./widget.html'), _dec(_class = _dec2(_class = function(_Widget) {
        _inherits(Grid, _Widget);
        function Grid(settings) {
          _classCallCheck(this, Grid);
          var _this = _possibleConstructorReturn(this, _Widget.call(this, settings));
          _this.stateType = "gridState";
          _this.dataHolder.take = _this.settings.pageSize ? _this.settings.pageSize : 20;
          _this.dataHolder.skip = 0;
          _this.dataHolder.group = _this.settings.group;
          _this.initContent();
          return _this;
        }
        Grid.prototype.initContent = function initContent() {
          this.content = new GridContent(this);
        };
        return Grid;
      }(Widget)) || _class) || _class));
      _export('Grid', Grid);
    }
  };
});

'use strict';
System.register("layout/widgets/chart-content.js", ["./widget-content", "jquery", "kendo-ui"], function(_export, _context) {
  var WidgetContent,
      $,
      kendo,
      ChartContent;
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
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  return {
    setters: [function(_widgetContent) {
      WidgetContent = _widgetContent.WidgetContent;
    }, function(_jquery) {
      $ = _jquery.default;
    }, function(_kendoUi) {
      kendo = _kendoUi.default;
    }],
    execute: function() {
      _export('ChartContent', ChartContent = function(_WidgetContent) {
        _inherits(ChartContent, _WidgetContent);
        function ChartContent(widget) {
          _classCallCheck(this, ChartContent);
          var _this = _possibleConstructorReturn(this, _WidgetContent.call(this, widget));
          var self = _this;
          _this._chartDataSource = new kendo.data.DataSource({
            type: "json",
            transport: {read: function read(options) {
                self.dataHolder.load().then(function(d) {
                  self.dataHolder.data = self.mapData(self.dataHolder.data, self.settings.categoriesField);
                  options.success(self.dataHolder);
                });
              }},
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
            legend: {visible: true},
            chartArea: {height: this._calculateHeight(this.chartElement)},
            seriesDefaults: this.settings.seriesDefaults,
            series: [{field: "value"}],
            valueAxis: {
              max: 100,
              majorGridLines: {visible: false},
              visible: true
            },
            categoryAxis: {
              field: "field",
              majorGridLines: {visible: false},
              line: {visible: true}
            }
          });
        };
        ChartContent.prototype.mapData = function mapData(data, categoryField) {
          var result = [];
          _.forOwn(_.groupBy(data, categoryField), function(v, k) {
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

'use strict';
System.register("layout/widgets/chart.js", ["aurelia-framework", "./widget", "./chart-content"], function(_export, _context) {
  var customElement,
      inject,
      useView,
      Widget,
      ChartContent,
      _dec,
      _dec2,
      _class,
      Chart;
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
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  return {
    setters: [function(_aureliaFramework) {
      customElement = _aureliaFramework.customElement;
      inject = _aureliaFramework.inject;
      useView = _aureliaFramework.useView;
    }, function(_widget) {
      Widget = _widget.Widget;
    }, function(_chartContent) {
      ChartContent = _chartContent.ChartContent;
    }],
    execute: function() {
      _export('Chart', Chart = (_dec = customElement('chart'), _dec2 = useView('./widget.html'), _dec(_class = _dec2(_class = function(_Widget) {
        _inherits(Chart, _Widget);
        function Chart(settings) {
          _classCallCheck(this, Chart);
          var _this = _possibleConstructorReturn(this, _Widget.call(this, settings));
          _this.stateType = "chartState";
          _this.initContent();
          return _this;
        }
        Chart.prototype.initContent = function initContent() {
          this.content = new ChartContent(this);
        };
        return Chart;
      }(Widget)) || _class) || _class));
      _export('Chart', Chart);
    }
  };
});

'use strict';
System.register("dsl/dsl-expression-manager.js", ["../helpers/data-helper", "../helpers/string-helper", "lodash"], function(_export, _context) {
  var DataHelper,
      StringHelper,
      lodash,
      _typeof,
      DslExpressionManager;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [function(_helpersDataHelper) {
      DataHelper = _helpersDataHelper.DataHelper;
    }, function(_helpersStringHelper) {
      StringHelper = _helpersStringHelper.StringHelper;
    }, function(_lodash) {
      lodash = _lodash.default;
    }],
    execute: function() {
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
      } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
      };
      _export('DslExpressionManager', DslExpressionManager = function() {
        function DslExpressionManager(parser, dataHolder, fieldsList) {
          _classCallCheck(this, DslExpressionManager);
          this.dataHolder = dataHolder;
          this.fields = fieldsList;
          this.parser = parser;
        }
        DslExpressionManager.prototype.populate = function populate(searchStr, lastWord) {
          var parserError = this.getParserError(searchStr);
          return this._getIntellisenseData(searchStr, lastWord, parserError);
        };
        DslExpressionManager.prototype.parse = function parse(searchStr) {
          var expression = this.parser.parse(searchStr);
          return this._normalizeSerachExpression(expression);
        };
        DslExpressionManager.prototype.validate = function validate(searchStr) {
          return this.parser.validate(searchStr);
        };
        DslExpressionManager.prototype.expectedToken = function expectedToken(searchStr) {
          var tokenName = "";
          var parserError = this.getParserError(searchStr);
          if (parserError != null)
            tokenName = this._interpreteParserError(parserError);
          return tokenName;
        };
        DslExpressionManager.prototype.getParserError = function getParserError(searchStr) {
          var result = null;
          if (searchStr != "") {
            try {
              this.parse(searchStr);
              try {
                this.parse(searchStr + "^");
              } catch (ex2) {
                result = ex2;
              }
            } catch (ex) {
              result = ex;
            }
          }
          return result;
        };
        DslExpressionManager.prototype._getIntellisenseData = function _getIntellisenseData(searchStr, lastWord, pegException) {
          var _this = this;
          var type = '';
          var result = [];
          var lastFldName = '';
          if (!pegException)
            return new Promise(function(resolve, reject) {
              resolve([]);
            });
          var tokenName = this._interpreteParserError(pegException);
          return new Promise(function(resolve, reject) {
            switch (tokenName) {
              case "STRING_FIELD_NAME":
              case "NUMERIC_FIELD_NAME":
              case "DATE_FIELD_NAME":
                var filteredFields = lastWord ? _.filter(_this.fields, function(f) {
                  return f.startsWith(lastWord);
                }) : _this.fields;
                resolve(_this._normalizeData("field", filteredFields.sort()));
                break;
              case "STRING_OPERATOR_EQUAL":
              case "STRING_OPERATOR_IN":
                resolve(_this._normalizeData("operator", _this._getStringComparisonOperatorsArray()));
                break;
              case "STRING_VALUE":
              case "STRING_PATTERN":
                lastFldName = _this._getLastFieldName(searchStr, _this.fields, pegException.column);
                _this._getFieldValuesArray(lastFldName, lastWord).then(function(data) {
                  resolve(_this._normalizeData("string", data));
                });
                break;
              case "STRING_VALUES_ARRAY":
                lastFldName = _this._getLastFieldName(searchStr, _this.fields, pegException.column);
                _this._getFieldValuesArray(lastFldName, lastWord).then(function(data) {
                  resolve(_this._normalizeData("array_string", data));
                });
                break;
                resolve(_this._normalizeData("array_string", []));
                break;
              case "OPERATOR":
                resolve(_this._normalizeData("operator", _this._getComparisonOperatorsArray()));
                break;
              case "LOGIC_OPERATOR":
              case "end of input":
                resolve(_this._normalizeData("operator", _this._getLogicalOperatorsArray()));
                break;
              default:
                resolve([]);
                break;
            }
          });
        };
        DslExpressionManager.prototype._interpreteParserError = function _interpreteParserError(ex) {
          if (Object.prototype.toString.call(ex.expected) == "[object Array]") {
            for (var _iterator = ex.expected,
                _isArray = Array.isArray(_iterator),
                _i = 0,
                _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
              var _ref;
              if (_isArray) {
                if (_i >= _iterator.length)
                  break;
                _ref = _iterator[_i++];
              } else {
                _i = _iterator.next();
                if (_i.done)
                  break;
                _ref = _i.value;
              }
              var desc = _ref;
              if (desc.type == "other" || desc.type == "end") {
                return desc.description;
              }
            }
          }
          return "";
        };
        DslExpressionManager.prototype._getLogicalOperatorsArray = function _getLogicalOperatorsArray() {
          return ["and", "or"];
        };
        DslExpressionManager.prototype._getComparisonOperatorsArray = function _getComparisonOperatorsArray() {
          return ["!=", "=", ">", "<", ">=", "<="];
        };
        DslExpressionManager.prototype._getLastFieldName = function _getLastFieldName(searchStr, fieldsArray, index) {
          var tmpArr = searchStr.substr(0, index).split(" ");
          var _loop = function _loop(i) {
            if (fieldsArray.findIndex(function(x) {
              return x == tmpArr[i].trim();
            }) >= 0)
              return {v: tmpArr[i].trim()};
          };
          for (var i = tmpArr.length - 1; i >= 0; i--) {
            var _ret = _loop(i);
            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object")
              return _ret.v;
          }
          return "";
        };
        DslExpressionManager.prototype._getStringComparisonOperatorsArray = function _getStringComparisonOperatorsArray() {
          return ["=", "in"];
        };
        DslExpressionManager.prototype._getFieldValuesArray = function _getFieldValuesArray(fieldName, lastWord) {
          var _this2 = this;
          this.dataHolder.take = 100;
          this.dataHolder.skip = 0;
          if (lastWord)
            this.dataHolder.query.serverSideFilter = this.parse(fieldName + " = '" + lastWord + "%'");
          else
            this.dataHolder.query.serverSideFilter = "";
          this.dataHolder.fields = [fieldName];
          return this.dataHolder.load().then(function(d) {
            var result = _.map(_this2.dataHolder.data, fieldName);
            return _.uniq(result).sort();
          });
        };
        DslExpressionManager.prototype._normalizeData = function _normalizeData(type, dataArray) {
          return _.map(dataArray, function(d) {
            return {
              type: type,
              value: d
            };
          });
        };
        DslExpressionManager.prototype._normalizeSerachExpression = function _normalizeSerachExpression(searchExpression) {
          var expr = new RegExp('record.([a-zA-Z0-9\%\_\-]*)', 'g');
          var match;
          while ((match = expr.exec(searchExpression)) !== null) {
            for (var _iterator2 = this.fields,
                _isArray2 = Array.isArray(_iterator2),
                _i2 = 0,
                _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ; ) {
              var _ref2;
              if (_isArray2) {
                if (_i2 >= _iterator2.length)
                  break;
                _ref2 = _iterator2[_i2++];
              } else {
                _i2 = _iterator2.next();
                if (_i2.done)
                  break;
                _ref2 = _i2.value;
              }
              var fld = _ref2;
              if (match[1].toLowerCase() === fld.toLowerCase())
                searchExpression = StringHelper.replaceAll(searchExpression, match[0], 'record.' + fld);
            }
          }
          return searchExpression;
        };
        return DslExpressionManager;
      }());
      _export('DslExpressionManager', DslExpressionManager);
    }
  };
});

"use strict";
System.register("dsl/expression-parser.js", [], function(_export, _context) {
  var ExpressionParser;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      _export("ExpressionParser", ExpressionParser = function() {
        function ExpressionParser(pegParser) {
          _classCallCheck(this, ExpressionParser);
          this.parser = pegParser;
        }
        ExpressionParser.prototype.parse = function parse(searchString) {
          return this.parser.parse(searchString);
        };
        ExpressionParser.prototype.validate = function validate(searchString) {
          try {
            this.parser.parse(searchString);
            return true;
          } catch (ex) {
            return false;
          }
        };
        return ExpressionParser;
      }());
      _export("ExpressionParser", ExpressionParser);
    }
  };
});

'use strict';
System.register("dsl/expression-parser-factory.js", ["aurelia-framework", "aurelia-fetch-client", "../dsl/expression-parser", "pegjs"], function(_export, _context) {
  var inject,
      HttpClient,
      ExpressionParser,
      peg,
      _dec,
      _class,
      ExpressionParserFactory;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [function(_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function(_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
    }, function(_dslExpressionParser) {
      ExpressionParser = _dslExpressionParser.ExpressionParser;
    }, function(_pegjs) {
      peg = _pegjs.default;
    }],
    execute: function() {
      _export('ExpressionParserFactory', ExpressionParserFactory = (_dec = inject(HttpClient), _dec(_class = function() {
        function ExpressionParserFactory(http) {
          _classCallCheck(this, ExpressionParserFactory);
          http.configure(function(config) {
            config.useStandardConfiguration();
          });
          this.http = http;
        }
        ExpressionParserFactory.prototype.createInstance = function createInstance(numericFieldList, stringFieldList, dateFieldList) {
          var that = this;
          return this.http.fetch('/parser_data/peg.js.grammar.txt').then(function(response) {
            return response.text();
          }).then(function(text) {
            var parserText = text.replace('@S@', that.concatenateFieldList(stringFieldList)).replace('@N@', that.concatenateFieldList(numericFieldList)).replace('@D@', that.concatenateFieldList(dateFieldList));
            return new ExpressionParser(peg.buildParser(parserText));
          });
        };
        ExpressionParserFactory.prototype.concatenateFieldList = function concatenateFieldList(fieldList) {
          for (var i = 0; i < fieldList.length; i++) {
            fieldList[i] = '\'' + fieldList[i] + '\'i';
          }
          if (fieldList.length > 0)
            return fieldList.join('/ ');
          else
            return "'unknown_field'";
        };
        return ExpressionParserFactory;
      }()) || _class));
      _export('ExpressionParserFactory', ExpressionParserFactory);
    }
  };
});

'use strict';
System.register("dsl/dsl-expression-manager-factory.js", ["aurelia-framework", "../helpers/data-helper", "lodash", "../dsl/dsl-expression-manager", "../dsl/expression-parser-factory"], function(_export, _context) {
  var inject,
      DataHelper,
      lodash,
      DslExpressionManager,
      ExpressionParserFactory,
      _dec,
      _class,
      DslExpressionManagerFactory;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [function(_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function(_helpersDataHelper) {
      DataHelper = _helpersDataHelper.DataHelper;
    }, function(_lodash) {
      lodash = _lodash.default;
    }, function(_dslDslExpressionManager) {
      DslExpressionManager = _dslDslExpressionManager.DslExpressionManager;
    }, function(_dslExpressionParserFactory) {
      ExpressionParserFactory = _dslExpressionParserFactory.ExpressionParserFactory;
    }],
    execute: function() {
      _export('DslExpressionManagerFactory', DslExpressionManagerFactory = (_dec = inject(ExpressionParserFactory), _dec(_class = function() {
        function DslExpressionManagerFactory(expressionParserFactory) {
          _classCallCheck(this, DslExpressionManagerFactory);
          this.expressionParserFactory = expressionParserFactory;
        }
        DslExpressionManagerFactory.prototype.createInstance = function createInstance(dataHolder, fields) {
          var allFields = _.map(fields, "field");
          var numericFields = _.map(DataHelper.getNumericFields(fields), "field");
          var stringFields = _.map(DataHelper.getStringFields(fields), "field");
          var dateFields = _.map(DataHelper.getDateFields(fields), "field");
          return this.expressionParserFactory.createInstance(numericFields, stringFields, dateFields).then(function(parser) {
            return new DslExpressionManager(parser, dataHolder, allFields);
          });
        };
        return DslExpressionManagerFactory;
      }()) || _class));
      _export('DslExpressionManagerFactory', DslExpressionManagerFactory);
    }
  };
});

'use strict';
System.register("layout/widgets/dsl-search-box-content.js", ["aurelia-framework", "aurelia-event-aggregator", "jquery", "bootstrap", "./widget-content", "dsl/dsl-expression-manager-factory", "helpers/string-helper"], function(_export, _context) {
  var Container,
      Decorators,
      customElement,
      bindable,
      inject,
      EventAggregator,
      $,
      bootstrap,
      WidgetContent,
      DslExpressionManagerFactory,
      StringHelper,
      _createClass,
      DslSearchBoxContent;
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
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  return {
    setters: [function(_aureliaFramework) {
      Container = _aureliaFramework.Container;
      Decorators = _aureliaFramework.Decorators;
      customElement = _aureliaFramework.customElement;
      bindable = _aureliaFramework.bindable;
      inject = _aureliaFramework.inject;
    }, function(_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function(_jquery) {
      $ = _jquery.default;
    }, function(_bootstrap) {
      bootstrap = _bootstrap.bootstrap;
    }, function(_widgetContent) {
      WidgetContent = _widgetContent.WidgetContent;
    }, function(_dslDslExpressionManagerFactory) {
      DslExpressionManagerFactory = _dslDslExpressionManagerFactory.DslExpressionManagerFactory;
    }, function(_helpersStringHelper) {
      StringHelper = _helpersStringHelper.StringHelper;
    }],
    execute: function() {
      _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      _export('DslSearchBoxContent', DslSearchBoxContent = function(_WidgetContent) {
        _inherits(DslSearchBoxContent, _WidgetContent);
        function DslSearchBoxContent(widget) {
          _classCallCheck(this, DslSearchBoxContent);
          var _this = _possibleConstructorReturn(this, _WidgetContent.call(this, widget));
          var container = new Container();
          _this._expressionManagerFactory = container.get(DslExpressionManagerFactory);
          _this._searchString = "";
          _this._assumptionString = "";
          _this._isValid = true;
          _this._caretPosition = 0;
          _this._separators = [" ", ","];
          _this._specialSymbols = ["'", "(", ")", "\""];
          _this._timer;
          _this._suggestionsListSettings = {
            title: '',
            suggestions: [],
            focusedSuggestion: -1,
            displaySuggestions: false,
            lastWord: ''
          };
          return _this;
        }
        DslSearchBoxContent.prototype.refresh = function refresh() {
          var _this2 = this;
          this._expressionManagerFactory.createInstance(this.dataHolder, this.widget.dataSource.transport.readService.configuration.schema.fields).then(function(x) {
            _this2.expressionManager = x;
            if (_this2.widget.state) {
              _this2.searchString = _this2.widget.state;
              _this2.suggestionsListSettings.displaySuggestions = false;
            }
          });
        };
        DslSearchBoxContent.prototype.attached = function attached() {
          var self = this;
          $(this.searchBox)[0].addEventListener("keydown", function(e) {
            if (e.keyCode == 40) {
              self.suggestionsListSettings.focusedSuggestion = 0;
              e.preventDefault();
              e.stopPropagation();
            } else {
              self.suggestionsListSettings.focusedSuggestion = -1;
              self._caretPosition = this.selectionEnd + 1;
            }
            if (e.keyCode == 27 || e.keyCode == 13) {
              self.suggestionsListSettings.displaySuggestions = false;
            }
          }, true);
          $(function() {
            $('[data-toggle="tooltip"]').tooltip();
          });
        };
        DslSearchBoxContent.prototype.populateSuggestions = function populateSuggestions(searchStr) {
          var _this3 = this;
          searchStr = searchStr.substring(0, this.caretPosition);
          var lastWord = this.getLastWord(searchStr);
          this.suggestionsListSettings.title = '';
          this.expressionManager.populate(searchStr, lastWord).then(function(data) {
            _this3.suggestionsListSettings.suggestions = data;
            _this3.suggestionsListSettings.lastWord = lastWord;
            _this3.suggestionsListSettings.displaySuggestions = _this3.suggestionsListSettings.suggestions.length > 0;
          });
        };
        DslSearchBoxContent.prototype.select = function select(suggestion) {
          var searchStr = this.searchString;
          var position = this.caretPosition;
          while (position < searchStr.length && searchStr[position] != " ") {
            position++;
          }
          var strLeft = searchStr.substring(0, position);
          var strRight = position < searchStr.length ? searchStr.substring(position, searchStr.length) : '';
          var wordToReplace = this.getLastWord(searchStr);
          strLeft = strLeft.substring(0, strLeft.lastIndexOf(wordToReplace));
          var value = suggestion.value;
          if (suggestion.type === 'string' || suggestion.type === 'array_string')
            value = "'" + value + "'";
          if (suggestion.type === 'array_string') {
            var openBraceExsits = false;
            for (var i = strLeft.trim().length; i >= 0; i--) {
              if (strLeft[i] === "(") {
                openBraceExsits = true;
                break;
              }
              if (strLeft[i] === ")")
                break;
            }
            if (!openBraceExsits)
              value = "(" + value;
            else {
              var lastChar = strLeft.trim().charAt(strLeft.trim().length - 1);
              if (lastChar !== '(' && lastChar !== ',')
                value = "," + value;
            }
          }
          if (suggestion.type === 'operator' && suggestion.value === 'in')
            value += " (";
          else
            value += " ";
          this.caretPosition = (strLeft + value).length;
          this.searchString = strLeft + value + strRight;
        };
        DslSearchBoxContent.prototype.getAssumptions = function getAssumptions(wrongString, suggestions) {
          var assumptions = [];
          for (var _iterator = suggestions,
              _isArray = Array.isArray(_iterator),
              _i = 0,
              _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
            var _ref;
            if (_isArray) {
              if (_i >= _iterator.length)
                break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done)
                break;
              _ref = _i.value;
            }
            var sg = _ref;
            assumptions.push({
              distance: StringHelper.getEditDistance(sg.value.substring(0, wrongString.length), wrongString),
              value: sg.value,
              type: sg.type
            });
          }
          assumptions = assumptions.sort(function(a, b) {
            if (a.distance > b.distance)
              return 1;
            if (a.distance < b.distance)
              return -1;
            return 0;
          }).splice(0, assumptions.length > 1 ? 1 : assumptions.length);
          return assumptions;
        };
        DslSearchBoxContent.prototype.getLastWord = function getLastWord(searchStr) {
          var str = StringHelper.getPreviousWord(searchStr, this.caretPosition, this._separators);
          for (var _iterator2 = this._specialSymbols,
              _isArray2 = Array.isArray(_iterator2),
              _i2 = 0,
              _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ; ) {
            var _ref2;
            if (_isArray2) {
              if (_i2 >= _iterator2.length)
                break;
              _ref2 = _iterator2[_i2++];
            } else {
              _i2 = _iterator2.next();
              if (_i2.done)
                break;
              _ref2 = _i2.value;
            }
            var s = _ref2;
            str = StringHelper.replaceAll(str, "\\" + s, "");
          }
          return str.trim();
        };
        DslSearchBoxContent.prototype.notifySearchCriteriaChanged = function notifySearchCriteriaChanged() {
          if (this.isValid) {
            this.widget.state = this.searchString;
          }
          var self = this;
          self.assumptionString = "";
          window.clearTimeout(self._timer);
          self._timer = window.setTimeout(function() {
            if (self.isValid) {
              var searchExpression = '';
              if (self.searchString !== '')
                var searchExpression = self.expressionManager.parse(self.searchString);
              self.widget.dataFilterChanged.raise(searchExpression);
            }
          }, 500);
        };
        DslSearchBoxContent.prototype.createSearchStringAssumption = function createSearchStringAssumption(searchStr) {
          var maxAttempts = 10;
          var result = "";
          for (var i = 0; i <= maxAttempts; i++) {
            var err = this.expressionManager.getParserError(searchStr);
            if (err.offset < searchStr.length) {
              var wrongStr = StringHelper.getNextWord(searchStr, err.offset, this._separators);
              if (wrongStr.trim().length > 0) {
                var assump = this.getAssumptions(wrongStr, this.expressionManager.populate(searchStr));
                if (assump.length > 0) {
                  searchStr = StringHelper.replaceAll(searchStr, wrongStr, assump[0].value);
                  if (this.expressionManager.validate(searchStr)) {
                    result = searchStr;
                    break;
                  }
                }
              }
            } else
              break;
          }
          console.log(result);
          return result;
        };
        DslSearchBoxContent.prototype.selectAssumption = function selectAssumption() {
          this.searchString = this.assumptionString;
        };
        _createClass(DslSearchBoxContent, [{
          key: 'selectedSuggestion',
          get: function get() {
            return this._selectedSuggestion;
          },
          set: function set(value) {
            if (this._selectedSuggestion != value) {
              this._selectedSuggestion = value;
              this.select(this._selectedSuggestion);
            }
          }
        }, {
          key: 'assumptionString',
          get: function get() {
            return this._assumptionString;
          },
          set: function set(value) {
            this._assumptionString = value;
          }
        }, {
          key: 'suggestionsListSettings',
          get: function get() {
            return this._suggestionsListSettings;
          },
          set: function set(value) {
            this._suggestionsListSettings = value;
          }
        }, {
          key: 'isValid',
          get: function get() {
            if (this.searchString === '' || !this.expressionManager)
              return true;
            return this.expressionManager.validate(this.searchString);
          }
        }, {
          key: 'searchString',
          get: function get() {
            return this._searchString;
          },
          set: function set(value) {
            if (this._searchString != value) {
              this._searchString = value;
              this.populateSuggestions(value);
              this.notifySearchCriteriaChanged();
            }
          }
        }, {
          key: 'caretPosition',
          get: function get() {
            return this._caretPosition;
          },
          set: function set(value) {
            if (value != this._caretPosition) {
              var self = this;
              self._caretPosition = value;
              $(self.searchBox)[0].focus();
              window.setTimeout(function() {
                $(self.searchBox)[0].setSelectionRange(value, value);
              }, 400);
            }
          }
        }, {
          key: 'showAssumption',
          get: function get() {
            return this.assumptionString != '' && !this.suggestionsListSettings.displaySuggestions;
          }
        }]);
        return DslSearchBoxContent;
      }(WidgetContent));
      _export('DslSearchBoxContent', DslSearchBoxContent);
    }
  };
});

'use strict';
System.register("layout/widgets/search-box.js", ["aurelia-framework", "./widget", "./dsl-search-box-content"], function(_export, _context) {
  var customElement,
      useView,
      Widget,
      DslSearchBoxContent,
      _dec,
      _dec2,
      _class,
      SearchBox;
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
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  return {
    setters: [function(_aureliaFramework) {
      customElement = _aureliaFramework.customElement;
      useView = _aureliaFramework.useView;
    }, function(_widget) {
      Widget = _widget.Widget;
    }, function(_dslSearchBoxContent) {
      DslSearchBoxContent = _dslSearchBoxContent.DslSearchBoxContent;
    }],
    execute: function() {
      _export('SearchBox', SearchBox = (_dec = customElement('search-box'), _dec2 = useView('./widget.html'), _dec(_class = _dec2(_class = function(_Widget) {
        _inherits(SearchBox, _Widget);
        function SearchBox(settings) {
          _classCallCheck(this, SearchBox);
          var _this = _possibleConstructorReturn(this, _Widget.call(this, settings));
          _this.stateType = "searchBoxState";
          _this.dataHolder.take = 50;
          _this.dataHolder.skip = 0;
          _this.initContent();
          return _this;
        }
        SearchBox.prototype.initContent = function initContent() {
          this.content = new DslSearchBoxContent(this);
        };
        return SearchBox;
      }(Widget)) || _class) || _class));
      _export('SearchBox', SearchBox);
    }
  };
});

"use strict";
System.register("layout/widgets/widget-content.js", ["navigator/events/widget-event"], function(_export, _context) {
  var WidgetEvent,
      _createClass,
      WidgetContent;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [function(_navigatorEventsWidgetEvent) {
      WidgetEvent = _navigatorEventsWidgetEvent.WidgetEvent;
    }],
    execute: function() {
      _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      _export("WidgetContent", WidgetContent = function() {
        function WidgetContent(widget) {
          _classCallCheck(this, WidgetContent);
          this._widget = widget;
        }
        WidgetContent.prototype.refresh = function refresh() {
          this.dataHolder.cacheKey();
        };
        WidgetContent.prototype._calculateHeight = function _calculateHeight(contentRootElement) {
          var p = $(contentRootElement).parents(".widget-container");
          var headerHeight = p.find(".portlet-header")[0].scrollHeight;
          var parentHeight = p[0].offsetHeight - headerHeight;
          return parentHeight > this.settings.minHeight ? parentHeight : this.settings.minHeight;
        };
        _createClass(WidgetContent, [{
          key: "widget",
          get: function get() {
            return this._widget;
          }
        }, {
          key: "dataHolder",
          get: function get() {
            return this._widget.dataHolder;
          },
          set: function set(value) {
            this._widget.dataHolder = value;
          }
        }, {
          key: "settings",
          get: function get() {
            return this.widget.settings;
          }
        }]);
        return WidgetContent;
      }());
      _export("WidgetContent", WidgetContent);
    }
  };
});

'use strict';
System.register("layout/widgets/detailed-view-content.js", ["aurelia-framework", "lodash", "./widget-content"], function(_export, _context) {
  var inject,
      lodash,
      WidgetContent,
      _createClass,
      DetailedViewContent;
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
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  return {
    setters: [function(_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function(_lodash) {
      lodash = _lodash.default;
    }, function(_widgetContent) {
      WidgetContent = _widgetContent.WidgetContent;
    }],
    execute: function() {
      _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      _export('DetailedViewContent', DetailedViewContent = function(_WidgetContent) {
        _inherits(DetailedViewContent, _WidgetContent);
        function DetailedViewContent(widget) {
          _classCallCheck(this, DetailedViewContent);
          var _this = _possibleConstructorReturn(this, _WidgetContent.call(this, widget));
          _this.columns = widget.settings.columns;
          return _this;
        }
        _createClass(DetailedViewContent, [{
          key: 'fields',
          get: function get() {
            var result = [];
            if (!this.dataHolder.data || !this.dataHolder.data[0])
              return result;
            var _data = this.dataHolder.data[0];
            if (this.columns) {
              result = _.map(this.columns, function(c) {
                return {
                  name: c.title ? c.title : c.field,
                  value: _data[c.field]
                };
              });
            } else {
              _.forOwn(_data, function(v, k) {
                result.push({
                  name: k,
                  value: v
                });
              });
            }
            return result;
          }
        }, {
          key: 'columns',
          set: function set(value) {
            this._columns = value;
          },
          get: function get() {
            return this._columns;
          }
        }]);
        return DetailedViewContent;
      }(WidgetContent));
      _export('DetailedViewContent', DetailedViewContent);
    }
  };
});

'use strict';
System.register("layout/widgets/detailed-view.js", ["aurelia-framework", "./widget", "./detailed-view-content"], function(_export, _context) {
  var customElement,
      inject,
      useView,
      Widget,
      DetailedViewContent,
      _dec,
      _dec2,
      _class,
      DetailedView;
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
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  return {
    setters: [function(_aureliaFramework) {
      customElement = _aureliaFramework.customElement;
      inject = _aureliaFramework.inject;
      useView = _aureliaFramework.useView;
    }, function(_widget) {
      Widget = _widget.Widget;
    }, function(_detailedViewContent) {
      DetailedViewContent = _detailedViewContent.DetailedViewContent;
    }],
    execute: function() {
      _export('DetailedView', DetailedView = (_dec = customElement('detailed-view'), _dec2 = useView('./widget.html'), _dec(_class = _dec2(_class = function(_Widget) {
        _inherits(DetailedView, _Widget);
        function DetailedView(settings) {
          _classCallCheck(this, DetailedView);
          var _this = _possibleConstructorReturn(this, _Widget.call(this, settings));
          _this.stateType = "detailedViewState";
          _this.dataHolder.take = 1;
          _this.dataHolder.skip = 0;
          _this.initContent();
          return _this;
        }
        DetailedView.prototype.initContent = function initContent() {
          this.content = new DetailedViewContent(this);
        };
        return DetailedView;
      }(Widget)) || _class) || _class));
      _export('DetailedView', DetailedView);
    }
  };
});

"use strict";
System.register("navigator/dashboardbehavior/manage-navigation-stack-behavior.js", ["./dashboard-behavior"], function(_export, _context) {
  var DashboardBehavior,
      ManageNavigationStackBehavior;
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
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  return {
    setters: [function(_dashboardBehavior) {
      DashboardBehavior = _dashboardBehavior.DashboardBehavior;
    }],
    execute: function() {
      _export("ManageNavigationStackBehavior", ManageNavigationStackBehavior = function(_DashboardBehavior) {
        _inherits(ManageNavigationStackBehavior, _DashboardBehavior);
        function ManageNavigationStackBehavior(eventAggregator) {
          _classCallCheck(this, ManageNavigationStackBehavior);
          var _this = _possibleConstructorReturn(this, _DashboardBehavior.call(this));
          _this._eventAggregator = eventAggregator;
          return _this;
        }
        ManageNavigationStackBehavior.prototype.attach = function attach(dashboard) {
          _DashboardBehavior.prototype.attach.call(this, dashboard);
          var me = this;
          this.subscription = this._eventAggregator.subscribe("widget-back-button-channel", function(message) {
            var originatorWidget = dashboard.getWidgetByName(message.originatorName);
            if (originatorWidget) {
              var previousWidget = message.navigationStack.pop();
              dashboard.replaceWidget(originatorWidget, previousWidget);
            }
          });
        };
        ManageNavigationStackBehavior.prototype.detach = function detach() {
          _DashboardBehavior.prototype.detach.call(this, dashboard);
          if (this.subscription)
            this.subscription.dispose();
        };
        return ManageNavigationStackBehavior;
      }(DashboardBehavior));
      _export("ManageNavigationStackBehavior", ManageNavigationStackBehavior);
    }
  };
});

'use strict';
System.register("navigator/widgetbehavior/data-field-selected-behavior.js", ["./widget-behavior", "../events/widget-event-message"], function(_export, _context) {
  var WidgetBehavior,
      WidgetEventMessage,
      DataFieldSelectedBehavior;
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
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  return {
    setters: [function(_widgetBehavior) {
      WidgetBehavior = _widgetBehavior.WidgetBehavior;
    }, function(_eventsWidgetEventMessage) {
      WidgetEventMessage = _eventsWidgetEventMessage.WidgetEventMessage;
    }],
    execute: function() {
      _export('DataFieldSelectedBehavior', DataFieldSelectedBehavior = function(_WidgetBehavior) {
        _inherits(DataFieldSelectedBehavior, _WidgetBehavior);
        function DataFieldSelectedBehavior(chanel, eventAggregator) {
          _classCallCheck(this, DataFieldSelectedBehavior);
          var _this = _possibleConstructorReturn(this, _WidgetBehavior.call(this));
          _this._chanel = chanel;
          _this._eventAggregator = eventAggregator;
          return _this;
        }
        DataFieldSelectedBehavior.prototype.attachToWidget = function attachToWidget(widget) {
          _WidgetBehavior.prototype.attachToWidget.call(this, widget);
          var me = this;
          widget.dataFieldSelected = function(fieldName) {
            var message = new WidgetEventMessage(me.widget.name);
            message.fieldName = fieldName;
            me._eventAggregator.publish(me._chanel, message);
          };
        };
        DataFieldSelectedBehavior.prototype.detach = function detach() {
          _WidgetBehavior.prototype.detach.call(this, dashboard);
        };
        return DataFieldSelectedBehavior;
      }(WidgetBehavior));
      _export('DataFieldSelectedBehavior', DataFieldSelectedBehavior);
    }
  };
});

'use strict';
System.register("navigator/widgetbehavior/data-selected-behavior.js", ["./widget-behavior", "../events/widget-event-message"], function(_export, _context) {
  var WidgetBehavior,
      WidgetEventMessage,
      DataSelectedBehavior;
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
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  return {
    setters: [function(_widgetBehavior) {
      WidgetBehavior = _widgetBehavior.WidgetBehavior;
    }, function(_eventsWidgetEventMessage) {
      WidgetEventMessage = _eventsWidgetEventMessage.WidgetEventMessage;
    }],
    execute: function() {
      _export('DataSelectedBehavior', DataSelectedBehavior = function(_WidgetBehavior) {
        _inherits(DataSelectedBehavior, _WidgetBehavior);
        function DataSelectedBehavior(chanel, eventAggregator) {
          _classCallCheck(this, DataSelectedBehavior);
          var _this = _possibleConstructorReturn(this, _WidgetBehavior.call(this));
          _this._chanel = chanel;
          _this._eventAggregator = eventAggregator;
          return _this;
        }
        DataSelectedBehavior.prototype.attachToWidget = function attachToWidget(widget) {
          _WidgetBehavior.prototype.attachToWidget.call(this, widget);
          var me = this;
          widget.dataSelected = function(currentRecord) {
            var message = new WidgetEventMessage(me.widget.name);
            message.selectedData = currentRecord;
            me._eventAggregator.publish(me._chanel, message);
          };
        };
        DataSelectedBehavior.prototype.detach = function detach() {
          _WidgetBehavior.prototype.detach.call(this, dashboard);
        };
        return DataSelectedBehavior;
      }(WidgetBehavior));
      _export('DataSelectedBehavior', DataSelectedBehavior);
    }
  };
});

'use strict';
System.register("navigator/widgetbehavior/data-activated-behavior.js", ["./widget-behavior", "../events/widget-event-message"], function(_export, _context) {
  var WidgetBehavior,
      WidgetEventMessage,
      DataActivatedBehavior;
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
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  return {
    setters: [function(_widgetBehavior) {
      WidgetBehavior = _widgetBehavior.WidgetBehavior;
    }, function(_eventsWidgetEventMessage) {
      WidgetEventMessage = _eventsWidgetEventMessage.WidgetEventMessage;
    }],
    execute: function() {
      _export('DataActivatedBehavior', DataActivatedBehavior = function(_WidgetBehavior) {
        _inherits(DataActivatedBehavior, _WidgetBehavior);
        function DataActivatedBehavior(chanel, eventAggregator) {
          _classCallCheck(this, DataActivatedBehavior);
          var _this = _possibleConstructorReturn(this, _WidgetBehavior.call(this));
          _this._chanel = chanel;
          _this._eventAggregator = eventAggregator;
          return _this;
        }
        DataActivatedBehavior.prototype.attachToWidget = function attachToWidget(widget) {
          _WidgetBehavior.prototype.attachToWidget.call(this, widget);
          var me = this;
          widget.dataActivated = function(currentRecord) {
            var message = new WidgetEventMessage(me.widget.name);
            message.activatedData = currentRecord;
            me._eventAggregator.publish(me._chanel, message);
          };
        };
        DataActivatedBehavior.prototype.detach = function detach() {
          _WidgetBehavior.prototype.detach.call(this, dashboard);
        };
        return DataActivatedBehavior;
      }(WidgetBehavior));
      _export('DataActivatedBehavior', DataActivatedBehavior);
    }
  };
});

'use strict';
System.register("navigator/widgetbehavior/data-filter-changed-behavior.js", ["./widget-behavior", "../events/widget-event-message"], function(_export, _context) {
  var WidgetBehavior,
      WidgetEventMessage,
      DataFilterChangedBehavior;
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
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  return {
    setters: [function(_widgetBehavior) {
      WidgetBehavior = _widgetBehavior.WidgetBehavior;
    }, function(_eventsWidgetEventMessage) {
      WidgetEventMessage = _eventsWidgetEventMessage.WidgetEventMessage;
    }],
    execute: function() {
      _export('DataFilterChangedBehavior', DataFilterChangedBehavior = function(_WidgetBehavior) {
        _inherits(DataFilterChangedBehavior, _WidgetBehavior);
        function DataFilterChangedBehavior(channel, eventAggregator) {
          _classCallCheck(this, DataFilterChangedBehavior);
          var _this = _possibleConstructorReturn(this, _WidgetBehavior.call(this));
          _this._channel = channel;
          _this._eventAggregator = eventAggregator;
          return _this;
        }
        DataFilterChangedBehavior.prototype.attachToWidget = function attachToWidget(widget) {
          _WidgetBehavior.prototype.attachToWidget.call(this, widget);
          var me = this;
          widget.dataFilterChanged = function(filter) {
            var message = new WidgetEventMessage(me.widget.name);
            message.dataFilter = filter;
            me._eventAggregator.publish(me._channel, message);
          };
        };
        DataFilterChangedBehavior.prototype.detach = function detach() {
          _WidgetBehavior.prototype.detach.call(this, dashboard);
        };
        return DataFilterChangedBehavior;
      }(WidgetBehavior));
      _export('DataFilterChangedBehavior', DataFilterChangedBehavior);
    }
  };
});

'use strict';
System.register("navigator/widgetbehavior/data-filter-handle-behavior.js", ["./widget-behavior"], function(_export, _context) {
  var WidgetBehavior,
      DataFilterHandleBehavior;
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
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  return {
    setters: [function(_widgetBehavior) {
      WidgetBehavior = _widgetBehavior.WidgetBehavior;
    }],
    execute: function() {
      _export('DataFilterHandleBehavior', DataFilterHandleBehavior = function(_WidgetBehavior) {
        _inherits(DataFilterHandleBehavior, _WidgetBehavior);
        function DataFilterHandleBehavior(channel, eventAggregator, filterMapper) {
          _classCallCheck(this, DataFilterHandleBehavior);
          var _this = _possibleConstructorReturn(this, _WidgetBehavior.call(this));
          _this._channel = channel;
          _this._eventAggregator = eventAggregator;
          _this._filterMapper = filterMapper;
          return _this;
        }
        DataFilterHandleBehavior.prototype.attachToWidget = function attachToWidget(widget) {
          _WidgetBehavior.prototype.attachToWidget.call(this, widget);
          var me = this;
          this.subscription = this._eventAggregator.subscribe(this._channel, function(message) {
            var filterToApply = me._filterMapper ? me._filterMapper(message) : message.dataFilter;
            me.widget.dataFilter = filterToApply;
            me.widget.refresh();
          });
        };
        DataFilterHandleBehavior.prototype.detach = function detach() {
          _WidgetBehavior.prototype.detach.call(this, dashboard);
          if (this.subscription)
            this.subscription.dispose();
        };
        return DataFilterHandleBehavior;
      }(WidgetBehavior));
      _export('DataFilterHandleBehavior', DataFilterHandleBehavior);
    }
  };
});

'use strict';
System.register("navigator/widgetbehavior/settings-handle-behavior.js", ["./widget-behavior"], function(_export, _context) {
  var WidgetBehavior,
      SettingsHandleBehavior;
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
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  return {
    setters: [function(_widgetBehavior) {
      WidgetBehavior = _widgetBehavior.WidgetBehavior;
    }],
    execute: function() {
      _export('SettingsHandleBehavior', SettingsHandleBehavior = function(_WidgetBehavior) {
        _inherits(SettingsHandleBehavior, _WidgetBehavior);
        function SettingsHandleBehavior(channel, eventAggregator, messageMapper) {
          _classCallCheck(this, SettingsHandleBehavior);
          var _this = _possibleConstructorReturn(this, _WidgetBehavior.call(this));
          _this._channel = channel;
          _this._eventAggregator = eventAggregator;
          _this._messageMapper = messageMapper;
          return _this;
        }
        SettingsHandleBehavior.prototype.attachToWidget = function attachToWidget(widget) {
          _WidgetBehavior.prototype.attachToWidget.call(this, widget);
          var me = this;
          this.subscription = this._eventAggregator.subscribe(this._channel, function(message) {
            var settingsToApply = me._messageMapper ? me._messageMapper(message) : message;
            me.widget.changeSettings(settingsToApply);
          });
        };
        SettingsHandleBehavior.prototype.detach = function detach() {
          _WidgetBehavior.prototype.detach.call(this, dashboard);
          if (this.subscription)
            this.subscription.dispose();
        };
        return SettingsHandleBehavior;
      }(WidgetBehavior));
      _export('SettingsHandleBehavior', SettingsHandleBehavior);
    }
  };
});

'use strict';
System.register("navigator/dashboardbehavior/create-widget-behavior.js", ["aurelia-framework", "aurelia-event-aggregator", "layout/infrastructure/widget-factory", "./dashboard-behavior"], function(_export, _context) {
  var Container,
      EventAggregator,
      WidgetFactory,
      DashboardBehavior,
      CreateWidgetBehavior;
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
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  return {
    setters: [function(_aureliaFramework) {
      Container = _aureliaFramework.Container;
    }, function(_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function(_layoutInfrastructureWidgetFactory) {
      WidgetFactory = _layoutInfrastructureWidgetFactory.WidgetFactory;
    }, function(_dashboardBehavior) {
      DashboardBehavior = _dashboardBehavior.DashboardBehavior;
    }],
    execute: function() {
      _export('CreateWidgetBehavior', CreateWidgetBehavior = function(_DashboardBehavior) {
        _inherits(CreateWidgetBehavior, _DashboardBehavior);
        function CreateWidgetBehavior(chanel, widgetType, widgetSettings, widgetDimensions, eventAggregator, widgetFactory, filterMapper) {
          _classCallCheck(this, CreateWidgetBehavior);
          var _this = _possibleConstructorReturn(this, _DashboardBehavior.call(this));
          _this._chanel = chanel;
          _this._widgetType = widgetType;
          _this._widgetSettings = widgetSettings;
          _this._widgetDimensions = widgetDimensions;
          _this._eventAggregator = eventAggregator;
          _this._widgetFactory = widgetFactory;
          _this._filterMapper = filterMapper;
          return _this;
        }
        CreateWidgetBehavior.prototype.attach = function attach(dashboard) {
          var _this2 = this;
          _DashboardBehavior.prototype.attach.call(this, dashboard);
          var me = this;
          this.subscription = this._eventAggregator.subscribe(this._chanel, function(message) {
            var w = dashboard.getWidgetByName(me._widgetSettings.name);
            if (!w) {
              var w = _this2._widgetFactory.createWidget(me._widgetType, me._widgetSettings);
              dashboard.addWidget(w, _this2._widgetDimensions);
            }
            w.dataFilter = me._filterMapper ? me._filterMapper(message) : "";
            w.refresh();
          });
        };
        CreateWidgetBehavior.prototype.detach = function detach() {
          _DashboardBehavior.prototype.detach.call(this, dashboard);
          if (this.subscription)
            this.subscription.dispose();
        };
        return CreateWidgetBehavior;
      }(DashboardBehavior));
      _export('CreateWidgetBehavior', CreateWidgetBehavior);
    }
  };
});

'use strict';
System.register("navigator/dashboardbehavior/replace-widget-behavior.js", ["layout/infrastructure/widget-factory", "./dashboard-behavior"], function(_export, _context) {
  var WidgetFactory,
      DashboardBehavior,
      ReplaceWidgetBehavior;
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
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  return {
    setters: [function(_layoutInfrastructureWidgetFactory) {
      WidgetFactory = _layoutInfrastructureWidgetFactory.WidgetFactory;
    }, function(_dashboardBehavior) {
      DashboardBehavior = _dashboardBehavior.DashboardBehavior;
    }],
    execute: function() {
      _export('ReplaceWidgetBehavior', ReplaceWidgetBehavior = function(_DashboardBehavior) {
        _inherits(ReplaceWidgetBehavior, _DashboardBehavior);
        function ReplaceWidgetBehavior(chanel, eventAggregator, widgetFactory, widgetToReplaceName, widgetType, widgetSettings, mapper) {
          _classCallCheck(this, ReplaceWidgetBehavior);
          var _this = _possibleConstructorReturn(this, _DashboardBehavior.call(this));
          _this._chanel = chanel;
          _this._widgetType = widgetType;
          _this._widgetSettings = widgetSettings;
          _this._eventAggregator = eventAggregator;
          _this._widgetFactory = widgetFactory;
          _this._widgetToReplaceName = widgetToReplaceName;
          _this._mapper = mapper;
          return _this;
        }
        ReplaceWidgetBehavior.prototype.attach = function attach(dashboard) {
          _DashboardBehavior.prototype.attach.call(this, dashboard);
          var me = this;
          this.subscription = this._eventAggregator.subscribe(this._chanel, function(message) {
            var originatorWidget = dashboard.getWidgetByName(me._widgetToReplaceName);
            var w = me._widgetFactory.createWidget(me._widgetType, me._widgetSettings);
            w.navigationStack.push(originatorWidget);
            dashboard.replaceWidget(originatorWidget, w);
            if (me._mapper)
              w.dataFilter = me._mapper(message);
            w.refresh();
          });
        };
        ReplaceWidgetBehavior.prototype.detach = function detach() {
          _DashboardBehavior.prototype.detach.call(this, dashboard);
          if (this.subscription)
            this.subscription.dispose();
        };
        return ReplaceWidgetBehavior;
      }(DashboardBehavior));
      _export('ReplaceWidgetBehavior', ReplaceWidgetBehavior);
    }
  };
});

"use strict";
System.register("navigator/dashboardbehavior/dashboard-behavior.js", [], function(_export, _context) {
  var _createClass,
      DashboardBehavior;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      _export("DashboardBehavior", DashboardBehavior = function() {
        function DashboardBehavior() {
          _classCallCheck(this, DashboardBehavior);
        }
        DashboardBehavior.prototype.attach = function attach(dashboard) {
          this._dashboard = dashboard;
          this._dashboard.behaviors.push(this);
        };
        DashboardBehavior.prototype.detach = function detach() {
          for (var i = 0; i < this.dashboard.behaviors.length; i++) {
            if (this.dashboard.behaviors[i] === this) {
              this.dashboard.behaviors.splice(i, 1);
              break;
            }
          }
        };
        _createClass(DashboardBehavior, [{
          key: "dashboard",
          get: function get() {
            return this._dashboard;
          }
        }]);
        return DashboardBehavior;
      }());
      _export("DashboardBehavior", DashboardBehavior);
    }
  };
});

'use strict';
System.register("navigator/dashboardbehavior/change-route-behavior.js", ["../periscope-router", "./dashboard-behavior", "aurelia-event-aggregator"], function(_export, _context) {
  var PeriscopeRouter,
      DashboardBehavior,
      EventAggregator,
      ChangeRouteBehavior;
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
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  return {
    setters: [function(_periscopeRouter) {
      PeriscopeRouter = _periscopeRouter.PeriscopeRouter;
    }, function(_dashboardBehavior) {
      DashboardBehavior = _dashboardBehavior.DashboardBehavior;
    }, function(_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }],
    execute: function() {
      _export('ChangeRouteBehavior', ChangeRouteBehavior = function(_DashboardBehavior) {
        _inherits(ChangeRouteBehavior, _DashboardBehavior);
        function ChangeRouteBehavior(settings) {
          _classCallCheck(this, ChangeRouteBehavior);
          var _this = _possibleConstructorReturn(this, _DashboardBehavior.call(this));
          _this._chanel = settings.chanel;
          _this._eventAggregator = settings.eventAggregator;
          _this._newRoute = settings.newRoute;
          _this._router = settings.router;
          _this._paramsMapper = settings.paramsMapper;
          return _this;
        }
        ChangeRouteBehavior.prototype.attach = function attach(dashboard) {
          _DashboardBehavior.prototype.attach.call(this, dashboard);
          var me = this;
          this.subscription = this._eventAggregator.subscribe(this._chanel, function(message) {
            var params = me._paramsMapper ? me._paramsMapper(message) : "";
            if (params !== "" && params.indexOf("?") != 0)
              params = "?" + params;
            var navItem = {
              route: me._newRoute.route + (params !== "" ? params : ""),
              title: me._newRoute.title,
              dashboardName: me._newRoute.dashboardName
            };
            me._router.navigate(navItem);
          });
        };
        ChangeRouteBehavior.prototype.detach = function detach() {
          _DashboardBehavior.prototype.detach.call(this, dashboard);
          if (this.subscription)
            this.subscription.dispose();
        };
        return ChangeRouteBehavior;
      }(DashboardBehavior));
      _export('ChangeRouteBehavior', ChangeRouteBehavior);
    }
  };
});

"use strict";
System.register("navigator/events/widget-event.js", [], function(_export, _context) {
  var _createClass,
      WidgetEvent;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      _export("WidgetEvent", WidgetEvent = function() {
        function WidgetEvent(widgetName) {
          _classCallCheck(this, WidgetEvent);
          this._handlers = [];
          this._originatorName = widgetName;
        }
        WidgetEvent.prototype.attach = function attach(handler) {
          if (this._handlers.some(function(e) {
            return e === handler;
          })) {
            return;
          }
          this._handlers.push(handler);
        };
        WidgetEvent.prototype.detach = function detach(handler) {
          var idx = this._handlers.indexOf(handler);
          if (idx < 0) {
            return;
          }
          this.handler.splice(idx, 1);
        };
        WidgetEvent.prototype.raise = function raise() {
          for (var i = 0; i < this._handlers.length; i++) {
            this._handlers[i].apply(this, arguments);
          }
        };
        _createClass(WidgetEvent, [{
          key: "originatorName",
          get: function get() {
            return this._originatorName;
          }
        }]);
        return WidgetEvent;
      }());
      _export("WidgetEvent", WidgetEvent);
    }
  };
});

'use strict';
System.register("layout/widgets/widget.js", ["aurelia-framework", "navigator/events/widget-event", "lodash", "data/query"], function(_export, _context) {
  var computedFrom,
      WidgetEvent,
      lodash,
      Query,
      _createClass,
      _dec,
      _desc,
      _value,
      _class,
      Widget;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function(key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;
    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }
    desc = decorators.slice().reverse().reduce(function(desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);
    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }
    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }
    return desc;
  }
  return {
    setters: [function(_aureliaFramework) {
      computedFrom = _aureliaFramework.computedFrom;
    }, function(_navigatorEventsWidgetEvent) {
      WidgetEvent = _navigatorEventsWidgetEvent.WidgetEvent;
    }, function(_lodash) {
      lodash = _lodash.default;
    }, function(_dataQuery) {
      Query = _dataQuery.Query;
    }],
    execute: function() {
      _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      _export('Widget', Widget = (_dec = computedFrom('navigationStack'), (_class = function() {
        function Widget(settings) {
          _classCallCheck(this, Widget);
          this._settings = settings;
          this._behaviors = [];
          this._navigationStack = [];
          this._backButtonPressed = new WidgetEvent();
          this._dataSelected = new WidgetEvent();
          this._dataActivated = new WidgetEvent();
          this._dataFilterChanged = new WidgetEvent();
          this._dataFieldSelected = new WidgetEvent();
          if (this.dataSource)
            this.dataHolder = this.dataSource.createDataHolder();
          this.attachBehaviors(this.settings.behavior);
          this._resized = false;
        }
        Widget.prototype.attachBehaviors = function attachBehaviors(behaviors) {
          if (behaviors) {
            for (var _iterator = behaviors,
                _isArray = Array.isArray(_iterator),
                _i = 0,
                _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
              var _ref;
              if (_isArray) {
                if (_i >= _iterator.length)
                  break;
                _ref = _iterator[_i++];
              } else {
                _i = _iterator.next();
                if (_i.done)
                  break;
                _ref = _i.value;
              }
              var b = _ref;
              b.attachToWidget(this);
            }
          }
        };
        Widget.prototype.changeSettings = function changeSettings(newSettings) {
          var _this = this;
          if (newSettings) {
            _.forOwn(newSettings, function(v, k) {
              _this.settings[k] = v;
            });
            this.refresh();
          }
        };
        Widget.prototype.resize = function resize() {
          if (!this.resized) {
            this._originalDimensions = this._dashboard.getWidgetDimensions(this);
            this._dashboard.resizeWidget(this, {size_x: 12});
          } else
            this._dashboard.resizeWidget(this, this._originalDimensions);
          this.resized = !this.resized;
        };
        Widget.prototype.remove = function remove() {
          if (this._dashboard != undefined)
            this._dashboard.removeWidget(this);
        };
        Widget.prototype.refresh = function refresh() {
          var _this2 = this;
          this.dataHolder.query = new Query();
          this.dataHolder.query.serverSideFilter = this.dataFilter;
          this.dataHolder.query.skip = 0;
          this.dataHolder.load().then(function(d) {
            _this2.content.refresh();
          });
        };
        Widget.prototype.back = function back() {
          if (this._backButtonPressed)
            this.backButtonPressed.raise(this.navigationStack);
        };
        Widget.prototype.dispose = function dispose() {
          while (true) {
            if (this.behaviors.length > 0)
              this.behaviors[0].detach();
            else
              break;
          }
        };
        _createClass(Widget, [{
          key: 'self',
          get: function get() {
            return this;
          }
        }, {
          key: 'settings',
          get: function get() {
            return this._settings;
          }
        }, {
          key: 'content',
          get: function get() {
            return this.contentViewModel;
          },
          set: function set(value) {
            this.contentViewModel = value;
          }
        }, {
          key: 'behaviors',
          get: function get() {
            return this._behaviors;
          }
        }, {
          key: 'name',
          get: function get() {
            return this.settings.name;
          }
        }, {
          key: 'state',
          get: function get() {
            if (this.stateStorage) {
              var key = this.stateStorage.createKey(this.dashboard.name, this.name);
              var s = this.stateStorage.get(key);
              if (s)
                return s.stateObject;
            }
            return undefined;
          },
          set: function set(value) {
            if (this.stateStorage) {
              var key = this.stateStorage.createKey(this.dashboard.name, this.name);
              if (!value)
                this.stateStorage.remove(key);
              else {
                var s = {
                  stateType: this.stateType,
                  stateObject: value
                };
                this.stateStorage.set(key, s);
              }
            }
          }
        }, {
          key: 'stateType',
          get: function get() {
            return this._type;
          },
          set: function set(value) {
            this._type = value;
          }
        }, {
          key: 'showHeader',
          get: function get() {
            return this.settings.showHeader;
          }
        }, {
          key: 'dataHolder',
          set: function set(value) {
            this._dataHolder = value;
          },
          get: function get() {
            return this._dataHolder;
          }
        }, {
          key: 'data',
          set: function set(value) {
            this.content.data = value;
          }
        }, {
          key: 'hasNavStack',
          get: function get() {
            return this.navigationStack && this.navigationStack.length > 0;
          }
        }, {
          key: 'header',
          get: function get() {
            return this.settings.header;
          }
        }, {
          key: 'resized',
          get: function get() {
            return this._resized;
          },
          set: function set(value) {
            this._resized = value;
          }
        }, {
          key: 'stateStorage',
          get: function get() {
            return this.settings.stateStorage;
          }
        }, {
          key: 'dataSource',
          get: function get() {
            return this.settings.dataSource;
          }
        }, {
          key: 'dataMapper',
          get: function get() {
            return this.settings.dataMapper;
          }
        }, {
          key: 'dataFilter',
          get: function get() {
            return this._dataFilter;
          },
          set: function set(value) {
            this._dataFilter = value;
          }
        }, {
          key: 'type',
          get: function get() {
            return this._type;
          }
        }, {
          key: 'dashboard',
          get: function get() {
            return this._dashboard;
          },
          set: function set(value) {
            this._dashboard = value;
          }
        }, {
          key: 'navigationStack',
          get: function get() {
            return this._navigationStack;
          },
          set: function set(value) {
            this._navigationStack = value;
          }
        }, {
          key: 'backButtonPressed',
          get: function get() {
            return this._backButtonPressed;
          },
          set: function set(handler) {
            this._backButtonPressed.attach(handler);
          }
        }, {
          key: 'dataFieldSelected',
          get: function get() {
            return this._dataFieldSelected;
          },
          set: function set(handler) {
            this._dataFieldSelected.attach(handler);
          }
        }, {
          key: 'dataSelected',
          get: function get() {
            return this._dataSelected;
          },
          set: function set(handler) {
            this._dataSelected.attach(handler);
          }
        }, {
          key: 'dataActivated',
          get: function get() {
            return this._dataActivated;
          },
          set: function set(handler) {
            this._dataActivated.attach(handler);
          }
        }, {
          key: 'dataFilterChanged',
          get: function get() {
            return this._dataFilterChanged;
          },
          set: function set(handler) {
            this._dataFilterChanged.attach(handler);
          }
        }]);
        return Widget;
      }(), (_applyDecoratedDescriptor(_class.prototype, 'hasNavStack', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'hasNavStack'), _class.prototype)), _class)));
      _export('Widget', Widget);
    }
  };
});

"use strict";
System.register("navigator/widgetbehavior/widget-behavior.js", [], function(_export, _context) {
  var _createClass,
      WidgetBehavior;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      _export("WidgetBehavior", WidgetBehavior = function() {
        function WidgetBehavior() {
          _classCallCheck(this, WidgetBehavior);
        }
        WidgetBehavior.prototype.attachToWidget = function attachToWidget(widget) {
          this._widget = widget;
          this._widget.behaviors.push(this);
        };
        WidgetBehavior.prototype.detach = function detach() {
          for (var i = 0; i < this.widget.behaviors.length; i++) {
            if (this.widget.behaviors[i] === this) {
              this.widget.behaviors.splice(i, 1);
              break;
            }
          }
        };
        _createClass(WidgetBehavior, [{
          key: "widget",
          get: function get() {
            return this._widget;
          }
        }]);
        return WidgetBehavior;
      }());
      _export("WidgetBehavior", WidgetBehavior);
    }
  };
});

"use strict";
System.register("navigator/events/widget-event-message.js", [], function(_export, _context) {
  var _createClass,
      WidgetEventMessage;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      _export("WidgetEventMessage", WidgetEventMessage = function() {
        function WidgetEventMessage(widgetName) {
          _classCallCheck(this, WidgetEventMessage);
          this._originatorName = widgetName;
        }
        _createClass(WidgetEventMessage, [{
          key: "originatorName",
          get: function get() {
            return this._originatorName;
          }
        }]);
        return WidgetEventMessage;
      }());
      _export("WidgetEventMessage", WidgetEventMessage);
    }
  };
});

'use strict';
System.register("navigator/widgetbehavior/back-button-pressed-behavior.js", ["./widget-behavior", "../events/widget-event-message"], function(_export, _context) {
  var WidgetBehavior,
      WidgetEventMessage,
      BackButtonPressedBehavior;
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
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  return {
    setters: [function(_widgetBehavior) {
      WidgetBehavior = _widgetBehavior.WidgetBehavior;
    }, function(_eventsWidgetEventMessage) {
      WidgetEventMessage = _eventsWidgetEventMessage.WidgetEventMessage;
    }],
    execute: function() {
      _export('BackButtonPressedBehavior', BackButtonPressedBehavior = function(_WidgetBehavior) {
        _inherits(BackButtonPressedBehavior, _WidgetBehavior);
        function BackButtonPressedBehavior(eventAggregator) {
          _classCallCheck(this, BackButtonPressedBehavior);
          var _this = _possibleConstructorReturn(this, _WidgetBehavior.call(this));
          _this._eventAggregator = eventAggregator;
          return _this;
        }
        BackButtonPressedBehavior.prototype.attachToWidget = function attachToWidget(widget) {
          _WidgetBehavior.prototype.attachToWidget.call(this, widget);
          var me = this;
          widget.backButtonPressed = function(navigationStack) {
            var message = new WidgetEventMessage(me.widget.name);
            message.navigationStack = navigationStack;
            me._eventAggregator.publish("widget-back-button-channel", message);
          };
        };
        BackButtonPressedBehavior.prototype.detach = function detach() {
          _WidgetBehavior.prototype.detach.call(this, dashboard);
        };
        return BackButtonPressedBehavior;
      }(WidgetBehavior));
      _export('BackButtonPressedBehavior', BackButtonPressedBehavior);
    }
  };
});

"use strict";
System.register("data/data-holder.js", ["../helpers/string-helper"], function(_export, _context) {
  var StringHelper,
      _createClass,
      DataHolder;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [function(_helpersStringHelper) {
      StringHelper = _helpersStringHelper.StringHelper;
    }],
    execute: function() {
      _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      _export("DataHolder", DataHolder = function() {
        function DataHolder(dataSource) {
          _classCallCheck(this, DataHolder);
          this._dataSource = dataSource;
        }
        DataHolder.prototype.load = function load() {
          return this.dataSource.fill(this).then(function(dh) {
            return dh;
          });
        };
        DataHolder.prototype.cacheKey = function cacheKey() {
          return this._dataSource.name + Math.abs(StringHelper.hashCode((this.query.serverSideFilter ? this.query.serverSideFilter : "") + (this.sort ? this.sort : "") + (this.sortDir ? this.sortDir : "") + (this.take ? this.take : "0") + (this.skip ? this.skip : "0")));
        };
        _createClass(DataHolder, [{
          key: "dataSource",
          get: function get() {
            return this._dataSource;
          }
        }, {
          key: "data",
          get: function get() {
            return this._data;
          },
          set: function set(value) {
            this._data = value;
          }
        }, {
          key: "total",
          get: function get() {
            return this._total;
          },
          set: function set(value) {
            this._total = value;
          }
        }, {
          key: "query",
          get: function get() {
            return this._query;
          },
          set: function set(value) {
            this._query = value;
          }
        }, {
          key: "sort",
          get: function get() {
            return this._sort;
          },
          set: function set(value) {
            this._sort = value;
          }
        }, {
          key: "group",
          get: function get() {
            return this._group;
          },
          set: function set(value) {
            this._group = value;
          }
        }, {
          key: "sortDir",
          get: function get() {
            return this._sort;
          },
          set: function set(value) {
            this._sort = value;
          }
        }, {
          key: "take",
          get: function get() {
            return this._take;
          },
          set: function set(value) {
            this._take = value;
          }
        }, {
          key: "fields",
          get: function get() {
            return this._fields;
          },
          set: function set(value) {
            this._fields = value;
          }
        }, {
          key: "skip",
          get: function get() {
            return this._skip;
          },
          set: function set(value) {
            this._skip = value;
          }
        }]);
        return DataHolder;
      }());
      _export("DataHolder", DataHolder);
    }
  };
});

'use strict';
System.register("data/data-source.js", ["./data-service", "./data-holder", "../helpers/data-helper"], function(_export, _context) {
  var DataService,
      DataHolder,
      DataHelper,
      _createClass,
      Datasource;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [function(_dataService) {
      DataService = _dataService.DataService;
    }, function(_dataHolder) {
      DataHolder = _dataHolder.DataHolder;
    }, function(_helpersDataHelper) {
      DataHelper = _helpersDataHelper.DataHelper;
    }],
    execute: function() {
      _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      _export('Datasource', Datasource = function() {
        function Datasource(datasourceConfiguration) {
          _classCallCheck(this, Datasource);
          this._name = datasourceConfiguration.name;
          this._transport = datasourceConfiguration.transport;
          this._cache = datasourceConfiguration.cache;
        }
        Datasource.prototype.createDataHolder = function createDataHolder() {
          return new DataHolder(this);
        };
        Datasource.prototype.cacheOn = function cacheOn(cacheKey) {
          if (this._cache && this._cache.cacheManager) {
            var storage = this._cache.cacheManager.getStorage();
            return storage.getItem(cacheKey);
          }
        };
        Datasource.prototype.fill = function fill(dataHolder) {
          var _this = this;
          if (!this.transport && !this.transport.readService)
            throw "readService is not configured";
          var storage;
          if (this._cache && this._cache.cacheManager) {
            storage = this._cache.cacheManager.getStorage();
            var cachedDataHolder = storage.getItem(dataHolder.cacheKey());
            if (cachedDataHolder) {
              dataHolder.data = cachedDataHolder.data;
              dataHolder.total = cachedDataHolder.total;
              return new Promise(function(resolve, reject) {
                resolve(dataHolder);
              });
            }
          }
          return this.transport.readService.read({
            fields: dataHolder.fields,
            filter: dataHolder.query.serverSideFilter,
            take: dataHolder.take,
            skip: dataHolder.skip,
            sort: dataHolder.sort,
            sortDir: dataHolder.sortDir
          }).then(function(d) {
            dataHolder.data = d.data;
            dataHolder.total = d.total;
            if (storage)
              storage.setItem(dataHolder.cacheKey(), {
                data: dataHolder.data,
                total: dataHolder.total
              }, _this._cache.cacheTimeSeconds);
            return dataHolder;
          });
        };
        Datasource.prototype.create = function create(entity) {
          if (!this.transport && !this.transport.createService)
            throw "createService is not configured";
          return this.transport.createService.create(entity);
        };
        Datasource.prototype.update = function update(id, entity) {
          if (!this.transport && !this.transport.updateService)
            throw "updateService is not configured";
          return this.transport.updateService.update(id, entity);
        };
        Datasource.prototype.delete = function _delete(id, entity) {
          if (!this.transport && !this.transport.deleteService)
            throw "deleteService is not configured";
          return this.transport.updateService.delete(entity);
        };
        _createClass(Datasource, [{
          key: 'name',
          get: function get() {
            return this._name;
          }
        }, {
          key: 'transport',
          get: function get() {
            return this._transport;
          }
        }, {
          key: 'cacheManager',
          get: function get() {
            return this._cacheManager;
          }
        }]);
        return Datasource;
      }());
      _export('Datasource', Datasource);
    }
  };
});

'use strict';
System.register("data/json-data-service.js", ["../data/data-service", "../helpers/data-helper", "../data/query", "aurelia-framework", "aurelia-fetch-client"], function(_export, _context) {
  var DataService,
      DataHelper,
      Query,
      inject,
      transient,
      HttpClient,
      _createClass,
      _dec,
      _dec2,
      _class,
      JsonDataService;
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
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  return {
    setters: [function(_dataDataService) {
      DataService = _dataDataService.DataService;
    }, function(_helpersDataHelper) {
      DataHelper = _helpersDataHelper.DataHelper;
    }, function(_dataQuery) {
      Query = _dataQuery.Query;
    }, function(_aureliaFramework) {
      inject = _aureliaFramework.inject;
      transient = _aureliaFramework.transient;
    }, function(_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
    }],
    execute: function() {
      _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      _export('JsonDataService', JsonDataService = (_dec = transient(), _dec2 = inject(HttpClient), _dec(_class = _dec2(_class = function(_DataService) {
        _inherits(JsonDataService, _DataService);
        function JsonDataService(http, configuration) {
          _classCallCheck(this, JsonDataService);
          var _this = _possibleConstructorReturn(this, _DataService.call(this));
          http.configure(function(config) {
            config.useStandardConfiguration();
          });
          _this._http = http;
          _this._configuration = configuration;
          return _this;
        }
        JsonDataService.prototype.read = function read(options) {
          var _this2 = this;
          var url = this.configuration.url + (this.configuration.queryMapper ? this.configuration.queryMapper(options) : "");
          return this._http.fetch(this.configuration.url).then(function(response) {
            return response.json();
          }).then(function(jsonData) {
            return {
              data: _this2.configuration.dataMapper ? _this2.configuration.dataMapper(jsonData) : jsonData,
              total: _this2.configuration.totalMapper ? _this2.configuration.totalMapper(jsonData) : jsonData.length
            };
          });
        };
        _createClass(JsonDataService, [{
          key: 'configuration',
          get: function get() {
            return this._configuration;
          }
        }]);
        return JsonDataService;
      }(DataService)) || _class) || _class));
      _export('JsonDataService', JsonDataService);
    }
  };
});

"use strict";
System.register("helpers/data-helper.js", ["lodash"], function(_export, _context) {
  var lodash,
      DataHelper;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [function(_lodash) {
      lodash = _lodash.default;
    }],
    execute: function() {
      _export("DataHelper", DataHelper = function() {
        function DataHelper() {
          _classCallCheck(this, DataHelper);
        }
        DataHelper.getNumericFields = function getNumericFields(fields) {
          return _.filter(fields, function(f) {
            if (f.type == "number" || f.type == "currency")
              return f;
          });
        };
        DataHelper.getStringFields = function getStringFields(fields) {
          return _.filter(fields, {type: "string"});
        };
        DataHelper.getDateFields = function getDateFields(fields) {
          return _.filter(fields, {type: "date"});
        };
        DataHelper.getFieldType = function getFieldType(collection, fieldName) {
          var blankCount = 0;
          var result;
          for (var i = 0; i < collection.length; i++) {
            var val = collection[i][fieldName];
            if (val != undefined) {
              if (DataHelper.isString(val))
                result = "string";
              else if (DataHelper.isNumber(val)) {
                if (DataHelper.isCurrency(collection, fieldName))
                  result = "currency";
                else
                  result = "number";
              } else if (DataHelper.isDate(val))
                result = "date";
              return result;
            } else {
              blankCount++;
            }
            if (blankCount > 300) {
              return undefined;
            }
          }
        };
        DataHelper.deserializeDates = function deserializeDates(jsonArray) {
          for (var r = 0; r < jsonArray.length; r++) {
            var jsonObj = jsonArray[r];
            for (var field in jsonObj) {
              if (jsonObj.hasOwnProperty(field)) {
                var value = jsonObj[field];
                if (value && typeof value == 'string' && value.indexOf('/Date') === 0) {
                  jsonObj[field] = new Date(parseInt(value.substr(6)));
                }
              }
            }
          }
          return jsonArray;
        };
        DataHelper.isCurrency = function isCurrency(collection, fieldName) {
          if (collection.length === 0 || !fieldName)
            return false;
          var largeValues = _.filter(collection, function(x) {
            return Math.abs(x[fieldName]) >= 1000;
          }).length;
          if (largeValues / collection.length > 0.4)
            return true;
          return false;
        };
        DataHelper.isDate = function isDate(value) {
          return new Date(value) !== "Invalid Date" && !isNaN(new Date(value));
        };
        DataHelper.isString = function isString(value) {
          return typeof value === 'string' || value instanceof String;
        };
        DataHelper.isNumber = function isNumber(value) {
          return typeof value === 'number';
        };
        return DataHelper;
      }());
      _export("DataHelper", DataHelper);
    }
  };
});

'use strict';
System.register("data/static-json-data-service.js", ["../data/data-service", "../helpers/data-helper", "../data/query", "aurelia-framework", "aurelia-fetch-client", "./query-expression-evaluator", "lodash"], function(_export, _context) {
  var DataService,
      DataHelper,
      Query,
      inject,
      transient,
      HttpClient,
      QueryExpressionEvaluator,
      lodash,
      _createClass,
      _dec,
      _dec2,
      _class,
      StaticJsonDataService;
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
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  return {
    setters: [function(_dataDataService) {
      DataService = _dataDataService.DataService;
    }, function(_helpersDataHelper) {
      DataHelper = _helpersDataHelper.DataHelper;
    }, function(_dataQuery) {
      Query = _dataQuery.Query;
    }, function(_aureliaFramework) {
      inject = _aureliaFramework.inject;
      transient = _aureliaFramework.transient;
    }, function(_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
    }, function(_queryExpressionEvaluator) {
      QueryExpressionEvaluator = _queryExpressionEvaluator.QueryExpressionEvaluator;
    }, function(_lodash) {
      lodash = _lodash.default;
    }],
    execute: function() {
      _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      _export('StaticJsonDataService', StaticJsonDataService = (_dec = transient(), _dec2 = inject(HttpClient), _dec(_class = _dec2(_class = function(_DataService) {
        _inherits(StaticJsonDataService, _DataService);
        function StaticJsonDataService(http, configuration) {
          _classCallCheck(this, StaticJsonDataService);
          var _this = _possibleConstructorReturn(this, _DataService.call(this));
          http.configure(function(config) {
            config.useStandardConfiguration();
          });
          _this._http = http;
          _this._configuration = configuration;
          return _this;
        }
        StaticJsonDataService.prototype.read = function read(options) {
          var _this2 = this;
          var url = this.configuration.url;
          return this._http.fetch(this.configuration.url).then(function(response) {
            return response.json();
          }).then(function(jsonData) {
            var d = jsonData;
            d = _this2.configuration.dataMapper ? _this2.configuration.dataMapper(d) : d;
            if (options.filter) {
              var evaluator = new QueryExpressionEvaluator();
              d = evaluator.evaluate(d, options.filter);
            }
            var l = options.skip + options.take;
            d = l ? _.slice(d, options.skip, l > d.length ? d.length : l) : d;
            if (options.fields && options.fields.length > 0)
              d = _.map(d, function(item) {
                return _.pick(item, options.fields);
              });
            return {
              data: DataHelper.deserializeDates(d),
              total: _this2.configuration.totalMapper ? _this2.configuration.totalMapper(jsonData) : jsonData.length
            };
          });
        };
        _createClass(StaticJsonDataService, [{
          key: 'configuration',
          get: function get() {
            return this._configuration;
          }
        }]);
        return StaticJsonDataService;
      }(DataService)) || _class) || _class));
      _export('StaticJsonDataService', StaticJsonDataService);
    }
  };
});

'use strict';
System.register("cache/cache-manager.js", ["aurelia-framework"], function(_export, _context) {
  var inject,
      _createClass,
      CacheManager;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [function(_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }],
    execute: function() {
      _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      _export('CacheManager', CacheManager = function() {
        function CacheManager(storage) {
          _classCallCheck(this, CacheManager);
          this._cacheStorage = storage;
          this._cleanInterval = 5000;
        }
        CacheManager.prototype.startCleaner = function startCleaner() {
          if (!this.cleaner) {
            var self = this;
            this.cleaner = window.setInterval(function() {
              self._cacheStorage.removeExpired();
            }, this._cleanInterval);
          }
        };
        CacheManager.prototype.stopCleaner = function stopCleaner() {
          if (this.cleaner)
            window.clearInterval(this.cleaner);
        };
        CacheManager.prototype.getStorage = function getStorage() {
          return this._cacheStorage;
        };
        _createClass(CacheManager, [{
          key: 'cleanInterval',
          get: function get() {
            return this._cleanInterval;
          }
        }]);
        return CacheManager;
      }());
      _export('CacheManager', CacheManager);
    }
  };
});

"use strict";
System.register("cache/cache-storage.js", [], function(_export, _context) {
  var CacheStorage;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      _export("CacheStorage", CacheStorage = function() {
        function CacheStorage() {
          _classCallCheck(this, CacheStorage);
        }
        CacheStorage.prototype.setItem = function setItem(key, value, expiration) {};
        CacheStorage.prototype.getItem = function getItem(key) {};
        CacheStorage.prototype.removeItem = function removeItem(key) {};
        CacheStorage.prototype.removeExpired = function removeExpired() {};
        return CacheStorage;
      }());
      _export("CacheStorage", CacheStorage);
    }
  };
});

'use strict';
System.register("cache/memory-cache-storage.js", ["./cache-storage", "lodash"], function(_export, _context) {
  var CacheStorage,
      lodash,
      MemoryCacheStorage;
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
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  return {
    setters: [function(_cacheStorage) {
      CacheStorage = _cacheStorage.CacheStorage;
    }, function(_lodash) {
      lodash = _lodash.default;
    }],
    execute: function() {
      _export('MemoryCacheStorage', MemoryCacheStorage = function(_CacheStorage) {
        _inherits(MemoryCacheStorage, _CacheStorage);
        function MemoryCacheStorage() {
          _classCallCheck(this, MemoryCacheStorage);
          var _this = _possibleConstructorReturn(this, _CacheStorage.call(this));
          _this._cache = {};
          return _this;
        }
        MemoryCacheStorage.prototype.setItem = function setItem(key, value, seconds) {
          var t = new Date();
          t.setSeconds(t.getSeconds() + seconds);
          var v = _.assign({}, value);
          this._cache[key] = {
            value: v,
            exp: t
          };
        };
        MemoryCacheStorage.prototype.getItem = function getItem(key) {
          if (this._cache[key] && this._cache[key].exp >= Date.now())
            return this._cache[key].value;
        };
        MemoryCacheStorage.prototype.removeItem = function removeItem(key) {
          delete this._cache[key];
        };
        MemoryCacheStorage.prototype.removeExpired = function removeExpired() {
          var self = this;
          _.forOwn(self._cache, function(v, k) {
            if (self._cache[k].exp < Date.now()) {
              self.removeItem(k);
            }
          });
        };
        return MemoryCacheStorage;
      }(CacheStorage));
      _export('MemoryCacheStorage', MemoryCacheStorage);
    }
  };
});

'use strict';
System.register("infrastructure/factory.js", ["aurelia-framework"], function(_export, _context) {
  var resolver,
      _class,
      Factory;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [function(_aureliaFramework) {
      resolver = _aureliaFramework.resolver;
    }],
    execute: function() {
      _export('Factory', Factory = resolver(_class = function() {
        function Factory(Type) {
          _classCallCheck(this, Factory);
          this.Type = Type;
        }
        Factory.prototype.get = function get(container) {
          var _this = this;
          return function() {
            for (var _len = arguments.length,
                rest = Array(_len),
                _key = 0; _key < _len; _key++) {
              rest[_key] = arguments[_key];
            }
            return container.invoke(_this.Type, rest);
          };
        };
        Factory.of = function of(Type) {
          return new Factory(Type);
        };
        return Factory;
      }()) || _class);
      _export('Factory', Factory);
    }
  };
});

'use strict';
System.register("data/repository.js", ["aurelia-framework", "./data-source", "./data-service", "./json-data-service", "./static-json-data-service", "../cache/cache-manager", "../cache/memory-cache-storage", "../infrastructure/factory"], function(_export, _context) {
  var Container,
      inject,
      Datasource,
      DataServiceConfiguration,
      JsonDataService,
      StaticJsonDataService,
      CacheManager,
      MemoryCacheStorage,
      Factory,
      _dec,
      _class,
      Repository;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [function(_aureliaFramework) {
      Container = _aureliaFramework.Container;
      inject = _aureliaFramework.inject;
    }, function(_dataSource) {
      Datasource = _dataSource.Datasource;
    }, function(_dataService) {
      DataServiceConfiguration = _dataService.DataServiceConfiguration;
    }, function(_jsonDataService) {
      JsonDataService = _jsonDataService.JsonDataService;
    }, function(_staticJsonDataService) {
      StaticJsonDataService = _staticJsonDataService.StaticJsonDataService;
    }, function(_cacheCacheManager) {
      CacheManager = _cacheCacheManager.CacheManager;
    }, function(_cacheMemoryCacheStorage) {
      MemoryCacheStorage = _cacheMemoryCacheStorage.MemoryCacheStorage;
    }, function(_infrastructureFactory) {
      Factory = _infrastructureFactory.Factory;
    }],
    execute: function() {
      _export('Repository', Repository = (_dec = inject(Factory.of(StaticJsonDataService), Factory.of(CacheManager), MemoryCacheStorage), _dec(_class = function() {
        function Repository(dataServiceFactory, cacheManagerFactory, memoryCacheStorage) {
          _classCallCheck(this, Repository);
          this._dataServiceFactory = dataServiceFactory;
          this._cacheManagerFactory = cacheManagerFactory;
          this._memoryCacheStorage = memoryCacheStorage;
        }
        Repository.prototype.getDatasource = function getDatasource(name) {
          switch (name.toLowerCase()) {
            case 'customers':
              var config = new DataServiceConfiguration({
                url: '/data/customers.json',
                schema: {fields: [{
                    field: "Id",
                    type: "string"
                  }, {
                    field: "CompanyName",
                    type: "string"
                  }, {
                    field: "ContactName",
                    type: "string"
                  }, {
                    field: "ContactTitle",
                    type: "string"
                  }, {
                    field: "Address",
                    type: "string"
                  }, {
                    field: "City",
                    type: "string"
                  }, {
                    field: "Country",
                    type: "string"
                  }, {
                    field: "PostalCode",
                    type: "string"
                  }, {
                    field: "Phone",
                    type: "string"
                  }, {
                    field: "Fax",
                    type: "string"
                  }]},
                dataMapper: function dataMapper(data) {
                  return data.Results;
                },
                totalMapper: function totalMapper(data) {
                  return data.Results.length;
                }
              });
              var jsonDataService = this._dataServiceFactory(config);
              var cacheManager = this._cacheManagerFactory(this._memoryCacheStorage);
              cacheManager.startCleaner();
              return new Datasource({
                name: name,
                cache: {
                  cacheTimeSeconds: 120,
                  cacheManager: cacheManager
                },
                transport: {readService: jsonDataService}
              });
            case 'orders':
              var config = new DataServiceConfiguration({
                url: '/data/orders.json',
                schema: {fields: [{
                    field: "Id",
                    type: "string"
                  }, {
                    field: "CustomerId",
                    type: "string"
                  }, {
                    field: "EmployeeId",
                    type: "string"
                  }, {
                    field: "OrderDate",
                    type: "date"
                  }, {
                    field: "RequiredDate",
                    type: "date"
                  }, {
                    field: "ShippedDate",
                    type: "date"
                  }, {
                    field: "ShipVia",
                    type: "number"
                  }, {
                    field: "Freight",
                    type: "number"
                  }, {
                    field: "ShipName",
                    type: "string"
                  }, {
                    field: "ShipAddress",
                    type: "string"
                  }, {
                    field: "ShipCity",
                    type: "string"
                  }, {
                    field: "ShipPostalCode",
                    type: "string"
                  }, {
                    field: "ShipCountry",
                    type: "string"
                  }]},
                dataMapper: function dataMapper(data) {
                  return data.Results;
                },
                totalMapper: function totalMapper(data) {
                  return data.Results.length;
                }
              });
              var jsonDataService = this._dataServiceFactory(config);
              var cacheManager = this._cacheManagerFactory(this._memoryCacheStorage);
              cacheManager.startCleaner();
              return new Datasource({
                name: name,
                cache: {
                  cacheTimeSeconds: 120,
                  cacheManager: cacheManager
                },
                transport: {readService: jsonDataService}
              });
          }
        };
        return Repository;
      }()) || _class));
      _export('Repository', Repository);
    }
  };
});

'use strict';
System.register("layout/infrastructure/widget-factory.js", ["aurelia-framework", "layout/widgets/widget", "aurelia-event-aggregator", "navigator/widgetbehavior/back-button-pressed-behavior", "data/repository"], function(_export, _context) {
  var inject,
      Widget,
      EventAggregator,
      BackButtonPressedBehavior,
      Repository,
      _dec,
      _class,
      WidgetFactory;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [function(_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function(_layoutWidgetsWidget) {
      Widget = _layoutWidgetsWidget.Widget;
    }, function(_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function(_navigatorWidgetbehaviorBackButtonPressedBehavior) {
      BackButtonPressedBehavior = _navigatorWidgetbehaviorBackButtonPressedBehavior.BackButtonPressedBehavior;
    }, function(_dataRepository) {
      Repository = _dataRepository.Repository;
    }],
    execute: function() {
      _export('WidgetFactory', WidgetFactory = (_dec = inject(Repository, EventAggregator), _dec(_class = function() {
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

'use strict';
System.register("layout/gridster-dashboard.js", ["./dashboard-base", "jquery", "gridster"], function(_export, _context) {
  var DashboardBase,
      $,
      gridster,
      GridsterDashboard;
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
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  return {
    setters: [function(_dashboardBase) {
      DashboardBase = _dashboardBase.DashboardBase;
    }, function(_jquery) {
      $ = _jquery.default;
    }, function(_gridster) {
      gridster = _gridster.default;
    }],
    execute: function() {
      _export('GridsterDashboard', GridsterDashboard = function(_DashboardBase) {
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
          this.gridster.remove_widget(oldElement, function() {
            this.replaceWidget(oldWidget, newWidget);
            self._timer = window.setTimeout(function() {
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

'use strict';
System.register("layout/dashboard-base.js", ["lodash"], function(_export, _context) {
  var lodash,
      _createClass,
      DashboardBase;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [function(_lodash) {
      lodash = _lodash.default;
    }],
    execute: function() {
      _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      _export('DashboardBase', DashboardBase = function() {
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
          var wl = _.find(this._layoutWidgets, function(w) {
            return w.widget.name === widgetName;
          });
          if (wl)
            return wl.widget;
        };
        DashboardBase.prototype.getWidgetDimensions = function getWidgetDimensions(widget) {
          var lw = _.find(this._layoutWidgets, function(w) {
            return w.widget === widget;
          });
          return {
            size_x: lw.size_x,
            size_y: lw.size_y,
            col: lw.col,
            row: lw.row
          };
        };
        DashboardBase.prototype.removeWidget = function removeWidget(widget) {
          _.remove(this._layoutWidgets, function(w) {
            if (w.widget === widget) {
              widget.dispose();
              return true;
            }
            return false;
          });
        };
        DashboardBase.prototype.replaceWidget = function replaceWidget(oldWidget, newWidget) {
          var lw = _.find(this._layoutWidgets, function(w) {
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
          var lw = _.find(this._layoutWidgets, function(w) {
            return w.widget === widget;
          });
          if (!lw)
            return;
          _.forOwn(dimensions, function(v, k) {
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
            if (this._behaviors.length > 0)
              this._behaviors[0].detach();
            else
              break;
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

'use strict';
System.register("layout/bootstrap-dashboard.js", ["./dashboard-base", "jquery", "lodash", "aurelia-framework"], function(_export, _context) {
  var DashboardBase,
      $,
      lodash,
      computedFrom,
      BootstrapDashboard;
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
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  return {
    setters: [function(_dashboardBase) {
      DashboardBase = _dashboardBase.DashboardBase;
    }, function(_jquery) {
      $ = _jquery.default;
    }, function(_lodash) {
      lodash = _lodash.default;
    }, function(_aureliaFramework) {
      computedFrom = _aureliaFramework.computedFrom;
    }],
    execute: function() {
      _export('BootstrapDashboard', BootstrapDashboard = function(_DashboardBase) {
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
          var sortedWidgets = _.sortBy(layoutWidgets, function(w) {
            return w.row;
          });
          var result = [];
          _.forOwn(_.groupBy(sortedWidgets, 'row'), function(v, k) {
            var sortedByCol = _.sortBy(v, function(w) {
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
            var totalX = _.sumBy(this.layoutWidgets, function(x) {
              if (typeof x.size_x === 'number' && x.row == layoutWidget.row)
                return x.size_x;
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
            var totalHeight = _.sumBy(this.layoutWidgets, function(x) {
              if (typeof x.size_y === 'number' && layoutWidget.row !== x.row)
                return x.size_y * _this2.widgetBaseHeight;
            });
            result = "height: " + ($('#dashboard')[0].clientHeight - totalHeight - 80) + "px;";
          } else {
            if (layoutWidget.size_y > 0)
              result = "height: " + layoutWidget.size_y * this.widgetBaseHeight + "px;";
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

'use strict';
System.register("layout/infrastructure/dashboard-factory.js", ["aurelia-framework", "aurelia-router", "aurelia-event-aggregator", "layout/widgets/grid", "layout/widgets/chart", "layout/widgets/search-box", "layout/widgets/detailed-view", "data/repository", "navigator/dashboardbehavior/manage-navigation-stack-behavior", "navigator/widgetbehavior/data-field-selected-behavior", "navigator/widgetbehavior/data-selected-behavior", "navigator/widgetbehavior/data-activated-behavior", "navigator/widgetbehavior/data-filter-changed-behavior", "navigator/widgetbehavior/data-filter-handle-behavior", "navigator/widgetbehavior/settings-handle-behavior", "navigator/dashboardbehavior/create-widget-behavior", "navigator/dashboardbehavior/replace-widget-behavior", "navigator/dashboardbehavior/change-route-behavior", "layout/infrastructure/widget-factory", "layout/gridster-dashboard", "layout/bootstrap-dashboard", "navigator/periscope-router", "navigator/navigation-history", "state/user-state-storage", "state/state-url-parser", "helpers/string-helper"], function(_export, _context) {
  var inject,
      bindable,
      Router,
      EventAggregator,
      Grid,
      Chart,
      SearchBox,
      DetailedView,
      Repository,
      ManageNavigationStackBehavior,
      DataFieldSelectedBehavior,
      DataSelectedBehavior,
      DataActivatedBehavior,
      DataFilterChangedBehavior,
      DataFilterHandleBehavior,
      SettingsHandleBehavior,
      CreateWidgetBehavior,
      ReplaceWidgetBehavior,
      ChangeRouteBehavior,
      WidgetFactory,
      GridsterDashboard,
      BootstrapDashboard,
      PeriscopeRouter,
      NavigationHistory,
      UserStateStorage,
      StateUrlParser,
      StringHelper,
      _dec,
      _class,
      DashboardFactory;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [function(_aureliaFramework) {
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
    }, function(_aureliaRouter) {
      Router = _aureliaRouter.Router;
    }, function(_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function(_layoutWidgetsGrid) {
      Grid = _layoutWidgetsGrid.Grid;
    }, function(_layoutWidgetsChart) {
      Chart = _layoutWidgetsChart.Chart;
    }, function(_layoutWidgetsSearchBox) {
      SearchBox = _layoutWidgetsSearchBox.SearchBox;
    }, function(_layoutWidgetsDetailedView) {
      DetailedView = _layoutWidgetsDetailedView.DetailedView;
    }, function(_dataRepository) {
      Repository = _dataRepository.Repository;
    }, function(_navigatorDashboardbehaviorManageNavigationStackBehavior) {
      ManageNavigationStackBehavior = _navigatorDashboardbehaviorManageNavigationStackBehavior.ManageNavigationStackBehavior;
    }, function(_navigatorWidgetbehaviorDataFieldSelectedBehavior) {
      DataFieldSelectedBehavior = _navigatorWidgetbehaviorDataFieldSelectedBehavior.DataFieldSelectedBehavior;
    }, function(_navigatorWidgetbehaviorDataSelectedBehavior) {
      DataSelectedBehavior = _navigatorWidgetbehaviorDataSelectedBehavior.DataSelectedBehavior;
    }, function(_navigatorWidgetbehaviorDataActivatedBehavior) {
      DataActivatedBehavior = _navigatorWidgetbehaviorDataActivatedBehavior.DataActivatedBehavior;
    }, function(_navigatorWidgetbehaviorDataFilterChangedBehavior) {
      DataFilterChangedBehavior = _navigatorWidgetbehaviorDataFilterChangedBehavior.DataFilterChangedBehavior;
    }, function(_navigatorWidgetbehaviorDataFilterHandleBehavior) {
      DataFilterHandleBehavior = _navigatorWidgetbehaviorDataFilterHandleBehavior.DataFilterHandleBehavior;
    }, function(_navigatorWidgetbehaviorSettingsHandleBehavior) {
      SettingsHandleBehavior = _navigatorWidgetbehaviorSettingsHandleBehavior.SettingsHandleBehavior;
    }, function(_navigatorDashboardbehaviorCreateWidgetBehavior) {
      CreateWidgetBehavior = _navigatorDashboardbehaviorCreateWidgetBehavior.CreateWidgetBehavior;
    }, function(_navigatorDashboardbehaviorReplaceWidgetBehavior) {
      ReplaceWidgetBehavior = _navigatorDashboardbehaviorReplaceWidgetBehavior.ReplaceWidgetBehavior;
    }, function(_navigatorDashboardbehaviorChangeRouteBehavior) {
      ChangeRouteBehavior = _navigatorDashboardbehaviorChangeRouteBehavior.ChangeRouteBehavior;
    }, function(_layoutInfrastructureWidgetFactory) {
      WidgetFactory = _layoutInfrastructureWidgetFactory.WidgetFactory;
    }, function(_layoutGridsterDashboard) {
      GridsterDashboard = _layoutGridsterDashboard.GridsterDashboard;
    }, function(_layoutBootstrapDashboard) {
      BootstrapDashboard = _layoutBootstrapDashboard.BootstrapDashboard;
    }, function(_navigatorPeriscopeRouter) {
      PeriscopeRouter = _navigatorPeriscopeRouter.PeriscopeRouter;
    }, function(_navigatorNavigationHistory) {
      NavigationHistory = _navigatorNavigationHistory.NavigationHistory;
    }, function(_stateUserStateStorage) {
      UserStateStorage = _stateUserStateStorage.UserStateStorage;
    }, function(_stateStateUrlParser) {
      StateUrlParser = _stateStateUrlParser.StateUrlParser;
    }, function(_helpersStringHelper) {
      StringHelper = _helpersStringHelper.StringHelper;
    }],
    execute: function() {
      _export('DashboardFactory', DashboardFactory = (_dec = inject(Repository, EventAggregator, WidgetFactory, PeriscopeRouter, UserStateStorage, NavigationHistory), _dec(_class = function() {
        function DashboardFactory(repository, eventAggregator, widgetFactory, periscopeRouter, userStateStorage, navigationHistory) {
          _classCallCheck(this, DashboardFactory);
          this._repository = repository;
          this._eventAggregator = eventAggregator;
          this._widgetFactory = widgetFactory;
          this._router = periscopeRouter;
          this._stateStorage = userStateStorage;
          this._navigationHistory = navigationHistory;
        }
        DashboardFactory.prototype.getDashboard = function getDashboard(name, params) {
          var dashboard;
          switch (name.toLowerCase()) {
            case 'customers':
              dashboard = this._getDefaultDashboard(params);
              break;
            case 'orders':
              dashboard = this._getOrdersDashboard(params);
              break;
          }
          if (dashboard) {
            var stackBehavior = new ManageNavigationStackBehavior(this._eventAggregator);
            stackBehavior.attach(dashboard);
          }
          return dashboard;
        };
        DashboardFactory.prototype._getDefaultDashboard = function _getDefaultDashboard(params) {
          var dsCustomers = this._repository.getDatasource("customers");
          var searchBox = this._widgetFactory.createWidget(SearchBox, {
            name: "positionsSearchWidget",
            header: "Positions",
            showHeader: false,
            dataSource: dsCustomers,
            dataFilter: "",
            stateStorage: this._stateStorage,
            behavior: [new DataFilterChangedBehavior("searchBoxChannel", this._eventAggregator)]
          });
          var customersGrid = this._widgetFactory.createWidget(Grid, {
            name: "gridWidget",
            header: "Customers",
            showHeader: true,
            minHeight: 450,
            pageSize: 40,
            stateStorage: this._stateStorage,
            navigatable: true,
            behavior: [new DataFilterHandleBehavior("searchBoxChannel", this._eventAggregator), new DataSelectedBehavior("gridSelectionChannel", this._eventAggregator), new DataActivatedBehavior("gridCommandChannel", this._eventAggregator), new DataFieldSelectedBehavior("gridFieldSelectionChannel", this._eventAggregator)],
            dataSource: dsCustomers,
            dataFilter: "",
            columns: [{
              field: "Id",
              title: "#"
            }, {
              field: "ContactName",
              title: "Contact Name"
            }, {
              field: "ContactTitle",
              title: "Contact Title",
              selectable: true
            }, {
              field: "Country",
              selectable: true
            }, {field: "City"}],
            group: {
              field: "Country",
              dir: "asc"
            }
          });
          var chart = this._widgetFactory.createWidget(Chart, {
            name: "chartWidget",
            header: "Country",
            dataSource: dsCustomers,
            showHeader: true,
            dataFilter: "",
            behavior: [new DataFilterHandleBehavior("searchBoxChannel", this._eventAggregator), new SettingsHandleBehavior("gridFieldSelectionChannel", this._eventAggregator, function(message) {
              return {
                header: message.fieldName,
                categoriesField: message.fieldName
              };
            })],
            seriesDefaults: {
              type: "bar",
              labels: {
                visible: true,
                background: "transparent"
              }
            },
            categoriesField: "Country",
            minHeight: 450
          });
          var dashboard = new BootstrapDashboard("customers");
          dashboard.title = "Customers";
          dashboard.addWidget(searchBox, {
            size_x: 12,
            size_y: 1,
            col: 1,
            row: 1
          });
          dashboard.addWidget(customersGrid, {
            size_x: 6,
            size_y: "*",
            col: 1,
            row: 2
          });
          dashboard.addWidget(chart, {
            size_x: "*",
            size_y: "*",
            col: 7,
            row: 2
          });
          var changeRoureBefavior = new ChangeRouteBehavior({
            chanel: "gridCommandChannel",
            newRoute: {
              title: 'Orders',
              route: '/orders',
              dashboardName: 'orders'
            },
            paramsMapper: function paramsMapper(filterEvent) {
              return StateUrlParser.stateToQuery([{
                key: "orders:ordersSearchWidget",
                value: {
                  stateType: "searchBoxState",
                  stateObject: "CustomerId = '" + filterEvent.activatedData.get("Id").toString() + "'"
                }
              }]);
            },
            eventAggregator: this._eventAggregator,
            router: this._router
          });
          var createWidgetBehavior = new CreateWidgetBehavior('gridSelectionChannel', DetailedView, {
            name: "detailsWidgetCustomers",
            header: "Customer details",
            behavior: [],
            dataSource: dsCustomers,
            showHeader: true
          }, {
            size_x: 3,
            size_y: "*",
            col: 6,
            row: 2
          }, this._eventAggregator, this._widgetFactory, function(message) {
            return "record.Id=='" + message.selectedData.get("Id").toString() + "'";
          });
          changeRoureBefavior.attach(dashboard);
          createWidgetBehavior.attach(dashboard);
          return dashboard;
        };
        DashboardFactory.prototype._getOrdersDashboard = function _getOrdersDashboard(params) {
          var dsOrders = this._repository.getDatasource("orders");
          var ordersGrid = this._widgetFactory.createWidget(Grid, {
            name: "gridWidgetOrders",
            header: "Orders",
            stateStorage: this._stateStorage,
            minHeight: 450,
            pageSize: 40,
            behavior: [new DataFilterHandleBehavior("ordersSearchChannel", this._eventAggregator), new DataActivatedBehavior("order-details", this._eventAggregator)],
            dataSource: dsOrders,
            showHeader: true,
            dataFilter: "",
            columns: [{
              field: "Id",
              title: "#"
            }, {
              field: "CustomerId",
              title: "Customer"
            }, {
              field: "OrderDate",
              title: "Order Date",
              format: "{0: MMM.dd yyyy}"
            }, {field: "Freight"}, {
              field: "ShipName",
              title: "Ship Name"
            }, {
              field: "ShipCountry",
              title: "Ship Country"
            }]
          });
          var searchBoxName = "ordersSearchWidget";
          var searchBox = this._widgetFactory.createWidget(SearchBox, {
            name: searchBoxName,
            header: "Orders",
            showHeader: false,
            dataSource: dsOrders,
            dataFilter: "",
            stateStorage: this._stateStorage,
            behavior: [new DataFilterChangedBehavior("ordersSearchChannel", this._eventAggregator)]
          });
          var dashboard = new BootstrapDashboard("orders");
          dashboard.title = "Orders";
          dashboard.addWidget(searchBox, {
            size_x: 12,
            size_y: 1,
            col: 1,
            row: 1
          });
          dashboard.addWidget(ordersGrid, {
            size_x: 12,
            size_y: '*',
            col: 1,
            row: 2
          });
          var replaceWidgetBehavior = new ReplaceWidgetBehavior('order-details', this._eventAggregator, this._widgetFactory, "gridWidgetOrders", DetailedView, {
            name: "detailsWidgetOrder",
            header: "Order Details",
            behavior: [],
            dataSource: dsOrders,
            showHeader: true
          }, function(message) {
            return "record.Id=='" + message.activatedData.get("Id").toString() + "'";
          });
          replaceWidgetBehavior.attach(dashboard);
          return dashboard;
        };
        return DashboardFactory;
      }()) || _class));
      _export('DashboardFactory', DashboardFactory);
    }
  };
});

'use strict';
System.register("dashboard.js", ["aurelia-framework", "navigator/periscope-router", "layout/infrastructure/dashboard-factory", "aurelia-event-aggregator", "state/user-state-storage"], function(_export, _context) {
  var inject,
      bindable,
      PeriscopeRouter,
      DashboardFactory,
      EventAggregator,
      UserStateStorage,
      _dec,
      _class,
      Index;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [function(_aureliaFramework) {
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
    }, function(_navigatorPeriscopeRouter) {
      PeriscopeRouter = _navigatorPeriscopeRouter.PeriscopeRouter;
    }, function(_layoutInfrastructureDashboardFactory) {
      DashboardFactory = _layoutInfrastructureDashboardFactory.DashboardFactory;
    }, function(_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function(_stateUserStateStorage) {
      UserStateStorage = _stateUserStateStorage.UserStateStorage;
    }],
    execute: function() {
      _export('Index', Index = (_dec = inject(DashboardFactory, PeriscopeRouter, EventAggregator, UserStateStorage), _dec(_class = function() {
        function Index(dashboardFactory, router, eventAggregator, userStateStorage) {
          _classCallCheck(this, Index);
          this._dashboardFactory = dashboardFactory;
          this._router = router;
          this._eventAggregator = eventAggregator;
          this._userStateStorage = userStateStorage;
        }
        Index.prototype.createDashboard = function createDashboard(dashboardName, params) {
          if (!dashboardName || dashboardName === "")
            return;
          var dashboard = this._dashboardFactory.getDashboard(dashboardName, params);
          dashboard.refresh();
          return dashboard;
        };
        Index.prototype.attached = function attached() {
          var _this = this;
          var self = this;
          this._eventAggregator.subscribe('router:navigation:complete', function(payload) {
            if (!payload.instruction.params.dashboard) {
              _this._userStateStorage.clearAll();
              self._router.navigate({
                title: "Customers",
                route: "/customers",
                dashboardName: "customers"
              });
            } else {
              if (self.dashboard)
                self.dashboard.dispose();
              self.dashboard = self.createDashboard(payload.instruction.params.dashboard, payload.instruction.queryParams);
            }
          });
        };
        return Index;
      }()) || _class));
      _export('Index', Index);
    }
  };
});

"use strict";
System.register("data/data-service.js", [], function(_export, _context) {
  var _createClass,
      DataService,
      DataServiceConfiguration;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      _export("DataService", DataService = function() {
        function DataService() {
          _classCallCheck(this, DataService);
        }
        DataService.prototype.read = function read(options) {};
        DataService.prototype.create = function create(entity) {};
        DataService.prototype.update = function update(id, entity) {};
        DataService.prototype.delete = function _delete(id) {};
        return DataService;
      }());
      _export("DataService", DataService);
      _export("DataServiceConfiguration", DataServiceConfiguration = function() {
        function DataServiceConfiguration(options) {
          _classCallCheck(this, DataServiceConfiguration);
          if (options) {
            this._url = options.url;
            this._schema = options.schema ? options.schema : {fields: []};
            this._totalMapper = options.totalMapper;
            this._queryMapper = options.queryMapper;
            this._dataMapper = options.dataMapper;
          }
        }
        _createClass(DataServiceConfiguration, [{
          key: "url",
          get: function get() {
            return this._url;
          }
        }, {
          key: "schema",
          get: function get() {
            return this._schema;
          }
        }, {
          key: "totalMapper",
          get: function get() {
            return this._totalMapper;
          }
        }, {
          key: "queryMapper",
          get: function get() {
            return this._queryMapper;
          }
        }, {
          key: "dataMapper",
          get: function get() {
            return this._dataMapper;
          }
        }]);
        return DataServiceConfiguration;
      }());
      _export("DataServiceConfiguration", DataServiceConfiguration);
    }
  };
});

"use strict";
System.register("data/query.js", [], function(_export, _context) {
  var _createClass,
      Query;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      _export("Query", Query = function() {
        function Query() {
          _classCallCheck(this, Query);
        }
        _createClass(Query, [{
          key: "serverSideFilter",
          get: function get() {
            return this._serverSideFilter;
          },
          set: function set(value) {
            this._serverSideFilter = value;
          }
        }]);
        return Query;
      }());
      _export("Query", Query);
    }
  };
});

"use strict";
System.register("data/query-expression-evaluator.js", [], function(_export, _context) {
  var QueryExpressionEvaluator;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      String.prototype.in = function(array) {
        for (var i = 0; i < array.length; i++) {
          if (array[i] == this)
            return true;
        }
        return false;
      };
      _export("QueryExpressionEvaluator", QueryExpressionEvaluator = function() {
        function QueryExpressionEvaluator() {
          _classCallCheck(this, QueryExpressionEvaluator);
        }
        QueryExpressionEvaluator.prototype.evaluate = function evaluate(data, searchExpression) {
          var res = [];
          if (searchExpression != "") {
            for (var _iterator = data,
                _isArray = Array.isArray(_iterator),
                _i = 0,
                _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
              var _ref;
              if (_isArray) {
                if (_i >= _iterator.length)
                  break;
                _ref = _iterator[_i++];
              } else {
                _i = _iterator.next();
                if (_i.done)
                  break;
                _ref = _i.value;
              }
              var record = _ref;
              if (eval(searchExpression)) {
                res.push(record);
              }
            }
          } else
            res = data;
          return res;
        };
        return QueryExpressionEvaluator;
      }());
      _export("QueryExpressionEvaluator", QueryExpressionEvaluator);
    }
  };
});

'use strict';
System.register("data/local-storage-data-service.js", ["data/data-service", "data/query", "mike183/localDB", "aurelia-framework", "../data/query-expression-evaluator"], function(_export, _context) {
  var DataService,
      JsonFileQuery,
      localDB,
      inject,
      transient,
      QueryExpressionEvaluator,
      _createClass,
      LocalStorageDataService;
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
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  return {
    setters: [function(_dataDataService) {
      DataService = _dataDataService.DataService;
    }, function(_dataQuery) {
      JsonFileQuery = _dataQuery.JsonFileQuery;
    }, function(_mike183LocalDB) {
      localDB = _mike183LocalDB.localDB;
    }, function(_aureliaFramework) {
      inject = _aureliaFramework.inject;
      transient = _aureliaFramework.transient;
    }, function(_dataQueryExpressionEvaluator) {
      QueryExpressionEvaluator = _dataQueryExpressionEvaluator.QueryExpressionEvaluator;
    }],
    execute: function() {
      _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      _export('LocalStorageDataService', LocalStorageDataService = function(_DataService) {
        _inherits(LocalStorageDataService, _DataService);
        function LocalStorageDataService() {
          _classCallCheck(this, LocalStorageDataService);
          var _this = _possibleConstructorReturn(this, _DataService.call(this));
          _this._db = new localdb("periscopeDb");
          return _this;
        }
        LocalStorageDataService.prototype.read = function read(query) {
          var self = this;
          return new Promise(function(resolve, reject) {
            try {
              resolve(self._db.find(self.entityType, query));
            } catch (ex) {
              reject(ex);
            }
          });
        };
        LocalStorageDataService.prototype.create = function create(entity) {
          this._db.insert(this.entityType, entity);
        };
        LocalStorageDataService.prototype.update = function update(id, entity) {
          this._db.updateById(this.entityType, entity, id);
        };
        LocalStorageDataService.prototype.delete = function _delete(id) {
          this._db.removeById(id);
        };
        _createClass(LocalStorageDataService, [{
          key: 'entityType',
          get: function get() {
            return this._entityType;
          },
          set: function set(value) {
            this._entityType = value;
            if (!this._db.tableExists(value))
              this._db.createTable(value);
          }
        }]);
        return LocalStorageDataService;
      }(DataService));
      _export('LocalStorageDataService', LocalStorageDataService);
    }
  };
});

'use strict';
System.register("helpers/converters/date-format.js", ["moment"], function(_export, _context) {
  var moment,
      DateFormatValueConverter;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [function(_moment) {
      moment = _moment.default;
    }],
    execute: function() {
      _export('DateFormatValueConverter', DateFormatValueConverter = function() {
        function DateFormatValueConverter() {
          _classCallCheck(this, DateFormatValueConverter);
        }
        DateFormatValueConverter.prototype.toView = function toView(value, format) {
          return moment(value).format(format);
        };
        return DateFormatValueConverter;
      }());
      _export('DateFormatValueConverter', DateFormatValueConverter);
    }
  };
});

'use strict';
System.register("helpers/guid-helper.js", [], function(_export, _context) {
  var GuidHelper;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      _export('GuidHelper', GuidHelper = function() {
        function GuidHelper() {
          _classCallCheck(this, GuidHelper);
        }
        GuidHelper.guid = function guid() {
          return GuidHelper._s4() + GuidHelper._s4() + '-' + GuidHelper._s4() + '-' + GuidHelper._s4() + '-' + GuidHelper._s4() + '-' + GuidHelper._s4() + GuidHelper._s4() + GuidHelper._s4();
        };
        GuidHelper._s4 = function _s4() {
          return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        };
        return GuidHelper;
      }());
      _export('GuidHelper', GuidHelper);
    }
  };
});

(function() {
var define = System.amdDefine;
define("layout/bootstrap-dashboard.html!github:systemjs/plugin-text@0.0.3.js", [], function() {
  return "<template>\n\n    <div class=\"row\" repeat.for=\"r of layoutStructure\">\n      <template repeat.for=\"w of r.widgets\">\n        <div css=\"${$parent.$parent.getColHeight(w)}\" class=\"${$parent.$parent.getColWidth(w)} widget-container\">\n          <compose  view='layout/widgets/widget.html' view-model.bind='w.widget'></compose>\n        </div>\n      </template>\n    </div>\n\n\n  <div id=\"basicModal\" class=\"modal fade\" ref='popWidgetHost'>\n    <div class=\"modal-dialog\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" click.trigger=\"hide()\">&times;</button>\n        </div>\n        <div class=\"modal-body widgets-panel-modal\">\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n";
});

})();
(function() {
var define = System.amdDefine;
define("layout/controls/checkbox-list.html!github:systemjs/plugin-text@0.0.3.js", [], function() {
  return "<template>\n      <form class=\"form-inline\">\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" id=\"filter\" placeholder=\"Filter\" value.bind=\"filterExpression\">\n        </div>\n      </form>\n      <br>\n      <template repeat.for=\"item of filteredItems\">\n          <div class=\"checkbox\">\n            <label>\n              <input type=\"checkbox\" checked.bind=\"item[$parent.checkboxField]\" click.trigger=\"clicked(item)\"> ${item[$parent.captionField]}\n            </label>\n          </div>\n      </template>\n</template>\n";
});

})();
'use strict';
System.register("layout/controls/checkbox-list.js", ["aurelia-framework", "lodash"], function(_export, _context) {
  var customElement,
      bindable,
      inject,
      computedFrom,
      lodash,
      _createClass,
      _desc,
      _value,
      _class,
      _descriptor,
      _descriptor2,
      _descriptor3,
      _descriptor4,
      CheckboxList;
  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor)
      return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function(key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;
    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }
    desc = decorators.slice().reverse().reduce(function(desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);
    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }
    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }
    return desc;
  }
  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }
  return {
    setters: [function(_aureliaFramework) {
      customElement = _aureliaFramework.customElement;
      bindable = _aureliaFramework.bindable;
      inject = _aureliaFramework.inject;
      computedFrom = _aureliaFramework.computedFrom;
    }, function(_lodash) {
      lodash = _lodash.default;
    }],
    execute: function() {
      _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      _export('CheckboxList', CheckboxList = (_class = function() {
        function CheckboxList() {
          _classCallCheck(this, CheckboxList);
          _initDefineProp(this, 'dataSource', _descriptor, this);
          _initDefineProp(this, 'captionField', _descriptor2, this);
          _initDefineProp(this, 'checkboxField', _descriptor3, this);
          _initDefineProp(this, 'selectionChanged', _descriptor4, this);
        }
        CheckboxList.prototype.clicked = function clicked(item) {
          if (this.selectionChanged) {
            var obj = {};
            obj[this.captionField] = item[this.captionField];
            obj[this.checkboxField] = item[this.checkboxField];
            this.selectionChanged(obj);
          }
          return true;
        };
        _createClass(CheckboxList, [{
          key: 'filterExpression',
          get: function get() {
            return this._filterExpression;
          },
          set: function set(value) {
            this._filterExpression = value;
          }
        }, {
          key: 'filteredItems',
          get: function get() {
            var _this = this;
            if (this.filterExpression)
              return _.filter(this.dataSource, function(x) {
                return x[_this.captionField].toLowerCase().indexOf(_this._filterExpression.toLowerCase()) == 0;
              });
            return this.dataSource;
          }
        }]);
        return CheckboxList;
      }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'dataSource', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'captionField', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'checkboxField', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'selectionChanged', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class));
      _export('CheckboxList', CheckboxList);
    }
  };
});

(function() {
var define = System.amdDefine;
define("layout/controls/list.html!github:systemjs/plugin-text@0.0.3.js", [], function() {
  return "<template>\n  <div class=\"well list-view\" show.bind=\"visible\">\n    <form class=\"form-inline\">\n      <div ref=\"listViewContainer\" class=\"list-container\">\n        <h4>${title}</h4>\n        <ul class=\"text-md\">\n          <li repeat.for=\"item of items\" class=\"list-item\">\n            <button class=\"btn btn-link\" type=\"button\" click.trigger=\"$parent.select($index)\" innerHTML.bind=\"$parent.format(item.value)\"></button>\n          </li>\n        </ul>\n      </div>\n    </form>\n  </div>\n</template>\n";
});

})();
'use strict';
System.register("layout/controls/list.js", ["aurelia-framework", "jquery"], function(_export, _context) {
  var customElement,
      bindable,
      bindingMode,
      inject,
      $,
      _dec,
      _dec2,
      _dec3,
      _desc,
      _value,
      _class,
      _descriptor,
      _descriptor2,
      _descriptor3,
      _descriptor4,
      _descriptor5,
      _descriptor6,
      List;
  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor)
      return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function(key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;
    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }
    desc = decorators.slice().reverse().reduce(function(desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);
    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }
    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }
    return desc;
  }
  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }
  return {
    setters: [function(_aureliaFramework) {
      customElement = _aureliaFramework.customElement;
      bindable = _aureliaFramework.bindable;
      bindingMode = _aureliaFramework.bindingMode;
      inject = _aureliaFramework.inject;
    }, function(_jquery) {
      $ = _jquery.default;
    }],
    execute: function() {
      _export('List', List = (_dec = bindable({defaultBindingMode: bindingMode.twoWay}), _dec2 = bindable({defaultBindingMode: bindingMode.twoWay}), _dec3 = bindable({defaultBindingMode: bindingMode.twoWay}), (_class = function() {
        function List() {
          _classCallCheck(this, List);
          _initDefineProp(this, 'items', _descriptor, this);
          _initDefineProp(this, 'title', _descriptor2, this);
          _initDefineProp(this, 'highlightText', _descriptor3, this);
          _initDefineProp(this, 'visible', _descriptor4, this);
          _initDefineProp(this, 'selectedItem', _descriptor5, this);
          _initDefineProp(this, 'focusedItemIndex', _descriptor6, this);
        }
        List.prototype.constrictor = function constrictor() {};
        List.prototype.attached = function attached(params) {
          var self = this;
          $("body").on("click", function(args) {
            if ($(args.target).parents(".list-view").length > 0 || $(args.target).hasClass("list-view"))
              return;
            self.visible = false;
          });
          if ($('.list-container').length === 0)
            return;
          $('.list-container')[0].addEventListener("keydown", function(e) {
            var container = $(this);
            if (container.find('li').length === 0)
              return;
            switch (e.keyCode) {
              case 38:
                if (container.find('li').filter('.focused-item').length === 0) {
                  self.focusedItemIndex = container.find('li').length - 1;
                } else {
                  var previousIndex = self.focusedItemIndex - 1;
                  if (previousIndex < 0)
                    previousIndex = container.find('li').length - 1;
                  self.focusedItemIndex = previousIndex;
                }
                break;
              case 40:
                if (container.find('li').filter('.focused-item').length === 0) {
                  self.focusedItemIndex = 0;
                } else {
                  var nextIndex = self.focusedItemIndex + 1;
                  if (nextIndex >= container.find('li').length)
                    nextIndex = 0;
                  self.focusedItemIndex = nextIndex;
                }
                break;
              case 13:
                if (self.focusedItemIndex >= 0) {
                  self.select(self.focusedItemIndex);
                }
                break;
              case 27:
                self.visible = false;
                break;
            }
            e.preventDefault();
            e.stopPropagation();
          });
        };
        List.prototype.format = function format(itemText) {
          if (this.highlightText !== '' && itemText && itemText.toLowerCase().indexOf(this.highlightText.toLowerCase()) >= 0) {
            var regex = new RegExp(this.highlightText, 'i');
            return itemText.replace(regex, '<b>$&</b>');
          }
          return itemText;
        };
        List.prototype.select = function select(itemIndex) {
          this.selectedItem = this.items[itemIndex];
          this.focusedItemIndex = -1;
        };
        List.prototype.focusedItemIndexChanged = function focusedItemIndexChanged(newValue, oldValue) {
          if (this.focusedItemIndex != undefined) {
            if (this.focusedItemIndex >= 0)
              this.setFocus(this.focusedItemIndex);
            else
              this.clearFocus();
          }
        };
        List.prototype.setFocus = function setFocus(itemIndex) {
          var container = $(this.listViewContainer);
          if (container.find('li').length === 0)
            return;
          container.find('li').filter('.focused-item').removeClass("focused-item");
          $(container.find('li')[itemIndex]).addClass("focused-item");
          $(container.find('li')[itemIndex]).find('button').first().focus();
        };
        List.prototype.clearFocus = function clearFocus() {
          var container = $(this.listViewContainer);
          if (container.find('li').filter('.focused-item').length === 0)
            return;
          container.find('li').filter('.focused-item').first().find('button').first().blur();
          container.find('li').filter('.focused-item').removeClass("focused-item");
        };
        return List;
      }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'items', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'title', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return "";
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'highlightText', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return "";
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'visible', [_dec], {
        enumerable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'selectedItem', [_dec2], {
        enumerable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'focusedItemIndex', [_dec3], {
        enumerable: true,
        initializer: null
      })), _class)));
      _export('List', List);
    }
  };
});

(function() {
var define = System.amdDefine;
define("layout/gridster-dashboard.html!github:systemjs/plugin-text@0.0.3.js", [], function() {
  return "<template>\n  <div  ref=\"layoutContainer\">\n    <ul class=\"gridster\">\n      <template repeat.for=\"lw of layoutWidgets\">\n        <li class=\"gridster-item col-md-12\" data-row=\"${lw.row}\" data-col=\"${lw.col}\" data-sizex=\"${lw.size_x}\" data-sizey=\"${lw.size_y}\" data-name=\"${lw.widget.name}\">\n          <compose  view='layout/widgets/widget.html' view-model.bind='lw.widget'></compose>\n        </li>\n      </template>\n    </ul>\n  </div>\n  <div id=\"basicModal\" class=\"modal fade\" ref='popWidgetHost'>\n    <div class=\"modal-dialog\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" click.trigger=\"hide()\">&times;</button>\n        </div>\n        <div class=\"modal-body widgets-panel-modal\">\n          <!--<div repeat.for='widget of widgets'>\n            <compose  view='layout/widgets/widget.html' view-model.bind='widget'></compose>\n          </div>-->\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n";
});

})();
(function() {
var define = System.amdDefine;
define("layout/partials/app-footer.html!github:systemjs/plugin-text@0.0.3.js", [], function() {
  return "<template>\n  <require from=\"helpers/converters/date-format\"></require>\n  <require from='./system-info'></require>\n  <footer class=\"footer\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <p class=\"pull-left\">&copy; ${currentDate | dateFormat:'YYYY'} Periscope</p>\n        </div>\n        <div class=\"col-md-6 text-right\">\n            <span class=\"footer-meta\">\n              <system-info></system-info>\n            </span>\n        </div>\n      </div>\n    </div>\n  </footer>\n</template>\n";
});

})();
"use strict";
System.register("layout/partials/app-footer.js", [], function(_export, _context) {
  var AppFooter;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      _export("AppFooter", AppFooter = function AppFooter() {
        _classCallCheck(this, AppFooter);
        this.currentDate = new Date();
      });
      _export("AppFooter", AppFooter);
    }
  };
});

(function() {
var define = System.amdDefine;
define("layout/partials/breadcrumbs.html!github:systemjs/plugin-text@0.0.3.js", [], function() {
  return "<template>\n  <ol class=\"breadcrumb\" show.bind=\"history.length>1\">\n    <li repeat.for=\"item of history\">\n      <template if.bind=\"!$last\">\n        <button class=\"btn btn-link\" click.trigger=\"navigate(item)\">${item.title}</button>\n      </template>\n      <template if.bind=\"$last\">\n        <button class=\"btn btn-link\">${item.title}</button>\n      </template>\n    </li>\n  </ol>\n</template>\n";
});

})();
'use strict';
System.register("layout/partials/breadcrumbs.js", ["jquery", "aurelia-framework", "navigator/periscope-router", "navigator/navigation-history", "state/user-state-storage"], function(_export, _context) {
  var $,
      computedFrom,
      inject,
      bindable,
      PeriscopeRouter,
      NavigationHistory,
      UserStateStorage,
      _createClass,
      _dec,
      _dec2,
      _class,
      _desc,
      _value,
      _class2,
      Breadcrumbs;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function(key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;
    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }
    desc = decorators.slice().reverse().reduce(function(desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);
    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }
    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }
    return desc;
  }
  return {
    setters: [function(_jquery) {
      $ = _jquery.default;
    }, function(_aureliaFramework) {
      computedFrom = _aureliaFramework.computedFrom;
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
    }, function(_navigatorPeriscopeRouter) {
      PeriscopeRouter = _navigatorPeriscopeRouter.PeriscopeRouter;
    }, function(_navigatorNavigationHistory) {
      NavigationHistory = _navigatorNavigationHistory.NavigationHistory;
    }, function(_stateUserStateStorage) {
      UserStateStorage = _stateUserStateStorage.UserStateStorage;
    }],
    execute: function() {
      _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      _export('Breadcrumbs', Breadcrumbs = (_dec = inject(PeriscopeRouter, NavigationHistory, UserStateStorage), _dec2 = computedFrom('currentRoute'), _dec(_class = (_class2 = function() {
        function Breadcrumbs(router, navigationHistory, userStateStorage) {
          _classCallCheck(this, Breadcrumbs);
          this._router = router;
          this._navigationHistory = navigationHistory;
          this._userStateStorage = userStateStorage;
        }
        Breadcrumbs.prototype.navigate = function navigate(routeItem) {
          this._router.navigate(routeItem);
        };
        _createClass(Breadcrumbs, [{
          key: 'currentRoute',
          get: function get() {
            if (this._router.currentRouteItem)
              return this._router.currentRouteItem.route;
            return "";
          }
        }, {
          key: 'history',
          get: function get() {
            var nH = this._navigationHistory.items;
            var result = [];
            for (var i = 0; i < nH.length; i++) {
              result.push(nH[i]);
              if (nH[i].dashboardName === this._router.currentRouteItem.dashboardName)
                break;
            }
            return result;
          }
        }]);
        return Breadcrumbs;
      }(), (_applyDecoratedDescriptor(_class2.prototype, 'history', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'history'), _class2.prototype)), _class2)) || _class));
      _export('Breadcrumbs', Breadcrumbs);
    }
  };
});

(function() {
var define = System.amdDefine;
define("layout/partials/dashboards-list.html!github:systemjs/plugin-text@0.0.3.js", [], function() {
  return "<template>\n  &nbsp;&nbsp;<button class=\"btn btn-link\" click.trigger=\"navigate({url: '/customers',name:'customers', title:'Customers'})\">Customers</button>\n  <br/>\n  &nbsp;&nbsp;<button class=\"btn btn-link\" click.trigger=\"navigate({url: '/orders',name:'orders', title:'Orders'})\">Orders</button>\n</template>\n";
});

})();
'use strict';
System.register("layout/partials/dashboards-list.js", ["aurelia-framework", "navigator/periscope-router"], function(_export, _context) {
  var inject,
      bindable,
      computedFrom,
      PeriscopeRouter,
      _dec,
      _class,
      DashboardsList;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [function(_aureliaFramework) {
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
      computedFrom = _aureliaFramework.computedFrom;
    }, function(_navigatorPeriscopeRouter) {
      PeriscopeRouter = _navigatorPeriscopeRouter.PeriscopeRouter;
    }],
    execute: function() {
      _export('DashboardsList', DashboardsList = (_dec = inject(PeriscopeRouter), _dec(_class = function() {
        function DashboardsList(periscopeRouter) {
          _classCallCheck(this, DashboardsList);
          this._periscopeRouter = periscopeRouter;
        }
        DashboardsList.prototype.navigate = function navigate(dashboard) {
          this._periscopeRouter.navigate({
            route: dashboard.url,
            title: dashboard.title,
            dashboardName: dashboard.name
          });
        };
        return DashboardsList;
      }()) || _class));
      _export('DashboardsList', DashboardsList);
    }
  };
});

(function() {
var define = System.amdDefine;
define("layout/partials/history.html!github:systemjs/plugin-text@0.0.3.js", [], function() {
  return "<template>\n  <require from=\"helpers/converters/date-format\"></require>\n  <div show.bind=\"items.length==0\">\n    no data found\n  </div>\n  <template repeat.for=\"item of items\">\n    <div class=\"feed-item feed-item-idea\">\n      <div class=\"${$parent.isCurrent(item)? 'feed-icon bg-secondary' : 'feed-icon'}\">\n        <div class=\"x-small\">\n          ${item.dateTime  | dateFormat:'hh:mm'}\n        </div>\n      </div>\n\n      <div class=\"feed-subject\">\n        <p>\n          <button class=\"btn btn-link\" click.trigger=\"navigate(item)\">${item.title}</button>\n        </p>\n      </div> <!-- /.feed-subject -->\n\n      <div class=\"feed-content\">\n        <template repeat.for=\"stateItem of item.state\">\n            <compose\n              view-model.bind=\"getStateView(stateItem)\">\n            </compose>\n        </template>\n      </div> <!-- /.feed-content -->\n    </div>\n  </template>\n</template>\n";
});

})();
"use strict";
System.register("state/state-discriminator.js", ["lodash"], function(_export, _context) {
  var lodash,
      StateDiscriminator;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [function(_lodash) {
      lodash = _lodash.default;
    }],
    execute: function() {
      _export("StateDiscriminator", StateDiscriminator = function() {
        function StateDiscriminator() {
          _classCallCheck(this, StateDiscriminator);
        }
        StateDiscriminator.discriminate = function discriminate(widgetStates) {
          var result = [];
          for (var _iterator = widgetStates,
              _isArray = Array.isArray(_iterator),
              _i = 0,
              _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
            var _ref;
            if (_isArray) {
              if (_i >= _iterator.length)
                break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done)
                break;
              _ref = _i.value;
            }
            var ws = _ref;
            if (ws.value.stateType === "searchBoxState")
              result.push(ws);
          }
          return result;
        };
        return StateDiscriminator;
      }());
      _export("StateDiscriminator", StateDiscriminator);
    }
  };
});

"use strict";
System.register("state/state-url-parser.js", ["helpers/url-helper"], function(_export, _context) {
  var UrlHelper,
      StateUrlParser;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [function(_helpersUrlHelper) {
      UrlHelper = _helpersUrlHelper.UrlHelper;
    }],
    execute: function() {
      _export("StateUrlParser", StateUrlParser = function() {
        function StateUrlParser() {
          _classCallCheck(this, StateUrlParser);
        }
        StateUrlParser.stateToQuery = function stateToQuery(widgetStates) {
          var params = [];
          for (var _iterator = widgetStates,
              _isArray = Array.isArray(_iterator),
              _i = 0,
              _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
            var _ref;
            if (_isArray) {
              if (_i >= _iterator.length)
                break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done)
                break;
              _ref = _i.value;
            }
            var widgetState = _ref;
            params.push({
              "sk": widgetState.key,
              "sv": widgetState.value
            });
          }
          return params.length > 0 ? "?q=" + UrlHelper.objectToQuery(params) : "";
        };
        StateUrlParser.queryToState = function queryToState(url) {
          var result = [];
          var q = UrlHelper.getParameterByName("q", url);
          if (q) {
            var widgetStates = UrlHelper.queryToObject(q);
            for (var _iterator2 = widgetStates,
                _isArray2 = Array.isArray(_iterator2),
                _i2 = 0,
                _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ; ) {
              var _ref2;
              if (_isArray2) {
                if (_i2 >= _iterator2.length)
                  break;
                _ref2 = _iterator2[_i2++];
              } else {
                _i2 = _iterator2.next();
                if (_i2.done)
                  break;
                _ref2 = _i2.value;
              }
              var ws = _ref2;
              result.push({
                "key": ws.sk,
                "value": ws.sv
              });
            }
          }
          return result;
        };
        return StateUrlParser;
      }());
      _export("StateUrlParser", StateUrlParser);
    }
  };
});

'use strict';
System.register("helpers/string-helper.js", [], function(_export, _context) {
  var StringHelper;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      _export('StringHelper', StringHelper = function() {
        function StringHelper() {
          _classCallCheck(this, StringHelper);
        }
        StringHelper.compare = function compare(string1, string2) {
          return string1.toUpperCase() === string2.toUpperCase();
        };
        StringHelper.replaceAll = function replaceAll(str, find, replace) {
          return str.replace(new RegExp(find, 'g'), replace);
        };
        StringHelper.hashCode = function hashCode(str) {
          var hash = 0;
          if (str.length == 0)
            return hash;
          for (var i = 0; i < str.length; i++) {
            var char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash;
          }
          return hash;
        };
        StringHelper.getEditDistance = function getEditDistance(a, b) {
          if (a.length == 0)
            return b.length;
          if (b.length == 0)
            return a.length;
          var matrix = [];
          var i;
          for (i = 0; i <= b.length; i++) {
            matrix[i] = [i];
          }
          var j;
          for (j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
          }
          for (i = 1; i <= b.length; i++) {
            for (j = 1; j <= a.length; j++) {
              if (b.charAt(i - 1) == a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
              } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
              }
            }
          }
          return matrix[b.length][a.length];
        };
        StringHelper.getPreviousWord = function getPreviousWord(str, position, separators) {
          var str = str.substring(0, position);
          var lastSeparatorIndex = 0;
          for (var i = 0; i < separators.length; i++) {
            if (str.lastIndexOf(separators[i]) > lastSeparatorIndex)
              lastSeparatorIndex = str.lastIndexOf(separators[i]);
          }
          if (lastSeparatorIndex == str.length)
            lastSeparatorIndex = 0;
          if (lastSeparatorIndex > 0 && lastSeparatorIndex < str.length)
            lastSeparatorIndex++;
          return str.substring(lastSeparatorIndex, str.length);
        };
        StringHelper.getNextWord = function getNextWord(str, position, separators) {
          var str = str.substring(position, str.length);
          var firstSeparatorIndex = str.length;
          for (var i = 0; i < separators.length; i++) {
            if (str.indexOf(separators[i]) < firstSeparatorIndex && str.indexOf(separators[i]) >= 0)
              firstSeparatorIndex = str.indexOf(separators[i]);
          }
          return str.substring(0, firstSeparatorIndex);
        };
        return StringHelper;
      }());
      _export('StringHelper', StringHelper);
    }
  };
});

"use strict";
System.register("helpers/url-helper.js", [], function(_export, _context) {
  var UrlHelper;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      _export("UrlHelper", UrlHelper = function() {
        function UrlHelper() {
          _classCallCheck(this, UrlHelper);
        }
        UrlHelper.objectToQuery = function objectToQuery(ar) {
          return encodeURIComponent(JSON.stringify(ar));
        };
        UrlHelper.queryToObject = function queryToObject(queryParam) {
          return JSON.parse(queryParam);
        };
        UrlHelper.getParameterByName = function getParameterByName(name, url) {
          name = name.replace(/[\[\]]/g, "\\$&");
          var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
              results = regex.exec(url);
          if (!results)
            return null;
          if (!results[2])
            return '';
          return decodeURIComponent(results[2].replace(/\+/g, " "));
        };
        return UrlHelper;
      }());
      _export("UrlHelper", UrlHelper);
    }
  };
});

'use strict';
System.register("navigator/periscope-router.js", ["navigator/navigation-history", "aurelia-framework", "aurelia-event-aggregator", "state/user-state-storage", "state/state-discriminator", "state/state-url-parser", "helpers/string-helper", "helpers/url-helper", "aurelia-router", "lodash"], function(_export, _context) {
  var NavigationHistory,
      inject,
      EventAggregator,
      UserStateStorage,
      StateDiscriminator,
      StateUrlParser,
      StringHelper,
      UrlHelper,
      Router,
      lodash,
      _createClass,
      _dec,
      _class,
      PeriscopeRouter;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [function(_navigatorNavigationHistory) {
      NavigationHistory = _navigatorNavigationHistory.NavigationHistory;
    }, function(_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function(_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function(_stateUserStateStorage) {
      UserStateStorage = _stateUserStateStorage.UserStateStorage;
    }, function(_stateStateDiscriminator) {
      StateDiscriminator = _stateStateDiscriminator.StateDiscriminator;
    }, function(_stateStateUrlParser) {
      StateUrlParser = _stateStateUrlParser.StateUrlParser;
    }, function(_helpersStringHelper) {
      StringHelper = _helpersStringHelper.StringHelper;
    }, function(_helpersUrlHelper) {
      UrlHelper = _helpersUrlHelper.UrlHelper;
    }, function(_aureliaRouter) {
      Router = _aureliaRouter.Router;
    }, function(_lodash) {
      lodash = _lodash.default;
    }],
    execute: function() {
      _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      _export('PeriscopeRouter', PeriscopeRouter = (_dec = inject(Router, EventAggregator, UserStateStorage, NavigationHistory, StateUrlParser), _dec(_class = function() {
        function PeriscopeRouter(aureliaRouter, eventAggregator, userStateStorage, navigationHistory) {
          _classCallCheck(this, PeriscopeRouter);
          this._aureliaRouter = aureliaRouter;
          this._navigationHistory = navigationHistory;
          this._userStateStorage = userStateStorage;
          this._eventAggregator = eventAggregator;
        }
        PeriscopeRouter.prototype.navigate = function navigate(routeItem) {
          if (this.currentRouteItem) {
            var currentWidgetsState = StateDiscriminator.discriminate(this._userStateStorage.getAll(this.currentRouteItem.dashboardName));
            var url = "/" + this.currentRouteItem.dashboardName + StateUrlParser.stateToQuery(currentWidgetsState);
            if (_.filter(this._navigationHistory.items, function(i) {
              return StringHelper.compare(i.url, url);
            }).length === 0) {
              this._navigationHistory.add(url, this.currentRouteItem.title, this.currentRouteItem.dashboardName, currentWidgetsState, new Date());
            } else if (!StringHelper.compare(url, this.currentRouteItem.route)) {
              this._navigationHistory.update(url, new Date());
            }
          }
          var routeWidgetsState = StateUrlParser.queryToState(routeItem.route);
          var storageWidgetsState = StateDiscriminator.discriminate(this._userStateStorage.getAll(routeItem.dashboardName));
          for (var _iterator = storageWidgetsState,
              _isArray = Array.isArray(_iterator),
              _i = 0,
              _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
            var _ref;
            if (_isArray) {
              if (_i >= _iterator.length)
                break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done)
                break;
              _ref = _i.value;
            }
            var oldSt = _ref;
            this._userStateStorage.remove(oldSt.key);
          }
          for (var _iterator2 = routeWidgetsState,
              _isArray2 = Array.isArray(_iterator2),
              _i2 = 0,
              _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ; ) {
            var _ref2;
            if (_isArray2) {
              if (_i2 >= _iterator2.length)
                break;
              _ref2 = _iterator2[_i2++];
            } else {
              _i2 = _iterator2.next();
              if (_i2.done)
                break;
              _ref2 = _i2.value;
            }
            var newSt = _ref2;
            this._userStateStorage.set(newSt.key, newSt.value);
          }
          if (_.filter(this._navigationHistory.items, function(i) {
            return StringHelper.compare(i.url, routeItem.route);
          }).length === 0) {
            this._navigationHistory.add(routeItem.route, routeItem.title, routeItem.dashboardName, this._userStateStorage.getAll(routeItem.dashboardName), new Date());
          }
          this.currentRouteItem = routeItem;
          this._aureliaRouter.navigate(routeItem.route);
        };
        _createClass(PeriscopeRouter, [{
          key: 'currentRouteItem',
          get: function get() {
            return this._currentRoute;
          },
          set: function set(value) {
            this._currentRoute = value;
          }
        }]);
        return PeriscopeRouter;
      }()) || _class));
      _export('PeriscopeRouter', PeriscopeRouter);
    }
  };
});

"use strict";
System.register("navigator/navigation-history.js", [], function(_export, _context) {
  var _createClass,
      NavigationHistory;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      _export("NavigationHistory", NavigationHistory = function() {
        function NavigationHistory() {
          _classCallCheck(this, NavigationHistory);
          this._history = [];
        }
        NavigationHistory.prototype.add = function add(url, title, dashboard, state, dateTime) {
          this._history.push({
            url: url,
            title: title,
            dashboard: dashboard,
            state: state,
            dateTime: dateTime
          });
        };
        NavigationHistory.prototype.update = function update(url, dateTime) {
          for (var _iterator = this._history,
              _isArray = Array.isArray(_iterator),
              _i = 0,
              _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
            var _ref;
            if (_isArray) {
              if (_i >= _iterator.length)
                break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done)
                break;
              _ref = _i.value;
            }
            var h = _ref;
            if (h.url === url) {
              h.dateTime = dateTime;
              break;
            }
          }
        };
        NavigationHistory.prototype.delete = function _delete(url) {
          for (var _iterator2 = this._history,
              _isArray2 = Array.isArray(_iterator2),
              _i2 = 0,
              _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ; ) {
            var _ref2;
            if (_isArray2) {
              if (_i2 >= _iterator2.length)
                break;
              _ref2 = _iterator2[_i2++];
            } else {
              _i2 = _iterator2.next();
              if (_i2.done)
                break;
              _ref2 = _i2.value;
            }
            var i = _ref2;
            if (i.url === url) {
              this._history.splice(i, 1);
              break;
            }
          }
        };
        NavigationHistory.prototype.deleteAll = function deleteAll() {
          this._history = [];
        };
        NavigationHistory.prototype.trimRight = function trimRight(url) {
          for (var i = this._history.length - 1; i >= 0; i--) {
            if (this._history[i].url === url) {
              this._history.splice(i + 1);
              return;
            }
          }
        };
        NavigationHistory.prototype.exists = function exists(url) {
          for (var _iterator3 = this._history,
              _isArray3 = Array.isArray(_iterator3),
              _i3 = 0,
              _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ; ) {
            var _ref3;
            if (_isArray3) {
              if (_i3 >= _iterator3.length)
                break;
              _ref3 = _iterator3[_i3++];
            } else {
              _i3 = _iterator3.next();
              if (_i3.done)
                break;
              _ref3 = _i3.value;
            }
            var i = _ref3;
            if (i.route === url)
              return true;
          }
          return false;
        };
        _createClass(NavigationHistory, [{
          key: "items",
          get: function get() {
            return this._history;
          }
        }]);
        return NavigationHistory;
      }());
      _export("NavigationHistory", NavigationHistory);
    }
  };
});

'use strict';
System.register("state/storage.js", [], function(_export, _context) {
  var Storage;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      _export('Storage', Storage = function() {
        function Storage() {
          _classCallCheck(this, Storage);
          this._provider = this._initProvider('Warning: Local Storage is disabled or unavailable.');
        }
        Storage.prototype.set = function set(key, value) {
          if (this._provider)
            return this._provider.setItem(key, JSON.stringify(value));
          return undefined;
        };
        Storage.prototype.get = function get(key) {
          if (this._provider)
            return JSON.parse(this._provider.getItem(key));
          return undefined;
        };
        Storage.prototype.clear = function clear() {
          if (this._provider)
            this._provider.clear();
        };
        Storage.prototype._initProvider = function _initProvider(warning) {
          if ('sessionStorage' in window && window['sessionStorage'] !== null) {
            return sessionStorage;
          } else {
            console.warn(warning);
            return undefined;
          }
        };
        return Storage;
      }());
      _export('Storage', Storage);
    }
  };
});

"use strict";
System.register("app-config.js", [], function(_export, _context) {
  var _createClass,
      AppConfig;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      _export("AppConfig", AppConfig = function() {
        function AppConfig() {
          _classCallCheck(this, AppConfig);
        }
        _createClass(AppConfig, [{
          key: "appStorageKey",
          get: function get() {
            return "23875hrw28esgfds";
          }
        }]);
        return AppConfig;
      }());
      _export("AppConfig", AppConfig);
    }
  };
});

'use strict';
System.register("state/user-state-storage.js", ["./storage", "app-config", "aurelia-framework", "lodash"], function(_export, _context) {
  var Storage,
      AppConfig,
      inject,
      lodash,
      _dec,
      _class,
      UserStateStorage;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [function(_storage) {
      Storage = _storage.Storage;
    }, function(_appConfig) {
      AppConfig = _appConfig.AppConfig;
    }, function(_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function(_lodash) {
      lodash = _lodash.default;
    }],
    execute: function() {
      _export('UserStateStorage', UserStateStorage = (_dec = inject(Storage, AppConfig), _dec(_class = function() {
        function UserStateStorage(storage, config) {
          _classCallCheck(this, UserStateStorage);
          this._storage = storage;
          this._key = config.appStorageKey;
        }
        UserStateStorage.prototype.getAll = function getAll(namespace) {
          var data = this._storage.get(this._key);
          if (data) {
            if (!namespace)
              return data;
            namespace = this._createFullNamespace(namespace);
            return _.filter(data, function(x) {
              return x.key.indexOf(namespace) === 0;
            });
          }
          return [];
        };
        UserStateStorage.prototype.get = function get(key) {
          var o = this._getObj(key);
          if (o)
            return o.value;
          return undefined;
        };
        UserStateStorage.prototype.set = function set(key, value) {
          var all = this.getAll();
          var oldState = {key: key};
          var newState = {
            key: key,
            value: value
          };
          var item = _.find(all, {'key': key});
          if (item) {
            oldState.value = item.value;
            item.value = value;
          } else
            all.push({
              key: key,
              value: value
            });
          this._storage.set(this._key, all);
        };
        UserStateStorage.prototype.remove = function remove(key) {
          var all = this.getAll();
          _.remove(all, function(i) {
            return i.key == key;
          });
          this._storage.set(this._key, all);
        };
        UserStateStorage.prototype.clearAll = function clearAll() {
          this._storage.clear();
        };
        UserStateStorage.prototype.createKey = function createKey(namespace, key) {
          return this._createFullNamespace(namespace) + key;
        };
        UserStateStorage.prototype._createFullNamespace = function _createFullNamespace(namespace) {
          return namespace + ":";
        };
        UserStateStorage.prototype._getObj = function _getObj(k) {
          var data = this.getAll();
          var obj = _.find(data, {'key': k});
          return obj;
        };
        return UserStateStorage;
      }()) || _class));
      _export('UserStateStorage', UserStateStorage);
    }
  };
});

"use strict";
System.register("state/presentation/state-view.js", [], function(_export, _context) {
  var _createClass,
      UserStateView;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      _export("UserStateView", UserStateView = function() {
        function UserStateView(userStateObj) {
          _classCallCheck(this, UserStateView);
          this._stateObject = userStateObj;
        }
        _createClass(UserStateView, [{
          key: "stateObject",
          get: function get() {
            return this._stateObject;
          },
          set: function set(value) {
            this._stateObject = value;
          }
        }]);
        return UserStateView;
      }());
      _export("UserStateView", UserStateView);
    }
  };
});

'use strict';
System.register("state/presentation/search-expression-state-view.js", ["./state-view"], function(_export, _context) {
  var UserStateView,
      SearchExpressionStateView;
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
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  return {
    setters: [function(_stateView) {
      UserStateView = _stateView.UserStateView;
    }],
    execute: function() {
      _export('SearchExpressionStateView', SearchExpressionStateView = function(_UserStateView) {
        _inherits(SearchExpressionStateView, _UserStateView);
        function SearchExpressionStateView(userStateObj) {
          _classCallCheck(this, SearchExpressionStateView);
          return _possibleConstructorReturn(this, _UserStateView.call(this, userStateObj));
        }
        return SearchExpressionStateView;
      }(UserStateView));
      _export('SearchExpressionStateView', SearchExpressionStateView);
    }
  };
});

"use strict";
System.register("layout/infrastructure/state-view-factory.js", ["state/presentation/search-expression-state-view"], function(_export, _context) {
  var SearchExpressionStateView,
      StateViewFactory;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [function(_statePresentationSearchExpressionStateView) {
      SearchExpressionStateView = _statePresentationSearchExpressionStateView.SearchExpressionStateView;
    }],
    execute: function() {
      _export("StateViewFactory", StateViewFactory = function() {
        function StateViewFactory() {
          _classCallCheck(this, StateViewFactory);
        }
        StateViewFactory.prototype.createStateView = function createStateView(stateObjectType, stateObject) {
          switch (stateObjectType) {
            case "searchBoxState":
              return new SearchExpressionStateView(stateObject);
            default:
              return null;
          }
        };
        return StateViewFactory;
      }());
      _export("StateViewFactory", StateViewFactory);
    }
  };
});

'use strict';
System.register("layout/partials/history.js", ["aurelia-framework", "navigator/periscope-router", "navigator/navigation-history", "state/user-state-storage", "layout/infrastructure/state-view-factory"], function(_export, _context) {
  var inject,
      bindable,
      computedFrom,
      PeriscopeRouter,
      NavigationHistory,
      UserStateStorage,
      StateViewFactory,
      _createClass,
      _dec,
      _dec2,
      _class,
      _desc,
      _value,
      _class2,
      History;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function(key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;
    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }
    desc = decorators.slice().reverse().reduce(function(desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);
    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }
    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }
    return desc;
  }
  return {
    setters: [function(_aureliaFramework) {
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
      computedFrom = _aureliaFramework.computedFrom;
    }, function(_navigatorPeriscopeRouter) {
      PeriscopeRouter = _navigatorPeriscopeRouter.PeriscopeRouter;
    }, function(_navigatorNavigationHistory) {
      NavigationHistory = _navigatorNavigationHistory.NavigationHistory;
    }, function(_stateUserStateStorage) {
      UserStateStorage = _stateUserStateStorage.UserStateStorage;
    }, function(_layoutInfrastructureStateViewFactory) {
      StateViewFactory = _layoutInfrastructureStateViewFactory.StateViewFactory;
    }],
    execute: function() {
      _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      _export('History', History = (_dec = inject(PeriscopeRouter, NavigationHistory, StateViewFactory), _dec2 = computedFrom('currentRoute'), _dec(_class = (_class2 = function() {
        function History(router, navigationHistory, stateViewFactory) {
          _classCallCheck(this, History);
          this._router = router;
          this._navigationHistory = navigationHistory;
          this._stateViewFactory = stateViewFactory;
        }
        History.prototype.navigate = function navigate(historyItem) {
          this._router.navigate({
            route: historyItem.url,
            title: historyItem.title,
            dashboardName: historyItem.dashboard
          });
        };
        History.prototype.isCurrent = function isCurrent(historyItem) {
          if (this._router.currentRouteItem)
            return historyItem.url === this._router.currentRouteItem.route;
          return false;
        };
        History.prototype.getStateView = function getStateView(stateItem) {
          if (stateItem.value)
            return this._stateViewFactory.createStateView(stateItem.value.stateType, stateItem.value.stateObject);
        };
        _createClass(History, [{
          key: 'currentRoute',
          get: function get() {
            if (this._router.currentRouteItem)
              return this._router.currentRouteItem.route;
            return "";
          }
        }, {
          key: 'items',
          get: function get() {
            var ar = this._navigationHistory.items.slice(0);
            ar.sort(function(a, b) {
              a = new Date(a.dateTime);
              b = new Date(b.dateTime);
              return a > b ? -1 : a < b ? 1 : 0;
            });
            return ar;
          }
        }]);
        return History;
      }(), (_applyDecoratedDescriptor(_class2.prototype, 'items', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'items'), _class2.prototype)), _class2)) || _class));
      _export('History', History);
    }
  };
});

(function() {
var define = System.amdDefine;
define("layout/partials/nav-bar.html!github:systemjs/plugin-text@0.0.3.js", [], function() {
  return "<template>\n  <require from='./history'></require>\n  <require from='./dashboards-list'></require>\n  <nav>\n    <ul class=\"list-unstyled main-menu\">\n      <li>\n        <h4><a  role=\"button\" data-toggle=\"collapse\" href=\"#collapseDashboards\" aria-expanded=\"true\"><i class=\"fa fa-table\"></i> Dashboards</a></h4>\n        <div class=\"collapse\" id=\"collapseDashboards\">\n          <dashboards-list></dashboards-list>\n        </div>\n      </li>\n      <li>\n        <h4><a  role=\"button\" data-toggle=\"collapse\" href=\"#collapseHistory\"><i class=\"fa fa-clock-o\"></i> History</a></h4>\n        <div class=\"collapse\" id=\"collapseHistory\">\n          <history></history>\n        </div>\n      </li>\n    </ul>\n\n  </nav>\n\n  <div class=\"navbar navbar-inverse navbar-fixed-top\">\n    <div class=\"container\">\n      <a href=\"/\" class=\"navbar-brand\">\n        ${router.title}\n      </a>\n    </div>\n    <div class=\"navbar-header pull-right\">\n      <a id=\"nav-expander\" class=\"nav-expander fixed\">\n        <i class=\"fa fa-bars fa-lg white\"></i>\n      </a>\n    </div>\n  </div>\n\n</template>\n";
});

})();
'use strict';
System.register("layout/partials/nav-bar.js", ["jquery", "bootstrap", "aurelia-framework"], function(_export, _context) {
  var $,
      bootstrap,
      bindable,
      _desc,
      _value,
      _class,
      _descriptor,
      NavBar;
  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor)
      return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function(key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;
    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }
    desc = decorators.slice().reverse().reduce(function(desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);
    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }
    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }
    return desc;
  }
  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }
  return {
    setters: [function(_jquery) {
      $ = _jquery.default;
    }, function(_bootstrap) {
      bootstrap = _bootstrap.bootstrap;
    }, function(_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
    }],
    execute: function() {
      _export('NavBar', NavBar = (_class = function() {
        function NavBar() {
          _classCallCheck(this, NavBar);
          _initDefineProp(this, 'router', _descriptor, this);
        }
        NavBar.prototype.attached = function attached() {
          $('#nav-expander').on('click', function(e) {
            e.preventDefault();
            $('body').toggleClass('nav-expanded');
          });
          $('#nav-close').on('click', function(e) {
            e.preventDefault();
            $('body').removeClass('nav-expanded');
          });
          $('#collapseDashboards').collapse('show');
        };
        return NavBar;
      }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'router', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class));
      _export('NavBar', NavBar);
    }
  };
});

(function() {
var define = System.amdDefine;
define("layout/partials/nav-menu.html!github:systemjs/plugin-text@0.0.3.js", [], function() {
  return "<template>\n  <div class=\"mainnav\">\n    <!--<div class=\"container\">\n      <a class=\"mainnav-toggle\" data-toggle=\"collapse\" data-target=\".mainnav-collapse\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <i class=\"fa fa-bars\"></i>\n      </a>\n      <nav class=\"collapse mainnav-collapse\" role=\"navigation\">\n        <ul class=\"mainnav-menu\">\n          <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\n            <a href.bind=\"row.href\">\n              ${row.title}\n            </a>\n          </li>\n        </ul>\n      </nav>\n    </div>-->\n  </div>\n</template>\n";
});

})();
'use strict';
System.register("layout/partials/nav-menu.js", ["aurelia-framework"], function(_export, _context) {
  var bindable,
      _desc,
      _value,
      _class,
      _descriptor,
      NavMenu;
  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor)
      return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function(key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;
    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }
    desc = decorators.slice().reverse().reduce(function(desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);
    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }
    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }
    return desc;
  }
  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }
  return {
    setters: [function(_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
    }],
    execute: function() {
      _export('NavMenu', NavMenu = (_class = function NavMenu() {
        _classCallCheck(this, NavMenu);
        _initDefineProp(this, 'router', _descriptor, this);
      }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'router', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class));
      _export('NavMenu', NavMenu);
    }
  };
});

(function() {
var define = System.amdDefine;
define("layout/partials/system-info.html!github:systemjs/plugin-text@0.0.3.js", [], function() {
  return "<template>\n  <require from=\"helpers/converters/date-format\"></require>\n  Version: ${version} <b>beta</b> (last build: ${lastBuild | dateFormat:'M/D/YYYY'})\n</template>\n\n";
});

})();
"use strict";
System.register("layout/partials/system-info.js", [], function(_export, _context) {
  var SystemInfo;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      _export("SystemInfo", SystemInfo = function SystemInfo() {
        _classCallCheck(this, SystemInfo);
        this.version = "1.0.3";
        this.lastBuild = new Date().setDate(new Date().getDate() - 1);
      });
      _export("SystemInfo", SystemInfo);
    }
  };
});

(function() {
var define = System.amdDefine;
define("layout/widgets/chart-content.html!github:systemjs/plugin-text@0.0.3.js", [], function() {
  return "<template>\n  <div ref=\"chartElement\" style=\"vertical-align: top; height: 400px;\"></div>\n</template>\n";
});

})();
(function() {
var define = System.amdDefine;
define("layout/widgets/detailed-view-content.html!github:systemjs/plugin-text@0.0.3.js", [], function() {
  return "<template>\n  <dl class=\"dl-horizontal\">\n    <template repeat.for=\"f of fields\">\n      <dt>${f.name}</dt>\n      <dd>${f.value}</dd>\n    </template>\n  </dl>\n</template>\n";
});

})();
(function() {
var define = System.amdDefine;
define("layout/widgets/dsl-search-box-content.html!github:systemjs/plugin-text@0.0.3.js", [], function() {
  return "<template>\n  <require from='layout/controls/list'></require>\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n\n    </div>\n  </div>\n  <div class=\"row search-box-widget\">\n    <div class=\"col-md-12\">\n        <div class=\"form-group has-feedback search-box-widget-input ${isValid ? '' : 'has-error'}\">\n          <div class=\"input-group\">\n            <div class=\"input-group-addon\"><i class=\"fa ${isValid ? 'fa-check success-check-mark' : 'fa-close'}\"></i></div>\n            <input type=\"text\" ref=\"searchBox\" placeholder=\"Search...\" class=\"form-control\" autofocus value.bind=\"searchString\"/>\n          </div>\n          <!--<span class=\"fa ${!isValid ? 'fa-question-circle' : ''} form-control-feedback\" aria-hidden=\"true\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Tooltip on bottom\"></span>-->\n        </div>\n    </div>\n  </div>\n  <div class=\"row\" show.bind = \"suggestionsListSettings.displaySuggestions\">\n      <div class=\"col-md-6 overlay\">\n        <list items.bind=\"suggestionsListSettings.suggestions\" focused-item-index.bind=\"suggestionsListSettings.focusedSuggestion\" selected-item.bind=\"selectedSuggestion\" visible.bind = \"suggestionsListSettings.displaySuggestions\" highlight-text.bind=\"suggestionsListSettings.lastWord\" title.bind=\"suggestionsListSettings.title\"/>\n      </div>\n    </div>\n  </div>\n  <div class=\"row\" show.bind=\"showAssumption\">\n    <div class=\"col-md-12\">\n      <p>\n        <b>Did you mean: <button class=\"btn btn-link\" click.trigger=\"selectAssumption()\">${assumptionString}</button></b>\n      </p>\n    </div>\n  </div>\n</template>\n";
});

})();
(function() {
var define = System.amdDefine;
define("layout/widgets/grid-content.html!github:systemjs/plugin-text@0.0.3.js", [], function() {
  return "<template>\n  <require from='layout/controls/checkbox-list'></require>\n    <div ref=\"gridElement\"></div>\n    <div id=\"colunsModal\" class=\"modal fade\" ref='columnsChooserPopup'>\n      <div class=\"modal-dialog modal-sm\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n          </div>\n          <div class=\"modal-body widgets-panel-modal\">\n\n            <form class=\"form-inline\">\n              <div class=\"form-group\">\n                <input type=\"text\" class=\"form-control\" id=\"filter\" placeholder=\"Filter\" value.bind=\"columnsFilterExpression\">\n              </div>\n            </form>\n            <br/>\n            <template repeat.for=\"item of filteredColumns\">\n              <div class=\"checkbox\">\n                <label>\n                  <input type=\"checkbox\" checked.bind=\"!item.hidden\" click.trigger=\"selectColumn(item)\"/> ${item.field}\n                </label>\n              </div>\n            </template>\n          </div>\n        </div>\n      </div>\n    </div>\n</template>\n\n";
});

})();
(function() {
var define = System.amdDefine;
define("layout/widgets/widget.html!github:systemjs/plugin-text@0.0.3.js", [], function() {
  return "<template>\n  <div class=\"portlet portlet-default\">\n    <div class=\"portlet-header\" show.bind=\"showHeader\">\n      <header>\n        <h4 class=\"portlet-title\">\n          <button type=\"button\" show.bind=\"hasNavStack\" class=\"btn btn-link\" click.trigger=\"back()\"><i class=\"fa fa-chevron-left\"></i></button>\n          ${header}\n          <a class=\"dropdown-toggle\" data-toggle=\"dropdown\"><i class=\"fa fa-caret-down\"></i></a>\n          <ul class=\"dropdown-menu\">\n            <li><button type=\"button\" class=\"btn btn-link\" click.trigger=\"refresh()\"><i class=\"fa fa-refresh\"></i> Refresh</button></li>\n            <li><button type=\"button\" class=\"btn btn-link\" click.trigger=\"remove()\"><i class=\"fa fa-remove\"></i> Delete</button></li>\n            <li><button type=\"button\" class=\"btn btn-link\" click.trigger=\"resize()\" show.bind=\"!resized\"><i class=\"fa fa-arrows-h\"></i> Maximize</button></li>\n            <li><button type=\"button\" class=\"btn btn-link\" click.trigger=\"resize()\" show.bind=\"resized\"><i class=\"fa fa-undo\"></i> Undo Maximize</button></li>\n          </ul>\n        </h4>\n      </header>\n    </div>\n    <div class=\"portlet-body\">\n      <compose\n        view-model.bind=\"content\">\n      </compose>\n    </div>\n  </div>\n</template>\n";
});

})();
'use strict';
System.register("main.js", ["fetch"], function(_export, _context) {
  return {
    setters: [function(_fetch) {}],
    execute: function() {
      function configure(aurelia) {
        aurelia.use.standardConfiguration().developmentLogging().plugin('aurelia-animator-css');
        aurelia.start().then(function(a) {
          return a.setRoot();
        });
      }
      _export('configure', configure);
    }
  };
});

(function() {
var define = System.amdDefine;
define("state/presentation/search-expression-state-view.html!github:systemjs/plugin-text@0.0.3.js", [], function() {
  return "<template>\n  ${stateObject}\n</template>\n";
});

})();