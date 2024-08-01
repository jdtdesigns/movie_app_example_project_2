require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const Handlebars = require('handlebars');

const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const client = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = 3333;

// Set up our static public files to be accessible
app.use(express.static('public'));

// Allow standard form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set up Handlebars
app.engine('hbs', engine({
  extname: '.hbs',
  helpers: {
    outputStars(rating) {
      let starHtml = '';

      for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
          starHtml += `<i data-level="${i}" class="fa-solid fa-star"></i>`;
        } else {
          starHtml += `<i data-level="${i}" class="fa-regular fa-star"></i>`;
        }
      }

      return new Handlebars.SafeString(starHtml);
    }
  }
}));
app.set('view engine', 'hbs');

// Set up sessions for our routes so we can store user ids to the server
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new SequelizeStore({
      db: client,
    }),
    saveUninitialized: false,
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    // proxy: true, // if you do SSL outside of node.
    // Only send a cookie that cannot be accessed by Browser JS
    cookie: {
      httpOnly: true
    }
  })
);

// Load Routes
app.use('/', routes);

// Start the server
client.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log('Express server started on port', PORT);
    })
  });
