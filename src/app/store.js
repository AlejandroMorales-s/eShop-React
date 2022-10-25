import { configureStore } from "@reduxjs/toolkit";

//* Reducers
import userReducer from "../features/user/userSlice";
import productsReducer from "../features/products/productsSlice";
import shoppingCartReducer from "../features/shoppingCart/shoppingCartSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    shoppingCart: shoppingCartReducer,
  },
});
