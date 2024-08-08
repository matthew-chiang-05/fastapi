import { styled } from "styled-components";

export const CreateUserContainer = styled.div`
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

export const CreateUserTitle = styled.h1`
  font-weight: bold;
  color: black;
`;

export const CreateUserInput = styled.input`
  width: 300px;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
`;

export const CreateUserButton = styled.button`
  width: 200px;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
`;

export const CreateUserError = styled.p`
  color: red;
`;

export const CreateUserSuccess = styled.p`
  color: green;
`;

export const CreateUserForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
