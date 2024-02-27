"use client";
import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { Details } from "@/types/dataType";
import Contact from "./Contact";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import Education from "./Education";
import Skills from "./Skills";
import Languages from "./Languages";
import ProfessionalSummary from "./ProfessionalSummary";
import Experiences from "./Experiences";
import Projects from "./Projects";
import Achievements from "./Achievements";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Resume = ({
  setHide,
  hide,
}: {
  setHide: (hide: boolean) => void;
  hide: boolean;
}) => {
  const pdfRef = useRef<HTMLDivElement | null>(null); // Specify the type for useRef
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("lg"));
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    // Set initial dimensions
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDownload = () => {
    const input = pdfRef.current;

    if (input) {
      const pdfWidth = isPhone ? windowWidth : windowWidth / 1.7; // Set the desired width in pixels
      const pdfHeight = isPhone ? 1120 : 1050; // Set the desired height in pixels

      html2canvas(input, { scale: pdfWidth / input.offsetWidth }).then(
        (canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "px", [pdfWidth, pdfHeight], true);
          const imgWidth = pdfWidth;
          const imgHeight = (canvas.height * pdfWidth) / canvas.width;
          const imgX = 0;
          const imgY = 0;

          pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth, imgHeight);
          pdf.save("Resume.pdf");
        }
      );
    }
  };

  const details: Details = {
    fullName: "Narendra Modi",
    title: "Prime Minister of India",
    contact: [
      {
        type: "address",
        name: "7, Lok Kalyan Marg, Delhi",
        link: "https://www.google.com/maps/place/7, Lok Kalyan Marg, Delhi",
        icon: <PlaceIcon sx={{ color: "#00000095" }} />,
      },
      {
        type: "number",
        name: "+919735362244",
        link: "tel:+919735362244",
        icon: <PhoneIcon sx={{ color: "#00000095" }} />,
      },
      {
        type: "email",
        name: "narendramodi@email.com",
        link: "mailto:narendramodi@email.com",
        icon: <EmailIcon sx={{ color: "#00000095" }} />,
      },
      {
        type: "linkedin",
        name: "linkedin.com/in/narendramodi",
        link: "https://www.linkedin.com/in/narendramodi",
        icon: <LinkedInIcon sx={{ color: "#00000095" }} />,
      },
      {
        type: "twitter",
        name: "@narendramodi",
        link: "https://twitter.com/narendramodi",
        icon: <XIcon sx={{ color: "#00000095" }} />,
      },
    ],
    education: [
      {
        college: "University of Delhi",
        edu: "Bachelor of Arts, Political Science",
        year: "1973 - 1976",
      },
      {
        college: "University of Delhi",
        edu: "Bachelor of Arts, Political Science",
        year: "1973 - 1976",
      },
    ],
    skills: [
      "Leadership and Strategic Vision",
      "Economic and Fiscal Policy",
      "Diplomacy and International Relations",
      "Crisis Management",
      "Public Speaking and Communication",
    ],
    image: "https://i.ibb.co/tKWtGw3/Screenshot-from-2024-01-24-13-21-45.png",
    color: "#4f66c9",
    nameColor: "#ffff",
    backgroundColor: "#ffff",
    titleColor: "#ffff",
    summary:
      "Visionary leader with a strong focus on economic development, diplomacy, and effective governance. Proven track record in crisis management and a compelling communicator with a deep commitment to public service.",
    experience: [
      {
        position: "Chief Minister of Gujarat",
        organization: "Government of Gujarat",
        year: "2001 - 2014",
      },
      {
        position: "Member of Parliament",
        organization: "Bharatiya Janata Party",
        year: "2014 - Present",
      },
    ],
    projects: [
      {
        title: "Swachh Bharat Abhiyan",
        description:
          "Initiated and championed the Swachh Bharat Abhiyan, a nationwide cleanliness campaign, promoting sanitation and hygiene across the country.",
        year: "2014 - Present",
      },
      {
        title: "Goods and Services Tax (GST) Implementation",
        description:
          "Led the successful implementation of the GST, a landmark tax reform in India, streamlining the taxation system and fostering economic growth.",
        year: "2017",
      },
    ],
    achievements: ["Padma Bhushan (2019)", "Time 100 list (2020)"],
    languages: ["Hindi", "Gujarati", "English"],
  };

  return (
    <>
      <Stack
        flexDirection={"row"}
        sx={{ position: "fixed", right: 10, top: 10 }}
      >
        <Button
          onClick={() => setHide(!hide)}
          variant="contained"
          color="primary"
        >
          {hide ? "Show Nav" : "Hide Nav"}
        </Button>
        <Button
          onClick={handleDownload}
          variant="contained"
          color="primary"
          sx={{ ml: 2 }}
        >
          Download Pdf
        </Button>
      </Stack>
      <Grid
        ref={pdfRef}
        mt={4}
        width={isPhone ? windowWidth : windowWidth / 1.7}
        minHeight={"1050px"}
        margin={"auto"}
        border={"1px solid gray"}
      >
        <Header details={details} />

        <Grid
          container
          alignItems={"flex-start"}
          p={4}
          bgcolor={details.backgroundColor}
        >
          <Grid item xs={5} lg={5} display={"grid"} gap={4}>
            <Contact details={details} />
            <Education details={details} />
            <Skills details={details} />
            <Languages details={details} />
          </Grid>
          <Divider
            sx={{ bgcolor: details.color, width: 3 }}
            orientation="vertical"
            flexItem
          />
          <Grid ml={3} item xs={6} lg={6} display={"grid"} gap={3}>
            <ProfessionalSummary details={details} />
            <Experiences details={details} />
            <Projects details={details} />
            <Achievements details={details} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Resume;
