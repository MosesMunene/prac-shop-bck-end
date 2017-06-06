//var passport = require('passport');
//var LocalStrategy = require("passport-local").Strategy;
var JWTStrategy = require("passport-jwt").Strategy;
var ExtractJWT = require("passport-jwt").ExtractJwt;
var User = require('./models/user');

module.exports = function (passport) {
    console.log("Setting up passport");
    passport.use(new JWTStrategy(
        { jwtFromRequest: ExtractJWT.fromAuthHeader(), secretOrKey: "secret" },
        function (jwt_payload, done) {
            User.findOne({ id: jwt_payload._id }, function (err, user) {
                if (err) {
                    return err;
                }
                if (user) {

                    done(null, user);
                } else {
                    done(null, false);
                }
            })
        }));

};