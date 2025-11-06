"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection";
import PillarsSection from "./components/PillarsSection";
import ServicesCards from "./components/ServicesCards";
import svgPaths from "../../svg-7ndmzqf2y9";
// Replace missing SVG and Figma asset imports with inline constants/local assets
const PATH_DASHED = "M3 18H140";
const PATH_CURVE = "M50 10C40 60 40 120 50 170";
import { imgOverlayBlur, imgOverlayBlur1, imgOverlayBlur2, imgOverlayBlur3, imgOverlayBlur4, imgOverlayBlur5, imgOverlayBlur6, imgOverlayBlur7 } from "../../imports/svg-ufhts";

export default function PillarPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full max-w-[1200px] m-auto" style={{margin:"auto"}}>


      <HeroSection />

      {/* Services Cards (responsive, no absolute positioning) */}
      <PillarsSection />
      <ServicesCards />




    </div>

  );
}
