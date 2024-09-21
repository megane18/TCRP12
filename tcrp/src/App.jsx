import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import Login from './components/Login'; // Adjust this import as needed
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import Home from './components/Home'
import './App.css';

const App = () => {

  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full">
        <Header />
        <div className="content flex-grow">
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="footer" element={<Footer/>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
