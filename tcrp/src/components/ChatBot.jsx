import React, { useState } from "react";
import { CSSProperties } from "react";
import DotLoader from "react-spinners/DotLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { sender: "user", text: inputMessage };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setLoading(true);
    // Send the message to FastAPI backend
    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: inputMessage }),
    });

    const data = await response.json();

    // Add the response message to chat
    const botMessage = { sender: "bot", text: data.message };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setLoading(false);
    setInputMessage(""); // Clear the input field
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="w-full h-full py-40 justify-center bg-gradient-to-b from-blue-50 to-purple-50 flex">
      <div className="max-w-7xl flex flex-col gap-2">
        <div>
          {messages.map((msg, index) => (
            <div key={index} className="bg-white rounded-sm mb-1 p-2 shadow-md">
              <div
                className={`text-black text-start chat-message ${
                  msg.sender === "user" ? "user-message" : "bot-message"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        {loading && (
          <DotLoader
            color={"#000"}
            loading={loading}
            cssOverride={override}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
        <div className="input-box">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="chat-input "
          />
          <button onClick={handleSendMessage} className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
