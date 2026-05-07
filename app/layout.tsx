import './globals.css'
import Sidebar from '@/components/Sidebar'
import 'remixicon/fonts/remixicon.css'

export const metadata = {
  title: 'CyberSec Docs',
  description: 'Cybersecurity documentation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cyber-bg flex">
        <Sidebar />

        <main className="flex-1 ml-0 md:ml-[280px] min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}