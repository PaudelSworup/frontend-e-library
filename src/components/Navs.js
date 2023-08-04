import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

const Navs = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 items-center">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:block ml-6">
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                aria-current="page"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >
                Team
              </a>
              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >
                Projects
              </a>
              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >
                Calendar
              </a>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="sm:hidden absolute inset-y-0 right-0 flex items-center pr-2">
            <button
              type="button"
              className="relative bg-gray-800 p-1 transition-all duration-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={toggleMobileMenu}
            >
              <FaBars className="text-white text-xl " />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } sm:hidden px-2 pb-3 pt-2 transition-all duration-300 max-h-[20rem]`}
        id="mobile-menu"
      >
        <div className="flex flex-col space-y-4">
          <a
            href="#"
            className="bg-gray-900 text-white rounded-md px-3 py-2 text-base font-medium"
            aria-current="page"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
          >
            Team
          </a>
          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
          >
            Projects
          </a>
          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
          >
            Calendar
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navs;
