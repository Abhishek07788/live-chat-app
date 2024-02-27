import { Details } from "@/types/dataType";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";

const Skills = ({ details }: { details: Details }) => {
  return (
    <Grid>
      <Typography
        textTransform={"uppercase"}
        fontWeight={"bold"}
        color={details.color}
      >
        SKILLS
      </Typography>
      <Divider sx={{ width: 60, bgcolor: details.color, height: "1px" }} />
      {details.skills.map((el, index) => (
        <Stack alignItems={"center"} key={index} flexDirection={"row"} mt={1}>
          <Typography>{el}</Typography>
        </Stack>
      ))}
    </Grid>
  );
};

export default Skills;
