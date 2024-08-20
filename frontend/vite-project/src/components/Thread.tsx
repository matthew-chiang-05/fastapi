import axios from "axios";
import {
  ThreadButton,
  ThreadContainer,
  ThreadInput,
  ThreadMessage,
  ThreadTitle,
} from "./ThreadStyles";
import { useEffect, useState } from "react";
interface ThreadProps {
  user_id: number;
}
export const Thread = ({ user_id }: ThreadProps) => {
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState("");

  const getUserName = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/users/${user_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserName(res.data.username);
    } catch (error) {
      console.error(error);
    }
  };
  const getMessages = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/messages/${user_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const extractedMessages = res.data.map((item: any) => {
        return {
          content: item.content,
          created_at: item.created_at,
        };
      });
      setMessages(extractedMessages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMessages();
    getUserName();
  }, []);
  return (
    <ThreadContainer>
      <ThreadTitle>{userName}</ThreadTitle>
      {messages.map((message: any) => (
        <ThreadMessage>{message.content}</ThreadMessage>
      ))}
      <ThreadInput></ThreadInput>
      <ThreadButton></ThreadButton>
    </ThreadContainer>
  );
};
