'use strict';

System.register(['./data-service', '../../helpers/data-helper', '../query', 'aurelia-framework', 'aurelia-fetch-client'], function (_export, _context) {
    var DataService, DataHelper, Query, inject, transient, HttpClient, _dec, _dec2, _class, JsonDataService;

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
        }],
        execute: function () {
            _export('JsonDataService', JsonDataService = (_dec = transient(), _dec2 = inject(HttpClient), _dec(_class = _dec2(_class = function (_DataService) {
                _inherits(JsonDataService, _DataService);

                function JsonDataService(http) {
                    _classCallCheck(this, JsonDataService);

                    var _this = _possibleConstructorReturn(this, _DataService.call(this));

                    http.configure(function (config) {
                        config.useStandardConfiguration();
                    });
                    _this._http = http;
                    return _this;
                }

                JsonDataService.prototype.read = function read(options) {
                    var _this2 = this;

                    var url = this.url + (this.queryMapper ? this.queryMapper(options) : "");
                    return this._http.fetch(this.url).then(function (response) {
                        return response.json();
                    }).then(function (jsonData) {
                        return {
                            data: _this2.dataMapper ? _this2.dataMapper(jsonData) : jsonData,
                            total: _this2.totalMapper ? _this2.totalMapper(jsonData) : jsonData.length
                        };
                    });
                };

                return JsonDataService;
            }(DataService)) || _class) || _class));

            _export('JsonDataService', JsonDataService);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvc2VydmljZS9qc29uLWRhdGEtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVE7O0FBQ0E7O0FBQ0E7O0FBQ0E7QUFBUTs7QUFDUjs7O3VDQUlLLDBCQUZaLHFCQUNBLE9BQU8sVUFBUDswQkFDWTs7QUFDVCx5QkFEUyxlQUNULENBQVksSUFBWixFQUFrQjswQ0FEVCxpQkFDUzs7aUVBQ2hCLHlCQURnQjs7QUFFZCx5QkFBSyxTQUFMLENBQWUsa0JBQVU7QUFDckIsK0JBQU8sd0JBQVAsR0FEcUI7cUJBQVYsQ0FBZixDQUZjO0FBS2QsMEJBQUssS0FBTCxHQUFhLElBQWIsQ0FMYzs7aUJBQWxCOztBQURTLDBDQVNULHFCQUFLLFNBQVM7OztBQUNWLHdCQUFJLE1BQU0sS0FBSyxHQUFMLElBQVksS0FBSyxXQUFMLEdBQWtCLEtBQUssV0FBTCxDQUFpQixPQUFqQixDQUFsQixHQUE4QyxFQUE5QyxDQUFaLENBREE7QUFFViwyQkFBTyxLQUFLLEtBQUwsQ0FDRixLQURFLENBQ0ksS0FBSyxHQUFMLENBREosQ0FFRixJQUZFLENBRUcsb0JBQVk7QUFBQywrQkFBTyxTQUFTLElBQVQsRUFBUCxDQUFEO3FCQUFaLENBRkgsQ0FHRixJQUhFLENBR0csb0JBQVk7QUFDZCwrQkFBTztBQUNMLGtDQUFPLE9BQUssVUFBTCxHQUFpQixPQUFLLFVBQUwsQ0FBZ0IsUUFBaEIsQ0FBakIsR0FBNkMsUUFBN0M7QUFDUCxtQ0FBUSxPQUFLLFdBQUwsR0FBa0IsT0FBSyxXQUFMLENBQWlCLFFBQWpCLENBQWxCLEdBQStDLFNBQVMsTUFBVDt5QkFGekQsQ0FEYztxQkFBWixDQUhWLENBRlU7Ozt1QkFUTDtjQUF3QiIsImZpbGUiOiJkYXRhL3NlcnZpY2UvanNvbi1kYXRhLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
