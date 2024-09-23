// EventDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import stock from '../assets/stock_photo.jpg'; // Assuming the stock image is in your assets folder
import { useParams } from 'react-router-dom'; // Import useParams

import { AddToCalendarButton } from "add-to-calendar-button-react";
// import dummyEvents from "../assets/events";

const EventDetails = () => {
    const { id } = useParams(); // Extract the event ID from the URL
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

    useEffect(() => {
        fetchEventDetails(id);
    }, [id]);

    // Fetch event details by ID from the API
    const fetchEventDetails = async (eventId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/events/${eventId}`);
            setEvent(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching event details:", error);
            setError("Failed to fetch event details");
            setLoading(false);
        }
    };

    if (loading) {
        return <p className="text-center text-gray-500">Loading event details...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    if (!event) {
        return <p className="text-center text-gray-500">No event found</p>;
    }

    return (
        <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-7xl bg-white shadow-xl rounded-lg p-6">
                <h2 className="text-3xl font-bold text-black mb-3">{event.name} Details</h2>
                <img src={stock} alt="Event" className="w-full h-80 object-cover rounded-lg" />
                
                <div className="mt-6">
                    <div className='flex mb-4 justify-between'>
                        <div className='flex items-center'>
                            <div className='bg-gray-200 rounded-lg p-2 mr-0 md:mr-3 mb-2 md:mb-0'>
                                <p className="text-black"><strong>Start Date:</strong> {new Date(event.start_date).toLocaleString()}</p>
                            </div>
                            <div className='bg-gray-200 rounded-lg p-2'>
                                <p className="text-black"><strong>Event Type:</strong> {event.type}</p>
                            </div>
                        </div>

                        <div className="flex gap-2 items-center justify-center">
                          <button className="bg-blue-600 text-white px-4 py-3 rounded text-sm hover:bg-blue-700 transition duration-300">
                            Sign up
                          </button>
                          <AddToCalendarButton
                            label="Remind Me"
                            size="6|4"
                            name="{event.name}"
                            className="m-0"
                            // location={event.location}
                            description={event.description}
                            startDate={formatDate(new Date(event.start_date))}
                            options={["Apple", "Google", "Yahoo", "iCal"]}
                            timeZone="America/Los_Angeles"
                            forceOverlay
                            hideBackground
                          ></AddToCalendarButton>

                        </div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg text-left">
                        <p className="mb-2 text-black"><em>Description:</em> {event.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
