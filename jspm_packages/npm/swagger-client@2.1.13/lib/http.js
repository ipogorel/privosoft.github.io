/* */ 
(function(process) {
  'use strict';
  var helpers = require('./helpers');
  var request = require('superagent');
  var jsyaml = require('js-yaml');
  var _ = {isObject: require('lodash-compat/lang/isObject')};
  var JQueryHttpClient = function() {
    this.type = 'JQueryHttpClient';
  };
  var SuperagentHttpClient = function() {
    this.type = 'SuperagentHttpClient';
  };
  var SwaggerHttp = module.exports = function() {};
  SwaggerHttp.prototype.execute = function(obj, opts) {
    var client;
    if (opts && opts.client) {
      client = opts.client;
    } else {
      client = new SuperagentHttpClient(opts);
    }
    client.opts = opts || {};
    var hasJQuery = false;
    if (typeof window !== 'undefined') {
      if (typeof window.jQuery !== 'undefined') {
        hasJQuery = true;
      }
    }
    if (obj.method.toLowerCase() === 'options' && client.type === 'SuperagentHttpClient') {
      log('forcing jQuery as OPTIONS are not supported by SuperAgent');
      obj.useJQuery = true;
    }
    if (this.isInternetExplorer() && (obj.useJQuery === false || !hasJQuery)) {
      throw new Error('Unsupported configuration! JQuery is required but not available');
    }
    if ((obj && obj.useJQuery === true) || this.isInternetExplorer() && hasJQuery) {
      client = new JQueryHttpClient(opts);
    }
    var success = obj.on.response;
    var requestInterceptor = function(data) {
      if (opts && opts.requestInterceptor) {
        data = opts.requestInterceptor.apply(data);
      }
      return data;
    };
    var responseInterceptor = function(data) {
      if (opts && opts.responseInterceptor) {
        data = opts.responseInterceptor.apply(data);
      }
      return success(data);
    };
    obj.on.response = function(data) {
      responseInterceptor(data);
    };
    if (_.isObject(obj) && _.isObject(obj.body)) {
      if (obj.body.type && obj.body.type === 'formData') {
        obj.contentType = false;
        obj.processData = false;
        delete obj.headers['Content-Type'];
      } else {
        obj.body = JSON.stringify(obj.body);
      }
    }
    obj = requestInterceptor(obj) || obj;
    if (obj.beforeSend) {
      obj.beforeSend(function(_obj) {
        client.execute(_obj || obj);
      });
    } else {
      client.execute(obj);
    }
    return (obj.deferred) ? obj.deferred.promise : obj;
  };
  SwaggerHttp.prototype.isInternetExplorer = function() {
    var detectedIE = false;
    if (typeof navigator !== 'undefined' && navigator.userAgent) {
      var nav = navigator.userAgent.toLowerCase();
      if (nav.indexOf('msie') !== -1) {
        var version = parseInt(nav.split('msie')[1]);
        if (version <= 8) {
          detectedIE = true;
        }
      }
    }
    return detectedIE;
  };
  JQueryHttpClient.prototype.execute = function(obj) {
    var jq = this.jQuery || (typeof window !== 'undefined' && window.jQuery);
    var cb = obj.on;
    var request = obj;
    if (typeof jq === 'undefined' || jq === false) {
      throw new Error('Unsupported configuration! JQuery is required but not available');
    }
    obj.type = obj.method;
    obj.cache = false;
    delete obj.useJQuery;
    obj.data = obj.body;
    delete obj.body;
    obj.complete = function(response) {
      var headers = {};
      var headerArray = response.getAllResponseHeaders().split('\n');
      for (var i = 0; i < headerArray.length; i++) {
        var toSplit = headerArray[i].trim();
        if (toSplit.length === 0) {
          continue;
        }
        var separator = toSplit.indexOf(':');
        if (separator === -1) {
          headers[toSplit] = null;
          continue;
        }
        var name = toSplit.substring(0, separator).trim();
        var value = toSplit.substring(separator + 1).trim();
        headers[name] = value;
      }
      var out = {
        url: request.url,
        method: request.method,
        status: response.status,
        statusText: response.statusText,
        data: response.responseText,
        headers: headers
      };
      try {
        var possibleObj = response.responseJSON || jsyaml.safeLoad(response.responseText);
        out.obj = (typeof possibleObj === 'string') ? {} : possibleObj;
      } catch (ex) {
        helpers.log('unable to parse JSON/YAML content');
      }
      out.obj = out.obj || null;
      if (response.status >= 200 && response.status < 300) {
        cb.response(out);
      } else if (response.status === 0 || (response.status >= 400 && response.status < 599)) {
        cb.error(out);
      } else {
        return cb.response(out);
      }
    };
    jq.support.cors = true;
    return jq.ajax(obj);
  };
  SuperagentHttpClient.prototype.execute = function(obj) {
    var method = obj.method.toLowerCase();
    if (method === 'delete') {
      method = 'del';
    }
    var headers = obj.headers || {};
    var r = request[method](obj.url);
    var name;
    for (name in headers) {
      r.set(name, headers[name]);
    }
    if (obj.enableCookies) {
      r.withCredentials();
    }
    if (obj.body) {
      r.send(obj.body);
    }
    if (typeof r.buffer === 'function') {
      r.buffer();
    }
    r.end(function(err, res) {
      res = res || {
        status: 0,
        headers: {error: 'no response from server'}
      };
      var response = {
        url: obj.url,
        method: obj.method,
        headers: res.headers
      };
      var cb;
      if (!err && res.error) {
        err = res.error;
      }
      if (err && obj.on && obj.on.error) {
        response.errObj = err;
        response.status = res ? res.status : 500;
        response.statusText = res ? res.text : err.message;
        if (res.headers && res.headers['content-type']) {
          if (res.headers['content-type'].indexOf('application/json') >= 0) {
            try {
              response.obj = JSON.parse(response.statusText);
            } catch (e) {
              response.obj = null;
            }
          }
        }
        cb = obj.on.error;
      } else if (res && obj.on && obj.on.response) {
        var possibleObj;
        if (res.body && Object.keys(res.body).length > 0) {
          possibleObj = res.body;
        } else {
          try {
            possibleObj = jsyaml.safeLoad(res.text);
            possibleObj = (typeof possibleObj === 'string') ? null : possibleObj;
          } catch (e) {
            helpers.log('cannot parse JSON/YAML content');
          }
        }
        response.obj = (typeof possibleObj === 'object') ? possibleObj : null;
        response.status = res.status;
        response.statusText = res.text;
        cb = obj.on.response;
      }
      response.data = response.statusText;
      if (cb) {
        cb(response);
      }
    });
  };
})(require('process'));
