import "../styles.css";
import "leaflet/dist/leaflet.css";
import "react-toastify/dist/ReactToastify.css";

import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ToastContainer } from "react-toastify";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "ADINN Roadshows",
  description: "ADINN Roadshow Campaigns",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        {children}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
        />
      </body>
    </html>
  );
}