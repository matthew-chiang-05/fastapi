import {
  FriendRequestTitle,
  FriendRequests,
  FriendRequestsContainer,
  FriendsContainer,
} from "../components/FriendStyles";
import { useState } from "react";
import axios from "axios";
export const Friends = () => {
  const [friendRequests, setFriendRequests] = useState([]);

  const getFriendRequests = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/friend/requests", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      //ToDO
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <FriendsContainer>
      <FriendRequestTitle>
        These People Want to be Your Friend!
      </FriendRequestTitle>
      <FriendRequestsContainer>
        <FriendRequests></FriendRequests>
        <FriendRequests></FriendRequests>
        <FriendRequests></FriendRequests>
      </FriendRequestsContainer>
    </FriendsContainer>
  );
};
