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
  description: "Marq Network is your strategic partner for digital transformation, branding, automation, and growth. We help ambitious brands scale smarter.",
  icons: {
    icon: "/images/favicon.png",
  },
  metadataBase: new URL("https://www.marqnetworks.com"),
  alternates: {
    canonical: "/",
  },
   other: {
    "google-site-verification": "aoRQn68XYkFeXk4wMJt8_h2D-8j5csxQs9YosL1UkTI",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html  lang="en" className={dmSans.variable}>
        {/* <Head>
      
        <link rel="canonical" href="https://www.marqnetworks.com/" />

        
        <meta name="description" content="Marq Network is your strategic partner for digital transformation, branding, automation, and growth. We help ambitious brands scale smarter." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head> */}
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
