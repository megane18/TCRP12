// src/App.js

import React, { useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import Login from "./components/Login";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import RequestForm from "./components/RequestForm";
import SendMassCommunication from "./components/SendMassCommunication";
import ChatBot from "./components/ChatBot";
import Footer from "./components/Footer";
import Home from "./components/Home";
import EventDetails from "./components/EventDetails";
import "./App.css";

// Import Font Awesome for Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const footerRef = useRef(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  // Prevent body from scrolling when chat is open
  useEffect(() => {
    if (isChatOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isChatOpen]);

  return (
    <div className="min-h-screen w-screen">
      <Router>
        <div className="flex flex-col ">
          <Header footerRef={footerRef} />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/request-form" element={<RequestForm />} />
              <Route path="/events/:id" element={<EventDetails />} />
              {/* <Route path="/chat" element={<ChatBot />} /> */}
            </Routes>
          </div>
          <Footer footerRef={footerRef} />

          {/* Floating Chat Button */}
          <button
            onClick={toggleChat}
            className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors duration-300 z-55"
            aria-label="Toggle Chat"
          >
            <FontAwesomeIcon icon={faComments} size="lg" />
          </button>

          {/* ChatBot Overlay */}
          {isChatOpen && <ChatBot onClose={toggleChat} />}
        </div>
      </Router>
    </div>
  );
};

export default App;
