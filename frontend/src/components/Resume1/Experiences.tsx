import { Details } from "@/types/dataType";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";

const Experiences = ({ details }: { details: Details }) => {
  return (
    <Grid>
      <Typography
        textTransform={"uppercase"}
        fontWeight={"bold"}
        color={details.color}
      >
        Experiences
      </Typography>
      <Divider sx={{ width: 120, bgcolor: details.color, height: "1px" }} />
      {details.experience.map((el, index) => (
        <Stack key={index} mt={1}>
          <Typography variant="h5">{el.position}</Typography>
          <Typography mt={-0.5}>{el.organization}</Typography>
          <Typography mt={-0.5} fontWeight={"bold"}>
            {el.year}
          </Typography>
        </Stack>
      ))}
    </Grid>
  );
};

export default Experiences;
