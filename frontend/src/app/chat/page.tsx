"use client";
import Layout from "@/Layout";
import UsersList from "@/components/users/UsersList";
import MiddlewareRoute from "@/middleware/MiddlewareRoute";
import React from "react";

const Chat = () => {
  return (
    <Layout>
      <MiddlewareRoute>
        <UsersList />
      </MiddlewareRoute>
    </Layout>
  );
};

export default Chat;
