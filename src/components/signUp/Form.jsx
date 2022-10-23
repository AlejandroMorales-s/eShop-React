import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createAccountWithEmail, selectLoggedStatus } from "../../features/user/userSlice";

import { auth } from "../../libs/firebase";

export default function Form({ setShowingModal, setError }) {
  const dispatch = useDispatch();
  const loggedStatus = useSelector(selectLoggedStatus);
  //* States
  const [validPassword, setValidPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [inactiveButton, setInactiveButton] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [inputClicked, setInputClicked] = useState(false);

  //* Refs
  const password = useRef();
  const confirmPassword = useRef();
  const name = useRef();
  const email = useRef();

  //* Navigate
  const navigate = useNavigate();

  //* Regular Expressions
  const passwordRegex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  const emailRegex = /^[\w.]+@[\w]+\.{1}[\w]+(.{1}[\w]+)*$/;

  const validation = () => {
    let validEmail = false;
    let validPassword = false;
    const pass = password.current.value;
    const mail = email.current.value;
    if (passwordRegex.test(pass)) {
      setValidPassword(true);
      validPassword = true;
    } else {
      setValidPassword(false);
      validPassword = false;
    }
    if (emailRegex.test(mail)) {
      setValidEmail(true);
      validEmail = true;
    } else {
      setValidEmail(false);
      validEmail = false;
    }

    if (confirmPassword.current.value === "" || name.current.value === "" || email.current.value === "" || validEmail === false || validPassword === false) {
      setInactiveButton(true);
    } else {
      setInactiveButton(false);
    }

    if (confirmPassword.current.value === password.current.value && password.current.value !== "") {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
      setInactiveButton(true);
    }
  };

  //* Show/Hide Password
  const showPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
    if (isPasswordVisible) password.current.type = "text";
    else password.current.type = "password";
  };

  //* Sign Up
  const accountCreated = (e) => {
    e.preventDefault() ;

    dispatch(createAccountWithEmail({
      auth,
      email: email.current.value,
      password: password.current.value,
      name: name.current.value
    }))
  };

  if (loggedStatus) navigate('/feed');

  const clicked = () => setInputClicked(true);

  return (
    <form onSubmit={accountCreated} className="flex flex-col w-100 max-w-45 m-auto">
      <div className="flex flex-col gap-y-0.5 mb-1.5">
        <label htmlFor="name" className="text-bold font-medium dark:text-gray text-boldText">
          Name
          <input
            onInput={validation} 
            ref={name} 
            id="name" 
            type="text" 
            placeholder="Name" 
            className="border-primary border-2 rounded px-0.5 h-4.5 shadow-shadow dark:bg-darkBg dark:border-primary-light dark:text-gray focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary" 
          />
        </label>
      </div>
      <div className="flex flex-col gap-y-0.5 mb-1.5">
        <label htmlFor="email" className="text-bold font-medium dark:text-gray text-boldText">
          Email
          <input 
            onInput={validation} 
            ref={email} 
            id="email" 
            type="email" 
            placeholder="example@gmail.com" 
            className="border-primary border-2 rounded px-0.5 h-4.5 shadow-shadow dark:bg-darkBg dark:border-primary-light dark:text-gray focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary" 
          />
        </label>
      </div>
      <div className="flex flex-col gap-y-0.5 mb-1.5">
        <label htmlFor="password" className="text-bold font-medium dark:text-gray text-boldText">
          Password
          <div className="relative w-100">
            <input 
              onInput={validation} 
              onClick={clicked} 
              ref={password} 
              id="password" 
              type="password" 
              placeholder="********" 
              className={`w-100 border-primary border-2 rounded px-0.5 h-4.5 shadow-shadow dark:bg-darkBg dark:border-primary-light dark:text-gray focus:ring-1 focus:outline-none ${validPassword ? "focus:border-green focus:ring-green dark:focus:border-green dark:focus:ring-green" : "focus:border-yellow focus:ring-yellow dark:focus:border-yellow dark:focus:ring-yellow"}`} 
            />
            {isPasswordVisible
              ? (
                <svg onClick={showPassword} xmlns="http://www.w3.org/2000/svg" className=" font-semibold text-darkBg dark:text-gray h-6 w-6 absolute -translate-y-2/4 top-2/4 right-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              )
              : (
                <svg onClick={showPassword} xmlns="http://www.w3.org/2000/svg" className="font-semibold text-darkBg dark:text-gray h-6 w-6 absolute -translate-y-2/4 top-2/4 right-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              )}
          </div>
        </label>
        <div className={`${validPassword ? "bg-green" : "bg-yellow"} transition-all delay-100 ease-out h-fit -translate-y-0.5 px-1 py-0.5 ${inputClicked ? "relative opacity-100" : "absolute opacity-0"} rounded rounded-bl-xl`}>
          {validPassword
            ? <p>Password valid! 🙌</p>
            : (
              <p>
                8-16 characters, at least one digit, one lower and upper case letter 😢
              </p>
            )}
        </div>
      </div>
      <div className="flex flex-col gap-y-0.5 mb-1.5">
        <label htmlFor="confirmPassword" className="text-bold font-medium dark:text-gray text-boldText">
          Confirm password
          <input 
            onInput={validation} 
            ref={confirmPassword} 
            id="confirmPassword" 
            type="password" 
            placeholder="Confirm password" 
            className={` border-primary border-2 rounded px-0.5 h-4.5 shadow-shadow dark:bg-darkBg dark:border-primary-light dark:text-gray focus:ring-1 focus:outline-none ${passwordsMatch ? "focus:border-green focus:ring-green dark:focus:border-green dark:focus:ring-green" : "focus:border-red focus:ring-red dark:focus:border-red dark:focus:ring-red"}`} 
          />
          <div className={`${passwordsMatch ? "bg-green" : "bg-red"} transition-all delay-100 ease-out h-fit -translate-y-0.5 px-1 py-0.5 ${inputClicked ? "relative opacity-100" : "absolute opacity-0"} rounded rounded-bl-xl`}>
            {passwordsMatch ? <p>Passwords match! 🥳</p> : <p>Passwords not match 😞</p>}
          </div>
        </label>
      </div>
      <div className="mt-1 flex justify-between items-center">
        <Link to="/login">
          <p className="text-primary font-medium dark:text-primary-light">You already have account? Login</p>
        </Link>
        <button disabled={inactiveButton} className={`${inactiveButton ? "opacity-50" : "opacity-100"} shadow-shadow px-2 py-1 bg-primary text-white font-semibold rounded border-2 border-primary transition-all hover:bg-transparent hover:text-primary dark:bg-primary-light dark:text-darkBg dark:border-primary-light dark:hover:bg-transparent dark:hover:text-primary-light`} type="submit">Sign Up</button>
      </div>
    </form>
  );
}
