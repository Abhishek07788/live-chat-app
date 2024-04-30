"use client";
import React from "react";
import { Button, Stack, Grid } from "@mui/material";
import Image from "next/image";
import assetPaths from "../constants/assetPaths";
import { PATHS } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import styles from "../constants/styles";
import useCurrentUser from "@/hooks/useCurrentUser";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser } = useCurrentUser();

  const LINKS = [
    {
      name: currentUser.userName
        ? "Hii:" + " " + currentUser.userName
        : "Login/Signup",
      path: PATHS.root,
    },
    {
      name: "Chat",
      path: PATHS.chat,
    },
    {
      name: "Pdf Render",
      path: PATHS.pdf,
    },
    {
      name: "Document",
      path: PATHS.document,
    },
    {
      name: "ScrollProgress",
      path: PATHS.form,
    },
  ];

  return (
    <Grid borderBottom={"1px solid #a3a3a380"} p={2} container>
      <Grid lg={4} item>
        <Image
          src={assetPaths.defaultImage.logo}
          width={100}
          height={50}
          alt="logo"
        />
      </Grid>
      <Grid lg={5} item>
        <Stack spacing={1} direction={"row"} justifyContent="center">
          {LINKS.map((link) => (
            <Button
              key={link.path}
              variant={pathname === link.path ? "contained" : "outlined"}
              color={pathname === link.path ? "secondary" : "inherit"}
              onClick={() => router.push(link.path)}
              sx={{
                width: 145,
                boxShadow: styles.boxShadows.shadow3,
                fontWeight: "600",
                bgcolor: pathname === link.path ? "#0C301F" : "#fff",
                "&:hover": {
                  bgcolor: pathname === link.path ? "#0C301F" : "#fff",
                },
              }}
            >
              {link.name}
            </Button>
          ))}
        </Stack>
      </Grid>
      <Grid lg={3} item></Grid>
    </Grid>
  );
};

export default Navbar;
