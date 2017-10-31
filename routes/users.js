var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: './uploads' });

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/register', (req, res, next) => {
  res.render('register', { title: 'Register' });
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Login' });
});

router.post('/register', upload.single('profileimage'), (req, res, next) => {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  var User = require('../models/user');

  if (req.file) {
    var profileimage = req.file.filename;
  } else {
    var profileimage = 'no_image.jpg';
  }

  // Form Validator
  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  // Check Errors
  var errors = req.validationErrors();

  if (errors) {
    res.render('register', {
      errors: errors
    });
  } else {
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
      profileimage: profileimage
    });
    user.createUser(newUser, function(err, user) {
      if (err) {
        console.log(user);
        throw err;
      }
    });
    res.location('/');
    res.redirect('/');
  }

});

module.exports = router;
