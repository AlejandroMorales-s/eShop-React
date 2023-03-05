import { createSlice } from "@reduxjs/toolkit";

//* Creating store
const initialState = {
  isActive: false,
  modalData: {
    title: "",
    message: "",
    type: "",
  },
};

const options = {
  name: "modal",
  initialState,
  reducers: {
    resetModal: (state) => {
      state.isActive = false;
      state.modalData = initialState.modalData;
    },
    setModalInfo: (state, action) => {
      state.isActive = true;
      state.modalData = action.payload;
    },
  },
};

const modalSlice = createSlice(options);

//* Reducers
export const { resetModal, setModalInfo } = modalSlice.actions;

//* Selectors
export const selectModalData = (state) => state.modal.modalData;
export const selectModalStatus = (state) => state.modal.isActive;

export default modalSlice.reducer;
