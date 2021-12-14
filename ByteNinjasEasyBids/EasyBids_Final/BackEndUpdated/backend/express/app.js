var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
const adminsRouter = require('./routes/admins');
const cardsRouter = require('./routes/cards');
const categoriesRouter = require('./routes/categories');
const productsRouter = require('./routes/products');
const transactionsRouter = require('./routes/transactions');
const usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/admins', adminsRouter);
app.use('/cards', cardsRouter);
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);
app.use('/transactions', transactionsRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// MongoDB setup
const uri = 'mongodb+srv://Mukhtaryusuf1:Mukhtaryusuf1@cluster0.5a88f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(uri, { /*newUrlParser: true, useCreateIndex: true*/ });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connected to mongoDB successfully');
});

module.exports = app;
