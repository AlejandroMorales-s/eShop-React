import React, {
  useContext, useState, useRef, useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { globalContext } from "../globalContext/GlobalContext";

export default function AddAddressForm() {
  //* Context
  const { addresses, setAddresses } = useContext(globalContext);

  //* States
  const [setError] = useState({
    isError: false,
    error: "",
  });
  const [inactiveButton, setInactiveButton] = useState(true);

  //* Navigate
  const navigate = useNavigate();

  //* Refs
  const country = useRef();
  const name = useRef();
  const streetNumber = useRef();
  const postalCode = useRef();
  const phoneNumber = useRef();
  const instructions = useRef();

  //* Active Button
  const validation = () => {
    if (country.current.value === "" || name.current.value === "" || streetNumber.current.value === "" || postalCode.current.value.length !== 5 || phoneNumber.current.value === "") {
      setInactiveButton(true);
    } else {
      setInactiveButton(false);
    }
  };

  //* Create id for new direction
  const createId = () => {
    const id = Math.floor(Math.random() * 1000000);
    return id;
  };

  //* Add Direction
  const addDirection = (e) => {
    e.preventDefault();

    if (country.current.value === "" || name.current.value === "" || streetNumber.current.value === "") {
      setError({
        isError: true,
        error: "Please fill in all the fields",
      });
    } else if (postalCode.current.value.length !== 5) {
      setError({
        isError: true,
        error: "Please enter a valid postal code",
      });
    } else if (phoneNumber.current.value.length < 8) {
      setError({
        isError: true,
        error: "Please enter a valid phone number",
      });
    } else {
      setAddresses([...addresses, {
        directionAdded: true,
        country: country.current.value,
        name: name.current.value,
        streetAndNumber: streetNumber.current.value,
        postalCode: postalCode.current.value,
        phoneNumber: phoneNumber.current.value,
        instructions: instructions.current.value,
        id: createId(),
      }]);
      navigate("/account/my-addresses");
    }
  };

  //* Effect
  useEffect(() => {
    country.current.oninput = validation;
    name.current.oninput = validation;
    streetNumber.current.oninput = validation;
    postalCode.current.oninput = validation;
    phoneNumber.current.oninput = validation;
  }, [country, name, streetNumber, postalCode, phoneNumber]);

  return (
    <>
      <h2 className="text-center m-3 text-title text-boldText font-semibold dark:text-gray">Add address</h2>
      <form onSubmit={addDirection} className="bg-white shadow-containersShadow p-4 border-2 border-gray dark:border-gray-grayDark rounded flex flex-col m-auto w-95 max-w-70 dark:bg-darkBg">
        <div className="flex flex-col gap-y-0.5 mb-1.5">
          <label className="text-bold font-medium dark:text-gray text-boldText" htmlFor="country">
            Country or region
            <input ref={country} id="country" name="country" className="border-2 border-primary dark:border-primary-light rounded px-0.5 w-100 h-4.5 shadow-shadow focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-light dark:focus:ring-primary-light dark:text-gray dark:bg-darkBg" type="text" placeholder="Country or region" />
          </label>
        </div>
        <div className="flex flex-col gap-y-0.5 mb-1.5">
          <label className="text-bold font-medium dark:text-gray text-boldText" htmlFor="name">
            Full name
            <input ref={name} id="name" name="name" className="border-2 border-primary dark:border-primary-light rounded px-0.5 w-100 h-4.5 shadow-shadow focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-light dark:focus:ring-primary-light dark:text-gray dark:bg-darkBg" type="text" placeholder="Full name" />
          </label>
        </div>
        <div className="flex flex-col gap-y-0.5 mb-1.5">
          <label className="text-bold font-medium dark:text-gray text-boldText" htmlFor="streetAndNumber">
            Street and number
            <input ref={streetNumber} id="streetAndNumber" name="streetAndNumber" className="border-2 border-primary dark:border-primary-light rounded px-0.5 w-100 h-4.5 shadow-shadow focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-light dark:focus:ring-primary-light dark:text-gray dark:bg-darkBg" type="text" placeholder="Street and number" />
          </label>
        </div>
        <div className="flex justify-around">
          <div className="flex flex-col gap-y-0.5 mb-1.5">
            <label className="text-bold font-medium dark:text-gray text-boldText" htmlFor="postalCode">
              Postal code
              <input ref={postalCode} id="postalCode" name="postalCode" className="border-2 border-primary dark:border-primary-light rounded px-0.5 w-100 h-4.5 shadow-shadow focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-light dark:focus:ring-primary-light dark:text-gray dark:bg-darkBg" type="number" placeholder="For example, 01000" />
            </label>
          </div>
          <div className="flex flex-col gap-y-0.5 mb-1.5">
            <label className="text-bold font-medium dark:text-gray text-boldText" htmlFor="phoneNumber">
              Phone number
              <input ref={phoneNumber} id="phoneNumber" name="phoneNumber" className="border-2 border-primary dark:border-primary-light rounded px-0.5 w-100 h-4.5 shadow-shadow focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-light dark:focus:ring-primary-light dark:text-gray dark:bg-darkBg" type="number" placeholder="For example, +48123456789" />
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-y-0.5 mb-1.5">
          <label className="text-bold font-medium dark:text-gray text-boldText" htmlFor="instructions">
            Aditional instructions (optional)
            <textarea ref={instructions} id="instructions" name="instructions" className="border-2 border-primary dark:border-primary-light rounded px-0.5 w-100 h-4.5 shadow-shadow focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-light dark:focus:ring-primary-light dark:text-gray dark:bg-darkBg" type="text" placeholder='For example, "Do not forget to bring your passport"' />
          </label>
        </div>
        <button disabled={inactiveButton} className={`${inactiveButton ? "opacity-50" : "opacity-100"} shadow-shadow px-2 py-1 bg-primary text-white font-semibold rounded border-2 border-primary transition-all hover:bg-transparent hover:text-primary dark:bg-primary-light dark:text-darkBg dark:border-primary-light dark:hover:bg-transparent dark:hover:text-primary-light`} type="submit">Add address</button>
      </form>
    </>
  );
}
