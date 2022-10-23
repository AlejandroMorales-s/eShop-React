import React, { useContext, useState, useEffect } from "react";
import ReactDocumentTitle from "react-document-title";
import { Link, useParams } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";

//* Icons
import { AiOutlineHeart } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { FiTruck } from "react-icons/fi";
import { database } from "../../libs/firebase";
import Modal from "../modals/Modal";
import Loader from "../loader/Loader";
import { globalContext } from "../globalContext/GlobalContext";

export default function ProductDetails() {
  //* Context
  const { buyNowQuantity, setBuyNowQuantity } = useContext(globalContext);
  const { user } = useContext(globalContext);

  //* State
  const [product, setProduct] = useState();
  const [showingModal, setShowingModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    title: "",
    message: "",
  });
  const [inWishlist, setInWishlist] = useState(false);
  const [inShoppingCart, setInShoppingCart] = useState(false);
  const [imagesTotal, setImagesTotal] = useState();
  const [imagesPosition, setImagesPosition] = useState(0);

  const { idParams } = useParams();

  //* Active icons
  const activeIcons = () => {
    const docRef = doc(database, "users", user.id);
    getDoc(docRef)
      .then((res) => {
        const wishlist = res.get("wishlist");
        const shoppingCart = res.get("shoppingCart");
        setInWishlist(wishlist?.some((item) => item.id === idParams));
        setInShoppingCart(shoppingCart?.some((item) => item.id === idParams));
      })
      .catch((error) => console.log(error));
  };

  //* Get product
  const getProduct = async () => {
    try {
      const prodRef = doc(database, "products", idParams);
      const docSnap = await getDoc(prodRef);
      const data = docSnap.data();
      setProduct({
        id: idParams,
        data,
      });
      setImagesTotal(data.images.length - 1);
      activeIcons();
    } catch (error) {
      console.log(error);
    }
  };

  //* Image Slider
  const previousImageClick = () => {
    if (imagesPosition === 0) setImagesPosition(imagesTotal);
    else setImagesPosition(imagesPosition - 1);
  };

  const nextImageClick = () => {
    if (imagesPosition === imagesTotal) setImagesPosition(0);
    else setImagesPosition(imagesPosition + 1);
  };

  //* Product Status
  const updateProductStatus = async (action, place, state, boolean) => {
    state(!boolean);
    setShowingModal(true);
    setModalMessage({
      title: `${product.data.name} ${action} from your ${place}`,
      message: `Item has been ${action} from your ${place}`,
    });
  };

  //* Add/Remove to wishlist
  const addToWishlist = () => {
    const docRef = doc(database, "users", user.id);
    getDoc(docRef)
      .then((res) => {
        const wishlist = res.get("wishlist");
        if (!inWishlist) {
          setDoc(docRef, { wishlist: [...wishlist, product] }, { merge: true });
          updateProductStatus("added", "wishlist", setInWishlist, inWishlist);
        } else {
          const wishlistFilter = wishlist.filter((item) => item.id !== idParams);
          setDoc(docRef, { wishlist: wishlistFilter }, { merge: true });
          updateProductStatus("removed", "wishlist", setInWishlist, inWishlist);
        }
      })
      .catch((error) => console.log(error));
  };

  //* Add/Remove to cart
  const addToCart = () => {
    const docRef = doc(database, "users", user.id);
    getDoc(docRef)
      .then((res) => {
        const shoppingCart = res.get("shoppingCart");
        if (!inShoppingCart) {
          setDoc(docRef, { shoppingCart: [...shoppingCart, product] }, { merge: true });
          updateProductStatus("added", "shopping cart", setInShoppingCart, inShoppingCart);
        } else {
          const cartFilter = shoppingCart.filter((item) => item.id !== idParams);
          setDoc(docRef, { shoppingCart: cartFilter }, { merge: true });
          updateProductStatus("removed", "shopping cart", setInShoppingCart, inShoppingCart);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <ReactDocumentTitle title={product?.data.name} />
      {product === undefined
        ? <Loader />
        : (
          <div className="w-95 max-w-130 mx-auto flex justify-center items-center my-5">
            <div className="bg-white p-2 flex flex-col sm:grid sm:grid-cols-product w-full shadow-containersShadow rounded gap-2 dark:bg-darkBg">
              <div className="sm:h-[625px] h-[300px] rounded w-full overflow-hidden relative">
                <img src={product.data.images[imagesPosition]} className=" w-full h-full object-cover" alt="Product" />
                <BsFillArrowRightCircleFill onClick={nextImageClick} className="cursor-pointer text-[55px] absolute top-[50%] text-primary right-1" />
                <BsFillArrowRightCircleFill onClick={previousImageClick} className="cursor-pointer rotate-180 text-[55px] absolute top-[50%] text-primary left-1" />
              </div>

              <div className="flex flex-col gap-2 overflow-auto">
                <div className="flex justify-between items-center">
                  <h2 className="m-0 font-semibold text-title dark:text-white">{product.data.name}</h2>
                  <AiOutlineHeart onClick={addToWishlist} className={`${inWishlist && "text-primary"} text-[26px] cursor-pointer hover:text-primary dark:text-gray dark:hover:text-primary-light transition-all ease-out delay-50`} />
                </div>
                <p className="text-[32.5px] font-semibold dark:text-gray">
                  $
                  {product.data.price}
                  {" "}
                  MXN
                </p>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-0.5">
                    <TbTruckDelivery className="text-[20px] text-green" />
                    <p className="text-green">
                      Arrives
                      {" "}
                      <span className="font-semibold">tomorrow</span>
                      {" "}
                      <span className="text-boldText dark:text-gray">
                        for
                        {product.price < 100 ? "$99 MXN" : "FREE"}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <FiTruck className="text-[17px] text-green" />
                    <p className="text-green">
                      Arrives
                      {" "}
                      <span className="font-semibold">the day after tomorrow</span>
                      {" "}
                      <span className="text-boldText dark:text-gray">
                        for
                        {product.price < 100 ? "$99 MXN" : "FREE"}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  <p className="text-bold font-medium dark:text-gray">Quantity:</p>
                  <input
                    className="border-2 rounded text-bold pl-0.5 w-[45px] border-gray dark:border-gray-grayDark"
                    onInput={(e) => { setBuyNowQuantity(e.target.value); }}
                    type="number"
                    min="1"
                    max="50"
                    defaultValue={buyNowQuantity}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Link to={`/${product.id}/buy-product`}>
                    <button className="shadow-shadow px-2 py-1 bg-primary text-white font-semibold rounded border-2 border-primary transition-all hover:bg-transparent hover:text-primary dark:bg-primary-light dark:text-darkBg dark:border-primary-light dark:hover:bg-transparent dark:hover:text-primary-light w-full" type="submit">Buy now</button>
                  </Link>
                  <button onClick={addToCart} className="cursor-pointer bg-white rounded shadow-shadow border-2 border-primary dark:bg-darkBg dark:border-primary-light hover:bg-primary dark:hover:bg-primary-light transition-all ease-in-out delay-50 text-primary font-medium dark:text-primary-light p-1 text-center hover:text-white dark:hover:text-boldText delay-50 h-full w-full" type="submit">{inShoppingCart ? "Remove from shopping cart" : "Add to shopping cart"}</button>
                </div>
                <div>
                  <h3 className="text-subtitle font-medium dark:text-white">Description</h3>
                  <p className="text-text dark:text-gray">{product.data.desc}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      {showingModal && <Modal type="success" title={modalMessage.title} desc={modalMessage.message} setShowingModal={setShowingModal} />}
    </>
  );
}
