// CRPWebsite.js
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import dummyEvents from "../assets/events";
import { Link } from "react-router-dom"; // Import Link

const CRPWebsite = () => {
  const Modal = ({ show, handleClose, children }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-96">
          {children}
          <button
            onClick={handleClose}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
          >
            Cancel
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
      // Since we're using dummyEvents, no need to fetch from API
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
      (prevIndex) => (prevIndex - 1 + fEvents.length) % fEvents.length
    );
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-gray-50">
      <div className="w-full max-w-7xl pb-4">
        <main className="py-8">
          {/* Featured Events Section */}
          {activeEventIndex != null && (
            <section className="mb-12 mt-16">
              <div className="bg-white rounded-lg shadow-lg pt-5">
                <h2 className="text-3xl text-center text-gray-800 font-bold mb-5">
                  Featured Events
                </h2>
                <div className="relative">
                  <div className="flex justify-center">
                    <img
                      src={featuredEvent.image}
                      alt="Featured event"
                      className="w-full md:w-10/12 h-64 md:h-96 object-cover rounded-lg mx-auto"
                    />
                  </div>
                  {/* Navigation Buttons */}
                  <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8">
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
                  <Link to={`/events/${featuredEvent.id}`} key={featuredEvent.id}>
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">
                      {featuredEvent.name}
                    </h3>
                    <p className="mb-4 text-gray-600 text-center">
                      {featuredEvent.description}
                    </p>
                  </Link>
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
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

          {!events.length && (
            <p className="text-center text-gray-500">No event found</p>
          )}

          {!loading && !error && events.length > 0 && (
            <>
              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                  Events and Posts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                  <div key={event.id} className="flex flex-col">
                    {/* Link wraps the entire card */}
                    <Link to={`/events/${event.id}`} className="flex-1">
                      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 cursor-pointer">
                        <img
                          src={event.image}
                          alt={event.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2 text-gray-800 min-h-14">
                            {event.name}
                          </h3>
                          <p className="mb-4 text-gray-600 text-sm">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                    
                    {/* Action buttons below the card */}
                    <div className="mt-4 flex flex-col sm:flex-row gap-2 items-center justify-center">
                      <button className="bg-blue-600 text-white px-4 py-3 rounded text-sm hover:bg-blue-700 transition duration-300">
                        Sign up
                      </button>
                      <AddToCalendarButton
                        label="Remind Me"
                        size="6|4"
                        name={event.name}
                        className="m-0"
                        description={event.description}
                        startDate={formatDate(new Date(event.start_date))}
                        options={["Apple", "Google", "Yahoo", "iCal"]}
                        timeZone="America/Los_Angeles"
                        forceOverlay
                        hideBackground
                      />
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
                <h2 className="text-xl font-bold text-black">
                  Sign Up for Event
                </h2>
                <p className="text-black">Please enter your details to sign up for the event.</p>
                <div className="text-black">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full p-2 mt-4 border rounded bg-gray-100"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full p-2 mt-4 border rounded bg-gray-100"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-2 mt-4 border rounded bg-gray-100"
                  />
                  <input
                    type="phone"
                    placeholder="Your phone number"
                    className="w-full p-2 mt-4 border rounded bg-gray-100"
                  />
                </div>
                <button
                  onClick={submitSignEvent}
                  className="mt-4 bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 mr-4"
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
