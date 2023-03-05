import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setModalInfo } from "../../features/modal/modalSlice";
import { addOrRemoveFromShoppingCart } from "../../features/shoppingCart/shoppingCartSlice";
import { selectUserData } from "../../features/user/userSlice";

export default function OrderCard({ product }) {
  const { name, price, images } = product.data;
  let { amount } = product.data;

  const userData = useSelector(selectUserData);

  const dispatch = useDispatch();

  // const modifyAmountInDatabase = (e) => {
  //   const docRef = doc(database, "users", user.id);
  //   getDoc(docRef)
  //     .then((res) => {
  //       const dbShoppingCart = res.get("shoppingCart");

  //       const product = dbShoppingCart.find((prod) => prod.id === item.id);
  //       product.data.amount = Number(e.target.value);

  //       const shoppingCartFiltered = dbShoppingCart.filter(
  //         (prod) => prod.id !== item.id
  //       );
  //       shoppingCartFiltered.push(product);

  //       setDoc(docRef, { shoppingCart: shoppingCartFiltered }, { merge: true });
  //     })
  //     .catch((error) => console.log(error));
  // };

  const modifyAmountInput = (e) => {
    const { value } = e.target;
    amount = value;
  };

  const removeFromCart = () => {
    const productCopy = JSON.parse(JSON.stringify(product));
    dispatch(
      addOrRemoveFromShoppingCart({ product: productCopy, uid: userData.uid })
    ).then((res) => {
      if (!res.error) return;
      dispatch(
        setModalInfo({
          message: res.error.message,
          type: "error",
          title: "Something went wrong...",
        })
      );
    });
  };

  return (
    <div className="h-[150px] border-2 p-2 flex gap-2 border-gray rounded dark:border-gray-grayDark dark:bg-darkBg">
      <div className="overflow-hidden w-[12.5%] rounded">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-[57.5%] h-full flex flex-col justify-evenly">
        <h2 className="font-semibold text-title dark:text-gray">{name}</h2>
        <div className="flex gap-2">
          <button
            type="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.keyCode === 13) removeFromCart();
            }}
            onClick={removeFromCart}
            className="text-bold font-medium text-red cursor-pointer"
          >
            Delete
          </button>
          <Link to={`/${product.id}/buy-product`}>
            <p className="text-bold font-medium text-primary">Buy now</p>
          </Link>
        </div>
      </div>
      <div className="w-[15%] gap-1 flex justify-center items-center">
        <input
          className="border-2 rounded pl-0.5 w-[40px] border-gray dark:border-gray-grayDark text-[20px] dark:bg-darkBg dark:text-gray"
          type="number"
          min="1"
          max="50"
          // onClick={(e) => modifyAmountInDatabase(e)}
          onInput={(e) => modifyAmountInput(e)}
          defaultValue={amount}
        />
      </div>
      <div className="w-[15%] flex items-center justify-center">
        <p className="text-bold font-medium dark:text-gray">
          ${price * amount} MXN
        </p>
      </div>
    </div>
  );
}
