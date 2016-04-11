'use strict';

System.register(['lodash', './../../data/query', './widget-content'], function (_export, _context) {
  var _, Query, WidgetContent, _createClass, DetailedViewContent;

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
    setters: [function (_lodash) {
      _ = _lodash;
    }, function (_dataQuery) {
      Query = _dataQuery.Query;
    }, function (_widgetContent) {
      WidgetContent = _widgetContent.WidgetContent;
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

      _export('DetailedViewContent', DetailedViewContent = function (_WidgetContent) {
        _inherits(DetailedViewContent, _WidgetContent);

        function DetailedViewContent(widget) {
          _classCallCheck(this, DetailedViewContent);

          var _this = _possibleConstructorReturn(this, _WidgetContent.call(this, widget));

          _this.columns = widget.settings.columns;

          return _this;
        }

        DetailedViewContent.prototype.refresh = function refresh() {
          var _this2 = this;

          var q = new Query();
          q.take = 1;
          q.skip = 0;
          q.serverSideFilter = this.widget.dataFilter;
          this.widget.dataSource.getData(q).then(function (dH) {
            if (dH.data.length > 0) _this2.data = dH.data[0];
          });
        };

        _createClass(DetailedViewContent, [{
          key: 'data',
          get: function get() {
            return this._data;
          },
          set: function set(value) {
            this._data = value;
          }
        }, {
          key: 'fields',
          get: function get() {
            var _this3 = this;

            var result = [];
            if (!this.data) return result;
            if (this.columns) {
              result = _.map(this.columns, function (c) {
                return {
                  name: c.title ? c.title : c.field,
                  value: _this3.data[c.field]
                };
              });
            } else {
              _.forOwn(this.data, function (v, k) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC93aWRnZXRzL2RldGFpbGVkLXZpZXctY29udGVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVk7O0FBQ0o7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQ0FFSzs7O0FBRVgsaUJBRlcsbUJBRVgsQ0FBWSxNQUFaLEVBQW9CO2dDQUZULHFCQUVTOzt1REFDbEIsMEJBQU0sTUFBTixHQURrQjs7QUFFbEIsZ0JBQUssT0FBTCxHQUFlLE9BQU8sUUFBUCxDQUFnQixPQUFoQixDQUZHOzs7U0FBcEI7O0FBRlcsc0NBNkNYLDZCQUFTOzs7QUFDUCxjQUFJLElBQUksSUFBSSxLQUFKLEVBQUosQ0FERztBQUVQLFlBQUUsSUFBRixHQUFTLENBQVQsQ0FGTztBQUdQLFlBQUUsSUFBRixHQUFTLENBQVQsQ0FITztBQUlQLFlBQUUsZ0JBQUYsR0FBcUIsS0FBSyxNQUFMLENBQVksVUFBWixDQUpkO0FBS1AsZUFBSyxNQUFMLENBQVksVUFBWixDQUF1QixPQUF2QixDQUErQixDQUEvQixFQUFrQyxJQUFsQyxDQUF1QyxjQUFJO0FBQ3pDLGdCQUFJLEdBQUcsSUFBSCxDQUFRLE1BQVIsR0FBZSxDQUFmLEVBQ0YsT0FBSyxJQUFMLEdBQVksR0FBRyxJQUFILENBQVEsQ0FBUixDQUFaLENBREY7V0FEcUMsQ0FBdkMsQ0FMTzs7O3FCQTdDRTs7OEJBUUQ7QUFDUixtQkFBTyxLQUFLLEtBQUwsQ0FEQzs7NEJBR0QsT0FBTTtBQUNiLGlCQUFLLEtBQUwsR0FBYSxLQUFiLENBRGE7Ozs7OEJBSUY7OztBQUNYLGdCQUFJLFNBQVMsRUFBVCxDQURPO0FBRVgsZ0JBQUksQ0FBQyxLQUFLLElBQUwsRUFDSCxPQUFPLE1BQVAsQ0FERjtBQUVBLGdCQUFJLEtBQUssT0FBTCxFQUFjO0FBQ2hCLHVCQUFTLEVBQUUsR0FBRixDQUFNLEtBQUssT0FBTCxFQUFjLGFBQUc7QUFDOUIsdUJBQU87QUFDTCx3QkFBTSxFQUFFLEtBQUYsR0FBVSxFQUFFLEtBQUYsR0FBVSxFQUFFLEtBQUY7QUFDMUIseUJBQU8sT0FBSyxJQUFMLENBQVUsRUFBRSxLQUFGLENBQWpCO2lCQUZGLENBRDhCO2VBQUgsQ0FBN0IsQ0FEZ0I7YUFBbEIsTUFRSztBQUNILGdCQUFFLE1BQUYsQ0FBUyxLQUFLLElBQUwsRUFBVyxVQUFDLENBQUQsRUFBSSxDQUFKLEVBQVE7QUFDMUIsdUJBQU8sSUFBUCxDQUFZO0FBQ1Ysd0JBQU0sQ0FBTjtBQUNBLHlCQUFPLENBQVA7aUJBRkYsRUFEMEI7ZUFBUixDQUFwQixDQURHO2FBUkw7QUFnQkEsbUJBQU8sTUFBUCxDQXBCVzs7Ozs0QkF1QkQsT0FBTztBQUNqQixpQkFBSyxRQUFMLEdBQWdCLEtBQWhCLENBRGlCOzs4QkFHTDtBQUNaLG1CQUFPLEtBQUssUUFBTCxDQURLOzs7O2VBekNIO1FBQTRCIiwiZmlsZSI6ImxheW91dC93aWRnZXRzL2RldGFpbGVkLXZpZXctY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
