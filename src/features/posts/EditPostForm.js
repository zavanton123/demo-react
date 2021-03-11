import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {postUpdated} from "./postsSlice";
import {useHistory} from "react-router-dom";

export const EditPostForm = ({match}) => {
  const {postId} = match.params;

  const post = useSelector(state =>
    state.posts.find(post => post.id === postId)
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const onTitleChanged = event => setTitle(event.target.value);
  const onContentChanged = event => setContent(event.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({id: postId, title, content}));
      history.push(`/posts/${postId}`);
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
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
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  )
}