import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//* Firebase
import { signInWithEmailAndPassword } from "firebase/auth";

export const loginWithEmail = createAsyncThunk(
  "user/login",
  async ({ auth, password, email }, thunkAPI) => {
    let userData = {};
    await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const { displayName, email, uid, photoURL } = res.user;
        userData = {
          displayName,
          email,
          uid,
          photoURL,
        };
      })
      .catch((error) => {
        throw error;
      });

    return userData;
  }
);

const initialState = {
  userData: {},
  logged: false,
  isSubmitting: false,
  error: {
    isError: false,
    message: "",
  },
};

const options = {
  name: "user",
  initialState,
  extraReducers: {
    [loginWithEmail.pending]: (state, action) => {
      state.isSubmitting = true;
      state.logged = false;
    },
    [loginWithEmail.fulfilled]: (state, action) => {
      state.userData = action.payload;
      console.log(action);

      state.logged = true;
      state.isSubmitting = false;
    },
    [loginWithEmail.rejected]: (state, action) => {
      state.error.message = action.error.message;
      state.error.isError = true;
      state.isSubmitting = false;
      state.logged = false;
    },
  },
};

const userSlice = createSlice(options);

export const selectLoggedStatus = (state) => state.user.logged;

export const selectErrorStatus = (state) => state.user.error.isError;

export const selectErrorMessage = (state) => state.user.error.message;

export default userSlice.reducer;
