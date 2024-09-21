// import React from 'react';
// // import EventManager from './components/EventManager';
// import './App.css';
// import SignUpForm from './components/SignUpForm';
// import Login from './components/Login'
// import Header from './components/Header';
// import { BrowserRouter as Router } from 'react-router-dom';
// import React from 'react';
// import EventManager from './components/EventManager';
// import './App.css';
// import SignUpForm from './components/SignUpForm';
// import Header from './components/Header';
// import EventDetails from './components/EventDetails';
// import Footer from './components/Footer';



// const App = () => {
//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen w-full">
//         <Header />
//         <div className="content flex-grow">
//           <SignUpForm />
//           <Login />
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import Login from './components/Login'; // Adjust this import as needed
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
//   return (
//     <div className="flex flex-col min-h-screen w-full">
//       <Header />
//       <div className="content flex-grow bg-white">
//         {/* <EventManager /> */}
//         <EventDetails eventId={1} />

//         {/* <SignUpForm /> */}

//       </div>
//       <Footer />
//     </div>
//   );
// }

  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full">
        <Header />
        <div className="content flex-grow">
          <Routes>
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
