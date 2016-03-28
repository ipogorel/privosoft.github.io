'use strict';

System.register(['aurelia-framework', 'jquery'], function (_export, _context) {
  var customElement, bindable, bindingMode, inject, $, _dec, _dec2, _dec3, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, List;

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
      bindingMode = _aureliaFramework.bindingMode;
      inject = _aureliaFramework.inject;
    }, function (_jquery) {
      $ = _jquery.default;
    }],
    execute: function () {
      _export('List', List = (_dec = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec2 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec3 = bindable({ defaultBindingMode: bindingMode.twoWay }), (_class = function () {
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

          $("body").on("click", function (args) {
            if ($(args.target).parents(".list-view").length > 0 || $(args.target).hasClass("list-view")) return;
            self.visible = false;
          });

          if ($('.list-container').length === 0) return;
          $('.list-container')[0].addEventListener("keydown", function (e) {
            var container = $(this);

            if (container.find('li').length === 0) return;

            switch (e.keyCode) {

              case 38:
                if (container.find('li').filter('.focused-item').length === 0) {
                  self.focusedItemIndex = container.find('li').length - 1;
                } else {
                  var previousIndex = self.focusedItemIndex - 1;
                  if (previousIndex < 0) previousIndex = container.find('li').length - 1;
                  self.focusedItemIndex = previousIndex;
                }
                break;

              case 40:

                if (container.find('li').filter('.focused-item').length === 0) {
                  self.focusedItemIndex = 0;
                } else {
                  var nextIndex = self.focusedItemIndex + 1;
                  if (nextIndex >= container.find('li').length) nextIndex = 0;
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
            if (this.focusedItemIndex >= 0) this.setFocus(this.focusedItemIndex);else this.clearFocus();
          }
        };

        List.prototype.setFocus = function setFocus(itemIndex) {
          var container = $(this.listViewContainer);
          if (container.find('li').length === 0) return;
          container.find('li').filter('.focused-item').removeClass("focused-item");
          $(container.find('li')[itemIndex]).addClass("focused-item");
          $(container.find('li')[itemIndex]).find('button').first().focus();
        };

        List.prototype.clearFocus = function clearFocus() {
          var container = $(this.listViewContainer);
          if (container.find('li').filter('.focused-item').length === 0) return;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC9jb250cm9scy9saXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVE7QUFBZTtBQUFVO0FBQWE7O0FBQ3ZDOzs7c0JBRU0sZUFJVixTQUFTLEVBQUMsb0JBQW9CLFlBQVksTUFBWixFQUE5QixXQUNBLFNBQVMsRUFBQyxvQkFBb0IsWUFBWSxNQUFaLEVBQTlCLFdBQ0EsU0FBUyxFQUFDLG9CQUFvQixZQUFZLE1BQVosRUFBOUI7aUJBTlU7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBUVgscUNBQWE7O0FBUkYsdUJBYVgsNkJBQVMsUUFBTzs7QUFFWixjQUFJLE9BQU8sSUFBUCxDQUZROztBQUlaLFlBQUUsTUFBRixFQUFVLEVBQVYsQ0FBYyxPQUFkLEVBQXVCLFVBQVMsSUFBVCxFQUFlO0FBQ3BDLGdCQUFJLENBQUMsQ0FBRSxLQUFLLE1BQUwsQ0FBRixDQUFlLE9BQWYsQ0FBdUIsWUFBdkIsRUFBcUMsTUFBckMsR0FBNEMsQ0FBNUMsSUFBaUQsRUFBRSxLQUFLLE1BQUwsQ0FBRixDQUFlLFFBQWYsQ0FBd0IsV0FBeEIsQ0FBbEQsRUFDRixPQURGO0FBRUEsaUJBQUssT0FBTCxHQUFlLEtBQWYsQ0FIb0M7V0FBZixDQUF2QixDQUpZOztBQVdaLGNBQUksRUFBRSxpQkFBRixFQUFxQixNQUFyQixLQUE4QixDQUE5QixFQUNGLE9BREY7QUFFQSxZQUFFLGlCQUFGLEVBQXFCLENBQXJCLEVBQXdCLGdCQUF4QixDQUF5QyxTQUF6QyxFQUFvRCxVQUFVLENBQVYsRUFBYTtBQU0vRCxnQkFBSSxZQUFZLEVBQUUsSUFBRixDQUFaLENBTjJEOztBQVEvRCxnQkFBSSxVQUFVLElBQVYsQ0FBZSxJQUFmLEVBQXFCLE1BQXJCLEtBQThCLENBQTlCLEVBQ0YsT0FERjs7QUFHQSxvQkFBUSxFQUFFLE9BQUY7O0FBRU4sbUJBQUssRUFBTDtBQUNFLG9CQUFJLFVB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QixZQUFFLFVBQVUsSUFBVixDQUFlLElBQWYsRUFBcUIsU0FBckIsQ0FBRixFQUFtQyxJQUFuQyxDQUF3QyxRQUF4QyxFQUFrRCxLQUFsRCxHQUEwRCxLQUExRCxHQU5rQjs7O0FBdEdULHVCQStHWCxtQ0FBYTtBQUNYLGNBQUksWUFBWSxFQUFFLEtBQUssaUJBQUwsQ0FBZCxDQURPO0FBRVgsY0FBSSxVQUFVLElBQVYsQ0FBZSxJQUFmLEVBQXFCLE1BQXJCLENBQTRCLGVBQTVCLEVBQTZDLE1BQTdDLEtBQXNELENBQXRELEVBQ0YsT0FERjtBQUVBLG9CQUFVLElBQVYsQ0FBZSxJQUFmLEVBQXFCLE1BQXJCLENBQTRCLGVBQTVCLEVBQTZDLEtBQTdDLEdBQXFELElBQXJELENBQTBELFFBQTFELEVBQW9FLEtBQXBFLEdBQTRFLElBQTVFLEdBSlc7QUFLWCxvQkFBVSxJQUFWLENBQWUsSUFBZixFQUFxQixNQUFyQixDQUE0QixlQUE1QixFQUE2QyxXQUE3QyxDQUF5RCxjQUF6RCxFQUxXOzs7ZUEvR0Y7Z0ZBQ1Y7OztpQkFBaUI7OytFQUNqQjs7O2lCQUFpQjs7dUZBQ2pCOzs7aUJBQXlCIiwiZmlsZSI6ImxheW91dC9jb250cm9scy9saXN0LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
