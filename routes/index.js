const router = require('express').Router();

const view_routes = require('./view_routes');
const user_routes = require('./user_routes');
const movie_routes = require('./favorite_routes');

const api_routes = require('./api');

router.use('/', [
  view_routes,
  user_routes,
  movie_routes
]);

router.use('/api', api_routes);

module.exports = router;