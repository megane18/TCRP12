import React from 'react';
import EventManager from './components/EventManager';
import './App.css';
import SignUpForm from './components/SignUpForm';
import Header from './components/Header';
import EventDetails from './components/EventDetails';
import Footer from './components/Footer';


const App = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <div className="content flex-grow bg-white">
        {/* <EventManager /> */}
        <EventDetails eventId={1} />

        {/* <SignUpForm /> */}

      </div>
      <Footer />
    </div>
  );
}

export default App;