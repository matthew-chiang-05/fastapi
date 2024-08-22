import axios from "axios";
import {
  MessageWrapperLeft,
  ThreadButton,
  ThreadContainer,
  ThreadInput,
  ThreadMessage,
  ThreadTitle,
  MessageWrapperRight,
  Container,
  ThreadForm,
} from "./ThreadStyles";
import { useEffect, useState } from "react";
interface ThreadProps {
  user_id: number;
}
export const Thread = ({ user_id }: ThreadProps) => {
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/messages/`,
        {
          content: message,
          receiver_id: user_id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 201) {
        console.log("Message sent successfully");
      } else {
        console.error("Failed to send message");
      }
      setMessage("");
      getMessages();
    } catch (error) {
      console.error(error);
    }
  };

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
          sent: item.sent,
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
    <Container>
      <ThreadContainer>
        <ThreadTitle>{userName}</ThreadTitle>
        {messages.map((message: any) =>
          message.sent === 1 ? (
            <MessageWrapperRight>
              <ThreadMessage>{message.content}</ThreadMessage>
            </MessageWrapperRight>
          ) : (
            <MessageWrapperLeft>
              <ThreadMessage>{message.content}</ThreadMessage>
            </MessageWrapperLeft>
          )
        )}
        <ThreadForm onSubmit={handleSubmit}>
          <ThreadInput
            type="text"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></ThreadInput>
          <ThreadButton type="submit">Send</ThreadButton>
        </ThreadForm>
      </ThreadContainer>
    </Container>
  );
};
