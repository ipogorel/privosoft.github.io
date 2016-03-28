'use strict';

System.register(['../data/data-service', '../helpers/data-helper', '../data/query', 'aurelia-framework', 'aurelia-fetch-client'], function (_export, _context) {
    var DataService, DataHelper, Query, inject, transient, HttpClient, _createClass, _dec, _dec2, _class, JsonDataService;

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

            _export('JsonDataService', JsonDataService = (_dec = transient(), _dec2 = inject(HttpClient), _dec(_class = _dec2(_class = function (_DataService) {
                _inherits(JsonDataService, _DataService);

                function JsonDataService(http, configuration) {
                    _classCallCheck(this, JsonDataService);

                    var _this = _possibleConstructorReturn(this, _DataService.call(this));

                    http.configure(function (config) {
                        config.useStandardConfiguration();
                    });
                    _this._http = http;
                    _this._configuration = configuration;
                    return _this;
                }

                JsonDataService.prototype.read = function read(options) {
                    var _this2 = this;

                    var url = this.configuration.url + (this.configuration.queryMapper ? this.configuration.queryMapper(options) : "");
                    return this._http.fetch(this.configuration.url).then(function (response) {
                        return response.json();
                    }).then(function (jsonData) {
                        return {
                            data: _this2.configuration.dataMapper ? _this2.configuration.dataMapper(jsonData) : jsonData,
                            total: _this2.configuration.totalMapper ? _this2.configuration.totalMapper(jsonData) : jsonData.length
                        };
                    });
                };

                _createClass(JsonDataService, [{
                    key: 'configuration',
                    get: function get() {
                        return this._configuration;
                    }
                }]);

                return JsonDataService;
            }(DataService)) || _class) || _class));

            _export('JsonDataService', JsonDataService);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvanNvbi1kYXRhLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFROztBQUNBOztBQUNBOztBQUNBO0FBQVE7O0FBQ1I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1Q0FJSywwQkFGWixxQkFDQSxPQUFPLFVBQVA7MEJBQ1k7O0FBQ1QseUJBRFMsZUFDVCxDQUFZLElBQVosRUFBa0IsYUFBbEIsRUFBaUM7MENBRHhCLGlCQUN3Qjs7aUVBQy9CLHlCQUQrQjs7QUFFN0IseUJBQUssU0FBTCxDQUFlLGtCQUFVO0FBQ3JCLCtCQUFPLHdCQUFQLEdBRHFCO3FCQUFWLENBQWYsQ0FGNkI7QUFLN0IsMEJBQUssS0FBTCxHQUFhLElBQWIsQ0FMNkI7QUFNL0IsMEJBQUssY0FBTCxHQUFzQixhQUF0QixDQU4rQjs7aUJBQWpDOztBQURTLDBDQVlULHFCQUFLLFNBQVM7OztBQUNWLHdCQUFJLE1BQU0sS0FBSyxhQUFMLENBQW1CLEdBQW5CLElBQTBCLEtBQUssYUFBTCxDQUFtQixXQUFuQixHQUFnQyxLQUFLLGFBQUwsQ0FBbUIsV0FBbkIsQ0FBK0IsT0FBL0IsQ0FBaEMsR0FBMEUsRUFBMUUsQ0FBMUIsQ0FEQTtBQUVWLDJCQUFPLEtBQUssS0FBTCxDQUNGLEtBREUsQ0FDSSxLQUFLLGFBQUwsQ0FBbUIsR0FBbkIsQ0FESixDQUVGLElBRkUsQ0FFRyxvQkFBWTtBQUFDLCtCQUFPLFNBQVMsSUFBVCxFQUFQLENBQUQ7cUJBQVosQ0FGSCxDQUdGLElBSEUsQ0FHRyxvQkFBWTtBQUNkLCtCQUFPO0FBQ0wsa0NBQU8sT0FBSyxhQUFMLENBQW1CLFVBQW5CLEdBQStCLE9BQUssYUFBTCxDQUFtQixVQUFuQixDQUE4QixRQUE5QixDQUEvQixHQUF5RSxRQUF6RTtBQUNQLG1DQUFRLE9BQUssYUFBTCxDQUFtQixXQUFuQixHQUFnQyxPQUFLLGFBQUwsQ0FBbUIsV0FBbkIsQ0FBK0IsUUFBL0IsQ0FBaEMsR0FBMkUsU0FBUyxNQUFUO3lCQUZyRixDQURjO3FCQUFaLENBSFYsQ0FGVTs7OzZCQVpMOzt3Q0FVVTtBQUFDLCtCQUFPLEtBQUssY0FBTCxDQUFSOzs7O3VCQVZWO2NBQXdCIiwiZmlsZSI6ImRhdGEvanNvbi1kYXRhLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
