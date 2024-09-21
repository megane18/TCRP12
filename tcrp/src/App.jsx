import React from 'react';
import EventManager from './components/EventManager';
import './App.css';
import SignUpForm from './components/SignUpForm';
import Header from './components/Header';


const App = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <div className="content flex-grow">
        {/* <EventManager /> */}
        <SignUpForm />
      </div>
    </div>
  );
}

export default App;