// src/components/EventDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { AddToCalendarButton } from "add-to-calendar-button-react";
import dummyEvents from "../assets/events"; // Import hardcoded events
import stockPhoto from '../assets/stock_photo.jpg'; // Fallback or generic photo
import person1 from '../assets/people/person1.jpg';
import person2 from '../assets/people/person2.jpg';
import person3 from '../assets/people/person3.jpg';
import person4 from '../assets/people/person4.jpg';

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

    // Hardcoded comments data with user-specific images
    const comments = [
        {
            id: 1,
            username: "Jason Briles",
            comment: "Love the emphasis on skills that are specifically tailored to the needs of our community!",
            photo: person1 // Assign the corresponding image
        },
        {
            id: 2,
            username: "Emily Carson",
            comment: "Sounds like a great event, I'll be there.",
            photo: person2
        },
        {
            id: 3,
            username: "Michael Thompson",
            comment: "Excited to attend and learn from the amazing speakers. Can't wait!",
            photo: person3
        },
        {
            id: 4,
            username: "Sophia Martinez",
            comment: "Looking forward to meeting you all there :)",
            photo: person4
        }
    ];

    return (
        <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center p-4 mt-16 pb-10">
            <div className="w-full max-w-7xl bg-white shadow-xl rounded-lg p-6 mt-2">
                <h2 className="text-3xl font-light text-black mb-3">{event.name} Details</h2>
                <img src={event.image} alt={event.name} className="w-full h-80 object-cover rounded-lg" />
                
                <div className="mt-6">
                    <div className='flex mb-4 justify-between flex-col md:flex-row'>
                        <div className='items-center mb-4 md:mb-0 block md:flex'>
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
                        <p className="mb-2 text-black"><strong>Description:</strong> {event.description}</p>
                        <p className="mb-2 text-black"><strong>Location:</strong> {event.location}</p>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="mt-16">
                    <h3 className="text-2xl font-light text-black mb-4">User Comments</h3>
                    <div className="space-y-6 text-left items-center">
                        {comments.map(({ id, username, comment, photo }) => (
                            <div key={id} className="flex items-start space-x-4">
                                <div className='pt-2'>
                                    <img src={photo || stockPhoto} alt={`${username} profile`} className="w-12 h-12 min-w-12 min-h-12 rounded-full object-cover" />
                                </div>
                                <div>
                                    <p className="text-lg font-medium text-gray-900">{username}</p>
                                    <p className="text-gray-700 mt-1">{comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* End of Comments Section */}
            </div>
        </div>
    );
};

export default EventDetails;
