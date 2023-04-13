import { createAsyncThunk } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { createGroup } from "../../../graphql/mutations";
import { listGroups } from "../../../graphql/queries";

export const thunkListGroups = createAsyncThunk(
  "listGroups",
  async (userId: number | undefined) => {
    try {
      const { data } = await API.graphql(graphqlOperation(listGroups, {
        userId: userId
      }));

      return data.listGroups;
    } catch (error) {
      throw error;
    }
  }
);

export const thunkCreateGroup = createAsyncThunk(
  "createGroup",
  async (group: { name: string; description: string; userIds: string }) => {
    try {
      const { data } = await API.graphql(
        graphqlOperation(createGroup, {
          name: group.name,
          description: group.description,
          userIds: group.userIds,
        })
      );

      console.log(data);

      return data.createGroup;
    } catch (error) {
      throw error;
    }
  }
);
