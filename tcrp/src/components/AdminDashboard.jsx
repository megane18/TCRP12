import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import pendingRequests from "../assets/pendingrequest";
import dummyEvents from "../assets/events";
import { CircleCheck, Trash2Icon, UserPenIcon, XIcon } from "lucide-react";
import SendMassCommunication from "./SendMassCommunication";

const contentStyle = {
  background: "rgba(255,255,255)",
  width: "80%",
  maxWidth: "500px",
  padding: "1px",
  border: "none",
  borderRadius: "10px",
};
const overlayStyle = { background: "rgba(0,0,0,0.1)" };

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [file, setFile] = useState(null);

  const upcomingEvents = dummyEvents.filter((event) => {
    const eventDate = new Date(event.start_date);
    const currentDate = new Date();
    return eventDate > currentDate;
  });

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
      setEvents(upcomingEvents);
      // const response = await axios.get("http://127.0.0.1:8000/events");
      // if (response.data.length === 0) {
      //   setEvents([]); // Handle case where no events are found
      // } else {
      //   setEvents(response.data);
      // }
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
    } else if (file === null || file.type !== "image/jpeg") {
      return alert("Please upload a valid image file");
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

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen p-20 justify-center">
      <div className="max-w-7xl m-auto">
        {/* Dashboard Header */}
        <h1 className="text-3xl font-bold text-black mb-6 mt-12">
          Admin Dashboard
        </h1>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 lg:grid-cols-2 sm:grid-cols-2 gap-4 mb-8 text-black">
          <div className="bg-white p-6 shadow-md rounded-lg flex flex-col items-center">
            <h2 className="text-xl font-bold">Total Member Count</h2>
            <p className="text-4xl font-bold text-black">3423</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg flex flex-col items-center">
            <h2 className="text-xl font-bold">New Member Requests</h2>
            <p className="text-4xl font-bold text-black">45</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg flex flex-col items-center">
            <h2 className="text-xl font-bold">Upcoming Events</h2>
            <p className="text-4xl font-bold text-black">3423</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg flex flex-col items-center">
            <h2 className="text-xl font-bold">Help Requests</h2>
            <p className="text-4xl font-bold text-black">45</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-2 mb-8">
          <Popup
            trigger={
              <button className="flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded hover:bg-blue-500 transition-all duration-300 text-base md:text-lg">
                <span className="mr-2">📤</span>
                <span>Send Mass Communication</span>
              </button>
            }
            {...{
              contentStyle,
              overlayStyle,
            }}
            position="center center"
            modal
          >
            {(close) => <SendMassCommunication close={close} />}
          </Popup>

          <Popup
            trigger={
              <button className="flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded hover:bg-blue-500 transition-all duration-300 text-base md:text-lg">
                <span className="mr-2">✏️</span>
                <span>Create Event</span>
              </button>
            }
            {...{
              contentStyle,
              overlayStyle,
            }}
            position="center center"
            modal
          >
            {(close) => (
              <div className="justify-center  rounded-lg  bg-gradient-to-b from-blue-50 to-purple-50">
                <XIcon
                  size={24}
                  color="black"
                  onClick={close}
                  className="absolute top-2 right-2"
                />

                <div className="justify-center flex  w-full h-full">
                  <div
                    className=" text-black p-5  rounded-lg w-full
                "
                  >
                    <h2 className="text-2xl font-bold text-black mb-4">
                      Add New Event
                    </h2>
                    <div className="flex flex-col w-full ">
                      <input
                        type="text"
                        name="name"
                        value={newEvent.name}
                        onChange={handleInputChange}
                        placeholder="Enter event name"
                        className="border border-gray-300 bg-gray-100 p-2 rounded-lg w-full mb-4  flex "
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
                      <div className="flex align-middle mb-4">
                        <label className="bg-blue-600 text-white rounded-md h-10 p-2 cursor-pointer">
                          Attach File
                          <input
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                        {file && (
                          <p className="ml-2 text-gray-600 mt-2">{file.name}</p>
                        )}
                      </div>
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

        {events && (
          <>
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Events and Posts
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-gray-800">
                        {event.name}
                      </h3>
                      <p className="mb-4 text-gray-600 text-sm">
                        {event.description}
                      </p>
                      <div className="gap-4 items-center flex justify-end">
                        <button
                          onClick={() => handleRemoveEvent(event.id)}
                          className="bg-white border-1 border-black flex items-center justify-center p-2 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                        >
                          <Trash2Icon size={24} color="red" />
                        </button>

                        <button
                          onClick={() => handleEditEvent(event.id)} // Update function name as needed
                          className="bg-white border-1 border-black  flex items-center justify-center p-2 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        >
                          <UserPenIcon size={24} color="blue" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Pending Requests Section */}
        <div className=" mx-auto my-8 ">
          <h1 className="text-2xl font-bold text-center mb-6 text-black">
            Pending Requests
          </h1>
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-600">Status</th>
                  <th className="py-3 px-4 text-left text-gray-600">
                    Request Type
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600">Name</th>
                  <th className="py-3 px-4 text-left text-gray-600">Email</th>
                  <th className="py-3 px-4 text-left text-gray-600">Message</th>
                  <th className="py-3 px-4 text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.map((issue) => (
                  <tr
                    key={issue.id}
                    className="hover:bg-gray-50 text-black text-start"
                  >
                    <td className="py-3 px-4 border-b border-gray-200">
                      {issue.completed ? "Resolved" : "Pending"}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      {issue.requestType}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      {issue.name}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      {issue.email}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      {issue.message}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      <div className="flex space-x-2 align-middle">
                        <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 w-36">
                          Assign to Staff
                        </button>
                        {!issue.completed && (
                          <button
                            onClick={() => handleCheck(event.id)} // Replace with your desired function
                            className="bg-white border-1 border-black flex items-center justify-center p-2 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                          >
                            <CircleCheck className="text-red-500" size={24} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
