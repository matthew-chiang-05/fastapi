import { styled } from "styled-components";

export const HomeContainer = styled.div`
  font-color: black;
  display: flex;
  z-index: 1000;
  color: red;
  margin-top: 100px;
  margin-left: 50px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const HomeTitle = styled.h1`
  font-weight: bold;
  color: black;
`;

export const HomePostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const HomePost = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
  width: 300px;
  height: 300px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

export const HomePostPicture = styled.img`
  width: 300px;
  height: 300px;
`;

export const HomePostText = styled.p`
  font-weight: bold;
  color: black;
  font-size: 1.5rem;
`;

export const HomePostTitle = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 10px;
  margin-top: 10px;
  text-align: center;
  width: 300px;
  height: 300px;
  word-wrap: break-word;
  line-height: 1.5;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const HomePostContent = styled.p`
  font-weight: bold;
  color: black;
  font-size: 1.5rem;
  margin-bottom: 10px;
  margin-top: 10px;
  text-align: center;
  width: 300px;
  height: 300px;
  word-wrap: break-word;
  line-height: 1.5;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const HomePostLikeButton = styled.button`
  width: 100px;
  height: 30px;
  margin-bottom: 10px;
  margin-top: 10px;
`;
