import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {client} from "../../api/client";


const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users');
  return response.users;
})

const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      return action.payload;
    }
  }
})

export default userSlice.reducer;
