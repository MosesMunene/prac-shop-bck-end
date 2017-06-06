var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Product = require('../models/product');
var Category = require('../models/category');
var jwt = require("jsonwebtoken");
var multer = require('multer')({ dest: '../public/images' })

/* GET users listing. */
router.post('/auth', function (req, res, next) {
    console.log(req.body);

    res.json({ message: 'respond with a resource' });
});


router.post('/create', function (req, res) {
    console.log(req.body);
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save().then(function (user) {
        res.json({ user: user });
    }).catch(function (err) {
        console.log(err);
        res.status(500);
        res.json(err);
    })
});


// router.post('/login', passport.authenticate('local'), function (req, res) {
//     console.log("we get here");
//     res.json(req.user);
// });

router.post('/login', function (req, res) {
    console.log(req.body);
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            return err;
        }
        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        }
        else {
            if (user.password !== req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong Password.' });
            }
            else {
                var token = jwt.sign(user, "secret", { expiresIn: 10080 });
                res.json({ success: true, token: 'JWT ' + token });
            }
        }
    })
});

router.get('/dashboard', passport.authenticate('jwt', { session: false }), function (req, res) {
    res.send('It worked! User id is: ' + req.user._id + '.');
})

router.get('/products/', passport.authenticate('jwt', { session: false }), function (req, res) {
    Product.find(function (err, data) {
        if (err) {
            throw err;
        }
        else {
            res.json({ data: data });
        }
    });
})

router.get('/products/:category', passport.authenticate('jwt', { session: false }), function (req, res) {
    var category = req.params.category;
    console.log(category);
    Category.findOne({ name: category }, function (err, category) {
        Product.find({ category: category }, function (err, data) {
            if (err) {
                throw err;
            }
            else {
                res.json({ data: data });
            }
        })
    })
})

router.get('/categories', function (req, res) {
    Category.find(function (err, categories) {
        if (err) {
            throw err;
        }
        res.json({ data: categories });
    })
});

router.post('/categories', function (req, res) {
    var category = req.body.category;
    Category.create({ name: category.name, isRoot: true }, function (err, categories) {
        if(err){
            throw err;
        }
        else{
            console.log(categories);
            res.json(categories[0]);
        }
    })
})

router.get('/product/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    var id = req.params.id;
    Product.findById({ _id: id }, function (err, data) {
        if (err) {
            throw err;
        }
        else {
            res.json({ data: data });
        }
    });
})

router.get('/product/image/:id', function (req, res) {
    var id = req.params.id;
    res.sendFile(id + ".png", { root: '/home/moses/playground/prac-shop-bck-end/public/images/' });
});


router.post('/product/post/', multer.single('file'), function (req, res) {
    console.log(req.body);
    console.log(req.file);

    res.status(200);
    res.end();
});

module.exports = router;