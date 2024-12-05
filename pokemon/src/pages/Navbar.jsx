import { useEffect, useRef, useState } from "react";
import { GoArrowSwitch } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (isHomePage) return;

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isHomePage]);
  if (isHomePage) {
    return null;
  }
  return (
    <nav ref={navRef} className="text-white fixed top-0 w-full z-20">
      <div className="w-full">
        <div className="flex justify-end relative">
          <div className="flex items-center sm:hidden w-12 h-12 md:w-14 md:h-14 bg-white bg-opacity-50 absolute top-8 justify-center rounded-lg">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-gray-700"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <IoClose className="block w-8 h-8" aria-hidden="true" />
              ) : (
                <GoArrowSwitch className="block w-8 h-8" aria-hidden="true" />
              )}
            </button>
          </div>
          {/* Desk screen size*/}
          <div className="hidden sm:flex ">
            <ul className="flex flex-row">
              <li className="bg-[#e04d29] p-4 rounded-b-lg bg-opacity-85">
                <Link to="/pokemon" className="hover:text-yellow-300">
                  Pokémon
                </Link>
              </li>
              <li className="bg-[#264d5d] p-4 rounded-b-lg bg-opacity-85">
                <Link to="/digimon" className="hover:text-yellow-300">
                  Digimon
                </Link>
              </li>
            </ul>
          </div>
          {/* mobile screen size */}
          {isOpen && (
            <div
              className="sm:hidden absolute top-20 transition ease-out duration-300 rounded-lg shadow-lg"
              id="mobile-menu"
            >
              <ul className="pt-2 mt-2">
                <li className="bg-[#e04d29] p-4 rounded-l-lg bg-opacity-85">
                  <Link to="/pokemon" className="block hover:text-yellow-300">
                    Pokémon
                  </Link>
                </li>
                <li className="bg-[#264d5d] p-4 rounded-l-lg bg-opacity-85">
                  <Link to="/digimon" className="block hover:text-yellow-300">
                    Digimon
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
