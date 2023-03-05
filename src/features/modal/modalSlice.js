import { createSlice } from "@reduxjs/toolkit";

//* Creating store
const initialState = {
  isActive: false,
  closingModal: false,
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
      state.closingModal = false;
      state.modalData = initialState.modalData;
    },
    setModalInfo: (state, action) => {
      state.isActive = true;
      state.modalData = action.payload;
    },
    setClosingModal: (state) => {
      state.closingModal = true;
    },
  },
};

const modalSlice = createSlice(options);

//* Reducers
export const { resetModal, setModalInfo, setClosingModal } = modalSlice.actions;

//* Selectors
export const selectModalData = (state) => state.modal.modalData;
export const selectModalStatus = (state) => state.modal.isActive;
export const selectModalClosing = (state) => state.modal.closingModal;

export default modalSlice.reducer;
