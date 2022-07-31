import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// https://jsonplaceholder.typicode.com/posts/1

const initialState = {
  posts: [],
}

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (_, { rejectWithValue, dispatch }) => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/');
    dispatch(setPosts(response.data));
  }
)

export const deletePostByid = createAsyncThunk(
  'posts/deletePostByid',
  async (id, rejectWithValue, dispatch) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    dispatch(deletePost(id))
  }
)

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
  },
  extraReducers: {
    [getPosts.pending]: () => console.log('getPosts - pending'),
    [getPosts.fulfilled]: () => console.log('getPosts - fulfilled'),
    [getPosts.rejected]: () => console.log('getPosts - rejected'),
    [deletePostByid.pending]: () => console.log('deletePostByid - pending'),
    [deletePostByid.fulfilled]: () => console.log('deletePostByid - fulfilled'),
    [deletePostByid.rejected]: () => console.log('deletePostByid - rejected'),
  },
});

export const { setPosts, deletePost } = postSlice.actions;
export default postSlice.reducer;