/* */ 
"use strict";
var arrays = require('./utils/arrays'),
    objects = require('./utils/objects');
var PEG = {
  VERSION: "0.9.0",
  GrammarError: require('./grammar-error'),
  parser: require('./parser'),
  compiler: require('./compiler'),
  buildParser: function(grammar) {
    function convertPasses(passes) {
      var converted = {},
          stage;
      for (stage in passes) {
        if (passes.hasOwnProperty(stage)) {
          converted[stage] = objects.values(passes[stage]);
        }
      }
      return converted;
    }
    var options = arguments.length > 1 ? objects.clone(arguments[1]) : {},
        plugins = "plugins" in options ? options.plugins : [],
        config = {
          parser: this.parser,
          passes: convertPasses(this.compiler.passes)
        };
    arrays.each(plugins, function(p) {
      p.use(config, options);
    });
    return this.compiler.compile(config.parser.parse(grammar), config.passes, options);
  }
};
module.exports = PEG;
