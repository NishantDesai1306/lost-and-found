var salt = require('../config').salt;
var bcrypt = require('bcrypt-nodejs');
var User = require('../api/user/user.model');
var Token = require('./token/token.model');

exports.checkRememberMe = function(req, res, next) {
    if (req.body.rememberMe) {
        Token.issueToken(req.user._id).then(function(tokenObj) {
            res.cookie('remember_me', tokenObj.token, { path: '/', httpOnly: true, maxAge: 604800000 });
            next();
        }, function(err) {
            next(err);
        });
    } else {
        next();
    }
};

exports.successLogin = function(req, res) {
    res.json({
        status: true,
        data: {
            _id: req.user._id,
            username: req.user.username,
            email: req.user.email,
            profilePictureUrl: req.user.profilePicture.path
        }
    });
};

exports.successRegister = function(req, res) {
    res.json({
        status: true,
        data: {
            _id: req.user._id,
            username: req.user.username,
            email: req.user.email,
            profilePictureUrl: req.user.profilePicture.path
        }
    });
};

exports.logout = function(req, res) {
    Token.clearUserTokens(req.user._id.toString());

    req.logout();
    res.clearCookie('remember_me');
    res.json({
        status: true
    });
};