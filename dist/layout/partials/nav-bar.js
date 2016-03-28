'use strict';

System.register(['jquery', 'bootstrap', 'aurelia-framework'], function (_export, _context) {
  var $, bootstrap, bindable, _desc, _value, _class, _descriptor, NavBar;

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
    setters: [function (_jquery) {
      $ = _jquery.default;
    }, function (_bootstrap) {
      bootstrap = _bootstrap.bootstrap;
    }, function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
    }],
    execute: function () {
      _export('NavBar', NavBar = (_class = function () {
        function NavBar() {
          _classCallCheck(this, NavBar);

          _initDefineProp(this, 'router', _descriptor, this);
        }

        NavBar.prototype.attached = function attached() {
          $('#nav-expander').on('click', function (e) {
            e.preventDefault();
            $('body').toggleClass('nav-expanded');
          });
          $('#nav-close').on('click', function (e) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC9wYXJ0aWFscy9uYXYtYmFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU87O0FBQ0M7O0FBQ0E7Ozt3QkFFSzs7Ozs7Ozt5QkFHWCwrQkFBVztBQUNULFlBQUUsZUFBRixFQUFtQixFQUFuQixDQUFzQixPQUF0QixFQUE4QixVQUFTLENBQVQsRUFBVztBQUN2QyxjQUFFLGNBQUYsR0FEdUM7QUFFdkMsY0FBRSxNQUFGLEVBQVUsV0FBVixDQUFzQixjQUF0QixFQUZ1QztXQUFYLENBQTlCLENBRFM7QUFLVCxZQUFFLFlBQUYsRUFBZ0IsRUFBaEIsQ0FBbUIsT0FBbkIsRUFBMkIsVUFBUyxDQUFULEVBQVc7QUFDcEMsY0FBRSxjQUFGLEdBRG9DO0FBRXBDLGNBQUUsTUFBRixFQUFVLFdBQVYsQ0FBc0IsY0FBdEIsRUFGb0M7V0FBWCxDQUEzQixDQUxTO0FBU1QsWUFBRSxxQkFBRixFQUF5QixRQUF6QixDQUFrQyxNQUFsQyxFQVRTOzs7ZUFIQTtpRkFDVjs7O2lCQUFrQiIsImZpbGUiOiJsYXlvdXQvcGFydGlhbHMvbmF2LWJhci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
