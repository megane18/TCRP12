import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Link } from "react-router-dom";
import pendingRequests from "../assets/pendingrequest";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);

  // Expanded state to include the new event fields
  const [newEvent, setNewEvent] = useState({
    name: "",
    type: "",
    description: "",
    start_date: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch all events from the API
  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/events");
      if (response.data.length === 0) {
        setEvents([]); // Handle case where no events are found
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
    if (
      name.trim() === "" ||
      type.trim() === "" ||
      description.trim() === "" ||
      start_date.trim() === ""
    ) {
      return alert("Please fill out all fields");
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/events/",
        newEvent
      );
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
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 justify-center">
      {/* Dashboard Header */}
      <h1 className="text-3xl font-bold text-black mb-6 mt-12">
        Admin Dashboard
      </h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 text-black">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-bold">Total Member Count</h2>
          <p className="text-4xl font-bold text-black">3423</p>
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-bold">New Member Requests</h2>
          <p className="text-4xl font-bold text-black">45</p>
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-bold">Upcoming Events</h2>
          <p className="text-4xl font-bold text-black">3423</p>
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-bold">Help Requests</h2>
          <p className="text-4xl font-bold text-black">45</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center mb-8 gap-2">
        {/* <button className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600">
          + Create New Events
        </button> */}
        <Link to="/send-mass-communication">
          <button className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600">
            + Send Mass Communication
          </button>
        </Link>

        {/* Event Input Section */}
        <Popup
          trigger={
            <button className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600">
              + Create Event
            </button>
          }
          position="center center"
          modal
        >
          {(close) => (
            <div className="modal flex justify-center  bg-gray-300 rounded-lg w-fit">
              {/* <button className="close" onClick={close}>
              &times;
            </button> */}
              <div className="mb-8 flex justify-center ">
                <div className=" text-black p-5">
                  <h2 className="text-2xl font-bold text-black mb-4">
                    Add New Event
                  </h2>
                  <div className="">
                    <input
                      type="text"
                      name="name"
                      value={newEvent.name}
                      onChange={handleInputChange}
                      placeholder="Enter event name"
                      className="border border-gray-300 p-2 rounded-lg w-full mb-4 bg-gray-100"
                    />
                    <input
                      type="text"
                      name="type"
                      value={newEvent.type}
                      onChange={handleInputChange}
                      placeholder="Enter event type (e.g., meeting, conference)"
                      className="border border-gray-300 p-2 rounded-lg w-full mb-4 bg-gray-100"
                    />
                    <textarea
                      name="description"
                      className=" text-black min-h-20 w-full rounded-lg p-2 bg-gray-100 mb-4"
                      value={newEvent.description}
                      placeholder="Enter event description"
                      onChange={handleInputChange}
                    />

                    <input
                      type="datetime-local"
                      name="start_date"
                      value={newEvent.start_date}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-2 rounded-lg w-full mb-4 bg-gray-100 text-gray-400"
                    />
                    <button
                      onClick={handleAddEvent}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                      Add Event
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Popup>
      </div>

      {/* Upcoming Events Section */}
      <div className="mb-8 flex justify-center">
        <div className="w-2/3">
          <h2 className="text-2xl font-bold text-black mb-4">
            Upcoming Events
          </h2>
          {events.length > 0 ? (
            <ul className="space-y-4">
              {events.map((event) => (
                <li
                  key={event.id}
                  className="bg-white p-6 shadow-md rounded-lg text-black"
                >
                  <strong>{event.name}</strong>
                  <br />
                  <em>Type:</em> {event.type}
                  <br />
                  <em>Description:</em> {event.description}
                  <br />
                  <em>Start Date:</em>{" "}
                  {new Date(event.start_date).toLocaleString()}
                  <br />
                  <button
                    onClick={() => handleRemoveEvent(event.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No upcoming events</p>
          )}
        </div>
      </div>

      {/* Pending Requests Section */}
      <div>
        <h2 className="text-2xl font-bold text-black mb-4">Pending Requests</h2>
        {pendingRequests
          .filter((issue) => !issue.completed)
          .map((issue) => (
            <div
              key={issue.id}
              className="bg-white p-6 shadow-md rounded-lg mb-4 text-start"
            >
              <h3 className="text-xl font-bold text-black">
                {issue.name} : {issue.requestType}
              </h3>
              <p className="text-gray-600 mb-4">{issue.message}</p>
              <div className="flex space-x-2">
                <button className="bg-gray-500 text-white px-4 py-2 rounded-lg">
                  Assign to Staff
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
                  Resolved
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
