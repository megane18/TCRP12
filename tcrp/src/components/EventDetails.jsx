// src/components/EventDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { AddToCalendarButton } from "add-to-calendar-button-react";
import dummyEvents from "../assets/events"; // Import hardcoded events

const EventDetails = () => {
    const { id } = useParams(); // Extract the event ID from the URL

    // Find the event with the matching id
    const event = dummyEvents.find((evt) => String(evt.id) === id);

    // Function to format the date
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    if (!event) {
        return <p className="text-center text-gray-500">No event found</p>;
    }

    return (
        <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-7xl bg-white shadow-xl rounded-lg p-6">
                <h2 className="text-3xl font-light text-black mb-3">{event.name} Details</h2>
                <img src={event.image} alt={event.name} className="w-full h-80 object-cover rounded-lg" />
                
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
                    <div className="bg-gray-100 p-4 rounded-lg text-left">
                        <p className="mb-2 text-black"><em>Description:</em> {event.description}</p>
                        <p className="mb-2 text-black"><strong>Location:</strong> {event.location}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
