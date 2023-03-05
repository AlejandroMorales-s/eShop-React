import React from "react";
import DocumentTitle from "react-document-title";
import { Link } from "react-router-dom";
//* Components
import Navbar from "../components/navbar/Navbar";
import OrderCard from "../components/orders/OrderCard";

import { useSelector } from "react-redux";
import { selectShoppingCartProducts } from "../features/shoppingCart/shoppingCartSlice";

export default function ShoppingCart() {
  const shoppingCart = useSelector(selectShoppingCartProducts);

  return (
    <>
      <DocumentTitle title="Shopping Cart" />
      <Navbar />
      <div className="w-95 max-w-[1000px] my-5 m-auto bg-white rounded shadow-containersShadow p-2 flex flex-col gap-2 dark:bg-darkBg">
        {shoppingCart.map((item) => (
          <OrderCard key={item.id} product={item} />
        ))}
        <Link to="/buy-cart">
          <button
            className=" shadow-shadow px-2 py-1 bg-primary text-white font-semibold rounded border-2 border-primary transition-all hover:bg-transparent hover:text-primary dark:bg-primary-light dark:text-darkBg dark:border-primary-light dark:hover:bg-transparent dark:hover:text-primary-light"
            type="button"
          >
            Buy cart
          </button>
        </Link>
      </div>
    </>
  );
}
