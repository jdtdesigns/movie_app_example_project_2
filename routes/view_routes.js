const router = require('express').Router();
const { User, Favorite } = require('../models');

function redirectIfLoggedIn(req, res, next) {
  if (req.session.user_id) {
    return res.redirect('/favorites');
  }

  next();
}

function redirectGuest(req, res, next) {
  if (!req.session.user_id) {
    return res.redirect('/login');
  }

  next();
}

// Landing Page Route
router.get('/', redirectIfLoggedIn, async (req, res) => {
  res.render('landing', {
    title: 'My Movies Home',
    landing: true
  });
});

// Login Page Route
router.get('/login', redirectIfLoggedIn, (req, res) => {
  res.render('login', {
    title: 'My Movies - Log In',
    errors: req.session.errors,
    login: true
  });

  delete req.session.errors;
});

// Register Page Route
router.get('/register', redirectIfLoggedIn, (req, res) => {
  res.render('register', {
    title: 'My Movies - Register',
    errors: req.session.errors,
    register: true
  });

  delete req.session.errors;
});

// Favorites Page Route
router.get('/favorites', redirectGuest, async (req, res) => {
  const user = await User.findByPk(req.session.user_id, {
    attributes: ['username'],
    include: Favorite
  });

  res.render('favorites', {
    user: user.get({ plain: true }),
    title: 'My Movies - Favorites',
    user_page: true,
    favorites: true
  });
});

// Search Page Route
router.get('/search', redirectGuest, async (req, res) => {
  const user = await User.findByPk(req.session.user_id, {
    attributes: ['username']
  });

  res.render('search', {
    user: user.get({ plain: true }),
    title: 'My Movies - Search',
    user_page: true,
    search: true
  });
});

module.exports = router;