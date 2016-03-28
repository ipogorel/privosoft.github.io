'use strict';

System.register(['moment'], function (_export, _context) {
  var moment, DateFormatValueConverter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_moment) {
      moment = _moment.default;
    }],
    execute: function () {
      _export('DateFormatValueConverter', DateFormatValueConverter = function () {
        function DateFormatValueConverter() {
          _classCallCheck(this, DateFormatValueConverter);
        }

        DateFormatValueConverter.prototype.toView = function toView(value, format) {
          return moment(value).format(format);
        };

        return DateFormatValueConverter;
      }());

      _export('DateFormatValueConverter', DateFormatValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlbHBlcnMvY29udmVydGVycy9kYXRlLWZvcm1hdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQU87OzswQ0FFTTs7Ozs7MkNBQ1gseUJBQU8sT0FBTyxRQUFRO0FBQ3BCLGlCQUFPLE9BQU8sS0FBUCxFQUFjLE1BQWQsQ0FBcUIsTUFBckIsQ0FBUCxDQURvQjs7O2VBRFgiLCJmaWxlIjoiaGVscGVycy9jb252ZXJ0ZXJzL2RhdGUtZm9ybWF0LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
