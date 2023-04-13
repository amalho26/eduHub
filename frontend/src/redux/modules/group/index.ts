import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Group, User } from "../../../types";
import { thunkCreateGroup, thunkListGroups } from "./thunks";

interface GroupState {
  isLoading: boolean;
  groups: Group[];
  selectedGroupId: number;
}

const initialState: GroupState = {
  isLoading: true,
  groups: [],
  selectedGroupId: -1
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setSelectedGroupId: (state, action) => {
      state.selectedGroupId = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunkListGroups.pending.type, (state, action) => {
        state.isLoading = true;
      })
      .addCase(
        thunkListGroups.fulfilled.type,
        (state, action: PayloadAction<Group[]>) => {
          state.groups = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(thunkListGroups.rejected.type, (state, action) => {
        state.isLoading = false;
      })
      .addCase(thunkCreateGroup.pending.type, (state, action) => {
        state.isLoading = true;
      })
      .addCase(thunkCreateGroup.fulfilled.type, (state, action: PayloadAction<Group>) => {
        state.groups = [action.payload].concat(state.groups);
        state.isLoading = false;
      })
      .addCase(thunkCreateGroup.rejected.type, (state, action) => {
        state.isLoading = false;
      })
  },
});

export const { setSelectedGroupId } = groupSlice.actions;
export default groupSlice.reducer;
