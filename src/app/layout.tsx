// import "../styles.css";
// import "leaflet/dist/leaflet.css";
// import "react-toastify/dist/ReactToastify.css";

// import type { Metadata } from "next";
// import { Outfit } from "next/font/google";
// import { ToastContainer } from "react-toastify";
// import Script from "next/script";

// const outfit = Outfit({
//   subsets: ["latin"],
//   variable: "--font-outfit",
// });

// export const metadata: Metadata = {
//   title: "Adinn Roadshows",
//   description: "Premium LED roadshow vehicle advertising campaigns.",
//   verification: {
//     google: "googlefd15b6e91eab35a8",
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={`${outfit.variable} antialiased`}>
//         <meta name="google-site-verification" content="5l6_w1IFbXbp4Kzr9B2ePstAEiWwz_WZGYdfLz8AX6w" />
//         {/* Microsoft Clarity */}
//         <Script id="clarity" strategy="afterInteractive">
//           {`
//             (function(c,l,a,r,i,t,y){
//                 c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
//                 t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
//                 y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
//             })(window, document, "clarity", "script", "qu4xyuprxg");
//           `}
//         </Script>

//         {/* Google Analytics */}
//         <Script
//           src="https://www.googletagmanager.com/gtag/js?id=G-SVL3CWLJZF"
//           strategy="afterInteractive"
//         />

//         <Script id="google-analytics" strategy="afterInteractive">
//           {`
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());
//             gtag('config', 'G-SVL3CWLJZF');
//           `}
//         </Script>
//         {/* GOOGLE TAG MANAGER  */}
//         <script>(function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
//           j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
//           'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
// })(window,document,'script','dataLayer','GTM-T2MDR4W');</script>
//         {children}

//         <ToastContainer
//           position="top-right"
//           autoClose={3000}
//           hideProgressBar
//           newestOnTop
//           closeOnClick
//           pauseOnHover
//           draggable
//         />
//       </body>
//     </html>
//   );
// }



/* eslint-disable */
// @ts-nocheck
import "../styles.css";
import "leaflet/dist/leaflet.css";
import "react-toastify/dist/ReactToastify.css";

import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const SITE_URL = "https://www.adinnroadshows.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      "Adinn Roadshows | LED Roadshow Vehicle Advertising",
    template: "%s | Adinn Roadshows",
  },

  description:
    "Premium LED roadshow vehicle advertising campaigns across South India. Plan mobile LED campaigns with GPS tracking, route planning, branding and professional execution.",

  applicationName: "Adinn Roadshows",

  keywords: [
    "roadshow advertising",
    "LED roadshow vehicle",
    "mobile LED advertising",
    "roadshow vehicle advertising",
    "LED truck advertising",
    "roadshow campaigns India",
    "roadshow advertising Chennai",
    "roadshow advertising Tamil Nadu",
    "Adinn Roadshows",
  ],

  authors: [
    {
      name: "Adinn Advertising Services",
      url: SITE_URL,
    },
  ],

  creator: "Adinn Advertising Services",
  publisher: "Adinn Advertising Services",

  /*
   * Use only the verification token shown inside the
   * content="" part of the Google Search Console meta tag.
   *
   * Do not add another manual meta tag inside <body>.
   */
  verification: {
    google:
      "5l6_w1IFbXbp4Kzr9B2ePstAEiWwz_WZGYdfLz8AX6w",
  },

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Adinn Roadshows",

    title:
      "Adinn Roadshows | LED Roadshow Vehicle Advertising",

    description:
      "High-impact LED roadshow vehicle advertising campaigns with GPS tracking, route planning and professional execution across South India.",

    images: [
      {
        url: "/images/roadshow-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Adinn Roadshows LED advertising vehicle",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Adinn Roadshows | LED Roadshow Vehicle Advertising",

    description:
      "Premium LED roadshow vehicle advertising campaigns across South India.",

    images: ["/images/roadshow-og-image.jpg"],
  },

  category: "Advertising",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/*
       * Google Tag Manager loads on every route.
       * GA4 must be configured inside this GTM container.
       */}
      <GoogleTagManager gtmId="GTM-T2MDR4W" />

      <body className={`${outfit.variable} antialiased`}>
        <meta name="google-site-verification" content="5l6_w1IFbXbp4Kzr9B2ePstAEiWwz_WZGYdfLz8AX6w" />
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a] = c[a] || function(){
                (c[a].q = c[a].q || []).push(arguments);
              };

              t = l.createElement(r);
              t.async = 1;
              t.src = "https://www.clarity.ms/tag/" + i;

              y = l.getElementsByTagName(r)[0];
              y.parentNode.insertBefore(t, y);
            })(
              window,
              document,
              "clarity",
              "script",
              "qu4xyuprxg"
            );
          `}
        </Script>

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