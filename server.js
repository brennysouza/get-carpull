const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const hbs = exphbs.create({ helpers });
const routes = require('./controllers');
const cloudinary = require("./config/cloudinary");
const uploader = require("./config/multer");

// hello world

// LINDA  added app.get for the homepage in homepage.handlebars

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.set(express.static(path.join(__dirname, 'public')));

app.get('../homepage.handlebars', (req, res) =>  {
  res.render('server');
})

//app.listen(3000, () => {
//  console.log('The application is listening on port 3000');
//})


// end of code added

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'a5yhtj1tr9541jht96',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')

//static middleware pointing to the public folder 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// force true at the beginning to sequelize knows to look for updated changes to the models
// turn to false when done working on models
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

// hello world 