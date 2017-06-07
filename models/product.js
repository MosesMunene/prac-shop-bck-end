var mongoose = require('mongoose');

var ProductSchema = mongoose.Schema({
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'CategorySchema', required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
})

module.exports = mongoose.model("Product", ProductSchema);