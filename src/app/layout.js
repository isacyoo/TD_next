import NavBar from '@/components/common/NavBar'
import './globals.css'
import { Inter } from 'next/font/google'
import { getSession, fetcher } from '@/util/api'
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider as NextThemesProvider } from "next-themes"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI-Powered Trespasser Detection',
  description: 'AI-Powered Trespasser Detection',
}

export default async function RootLayout({ children }) {
  const session = await getSession().then(
    (res) => {
      if (res.ok) {
        return res.json()
      } else {
        return null
      }
    }
  )

  const locations = await fetcher("/locations").then(
    (res) => {
      if (res.ok) {
        return res.json()
      } else {
        return []
      }
    }
  )

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextThemesProvider attribute="class">
          <NavBar session={session} locations={locations}/>
          <main className="flex max-h-screen flex-col items-center justify-between">
            {children}
          </main>
          <Toaster position="top-center" closeButton={true} duration={3000}/>
        </NextThemesProvider>
      </body>
    </html>
  )
}