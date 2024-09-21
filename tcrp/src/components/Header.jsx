import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import logo from '../assets/crp_logo.webp';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <img className='w-20'src={logo}></img>
        <div className="relative">
          <button onClick={toggleMenu} className="MenuButton focus:outline-none bg-blue-100">
            <Menu className='bg-gray'size={24} />
          </button>
          {isMenuOpen && (
            <nav className="absolute right-0 mt-2 w-48 bg-gray rounded-md shadow-lg py-1 z-10">
              <ul>
                <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Home</a></li>
                <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Events</a></li>
                <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Sign Up</a></li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;