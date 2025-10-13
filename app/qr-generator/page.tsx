export const metadata = {
  title: "QR Code Generator Service | Create Custom QR Codes | MarQ Networks",
  description: "Professional QR Code Generator service by MarQ Networks. Create custom QR codes for your business, products, or personal use. Fast, secure, and customizable QR code solutions.",
  alternates: {
    canonical: "/qr-generator",
  },
};

// import QRGeneratorContent from "@/components/QRGeneratorContent/QRGeneratorContent";
import dynamic from "next/dynamic";
const QRGeneratorContent = dynamic(() => import('@/components/QRGeneratorContent/QRGeneratorContent'));

export default function QRGeneratorPage() {
  return <QRGeneratorContent />;
}