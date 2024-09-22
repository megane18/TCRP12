import React, { useState } from 'react';
import { Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaInstagram, FaYoutube, FaLinkedin, FaFacebook } from 'react-icons/fa';
import Footer from './Footer';


const CRPWebsite = () => {
  
const Modal = ({ show, handleClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
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

  const events = [
    {
      title: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet consectetur. Sapien egestas adipiscing et pharetra nisi. Fusce vitae lectus ornare mauris. Lacinia pharetra aenean laoreet morbi vulputate malesuada nisl velit. Adipiscing s',
      image: 'https://picsum.photos/400/300',
    },
    {
      title: 'Event 2 Title',
      description: 'Description for Event 2. Sapien egestas adipiscing et pharetra nisi. Fusce vitae lectus ornare mauris.',
      image: 'https://picsum.photos/400/300',
    },
    {
      title: 'Event 3 Title',
      description: 'Description for Event 3. Fusce vitae lectus ornare mauris. Lacinia pharetra aenean laoreet morbi vulputate.',
      image: 'https://picsum.photos/400/300',
    },
  ];

  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const featuredEvent = events[activeEventIndex];
  const [showModal, setShowModal] = useState(false);


  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);


  const nextEvent = () => {
    setActiveEventIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const prevEvent = () => {
    setActiveEventIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 pb-4">

        <main className="py-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-800 mt-12">Community Restoration Project</h1>

          {/* Featured Events Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Featured Events</h2>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative">
                <img src={featuredEvent.image} alt="Featured event" className="w-full h-64 md:h-96 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-between px-4">
                  <button onClick={prevEvent} className="text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75">
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={nextEvent} className="text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75">
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{featuredEvent.title}</h3>
                <p className="mb-4 text-gray-600">{featuredEvent.description}</p>
                <div className="flex gap-4">
                  <button onClick={handleOpenModal} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                    Sign up for event
                  </button>
                  <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition duration-300">
                    Remind Me
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Other Events and Posts */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Events and Posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                  <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{event.title}</h3>
                    <p className="mb-4 text-gray-600 text-sm">{event.description}</p>
                    <div className="flex justify-between">
                      <button onClick={handleOpenModal} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition duration-300">Sign up</button>
                      <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-300 transition duration-300">Remind Me</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* Modal for signing up */}
          <Modal show={showModal} handleClose={handleCloseModal}>
            <h2 className="text-xl font-bold">Sign Up for {featuredEvent.title}</h2>
            <p>Please enter your details to sign up for the event.</p>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 mt-4 border rounded"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 mt-4 border rounded"
            />
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
          </Modal>
        </main>
      </div>
    </div>
  );
};

export default CRPWebsite;

