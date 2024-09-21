import { useState } from 'react'
import './App.css'
import DatabaseTest from './components/DatabaseTest';
import EventsManager from './components/EventsManager';



function App() {
  return (
    <div className="App">
      <h1>SQLite Database Test</h1>
      <DatabaseTest />
      {/* <EventsManager /> */}
    </div>
  );
}

export default App
