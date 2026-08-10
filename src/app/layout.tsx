import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Nuref | Cathodic Protection Reference Electrodes",
  description:
    "Nuref manufactures and supplies Ag/AgCl, Cu/CuSO4, Zinc, and MMO/Ti reference electrodes and corrosion monitoring solutions for cathodic protection of critical infrastructure.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-white text-black">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <Toaster position="top-center" richColors theme="light" />
      </body>
    </html>
  );
}
