import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../store/auth';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const {isloggin} = useAuth()

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">Task Manager</div>
        <div className="hidden md:flex space-x-6">
         
          {isloggin ? <NavLink  to="/logout" className="hover:text-gray-300">Logout</NavLink> :
          <>
           <NavLink to="/" className="hover:text-gray-300">Register</NavLink>
           <NavLink to="/login" className="hover:text-gray-300">Login</NavLink>
          </>
          }
         
          <NavLink  to="/Dashboard" className="hover:text-gray-300">Dashboard</NavLink>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4">
          <NavLink href="#" className="block text-center hover:bg-blue-500 p-2">Register</NavLink>
          <NavLink href="#" className="block text-center hover:bg-blue-500 p-2">Login</NavLink>
          <NavLink href="#" className="block text-center hover:bg-blue-500 p-2">Dashboard</NavLink>
          <NavLink href="#" className="block text-center hover:bg-blue-500 p-2">Logout</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
