/* */ 
"use strict";
var arrays = require('../../utils/arrays'),
    GrammarError = require('../../grammar-error'),
    asts = require('../asts'),
    visitor = require('../visitor');
function reportLeftRecursion(ast) {
  var visitedRules = [];
  var check = visitor.build({
    rule: function(node) {
      visitedRules.push(node.name);
      check(node.expression);
      visitedRules.pop(node.name);
    },
    sequence: function(node) {
      arrays.every(node.elements, function(element) {
        check(element);
        return !asts.alwaysAdvancesOnSuccess(ast, element);
      });
    },
    rule_ref: function(node) {
      if (arrays.contains(visitedRules, node.name)) {
        throw new GrammarError("Left recursion detected for rule \"" + node.name + "\".", node.location);
      }
      check(asts.findRule(ast, node.name));
    }
  });
  check(ast);
}
module.exports = reportLeftRecursion;
