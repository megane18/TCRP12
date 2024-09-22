import React, { useRef } from 'react';
import { Link } from 'react-router-dom';


import { FaInstagram, FaYoutube, FaLinkedin, FaFacebook } from 'react-icons/fa'; // For social media icons

const Footer = ({ footerRef }) => {
  return (
    <footer footer ref={footerRef} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 md:pr-28 md:pl-28 md:pt-6 md:pb-3">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-6 md:space-y-0">
        {/* Contact Information */}
        <div className='md:text-left'>
          <h2 className="text-lg font-bold">Contact Us</h2>
          <p>(404) 207-8517</p>
          <p>3726 East Main Street</p>
          <p>College Park, GA 30337</p>
          <p>Mailing Address:</p>
          <p>P.O. Box 211</p>
          <p>Fairburn, GA 30213</p>
          {/* <a href="mailto:phunter@communityrestorationproject.org" className="text-blue-300 underline">
            phunter@communityrestorationproject.org
          </a> */}
        </div>

        {/* Social Media Icons */}
        <div className='h-full'>
            <h2 className="text-lg font-bold">Connect With Us</h2>
            <div className="flex space-x-4 text-2xl justify-center md:justify-start">
              <a href="#" className="text-white hover:text-gray-300">
                <FaFacebook />
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <FaInstagram />
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <FaYoutube />
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <FaLinkedin />
              </a>
            </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col space-y-4">
          <button className="bg-gray-100 py-2 p-4 rounded-md hover:bg-gray-600 text-black">Donate</button>
          <Link to="/request-form">
            <button className="bg-gray-100 py-2 p-4 rounded-md hover:bg-gray-600 text-black">Report an issue</button>
          </Link>
        </div> 
      </div>
    </footer>
  );
};

export default Footer;
