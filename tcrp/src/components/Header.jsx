import React, { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/crp_logo_words.png';

const Header = ({ footerRef }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // reference to the dropdown

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Scroll to footer when "Contact" is clicked
  const handleScrollToFooter = () => {
    if (footerRef && footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Close menu after a link is clicked
  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  // Handle both scroll to footer and close menu when "Contact" is clicked
  const handleContactClick = () => {
    handleScrollToFooter();
    handleMenuItemClick();
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-30">
      <div className="container mx-auto flex justify-between items-center p-0">
        <Link to="/">
          <div className='flex items-center'>
            <img className="w-40 mr-4" src={logo} alt="CRP Logo" />
            <p 
            className='hidden sm:flex text-black text-left flex text-2xl mt-1 font-thin ml-1' 
            style={{ color: '#2b5ea3' }}>Community Restoration Program</p>
          </div>
        </Link>
        <div className="relative flex items-center">
          <nav className="md:flex space-x-6 me-4">
            <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
            <a href="https://www.communityrestorationproject.org/about" className="hidden md:flex text-gray-600 hover:text-blue-600">About</a>
            <a href="/dashboard" className="text-gray-600 hover:text-blue-600">Events</a>
            <a onClick={handleScrollToFooter} className="text-gray-600 hover:text-blue-600 hidden md:flex">
              Contact
            </a>
            {/* <Link to="/signup" className="text-gray-600 hover:text-blue-600">Sign Up</Link> */}
          </nav>

          <button 
            onClick={toggleMenu} 
            className="MenuButton focus:outline-none bg-gray-100 border-2 border-gray-100 hover:border-gray-200 rounded-md p-2 mr-2 md:mr-0"
          >
            <Menu className="text-gray-600" size={24} />
          </button>

          {isMenuOpen && (
            <nav 
              ref={menuRef} // Attach ref to the menu
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
              style={{ top: 'calc(100% + 8px)' }} // Ensures the dropdown appears below the button
            >
              <ul>
                <li>
                  <Link to="/admin" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleMenuItemClick}>Admin</Link>
                </li>
                <li>
                  <Link to="/signup" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleMenuItemClick}>Logout</Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
