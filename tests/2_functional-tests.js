const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  suite('test functionality of application', () => {
    test('can convert valid input', (done) => {
      chai.request(server).get('/api/convert?input=10L').end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          "initNum":10,
          "initUnit":"L",
          "returnNum":2.64172,
          "returnUnit":"gal",
          "string":"10 liters converts to 2.64172 gallons"
        });
      });
      done();
    });


    test('error on invalid unit', (done) => {
      chai.request(server).get('/api/convert?input=32g').end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          "error": "invalid unit"
        })
      });
      done();
    });

    test('error on invalid number', (done) => {
      chai.request(server).get('/api/convert?input=3/7.2/4kg').end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { "error": "invalid number"});
      });
      done();
    });

    test('error on invalid number and unit', (done) => {
      chai.request(server).get('/api/convert?input=3/7.2/4kilomegagram').end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { "error": "invalid number and unit"});
      });
      done();
    });

    test('convert if no number given', (done) => {
      chai.request(server).get('/api/convert?input=kg').end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          "initNum": 1,
          "initUnit": "kg",
          "returnNum": 2.20462,
          "returnUnit": "lbs",
          "string": "1 kilograms converts to 2.20462 pounds"
        });
      });
      done();
    })
  });
});