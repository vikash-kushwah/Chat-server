// frontend/src/components/MessagesList.jsx
const MessagesList = ({ messages }) => {
    return (
      <ul>
        {messages.map((msg, index) => (
          <li key={index} className={msg.username === 'your-username' ? 'right' : 'left'}>
            <div>{`${msg.username}: ${msg.message}`}</div>
          </li>
        ))}
      </ul>
    );
  };
  
  export default MessagesList;
  