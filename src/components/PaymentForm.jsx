import React, { useContext, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useNavigate } from "react-router-dom";
import { globalContext } from "./globalContext/GlobalContext";

import Loader from "./loader/Loader";

export default function PaymentForm({ orderDetails }) {
  const stripe = useStripe();
  const elements = useElements();
  const { setShoppingCart } = useContext(globalContext);
  const { orders, setOrders } = useContext(globalContext);
  const { setBuyDetails } = useContext(globalContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const pay = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setOrders([
      ...orders,
      orderDetails,
    ]);
    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    console.log(result);

    if (result.paymentIntent.status === "succeeded") {
      setBuyDetails({
        products: [],
        shipping: "",
        payment: {},
        total: 0,
      });
      setShoppingCart([]);
      navigate("/account/orders");
    }
  };
  return (
    <div>
      <form onSubmit={pay}>
        <PaymentElement id="payment-element" />

        <button
          className="w-fit mt-5 shadow-shadow px-2 py-1 bg-primary text-white font-semibold rounded border-2 border-primary transition-all hover:bg-transparent hover:text-primary dark:bg-primary-light dark:text-darkBg dark:border-primary-light dark:hover:bg-transparent dark:hover:text-primary-light"
          type="button"
        >
          Pay now
        </button>

      </form>
      {isLoading && <Loader />}
    </div>
  );
}
