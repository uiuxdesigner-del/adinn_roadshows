import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../styles.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ADINN Roadshow",
  description: "Premium LED roadshow vehicle advertising campaigns.",
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
          rel="icon"
          href="/assets/icon.svg?v=10"
          type="image/svg+xml"
          sizes="any"
        />
        <link rel="shortcut icon" href="/assets/icon.svg?v=10" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
      </head>
      <body className={outfit.variable}>{children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="dark"
        />
      </body>
    </html>
  );
}