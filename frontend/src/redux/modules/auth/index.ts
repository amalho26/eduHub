import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../types";
import { thunkSignIn, thunkSignOut } from "./thunks";

interface AuthState {
  isLoading: boolean;
  user?: User;
}

const initialState: AuthState = {
  isLoading: true,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = initialState.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(thunkSignIn.pending.type, (state, action) => {
      state.isLoading = true;
    })
    .addCase(thunkSignIn.fulfilled.type, (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isLoading = false;
    })
    .addCase(thunkSignIn.rejected.type, (state, action) => {
      state.isLoading = false;
    })
    .addCase(thunkSignOut.pending.type, (state, action) => {
      state.isLoading = true;
    })
    .addCase(thunkSignOut.fulfilled.type, (state, action) => {
      state.user = undefined;
      state.isLoading = false;
    })
    .addCase(thunkSignOut.rejected.type, (state, action) => {
      state.isLoading = false;
    })
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
