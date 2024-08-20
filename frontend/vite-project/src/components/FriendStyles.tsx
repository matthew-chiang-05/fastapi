import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const FriendsContainer = styled.div`
  font-color: black;
  display: flex;
  z-index: 1000;
  color: black;
  margin-top: 40px;
  align-items: center;
  justify-content: left;
  flex-direction: row;
`;

export const FriendRequestsContainer = styled.div`
  font-color: black;
  display: flex;
  z-index: 1000;
  color: black;
  margin-top: 100px;
  margin-left: 50px;
  margin-right: 50px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 20%;
  outline: 1px solid black;
`;

export const FriendRequestTitle = styled.h2`
  color: black;
`;

export const FriendRequests = styled.li`
  list-style: none;
  display: flex;
  flex-direction: row;
`;

export const FriendListContainer = styled.div`
  font-color: black;
  display: flex;
  z-index: 1000;
  color: black;
  margin-top: 100px;
  margin-right: 50px;
  margin-left: 50px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 15%;
  outline: 1px solid black;
`;

export const FriendListTitle = styled.h2`
  color: black;
`;

export const FriendList = styled.li`
  list-style: none;
  display: flex;
  flex-direction: row;
`;

export const FriendSearchContainer = styled.div`
  font-color: black;
  display: flex;
  z-index: 1000;
  color: black;
  margin-top: 100px;
  margin-left: 50px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 65%;
  outline: 1px solid black;
`;

export const FriendSearchTitle = styled.h2`
  color: black;
`;
export const FriendSearchInput = styled.input`
  width: 300px;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
`;

export const FriendSearchButton = styled.button`
  width: 200px;
  height: 30px;
`;

export const FriendSearchResultsContainer = styled.div`
  font-color: black;
  display: flex;
  z-index: 1000;
  color: black;
  margin-top: 100px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const FriendSearchResult = styled.li`
  list-style: none;
`;

export const FriendNoResults = styled.p`
  color: black;
`;

export const AcceptButton = styled.button`
  width: 15px;
  height: 15px;
  margin-left: 15px;
  cursor: pointer;
  background-color: green;
  color: white;
  align-items: center;
  justify-content: center;
  display: flex;

  &:hover {
    background-color: darkgreen;
  }
`;

export const RemoveButton = styled.button`
  width: 15px;
  height: 15px;
  margin-left: 15px;
  cursor: pointer;
  background-color: red;
  color: white;
  align-items: center;
  justify-content: center;
  display: flex;

  &:hover {
    background-color: darkred;
  }
`;

export const SendButton = styled.button`
  width: 15px;
  height: 15px;
  margin-left: 15px;
  cursor: pointer;
  background-color: blue;
  color: white;
  align-items: center;
  justify-content: center;
  display: flex;

  &:hover {
    background-color: darkblue;
  }
`;

export const FriendLink = styled(Link)`
  color: black;
  text-decoration: none;
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
`;
