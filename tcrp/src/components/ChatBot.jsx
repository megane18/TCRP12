// src/components/ChatBot.js

import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // Import a syntax highlighting theme
import DotLoader from "react-spinners/DotLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const ChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { sender: "user", text: inputMessage };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      const botMessage = { sender: "bot", text: data.message };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      const errorMessage = { sender: "bot", text: "Sorry, something went wrong." };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      console.error("Error fetching chat response:", error);
    } finally {
      setLoading(false);
      setInputMessage("");
    }
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
    <div
      className="fixed bottom-24 right-6 w-96 h-4/6 bg-white rounded-lg shadow-2xl z-50 flex flex-col overflow-scroll"
      aria-label="ChatBot"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
        <span className="font-semibold">ChatBot</span>
        <button onClick={onClose} aria-label="Close Chat">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

      {/* Chat Content */}
      <div className="flex flex-col flex-grow">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-md px-4 py-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-200 text-gray-800 text-left"
                }`}
              >
                {msg.sender === "bot" ? (
                  <ReactMarkdown
                    children={msg.text}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeHighlight]}
                    components={{
                      // Customize rendering for specific elements if needed
                      code({ node, inline, className, children, ...props }) {
                        return !inline ? (
                          <pre className={className}>
                            <code {...props}>{children}</code>
                          </pre>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  />
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-center mb-3">
              <DotLoader
                color="#3B82F6" // Tailwind's blue-500
                loading={loading}
                cssOverride={override}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex items-center border-t border-gray-300 p-4">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Message Input"
          />
          <button
            onClick={handleSendMessage}
            className="p-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none"
            aria-label="Send Message"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
