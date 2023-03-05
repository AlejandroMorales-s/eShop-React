import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filterProductsByPriceRange } from "../../features/filters/filtersSlice";
import { selectAllProducts } from "../../features/products/productsSlice";
import { globalContext } from "../globalContext/GlobalContext";

export default function PriceFilter() {
  const options = [
    {
      id: 1,
      data: {
        range: [0, 1000],
        name: "< $1,000",
      },
    },
    {
      id: 2,
      data: {
        range: [1001, 1500],
        name: "$1,000 - $1,500",
      },
    },
    {
      id: 3,
      data: {
        range: [1501, 2000],
        name: "$1,500 - $2,000",
      },
    },
    {
      id: 4,
      data: {
        range: [2001, 3000],
        name: "$2,000 - $3,000",
      },
    },
    {
      id: 5,
      data: {
        range: [3000],
        name: "> $3,000",
      },
    },
  ];

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const products = useSelector(selectAllProducts);

  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = (event) => {
    const priceId = Number(event.target.id);

    const priceRange = options.find((option) => option.id === priceId).data
      .range;

    dispatch(filterProductsByPriceRange({ priceRange, products }));

    navigate("/search-products");
  };

  const open = () => setIsOpen(!isOpen);

  return (
    <div className="relative w-[150px]">
      <label htmlFor="number" className="font-medium text-bold dark:text-gray">
        Price
        <input
          id="number"
          onClick={open}
          type="number"
          className="shadow-shadow relative w-full border-2 border-primary dark:border-primary-light focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-light dark:focus:ring-primary-light rounded dark:bg-darkBg font-medium"
        />
      </label>
      <div
        className={`${
          isOpen ? "absolute" : "hidden"
        } flex flex-col gap-1 bg-white dark:bg-darkBg border-2 border-gray dark:border-gray-grayDark p-1 w-full z-20 rounded shadow-containersShadow`}
      >
        {options.map((option) => (
          <button
            type="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.keyCode === 13) handleSelectChange(e);
            }}
            onClick={(e) => handleSelectChange(e)}
            id={option.id}
            key={option.id}
            className="p-0.5 text-center cursor-pointer hover:bg-primary dark:hover:bg-primary-light rounded hover:text-white dark:hover:text-boldText font-medium text-text dark:text-gray transition-all ease-in-out delay-50"
          >
            {option.data.name}
          </button>
        ))}
      </div>
    </div>
  );
}
