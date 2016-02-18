
// var user = require('./user')(client)
// var expect = require("chai").expect;
// var test = require("../public/javascript/stockinfo");






// describe("Currency Code Converter", function() {
//   describe("Returns correct currency symbol", function() {
//     it("converts currency code (letters) to currency symbol", function() {

//       var USD  = currency_formatting('usd');
//       var EUR  = currency_formatting('eur');
//       var GBP  = currency_formatting('gbp');
//       var INR  = currency_formatting('inr');
//       var JPY  = currency_formatting('jpy');
//       var KRW  = currency_formatting('krw');
//       var NGN  = currency_formatting('ngn');
//       var PHP  = currency_formatting('php');
//       var THB  = currency_formatting('thb');
//       var VND  = currency_formatting('vnd');

//       expect(USD).to.equal("$");
//       expect(EUR).to.equal("€");
//       expect(GBP).to.equal("£");
//       expect(INR).to.equal("₹");
//       expect(JPY).to.equal("¥");
//       expect(KRW).to.equal("₩");
//       expect(NGN).to.equal("₦");
//       expect(PHP).to.equal("₱");
//       expect(THB).to.equal("฿");
//       expect(VND).to.equal("₫");

//     });
//   });
// });
///////////////////////////////////////////////////////////////////////////////////////
describe("validPriceTarget", function() {
  describe('Price Target Function working properly', function() {

  	it('should identify that the input data is null', function () {
  		var test = validPriceTarget(null, '200 (+100%)', 100);
  		expect(test).to.equal(1);
  	});

    it('should acknowledge price target and jQuery accordingly', function () {
      var test = validPriceTarget(200, '200 (+100%)', 100);
      expect(test).to.equal(2);
    });

    it('should acknowledge price target and jQuery accordingly', function () {
      var test = validPriceTarget(100, '200 (+100%)', 200);
      expect(test).to.equal(3);
    });

  });
});

// ///////////////////////////////////////////////////////////////////////////////////////
// describe("Peer Growth", function() {
//   describe('Ensures correct formatting and rendering of peer data', function() {

//     it('should identify that the input data is invalid', function () {
//       var test = peerGrowth(null, 14, 10);
//       expect(test).to.equal(1);
//     });
//   });
// });










