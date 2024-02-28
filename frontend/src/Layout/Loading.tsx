import { Grid } from "@mui/material";
import React from "react";
import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Grid
      display={"grid"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"60vw"}
      height={"60vh"}
      margin={"auto"}
    >
      <CircularProgress />
    </Grid>
  );
};

export default Loading;
