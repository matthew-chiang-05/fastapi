import React from "react";
import { useParams } from "react-router-dom";
import { Thread } from "./Thread";

const ThreadWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const user_id = Number(id);

  return <Thread user_id={user_id} />;
};

export default ThreadWrapper;
