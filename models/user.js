var mongoose = require("mongoose");

var roles = ['customer', 'merchant', 'admin']
var UserSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: roles, required: true }
});

module.exports = mongoose.model("User", UserSchema)