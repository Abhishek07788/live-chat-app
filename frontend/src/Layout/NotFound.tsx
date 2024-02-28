import assetPaths from "@/constants/assetPaths";
import { Grid, Typography } from "@mui/material";
import React from "react";

const NotFound = ({ title }: { title?: string }) => {
  return (
    <Grid
      display={"grid"}
      justifyContent={"center"}
      height={"100%"}
      width="100%"
      alignItems={"center"}
      mt={4}
    >
      <Typography variant="h4" textAlign={"center"}>
        {title || "Not Found"}
      </Typography>
      <img
        src={assetPaths.defaultImage.notFound}
        alt="not found"
        height={"100%"}
        width={"100%"}
      />
    </Grid>
  );
};

export default NotFound;
