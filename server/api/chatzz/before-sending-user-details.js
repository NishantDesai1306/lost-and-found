var Q = require('q');
var UserModel = require('../user/user.model');

module.exports = function(userId) {
    var userDefer = Q.defer();
    var fieldsToPopulate = '-password -__v';

    return UserModel.getUserById(userId.toString(), fieldsToPopulate);
};