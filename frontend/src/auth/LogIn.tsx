"use client";
import { UsersTypes } from "@/globle";
import { useAllUsers } from "@/hooks/useAllUsers";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Button, Grid, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const { allUsers } = useAllUsers();
  const { setCurrentUser } = useCurrentUser();
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmitUser = (e: React.FormEvent) => {
    e.preventDefault();
    const existingUser = allUsers.filter(
      (existingUser: UsersTypes) =>
        existingUser.userName?.toLowerCase() === userName.toLowerCase() &&
        existingUser.password === password
    );
    if (existingUser.length >= 1) {
      router.push("/chat", { scroll: false });
      setCurrentUser(existingUser[0]);
      localStorage.setItem("currentUser", JSON.stringify(existingUser[0]));
      setUserName("");
      setPassword("");
    } else {
      setError("Wrong Credential!");
    }
  };

  return (
    <Grid
      mt={2}
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
        Login
      </Button>
    </Grid>
  );
};

export default Login;
