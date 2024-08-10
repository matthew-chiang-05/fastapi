import styled from "styled-components";

export const LoginContainer = styled.div`
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

export const LoginTitle = styled.h1`
  font-weight: bold;
  color: black;
`;

export const LoginInput = styled.input`
  width: 200px;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
`;

export const LoginButton = styled.button`
  width: 200px;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const LoginError = styled.p`
  color: red;
`;

export const LoginErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoginButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoginPicture = styled.img`
  width: 300px;
  height: 300px;
`;

export const LoginPictureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CreateUserButton = styled.button`
  width: 200px;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const CreateUserButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
