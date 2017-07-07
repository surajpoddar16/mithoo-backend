var expect = require('chai').expect;
var avatar = require('../main-modules/avatar');

describe('Avatar Generator', function() {
  it("generate a new avatar", function() {
    var myAvatar = avatar.getNewAvatar();

    expect(myAvatar.name).to.be.a('string');
    expect(myAvatar.profileImage).to.be.a('string');
  });
});
