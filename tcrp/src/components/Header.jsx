// import React, { useState } from 'react';
// import { Menu } from 'lucide-react';
// // import logo from '../assets/crp_logo.webp';
// import logo from '../assets/crp_logo_words.png';


// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <header className="bg-white text-white p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <img className='w-40'src={logo}></img>
//         <div className="relative">
//           <button onClick={toggleMenu} className="MenuButton focus:outline-none bg-gray-100 border-2 border-gray-100 hover:border-gray-100">
//             <Menu className='bg-gray'size={24} />
//           </button>
//           {isMenuOpen && (
//             <nav className="absolute right-0 mt-2 w-48 bg-gray rounded-md shadow-lg py-1 z-10">
//               <ul>
//                 <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Home</a></li>
//                 <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Events</a></li>
//                 <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Sign Up</a></li>
//               </ul>
//             </nav>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import logo from '../assets/crp_logo_words.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-30">
      <div className="container mx-auto flex justify-between items-center p-0">
        <img className="w-40" src={logo} alt="CRP Logo" />
        <div className="relative">
          <button 
            onClick={toggleMenu} 
            className="MenuButton focus:outline-none bg-gray-100 border-2 border-gray-100 hover:border-gray-200 rounded-md p-2"
          >
            <Menu className="text-gray-600" size={24} />
          </button>
          {isMenuOpen && (
            <nav className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <ul>
                <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Home</a></li>
                <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Events</a></li>
                <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Sign Up</a></li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;