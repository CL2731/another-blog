const express = require('express');
const path = require('path');
const session = require('express-session');
const hndlb = require('express-handlebars');
const Sequelize = require('connect-session-sequelize')(session.Store);

const routes = require('./routes');
const sequelize = require('./config/connection');
const dates = require('./utils/dates')

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'BlogIt',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new Sequelize({
        db: sequelize,
    }),
};

app.use(session(sess));

const hbs = hndlb.create({ dates });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.use(routes);

sequelize.sync({ force: false}).then(() => {
    app.listen(PORT);
})