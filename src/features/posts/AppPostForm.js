import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {postAdded} from "./postsSlice";

export const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useDispatch();

  const onTitleChanged = event => setTitle(event.target.value);
  const onContentChanged = event => setContent(event.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded(title, content))

      setTitle('');
      setContent('');
    }
  }

  return (
    <section>
      <h2>Add a new post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Post Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button onClick={onSavePostClicked} type="button">
          Save Post
        </button>
      </form>
    </section>
  );
}