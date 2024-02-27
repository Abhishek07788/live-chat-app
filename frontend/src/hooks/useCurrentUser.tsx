import { useState } from "react";

const getCurrentUser = () => {
  const storedUsers = localStorage.getItem("currentUser");
  return storedUsers ? JSON.parse(storedUsers) : {};
};

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  return { currentUser, setCurrentUser };
};

export default useCurrentUser;
