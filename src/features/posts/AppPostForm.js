import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addNewPost} from "./postsSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import {selectAllUsers} from "../users/usersSlice";

export const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

  const dispatch = useDispatch();

  const users = useSelector(selectAllUsers);

  const onTitleChanged = event => setTitle(event.target.value);
  const onContentChanged = event => setContent(event.target.value);
  const onAuthorChanged = event => setUserId(event.target.value);

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        const resultAction = await dispatch(addNewPost({title, content, user: userId}));
        unwrapResult(resultAction);
        setTitle('');
        setContent('');
        setUserId('');
      } catch (err) {
        console.log(`zavanton - error: ${err}`);
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const userOptions = users.map(user => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    )
  })

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

        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value="">N\A</option>
          {userOptions}
        </select>

        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button onClick={onSavePostClicked} type="button" disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
}