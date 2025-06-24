// "use client";

import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import CursorFollower from "@/components/CursorFollower/CursorFollower"
// import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import { DM_Sans } from "next/font/google";
import Head from "next/head";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Customize weights as needed
  variable: "--font-dm-sans",    // Use as a CSS variable
  display: "swap",
});



export const metadata = {
  title: "Marq Network",
  description: "Welcome to Marq Network",
  icons: {
    icon: "/images/favicon.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html  lang="en" className={dmSans.variable}>
        <Head>
        {/* ✅ Canonical Tag */}
        <link rel="canonical" href="https://www.marqnetworks.com/" />

        {/* ✅ Enhanced Meta Tags */}
        <meta name="description" content="Marq Network is your strategic partner for digital transformation, branding, automation, and growth. We help ambitious brands scale smarter." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body >
              {/* <SmoothScroll> */}
         <CursorFollower />
        <Navbar />
        {children}
        <Footer />
        {/* </SmoothScroll> */}
      </body>
    </html>
  );
}
