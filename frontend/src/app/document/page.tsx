"use client";
import Layout from "@/Layout";
import React, { useState } from "react";
import Resume from "@/components/Resume1/Resume";

const Document = () => {
  const [hide, setHide] = useState(false);

  return (
    <Layout hideNav={hide}>
      <Resume setHide={setHide} hide={hide} />
    </Layout>
  );
};

export default Document;
