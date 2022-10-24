import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
//* Icons
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { database } from "../../libs/firebase";
import { useSelector } from "react-redux";
import { selectUserData } from "../../features/user/userSlice";

export default function ProductCard({ setShowingModal, setModalMessage, product }) {
  const {
    name, price, images, desc
  } = product.data;
  //* States
  const [inWishlist, setInWishlist] = useState(false);
  const [inShoppingCart, setInShoppingCart] = useState(false);

  //* Context
  const user = useSelector(selectUserData)

  const navigate = useNavigate();

  //* Img Lazy Load

  const lazyLoadingCallback = (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;

        lazyLoadingObserver.unobserve(entry.target);
      }
    }
  };

  const lazyLoadingObserver = new IntersectionObserver(lazyLoadingCallback, {
    rootMargin: "0px 0px 50px 0px",
  });

  const cardImage = document.getElementsByTagName("img");

  for (const image of cardImage) {
    lazyLoadingObserver.observe(image);
  }

  const docRef = doc(database, "users", user.uid);
  //* Add/Remove to cart
  const addToCart = (e) => {
    e.stopPropagation();
    product.data.amount = 1;
    getDoc(docRef)
      .then((res) => {
        const shoppingCart = res.get("shoppingCart");
        if (!shoppingCart.find((item) => item.id === product.id)) {
          setDoc(docRef, { shoppingCart: [...shoppingCart, product] }, { merge: true });
          setInWishlist(true);
          setShowingModal(true);
          setModalMessage({
            title: `${name} added to your shopping cart`,
            isShowing: true,
            message: "Item has been added to your shopping cart",
          });
        } else if (shoppingCart.find((item) => item.id === product.id)) {
          const cartFilter = shoppingCart.filter((item) => item.id !== product.id);
          setDoc(docRef, { shoppingCart: cartFilter }, { merge: true });
          setInWishlist(false);
          setShowingModal(true);
          setModalMessage({
            title: `${name} removed from your shopping cart`,
            isShowing: true,
            message: "Item has been removed from your shopping cart successfully",
          });
        }
      })
      .catch((error) => console.log(error));
  };

  //* Add/Remove to wishlist
  const addToWishlist = (e) => {
    e.stopPropagation();
    getDoc(docRef)
      .then((res) => {
        const wishlist = res.get("wishlist");
        if (!wishlist?.find((item) => item.id === product.id)) {
          setDoc(docRef, { wishlist: [...wishlist, product] }, { merge: true });
          setInWishlist(true);
          setShowingModal(true);
          setModalMessage({
            title: `${name} added to your wishlist`,
            isShowing: true,
            message: "Item has been added to your wishlist",
          });
        } else if (wishlist.find((item) => item.id === product.id)) {
          const wishlistFilter = wishlist.filter((item) => item.id !== product.id);
          setDoc(docRef, { wishlist: wishlistFilter }, { merge: true });
          setInWishlist(false);
          setShowingModal(true);
          setModalMessage({
            title: `${name} removed from your wishlist`,
            isShowing: true,
            message: "Item has been removed from your wishlist successfully",
          });
        }
      })
      .catch((error) => console.log(error));
  };

  //* Buy now
  const buyProduct = (e) => {
    e.stopPropagation();
    navigate(`/${product.id}/buy-product`);
  };

  //* Product details
  const productDetailsShow = () => navigate(`/product-details/${product.id}`);

  //* Delete product
  const deleteProduct = (e) => {
    e.stopPropagation();
    //TODO delete product code
  };

  useEffect(() => {
    getDoc(docRef)
      .then((res) => {
        const wishlist = res.get("wishlist");
        const shoppingCart = res.get("shoppingCart");

        setInWishlist(wishlist?.find((item) => item.id === product.id));
        setInShoppingCart(shoppingCart?.find((item) => item.id === product.id));
      })
      .catch((error) => console.log(error));
  }, [inWishlist, inShoppingCart, product.id]);

  return (
    <div onClick={productDetailsShow} className="bg-white w-full min-w-[235px] sm:max-w-[235px] relative p-1 rounded shadow-containersShadow z-10 cursor-pointer flex flex-col gap-0.5 border-2 border-gray dark:border-gray-grayDark hover:border-primary dark:hover:border-primary-light  dark:bg-darkBg hover:-translate-y-0.5 transition-all ease-in-out delay-50">
      <div className="h-[250px] overflow-hidden rounded">
        <img
          className="w-100 object-cover h-100"
          src="https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640"
          data-src={images[0]}
          alt={name}
        />
      </div>
      <h3 className="text-bold text-boldText dark:text-white font-semibold">{name}</h3>
      <p className="text-bold text-green font-semibold">
        $
        {price}
        {" "}
        MXN
      </p>
      <p className="text-text dark:text-gray line-clamp-2">{desc}</p>
      <div className="absolute bg-black bg-opacity-0 hover:bg-opacity-5 w-full h-full top-0 left-0 rounded pt-1.5 flex flex-col justify-between items-center px-1.5 opacity-0 hover:opacity-100 transition-all ease-in-out delay-50">
        <div className="flex gap-1 justify-center">
          <button
            onClick={buyProduct}
            className="px-1 py-0.5 bg-primary dark:bg-primary-light rounded border-2 border-primary dark:border-primary-light hover:bg-primary-light hover:border-primary-light hover:text-boldText font-medium text-white dark:text-boldText transition-all ease-in-out delay-50"
            type="button"
          >
            Buy now
          </button>
          <button
            onClick={addToCart}
            className="p-1 border-2 border-white hover:border-primary dark:hover:border-primary-light rounded-full bg-white dark:bg-darkBg dark:border-gray-grayDark shadow-containersShadow"
            type="button"
          >
            <MdOutlineShoppingCart className={`${inShoppingCart && "text-primary dark:text-primary-light"} hover:text-primary dark:hover:text-primary-light dark:text-gray text-[20px]`} />
          </button>
          <button
            onClick={addToWishlist}
            className="p-1 border-2 border-white hover:border-primary dark:hover:border-primary-light rounded-full bg-white dark:bg-darkBg dark:border-gray-grayDark shadow-containersShadow"
            type="button"
          >
            <AiOutlineHeart className={`${inWishlist && "text-primary dark:text-primary-light"} hover:text-primary dark:hover:text-primary-light dark:text-gray text-[20px]`} />
          </button>
        </div>
        <button
          onClick={deleteProduct}
          className="px-1 py-0.5 bg-red rounded border-2 border-red text-white font-medium self-end mb-[10px]"
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
