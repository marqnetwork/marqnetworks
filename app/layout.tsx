// "use client";

import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import CursorFollower from "@/components/CursorFollower/CursorFollower"

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
    <html lang="en">
      <body >
         <CursorFollower />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
