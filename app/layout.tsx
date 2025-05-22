"use client";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar"
import Footer from "@/components/Footer/Footer"
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
    
            <Navbar />
            
          

            {children}
            <Footer/>
          
      </body>
    </html>
  );
}
