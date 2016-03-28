'use strict';

System.register(['fetch'], function (_export, _context) {
  return {
    setters: [function (_fetch) {}],
    execute: function () {
      function configure(aurelia) {
        aurelia.use.standardConfiguration().developmentLogging().plugin('aurelia-animator-css');

        aurelia.start().then(function (a) {
          return a.setRoot();
        });
      }

      _export('configure', configure);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRU8sZUFBUyxTQUFULENBQW1CLE9BQW5CLEVBQTRCO0FBQ2pDLGdCQUFRLEdBQVIsQ0FDRyxxQkFESCxHQUVHLGtCQUZILEdBR0csTUFISCxDQUdVLHNCQUhWLEVBRGlDOztBQU1qQyxnQkFBUSxLQUFSLEdBQWdCLElBQWhCLENBQXFCO2lCQUFLLEVBQUUsT0FBRjtTQUFMLENBQXJCLENBTmlDO09BQTVCIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
