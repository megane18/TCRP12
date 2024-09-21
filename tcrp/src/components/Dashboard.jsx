import React, { useState } from 'react';
import { Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaInstagram, FaYoutube, FaLinkedin, FaFacebook } from 'react-icons/fa';

const CRPWebsite = () => {
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

  const nextEvent = () => {
    setActiveEventIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const prevEvent = () => {
    setActiveEventIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 pb-4">
        <header className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <img src="/api/placeholder/40/40" alt="CRP Logo" className="w-12 h-12 mr-3" />
            <span className="text-2xl font-bold text-blue-600">CRP</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600">Home</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">About</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Events</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
          </nav>
          <Menu className="w-6 h-6 md:hidden" />
        </header>

        <main className="py-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-800">Community Restoration Project</h1>

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
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
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
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition duration-300">Sign up</button>
                      <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-300 transition duration-300">Remind Me</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-lg">
          <div className="flex flex-col md:flex-row justify-between items-start space-y-6 md:space-y-0">
            {/* Contact Information */}
            <div className='md:text-left'>
              <h2 className="text-xl font-bold mb-4">Contact Us</h2>
              <p>(404) 207-8517</p>
              <p>3726 East Main Street</p>
              <p>College Park, GA 30337</p>
              <p>Mailing Address:</p>
              <p>P.O. Box 211</p>
              <p>Fairburn, GA 30213</p>
            </div>

            {/* Social Media Icons */}
            <div>
              <h2 className="text-xl font-bold mb-4">Connect With Us</h2>
              <div className="flex space-x-4 text-2xl">
                <a href="#" className="text-white hover:text-gray-300 transition duration-300">
                  <FaFacebook />
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition duration-300">
                  <FaInstagram />
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition duration-300">
                  <FaYoutube />
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition duration-300">
                  <FaLinkedin />
                </a>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col space-y-4">
              <button className="bg-white text-purple-600 py-2 px-6 rounded-full hover:bg-gray-100 transition duration-300 text-lg font-semibold">Donate</button>
              <button className="bg-transparent border-2 border-white text-white py-2 px-6 rounded-full hover:bg-white hover:text-purple-600 transition duration-300 text-lg font-semibold">Report an issue</button>
            </div> 
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CRPWebsite;

