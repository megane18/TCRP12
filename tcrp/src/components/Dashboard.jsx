import React, { useEffect, useState } from "react";
import { Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { FaInstagram, FaYoutube, FaLinkedin, FaFacebook } from "react-icons/fa";
import Footer from "./Footer";
import axios from "axios";
import { AddToCalendarButton } from "add-to-calendar-button-react";

const CRPWebsite = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeEventIndex, setActiveEventIndex] = useState(null);
  const featuredEvent = events[activeEventIndex];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      // Fetch events from the API
      const response = await axios.get(`http://127.0.0.1:8000/events`);
      setEvents(response.data);
      setActiveEventIndex(0);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to fetch event details");
      setLoading(false);
    }
  };

  const nextEvent = () => {
    setActiveEventIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const prevEvent = () => {
    setActiveEventIndex(
      (prevIndex) => (prevIndex - 1 + events.length) % events.length
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
      <div className="max-w-7xl mx-auto px-4 pb-4">
        <main className="py-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-800 mt-12">
            Community Restoration Project
          </h1>

          {/* Featured Events Section */}
          {activeEventIndex != null && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Featured Events
              </h2>
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="relative">
                  <img
                    src="https://picsum.photos/400/300"
                    alt="Featured event"
                    className="w-full h-64 md:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-between px-4">
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
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">
                    {featuredEvent.name}
                  </h3>
                  <p className="mb-4 text-gray-600">
                    {featuredEvent.description}
                  </p>
                  <div className="flex gap-4 align-middle flex-row items-center">
                    <button className="bg-blue-600 text-white px-4 h-full rounded hover:bg-blue-700 transition duration-300 ">
                      Sign up for event
                    </button>
                    <AddToCalendarButton
                      label="Remind Me"
                      size="6|4"
                      name={featuredEvent.name}
                      description={featuredEvent.description}
                      startDate={formatDate(new Date(featuredEvent.start_date))}
                      options={["Apple", "Google", "Yahoo", "iCal"]}
                      timeZone="America/Los_Angeles"
                      hideCheckmark
                      forceOverlay
                      hideBackground
                    ></AddToCalendarButton>
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
                        src="https://picsum.photos/400/300"
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
                        <div className="flex gap-4 items-center">
                          <button className="bg-blue-600 text-white px-4 py-3 rounded text-sm hover:bg-blue-700 transition duration-300">
                            Sign up
                          </button>
                          <AddToCalendarButton
                            label="Remind Me"
                            size="6|4"
                            name={event.name}
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
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default CRPWebsite;
