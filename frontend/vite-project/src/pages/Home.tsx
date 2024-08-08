import axios from "axios";
import {
  HomeContainer,
  HomePost,
  HomePostText,
  HomePostTitle,
  HomePostsContainer,
  HomeTitle,
} from "../components/HomeStyles";
import { useEffect, useState } from "react";
export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/posts/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Response Data", res.data);
        const extractedPosts = res.data.map((item: any) => item.Post);
        setPosts(extractedPosts);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  return (
    <HomeContainer>
      <HomeTitle>Your Feed</HomeTitle>
      <HomePostsContainer>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          posts.map((post: any) => (
            <HomePost key={post.id}>
              <HomePostTitle>{post.title}</HomePostTitle>
              <HomePostText>{post.content}</HomePostText>
            </HomePost>
          ))
        )}
      </HomePostsContainer>
    </HomeContainer>
  );
};
