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
    filterProductsByPriceRange: (state, action) => {
      const { priceRange, products } = action.payload;

      const minPrice = priceRange[0];
      const maxPrice = priceRange[1];

      const productsFiltered = products.filter((product) => {
        if (priceRange.length === 1 && product.data.price >= minPrice)
          return product;

        if (product.data.price >= minPrice && product.data.price <= maxPrice)
          return product;
      });

      state.productsFiltered = productsFiltered;
    },
  },
};

const filtersSlice = createSlice(options);

//* Reducers
export const { filterProductsByName, filterProductsByPriceRange } =
  filtersSlice.actions;

//* Selector
export const selectProductsFiltered = (state) => state.filters.productsFiltered;

export default filtersSlice.reducer;
