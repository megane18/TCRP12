import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './EventManager.module.css';

const EventManager = () => {
  const [events, setEvents] = useState([]);
  
  // Expanded state to include the new event fields
  const [newEvent, setNewEvent] = useState({
    name: "",
    type: "",
    description: "",
    start_date: ""
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch all events from the API
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/events');
      
      if (response.data.length === 0) {
        setEvents([]);  // Handle case where no events are found
        
      } else {
        setEvents(response.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Handle input change for any event field
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  // Handle adding a new event to the list
  const handleAddEvent = async () => {
    const { name, type, description, start_date } = newEvent;
    
    // Basic validation
    if (name.trim() === "" || type.trim() === "" || description.trim() === "" || start_date.trim() === "") {
      return alert("Please fill out all fields");
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/events/', newEvent);
      setEvents([...events, response.data]);
      setNewEvent({ name: "", type: "", description: "", start_date: "" });
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  // Handle removing an event
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
          name="name" 
          value={newEvent.name} 
          onChange={handleInputChange} 
          placeholder="Enter event name" 
          className={styles.inputField}
        />
        <input 
          type="text" 
          name="type" 
          value={newEvent.type} 
          onChange={handleInputChange} 
          placeholder="Enter event type (e.g., meeting, conference)" 
          className={styles.inputField}
        />
        <input 
          type="text" 
          name="description" 
          value={newEvent.description} 
          onChange={handleInputChange} 
          placeholder="Enter event description" 
          className={styles.inputField}
        />
        <input 
          type="datetime-local" 
          name="start_date" 
          value={newEvent.start_date} 
          onChange={handleInputChange} 
          placeholder="Enter start date" 
          className={styles.inputField}
        />
        <button onClick={handleAddEvent} className={styles.addButton}>Add Event</button>
      </div>

      <h2>Events</h2>
        
      <ul className={styles.eventList}>
        {events.map((event) => (
          <li key={event.id} className={styles.eventItem}>
            <strong>{event.name}</strong><br/>
            <em>Type:</em> {event.type}<br/>
            <em>Description:</em> {event.description}<br/>
            <em>Start Date:</em> {new Date(event.start_date).toLocaleString()}<br/>
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
