'use strict';

System.register(['./data-service', '../../helpers/data-helper', '../query', 'aurelia-framework', 'aurelia-fetch-client', './../query-expression-evaluator', 'lodash'], function (_export, _context) {
  var DataService, DataHelper, Query, inject, transient, HttpClient, QueryExpressionEvaluator, lodash, _dec, _dec2, _class, StaticJsonDataService;

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
    setters: [function (_dataService) {
      DataService = _dataService.DataService;
    }, function (_helpersDataHelper) {
      DataHelper = _helpersDataHelper.DataHelper;
    }, function (_query) {
      Query = _query.Query;
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
      _export('StaticJsonDataService', StaticJsonDataService = (_dec = transient(), _dec2 = inject(HttpClient), _dec(_class = _dec2(_class = function (_DataService) {
        _inherits(StaticJsonDataService, _DataService);

        function StaticJsonDataService(http) {
          _classCallCheck(this, StaticJsonDataService);

          var _this = _possibleConstructorReturn(this, _DataService.call(this));

          http.configure(function (config) {
            config.useStandardConfiguration();
          });
          _this._http = http;
          return _this;
        }

        StaticJsonDataService.prototype.read = function read(options) {
          var _this2 = this;

          return this._http.fetch(this.url).then(function (response) {
            return response.json();
          }).then(function (jsonData) {
            var d = jsonData;
            d = _this2.dataMapper ? _this2.dataMapper(d) : d;
            if (options.filter) {
              var evaluator = new QueryExpressionEvaluator();
              d = evaluator.evaluate(d, options.filter);
            }
            var total = d.length;
            var l = options.skip + options.take;
            d = l ? _.slice(d, options.skip, l > d.length ? d.length : l) : d;
            if (options.fields && options.fields.length > 0) d = _.map(d, function (item) {
              return _.pick(item, options.fields);
            });
            return {
              data: DataHelper.deserializeDates(d),
              total: _this2.totalMapper ? _this2.totalMapper(jsonData) : total
            };
          });
        };

        return StaticJsonDataService;
      }(DataService)) || _class) || _class));

      _export('StaticJsonDataService', StaticJsonDataService);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvc2VydmljZS9zdGF0aWMtanNvbi1kYXRhLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFROztBQUNBOztBQUNBOztBQUNBO0FBQVE7O0FBQ1I7O0FBQ0E7O0FBQ0Q7Ozt1Q0FJTSxnQ0FGWixxQkFDQSxPQUFPLFVBQVA7a0JBQ1k7O0FBQ1gsaUJBRFcscUJBQ1gsQ0FBWSxJQUFaLEVBQWtCO2dDQURQLHVCQUNPOzt1REFDaEIseUJBRGdCOztBQUVoQixlQUFLLFNBQUwsQ0FBZSxrQkFBVTtBQUN2QixtQkFBTyx3QkFBUCxHQUR1QjtXQUFWLENBQWYsQ0FGZ0I7QUFLaEIsZ0JBQUssS0FBTCxHQUFhLElBQWIsQ0FMZ0I7O1NBQWxCOztBQURXLHdDQVVYLHFCQUFLLFNBQVM7OztBQUNaLGlCQUFPLEtBQUssS0FBTCxDQUNKLEtBREksQ0FDRSxLQUFLLEdBQUwsQ0FERixDQUVKLElBRkksQ0FFQyxvQkFBWTtBQUNoQixtQkFBTyxTQUFTLElBQVQsRUFBUCxDQURnQjtXQUFaLENBRkQsQ0FLSixJQUxJLENBS0Msb0JBQVk7QUFDaEIsZ0JBQUksSUFBSSxRQUFKLENBRFk7QUFFaEIsZ0JBQUksT0FBSyxVQUFMLEdBQWlCLE9BQUssVUFBTCxDQUFnQixDQUFoQixDQUFqQixHQUFzQyxDQUF0QyxDQUZZO0FBR2hCLGdCQUFJLFFBQVEsTUFBUixFQUFlO0FBQ2pCLGtCQUFJLFlBQVksSUFBSSx3QkFBSixFQUFaLENBRGE7QUFFakIsa0JBQUksVUFBVSxRQUFWLENBQW1CLENBQW5CLEVBQXNCLFFBQVEsTUFBUixDQUExQixDQUZpQjthQUFuQjtBQUlBLGdCQUFJLFFBQVEsRUFBRSxNQUFGLENBUEk7QUFRaEIsZ0JBQUksSUFBSSxRQUFRLElBQVIsR0FBZSxRQUFRLElBQVIsQ0FSUDtBQVNoQixnQkFBSSxJQUFHLEVBQUUsS0FBRixDQUFRLENBQVIsRUFBVyxRQUFRLElBQVIsRUFBZSxJQUFFLEVBQUUsTUFBRixHQUFTLEVBQUUsTUFBRixHQUFTLENBQXBCLENBQTdCLEdBQXVELENBQXZELENBVFk7QUFVaEIsZ0JBQUksUUFBUSxNQUFSLElBQWtCLFFBQVEsTUFBUixDQUFlLE1BQWYsR0FBc0IsQ0FBdEIsRUFDcEIsSUFBSSxFQUFFLEdBQUYsQ0FBTSxDQUFOLEVBQVMsZ0JBQU87QUFDbEIscUJBQU8sRUFBRSxJQUFGLENBQU8sSUFBUCxFQUFhLFFBQVEsTUFBUixDQUFwQixDQURrQjthQUFQLENBQWIsQ0FERjtBQUlBLG1CQUFPO0FBQ0wsb0JBQU0sV0FBVyxnQkFBWCxDQUE0QixDQUE1QixDQUFOO0FBQ0EscUJBQVEsT0FBSyxXQUFMLEdBQWtCLE9BQUssV0FBTCxDQUFpQixRQUFqQixDQUFsQixHQUErQyxLQUEvQzthQUZWLENBZGdCO1dBQVosQ0FMUixDQURZOzs7ZUFWSDtRQUE4QiIsImZpbGUiOiJkYXRhL3NlcnZpY2Uvc3RhdGljLWpzb24tZGF0YS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
