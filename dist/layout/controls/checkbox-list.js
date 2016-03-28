'use strict';

System.register(['aurelia-framework', 'lodash'], function (_export, _context) {
  var customElement, bindable, inject, computedFrom, lodash, _createClass, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, CheckboxList;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
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
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
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
    setters: [function (_aureliaFramework) {
      customElement = _aureliaFramework.customElement;
      bindable = _aureliaFramework.bindable;
      inject = _aureliaFramework.inject;
      computedFrom = _aureliaFramework.computedFrom;
    }, function (_lodash) {
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

      _export('CheckboxList', CheckboxList = (_class = function () {
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

            if (this.filterExpression) return _.filter(this.dataSource, function (x) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC9jb250cm9scy9jaGVja2JveC1saXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVE7QUFBZTtBQUFVO0FBQVE7O0FBQ2xDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OEJBRU07QUFNWCxpQkFOVyxZQU1YLEdBQWE7Z0NBTkYsY0FNRTs7Ozs7Ozs7O1NBQWI7O0FBTlcsK0JBd0JYLDJCQUFRLE1BQUs7QUFDWCxjQUFJLEtBQUssZ0JBQUwsRUFBc0I7QUFDeEIsZ0JBQUksTUFBTSxFQUFOLENBRG9CO0FBRXhCLGdCQUFJLEtBQUssWUFBTCxDQUFKLEdBQXlCLEtBQUssS0FBSyxZQUFMLENBQTlCLENBRndCO0FBR3hCLGdCQUFJLEtBQUssYUFBTCxDQUFKLEdBQTBCLEtBQUssS0FBSyxhQUFMLENBQS9CLENBSHdCO0FBSXhCLGlCQUFLLGdCQUFMLENBQXNCLEdBQXRCLEVBSndCO1dBQTFCO0FBTUEsaUJBQU8sSUFBUCxDQVBXOzs7cUJBeEJGOzs4QkFVVztBQUNwQixtQkFBTyxLQUFLLGlCQUFMLENBRGE7OzRCQUdELE9BQU07QUFDekIsaUJBQUssaUJBQUwsR0FBeUIsS0FBekIsQ0FEeUI7Ozs7OEJBS1I7OztBQUNqQixnQkFBSSxLQUFLLGdCQUFMLEVBQ0YsT0FBTyxFQUFFLE1BQUYsQ0FBUyxLQUFLLFVBQUwsRUFBaUI7cUJBQU0sRUFBRSxNQUFLLFlBQUwsQ0FBRixDQUFxQixXQUFyQixHQUFtQyxPQUFuQyxDQUEyQyxNQUFLLGlCQUFMLENBQXVCLFdBQXZCLEVBQTNDLEtBQWtGLENBQWxGO2FBQU4sQ0FBakMsQ0FERjtBQUVBLG1CQUFPLEtBQUssVUFBTCxDQUhVOzs7O2VBbEJSO3FGQUNWOzs7aUJBQXNCOztzRkFDdEI7OztpQkFBd0I7O3VGQUN4Qjs7O2lCQUF5Qjs7MEZBQ3pCOzs7aUJBQTRCIiwiZmlsZSI6ImxheW91dC9jb250cm9scy9jaGVja2JveC1saXN0LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
