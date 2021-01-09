const express = require('express');
const path = require('path');
const body = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
var expressPublicIp = require('express-public-ip');


//config
const config = require('./config/config');

//password config
require('./config/passport')(passport);




//app express
const app = express();

//database 
const db = require('./config/config').MONGO_URL



mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('connected'))
    .catch((err) => console.log(err));

app.enable('trust proxy');
app.use(expressPublicIp());
//ejs
app.set('view engine', 'ejs')
    //static
app.use('/Assets', express.static(path.join(__dirname + '/Assets')));
app.use('/ml-models', express.static(path.join(__dirname + '/ml-models')))
    //body-paser
app.use(express.urlencoded({ extended: true }));
app.use(body.json());

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));


//passport middleware

app.use(passport.initialize());
app.use(passport.session());



app.use(flash());


//middleware flash
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});



//Routes
app.use('/', require('./Routes/index'));
app.use('/Console', require('./Routes/api'))

app.listen(config.PORT, () => console.log(`${config.BASE_URL}:${config.PORT}`))