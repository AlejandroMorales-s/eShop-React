import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { globalContext } from "../globalContext/GlobalContext";
//* Icons
//* Dropdowns
import MyAccountDropdown from "./MyAccountDropdown";
import MyAccountDropdownPhone from "./MyAccountDropdownPhone";
import ShoppingCartDropdown from "./ShoppingCartDropdown";
import SearchInput from "./SearchInput";

export default function Navbar() {
  //* Global Context
  const { user } = useContext(globalContext);
  const { shoppingAddress } = useContext(globalContext);

  //* States
  const [showNavbar, setShowNavbar] = useState(true);

  //* Show/Hide Navbar on scroll
  let currentPosition = window.pageYOffset;

  window.onscroll = () => {
    const scrolling = window.pageYOffset;
    if (currentPosition >= scrolling) setShowNavbar(true);
    else setShowNavbar(false);
    currentPosition = scrolling;
  };

  return (
    <div className={`fixed ${showNavbar ? "top-0" : "-top-[100px]"} bg-white z-20 shadow-containersShadow dark:bg-darkBg transition-all ease-in-out delay-100 w-100 border-b-2 border-b-gray dark:border-gray-grayDark`}>
      <div className="w-95 max-w-130 m-auto flex justify-between items-center py-1">
        <Link to="/feed">
          <h1 className="text-primary dark:text-primary-light font-semibold text-logo">eShop</h1>
        </Link>
        <Link to="/account/my-addresses">
          <div className="sm:flex hidden items-center gap-0.5">
            <FaMapMarkerAlt className="text-primary dark:text-primary-light text-[30px] hover:-translate-y-0.5 transition-all ease-in-out delay-50" />
            <div className="flex flex-col">
              {shoppingAddress.directionAdded
                ? (
                  <>
                    <p className="text-text dark:text-gray">{`Send to ${shoppingAddress.name}`}</p>
                    <p className=" text-boldText font-semibold dark:text-white">{`${shoppingAddress.streetAndNumber}, ${shoppingAddress.country}`}</p>
                  </>
                )
                : (
                  <>
                    <p className="text-text dark:text-gray">{`Send to ${user.name}`}</p>
                    <p className=" text-boldText font-semibold dark:text-white">Add direction...</p>
                  </>
                )}
            </div>

          </div>
        </Link>
        <SearchInput />
        <div className="sm:flex hidden gap-5">
          <MyAccountDropdown user={user} />
          <ShoppingCartDropdown />
        </div>
        <div className="sm:hidden block">
          <MyAccountDropdownPhone user={user} />
        </div>
      </div>
    </div>
  );
}
