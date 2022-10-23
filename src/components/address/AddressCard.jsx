import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { globalContext } from "../globalContext/GlobalContext";

export default function AddressCard({ currentAddress, setShowingModal }) {
  //* Navigate
  const navigate = useNavigate();

  //* Global context
  const { shoppingAddress, setShoppingAddress } = useContext(globalContext);
  const { addresses, setAddresses } = useContext(globalContext);

  const deleteAddress = () => {
    const address = addresses.filter((item) => item.id !== currentAddress.id);
    setAddresses(address);
    setShowingModal(true);
  };

  const setAddress = () => {
    setShoppingAddress(currentAddress);
    navigate("/feed");
  };

  return (
    <div className="border-2 gap-1 rounded flex flex-col justify-between items-center border-gray dark:border-gray-grayDark p-2 hover:shadow-containersShadow bg-white dark:bg-darkBg h-[400px] w-100 hover:border-primary dark:hover:border-primary-light hover:-translate-y-0.5 transition-all ease-in-out delay-50">
      <div className="h-fit w-100 flex flex-col gap-1.5">
        <h3 className="text-subtitle text-center font-medium dark:text-white">{`${currentAddress.streetAndNumber}, ${currentAddress.country}`}</h3>
        <p className="text-text dark:text-gray">
          <span className="font-medium text-boldText text-bold dark:text-white">Name:</span>
          {" "}
          {currentAddress.name}
        </p>
        <p className="text-text dark:text-gray">
          <span className="font-medium text-boldText text-bold dark:text-white">Zip code:</span>
          {" "}
          {currentAddress.postalCode}
        </p>
        <p className="text-text dark:text-gray">
          <span className="font-medium text-boldText text-bold dark:text-white">Phone number:</span>
          {" "}
          {currentAddress.phoneNumber}
        </p>
        {currentAddress.instructions !== ""
                && (
                  <p className="text-text dark:text-gray">
                    <span className="font-medium text-boldText dark:text-white">Instructions:</span>
                    <br />
                    {currentAddress.instructions}
                  </p>
                )}
      </div>
      <div className="flex flex-col gap-1">
        {shoppingAddress !== currentAddress
              && <button type="button" className="shadow-shadow px-2 py-1 bg-primary text-white font-medium rounded border-2 border-primary transition-all hover:bg-transparent hover:text-primary dark:bg-primary-light dark:text-darkBg dark:border-primary-light dark:hover:bg-transparent dark:hover:text-primary-light" onClick={setAddress}>Set address</button>}
        <button type="button" onClick={deleteAddress} className="px-2 py-1 bg-red dark:bg-red text-white font-medium rounded border-2 border-red transition-all hover:bg-transparent hover:text-red  dark:border-red dark:hover:bg-transparent dark:hover:text-red">Delete address</button>
      </div>
    </div>
  );
}
