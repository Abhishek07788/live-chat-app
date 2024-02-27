"use client";
import { UsersTypes } from "@/globle";
import { useAllUsers } from "@/hooks/useAllUsers";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Button, Grid, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Signup = () => {
  const { allUsers } = useAllUsers();
  const { setCurrentUser } = useCurrentUser();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmitUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.length < 3) {
      setError("user must have at least 3 characters!");
      return;
    }
    if (password.length < 5) {
      setError("At least 5 characters required on password!");
      return;
    }
    const user: UsersTypes = { name, userName, password };
    const isUserExist = allUsers.some(
      (existingUser: UsersTypes) =>
        existingUser.userName?.toLowerCase() === userName.toLowerCase()
    );
    if (isUserExist) {
      setError("User Already Exist!");
    } else {
      localStorage.setItem("users", JSON.stringify([...allUsers, user]));
      localStorage.setItem("currentUser", JSON.stringify(user));
      setCurrentUser(user);
      router.push("/chat", { scroll: false });
      setName("");
      setPassword("");
      setUserName("");
    }
  };

  return (
    <Grid
      display={"flex"}
      component={"form"}
      onSubmit={handleSubmitUser}
      flexDirection={"column"}
      alignItems={"center"}
      gap={2}
    >
      <TextField
        size="small"
        required
        sx={{
          "& .MuiFormHelperText-root": {
            color: "red",
          },
        }}
        label="Enter Name"
        variant="outlined"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError("");
        }}
      />
      <TextField
        size="small"
        required
        sx={{
          "& .MuiFormHelperText-root": {
            color: "red",
          },
        }}
        label="Enter username"
        variant="outlined"
        value={userName}
        onChange={(e) => {
          const lowercaseValue = e.target.value.toLowerCase(); // Convert input to lowercase
          setUserName(lowercaseValue);
          setError("");
        }}
        helperText={error}
      />
      <TextField
        size="small"
        type="password"
        required
        label="Enter Password"
        variant="outlined"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError("");
        }}
      />
      <Button
        fullWidth
        size="small"
        variant="contained"
        color="primary"
        onClick={handleSubmitUser}
      >
        Sign up
      </Button>
    </Grid>
  );
};

export default Signup;
