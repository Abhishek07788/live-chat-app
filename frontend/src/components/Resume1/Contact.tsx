import { Details } from "@/types/dataType";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";

const Contact = ({ details }: { details: Details }) => {
  return (
    <Grid>
      <Typography
        textTransform={"uppercase"}
        fontWeight={"bold"}
        color={details.color}
      >
        CONTACT ME
      </Typography>
      <Divider sx={{ width: 110, bgcolor: details.color, height: "1px" }} />
      {details.contact.map((el, index) => (
        <Stack
          onClick={() => window.open(el.link || "#", "_blank")}
          sx={{ cursor: "pointer" }}
          alignItems={"center"}
          key={index}
          flexDirection={"row"}
          mt={1.4}
        >
          {el.icon}
          <Typography ml={1}>{el.name}</Typography>
        </Stack>
      ))}
    </Grid>
  );
};

export default Contact;
