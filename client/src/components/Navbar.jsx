import React from "react";
import { useState } from "react";
import { close, logo2, menu } from "../assets";
import { navLinks } from "../constants";
import Button from "./ButtonG";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const Navbar = ({ handleEmail }) => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const [toggle, setToggle] = useState(false);
  const [isHover, SetIsHover] = useState(false);
  const handleMOuseHover = () => {
    SetIsHover(true);
  };
  const handleMouseStopHover = () => {
    SetIsHover(false);
  };
  if (isAuthenticated && user.email && handleEmail) {
    handleEmail(user.email);
  }

  return (
    // go to documnetation when in doubt
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src={logo2} alt="truthforge" className="w-[80px] h-[80px]" />
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] text-white mr-10 hover:text-blue-600`}
            onmouseenter={handleMOuseHover}
            onMouseLeave={handleMouseStopHover}
          >
            {/* <div className={`group {$isHover? bg-`}> */}
            <a href={`${nav.id}`}>{nav.title}</a>
          </li>
        ))}
        <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white mr-10 hover:text-blue-600`}>
          {/* <Link
            to={{
              pathname: "/dash",
              state: { userEmail: isAuthenticated ? user.email : "" },
            }}
          >
            Dashboard
          </Link> */}
        </li>
        {isAuthenticated ? (
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            type="button"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 p-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" // Pass the onClick function prop here
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => loginWithRedirect()}
            type="button"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 p-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" // Pass the onClick function prop here
          >
            Login
          </button>
        )}
      </ul>

      {/* for mobile view */}
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle((prev) => !prev)}
        />
      </div>
      <div
        className={`${
          toggle ? "flex" : "hidden"
        } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
      >
        <ul className="list-none flex flex-col justify-end items-center flex-1">
          {navLinks.map((nav, index) => (
            <li
              key={nav.id}
              className={`font-poppins font-normal cursor-pointer text-[16px] text-white ${
                index === navLinks.length - 1 ? "mr-0" : "mb-4"
              }`}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
