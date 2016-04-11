'use strict';

System.register(['aurelia-framework', 'aurelia-event-aggregator', 'jquery', 'bootstrap', './widget-content', './../../dsl/dsl-expression-manager-factory', './../../helpers/string-helper'], function (_export, _context) {
  var Container, Decorators, bindable, EventAggregator, $, bootstrap, WidgetContent, DslExpressionManagerFactory, StringHelper, _createClass, DslSearchBoxContent;

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
      Container = _aureliaFramework.Container;
      Decorators = _aureliaFramework.Decorators;
      bindable = _aureliaFramework.bindable;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_bootstrap) {
      bootstrap = _bootstrap.bootstrap;
    }, function (_widgetContent) {
      WidgetContent = _widgetContent.WidgetContent;
    }, function (_dslDslExpressionManagerFactory) {
      DslExpressionManagerFactory = _dslDslExpressionManagerFactory.DslExpressionManagerFactory;
    }, function (_helpersStringHelper) {
      StringHelper = _helpersStringHelper.StringHelper;
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

      _export('DslSearchBoxContent', DslSearchBoxContent = function (_WidgetContent) {
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
          var self = this;
          this._expressionManagerFactory.createInstance(this.widget.dataSource).then(function (x) {
            self.expressionManager = x;
            if (self.widget.state) {
              self.searchString = self.widget.state;
              self.suggestionsListSettings.displaySuggestions = false;
            }
          });
        };

        DslSearchBoxContent.prototype.attached = function attached() {
          var self = this;
          $(this.searchBox)[0].addEventListener("keydown", function (e) {
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

          $(function () {
            $('[data-toggle="tooltip"]').tooltip();
          });
        };

        DslSearchBoxContent.prototype.populateSuggestions = function populateSuggestions(searchStr) {
          var _this2 = this;

          searchStr = searchStr.substring(0, this.caretPosition);
          var lastWord = this.getLastWord(searchStr);
          this.suggestionsListSettings.title = '';
          this.expressionManager.populate(searchStr, lastWord).then(function (data) {
            _this2.suggestionsListSettings.suggestions = data;

            _this2.suggestionsListSettings.lastWord = lastWord;
            _this2.suggestionsListSettings.displaySuggestions = _this2.suggestionsListSettings.suggestions.length > 0;
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
          if (suggestion.type === 'string' || suggestion.type === 'array_string') value = "'" + value + "'";
          if (suggestion.type === 'array_string') {
            var openBraceExsits = false;
            for (var i = strLeft.trim().length; i >= 0; i--) {
              if (strLeft[i] === "(") {
                openBraceExsits = true;
                break;
              }
              if (strLeft[i] === ")") break;
            }
            if (!openBraceExsits) value = "(" + value;else {
              var lastChar = strLeft.trim().charAt(strLeft.trim().length - 1);
              if (lastChar !== '(' && lastChar !== ',') value = "," + value;
            }
          }
          if (suggestion.type === 'operator' && suggestion.value === 'in') value += " (";else value += " ";

          this.caretPosition = (strLeft + value).length;
          this.searchString = strLeft + value + strRight;
        };

        DslSearchBoxContent.prototype.getAssumptions = function getAssumptions(wrongString, suggestions) {
          var assumptions = [];
          for (var _iterator = suggestions, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var sg = _ref;

            assumptions.push({
              distance: StringHelper.getEditDistance(sg.value.substring(0, wrongString.length), wrongString),
              value: sg.value,
              type: sg.type
            });
          }
          assumptions = assumptions.sort(function (a, b) {
            if (a.distance > b.distance) return 1;
            if (a.distance < b.distance) return -1;
            return 0;
          }).splice(0, assumptions.length > 1 ? 1 : assumptions.length);

          return assumptions;
        };

        DslSearchBoxContent.prototype.getLastWord = function getLastWord(searchStr) {
          var str = StringHelper.getPreviousWord(searchStr, this.caretPosition, this._separators);
          for (var _iterator2 = this._specialSymbols, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
              if (_i2 >= _iterator2.length) break;
              _ref2 = _iterator2[_i2++];
            } else {
              _i2 = _iterator2.next();
              if (_i2.done) break;
              _ref2 = _i2.value;
            }

            var s = _ref2;

            str = StringHelper.replaceAll(str, "\\" + s, "");
          }return str.trim();
        };

        DslSearchBoxContent.prototype.notifySearchCriteriaChanged = function notifySearchCriteriaChanged() {
          if (this.isValid) {
            this.widget.state = this.searchString;
          }
          var self = this;
          self.assumptionString = "";
          window.clearTimeout(self._timer);
          self._timer = window.setTimeout(function () {
            if (self.isValid) {
              var searchExpression = '';
              if (self.searchString !== '') var searchExpression = self.expressionManager.parse(self.searchString);
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
            } else break;
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
            if (this.searchString === '' || !this.expressionManager) return true;
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
              window.setTimeout(function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC93aWRnZXRzL2RzbC1zZWFyY2gtYm94LWNvbnRlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFRO0FBQVc7QUFBWTs7QUFDdkI7O0FBQ0Q7O0FBQ0M7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQ0FHSzs7O0FBRVgsaUJBRlcsbUJBRVgsQ0FBWSxNQUFaLEVBQW1CO2dDQUZSLHFCQUVROzt1REFDakIsMEJBQU0sTUFBTixHQURpQjs7QUFFakIsY0FBSSxZQUFZLElBQUksU0FBSixFQUFaLENBRmE7QUFHakIsZ0JBQUsseUJBQUwsR0FBaUMsVUFBVSxHQUFWLENBQWMsMkJBQWQsQ0FBakMsQ0FIaUI7O0FBS2pCLGdCQUFLLGFBQUwsR0FBcUIsRUFBckIsQ0FMaUI7O0FBT2pCLGdCQUFLLGlCQUFMLEdBQXlCLEVBQXpCLENBUGlCO0FBUWpCLGdCQUFLLFFBQUwsR0FBZ0IsSUFBaEIsQ0FSaUI7QUFTakIsZ0JBQUssY0FBTCxHQUFzQixDQUF0QixDQVRpQjs7QUFXakIsZ0JBQUssV0FBTCxHQUFtQixDQUFDLEdBQUQsRUFBSyxHQUFMLENBQW5CLENBWGlCO0FBWWpCLGdCQUFLLGVBQUwsR0FBc0IsQ0FBQyxHQUFELEVBQUssR0FBTCxFQUFTLEdBQVQsRUFBYSxJQUFiLENBQXRCLENBWmlCOztBQWVqQixnQkFBSyxNQUFMLENBZmlCOztBQWlCakIsZ0JBQUssd0JBQUwsR0FBZ0M7QUFDOUIsbUJBQU0sRUFBTjtBQUNBLHlCQUFZLEVBQVo7QUFDQSwrQkFBbUIsQ0FBQyxDQUFEO0FBQ25CLGdDQUFvQixLQUFwQjtBQUNBLHNCQUFVLEVBQVY7V0FMRixDQWpCaUI7O1NBQW5COztBQUZXLHNDQTREWCw2QkFBUztBQUNMLGNBQUksT0FBTyxJQUFQLENBREM7QUFFTCxlQUFLLHlCQUFMLENBQStCLGNBQS9CLENBQThDLEtBQUssTUFBTCxDQUFZLFVB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QXJCLENBRCtCO0FBRS9CLG1CQUFLLG1CQUFMLENBQXlCLEtBQXpCLEVBRitCO0FBRy9CLG1CQUFLLDJCQUFMLEdBSCtCO2FBQWpDOzs7OzhCQU9pQjtBQUNqQixtQkFBTyxLQUFLLGNBQUwsQ0FEVTs7NEJBSUQsT0FBTTtBQUd0QixnQkFBSSxTQUFTLEtBQUssY0FBTCxFQUFxQjtBQUNoQyxrQkFBSSxPQUFPLElBQVAsQ0FENEI7QUFFaEMsbUJBQUssY0FBTCxHQUFzQixLQUF0QixDQUZnQztBQUdoQyxnQkFBRSxLQUFLLFNBQUwsQ0FBRixDQUFrQixDQUFsQixFQUFxQixLQUFyQixHQUhnQztBQUloQyxxQkFBTyxVQUFQLENBQWtCLFlBQUs7QUFDckIsa0JBQUUsS0FBSyxTQUFMLENBQUYsQ0FBa0IsQ0FBbEIsRUFBcUIsaUJBQXJCLENBQXVDLEtBQXZDLEVBQThDLEtBQTlDLEVBRHFCO2VBQUwsRUFFZixHQUZILEVBSmdDO2FBQWxDOzs7OzhCQWdMa0I7QUFDbEIsbUJBQVEsSUFBQyxDQUFLLGdCQUFMLElBQXlCLEVBQXpCLElBQWlDLENBQUMsS0FBSyx1QkFBTCxDQUE2QixrQkFBN0IsQ0FEekI7Ozs7ZUEzUVQ7UUFBNEIiLCJmaWxlIjoibGF5b3V0L3dpZGdldHMvZHNsLXNlYXJjaC1ib3gtY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
