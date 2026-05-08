import './globals.css'
import Sidebar from '@/components/Sidebar'
import Dock from '@/components/Dock'
import 'remixicon/fonts/remixicon.css'

export const metadata = {
  title: 'CyberSec Docs',
  description: 'Cybersecurity documentation',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
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
        <Dock />

        <main className="flex-1 ml-0 md:ml-70 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}