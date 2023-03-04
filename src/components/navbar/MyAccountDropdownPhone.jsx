import React, { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
//* Icons
import { BiHistory } from "react-icons/bi";
import { BsBoxSeam } from "react-icons/bs";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiOutlineMenu, AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { logout } from "../../features/user/userSlice";
import { auth } from "../../libs/firebase";

export default function MyAccountDropdownPhone({ user }) {
  const dispatch = useDispatch();

  const options = [
    {
      title: "My account",
      link: "/account",
      icon: (
        <AiOutlineUser className="text-primary dark:text-primary-light text-[30px]" />
      ),
    },
    {
      title: "Wishlist",
      link: "/account/my-wishlist",
      icon: (
        <AiOutlineHeart className="text-primary dark:text-primary-light text-[30px]" />
      ),
    },
    {
      title: "Orders",
      link: "/account/orders",
      icon: (
        <BsBoxSeam className="text-primary dark:text-primary-light text-[30px]" />
      ),
    },
    {
      title: "History",
      link: "/account/history",
      icon: (
        <BiHistory className="text-primary dark:text-primary-light text-[30px]" />
      ),
    },
    {
      title: "Add product",
      link: "/add-product",
      icon: (
        <IoMdAddCircleOutline className="text-primary dark:text-primary-light text-[30px]" />
      ),
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const navigate = useNavigate();

  const menuOpen = () => setIsOpen(!isOpen);

  const darkMode = () => {
    document.getElementById("html").classList.toggle("dark");
    document.getElementById("html").classList.toggle("bg-darkBody");
    document.getElementById("html").classList.toggle("bg-lightBg");
    if (document.getElementById("html").classList.contains("bg-darkBody"))
      setDark(true);
    else setDark(false);
  };

  const logoutHandler = () => dispatch(logout(auth)).then(() => navigate("/"));

  return (
    <Menu>
      <Menu.Button className="flex items-center justify-center h-full">
        <div role="button" tabIndex={0} onKeyDown={menuOpen} onClick={menuOpen}>
          <AiOutlineMenu
            className={`${
              isOpen
                ? "text-primary dark:text-primary-light"
                : "text-darkBg dark:text-gray"
            } text-[30px]`}
          />
        </div>
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-100 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className="absolute top-16 right-[1%]"
      >
        <Menu.Items className=" flex flex-col bg-white border-2 border-gray rounded p-1 gap-1 shadow-containersShadow dark:bg-darkBg dark:border-gray-grayDark">
          <Menu.Item className="bg-white flex justify-between items-center gap-2 p-0.5 rounded w-100 dark:bg-darkBg border-2 border-white hover:border-gray dark:border-darkBg dark:hover:border-gray-grayDark hover:shadow-containersShadow transition-all ease-in-out delay-50">
            {({ active }) => (
              <div>
                <p className="text-center text-bold font-semibold dark:text-white">
                  Hello
                  <br />
                  {`${user.displayName}!`}
                </p>
              </div>
            )}
          </Menu.Item>
          {options.map((option) => (
            <Menu.Item key={option.title}>
              {({ active }) => (
                <Link to={option.link}>
                  <div className="bg-white flex justify-between items-center gap-2 p-0.5 rounded w-100 dark:bg-darkBg border-2 border-white hover:border-gray dark:border-darkBg dark:hover:border-gray-grayDark hover:shadow-containersShadow transition-all ease-in-out delay-50">
                    {option.icon}
                    <div className="w-100">
                      <p className="text-text dark:text-gray">{option.title}</p>
                    </div>
                  </div>
                </Link>
              )}
            </Menu.Item>
          ))}
          <Menu.Item
            onClick={darkMode}
            className="cursor-pointer bg-white rounded shadow-shadow w-100 border-2 border-primary dark:bg-darkBg dark:border-primary-light hover:bg-primary dark:hover:bg-primary-light transition-all ease-in-out delay-50"
          >
            {({ active }) => (
              <div>
                <p className="text-primary font-medium dark:text-primary-light p-1 text-center hover:text-white dark:hover:text-boldText transition-all ease-in-out delay-50 h-full w-full">
                  {dark ? "Light" : "Dark"} mode
                </p>
              </div>
            )}
          </Menu.Item>
          <Menu.Item
            onClick={logoutHandler}
            className="cursor-pointer bg-red rounded shadow-containersShadow w-100 hover:bg-transparent border-2 border-red transition-all ease-in-out delay-50"
          >
            {({ active }) => (
              <div className="">
                <p className="p-1 text-white font-medium text-center hover:text-red transition-all ease-in-out delay-50 h-full w-full">
                  Log Out
                </p>
              </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
