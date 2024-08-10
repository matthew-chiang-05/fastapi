import {
  PostContainer,
  PostTitle,
  PostInput,
  PostForm,
  PostButton,
} from "../components/PostStyles";

import { useState } from "react";
import axios from "axios";

const Post = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postStatus, setPostStatus] = useState(0);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPostTitle("");
    setPostContent("");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/posts/",
        {
          title: postTitle,
          content: postContent,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 201) {
        console.log("Post created successfully");
        setPostStatus(1);
      } else {
        console.error("Failed to create post");
        setPostStatus(2);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <PostContainer>
      <PostTitle>Create Your Post</PostTitle>
      <PostForm onSubmit={handleSubmit}>
        <PostInput
          type="text"
          placeholder="Title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          required
        />
        <PostInput
          type="text"
          placeholder="Content"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          required
        />
        <PostButton type="submit">Submit</PostButton>
        {postStatus === 1 && <p>Post created successfully</p>}
        {postStatus === 2 && <p>Failed to create post</p>}
      </PostForm>
    </PostContainer>
  );
};

export default Post;
