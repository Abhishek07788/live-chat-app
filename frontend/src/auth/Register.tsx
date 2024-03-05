"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Grid } from "@mui/material";
import Login from "@/auth/LogIn";
import Signup from "@/auth/Signup";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Grid>{children}</Grid>
        </Box>
      )}
    </Grid>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Register = () => {
  const [value, setValue] = React.useState(0);
  const { currentUser, setCurrentUser } = useCurrentUser();
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleLogOut = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser("");
    router.push("/");
  };

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "350px",
        margin: "auto",
        border: "1px solid #f3f3f9",
        borderRadius: "12px",
        boxShadow: 4,
        mt: 10,
      }}
    >
      {currentUser.userName ? (
        <Box>
          <Typography variant="h6" mt={2}>
            Log out:{" "}
            <span style={{ color: "#8256e7" }}>{currentUser.name}</span>?
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{ margin: "auto", my: 2 }}
            onClick={handleLogOut}
          >
            Logout
          </Button>
        </Box>
      ) : (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Login" {...a11yProps(0)} />
              <Tab label="Signup" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Login />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Signup />
          </CustomTabPanel>
        </>
      )}
    </Grid>
  );
};

export default Register;
