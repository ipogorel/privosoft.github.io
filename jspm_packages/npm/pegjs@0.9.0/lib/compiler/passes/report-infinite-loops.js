/* */ 
"use strict";
var GrammarError = require('../../grammar-error'),
    asts = require('../asts'),
    visitor = require('../visitor');
function reportInfiniteLoops(ast) {
  var check = visitor.build({
    zero_or_more: function(node) {
      if (!asts.alwaysAdvancesOnSuccess(ast, node.expression)) {
        throw new GrammarError("Infinite loop detected.", node.location);
      }
    },
    one_or_more: function(node) {
      if (!asts.alwaysAdvancesOnSuccess(ast, node.expression)) {
        throw new GrammarError("Infinite loop detected.", node.location);
      }
    }
  });
  check(ast);
}
module.exports = reportInfiniteLoops;
