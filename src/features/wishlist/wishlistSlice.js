import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "../../libs/firebase";

//* Async thunk
export const getWishlist = createAsyncThunk(
  "shoppingCart/getShoppingCart",
  async (userId, thunkAPI) => {
    const docRef = doc(database, "users", userId);
    let wishlist = [];

    await getDoc(docRef)
      .then((res) => {
        const dbWishlist = res.get("wishlist");

        wishlist = dbWishlist;
      })
      .catch((error) => {
        throw error;
      });

    return wishlist;
  }
);

export const addOrRemoveFromWishlist = createAsyncThunk(
  "shoppingCart/add-removeProduct",
  async ({ product, uid }, thunkAPI) => {
    const { id } = product;

    const docRef = doc(database, "users", uid);

    let dataReturned = {
      product,
      productIsInWishlist: false,
      wishlistFiltered: [],
    };

    await getDoc(docRef)
      .then((res) => {
        const wishlist = res.get("wishlist");

        const productIsInWishlist = wishlist.find((item) => item.id === id);

        if (!productIsInWishlist) {
          setDoc(docRef, { wishlist: [...wishlist, product] }, { merge: true });
          dataReturned = {
            product,
            productIsInWishlist: false,
            wishlistFiltered: [],
          };
        } else {
          const wishlistFilter = wishlist.filter((item) => item.id !== id);

          setDoc(docRef, { wishlist: wishlistFilter }, { merge: true });
          dataReturned = {
            product,
            productIsInWishlist: true,
            wishlistFiltered: wishlistFilter,
          };
        }
      })
      .catch((error) => {
        throw error;
      });

    return dataReturned;
  }
);

const initialState = {
  products: [],
  isLoading: false,
  error: {
    isError: false,
    message: "",
  },
};

const options = {
  name: "wishlist",
  initialState,
  extraReducers: {
    //* Get wishlist
    [getWishlist.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getWishlist.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    [getWishlist.rejected]: (state, action) => {
      state.error.isError = true;
      state.error.message = action.error.message;
      state.isLoading = false;
    },
    //* Add/Remove from wishlist
    [addOrRemoveFromWishlist.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addOrRemoveFromWishlist.fulfilled]: (state, action) => {
      if (action.payload.productIsInWishlist)
        state.products = action.payload.wishlistFiltered;
      else state.products.push(action.payload.product);

      state.isLoading = false;
    },
    [addOrRemoveFromWishlist.rejected]: (state, action) => {
      state.error.isError = true;
      state.error.message = action.error.message;
      state.isLoading = false;
    },
  },
};

const wishlistReducer = createSlice(options);

//* Selectors

export const selectWishlist = (state) => state.wishlist.products;

export default wishlistReducer.reducer;
