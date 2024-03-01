import Layout from "@/Layout";
import Chatting from "@/components/Chat";
import { QP } from "@/constants/routes";
import React from "react";

type Props = {
  params: {
    [QP.roomId]: string;
  };
};
const ChatRoom = ({ params }: Props) => {
  return (
    <Layout>
      <Chatting roomId={params[QP.roomId]} />
    </Layout>
  );
};

export default ChatRoom;
