import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import Footer from "@/components/ui/Footer"
import Navbar from "@/components/ui/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Citizen Complaint Portal",
  description: "E-Governance Citizen Complaint System",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Navbar/>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
      <Footer/>
    </html>
  )
}
