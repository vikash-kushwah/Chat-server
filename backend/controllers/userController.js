const User = require('../models/User');

exports.createUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err);
    if (err.code === 11000) {
      res.status(409).json({ message: 'Username already exists.' });
    } else {
      res.status(500).json({ message: 'Error creating user.', error: err.message });
    }
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users.', error: err.message });
  }
};