var mongoose = require('mongoose');
var User = require('./models/user');
var db = mongoose.connect('mongodb://localhost/prac_shop');

var testUserDetails = { firstName: 'merchant', lastName: 'one', email: 'mone@test.com', password: 'password', role:'merchant' };

createTestUser(testUserDetails);

function createTestUser(userDetails) {
    User.create(userDetails).then(function (docs) {
        console.log(docs);
        db.connection.close();
    }).catch(function (err) {
        console.log(err);
        db.connection.close();
    })
}
