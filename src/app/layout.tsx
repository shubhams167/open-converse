import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import logo from "./public/logo.png";

const prompt = Prompt({ weight: ["100", "300"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OpenConverse",
  description: "Open source generative AI chat application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appName = process.env.npm_package_name || "open-converse";
  const appVersion = process.env.npm_package_version || "local";

  return (
    <html lang="en">
      <body className={`h-screen flex flex-col ${prompt.className}`}>
        <header className="flex gap-2 px-12 py-6">
          <Image src={logo} alt="logo" aria-hidden="true" height={36} />
          <h1 className="text-3xl font-bold tracking-wider">OpenConverse</h1>
        </header>
        <main className="flex flex-grow h-1/2">{children}</main>
        <footer className="px-12 py-6 text-center">
          <span className="font-extrabold">{appName}</span>{" "}
          <span className="font-extralight">{appVersion}</span>
        </footer>
      </body>
    </html>
  );
}
