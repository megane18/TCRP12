import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './EventManager.module.css';

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/events');
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleAddEvent = async () => {
    if (newEvent.trim() === "") return;
    try {
      const response = await axios.post('http://127.0.0.1:8000/events/', { name: newEvent });
      setEvents([...events, response.data]);
      setNewEvent("");
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const handleRemoveEvent = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/events/${id}`);
      setEvents(events.filter(event => event.id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Event Manager</h1>

      <div className={styles.inputSection}>
        <input 
          type="text" 
          value={newEvent} 
          onChange={(e) => setNewEvent(e.target.value)} 
          placeholder="Enter event name" 
          className={styles.inputField}
        />
        <button onClick={handleAddEvent} className={styles.addButton}>Add Event</button>
      </div>

      <h2>Events</h2>
      <ul className={styles.eventList}>
        {events.map((event) => (
          <li key={event.id} className={styles.eventItem}>
            {event.name}
            <button 
              onClick={() => handleRemoveEvent(event.id)} 
              className={styles.removeButton}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventManager;
