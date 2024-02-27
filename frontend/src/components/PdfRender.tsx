"use client";
import React, { useState } from "react";
import {
  Stack,
  Grid,
  Typography,
  Box,
  Tooltip,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function PdfRender() {
  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("lg"));

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <Grid
      width={"100vh"}
      height={"100vh"}
      margin={"auto"}
      bgcolor={"#272936"}
      minHeight={"100vh"}
    >
      <Typography color={"#fff"} textAlign={"center"} variant="h5">
        Pdf Viewer
      </Typography>
      <Stack
        width={"40vh"}
        mt={4}
        border={"2px solid teal"}
        margin={"auto"}
        position={"relative"}
        display={"flex"}
        justifyContent="center"
        alignItems="center"
        minHeight={isPhone ? 400 : 560}
        bgcolor={"#272936"}
      >
        <Tooltip title="Click! to View on Full Screen.">
          <Grid
            onClick={() =>
              window.open(
                "https://digited.s3.ap-south-1.amazonaws.com/public/quiz/f64087d6-8941-489c-aedb-dd9c46a54975" ||
                  "#",
                "_blank"
              )
            }
            sx={{ cursor: "pointer" }}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Document
              error={
                <Typography textAlign={"center"} color={"red"}>
                  Failed to load PDF file.
                </Typography>
              }
              loading={
                <Box p={4} bgcolor={"gray"}>
                  <CircularProgress /> <Typography>loading page..</Typography>
                </Box>
              }
              file={
                "https://digited.s3.ap-south-1.amazonaws.com/public/quiz/f64087d6-8941-489c-aedb-dd9c46a54975"
              }
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page
                renderTextLayer={false}
                renderAnnotationLayer={false}
                height={isPhone ? 400 : 560}
                pageNumber={pageNumber}
                loading={
                  <Box p={4} bgcolor={"gray"}>
                    <CircularProgress /> <Typography>loading page..</Typography>
                  </Box>
                }
              />
            </Document>
          </Grid>
        </Tooltip>
        {numPages > 1 && (
          <Grid width={"100%"}>
            <Grid
              container
              justifyContent="space-between"
              position={"absolute"}
              top={0}
              right={6}
              bgcolor={"#fff"}
              borderRadius={"4px"}
              border={"1px solid #e5e7eb"}
              width={numPages > 9 ? 55 : numPages > 99 ? 100 : 38}
              boxShadow={3}
              zIndex={2}
              pl={0.8}
            >
              <Typography fontWeight={"bold"}>
                {pageNumber}/{numPages}
              </Typography>
            </Grid>
            <Grid
              display={"flex"}
              justifyContent="space-between"
              position={"absolute"}
              width={"100%"}
              top={"50%"}
              bottom={"50%"}
              zIndex={2}
            >
              <ArrowBackIosIcon
                onClick={() =>
                  setPageNumber(pageNumber <= 1 ? 1 : pageNumber - 1)
                }
                sx={{
                  visibility: pageNumber === 1 ? "hidden" : "visible",
                  ...arrowStyle,
                }}
              />

              <ArrowForwardIosIcon
                onClick={() =>
                  setPageNumber(
                    pageNumber >= numPages ? numPages : pageNumber + 1
                  )
                }
                sx={{
                  visibility: pageNumber === numPages ? "hidden" : "visible",
                  ...arrowStyle,
                }}
              />
            </Grid>
          </Grid>
        )}
      </Stack>
    </Grid>
  );
}

const arrowStyle = {
  cursor: "pointer",
  fontSize: { xs: 24, lg: 40 },
  color: "blue",
  pl: { xs: 0.6, lg: 1 },
  borderRadius: "4px",
  bgcolor: "#f9fafb20",
  "&:hover": {
    bgcolor: "#f9fafb75",
  },
};
