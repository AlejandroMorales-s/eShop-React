import { configureStore } from "@reduxjs/toolkit";

//* Reducers
import userReducer from "../features/user/userSlice";
import productsReducer from "../features/products/productsSlice";
import shoppingCartReducer from "../features/shoppingCart/shoppingCartSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import filtersReducer from "../features/filters/filtersSlice";
import modalReducer from "../features/modal/modalSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    shoppingCart: shoppingCartReducer,
    wishlist: wishlistReducer,
    filters: filtersReducer,
    modal: modalReducer,
  },
});
