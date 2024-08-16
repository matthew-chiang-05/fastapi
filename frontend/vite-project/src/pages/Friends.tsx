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
  const [searchBar, setSearchBar] = useState("");

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
            <FriendList>{friend.username}</FriendList>
          ))
        )}
      </FriendListContainer>
      <FriendSearchContainer>
        <FriendSearchTitle>Discover Some Friends!</FriendSearchTitle>
        <FriendSearchInput
          type="text"
          onChange={(e) => {
            setSearchBar(e.target.value);
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
              <FriendSearchResult>{result.username}</FriendSearchResult>
            ))
          )}
        </FriendSearchResultsContainer>
      </FriendSearchContainer>
      {friendRequests.length === 0 ? (
        <div>No Friend Requests</div>
      ) : (
        <FriendRequestsContainer>
          <FriendRequestTitle>Friend Requests </FriendRequestTitle>
          {friendRequests.map((request: FriendRequest) => (
            <FriendRequests>
              {request.username} : {formatDate(request.created_at)}
            </FriendRequests>
          ))}
        </FriendRequestsContainer>
      )}
    </FriendsContainer>
  );
};
