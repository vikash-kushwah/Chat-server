const express = require('express');
const { createMessage, getAllMessages } = require('../controllers/messageController');

const router = express.Router();

router.post('/messages', createMessage);
router.get('/messages', getAllMessages);

module.exports = router;
