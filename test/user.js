process.env.NODE_ENV = 'test';

var user = require('../main-modules/user');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app').app;
var expect = require('chai').expect;

chai.use(chaiHttp);
describe('User', function() {
  it("expects a new Avatar", function(done) {
    chai.request(server)
      .get('/user/avatar')
      .end(function(err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.status).to.equal(true);
        expect(res.body.message).to.be.a('string');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data.name).to.be.a('string');
        expect(res.body.data.profileImage).to.be.a('string');
        done();
      });
  });
});
