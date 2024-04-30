"use client";
import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Layout from "@/Layout";
import { Button, Grid, Typography } from "@mui/material";
import ScrollProgress from "@/components/ScrollProgress/ScrollProgress";

interface FormProps {}

const Form: React.FC<FormProps> = () => {
  const [editorContent, setEditorContent] = useState<string>("");
  const [submittedContent, setSubmittedContent] = useState<string>("");

  const handleEditorChange = (content: string, editor: any) => {
    setEditorContent(content);
  };

  const handleSubmission = () => {
    setSubmittedContent(editorContent);
  };

  return (
    <ScrollProgress />
    // <Layout>
    //   <Grid minHeight={400}>
    //     <Button
    //       sx={{ float: "right" }}
    //       variant="contained"
    //       onClick={handleSubmission}
    //     >
    //       Submit
    //     </Button>
    //     <Editor
    //       apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
    //       init={{
    //         height: 400,
    //         menubar: false,
    //         plugins: [
    //           "advlist",
    //           "autolink",
    //           "lists",
    //           "link",
    //           "image", // Add the image plugin
    //           "charmap",
    //           "preview",
    //           "anchor",
    //           "searchreplace",
    //           "visualblocks",
    //           "code",
    //           "fullscreen",
    //           "insertdatetime",
    //           "media",
    //           "table",
    //           "code",
    //           "help",
    //           "wordcount",
    //         ],
    //         toolbar:
    //           "undo redo | blocks | " +
    //           "bold italic forecolor | alignleft aligncenter " +
    //           "alignright alignjustify | bullist numlist outdent indent | " +
    //           "removeformat | help",
    //         file_picker_types: "image",
    //         content_style:
    //           "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
    //       }}
    //       onEditorChange={handleEditorChange}
    //     />
    //   </Grid>

    //   {/* Render the editor content */}
    //   <Grid mt={2} width={"60%"} margin={"auto"}>
    //     <Typography variant="h5">Rendered Content:</Typography>
    //     <Grid dangerouslySetInnerHTML={{ __html: submittedContent }} />
    //   </Grid>
    // </Layout>
  );
};

export default Form;
