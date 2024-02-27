"use client";
import { AppBarProps, Box } from "@mui/material";
import React, { ReactNode } from "react";
import { ThemeProvider, styled } from "@mui/material/styles";
import Navbar from "./Navbar";
import ProgressBar from "./ProgressBar";
import { useChatTheme } from "@/theme";

const RootStyle = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  width: "100%",
  minHeight: "96vh",
  maxWidth: "1700px",
  margin: "auto",
}));

type LayoutProps = AppBarProps & {
  children?: ReactNode;
  hideOnScroll?: boolean;
  hideNav?: boolean;
  showProgress?: boolean;
};

const Layout = ({
  children,
  hideNav = false,
  hideOnScroll = false,
  showProgress,
}: LayoutProps): JSX.Element | null => {
  return (
    <ThemeProvider theme={useChatTheme()}>
      <RootStyle>
        <Box height={3}>{showProgress && <ProgressBar />}</Box>
        {!hideNav && <Navbar />}
        <MainStyle>{children}</MainStyle>
      </RootStyle>
    </ThemeProvider>
  );
};

export default Layout;
