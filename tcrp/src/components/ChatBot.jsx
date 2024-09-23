import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown'; // Ensure you import react-markdown

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { sender: 'user', text: inputMessage };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Send the message to FastAPI backend
    const response = await fetch('http://localhost:8000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: inputMessage })
    });

    const data = await response.json();

    // Add the response message to chat
    const botMessage = { sender: 'bot', text: data.message };
    setMessages((prevMessages) => [...prevMessages, botMessage]);

    setInputMessage(''); // Clear the input field
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box text-black">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            {msg.sender === 'bot' ? (
              <div className="bot-message-markdown text-left">
                <ReactMarkdown>{msg.text}</ReactMarkdown> {/* Render markdown for bot responses */}
              </div>
            ) : (
              <div className="user-message-text font-bold text-right">
                {msg.text} {/* Render plain text for user messages */}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="chat-input"
        />
        <button onClick={handleSendMessage} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default ChatBot;
