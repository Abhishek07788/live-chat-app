"use client";
import { Button, Grid, LinearProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [scrolled, setScrolled] = useState(0);
  const router = useRouter();

  const STRING =
    "SCROLL DOWN Amidst the azure expanse, Lies a solitary vessel, Guided by stars' embrace, Seeking distant shores, Whispers of adventure, In ocean's eternal dance, Boundless horizons beckon. THE END";
  const scrollProgress = () => {
    const scrollPx = document.documentElement.scrollTop;
    const winHeightPx =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (scrollPx / winHeightPx) * 100;
    setScrolled(scrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollProgress);
    return () => {
      window.removeEventListener("scroll", scrollProgress);
    };
  }, []);

  return (
    <Grid textAlign={"center"}>
      <LinearProgress
        sx={{ position: "fixed", top: 0, width: "100%", height: 8 }}
        variant="determinate"
        value={scrolled}
      />

      <Button
        onClick={() => router.back()}
        variant="outlined"
        size="small"
        sx={{ position: "fixed", left: 10, top: 20 }}
      >
        Go Back
      </Button>
      <Grid mt={2}>
        {STRING.split(" ").map((line, i) => (
          <Typography fontWeight={400} mt={1} variant="h1" key={i}>
            {line}
          </Typography>
        ))}
      </Grid>
    </Grid>
  );
};

export default ScrollProgress;
