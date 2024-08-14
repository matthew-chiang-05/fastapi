import {
  FriendListContainer,
  FriendRequestTitle,
  FriendRequests,
  FriendRequestsContainer,
  FriendsContainer,
  FriendListTitle,
  FriendPosts,
  FriendPostsContainer,
  FriendPostsTitle,
  FriendList,
} from "../components/FriendStyles";
import { useEffect, useState } from "react";
import axios from "axios";

interface FriendRequest {
  id: number;
  email: string;
  created_at: string;
}

interface FriendPost {
  id: number;
  title: string;
  content: string;
  published: boolean;
  created_at: string;
  owner: {
    email: string;
    id: number;
    owner_created_at: string;
  };
}
export const Friends = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendPosts, setFriendPosts] = useState([]);
  const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  };
  const getFriends = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/friends/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const extractedFriends = res.data.map((item: any) => {
        return {
          id: item.friend.id,
          email: item.friend.email,
        };
      });
      setFriends(extractedFriends);
    } catch (err) {
      console.log(err);
    }
  };
  const getFriendRequests = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/friends/requests", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      //ToDO: fix this
      const extractedFriendRequests = res.data.map((item: any) => {
        return {
          id: item.user_request.id,
          email: item.user_request.email,
          created_at: item.created_at,
        };
      });
      setFriendRequests(extractedFriendRequests);
    } catch (err) {
      console.log(err);
    }
  };
  const getFriendPosts = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/posts/friends", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const extractedFriendPosts = res.data.map((item: any) => {
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
      setFriendPosts(extractedFriendPosts);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getFriendRequests();
    getFriends();
    getFriendPosts();
  }, []);
  return (
    <FriendsContainer>
      <FriendListContainer>
        <FriendListTitle> Your Friends</FriendListTitle>
        {friends.length === 0 ? (
          <div>No Friends</div>
        ) : (
          friends.map((friend: any) => <FriendList>{friend.email}</FriendList>)
        )}
      </FriendListContainer>
      <FriendPostsContainer>
        <FriendPostsTitle>See what your friends are up to!</FriendPostsTitle>
        {friendPosts.length === 0 ? (
          <div>No Posts</div>
        ) : (
          friendPosts.map((post: FriendPost) => (
            //TODO
            <FriendPosts>{post.content}</FriendPosts>
          ))
        )}
        <FriendPosts></FriendPosts>
      </FriendPostsContainer>
      {friendRequests.length === 0 ? (
        <div>No Friend Requests</div>
      ) : (
        <FriendRequestsContainer>
          <FriendRequestTitle>Friend Requests </FriendRequestTitle>
          {friendRequests.map((request: FriendRequest) => (
            <FriendRequests>
              {request.email} : {formatDate(request.created_at)}
            </FriendRequests>
          ))}
        </FriendRequestsContainer>
      )}
    </FriendsContainer>
  );
};
