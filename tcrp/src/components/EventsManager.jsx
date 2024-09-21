import React, { useState, useEffect } from 'react';
import { dbService } from '../services/DatabaseService';

const Alert = ({ children, variant = 'error' }) => (
  <div className={`p-4 mb-4 rounded ${variant === 'error' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
    {children}
  </div>
);

export default function EventsManager() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ time: '', name: '', type: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isCleaningUp, setIsCleaningUp] = useState(false);
  const EVENTS_PER_PAGE = 10;

  useEffect(() => {
    loadEvents(currentPage);
  }, [currentPage]);

  async function loadEvents(page) {
    setLoading(true);
    setError('');
    try {
      const result = await dbService.getEvents(page, EVENTS_PER_PAGE);
      setEvents(result.events);
      setTotalPages(Math.ceil(result.totalCount / EVENTS_PER_PAGE));
    } catch (err) {
      console.error('Failed to load events:', err);
      setError(`Failed to load events: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddEvent(e) {
    e.preventDefault();
    setError('');
    try {
      await dbService.addEvent(newEvent.time, newEvent.name, newEvent.type);
      setNewEvent({ time: '', name: '', type: '' });
      loadEvents(currentPage);
    } catch (err) {
      console.error('Failed to add event:', err);
      if (err.message.includes('out of memory')) {
        setError('Unable to add event due to memory constraints. Please use the "Clean Up Old Events" button to remove old events.');
      } else {
        setError(`Failed to add event: ${err.message}`);
      }
    }
  }

  async function handleDeleteEvent(id) {
    try {
      await dbService.deleteEvent(id);
      loadEvents(currentPage);
    } catch (err) {
      console.error('Failed to delete event:', err);
      setError(`Failed to delete event: ${err.message}`);
    }
  }

  async function handleCleanupOldEvents() {
    setIsCleaningUp(true);
    setError('');
    try {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      await dbService.deleteEventsOlderThan(threeMonthsAgo.toISOString());
      loadEvents(1);
      setCurrentPage(1);
    } catch (err) {
      console.error('Failed to clean up old events:', err);
      setError(`Failed to clean up old events: ${err.message}`);
    } finally {
      setIsCleaningUp(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      <h2 className="text-2xl font-bold mb-4">Event Manager</h2>
      
      <form onSubmit={handleAddEvent} className="mb-6 flex flex-wrap gap-2">
        <input
          type="datetime-local"
          value={newEvent.time}
          onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          placeholder="Event Name"
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={newEvent.type}
          onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
          placeholder="Event Type"
          required
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Add Event</button>
      </form>

      <button 
        onClick={handleCleanupOldEvents} 
        className="mb-4 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
        disabled={isCleaningUp}
      >
        {isCleaningUp ? 'Cleaning Up...' : 'Clean Up Old Events'}
      </button>

      {error && <Alert>{error}</Alert>}

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <>
          <table className="w-full border-collapse mb-4">
            <thead>
              <tr>
                <th className="border p-2 text-left">Time</th>
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Type</th>
                <th className="border p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {events.map(([id, time, name, type]) => (
                <tr key={id}>
                  <td className="border p-2">{new Date(time).toLocaleString()}</td>
                  <td className="border p-2">{name}</td>
                  <td className="border p-2">{type}</td>
                  <td className="border p-2">
                    <button onClick={() => handleDeleteEvent(id)} className="bg-red-500 text-white p-1 rounded hover:bg-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1}
              className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages}
              className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}