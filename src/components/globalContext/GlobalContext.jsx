import React, { createContext, useState, useEffect } from "react";
import {
  collection, doc, getDoc, getDocs,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { database, auth } from "../../libs/firebase";

export const globalContext = createContext();

export default function GlobalContext({ children }) {
  const navigate = useNavigate();

  //* User
  const [user, setUser] = useState({
    user: {},
    logged: false,
  });
  const [addresses, setAddresses] = useState([]);
  const [cards, setCards] = useState([]);
  const [shoppingAddress, setShoppingAddress] = useState({
    directionAdded: false,
  });
    //* Orders
  const [orders, setOrders] = useState([]);
  //* Shopping cart
  const [shoppingCart, setShoppingCart] = useState([]);
  //* Wishlist
  const [wishlist, setWishlist] = useState([]);
  //* Products
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState(products);
  const [history, setHistory] = useState([]);
  //* Buy Product
  const [buyDetails, setBuyDetails] = useState({
    products: [],
    shipping: {},
    shippingCost: 0,
    payment: {},
    total: 0,
    amount: 1,
  });
  const location = useLocation();

  const getProducts = async () => {
    const col = collection(database, "products");
    const querySnapshot = await getDocs(col);
    const prods = [];

    querySnapshot.forEach((document) => {
      prods.push(
        {
          id: document.id,
          data: document.data(),
        },
      );
    });
    setProducts(prods);
  };

  const getItems = (id) => {
    const docRef = doc(database, "users", id);
    getDoc(docRef)
      .then((res) => {
        const dbWishlist = res.get("wishlist");
        const dbShoppingCart = res.get("shoppingCart");

        setWishlist(dbWishlist);
        setShoppingCart(dbShoppingCart);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (res !== null) {
        const {
          uid, displayName, email, photoURL,
        } = res;
        setUser({
          user: {
            name: displayName,
            email,
            photo: photoURL,
            id: uid,
          },
          logged: true,
        });
        getItems(uid);
        navigate("/feed");
      } else if (location.pathname !== "/login" && location.pathname !== "/signup") {
        navigate("/");
      }
    });

    getProducts();
  }, []);

  return (
    <globalContext.Provider value={{
      user: user.user,
      logged: user.logged,
      setUser,
      addresses,
      setAddresses,
      shoppingAddress,
      setShoppingAddress,
      wishlist,
      setWishlist,
      shoppingCart,
      setShoppingCart,
      buyDetails,
      setBuyDetails,
      products,
      setProducts,
      productsFiltered,
      setProductsFiltered,
      cards,
      setCards,
      orders,
      setOrders,
      history,
      setHistory,
    }}
    >
      {children}
    </globalContext.Provider>
  );
}
