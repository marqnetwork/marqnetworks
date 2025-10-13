
export const metadata = {
  title: "QR Code Scanner Service | AI-Powered Scanning Solutions | MarQ Networks",
  description: "Professional QR Code Scanner service by MarQ Networks. Fast, accurate, and secure QR code scanning solutions for businesses. Scan, decode, and manage QR codes efficiently.",
  alternates: {
    canonical: "/qr-code-scanner",
  },
};

// import QRScannerContent from "@/components/QRScannerContent/QRScannerContent";
import dynamic from "next/dynamic";
const QRScannerContent = dynamic(() => import('@/components/QRScannerContent/QRScannerContent'));

export default function QRScannerPage() {
  return <QRScannerContent />;
}