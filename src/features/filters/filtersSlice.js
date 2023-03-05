import { createSlice } from "@reduxjs/toolkit";

//* Creating store
const initialState = {
  productsFiltered: [],
};

const options = {
  name: "user",
  initialState,
  reducers: {
    filterProductsByName: (state, action) => {
      const { name, products } = action.payload;

      if (!name) {
        state.productsFiltered = [];
        return;
      }

      const productsThatContainName = products.filter((product) =>
        product.data.name.toLowerCase().includes(name.toLowerCase().trim())
      );

      state.productsFiltered = productsThatContainName;
    },
  },
};

const filtersSlice = createSlice(options);

//* Reducers
export const { filterProductsByName } = filtersSlice.actions;

//* Selector
export const selectProductsFiltered = (state) => state.filters.productsFiltered;

export default filtersSlice.reducer;
