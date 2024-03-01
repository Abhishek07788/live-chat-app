import type { Metadata } from "next";
require('dotenv').config()

export const metadata: Metadata = {
  title: "Carbon | Pdf",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <body style={{ padding: 0, margin: 0 }}>{children}</body>
    </html>
  );
}