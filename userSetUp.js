var mongoose = require('mongoose');
var User = require('./models/user');
var db = mongoose.connect('mongodb://localhost/prac_shop');

var testUserDetails = { firstName: 'test', lastName: 'user', email: 'user@test.com', password: 'password' };

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
