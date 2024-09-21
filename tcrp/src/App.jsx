import React from 'react';
import EventManager from './components/EventManager';
import './App.css';
import SignUpForm from './components/SignUpForm';


const App = () => {
  return (
    <div className ="content">
      {/* <EventManager /> */}
      <SignUpForm />
    </div>
  );
}

export default App;