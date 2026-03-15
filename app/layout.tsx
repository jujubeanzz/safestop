import { Poppins } from 'next/font/google'
import './globals.css'

// Load Poppins from Google Fonts — warm, rounded, works on all devices
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata = {
  title: 'SafeStop',
  description: 'Find clean washrooms on Indian highways — community-rated, free to use.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>{children}</body>
    </html>
  )
}
