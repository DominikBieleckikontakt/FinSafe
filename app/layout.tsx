import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components";

export const metadata: Metadata = {
  title: "FinSafe",
  description: "FinSafe is an app for managing your money with eas!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
