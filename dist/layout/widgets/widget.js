'use strict';

System.register(['aurelia-framework', 'navigator/events/widget-event', 'lodash', 'data/query'], function (_export, _context) {
  var computedFrom, WidgetEvent, lodash, Query, _createClass, _dec, _desc, _value, _class, Widget;

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

  return {
    setters: [function (_aureliaFramework) {
      computedFrom = _aureliaFramework.computedFrom;
    }, function (_navigatorEventsWidgetEvent) {
      WidgetEvent = _navigatorEventsWidgetEvent.WidgetEvent;
    }, function (_lodash) {
      lodash = _lodash.default;
    }, function (_dataQuery) {
      Query = _dataQuery.Query;
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

      _export('Widget', Widget = (_dec = computedFrom('navigationStack'), (_class = function () {
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

          if (this.dataSource) this.dataHolder = this.dataSource.createDataHolder();
          this.attachBehaviors(this.settings.behavior);
          this._resized = false;
        }

        Widget.prototype.attachBehaviors = function attachBehaviors(behaviors) {
          if (behaviors) {
            for (var _iterator = behaviors, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
              var _ref;

              if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
              } else {
                _i = _iterator.next();
                if (_i.done) break;
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
            _.forOwn(newSettings, function (v, k) {
              _this.settings[k] = v;
            });
            this.refresh();
          }
        };

        Widget.prototype.resize = function resize() {
          if (!this.resized) {
            this._originalDimensions = this._dashboard.getWidgetDimensions(this);
            this._dashboard.resizeWidget(this, { size_x: 12 });
          } else this._dashboard.resizeWidget(this, this._originalDimensions);
          this.resized = !this.resized;
        };

        Widget.prototype.remove = function remove() {
          if (this._dashboard != undefined) this._dashboard.removeWidget(this);
        };

        Widget.prototype.refresh = function refresh() {
          var _this2 = this;

          this.dataHolder.query = new Query();
          this.dataHolder.query.serverSideFilter = this.dataFilter;
          this.dataHolder.query.skip = 0;

          this.dataHolder.load().then(function (d) {
            _this2.content.refresh();
          });
        };

        Widget.prototype.back = function back() {
          if (this._backButtonPressed) this.backButtonPressed.raise(this.navigationStack);
        };

        Widget.prototype.dispose = function dispose() {
          while (true) {
            if (this.behaviors.length > 0) this.behaviors[0].detach();else break;
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
              if (s) return s.stateObject;
            }
            return undefined;
          },
          set: function set(value) {
            if (this.stateStorage) {
              var key = this.stateStorage.createKey(this.dashboard.name, this.name);
              if (!value) this.stateStorage.remove(key);else {
                var s = { stateType: this.stateType, stateObject: value };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC93aWRnZXRzL3dpZGdldC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBUTs7QUFDQTs7QUFDRDs7QUFDQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dCQUVLLGlCQXlGVixhQUFhLGlCQUFiO0FBdkZELGlCQUZXLE1BRVgsQ0FBWSxRQUFaLEVBQXNCO2dDQUZYLFFBRVc7O0FBRXBCLGVBQUssU0FBTCxHQUFpQixRQUFqQixDQUZvQjtBQUdwQixlQUFLLFVBQUwsR0FBa0IsRUFBbEIsQ0FIb0I7QUFJcEIsZUFBSyxnQkFBTCxHQUF3QixFQUF4QixDQUpvQjs7QUFNcEIsZUFBSyxrQkFBTCxHQUEwQixJQUFJLFdBQUosRUFBMUIsQ0FOb0I7QUFPcEIsZUFBSyxhQUFMLEdBQXFCLElBQUksV0FBSixFQUFyQixDQVBvQjtBQVFwQixlQUFLLGNBQUwsR0FBc0IsSUFBSSxXQUFKLEVBQXRCLENBUm9CO0FBU3BCLGVBQUssa0JBQUwsR0FBMEIsSUFBSSxXQUFKLEVBQTFCLENBVG9CO0FBVXBCLGVBQUssa0JBQUwsR0FBMEIsSUFBSSxXQUFKLEVBQTFCLENBVm9COztBQVlwQixjQUFJLEtBQUssVUFBTCxFQUNGLEtBQUssVUFBTCxHQUFrQixLQUFLLFVBQUwsQ0FBZ0IsZ0JBQWhCLEVBQWxCLENBREY7QUFFQSxlQUFLLGVBQUwsQ0FBcUIsS0FBSyxRQUFMLENBQWMsUUFBZCxDQUFyQixDQWRvQjtBQWVwQixlQUFLLFFBQUwsR0FBZ0IsS0FBaEIsQ0Fmb0I7U0FBdEI7O0FBRlcseUJBaUpYLDJDQUFnQixXQUFVO0FBQ3hCLGNBQUksU0FBSixFQUFlO0FBQ2IsaUNBQWMsdUhBQWQ7Ozs7Ozs7Ozs7OztrQkFBUzs7QUFDUCxnQkFBRSxjQUFGLENBQWlCLElBQWpCO2FBREY7V0FERjs7O0FBbEpTLHlCQXlKWCx5Q0FBZSxhQUFZOzs7QUFDekIsY0FBSSxXQUFKLEVBQWlCO0FBRWYs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QWxCLENBRG1COzs7OzhCQUtDO0FBQ3BCLG1CQUFPLEtBQUssZ0JBQUwsQ0FEYTs7NEJBSUYsT0FBTztBQUN6QixpQkFBSyxnQkFBTCxHQUF3QixLQUF4QixDQUR5Qjs7Ozs4QkFnRUg7QUFDdEIsbUJBQU8sS0FBSyxrQkFBTCxDQURlOzs0QkFHRixTQUFTO0FBQzdCLGlCQUFLLGtCQUFMLENBQXdCLE1BQXhCLENBQStCLE9BQS9CLEVBRDZCOzs7OzhCQUlQO0FBQ3RCLG1CQUFPLEtBQUssa0JBQUwsQ0FEZTs7NEJBR0YsU0FBUztBQUM3QixpQkFBSyxrQkFBTCxDQUF3QixNQUF4QixDQUErQixPQUEvQixFQUQ2Qjs7Ozs4QkFJWjtBQUNqQixtQkFBTyxLQUFLLGFBQUwsQ0FEVTs7NEJBR0YsU0FBUztBQUN4QixpQkFBSyxhQUFMLENBQW1CLE1BQW5CLENBQTBCLE9BQTFCLEVBRHdCOzs7OzhCQUlOO0FBQ2xCLG1CQUFPLEtBQUssY0FBTCxDQURXOzs0QkFHRixTQUFTO0FBQ3pCLGlCQUFLLGNBQUwsQ0FBb0IsTUFBcEIsQ0FBMkIsT0FBM0IsRUFEeUI7Ozs7OEJBSUg7QUFDdEIsbUJBQU8sS0FBSyxrQkFBTCxDQURlOzs0QkFHRixTQUFTO0FBQzdCLGlCQUFLLGtCQUFMLENBQXdCLE1BQXhCLENBQStCLE9BQS9CLEVBRDZCOzs7O2VBNU9wQiIsImZpbGUiOiJsYXlvdXQvd2lkZ2V0cy93aWRnZXQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
