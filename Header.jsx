import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { Linkedin, Instagram, Behance } from 'lucide-react';

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 py-6 px-8 flex justify-between items-center bg-white/90 backdrop-blur-md">
    <div className="flex items-center space-x-2">
      <Aperture className="w-6 h-6 text-gray-900" />
      <span className="font-bold text-lg">RAJ NARAYANAN V</span>
    </div>
    <nav className="hidden sm:flex space-x-8 text-sm font-medium uppercase text-gray-600">
      <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
      <Link to="/about" className="hover:text-gray-900 transition-colors">About</Link>
      <Link to="/services" className="hover:text-gray-900 transition-colors">Services</Link>
      <Link to="/projects" className="hover:text-gray-900 transition-colors">Work</Link>
      <Link to="/contact" className="hover:text-gray-900 transition-colors">Contact</Link>
    </nav>
    
    {/* 2. Update the social media icons section */}
    <div className="flex space-x-4">
      {/* Instagram Icon Link */}
      <a 
        href="https://www.instagram.com/raj_lucario/" 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="Instagram Profile"
      >
        <Instagram className="w-5 h-5 text-gray-500 hover:text-gray-900 cursor-pointer transition-colors" />
      </a>

      {/* LinkedIn Icon Link */}
      <a 
        href="https://www.linkedin.com/in/raj-narayanan-v-a96524344?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="LinkedIn Profile"
      >
        <Linkedin className="w-5 h-5 text-gray-500 hover:text-gray-900 cursor-pointer transition-colors" />
      </a>
      
      {/* Behance Icon Link */}
      <a 
        href="https://www.behance.net/rajnartirunel" 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="Behance Profile"
      >
        <Behance className="w-5 h-5 text-gray-500 hover:text-gray-900 cursor-pointer transition-colors" />
      </a>
    </div>
  </header>
);
export default Header;
