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
  FriendSearchResultsContainer,
  FriendSearchResult,
  FriendNoResults,
  AcceptButton,
  RemoveButton,
  SendButton,
} from "../components/FriendStyles";
import { useEffect, useState } from "react";
import axios from "axios";

interface FriendRequest {
  id: number;
  email: string;
  created_at: string;
  username: string;
}

export const Friends = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleAccept = async (id: number) => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/friends/requests/accept/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      getFriends();
      getFriendRequests();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/friends/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      getFriends();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSend = async (id: number) => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/friends/requests/send/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      getFriendRequests();
    } catch (err) {
      console.log(err);
    }
  };
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
          username: item.friend.username,
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
          username: item.user_request.username,
        };
      });
      setFriendRequests(extractedFriendRequests);
    } catch (err) {
      console.log(err);
    }
  };
  const getSearchResults = async (search: string) => {
    try {
      let res: any;
      if (search === "") {
        res = await axios.get("http://127.0.0.1:8000/users");
      } else {
        res = await axios.get(`http://127.0.0.1:8000/users?search=${search}`);
      }

      const extractedUsers = res.data.map((item: any) => {
        return {
          id: item.id,
          email: item.email,
          created_at: item.created_at,
          username: item.username,
        };
      });
      setSearchResults(extractedUsers);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getFriendRequests();
    getFriends();
    getSearchResults("");
  }, []);
  return (
    <FriendsContainer>
      <FriendListContainer>
        <FriendListTitle> Your Friends</FriendListTitle>
        {friends.length === 0 ? (
          <div>No Friends</div>
        ) : (
          friends.map((friend: any) => (
            <FriendList>
              {friend.username}
              <RemoveButton onClick={() => handleRemove(friend.id)}>
                &#10005;
              </RemoveButton>
            </FriendList>
          ))
        )}
      </FriendListContainer>
      <FriendSearchContainer>
        <FriendSearchTitle>Discover Some Friends!</FriendSearchTitle>
        <FriendSearchInput
          type="text"
          onChange={(e) => {
            getSearchResults(e.target.value);
          }}
          placeholder="Search for friends"
        ></FriendSearchInput>
        <FriendSearchButton>Search</FriendSearchButton>
        <FriendSearchResultsContainer>
          {searchResults.length === 0 ? (
            <FriendNoResults>No Results</FriendNoResults>
          ) : (
            searchResults.map((result: any) => (
              <FriendSearchResult>
                {result.username}
                <SendButton onClick={() => handleSend(result.id)}>
                  &rarr;
                </SendButton>
              </FriendSearchResult>
            ))
          )}
        </FriendSearchResultsContainer>
      </FriendSearchContainer>

      <FriendRequestsContainer>
        <FriendRequestTitle>Friend Requests</FriendRequestTitle>
        {friendRequests.length === 0 ? (
          <div>No Friend Requests</div>
        ) : (
          friendRequests.map((request: FriendRequest) => (
            <FriendRequests key={request.id}>
              {request.username} : {formatDate(request.created_at)}
              <AcceptButton onClick={() => handleAccept(request.id)}>
                &#10003;
              </AcceptButton>
            </FriendRequests>
          ))
        )}
      </FriendRequestsContainer>
    </FriendsContainer>
  );
};
