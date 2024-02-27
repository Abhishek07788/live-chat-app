import { Details } from "@/types/dataType";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";

const Education = ({ details }: { details: Details }) => {
  return (
    <Grid>
      <Typography
        textTransform={"uppercase"}
        fontWeight={"bold"}
        color={details.color}
      >
        EDUCATION
      </Typography>
      <Divider sx={{ width: 100, bgcolor: details.color, height: "1px" }} />
      {details.education.map((el, index) => (
        <Stack key={index} mt={1.4}>
          <Typography variant="h5">{el.college}</Typography>
          <Typography mt={-0.5}>{el.edu}</Typography>
          <Typography mt={-0.5} fontWeight={"bold"}>
            {el.year}
          </Typography>
        </Stack>
      ))}
    </Grid>
  );
};

export default Education;
