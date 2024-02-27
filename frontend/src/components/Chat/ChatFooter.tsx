import { Button, Input } from "@mui/material";
import { Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React from "react";

const ChatFooter = ({
  handleSubmit,
  message,
  handleChange,
}: {
  handleSubmit: any;
  message: string;
  handleChange: any;
}) => {
  return (
    <Grid
      component={"form"}
      onSubmit={handleSubmit}
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      width={"100%"}
    >
      <Input
        size="small"
        fullWidth
        required
        placeholder="Write a message.."
        autoFocus
        sx={{ pl: 2, bgcolor: "#fff" }}
        disableUnderline
        value={message}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ height: 40 }}
      >
        <SendIcon />
      </Button>
    </Grid>
  );
};

export default ChatFooter;
