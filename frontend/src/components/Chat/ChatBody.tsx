import React, { forwardRef } from "react";
import { MessageTypes } from "@/globle";
import { convertTo12HourFormat } from "@/utils/convertTo12HourFormat";
import { Grid, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import useCurrentUser from "@/hooks/useCurrentUser";

const ChatBody = forwardRef<HTMLDivElement, { allMessages: MessageTypes[] }>(
  ({ allMessages }, ref) => {
    const { currentUser } = useCurrentUser();
    let lastUserName = "";

    return (
      <Grid
        ref={ref}
        width={"100%"}
        height={"65vh"}
        display={"flex"}
        overflow={"auto"}
        flexDirection={"column"}
        sx={{
          background:
            "linear-gradient(261deg, rgba(255,255,255,1) 0%, rgba(222,222,222,1) 63%)",
        }}
        p={1}
        position={"relative"}
      >
        {allMessages &&
          allMessages.map((msg: MessageTypes, index: number) => {
            const isSameUser = lastUserName === msg.currentUser.userName;
            lastUserName = msg.currentUser.userName;

            return (
              <Grid
                key={index}
                display={"flex"}
                flexDirection={"column"}
                mt={isSameUser ? 0.8 : 1.2}
                alignItems={
                  msg?.currentUser.userName === currentUser?.userName
                    ? "flex-end"
                    : "flex-start"
                }
              >
                {!isSameUser && (
                  <Typography variant="caption" mr={0} fontWeight={"bold"}>
                    {msg?.currentUser?.userName}
                  </Typography>
                )}
                <Grid
                  p={1.6}
                  pl={1}
                  pr={3}
                  pt={0}
                  minWidth={80}
                  maxWidth={"40%"}
                  borderRadius={"8px"}
                  position={"relative"}
                  sx={
                    msg?.currentUser?.userName === currentUser?.userName
                      ? {
                          wordBreak: "break-word",
                          borderTopRightRadius: "1px",
                          bgcolor: "#be8bfa85",
                        }
                      : {
                          wordBreak: "break-word",
                          borderTopLeftRadius: "1px",
                          bgcolor: "#fff",
                        }
                  }
                >
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                    sx={{ wordBreak: "break-word" }}
                  >
                    {msg.chat}
                  </Typography>

                  <Typography
                    position="absolute"
                    right={3}
                    bottom={0}
                    variant="caption"
                    fontSize={10}
                  >
                    {msg.createdAt && convertTo12HourFormat(msg.createdAt)}{" "}
                    {msg?.currentUser?.userName === currentUser?.userName && (
                      <>
                        {msg.isSeen ? (
                          <DoneAllIcon
                            sx={{
                              fontSize: 15,
                              mb: -0.3,
                              color: "blue",
                            }}
                          />
                        ) : (
                          <DoneIcon
                            sx={{
                              fontSize: 15,
                              mb: -0.4,
                            }}
                          />
                        )}
                      </>
                    )}
                  </Typography>
                </Grid>
              </Grid>
            );
          })}
      </Grid>
    );
  }
);

export default ChatBody;
