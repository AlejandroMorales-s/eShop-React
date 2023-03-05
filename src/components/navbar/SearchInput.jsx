import React, { useRef, useState } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { selectAllProducts } from "../../features/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  filterProductsByName,
  selectProductsFiltered,
} from "../../features/filters/filtersSlice";

export default function SearchInput() {
  //* Selectors
  const productsFiltered = useSelector(selectProductsFiltered);
  const products = useSelector(selectAllProducts);

  //* State
  const [charactersInInput, setCharactersInInput] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const inputRef = useRef();

  const navigate = useNavigate();

  //* Dispatch
  const dispatch = useDispatch();

  //* Clear input field
  const clearInput = () => {
    inputRef.current.value = "";
    setCharactersInInput(0);
  };

  //* Search products
  const searchProduct = (e) => {
    setShowDropdown(true);

    if (!inputRef.current.value) setShowDropdown(false);

    if (e.key === "Enter") {
      setShowDropdown(false);
      navigate("/search-products");
    }

    dispatch(filterProductsByName({ name: e.target.value, products }));
  };

  //* Open product details
  const openProductDetails = (id) => {
    setShowDropdown(false);
    navigate(`/product-details/${id}`);
  };

  return (
    <div className="w-90 max-w-55 mx-2 h-fit relative">
      <input
        ref={inputRef}
        onKeyUp={(e) => searchProduct(e)}
        onChange={(e) => setCharactersInInput(e.target.value.length)}
        className="relative font-medium dark:text-gray px-4 w-100 h-4 border-2 border-primary dark:border-primary-light focus:ring-1 focus:outline-none focus:border-primary focus:ring-primary dark:focus:border-primary-light dark:focus:ring-primary-light rounded dark:bg-darkBg"
        type="text"
        placeholder="What are you looking for today?"
      />
      <AiOutlineSearch className="absolute left-[5px] top-[5px] text-[30px] text-text dark:text-gray" />
      <AiOutlineClose
        onClick={clearInput}
        className={`${
          charactersInInput > 0 ? "absolute" : "hidden"
        } right-[5px] top-[10px] cursor-pointer text-[17.5px] text-text dark:text-gray`}
      />
      <div
        id="input-dropdown"
        className={`${
          showDropdown ? "absolute" : "hidden"
        } w-full p-1 bg-white dark:bg-darkBg border-2 border-gray dark:border-gray-grayDark rounded flex flex-col gap-1 max-h-[275px] overflow-auto`}
      >
        {productsFiltered.length > 0 ? (
          <>
            {productsFiltered.map((product) => (
              <div
                role="button"
                tabIndex={0}
                onClick={() => openProductDetails(product.id)}
                key={product.id}
                className="flex p-1 justify-between items-center cursor-pointer hover:bg-primary dark:hover:bg-primary-light rounded hover:text-white dark:hover:text-boldText font-medium text-text dark:text-gray transition-all ease-in-out delay-50"
              >
                <p>{product.data.name}</p>
              </div>
            ))}
          </>
        ) : (
          <p className="font-medium text-center text-text dark:text-gray">
            Not found
          </p>
        )}
      </div>
    </div>
  );
}
