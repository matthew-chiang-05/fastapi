import { styled } from "styled-components";

export const PostContainer = styled.div`
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

export const PostTitle = styled.h1`
  font-weight: bold;
  color: black;
`;

export const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PostInput = styled.input`
  width: 300px;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
`;

export const PostButton = styled.button`
  width: 200px;
  height: 30px;
`;

export const postStatus = styled.p``;
