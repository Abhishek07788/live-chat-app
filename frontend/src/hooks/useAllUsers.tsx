import { useState } from "react";

const getUsers = () => {
  const storedUsers = localStorage.getItem("users");
  return storedUsers ? JSON.parse(storedUsers) : [];
};

export const useAllUsers = () => {
  const [allUsers, setAllUsers] = useState(getUsers());
  const count = allUsers.length;
  return { allUsers, setAllUsers, count };
};
