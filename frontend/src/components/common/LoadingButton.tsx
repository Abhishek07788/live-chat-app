import { Color } from "@mui/material";
import { Button, CircularProgress } from "@mui/material";
import React, { ReactNode } from "react";

const LoadingButton = ({
  children,
  loading,
  onClick,
  color,
  fullWidth,
  variant,
  type,
  sx,
}: {
  fullWidth?: boolean;
  children: ReactNode;
  loading?: boolean;
  onClick?: Function;
  type?: "submit" | "reset" | "button";
  variant?: "contained" | "text" | "outlined";
  color?: Color | any;
  sx?: React.CSSProperties;
}) => {
  return (
    <Button
      fullWidth={fullWidth}
      sx={sx}
      size="small"
      type={type}
      variant={variant || "contained"}
      color={color || "primary"}
      disabled={loading}
      onClick={() => onClick && onClick()}
      endIcon={
        loading && (
          <CircularProgress color="inherit" size={14} sx={{ p: 0.4 }} />
        )
      }
    >
      {!loading && children}
    </Button>
  );
};

export default LoadingButton;
