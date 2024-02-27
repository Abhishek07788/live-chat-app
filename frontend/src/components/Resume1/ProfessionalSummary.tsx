import { Details } from "@/types/dataType";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";

const ProfessionalSummary = ({ details }: { details: Details }) => {
  return (
    <Grid>
      <Typography
        textTransform={"uppercase"}
        fontWeight={"bold"}
        color={details.color}
      >
        Professional Summary
      </Typography>
      <Divider sx={{ width: 215, bgcolor: details.color, height: "1px" }} />
      <Typography sx={{ wordBreak: "break-word" }}>
        {details.summary}
      </Typography>
    </Grid>
  );
};

export default ProfessionalSummary;
