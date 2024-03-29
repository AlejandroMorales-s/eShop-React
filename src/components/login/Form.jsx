import React, { useEffect, useRef, useState } from "react";
import {
  loginWithEmail,
  selectIsSubmitting,
  selectLoggedStatus,
} from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../libs/firebase";

export default function Form() {
  const dispatch = useDispatch();
  const logged = useSelector(selectLoggedStatus);
  const isSubmitting = useSelector(selectIsSubmitting);
  //* States
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const [inactiveButton, setInactiveButton] = useState(false);

  //* Refs
  const password = useRef();
  const email = useRef();

  //* Navigate
  const navigate = useNavigate();

  //* Show/Hide Password
  const showPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
    if (isPasswordVisible) password.current.type = "text";
    else password.current.type = "password";
  };

  //* Login
  const login = (e) => {
    e.preventDefault();
    dispatch(
      loginWithEmail({
        auth,
        password: password.current.value,
        email: email.current.value,
      })
    );
  };

  //* Enable/Disable Button
  const validation = () => {
    if (password.current.value.length >= 6 && email.current.value !== "") {
      setInactiveButton(false);
    } else {
      setInactiveButton(true);
    }
  };

  useEffect(() => {
    if (logged) navigate("/feed");

    if (isSubmitting) setInactiveButton(true);
  }, [logged, isSubmitting]);

  return (
    <form onSubmit={login} className="flex flex-col w-100 max-w-45 m-auto">
      <div className="flex flex-col gap-y-0.5 mb-1.5">
        <label
          htmlFor="email"
          className="text-bold font-medium dark:text-gray text-boldText flex flex-col gap-y-0.5 mb-1.5"
        >
          Email
          <input
            ref={email}
            onInput={validation}
            id="email"
            type="email"
            placeholder="example@example.com"
            className="border-primary border-2 rounded px-0.5 h-4.5 shadow-shadow dark:bg-darkBg dark:border-primary-light dark:text-gray focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary"
          />
        </label>
      </div>
      <div className="flex flex-col gap-y-0.5 mb-1.5">
        <label
          htmlFor="password"
          className="text-bold font-medium dark:text-gray text-boldText flex flex-col gap-y-0.5 mb-1.5"
        >
          Password
          <div className="relative h-fit">
            <input
              ref={password}
              onInput={validation}
              id="password"
              type="password"
              placeholder="********"
              className="w-100 border-primary border-2 rounded px-0.5 h-4.5 shadow-shadow dark:bg-darkBg dark:border-primary-light dark:text-gray focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary"
            />
            <div className="absolute top-0 right-0 w-fit h-full flex justify-center items-center px-[10px]">
              {isPasswordVisible ? (
                <svg
                  onClick={showPassword}
                  xmlns="http://www.w3.org/2000/svg"
                  className=" font-semibold text-darkBg dark:text-gray h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  onClick={showPassword}
                  xmlns="http://www.w3.org/2000/svg"
                  className="font-semibold text-darkBg dark:text-gray h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                    clipRule="evenodd"
                  />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              )}
            </div>
          </div>
        </label>
      </div>
      <div className="mt-1 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-center">
        <Link to="/signup">
          <p className="text-primary font-medium dark:text-primary-light">
            You don&apos;t have account? Sign Up
          </p>
        </Link>
        <button
          disabled={inactiveButton}
          className={`${
            inactiveButton ? "opacity-50" : "opacity-100"
          } shadow-shadow w-full sm:w-auto px-2 py-1 bg-primary text-white font-semibold rounded border-2 border-primary transition-all hover:bg-transparent hover:text-primary dark:bg-primary-light dark:text-darkBg dark:border-primary-light dark:hover:bg-transparent dark:hover:text-primary-light`}
          type="submit"
        >
          Login
        </button>
      </div>
    </form>
  );
}
