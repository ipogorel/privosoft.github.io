'use strict';

System.register(['aurelia-framework', './../../navigator/events/widget-event', 'lodash'], function (_export, _context) {
  var computedFrom, WidgetEvent, lodash, _createClass, _dec, _desc, _value, _class, Widget;

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
          this._dataSourceChanged = new WidgetEvent();

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
          this.content.refresh();
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
          set: function set(value) {
            this.settings.dataSource = value;
          },
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
        }, {
          key: 'dataSourceChanged',
          get: function get() {
            return this._dataSourceChanged;
          },
          set: function set(handler) {
            this._dataSourceChanged.attach(handler);
          }
        }]);

        return Widget;
      }(), (_applyDecoratedDescriptor(_class.prototype, 'hasNavStack', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'hasNavStack'), _class.prototype)), _class)));

      _export('Widget', Widget);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC93aWRnZXRzL3dpZGdldC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBUTs7QUFDQTs7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dCQUVNLGlCQXNGVixhQUFhLGlCQUFiO0FBcEZELGlCQUZXLE1BRVgsQ0FBWSxRQUFaLEVBQXNCO2dDQUZYLFFBRVc7O0FBRXBCLGVBQUssU0FBTCxHQUFpQixRQUFqQixDQUZvQjtBQUdwQixlQUFLLFVBQUwsR0FBa0IsRUFBbEIsQ0FIb0I7QUFJcEIsZUFBSyxnQkFBTCxHQUF3QixFQUF4QixDQUpvQjs7QUFNcEIsZUFBSyxrQkFBTCxHQUEwQixJQUFJLFdBQUosRUFBMUIsQ0FOb0I7QUFPcEIsZUFBSyxhQUFMLEdBQXFCLElBQUksV0FBSixFQUFyQixDQVBvQjtBQVFwQixlQUFLLGNBQUwsR0FBc0IsSUFBSSxXQUFKLEVBQXRCLENBUm9CO0FBU3BCLGVBQUssa0JBQUwsR0FBMEIsSUFBSSxXQUFKLEVBQTFCLENBVG9CO0FBVXBCLGVBQUssa0JBQUwsR0FBMEIsSUFBSSxXQUFKLEVBQTFCLENBVm9CO0FBV3BCLGVBQUssa0JBQUwsR0FBMEIsSUFBSSxXQUFKLEVBQTFCLENBWG9COztBQWFwQixlQUFLLGVBQUwsQ0FBcUIsS0FBSyxRQUFMLENBQWMsUUFBZCxDQUFyQixDQWJvQjtBQWNwQixlQUFLLFFBQUwsR0FBZ0IsS0FBaEIsQ0Fkb0I7U0FBdEI7O0FBRlcseUJBa0pYLDJDQUFnQixXQUFVO0FBQ3hCLGNBQUksU0FBSixFQUFlO0FBQ2IsaUNBQWMsdUhBQWQ7Ozs7Ozs7Ozs7OztrQkFBUzs7QUFDUCxnQkFBRSxjQUFGLENBQWlCLElBQWpCO2FBREY7V0FERjs7O0FBbkpTLHlCQTBKWCx5Q0FBZSxhQUFZOzs7QUFDekIsY0FBSSxXQUFKLEVBQWlCO0FBRWYsY0FBRSxNQUFGLENBQVMsV0FBVCxFQUFzQixVQUFDLENBQUQs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QS9CLEVBRDZCOzs7OzhCQUlaO0FBQ2pCLG1CQUFPLEtBQUssYUFBTCxDQURVOzs0QkFHRixTQUFTO0FBQ3hCLGlCQUFLLGFBQUwsQ0FBbUIsTUFBbkIsQ0FBMEIsT0FBMUIsRUFEd0I7Ozs7OEJBSU47QUFDbEIsbUJBQU8sS0FBSyxjQUFMLENBRFc7OzRCQUdGLFNBQVM7QUFDekIsaUJBQUssY0FBTCxDQUFvQixNQUFwQixDQUEyQixPQUEzQixFQUR5Qjs7Ozs4QkFJSDtBQUN0QixtQkFBTyxLQUFLLGtCQUFMLENBRGU7OzRCQUdGLFNBQVM7QUFDN0IsaUJBQUssa0JBQUwsQ0FBd0IsTUFBeEIsQ0FBK0IsT0FBL0IsRUFENkI7Ozs7OEJBR1A7QUFDdEIsbUJBQU8sS0FBSyxrQkFBTCxDQURlOzs0QkFHRixTQUFTO0FBQzdCLGlCQUFLLGtCQUFMLENBQXdCLE1BQXhCLENBQStCLE9BQS9CLEVBRDZCOzs7O2VBN09wQiIsImZpbGUiOiJsYXlvdXQvd2lkZ2V0cy93aWRnZXQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
