const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const os = require('os');
const Message = require('./models/Message');  // Import Message from model
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    // origin: 'http://localhost:5173',
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Function to get the local IP address
const getLocalIpAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
};

const localIpAddress = getLocalIpAddress();
console.log(`Local IP Address: ${localIpAddress}`);

// Track server uptime
let startTime = Date.now();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Use CORS middleware and JSON parser
app.use(cors());
app.use(express.json());

// Define user schema and model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
});

const User = mongoose.model('User', userSchema);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get server uptime
app.get('/uptime', (req, res) => {
  const currentTime = Date.now();
  const uptime = currentTime - startTime;
  res.send(`Server uptime: ${Math.floor(uptime / 1000)} seconds`);
});

// Socket.io event handlers
io.on('connection', (socket) => {
  console.log('A user connected');

  // Send chat history to the user
  socket.on('request chat history', async () => {
    try {
      const messages = await Message.find().sort({ timestamp: 1 }).exec();
      socket.emit('chat history', messages);
    } catch (err) {
      console.error('Error fetching chat history:', err);
    }
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Handle login event
  socket.on('login', async (data) => {
    console.log(`Login attempt by: ${data.username}`);
    
    if (data.password === process.env.CHAT_PASSWORD) {
      socket.emit('login success');
      console.log(`User logged in: ${data.username}`);

      // Check if user already exists, otherwise create a new user
      try {
        const newUser = new User({ username: data.username });
        await newUser.save();
      } catch (err) {
        if (err.code === 11000) {  // Handle duplicate key error (user exists)
          console.log(`User ${data.username} already exists.`);
        } else {
          console.error('Error saving user:', err);
        }
      }

      // After login, request chat history
      socket.emit('request chat history');
    } else {
      socket.emit('login error', 'Invalid username or password');
      console.log(`Failed login attempt for username: ${data.username}`);
    }
  });

  // Handle chat message event
  socket.on('chat message', async (data) => {
    const newMessage = new Message({
      username: data.username,
      message: data.message,
    });

    try {
      await newMessage.save();
      io.emit('chat message', data);  // Broadcast the message to all users
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT,'0.0.0.0', () => {
  console.log(`Server running on http://${localIpAddress}:${PORT}`);
});
