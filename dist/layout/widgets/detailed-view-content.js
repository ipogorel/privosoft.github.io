'use strict';

System.register(['aurelia-framework', 'lodash', './widget-content'], function (_export, _context) {
  var inject, lodash, WidgetContent, _createClass, DetailedViewContent;

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
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_lodash) {
      lodash = _lodash.default;
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

        _createClass(DetailedViewContent, [{
          key: 'fields',
          get: function get() {
            var result = [];
            if (!this.dataHolder.data || !this.dataHolder.data[0]) return result;
            var _data = this.dataHolder.data[0];
            if (this.columns) {
              result = _.map(this.columns, function (c) {
                return {
                  name: c.title ? c.title : c.field,
                  value: _data[c.field]
                };
              });
            } else {
              _.forOwn(_data, function (v, k) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC93aWRnZXRzL2RldGFpbGVkLXZpZXctY29udGVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVE7O0FBQ0Q7O0FBQ0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQ0FFSzs7O0FBRVgsaUJBRlcsbUJBRVgsQ0FBWSxNQUFaLEVBQW9CO2dDQUZULHFCQUVTOzt1REFDbEIsMEJBQU0sTUFBTixHQURrQjs7QUFFbEIsZ0JBQUssT0FBTCxHQUFlLE9BQU8sUUFBUCxDQUFnQixPQUFoQixDQUZHOzs7U0FBcEI7O3FCQUZXOzs4QkFTRTtBQUNYLGdCQUFJLFNBQVMsRUFBVCxDQURPO0FBRVgsZ0JBQUksQ0FBQyxLQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsSUFBd0IsQ0FBQyxLQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBcUIsQ0FBckIsQ0FBRCxFQUMzQixPQUFPLE1BQVAsQ0FERjtBQUVBLGdCQUFJLFFBQVEsS0FBSyxVQUFMLENBQWdCLElBQWhCLENBQXFCLENBQXJCLENBQVIsQ0FKTztBQUtYLGdCQUFJLEtBQUssT0FBTCxFQUFjO0FBQ2hCLHVCQUFTLEVBQUUsR0FBRixDQUFNLEtBQUssT0FBTCxFQUFjLGFBQUc7QUFDOUIsdUJBQU87QUFDTCx3QkFBTSxFQUFFLEtBQUYsR0FBVSxFQUFFLEtBQUYsR0FBVSxFQUFFLEtBQUY7QUFDMUIseUJBQU8sTUFBTSxFQUFFLEtBQUYsQ0FBYjtpQkFGRixDQUQ4QjtlQUFILENBQTdCLENBRGdCO2FBQWxCLE1BUUs7QUFDSCxnQkFBRSxNQUFGLENBQVMsS0FBVCxFQUFnQixVQUFDLENBQUQsRUFBSSxDQUFKLEVBQVE7QUFDdEIsdUJBQU8sSUFBUCxDQUFZO0FBQ1Ysd0JBQU0sQ0FBTjtBQUNBLHlCQUFPLENBQVA7aUJBRkYsRUFEc0I7ZUFBUixDQUFoQixDQURHO2FBUkw7QUFnQkEsbUJBQU8sTUFBUCxDQXJCVzs7Ozs0QkF3QkQsT0FBTztBQUNqQixpQkFBSyxRQUFMLEdBQWdCLEtBQWhCLENBRGlCOzs4QkFHTDtBQUNaLG1CQUFPLEtBQUssUUFBTCxDQURLOzs7O2VBcENIO1FBQTRCIiwiZmlsZSI6ImxheW91dC93aWRnZXRzL2RldGFpbGVkLXZpZXctY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
