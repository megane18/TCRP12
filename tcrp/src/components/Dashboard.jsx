import React, { useEffect, useState } from "react";
import { Menu, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import dummyEvents from "../assets/events";

const CRPWebsite = () => {
  const Modal = ({ show, handleClose, children }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-96">
          {children}
          <button
            onClick={handleClose}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  const [showModal, setShowModal] = useState(false);
  function handleOpenModal() {
    setShowModal(true);
  }
  const handleCloseModal = () => setShowModal(false);

  const submitSignEvent = () => setShowModal(false);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeEventIndex, setActiveEventIndex] = useState(null);

  const fEvents = dummyEvents.filter((event) => event.featured === true);
  const featuredEvent = fEvents[activeEventIndex];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      // Fetch events from the API
      // const response = await axios.get(`http://127.0.0.1:8000/events`);
      // setEvents(response.data);
      setEvents(dummyEvents);
      setActiveEventIndex(0);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to fetch event details");
      setLoading(false);
    }
  };

  const nextEvent = () => {
    setActiveEventIndex((prevIndex) => (prevIndex + 1) % fEvents.length);
  };

  const prevEvent = () => {
    setActiveEventIndex(
      (prevIndex) => (prevIndex - 1 + events.length) % fEvents.length
    );
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen">
      <div className="max-w-7xl px-4 pb-4 m-auto">
        <main className="py-8">
          {/* <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-800 mt-12">
            Community Restoration Project
          </h1> */}

          {/* Featured Events Section */}
          {activeEventIndex != null && (
            <section className="mb-12 mt-16">
              <div className="bg-white rounded-lg shadow-lg pt-5">
                <h2 className="text-3xl text-center text-gray-800 font-light mb-5">
                  Featured Events
                </h2>
                <div className="relative">
                  {/* Center the image and add white space on the sides */}
                  <div className="flex justify-center">
                    <img
                      src={featuredEvent.image}
                      alt="Featured event"
                      className="w-96 md:w-10/12 h-64 md:h-96 object-cover rounded-lg"
                    />
                  </div>
                  {/* Navigation Buttons */}
                  <div className="absolute inset-0 flex items-center justify-between px-8">
                    <button
                      onClick={prevEvent}
                      className="text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextEvent}
                      className="text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>
                <div className="p-6 flex flex-col items-center justify-center">
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">
                    {featuredEvent.name}
                  </h3>
                  <p className="mb-4 text-gray-600 text-center">
                    {featuredEvent.description}
                  </p>
                  <div className="flex gap-4 items-center justify-center">
                    <button
                      onClick={handleOpenModal}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                    >
                      Sign up for event
                    </button>

                    <AddToCalendarButton
                      label="Remind Me"
                      options={["Apple", "Google", "Yahoo", "iCal"]}
                      timeZone="America/Los_Angeles"
                      name={featuredEvent.name}
                      description={featuredEvent.description}
                      location={featuredEvent.location}
                      startDate={formatDate(new Date(featuredEvent.start_date))}
                      hideCheckmark
                      forceOverlay
                      hideBackground
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Other Events and Posts */}
          {loading && (
            <p className="text-center text-gray-500">
              Loading event details...
            </p>
          )}
          {error && <p className="text-center text-red-500">{error}</p>}

          {!events && (
            <p className="text-center text-gray-500">No event found</p>
          )}

          {!loading && !error && events && (
            <>
              <section className="mb-12">
                <h2 className="text-3xl font-light mb-6 text-center text-gray-800">
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
                        <h3 className="text-xl font-bold mb-2 text-gray-800 min-h-14">
                          {event.name}
                        </h3>
                        <p className="mb-4 text-gray-600 text-sm">
                          {event.description}
                        </p>
                        <div className="flex gap-2 items-center justify-center">
                          <button
                            onClick={handleOpenModal}
                            className="bg-blue-600 text-white px-4 py-3 rounded text-sm hover:bg-blue-700 transition duration-300"
                          >
                            Sign up
                          </button>
                          <AddToCalendarButton
                            label="Remind Me"
                            size="6|4"
                            name={event.name}
                            className="m-0"
                            // location={event.location}
                            description={event.description}
                            startDate={formatDate(new Date(event.start_date))}
                            options={["Apple", "Google", "Yahoo", "iCal"]}
                            timeZone="America/Los_Angeles"
                            forceOverlay
                            hideBackground
                          ></AddToCalendarButton>
                          {/* <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-300 transition duration-300">
                            Remind Me
                          </button> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <Modal
                show={showModal}
                handleClose={handleCloseModal}
                style={{
                  overlay: {
                    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Modal backdrop
                    zIndex: 9998,
                  },
                  content: {
                    backgroundColor: "white", // Modal content background
                    zIndex: 9999, // Modal z-index
                    position: "relative",
                    padding: "20px",
                  },
                }}
              >
                <h2 className="text-xl font-bold">
                  Sign Up for {featuredEvent.title}
                </h2>
                <p>Please enter your details to sign up for the event.</p>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full p-2 mt-4 border rounded"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-2 mt-4 border rounded"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-2 mt-4 border rounded"
                />
                <input
                  type="phone"
                  placeholder="Your phone number"
                  className="w-full p-2 mt-4 border rounded"
                />
                <button
                  onClick={submitSignEvent}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                >
                  Submit
                </button>
              </Modal>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default CRPWebsite;
