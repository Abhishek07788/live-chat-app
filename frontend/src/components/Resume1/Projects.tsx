import { Details } from "@/types/dataType";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";

const Projects = ({ details }: { details: Details }) => {
  return (
    <Grid>
      <Typography
        textTransform={"uppercase"}
        fontWeight={"bold"}
        color={details.color}
      >
        Projects
      </Typography>
      <Divider sx={{ width: 90, bgcolor: details.color, height: "1px" }} />
      {details.projects.map((el, index) => (
        <Stack key={index} mt={1}>
          <Typography variant="h5">{el.title}</Typography>
          <Typography mt={-0.5} fontWeight={"bold"}>
            {el.year}
          </Typography>
          <Typography mt={-0.5}>{el.description}</Typography>
        </Stack>
      ))}
    </Grid>
  );
};

export default Projects;
