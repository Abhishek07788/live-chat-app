import { Details } from "@/types/dataType";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import React from "react";

const Achievements = ({ details }: { details: Details }) => {
  return (
    <Grid>
      <Typography
        textTransform={"uppercase"}
        fontWeight={"bold"}
        color={details.color}
      >
        Achievements
      </Typography>
      <Divider sx={{ width: 100, bgcolor: details.color, height: "1px" }} />
      <Stack
        flexWrap={"wrap"}
        direction={"row"}
        alignItems={"center"}
        flexDirection={"row"}
      >
        {details.achievements.map((el, index) => (
          <Stack direction={"row"} alignItems={"center"} flexDirection={"row"}>
            <Typography mr={0.5} contentEditable key={index} mt={1}>
              {el}
            </Typography>
            {details.achievements.length !== index + 1 && (
              <FiberManualRecordIcon
                sx={{ color: "gray", fontSize: 8, mt: 1, mr: 0.5 }}
              />
            )}
          </Stack>
        ))}
      </Stack>
    </Grid>
  );
};

export default Achievements;
