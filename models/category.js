var mongoose = require('mongoose');

var CategorySchema = mongoose.Schema({
    name: { type: String, required: true },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: "CategorySchema" },
    isRoot: { type: Boolean, required: true }
})

module.exports = mongoose.model("Category", CategorySchema);