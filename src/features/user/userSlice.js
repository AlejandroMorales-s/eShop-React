import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//* Firebase
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { database } from "../../libs/firebase";
import { providerLogin } from "../../libs/auth";

//* Async thunks
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

export const createAccountWithEmail = createAsyncThunk(
  "user/signup",
  async ({ auth, email, password, name }, thunkAPI) => {
    let userData = {};
    console.log(email);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        await updateProfile(result.user, {
          displayName: name,
        });
        await setDoc(doc(database, "users", result.user.uid), {
          role: "REGULAR",
          shoppingCart: [],
          wishlist: [],
          paymentMethods: [],
          addresses: [],
        });

        console.log("await");
        return {
          uid: result.user.uid,
        };
      })
      .then(({ uid }) => {
        console.log("then");
        userData = {
          displayName: name,
          email,
          password,
          uid,
          photoURL: null,
        };
        console.log(userData);
      })
      .catch((error) => {
        throw error;
      });
    console.log(userData);

    return userData;
  }
);

export const loginWithSocialMedia = createAsyncThunk(
  "user/loginWithProvider",
  async (providerId, thunkAPI) => {
    let userData = {};

    await providerLogin(providerId)
      .then(async (res) => {
        const { displayName, email, photoURL, uid } = res.user;
        const docRef = doc(database, "users", res.user.uid);
        await setDoc(docRef, {
          role: "REGULAR",
          shoppingCart: [],
          wishlist: [],
          paymentMethods: [],
          addresses: [],
        });
        userData = {
          displayName,
          email,
          password: null,
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

//* Creating store
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

      state.logged = true;
      state.isSubmitting = false;
    },
    [loginWithEmail.rejected]: (state, action) => {
      state.error.message = action.error.message;
      state.error.isError = true;
      state.isSubmitting = false;
      state.logged = false;
    },
    [createAccountWithEmail.pending]: (state, action) => {
      state.isSubmitting = true;
      state.logged = false;
    },
    [createAccountWithEmail.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.logged = true;
      state.isSubmitting = false;
    },
    [createAccountWithEmail.rejected]: (state, action) => {
      state.isSubmitting = false;
      state.error.message = action.error.message;
      state.error.isError = true;
      state.isSubmitting = false;
      state.logged = false;
    },
    [loginWithSocialMedia.pending]: (state, action) => {
      state.isSubmitting = true;
      state.logged = false;
    },
    [loginWithSocialMedia.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.logged = true;
      state.isSubmitting = false;
    },
    [loginWithSocialMedia.rejected]: (state, action) => {
      state.isSubmitting = false;
      state.error.message = action.error.message;
      state.error.isError = true;
      state.logged = false;
    },
  },
};

const userSlice = createSlice(options);

//* Selectors
export const selectLoggedStatus = (state) => state.user.logged;

export const selectErrorStatus = (state) => state.user.error.isError;

export const selectErrorMessage = (state) => state.user.error.message;

export default userSlice.reducer;
