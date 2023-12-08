import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
