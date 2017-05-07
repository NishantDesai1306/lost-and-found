// modules =================================================
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var apiRouter = require('./api');
var authRouter = require('./auth');
var salt = require('./config').salt;
var fs = require('fs');
var chatzz = require('chatzz');
var server = require('http').Server(app);
var chatzzFunctions = require('./api/chatzz');

//mongoose connect
mongoose.connect('mongodb://root:root@ds133331.mlab.com:33331/lost-box').then(function() {
    console.log('\nconnected to db!!!\n');
    chatzz.init(server, Object.assign({}, chatzzFunctions));
});

// set our port
var port = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cookieParser());

console.log('\nRunning app in ', process.env.NODE_ENV, 'mode\n');
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('./dist')));
}

app.use('/upload', express.static('upload'));

app.use(session({
    secret: salt,
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('remember-me'));

app.use('/auth', authRouter.router);
app.use('/api', authRouter.isAuthenticated, apiRouter);
app.get('*', function(req, res, next) {
    res.sendFile(path.resolve('./dist/index.html'));
});


// start app ===============================================
// startup our app at http://localhost:8080
server.listen(port, function() {
    console.log('server started on port', port);
});

process.on('uncaughtException', function(err) {
        console.log(err);
    })
    // shoutout to the user                     
console.log('Magic happens on port ' + port);

//insert dummy_user profile picture
var uploadFolder = process.env.UPLOAD_PATH;
if (!fs.existsSync(uploadFolder)) {
    console.log('creating upload directory');
    fs.mkdirSync(uploadFolder);
}

if (!fs.readdirSync(uploadFolder).length) {
    var Upload = require('./api/upload/upload.model');
    var srcPath = './image/dummy_user.png';
    var targetPath = path.resolve(uploadFolder, 'dummy_user.png');

    fs.link(srcPath, targetPath, function(err) {
        if (err) {
            return console.error(err.toString());
        }

        targetPath = targetPath.substring(targetPath.indexOf('upload'));
        Upload.createUpload(targetPath)
            .catch(function(err) {
                console.error(err.toString());
            });
    });
}

// expose app           
exports = module.exports = app;