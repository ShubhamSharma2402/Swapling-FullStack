const express = require('express');
const router = express.Router();
const swapController = require('../controllers/swapController');

router.get('/', swapController.getSwaps);
router.post('/', swapController.addSwap);

module.exports = router;
