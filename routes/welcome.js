const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { required, firstname, lastname, email, password, confirmpassword } = req.body;
  let errors = [];
  if (!required || !lastname || !firstname || !email || !password || !confirmpassword) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != confirmpassword) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Passwords has less length' });
  }
  
  console.log(req.body)
  if (errors.length > 0) {
    res.render('register', {
      errors,
      required,
      firstname,
      lastname,
      email,
      password,
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          required,
          firstname,
          lastname,
          email,
          password,
        });
      } else {
        const newUser = new User({
            required,
            firstname,
            lastname,
            email,
            password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
});

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

module.exports = router;