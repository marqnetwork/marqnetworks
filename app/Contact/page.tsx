export const metadata = {
  title: "Contact Us | MarQ Networks",
  description: "Have a question or want to collaborate? Reach out to MarQ Networks and connect with our strategy, design, and engineering teams.",
  alternates: {
    canonical: "/Contact",
  },
};

import dynamic from "next/dynamic";
const Contact = dynamic(() => import('./ContactContent'));

export default function ContactPage() {
  return <Contact />;
}
