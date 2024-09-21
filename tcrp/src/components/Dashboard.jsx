import React, { useState } from 'react';
import { Menu } from 'lucide-react';
//working
const CRPWebsite = () => {
  const events = [
    {
      title: 'Lorem ipsum dolor',
      description:
        'Lorem ipsum dolor sit amet consectetur. Sapien egestas adipiscing et pharetra nisi. Fusce vitae lectus ornare mauris. Lacinia pharetra aenean laoreet morbi vulputate malesuada nisl velit. Adipiscing s',
      image: '/api/placeholder/400/300',
    },
    {
      title: 'Event 2 Title',
      description:
        'Description for Event 2. Sapien egestas adipiscing et pharetra nisi. Fusce vitae lectus ornare mauris.',
      image: '/api/placeholder/400/300',
    },
    {
      title: 'Event 3 Title',
      description:
        'Description for Event 3. Fusce vitae lectus ornare mauris. Lacinia pharetra aenean laoreet morbi vulputate.',
      image: '/api/placeholder/400/300',
    },
  ];

  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const featuredEvent = events[activeEventIndex];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-md mx-auto px-4 pb-4">
        <header className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <img src="/api/placeholder/40/40" alt="CRP Logo" className="w-10 h-10 mr-2" />
            <span className="text-xl font-bold text-blue-600">CRP</span>
          </div>
          <Menu className="w-6 h-6" />
        </header>

        <div className="bg-[#E6EEF3] rounded-lg p-4">
          <main className="py-4">
            <h1 className="text-3xl font-bold mb-6">Community Restoration Project</h1>

            {/* Featured Events Section */}
            <section className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Featured Events</h2>
              <div className="bg-[#7F3C84] rounded-lg overflow-hidden shadow-md p-2">
                <div className="bg-[#E8DCD7] rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row md:h-[250px]">
                    <img src={featuredEvent.image} alt="Featured event" className="md:w-1/2 object-cover h-64 md:h-full" />
                    <div className="p-4 md:w-1/2">
                      <h3 className="text-xl font-bold">{featuredEvent.title}</h3>
                      <p className="mb-4 text-sm">{featuredEvent.description}</p>
                      <div className="flex flex-col gap-2">
                        <button className="bg-black text-white px-2 py-1 rounded text-sm">
                          Sign up for event
                        </button>
                        <button className="bg-[#D9D9D9] text-black px-2 py-1 rounded text-sm">
                          Remind Me
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Event Navigation Indicators */}
                  <div className="flex justify-center gap-2 py-4">
                    {events.map((_, index) => (
                      <div
                        key={index}
                        onClick={() => setActiveEventIndex(index)}
                        className={`w-4 h-4 rounded-full cursor-pointer ${
                          index === activeEventIndex ? 'bg-black' : 'bg-[#D9D9D9]'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Other Events and Posts */}
            <section className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Events and Posts</h2>
              {events.map((event, index) => (
                <div key={index} className="bg-[#7F3C84] rounded-lg overflow-hidden shadow-md mb-4 p-2">
                  <div className="bg-[#E4E9ED] rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row md:h-[250px]">
                      <img src={event.image} alt={event.title} className="md:w-1/2 object-cover h-64 md:h-full" />
                      <div className="p-4 md:w-1/2">
                        <h3 className="text-xl font-bold">{event.title}</h3>
                        <p className="mb-4 text-sm">{event.description}</p>
                        <div className="flex flex-col gap-2">
                          <button className="bg-black text-white px-2 py-1 rounded text-sm">Sign up for event</button>
                          <button className="bg-[#D9D9D9] text-black px-2 py-1 rounded text-sm">Remind Me</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </main>

          {/* Footer */}
          <footer className="bg-[#7F3C84] text-white p-4">
            <div className="flex flex-col md:flex-row justify-between">
              {/* Contact Info */}
              <div>
                <h2 className="text-xl font-bold mb-2">CONTACT US</h2>
                <p>(404) 207-4517</p>
                <p>3725 East Main Street</p>
                <p>College Park, GA 30337</p>
                <p className="mb-4">crp@communityrestorationproject.org</p>
              </div>

              {/* Social Media Icons */}
              <div className="flex gap-2 justify-center items-center my-4 md:my-0">
                {['X', 'Instagram', 'LinkedIn'].map((social, index) => (
                  <div key={index} className="w-6 h-6 bg-[#E4E9ED] rounded-full"></div>
                ))}
              </div>

              {/* Report and Donate Buttons */}
              <div className="flex flex-col md:flex-row md:gap-4 justify-between">
                <button className="bg-[#E4E9ED] text-black px-4 py-2 rounded mb-2 md:mb-0">Report an Issue</button>
                <button className="bg-[#E4E9ED] text-black px-4 py-2 rounded">Donate</button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default CRPWebsite;

