import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RainbowProviders } from "../providers/rainbowproviders";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "PledgePost",
  description: "Quadratic Funding Media Platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RainbowProviders>
          <ToastContainer newestOnTop />
          <Header />
          {children}
        </RainbowProviders>
      </body>
    </html>
  );
}
