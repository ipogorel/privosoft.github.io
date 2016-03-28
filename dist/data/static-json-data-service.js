'use strict';

System.register(['../data/data-service', '../helpers/data-helper', '../data/query', 'aurelia-framework', 'aurelia-fetch-client', './query-expression-evaluator', 'lodash'], function (_export, _context) {
  var DataService, DataHelper, Query, inject, transient, HttpClient, QueryExpressionEvaluator, lodash, _createClass, _dec, _dec2, _class, StaticJsonDataService;

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
    setters: [function (_dataDataService) {
      DataService = _dataDataService.DataService;
    }, function (_helpersDataHelper) {
      DataHelper = _helpersDataHelper.DataHelper;
    }, function (_dataQuery) {
      Query = _dataQuery.Query;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      transient = _aureliaFramework.transient;
    }, function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
    }, function (_queryExpressionEvaluator) {
      QueryExpressionEvaluator = _queryExpressionEvaluator.QueryExpressionEvaluator;
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

      _export('StaticJsonDataService', StaticJsonDataService = (_dec = transient(), _dec2 = inject(HttpClient), _dec(_class = _dec2(_class = function (_DataService) {
        _inherits(StaticJsonDataService, _DataService);

        function StaticJsonDataService(http, configuration) {
          _classCallCheck(this, StaticJsonDataService);

          var _this = _possibleConstructorReturn(this, _DataService.call(this));

          http.configure(function (config) {
            config.useStandardConfiguration();
          });
          _this._http = http;
          _this._configuration = configuration;
          return _this;
        }

        StaticJsonDataService.prototype.read = function read(options) {
          var _this2 = this;

          var url = this.configuration.url;
          return this._http.fetch(this.configuration.url).then(function (response) {
            return response.json();
          }).then(function (jsonData) {
            var d = jsonData;
            d = _this2.configuration.dataMapper ? _this2.configuration.dataMapper(d) : d;
            if (options.filter) {
              var evaluator = new QueryExpressionEvaluator();
              d = evaluator.evaluate(d, options.filter);
            }
            var l = options.skip + options.take;
            d = l ? _.slice(d, options.skip, l > d.length ? d.length : l) : d;
            if (options.fields && options.fields.length > 0) d = _.map(d, function (item) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvc3RhdGljLWpzb24tZGF0YS1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBUTs7QUFDQTs7QUFDQTs7QUFDQTtBQUFROztBQUNSOztBQUNBOztBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUNBSU0sZ0NBRloscUJBQ0EsT0FBTyxVQUFQO2tCQUNZOztBQUNYLGlCQURXLHFCQUNYLENBQVksSUFBWixFQUFrQixhQUFsQixFQUFpQztnQ0FEdEIsdUJBQ3NCOzt1REFDL0IseUJBRCtCOztBQUUvQixlQUFLLFNBQUwsQ0FBZSxrQkFBVTtBQUN2QixtQkFBTyx3QkFBUCxHQUR1QjtXQUFWLENBQWYsQ0FGK0I7QUFLL0IsZ0JBQUssS0FBTCxHQUFhLElBQWIsQ0FMK0I7QUFNL0IsZ0JBQUssY0FBTCxHQUFzQixhQUF0QixDQU4rQjs7U0FBakM7O0FBRFcsd0NBWVgscUJBQUssU0FBUzs7O0FBQ1osY0FBSSxNQUFNLEtBQUssYUFBTCxDQUFtQixHQUFuQixDQURFO0FBRVosaUJBQU8sS0FBSyxLQUFMLENBQ0osS0FESSxDQUNFLEtBQUssYUFBTCxDQUFtQixHQUFuQixDQURGLENBRUosSUFGSSxDQUVDLG9CQUFZO0FBQUMsbUJBQU8sU0FBUyxJQUFULEVBQVAsQ0FBRDtXQUFaLENBRkQsQ0FHSixJQUhJLENBR0Msb0JBQVk7QUFDaEIsZ0JBQUksSUFBSSxRQUFKLENBRFk7QUFFaEIsZ0JBQUksT0FBSyxhQUFMLENBQW1CLFVBQW5CLEdBQStCLE9BQUssYUFBTCxDQUFtQixVQUFuQixDQUE4QixDQUE5QixDQUEvQixHQUFrRSxDQUFsRSxDQUZZO0FBR2hCLGdCQUFJLFFBQVEsTUFBUixFQUFlO0FBQ2pCLGtCQUFJLFlBQVksSUFBSSx3QkFBSixFQUFaLENBRGE7QUFFakIsa0JBQUksVUFBVSxRQUFWLENBQW1CLENBQW5CLEVBQXNCLFFBQVEsTUFBUixDQUExQixDQUZpQjthQUFuQjtBQUlBLGdCQUFJLElBQUksUUFBUSxJQUFSLEdBQWUsUUFBUSxJQUFSLENBUFA7QUFRaEIsZ0JBQUksSUFBRyxFQUFFLEtBQUYsQ0FBUSxDQUFSLEVBQVcsUUFBUSxJQUFSLEVBQWUsSUFBRSxFQUFFLE1BQUYsR0FBUyxFQUFFLE1BQUYsR0FBUyxDQUFwQixDQUE3QixHQUF1RCxDQUF2RCxDQVJZO0FBU2hCLGdCQUFJLFFBQVEsTUFBUixJQUFrQixRQUFRLE1BQVIsQ0FBZSxNQUFmLEdBQXNCLENBQXRCLEVBQ3BCLElBQUksRUFBRSxHQUFGLENBQU0sQ0FBTixFQUFTLGdCQUFPO0FBQ2xCLHFCQUFPLEVBQUUsSUFBRixDQUFPLElBQVAsRUFBYSxRQUFRLE1BQVIsQ0FBcEIsQ0FEa0I7YUFBUCxDQUFiLENBREY7QUFJQSxtQkFBTztBQUNMLG9CQUFNLFdBQVcsZ0JBQVgsQ0FBNEIsQ0FBNUIsQ0FBTjtBQUNBLHFCQUFRLE9BQUssYUFBTCxDQUFtQixXQUFuQixHQUFnQyxPQUFLLGFBQUwsQ0FBbUIsV0FBbkIsQ0FBK0IsUUFBL0IsQ0FBaEMsR0FBMkUsU0FBUyxNQUFUO2FBRnJGLENBYmdCO1dBQVosQ0FIUixDQUZZOzs7cUJBWkg7OzhCQVVRO0FBQUMsbUJBQU8sS0FBSyxjQUFMLENBQVI7Ozs7ZUFWUjtRQUE4QiIsImZpbGUiOiJkYXRhL3N0YXRpYy1qc29uLWRhdGEtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
