const express = require('express');
const { createItem, getItems, getItemById } = require('../controllers/item.controller');

const router = express.Router();

router.post('/create-item', createItem);
router.get('/get-items', getItems);
router.get('/get-item/:itemId', getItemById);

module.exports = router;