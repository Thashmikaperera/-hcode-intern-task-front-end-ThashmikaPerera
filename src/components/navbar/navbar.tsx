import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-primaryColor shadow-md">
      <div className="container mx-auto px-10">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-white text-2xl font-bold">
            <Link to="/" onClick={closeMenu}>FitnessTracker</Link>
          </div>

          {/* Menu Links */}
          <div className="hidden md:flex justify-center flex-1 space-x-6">
            <Link to="/home" className="text-white hover:text-gray-300">Home</Link>
            <Link to="/workout" className="text-white hover:text-gray-300">Workout</Link>
            <Link to="/progress" className="text-white hover:text-gray-300">Progress</Link>
          </div>

          {/* Profile Icon */}
          <div className="hidden md:block">
            <Link to="/profile" className="relative">
              <FaUserCircle className="text-white w-8 h-8 hover:text-gray-300" />
              <span className="sr-only">Profile</span> {/* For accessibility */}
            </Link>
          </div>

          {/* Hamburger Icon (Mobile) */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-2 pb-4">
              <Link to="/home" className="text-white hover:bg-black py-2 px-4" onClick={closeMenu}>Home</Link>
              <Link to="/workout" className="text-white hover:bg-black py-2 px-4" onClick={closeMenu}>Workout</Link>
              <Link to="/progress" className="text-white hover:bg-black py-2 px-4" onClick={closeMenu}>Progress</Link>
              <Link to="/profile" className="text-white hover:bg-black py-2 px-4" onClick={closeMenu}>Profile</Link>
            </div>
          </div>
        )}

        
      </div>
    </nav>
  );
};

export default Navbar;