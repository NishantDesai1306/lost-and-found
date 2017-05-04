var Q = require('q');
var Item = require('./item.model');

exports.getItems = function(req, res, next) {
    Item.getItems()
        .then(function(items) {
            res.json({
                status: true,
                data: items
            });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.getItem = function(req, res, next) {
    var itemId = req.query.item;

    Item.getItem(itemId)
        .then(function(item) {
            res.json({
                status: true,
                data: item
            });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.createItem = function(req, res, next) {
    var data = req.body.data;

    Item.createItem(req.user, data)
        .then(function(item) {
            res.json({
                status: true,
                data: item
            });
        })
        .catch(function(err) {
            next(err);
        });
}

exports.updateItem = function(req, res, next) {
    var user = req.user;
    var itemId = req.params.item;
    var newData = req.body.data;

    Item.updateItem(user, itemId, newData)
        .then(function(item) {
            res.json({
                status: true,
                data: item
            });
        })
        .catch(function(err) {
            next(err);
        });
}

exports.deleteItem = function(req, res, next) {
    var user = req.user;
    var itemId = req.params.item;

    Item.deleteItem(user, itemId)
        .then(function(items) {
            res.json({
                status: true
            });
        })
        .catch(function(err) {
            next(err);
        });
}

exports.removeImage = function(req, res, next) {
    var itemId = req.params.item;
    var imageId = req.params.image;

    Item.getItem(itemId)
        .then(function(item) {
            if (item.owner.toString() === req.user._id.toString()) {
                return item.removeImage(imageId);
            } else {
                return Q.reject(new Error('only owner can delete image from their items'));
            }
        })
        .then(function() {
            res.json({
                status: true
            });
        })
        .catch(function(err) {
            next(err);
        });
};