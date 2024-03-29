import React, { useContext } from "react";
import VisaLogo from "../../assets/logo-visa.png";
import MastercardLogo from "../../assets/logo-mastercard.png";
import { globalContext } from "../globalContext/GlobalContext";

export default function Card({ card, component, setShowingModal }) {
  const {
    id, type, name, number, month, year,
  } = card;

  const { cards, setCards } = useContext(globalContext);
  const { buyDetails, setBuyDetails } = useContext(globalContext);

  const deleteCard = () => {
    const cardsFiltered = cards.filter((item) => item.id !== id);
    setCards(cardsFiltered);
    setShowingModal(true);
  };

  const selectCard = () => {
    if (buyDetails.payment === card) setBuyDetails({ ...buyDetails, payment: {} });
    else setBuyDetails({ ...buyDetails, payment: card });
  };

  return (
    <div className={`${buyDetails.payment.id === id && "border-green dark:border-green hover:border-green dark:hover:border-green"} border-2 sm:h-[100px] w-full rounded flex flex-col sm:flex-row gap-2 items-center border-gray p-2 hover:shadow-containersShadow bg-white dark:bg-darkBg dark:border-gray-grayDark hover:border-primary dark:hover:border-primary-light hover:-translate-y-0.5 transition-all ease-in-out delay-50`}>
      <div className="bg-white h-[65px] min-w-[65px] border-2 border-gray dark:border-gray-grayDark rounded-full overflow-hidden flex justify-center items-center">
        <img className="w-[65px] object-cover" src={`${type === "Visa" ? VisaLogo : MastercardLogo}`} alt="logo" />
      </div>
      <div className="w-full">
        <p className="text-center sm:text-left text-boldText font-medium dark:text-white">
          Finished in
          {number.slice(-4)}
        </p>
        <p className="text-center sm:text-left text-text dark:text-gray">{type}</p>
        <p className="text-center sm:text-left text-text dark:text-gray">
          Expiration:
          {month}
          /
          {year}
        </p>
        <p className="text-center sm:text-left text-text dark:text-gray">{name}</p>
      </div>
      <div className="w-full min-w-[250px] flex sm:justify-end gap-2 ">
        {component !== "MyCards"
          ? <button type="button" onClick={selectCard} className={`${buyDetails.payment.id === id && "opacity-50"} shadow-shadow px-2 py-1 bg-primary text-white font-medium rounded border-2 border-primary transition-all hover:bg-transparent hover:text-primary dark:bg-primary-light dark:text-darkBg dark:border-primary-light dark:hover:bg-transparent dark:hover:text-primary-light`}>Select</button>
          : <button type="button" onClick={deleteCard} className="w-full sm:w-fit px-2 py-1 bg-red dark:bg-red text-white font-medium rounded border-2 border-red transition-all hover:bg-transparent hover:text-red  dark:border-red dark:hover:bg-transparent dark:hover:text-red">Delete</button>}
      </div>
    </div>
  );
}
