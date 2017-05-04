var express = require('express');
var router = express.Router();
var controller = require('./item.controller');

router.get('/', controller.getItems);
router.get('/:item', controller.getItem);
router.post('/', controller.createItem);
router.post('/:item', controller.updateItem);
router.delete('/:item', controller.deleteItem);
router.post('/:item/:image/remove-image', controller.removeImage);

module.exports = router;