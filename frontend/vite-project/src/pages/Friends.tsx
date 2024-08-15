import {
  FriendListContainer,
  FriendRequestTitle,
  FriendRequests,
  FriendRequestsContainer,
  FriendsContainer,
  FriendListTitle,
  FriendList,
  FriendSearchContainer,
  FriendSearchTitle,
  FriendSearchInput,
  FriendSearchButton,
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

  useEffect(() => {
    getFriendRequests();
    getFriends();
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
      <FriendSearchContainer>
        <FriendSearchTitle>Discover Some Friends!</FriendSearchTitle>
        <FriendSearchInput placeholder="Search for friends"></FriendSearchInput>
        <FriendSearchButton>Search</FriendSearchButton>
      </FriendSearchContainer>
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
