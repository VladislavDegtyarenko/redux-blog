import { useState } from "react";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import { useParams, useNavigate } from "react-router-dom";

import { selectAllUsers } from "../users/usersSlice";
import { useUpdatePostMutation, useDeletePostMutation } from "./postsSlice";

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(Number(e.target.value));

  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await updatePost({ id: post.id, title, body: content, userId }).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
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

  const onDeletePostClicked = async () => {
    try {
      await deletePost({ id: post.id }).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the post", err);
    }
  };

  return (
    <section className="max-w-sm mx-auto">
      <h2 className="heading-2">Edit Post</h2>
      <form className="grid mt-4 gap-1">
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
          className="p-2 rounded-md dark:bg-neutral-800"
        />
        <label htmlFor="postAuthor" className="mt-2">
          Author:
        </label>
        <select
          id="postAuthor"
          value={userId}
          onChange={onAuthorChanged}
          className="p-2 dark:bg-neutral-800"
        >
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
          className="p-2 min-h-[10em] dark:bg-neutral-800"
        />
        <button
          type="button"
          onClick={onSavePostClicked}
          disabled={!canSave}
          className="font-bold mt-4 py-2 px-4 bg-indigo-700 hover:bg-indigo-800 transition-colors text-white rounded-md cursor-pointer"
        >
          Save Post
        </button>
        <button
          type="button"
          onClick={onDeletePostClicked}
          className="font-bold mt-2 py-2 px-4 text-red-700 hover:text-red-800 dark:text-red-500 dark:hover:text-red-600 transition-colors rounded-md cursor-pointer"
        >
          Delete Post
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
