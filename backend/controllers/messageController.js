const Message = require('../models/Message');

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ message: 'Error fetching messages.', error: err.message });
  }
};

exports.createMessage = async (req, res) => {
  const { username, message } = req.body;
  try {
    const newMessage = new Message({ username, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ message: 'Error sending message.', error: err.message });
  }
};