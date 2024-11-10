import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './styles/global.css';
import './styles/responsive.css';
import './styles/Login.css';
import './styles/Chat.css';
import ChatInput from './components/ChatInput';

// const socket = io('http://localhost:3000');
const socket = io(`http://${window.location.hostname}:3000`);


function App() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (loggedIn) {
      setLoading(true);
      socket.emit('request chat history');

      socket.on('chat history', (messagesHistory) => {
        setMessages(messagesHistory);
        setLoading(false);
      });

      socket.on('chat message', (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    }

    return () => {
      socket.off('chat message');
      socket.off('chat history');
    };
  }, [loggedIn]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleLogin = () => {
    socket.emit('login', { username, password });

    socket.on('login success', () => {
      setLoggedIn(true);
    });

    socket.on('login error', (errorMessage) => {
      alert(errorMessage || 'Invalid login. Please try again.');
    });
  };

  const handleSendMessage = (message) => {
    if (message) {
      socket.emit('chat message', { username, message });
    }
  };

  return (
    <div className="chat-container">
      {!loggedIn ? (
        <div className="login-container">
          <h2>Login to Chat</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <>
          <div className="header">Chat App</div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ul className="messages">
              {messages.map((msg, index) => (
                <li key={index} className={`message ${msg.username === username ? 'right' : 'left'}`}>
                  <strong>{msg.username}:</strong> {msg.message}
                </li>
              ))}
              <div ref={messagesEndRef} />
            </ul>
          )}
          <ChatInput onSendMessage={handleSendMessage} />
        </>
      )}
    </div>
  );
}

export default App;