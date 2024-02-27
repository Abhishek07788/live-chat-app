import { Details } from "@/types/dataType";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const Header = ({ details }: { details: Details }) => {
  return (
    <>
      <Grid
        bgcolor={details.color}
        display={"flex"}
        justifyContent={"right"}
        alignItems={"center"}
        height={120}
      >
        <Box width={"60%"} height={80}>
          <Typography
            fontWeight={"bold"}
            variant="h3"
            color={details.nameColor}
          >
            {details.fullName}
          </Typography>
          <Typography fontSize={18} mt={-1} color={details.titleColor}>
            {details.title}
          </Typography>
        </Box>
      </Grid>
      <Box
        border={"1px solid black"}
        height={140}
        width={140}
        borderRadius={"50%"}
        mt={-10}
        ml={4}
        bgcolor={"#fff"}
        overflow={"hidden"}
      >
        <Image
          src={details.image || ""}
          alt="Profile"
          width={140}
          height={140}
        />
      </Box>
    </>
  );
};

export default Header;
