const express = require('express');
const passport = require('passport');

const User = require('../models/user');
const { nationalities, travelStyles, continents } = require('../config/choices');

const router = express.Router();

const renderAuthData = {
  nationalities,
  travelStyles,
  continents
};

router.get('/register', (req, res) => {
  res.render('auth/register', {
    pageTitle: 'Register',
    ...renderAuthData,
    formData: {}
  });
});

router.post('/register', async (req, res) => {
  try {
    const { username, password, nationality, travelStyle, favoriteContinent } = req.body;

    if (!nationalities.includes(nationality) || !travelStyles.includes(travelStyle) || !continents.includes(favoriteContinent)) {
      return res.status(400).render('auth/register', {
        pageTitle: 'Register',
        ...renderAuthData,
        formData: req.body,
        error: 'Please select valid registration options.'
      });
    }

    const user = new User({ username, nationality, travelStyle, favoriteContinent });
    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (loginError) => {
      if (loginError) {
        return res.status(500).render('auth/register', {
          pageTitle: 'Register',
          ...renderAuthData,
          formData: req.body,
          error: 'Account created, but login failed. Please sign in manually.'
        });
      }

      return res.redirect('/journals');
    });
  } catch (error) {
    res.status(400).render('auth/register', {
      pageTitle: 'Register',
      ...renderAuthData,
      formData: req.body,
      error: error.message
    });
  }
});

router.get('/login', (req, res) => {
  res.render('auth/login', {
    pageTitle: 'Login',
    formData: {}
  });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      return res.status(401).render('auth/login', {
        pageTitle: 'Login',
        formData: req.body,
        error: info && info.message ? info.message : 'Invalid username or password.'
      });
    }

    req.logIn(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }

      return res.redirect('/journals');
    });
  })(req, res, next);
});

router.get('/logout', (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    return res.redirect('/login');
  });
});

module.exports = router;
