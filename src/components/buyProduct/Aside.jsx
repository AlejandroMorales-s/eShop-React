import React, { useEffect, useContext } from "react";

import { globalContext } from "../globalContext/GlobalContext";

export default function Aside({ product }) {
  const { buyDetails, setBuyDetails } = useContext(globalContext);
  const { amount, shippingCost } = buyDetails;
  const { name, images, price } = product.data;
  const productPrice = price * amount;
  useEffect(() => {
    let shipping = 0;
    if (productPrice < 10000) shipping = 99;
    else shipping = 0;
    setBuyDetails({
      ...buyDetails,
      total: productPrice + shippingCost,
      shippingCost: shipping,
    });
  }, [amount, productPrice]);

  return (
    <div className="flex flex-col items-center p-2 gap-2 border-l-2 border-l-gray dark:border-l-gray-grayDark">
      <div className="rounded-full h-[150px] overflow-hidden w-[150px]">
        <img src={images[0]} alt="Product" className="object-cover w-full h-full" />
      </div>
      <div>
        <p className="text-boldText font-medium text-subtitle text-center dark:text-white">{name}</p>
        <div className="flex justify-center items-center">
          <p className="text-text font-medium text-bold text-center dark:text-white">Quantity:</p>
          <input
            className="border-2 rounded pl-0.5 w-[40px] border-gray dark:border-gray-grayDark"
            onInput={(e) => { setBuyDetails({ ...buyDetails, amount: Number(e.target.value) }); }}
            type="number"
            min="1"
            max="50"
            defaultValue={amount}
          />
        </div>
      </div>
      <div className="border-y-2 border-y-gray py-2 w-full flex flex-col gap-2 dark:border-y-gray-grayDark">
        <div className="flex items-center justify-between">
          <p className="text-text font-medium text-bold dark:text-gray">
            Product (
            {amount}
            ):
          </p>
          <p className="text-text font-medium text-bold dark:text-gray">
            $
            {price * amount}
            {" "}
            MXN
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-text font-medium text-bold dark:text-gray">Shipping:</p>
          <p className="text-text font-medium text-bold dark:text-gray">{shippingCost !== 0 ? `$${shippingCost} MXN` : <span className="text-green text-bold font-semibold">FREE</span>}</p>
        </div>
      </div>
      <div className="flex justify-between w-full">
        <p className="text-boldText text-bold font-semibold dark:text-white">Total:</p>
        <p className="text-boldText text-bold font-semibold dark:text-white">
          $
          {productPrice + shippingCost}
          {" "}
          MXN
        </p>
      </div>
    </div>
  );
}
