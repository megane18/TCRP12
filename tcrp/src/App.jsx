import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState("");

  // Fetch events from the FastAPI backend
  useEffect(() => {
    fetchEvents();
  }, []);

  // Function to fetch all events
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/events');
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Function to add a new event
  const handleAddEvent = async () => {
    if (newEvent.trim() === "") return;
    try {
      const response = await axios.post('http://127.0.0.1:8000/events/', { name: newEvent });
      setEvents([...events, response.data]);
      setNewEvent("");  // Clear the input field after adding
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  // Function to remove an event
  const handleRemoveEvent = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/events/${id}`);
      setEvents(events.filter(event => event.id !== id));  // Remove the event locally
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Event Manager</h1>

      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          value={newEvent} 
          onChange={(e) => setNewEvent(e.target.value)} 
          placeholder="Enter event name" 
        />
        <button onClick={handleAddEvent} style={{ marginLeft: '10px' }}>Add Event</button>
      </div>

      <h2>Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id} style={{ marginBottom: '10px' }}>
            {event.name}
            <button 
              onClick={() => handleRemoveEvent(event.id)} 
              style={{ marginLeft: '20px', color: 'red' }}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
