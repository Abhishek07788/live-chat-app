"use client";
import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";

export default function ProgressBar() {
  const [progress, setProgress] = React.useState(60);

  React.useEffect(() => {
    const timer1 = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 1
      );
    }, progress / 2);
    return () => {
      setProgress(100);
      clearInterval(timer1);
    };
  }, [progress]);

  return (
    <LinearProgress
      sx={{ height: 3 }}
      variant="determinate"
      color="error"
      value={progress}
    />
  );
}
