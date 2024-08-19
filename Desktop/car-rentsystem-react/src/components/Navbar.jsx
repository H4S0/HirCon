import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabase";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

function Navbar({ isLogged, setIsLogged }) {
  const [email, setEmail] = useState(null);
  const [isToggle, setIsToggle] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      if (isLogged) {
        const res = await supabase.auth.getSession();
        const user = res.data?.session?.user;
        if (user) {
          setEmail(user.email);
        }
      } else {
        setEmail(null);
      }
    }
    fetchUser();
  }, [isLogged]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      setIsLogged(false);
      setEmail(null);
    }
  };

  return (
    <nav className="p-4 flex flex-col md:flex-row justify-between items-center">
      <div className="w-full flex justify-between items-center">
        {/* Burger menu button for smaller screens */}
        <div className="md:hidden">
          <button onClick={() => setIsToggle(!isToggle)}>
            {isToggle ? (
              <IoCloseOutline className="text-3xl" />
            ) : (
              <CiMenuBurger className="text-3xl" />
            )}
          </button>
        </div>

        {/* Left side menu items for larger screens */}
        <div
          className={`${
            isToggle ? "block" : "hidden"
          } md:flex flex-col md:flex-row justify-start items-start md:items-center gap-4 md:gap-10`}
        >
          <ul className="flex flex-col md:flex-row gap-4 md:gap-10 text-gray-700">
            <li>
              <Link
                to="/"
                className="hover:text-sky-500 transition-colors duration-300 whitespace-nowrap"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/howworks"
                className="hover:text-blue-500 transition-colors duration-300 whitespace-nowrap"
              >
                How it works
              </Link>
            </li>
            <li>
              <Link
                to="/cars"
                className="hover:text-blue-500 transition-colors duration-300 whitespace-nowrap"
              >
                Cars
              </Link>
            </li>
            <li>
              <Link
                to="/whychoose"
                className="hover:text-blue-500 transition-colors duration-300 whitespace-nowrap"
              >
                Why choose us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-blue-500 transition-colors duration-300 whitespace-nowrap"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Right side buttons for larger screens */}
        <div className="hidden md:flex items-center gap-5">
          {isLogged ? (
            <div className="flex flex-row items-center gap-4 text-gray-700">
              <span>{email}</span>
              <button
                onClick={handleLogout}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-5">
              <Link
                to="/signup"
                className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-sky-600 transition-colors duration-300 whitespace-nowrap"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-colors duration-300 whitespace-nowrap"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile layout: menu and buttons all on the left */}
      {isToggle && (
        <div
          className={`absolute top-0 left-0 bg-[#e6e7e7] w-full h-full z-50 flex flex-col p-4 transition-transform duration-500 ${
            isToggle ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between">
            <button onClick={() => setIsToggle(!isToggle)}>
              <IoCloseOutline className="text-3xl" />
            </button>
          </div>
          <ul className="flex flex-col gap-4 text-gray-700 mt-10 text-xl">
            {" "}
            {/* Adjusted text size for mobile */}
            <li>
              <Link
                to="/"
                className="hover:text-sky-500 transition-colors duration-300 whitespace-nowrap"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/howworks"
                className="hover:text-blue-500 transition-colors duration-300 whitespace-nowrap"
              >
                How it works
              </Link>
            </li>
            <li>
              <Link
                to="/cars"
                className="hover:text-blue-500 transition-colors duration-300 whitespace-nowrap"
              >
                Cars
              </Link>
            </li>
            <li>
              <Link
                to="/whychoose"
                className="hover:text-blue-500 transition-colors duration-300 whitespace-nowrap"
              >
                Why choose us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-blue-500 transition-colors duration-300 whitespace-nowrap"
              >
                Contact
              </Link>
            </li>
          </ul>

          <div className="flex flex-col items-start mt-10 gap-4">
            {isLogged ? (
              <div className="flex flex-col text-gray-700">
                <span>{email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition-colors duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Link
                  to="/signup"
                  className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-sky-600 transition-colors duration-300"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-colors duration-300"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
