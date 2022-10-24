import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../libs/firebase";

//* Async thunks
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const col = collection(database, "products");
    const querySnapshot = await getDocs(col);
    const products = [];

    querySnapshot.forEach((document) => {
      products.push({
        id: document.id,
        data: document.data(),
      });
    });
    return products;
  }
);

//* Creating store
const initialState = {
  productsList: [],
  isLoading: false,
  error: {
    isError: false,
    message: "",
  },
};

const options = {
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.productsList = action.payload;
      state.isLoading = false;
    },
    [getProducts.rejected]: (state, action) => {
      state.error.isError = true;
      state.error.message = action.error.message;
      state.isLoading = false;
    },
  },
};

const productsSlice = createSlice(options);

//* Selectors
export const selectAllProducts = (state) => state.products.productsList;

export default productsSlice.reducer;
