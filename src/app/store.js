import { configureStore } from "@reduxjs/toolkit";

//* Reducers
import userReducer from "../features/user/userSlice";
import productsReducer from "../features/products/productsSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
  },
});
