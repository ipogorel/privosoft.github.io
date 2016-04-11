/* */ 
'use strict';
var helpers = require('./helpers');
var btoa = require('btoa');
var CookieJar = require('cookiejar').CookieJar;
var _ = {
  each: require('lodash-compat/collection/each'),
  includes: require('lodash-compat/collection/includes'),
  isObject: require('lodash-compat/lang/isObject'),
  isArray: require('lodash-compat/lang/isArray')
};
var SwaggerAuthorizations = module.exports.SwaggerAuthorizations = function(authz) {
  this.authz = authz || {};
};
SwaggerAuthorizations.prototype.add = function(name, auth) {
  if (_.isObject(name)) {
    for (var key in name) {
      this.authz[key] = name[key];
    }
  } else if (typeof name === 'string') {
    this.authz[name] = auth;
  }
  return auth;
};
SwaggerAuthorizations.prototype.remove = function(name) {
  return delete this.authz[name];
};
SwaggerAuthorizations.prototype.apply = function(obj, securities) {
  var status = true;
  var applyAll = !securities;
  var flattenedSecurities = [];
  _.each(securities, function(obj, key) {
    if (typeof key === 'string') {
      flattenedSecurities.push(key);
    }
    _.each(obj, function(val, key) {
      flattenedSecurities.push(key);
    });
  });
  _.each(this.authz, function(auth, authName) {
    if (applyAll || _.includes(flattenedSecurities, authName)) {
      var newStatus = auth.apply(obj);
      status = status && !!newStatus;
    }
  });
  return status;
};
var ApiKeyAuthorization = module.exports.ApiKeyAuthorization = function(name, value, type) {
  this.name = name;
  this.value = value;
  this.type = type;
};
ApiKeyAuthorization.prototype.apply = function(obj) {
  if (this.type === 'query') {
    var qp;
    if (obj.url.indexOf('?') > 0) {
      qp = obj.url.substring(obj.url.indexOf('?') + 1);
      var parts = qp.split('&');
      if (parts && parts.length > 0) {
        for (var i = 0; i < parts.length; i++) {
          var kv = parts[i].split('=');
          if (kv && kv.length > 0) {
            if (kv[0] === this.name) {
              return false;
            }
          }
        }
      }
    }
    if (obj.url.indexOf('?') > 0) {
      obj.url = obj.url + '&' + this.name + '=' + this.value;
    } else {
      obj.url = obj.url + '?' + this.name + '=' + this.value;
    }
    return true;
  } else if (this.type === 'header') {
    if (typeof obj.headers[this.name] === 'undefined') {
      obj.headers[this.name] = this.value;
    }
    return true;
  }
};
var CookieAuthorization = module.exports.CookieAuthorization = function(cookie) {
  this.cookie = cookie;
};
CookieAuthorization.prototype.apply = function(obj) {
  obj.cookieJar = obj.cookieJar || new CookieJar();
  obj.cookieJar.setCookie(this.cookie);
  return true;
};
var PasswordAuthorization = module.exports.PasswordAuthorization = function(username, password) {
  if (arguments.length === 3) {
    helpers.log('PasswordAuthorization: the \'name\' argument has been removed, pass only username and password');
    username = arguments[1];
    password = arguments[2];
  }
  this.username = username;
  this.password = password;
};
PasswordAuthorization.prototype.apply = function(obj) {
  if (typeof obj.headers.Authorization === 'undefined') {
    obj.headers.Authorization = 'Basic ' + btoa(this.username + ':' + this.password);
  }
  return true;
};
