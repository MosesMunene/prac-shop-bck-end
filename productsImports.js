var mongoose = require('mongoose');


var db = mongoose.connect('mongodb://localhost/prac_shop');
var Product = require('./models/product');
var Category = require('./models/category');


// setUpCategories().then(function (result) {
//     db.connection.close();
// }).catch(function (err) {
//     console.log(err);
//     db.connection.close();
// });

setUpProducts()
    .then(function (result) {
        db.connection.close();
    }).catch(function (err) {
        console.log(err);
        db.connection.close();
    });


function setUpCategories() {
    var startingCategories = [
        { name: "Books and Audible", parentCategory: null, isRoot: true },
        { name: "Music and Games", parentCategory: null, isRoot: true },
        { name: "Electronics and Computers", parentCategory: null, isRoot: true },
        { name: "Farming & Gardening", parentCategory: null, isRoot: true },
        { name: "Groceries", parentCategory: null, isRoot: true },
        { name: "Health", parentCategory: null, isRoot: true },
        { name: "Clothing and Jewelry", parentCategory: null, isRoot: true }
    ];

    var promise = new Promise(function (resolve, reject) {
        startingCategories.forEach(function (category) {
            category = new Category(category);
            category.save().then(function (category) {
                console.log(category);
            }).catch(function (err) {
                console.log(err);
            }, function (reason) {
                console.log(reason);
                reject(reason);
            })
        })
    });
    return promise;
}

function setUpProducts() {
    var products = [
        { name: "apache baseball shirt", category: "Clothing and Jewelry", description: "baseball shirt", price: 100 },
        { name: "apache baseball shirt", category: "Clothing and Jewelry", description: "baseball shirt", price: 100 },
        { name: "ror baseball shirt", category: "Clothing and Jewelry", description: "baseball shirt", price: 100 },
        { name: "ror spaghetti top", category: "Clothing and Jewelry", description: "spaghetti top", price: 100 },
        { name: "ror ringer shirt", category: "Clothing and Jewelry", description: "ringer shirt", price: 100 },
        { name: "ruby baseball shirt", category: "Clothing and Jewelry", description: "baseball shirt", price: 100 },
        { name: "spree jersey", category: "Clothing and Jewelry", description: "jersey", price: 100 },
        { name: "ror bag", category: "Clothing and Jewelry", description: "bag", price: 100 },
        { name: "ror tote", category: "Clothing and Jewelry", description: "tote", price: 100 },
    ]
    var promise = new Promise(function (resolve, reject) {
        products.forEach(function (productData) {
            category = Category.findOne({ "name": productData.category }, function (err, category) {
                console.log(category);
                var product = new Product();
                product.name = productData.name;
                product.category = category;
                product.description = productData.description;
                product.price = productData.price;
                product.save().then(function (product) {
                    console.log(product)
                    resolve("success");
                }, function (reason) {
                    console.log(reason);
                    reject(reason);
                });
            });
        });
    });
    return promise;
}
