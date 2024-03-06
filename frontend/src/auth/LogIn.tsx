import LoadingButton from "@/components/common/LoadingButton";
import { useConfig } from "@/config/Config";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Grid, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const { API } = useConfig();
  const { setCurrentUser } = useCurrentUser();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmitUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(false);
    try {
      const { data } = await axios.post(`${API}/users/login`, {
        userName,
        password,
      });
      if (data.status) {
        router.push("/chat", { scroll: false });
        setCurrentUser(data.user);
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        setUserName("");
        setPassword("");
        setError("");
        setLoading(false);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setLoading(false);
      setError("Server Error!");
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
      <LoadingButton
        loading={loading}
        fullWidth
        color="primary"
        type={"submit"}
        onClick={handleSubmitUser}
      >
        Login
      </LoadingButton>
    </Grid>
  );
};

export default Login;
