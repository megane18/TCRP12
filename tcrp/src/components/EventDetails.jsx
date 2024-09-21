import React, { useState, useEffect } from 'react';
import axios from 'axios';
import stock from '../assets/stock_photo.jpg'; // Assuming the stock image is in your assets folder

const EventDetails = ({ eventId }) => {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEventDetails(eventId);
    }, [eventId]);

    // Fetch event details by ID from the API
    const fetchEventDetails = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/events/${id}`);
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
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-6 my-8">
            <h2 className="text-3xl font-bold text-black mb-3">{event.name} Details</h2>
            <img src={stock} alt="Event" className="w-full h-80 object-cover rounded-lg" />
            
            <div className="mt-6">
                <div className='flex items-center mb-4 justify-end'>
                    <div className='bg-gray-200 rounded-lg p-2 mr-3'>
                        <p className="text-black"><strong>Start Date:</strong> {new Date(event.start_date).toLocaleString()}</p>
                    </div>
                    <div className='bg-gray-200 rounded-lg p-2'>
                        <p className="text-black"><strong>Event Type</strong> {event.type}</p>
                    </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-left">
                    <p className="mb-2 text-black"><em>Description:</em> {event.description}</p>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
