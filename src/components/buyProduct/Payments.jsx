import React, { useContext, useEffect, useState } from "react";
import ReactDocumentTitle from "react-document-title";
import { globalContext } from "../globalContext/GlobalContext";
import Card from "../myCards/Card";

export default function Payments({ setView }) {
  const [inactiveButton, setInactiveButton] = useState(true);
  const [isOtherPaymentMethod, setIsOtherPaymentMethod] = useState(true);

  const { cards } = useContext(globalContext);
  const { buyDetails } = useContext(globalContext);

  useEffect(() => {
    if (buyDetails.payment.id === undefined) setInactiveButton(true);
    else setInactiveButton(false);
  }, [buyDetails.payment.id]);

  const modifyView = () => {
    setView("confirmDetails");
  };

  const otherPaymentMethod = () => {
    if (isOtherPaymentMethod) {
      setIsOtherPaymentMethod(!isOtherPaymentMethod);
      setInactiveButton(false);
    } else {
      setIsOtherPaymentMethod(!isOtherPaymentMethod);
      setInactiveButton(true);
    }
  };

  return (
    <>
      <ReactDocumentTitle title="Payments" />
      <div className="p-2 flex flex-col gap-4">
        <h2 className="font-semibold text-subtitle dark:text-gray">How would you like to pay?</h2>
        <div className="w-full bg-transparent flex flex-col gap-2">
          {cards.map((card) => (
            <Card
              key={card.title}
              card={card}
              component="Payments"
            />
          ))}
          <div
            onClick={otherPaymentMethod}
            className={`${!isOtherPaymentMethod && "border-green hover:border-green dark:border-green hover:dark:border-green"} hover:border-primary dark:hover:border-primary-light transition-all ease-in-out delay-50 cursor-pointer p-1 bg-white rounded dark:bg-darkBg flex justify-between border-2 border-gray dark:border-gray-grayDark`}
          >
            <p className="text-text dark:text-gray text-center font-medium">Use other payment method </p>
          </div>
        </div>
        <button type="button" disabled={inactiveButton} onClick={modifyView} className={`${inactiveButton ? "opacity-50" : "opacity-100"} w-fit shadow-shadow px-2 py-1 bg-primary text-white font-semibold rounded border-2 border-primary transition-all hover:bg-transparent hover:text-primary dark:bg-primary-light dark:text-darkBg dark:border-primary-light dark:hover:bg-transparent dark:hover:text-primary-light`}>Continue</button>
      </div>
    </>
  );
}
