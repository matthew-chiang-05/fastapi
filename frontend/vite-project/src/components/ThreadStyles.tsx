import styled from "styled-components";

export const ThreadContainer = styled.div`
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

export const ThreadTitle = styled.h1`
  font-weight: bold;
  color: black;
`;

export const ThreadMessage = styled.p`
  font-weight: bold;
  color: black;
`;

export const ThreadInput = styled.input`
  width: 300px;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
`;

export const ThreadButton = styled.button`
  width: 200px;
  height: 30px;
`;
