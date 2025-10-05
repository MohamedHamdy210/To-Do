import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter =Inter({
  variable: "--font-inter",
  subsets:['latin']
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Smart To-Do & Productivity App",
  description:
    "To-Do is a sleek and powerful to-do app built with Next.js and Firebase. Manage your tasks efficiently with real-time sync, intuitive design, and seamless animations — stay productive and organized effortlessly.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}
      >
        <AuthProvider>

        <div className="h-screen flex bg-[#F5F5F5]">
          
            {children}
        </div>
        </AuthProvider>
      </body>
    </html>
  );
}
