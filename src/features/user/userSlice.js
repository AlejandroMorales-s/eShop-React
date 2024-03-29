import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//* Firebase
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "../../libs/firebase";
import { providerLogin } from "../../libs/auth";

//* Async thunks
export const loginWithEmail = createAsyncThunk(
  "user/login",
  async ({ auth, password, email }, thunkAPI) => {
    let userData = {};

    await signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const { displayName, email, uid, photoURL } = res.user;
        let role = "";

        const docRef = doc(database, "users", uid);

        await getDoc(docRef)
          .then((data) => (role = data.get("role")))
          .catch((error) => console.log(error));

        userData = {
          displayName,
          email,
          uid,
          photoURL,
          role,
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
        return {
          uid: result.user.uid,
          role: "REGULAR",
        };
      })
      .then(({ uid, role }) => {
        userData = {
          displayName: name,
          email,
          uid,
          photoURL: null,
          role,
        };
      })
      .catch((error) => {
        throw error;
      });

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
        let role = "";
        const docRef = doc(database, "users", uid);

        await getDoc(docRef)
          .then(async (data) => {
            if (data.get("role") === undefined) {
              await setDoc(docRef, {
                role: "REGULAR",
                shoppingCart: [],
                wishlist: [],
                paymentMethods: [],
                addresses: [],
              });
            }
            role = data.get("role");
          })
          .catch((error) => console.log(error));

        userData = {
          displayName,
          email,
          uid,
          photoURL,
          role,
        };
      })
      .catch((error) => {
        throw error;
      });

    return userData;
  }
);

export const authChangeHandler = createAsyncThunk(
  "user/handlerAuthChange",
  async (auth, thunkAPI) => {
    let userData = {};

    const authHandler = async (auth) => {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (res) => {
          if (res === undefined || res === null) {
            reject("Session closed");
          }
          const { uid, displayName, email, photoURL } = res;
          let role = "";

          const docRef = doc(database, "users", uid);

          await getDoc(docRef)
            .then((data) => (role = data.get("role")))
            .catch((error) => console.log(error));

          resolve({
            displayName,
            email,
            uid,
            photoURL,
            role,
          });
        });
      });
    };

    await authHandler(auth)
      .then((res) => {
        userData = res;
      })
      .catch((error) => {
        throw error;
      });

    return userData;
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (auth, thunkAPI) => {
    await signOut(auth);

    return initialState;
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
    //* Login with email
    [loginWithEmail.pending]: (state, action) => {
      state.isSubmitting = true;
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
    },
    //* Create account with email
    [createAccountWithEmail.pending]: (state, action) => {
      state.isSubmitting = true;
    },
    [createAccountWithEmail.fulfilled]: (state, action) => {
      state.userData = action.payload;

      state.logged = true;
      state.isSubmitting = false;
    },
    [createAccountWithEmail.rejected]: (state, action) => {
      state.error.message = action.error.message;

      state.error.isError = true;
      state.isSubmitting = false;
    },
    //* Login with provider
    [loginWithSocialMedia.pending]: (state, action) => {
      state.isSubmitting = true;
    },
    [loginWithSocialMedia.fulfilled]: (state, action) => {
      state.userData = action.payload;

      state.logged = true;
      state.isSubmitting = false;
    },
    [loginWithSocialMedia.rejected]: (state, action) => {
      state.error.message = action.error.message;

      state.isSubmitting = false;
      state.error.isError = true;
    },
    //* Auth change handler
    [authChangeHandler.pending]: (state, action) => {
      state.isSubmitting = true;
    },
    [authChangeHandler.fulfilled]: (state, action) => {
      state.userData = action.payload;

      state.logged = true;
      state.isSubmitting = false;
    },
    [authChangeHandler.rejected]: (state, action) => {
      state.error.message = action.error.message;

      state.isSubmitting = false;
      state.error.isError = true;
    },
    //* logout
    [logout.pending]: (state, action) => {
      state.isSubmitting = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.isSubmitting = false;
      state.userData = {};
      state.logged = false;
    },
    [logout.rejected]: (state, action) => {
      state.error.message = action.error.message;

      state.isSubmitting = false;
      state.error.isError = true;
    },
  },
};

const userSlice = createSlice(options);

//* Selectors
export const selectLoggedStatus = (state) => state.user.logged;

export const selectErrorStatus = (state) => state.user.error.isError;

export const selectErrorMessage = (state) => state.user.error.message;

export const selectUserData = (state) => state.user.userData;

export const selectIsSubmitting = (state) => state.user.isSubmitting;

export default userSlice.reducer;
