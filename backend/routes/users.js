const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Endpoint to get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
