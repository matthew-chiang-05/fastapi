import styled from "styled-components";

export const Container = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
`;
export const ThreadContainer = styled.div`
  font-color: black;
  display: flex;
  z-index: 1000;
  color: red;
  margin-top: 100px;
  width: 50%;
  flex-direction: column;
  outline: 1px solid black;
`;

export const ThreadTitle = styled.h1`
  font-weight: bold;
  color: black;
  align-self: center;
`;

export const MessageWrapperLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  text-align: left;
  margin-left: 10px;
`;

export const MessageWrapperRight = styled.div`
  display: flex;
  justify-content: flex-end;
  text-align: right;
  margin-right: 10px;
`;

export const ThreadMessage = styled.p`
  font-weight: bold;
  color: black;
  width: 40%;
`;

export const ThreadInput = styled.input`
  width: 300px;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  align-self: center;
`;

export const ThreadButton = styled.button`
  width: 60px;
  height: 35px;
`;

export const ThreadForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
