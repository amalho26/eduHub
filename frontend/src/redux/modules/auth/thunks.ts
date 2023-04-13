import { createAsyncThunk } from "@reduxjs/toolkit";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { getUserInfo } from "../../../graphql/queries";

export const thunkSignIn = createAsyncThunk(
  "signIn",
  async (credentials?: { username: string; password: string }) => {
    try {
      if (credentials) {
        await Auth.signIn(credentials.username, credentials.password);
      } else {
        await Auth.currentAuthenticatedUser();
      }
      
      const { data } = await API.graphql(
        graphqlOperation(getUserInfo)
      )
      
      console.log(data);
      
      return data.getUserInfo;
    } catch (error) {
      alert(error);
      throw error;
    }
  }
);

export const thunkSignOut = createAsyncThunk("signOut", async () => {
  try {
    await Auth.signOut();
    return "SUCCESS";
  } catch (error) {
    throw error;
  }
});
