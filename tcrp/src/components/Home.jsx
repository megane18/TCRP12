import React from 'react';
import { ArrowRight, Heart, Users, Home } from 'lucide-react';
import { FaInstagram, FaYoutube, FaLinkedin, FaFacebook } from 'react-icons/fa';

const CRPHomePage = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 pb-4">
        {/* <header className="flex justify-between items-center py-6">
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
          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </header> */}

        <main className="py-12 mt-12">
          <section className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800">Community Restoration Project</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Empowering communities, restoring hope, and building a brighter future together.</p>
            <a href="/dashboard" className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 inline-flex items-center">
              View Dashboard
              <ArrowRight className="ml-2" size={20} />
            </a>
          </section>

          <section className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
              <Heart className="w-12 h-12 text-red-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2 text-gray-800">Our Mission</h2>
              <p className="text-gray-600">To restore and revitalize communities through collaborative efforts and sustainable initiatives.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
              <Users className="w-12 h-12 text-blue-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2 text-gray-800">Get Involved</h2>
              <p className="text-gray-600">Join our community of volunteers and make a lasting impact in your neighborhood.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
              <Home className="w-12 h-12 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2 text-gray-800">Our Projects</h2>
              <p className="text-gray-600">From housing renovations to community gardens, explore our ongoing restoration projects.</p>
            </div>
          </section>

          <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-8 mb-16">
            <div className="md:flex items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-3xl font-bold mb-2">Ready to make a difference?</h2>
                <p className="text-xl">Join us in our mission to restore and uplift communities.</p>
              </div>
              <a href="/dashboard#events" className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 inline-block">
                Explore Events
              </a>
            </div>
          </section>

          <section className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <p className="text-4xl font-bold text-blue-600 mb-2">50+</p>
                <p className="text-gray-600">Projects Completed</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600 mb-2">1000+</p>
                <p className="text-gray-600">Volunteers Engaged</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600 mb-2">20+</p>
                <p className="text-gray-600">Communities Served</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600 mb-2">$500K+</p>
                <p className="text-gray-600">Funds Raised</p>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-gray-800 text-white p-8 rounded-lg">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-300 transition duration-300">Home</a></li>
                <li><a href="#" className="hover:text-blue-300 transition duration-300">About Us</a></li>
                <li><a href="#" className="hover:text-blue-300 transition duration-300">Projects</a></li>
                <li><a href="#" className="hover:text-blue-300 transition duration-300">Volunteer</a></li>
                <li><a href="#" className="hover:text-blue-300 transition duration-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p>(404) 207-8517</p>
              <p>3726 East Main Street</p>
              <p>College Park, GA 30337</p>
              <p>P.O. Box 211, Fairburn, GA 30213</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
              <div className="flex space-x-4 text-2xl mb-4">
                <a href="#" className="hover:text-blue-300 transition duration-300"><FaFacebook /></a>
                <a href="#" className="hover:text-blue-300 transition duration-300"><FaInstagram /></a>
                <a href="#" className="hover:text-blue-300 transition duration-300"><FaYoutube /></a>
                <a href="#" className="hover:text-blue-300 transition duration-300"><FaLinkedin /></a>
              </div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300 text-lg font-semibold w-full mb-2">Donate</button>
              <button className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-gray-800 transition duration-300 text-lg font-semibold w-full">Report an issue</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CRPHomePage;