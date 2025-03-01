import NavBar from '@/components/common/NavBar'
import './globals.css'
import { Inter } from 'next/font/google'
import { getSession } from '@/util/api'
import { Toaster } from "@/components/ui/sonner"

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
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar session={session}/>
        <main className="flex max-h-screen flex-col items-center justify-between">
          {children}
        </main>
        <Toaster position="top-center" closeButton={true} duration={10000}/>
      </body>
    </html>
  )
}