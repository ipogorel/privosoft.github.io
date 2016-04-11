/* */ 
(function() {
  "use strict";
  var btoa = require('./index'),
      encoded = "SGVsbG8sIBZM",
      unencoded = "Hello, 世界";
  ;
  if (encoded !== btoa(unencoded)) {
    console.error('[FAIL]', encoded, btoa(unencoded));
    return;
  }
  console.log('[PASS] all tests pass');
}());
