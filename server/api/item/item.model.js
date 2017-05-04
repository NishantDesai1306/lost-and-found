var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var User = require('../user/user.model');

var itemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'Upload'
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

itemSchema.statics = {
    getItems: function() {
        var itemsDefer = Q.defer();

        this.find({})
            .populate('images')
            .exec(function(err, items) {
                if (err) {
                    return itemsDefer.reject(err);
                }

                Q.all(items.map(function(item) {
                        return User.getUserById(item.owner)
                            .then(function(user) {
                                item.owner = user;
                                return;
                            });
                    }))
                    .then(function() {
                        return itemsDefer.resolve(items);
                    });
            });

        return itemsDefer.promise;
    },
    getItem: function(itemId) {
        var itemDefer = Q.defer();

        this.findOne({ _id: itemId }, function(err, item) {
            if (err) {
                return itemDefer.reject(err);
            }
            return itemDefer.resolve(item);
        });

        return itemDefer.promise;
    },
    createItem: function(user, data) {
        var createItemDefer = Q.defer();

        var newItem = new this(Object.assign({}, data, { owner: user._id || user }));

        newItem.save(function(err) {
            if (err) {
                return createItemDefer.reject(err);
            }
            return createItemDefer.resolve(newItem);
        });

        return createItemDefer.promise;
    },
    updateItem: function(user, item, data) {
        var updateItemDefer = Q.defer();

        this.findOne({ _id: item._id || item }, function(err, itemObj) {
            if (err) {
                return updateItemDefer.reject(err);
            }

            if (!itemObj) {
                err = new Error('Invalid item id ' + item._id || item + ' provided');
                return updateItemDefer.reject(err);
            }

            var userId = user._id || user;
            if (itemObj.owner.toString() !== userId.toString()) {
                err = new Error('Only owner can update their items');
                return updateItemDefer.reject(err);
            }

            _.merge(itemObj, data);
            itemObj.images = data.images;

            itemObj.markModified('images');
            itemObj.save(function(err) {
                if (err) {
                    return updateItemDefer.reject(err);
                }

                return updateItemDefer.resolve(itemObj);
            });
        });

        return updateItemDefer.promise;
    },
    deleteItem: function(user, itemId) {
        var deleteItemDefer = Q.defer();

        this.findOne({ _id: itemId }, function(err, item) {
            if (err) {
                return deleteItemDefer.reject(err);
            }

            if (!item) {
                err = new Error('Invalid item id ' + itemId + ' provided');
                return deleteItemDefer.reject(err);
            }

            var userId = user._id || user;
            if (item.owner.toString() !== userId.toString()) {
                err = new Error('Only owner can delete their items');
                return deleteItemDefer.reject(err);
            }

            item.remove(function(err) {
                if (err) {
                    return deleteItemDefer.reject(err);
                }
                return deleteItemDefer.resolve();
            });
        });

        return deleteItemDefer.promise;
    }
};

itemSchema.methods = {
    removeImage: function(imageId) {
        var removeImageDefer = Q.defer();

        var index = _.findIndex(this.images, function(image) {
            return (image._id || image).toString() === imageId;
        });

        if (index > -1) {
            this.images.splice(index, 1);
        }

        this.markModified('images');
        this.save(function(err) {
            if (err) {
                return removeImageDefer.reject(err);
            }

            return removeImageDefer.resolve();
        });

        return removeImageDefer.promise;
    }
}

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;