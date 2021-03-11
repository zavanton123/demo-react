import {createSlice, nanoid} from "@reduxjs/toolkit";


const initialState = [
  {id: '1', date: '2021-01-05T14:48:00.000Z', title: 'First Post', content: 'Hello', user: '0'},
  {id: '2', date: '2021-02-05T14:48:00.000Z', title: 'Second Post', content: 'More text', user: '1'}
]


const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId
          }
        }
      }
    },
    postUpdated(state, action) {
      const {id, title, content} = action.payload;
      const existingPost = state.find(post => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    }
  }
})

export const {postAdded, postUpdated} = postsSlice.actions;

export default postsSlice.reducer;