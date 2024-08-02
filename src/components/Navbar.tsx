import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white text-black p-4 flex justify-between shadow-md sticky top-0 z-50">
      <div className="text-xl font-semibold">Logo</div>
      <ul
        className={`md:flex md:items-center md:space-x-6 md:space-y-0 space-y-4 ${isOpen ? "block" : "hidden"} md:block`}
      >
        <li>
          <a href="#home" className="hover:text-gray-600">
            Home
          </a>
        </li>
        <li>
          <a href="#about" className="hover:text-gray-600">
            About
          </a>
        </li>
        <li>
          <a href="#services" className="hover:text-gray-600">
            Services
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:text-gray-600">
            Contact
          </a>
        </li>
      </ul>
      <button
        type="button"
        className="md:hidden flex items-center justify-center p-2"
        onClick={handleToggle}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onKeyDown={(e) => e.key === "Enter" && handleToggle()} // Handle Enter key
        tabIndex={0} // Make the button focusable
      >
        <FontAwesomeIcon
          icon={isOpen ? faTimes : faBars}
          className="text-2xl"
        />
      </button>
    </nav>
  );
}

export default Navbar;
