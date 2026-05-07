import './globals.css'
import Sidebar from '@/components/Sidebar'
import 'remixicon/fonts/remixicon.css'
import I18nProvider from '@/components/providers/I18nProvider'

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
        <I18nProvider>
          <Sidebar />

          <main className="flex-1 ml-0 md:ml-70 min-h-screen">
            {children}
          </main>
        </I18nProvider>
      </body>
    </html>
  )
}