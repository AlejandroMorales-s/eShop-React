import React, { useContext } from "react";
import ReactDocumentTitle from "react-document-title";
//* Icons
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbTruckDelivery } from "react-icons/tb";
//* Logos
import { Link } from "react-router-dom";
import VisaLogo from "../../assets/logo-visa.png";
import MastercardLogo from "../../assets/logo-mastercard.png";
import { globalContext } from "../globalContext/GlobalContext";

export default function ConfirmDetails() {
  const { cards } = useContext(globalContext);
  const { buyDetails } = useContext(globalContext);
  const { shoppingAddress } = useContext(globalContext);
  const { orders, setOrders } = useContext(globalContext);

  const card = cards.find((item) => item.id === buyDetails.payment.id);

  const pushOrder = () => {
    setOrders([
      ...orders,
      buyDetails,
    ]);
  };

  return (
    <>
      <ReactDocumentTitle title="Confirm details" />
      <div className="p-2 flex flex-col gap-4">
        <h2 className="font-semibold text-subtitle dark:text-gray">Check and confirm your purchase</h2>
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-bold dark:text-gray mb-2">Delivery details</h3>
          <div className="flex border-2 border-gray items-center gap-1 dark:border-gray-grayDark bg-white dark:bg-darkBg rounded p-1">
            <HiOutlineLocationMarker className="text-[60px] text-primary dark:text-primary-light" />
            <div>
              <p className="font-medium text-boldText dark:text-white">
                Zip
                {" "}
                {shoppingAddress.postalCode}
              </p>
              <p className="font-medium text-text dark:text-gray">{`${shoppingAddress.streetAndNumber}, ${shoppingAddress.country}`}</p>
              <p className="font-medium text-text dark:text-gray">{`${shoppingAddress.name} - ${shoppingAddress.phoneNumber}`}</p>
            </div>
          </div>
          <div className="flex border-2 border-gray items-center gap-1 dark:border-gray-grayDark bg-white dark:bg-darkBg rounded p-1">
            <TbTruckDelivery className="text-[60px] text-primary dark:text-primary-light" />
            <div>
              <p className="font-medium text-text dark:text-gray">
                Arrives on
                {" "}
                {buyDetails.shipping.date}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-bold dark:text-gray">Payment detail</h3>
          {card !== undefined
            && (
              <div className="border-2 h-[100px] w-full rounded flex gap-2 items-center border-gray p-2 bg-white dark:bg-darkBg dark:border-gray-grayDark">
                <div className="bg-white h-[65px] min-w-[65px] border-2 border-gray dark:border-gray-grayDark rounded-full overflow-hidden flex justify-center items-center">
                  <img className="w-[65px] object-cover" src={`${card.type === "Visa" ? VisaLogo : MastercardLogo}`} alt="logo" />
                </div>
                <div className="w-full">
                  <p className="text-boldText font-medium dark:text-white">
                    Finished in
                    {" "}
                    {card.number.slice(-4)}
                  </p>
                  <p className="text-text dark:text-gray">{card.type}</p>
                </div>
              </div>
            )}
        </div>
        {card !== undefined
            && (
              <Link to="/account/orders">
                <button type="button" onClick={pushOrder} className=" w-fit shadow-shadow px-2 py-1 bg-primary text-white font-semibold rounded border-2 border-primary transition-all hover:bg-transparent hover:text-primary dark:bg-primary-light dark:text-darkBg dark:border-primary-light dark:hover:bg-transparent dark:hover:text-primary-light">Confirm</button>
              </Link>
            )}
      </div>
    </>
  );
}
