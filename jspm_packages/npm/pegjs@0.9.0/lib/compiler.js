/* */ 
"use strict";
var arrays = require('./utils/arrays'),
    objects = require('./utils/objects');
var compiler = {
  passes: {
    check: {
      reportMissingRules: require('./compiler/passes/report-missing-rules'),
      reportLeftRecursion: require('./compiler/passes/report-left-recursion'),
      reportInfiniteLoops: require('./compiler/passes/report-infinite-loops')
    },
    transform: {removeProxyRules: require('./compiler/passes/remove-proxy-rules')},
    generate: {
      generateBytecode: require('./compiler/passes/generate-bytecode'),
      generateJavascript: require('./compiler/passes/generate-javascript')
    }
  },
  compile: function(ast, passes) {
    var options = arguments.length > 2 ? objects.clone(arguments[2]) : {},
        stage;
    objects.defaults(options, {
      allowedStartRules: [ast.rules[0].name],
      cache: false,
      trace: false,
      optimize: "speed",
      output: "parser"
    });
    for (stage in passes) {
      if (passes.hasOwnProperty(stage)) {
        arrays.each(passes[stage], function(p) {
          p(ast, options);
        });
      }
    }
    switch (options.output) {
      case "parser":
        return eval(ast.code);
      case "source":
        return ast.code;
    }
  }
};
module.exports = compiler;
