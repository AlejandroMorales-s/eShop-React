import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "../../libs/firebase";
import { setModalInfo } from "../modal/modalSlice";

//* Async thunk
export const getShoppingCart = createAsyncThunk(
  "shoppingCart/getShoppingCart",
  async (userId, thunkAPI) => {
    const docRef = doc(database, "users", userId);
    let shoppingCart = [];

    await getDoc(docRef)
      .then((res) => {
        const dbShoppingCart = res.get("shoppingCart");

        shoppingCart = dbShoppingCart;
      })
      .catch((error) => {
        throw error;
      });

    return shoppingCart;
  }
);

export const addOrRemoveFromShoppingCart = createAsyncThunk(
  "shoppingCart/add-removeProduct",
  async ({ product, uid }, thunkAPI) => {
    const { id } = product;
    product.data.amount = 1;

    const docRef = doc(database, "users", uid);

    let dataReturned = {
      product,
      productIsInShoppingCart: false,
      shoppingCartFiltered: [],
    };

    await getDoc(docRef)
      .then((res) => {
        const shoppingCart = res.get("shoppingCart");

        const productIsInShoppingCart = shoppingCart.find(
          (item) => item.id === id
        );

        if (!productIsInShoppingCart) {
          console.log("adding");
          setDoc(
            docRef,
            { shoppingCart: [...shoppingCart, product] },
            { merge: true }
          );
          dataReturned = {
            product,
            productIsInShoppingCart: false,
            shoppingCartFiltered: [],
          };
          thunkAPI.dispatch(
            setModalInfo({
              message: `${product.data.name}
                added to shopping cart successfully`,
              type: "success",
              title: "Added to shopping cart",
            })
          );
        } else {
          const cartFilter = shoppingCart.filter((item) => item.id !== id);

          setDoc(docRef, { shoppingCart: cartFilter }, { merge: true });
          dataReturned = {
            product,
            productIsInShoppingCart: true,
            shoppingCartFiltered: cartFilter,
          };

          thunkAPI.dispatch(
            setModalInfo({
              message: `${product.data.name}
                removed from shopping cart successfully`,
              type: "success",
              title: "Removed from shopping cart",
            })
          );
        }
      })
      .catch((error) => {
        throw error;
      });

    return dataReturned;
  }
);

//* Creating store
const initialState = {
  products: [],
  purchaseDetails: {
    shippingDetails: {},
    paymentMethod: {},
    total: 0,
  },
  isLoading: false,
  error: {
    isError: false,
    message: "",
  },
};

const options = {
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: {
    //* Get shopping cart
    [getShoppingCart.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getShoppingCart.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    [getShoppingCart.rejected]: (state, action) => {
      state.error.isError = true;
      state.error.message = action.error.message;
      state.isLoading = false;
    },
    //* Add/Remove from shopping cart
    [addOrRemoveFromShoppingCart.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addOrRemoveFromShoppingCart.fulfilled]: (state, action) => {
      if (action.payload.productIsInShoppingCart)
        state.products = action.payload.shoppingCartFiltered;
      else state.products.push(action.payload.product);

      state.isLoading = false;
    },
    [addOrRemoveFromShoppingCart.rejected]: (state, action) => {
      state.error.isError = true;
      state.error.message = action.error.message;
      state.isLoading = false;
    },
  },
};

const shoppingCartReducer = createSlice(options);

//* Selectors
export const selectShoppingCartProducts = (state) =>
  state.shoppingCart.products;

export const selectPurchaseOfShoppingCartInfo = (state) =>
  state.shoppingCart.purchaseDetails;

export default shoppingCartReducer.reducer;
