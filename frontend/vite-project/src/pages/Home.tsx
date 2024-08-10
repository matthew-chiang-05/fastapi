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
  /*const handleLike = async (id: number) => {
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/vote/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/posts/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const extractedPosts = res.data.map((item: any) => {
          return {
            id: item.Post.id,
            title: item.Post.title,
            content: item.Post.content,
            published: item.Post.published,
            created_at: item.Post.created_at,
            owner: {
              email: item.Post.owner.email,
              id: item.Post.owner.id,
              owner_created_at: item.Post.owner.created_at,
            },
            votes: item.votes,
          };
        });
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
  const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };
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
              <HomePostText>{formatDate(post.created_at)}</HomePostText>
              <HomePostText>{post.owner.email}</HomePostText>
              <HomePostText>Likes : {post.votes}</HomePostText>
            </HomePost>
          ))
        )}
      </HomePostsContainer>
    </HomeContainer>
  );
};
