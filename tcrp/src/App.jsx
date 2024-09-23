
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import Login from './components/Login'; // Adjust this import as needed
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import RequestForm from "./components/RequestForm";
import SendMassCommunication from "./components/SendMassCommunication";
import Footer from './components/Footer';
import EventDetails from './components/EventDetails';

import Home from './components/Home'
import './App.css';
import React, { useRef } from 'react';

const App = () => {
  const footerRef = useRef(null);
  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full">
        <Header footerRef={footerRef} />
        <div className="content flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route
              path="/send-mass-communication"
              element={<SendMassCommunication />}
            />
            <Route path="/request-form" element={<RequestForm />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="footer" element={<Footer />} />
          </Routes>
        </div>
        <Footer footerRef={footerRef} />
      </div>
    </Router>
  );
};

export default App;
