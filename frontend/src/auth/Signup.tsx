"use client";
import LoadingButton from "@/components/common/LoadingButton";
import { useConfig } from "@/config/useConfig";
import { UsersTypes } from "@/globle";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Grid, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Signup = () => {
  const { API } = useConfig();
  const { setCurrentUser } = useCurrentUser();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmitUser = async (e: React.FormEvent) => {
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

    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post(`${API}/users/signup`, user);
      if (data.status) {
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        setCurrentUser(data.user);
        router.push("/chat", { scroll: false });
        setName("");
        setPassword("");
        setUserName("");
        setLoading(false);
      } else {
        setLoading(false);
        setError(data.message);
      }
    } catch (error) {
      setLoading(false);
      setError("Server Error!");
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
      <LoadingButton
        loading={loading}
        fullWidth
        color="primary"
        type={"submit"}
        onClick={handleSubmitUser}
      >
        Sign up
      </LoadingButton>
    </Grid>
  );
};

export default Signup;
