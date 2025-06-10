import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PopupProvider } from "@/context/popup-context"
import PopupForm from "@/components/popup-form"
import WhatsAppButton from "@/components/whatsapp-button"
import ScrollIndicator from "@/components/scroll-indicator"
import ScrollToTopButton from "@/components/scroll-to-top-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mol Digital - Создание быстрых и масштабируемых сайтов",
  description:
    "Агентство Mol Digital создаёт продающие сайты с усиленной защитой от взлома и высокой конверсией в продажу",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <ScrollIndicator />
        <PopupProvider>
          {children}
          <PopupForm />
          <WhatsAppButton />
          <ScrollToTopButton />
        </PopupProvider>
      </body>
    </html>
  )
}
