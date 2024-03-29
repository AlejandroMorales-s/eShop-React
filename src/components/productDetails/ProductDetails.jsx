import React, { useEffect, useState } from "react";
import ReactDocumentTitle from "react-document-title";
import { Link, useParams } from "react-router-dom";
//* Icons
import { AiOutlineHeart } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { FiTruck } from "react-icons/fi";
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
//* Slices
import { selectAllProducts } from "../../features/products/productsSlice";
import {
  addOrRemoveFromWishlist,
  selectWishlist,
} from "../../features/wishlist/wishlistSlice";
import {
  addOrRemoveFromShoppingCart,
  selectShoppingCartProducts,
} from "../../features/shoppingCart/shoppingCartSlice";
import { selectUserData } from "../../features/user/userSlice";
import { setModalInfo } from "../../features/modal/modalSlice";

export default function ProductDetails() {
  const { idParams } = useParams();
  //* Selectors
  const products = useSelector(selectAllProducts);
  const wishlist = useSelector(selectWishlist);
  const shoppingCart = useSelector(selectShoppingCartProducts);
  const userData = useSelector(selectUserData);

  const dispatch = useDispatch();

  //* State
  const [product, setProduct] = useState();
  const [inWishlist, setInWishlist] = useState(false);
  const [inShoppingCart, setInShoppingCart] = useState(false);
  const [imagesTotal, setImagesTotal] = useState(0);
  const [imagesPosition, setImagesPosition] = useState(0);

  //* Image Slider
  const previousImageClick = () => {
    if (imagesPosition === 0) setImagesPosition(imagesTotal);
    else setImagesPosition(imagesPosition - 1);
  };

  const nextImageClick = () => {
    console.log(imagesTotal);
    if (imagesPosition === imagesTotal) setImagesPosition(0);
    else setImagesPosition(imagesPosition + 1);
  };

  //* Add/Remove to wishlist
  const addToWishlist = (e) => {
    e.stopPropagation();
    dispatch(addOrRemoveFromWishlist({ product, uid: userData.uid })).then(
      (res) => {
        if (!res.error) return;
        dispatch(
          setModalInfo({
            message: res.error.message,
            type: "error",
            title: "Something went wrong...",
          })
        );
      }
    );
  };

  //* Add/Remove to cart
  const addToCart = (e) => {
    e.stopPropagation();
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

  useEffect(() => {
    if (!products.length) return;
    setProduct(products.find((item) => item.id === idParams));
  }, [products]);

  useEffect(() => {
    if (!product) return;

    setImagesTotal(product.data.images.length - 1);

    const productInShoppingCart = shoppingCart.some(
      (item) => item.id === product.id
    );

    const productInWishlist = wishlist.some((item) => item.id === product.id);

    setInShoppingCart(productInShoppingCart);
    setInWishlist(productInWishlist);
  }, [product, shoppingCart, wishlist]);

  return (
    <>
      <ReactDocumentTitle title={product?.data.name} />
      {product === undefined ? (
        <Loader />
      ) : (
        <div className="w-95 max-w-130 mx-auto flex justify-center items-center my-5">
          <div className="bg-white p-2 flex flex-col sm:grid sm:grid-cols-product w-full shadow-containersShadow rounded gap-2 dark:bg-darkBg">
            <div className="sm:h-[625px] h-[300px] rounded w-full overflow-hidden relative">
              <img
                src={product.data.images[imagesPosition]}
                className=" w-full h-full object-cover"
                alt="Product"
              />
              <BsFillArrowRightCircleFill
                onClick={nextImageClick}
                className="cursor-pointer text-[55px] absolute top-[50%] text-primary right-1"
              />
              <BsFillArrowRightCircleFill
                onClick={previousImageClick}
                className="cursor-pointer rotate-180 text-[55px] absolute top-[50%] text-primary left-1"
              />
            </div>

            <div className="flex flex-col gap-2 overflow-auto">
              <div className="flex justify-between items-center">
                <h2 className="m-0 font-semibold text-title dark:text-white">
                  {product.data.name}
                </h2>
                <AiOutlineHeart
                  onClick={addToWishlist}
                  className={`${
                    inWishlist && "text-primary"
                  } text-[26px] cursor-pointer hover:text-primary dark:text-gray dark:hover:text-primary-light transition-all ease-out delay-50`}
                />
              </div>
              <p className="text-[32.5px] font-semibold dark:text-gray">
                ${product.data.price} MXN
              </p>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-0.5">
                  <TbTruckDelivery className="text-[20px] text-green" />
                  <p>
                    Arrives{" "}
                    <span className="font-semibold text-green">tomorrow</span>{" "}
                    for
                    <span className="text-green font-semibold dark:text-gray">
                      {product.price < 100 ? " $99 MXN" : " FREE"}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-0.5">
                  <FiTruck className="text-[17px] text-green" />
                  <p>
                    Arrives{" "}
                    <span className="font-semibold text-green">
                      the day after tomorrow
                    </span>{" "}
                    for
                    <span className="font-semibold text-green dark:text-gray">
                      {product.price < 100 ? " $99 MXN" : " FREE"}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                <p className="text-bold font-medium dark:text-gray">
                  Quantity:
                </p>
                <input
                  className="border-2 rounded text-bold pl-0.5 w-[45px] border-gray dark:border-gray-grayDark"
                  type="number"
                  min="1"
                  max="50"
                  defaultValue="1"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Link to={`/${product.id}/buy-product`}>
                  <button
                    className="shadow-shadow px-2 py-1 bg-primary text-white font-semibold rounded border-2 border-primary transition-all hover:bg-transparent hover:text-primary dark:bg-primary-light dark:text-darkBg dark:border-primary-light dark:hover:bg-transparent dark:hover:text-primary-light w-full"
                    type="submit"
                  >
                    Buy now
                  </button>
                </Link>
                <button
                  onClick={addToCart}
                  className="cursor-pointer bg-white rounded shadow-shadow border-2 border-primary dark:bg-darkBg dark:border-primary-light hover:bg-primary dark:hover:bg-primary-light transition-all ease-in-out delay-50 text-primary font-medium dark:text-primary-light p-1 text-center hover:text-white dark:hover:text-boldText delay-50 h-full w-full"
                  type="submit"
                >
                  {inShoppingCart
                    ? "Remove from shopping cart"
                    : "Add to shopping cart"}
                </button>
              </div>
              <div>
                <h3 className="text-subtitle font-medium dark:text-white">
                  Description
                </h3>
                <p className="text-text dark:text-gray">{product.data.desc}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
