// "use client";

import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import CursorFollower from "@/components/CursorFollower/CursorFollower"
// import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import { DM_Sans } from "next/font/google";

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
