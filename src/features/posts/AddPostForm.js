import { useState } from "react";
import { useSelector } from "react-redux";

import { selectAllUsers } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";
import { useAddNewPostMutation } from "./postsSlice";

const AddPostForm = () => {
  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await addNewPost({ title, body: content, userId }).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
      } catch (err) {
        console.error("Failed to save the post", err);
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section className="max-w-sm mx-auto">
      <h2 className="heading-2">Add a New Post</h2>
      <form className="grid mt-4 gap-1">
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
          className="p-2"
        />
        <label htmlFor="postAuthor" className="mt-2">
          Author:
        </label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged} className="p-2">
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent" className="mt-2">
          Content:
        </label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
          className="p-2 min-h-[8em]"
        />
        <button
          type="button"
          onClick={onSavePostClicked}
          disabled={!canSave}
          className="font-bold mt-4 py-2 px-4 bg-indigo-700 hover:bg-indigo-800 transition-colors text-white rounded-md cursor-pointer"
        >
          Save Post
        </button>
      </form>
    </section>
  );
};
export default AddPostForm;
