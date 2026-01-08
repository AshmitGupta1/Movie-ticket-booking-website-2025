import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Search, User } from 'lucide-react';
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Film className="w-8 h-8 text-red-500" />
            <span className="text-2xl font-bold">QUICKSHOW</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full px-4 py-2 pl-10 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-red-500"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link to="/movies" className="hover:text-red-500 transition">
              Movies
            </Link>
            <Link to="/my-bookings" className="hover:text-red-500 transition">
              My Bookings
            </Link>
            
            {/* Auth Button */}
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <button className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition">
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
