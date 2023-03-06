import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filterProductsByCategory } from "../../features/filters/filtersSlice";
import { selectAllProducts } from "../../features/products/productsSlice";

export default function CategoryFilter() {
  const options = [
    { id: 1, name: "Living Room" },
    { id: 2, name: "Bedroom" },
    { id: 3, name: "Bathroom" },
    { id: 4, name: "Kitchen" },
  ];

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const products = useSelector(selectAllProducts);

  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = (category) => {
    dispatch(filterProductsByCategory({ products, category }));
    navigate("/search-products");
  };

  const open = () => setIsOpen(!isOpen);

  return (
    <div className="relative w-[150px]">
      <label htmlFor="number" className="font-medium text-bold dark:text-gray">
        Category
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
            onClick={() => handleSelectChange(option.name)}
            id={option.id}
            key={option.id}
            className="p-0.5 text-center cursor-pointer hover:bg-primary dark:hover:bg-primary-light rounded hover:text-white dark:hover:text-boldText font-medium text-text dark:text-gray transition-all ease-in-out delay-50"
          >
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
}
