const router = require('express').Router();

const view_routes = require('./view_routes');
const user_routes = require('./user_routes');

const favorite_api_routes = require('./api/favorite_routes');

router.use('/', [
  view_routes,
  user_routes
]);

router.use('/api', api_routes);

module.exports = router;