import type { Metadata } from 'next';
import { Manrope, Space_Grotesk } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: 'Md. Khalid Hasan | Portfolio',
  description:
    'Computer Science student and software developer portfolio featuring projects, skills, and contact details.',
  openGraph: {
    title: 'Md. Khalid Hasan | Portfolio',
    description:
      'Computer Science student and software developer portfolio featuring projects, skills, and contact details.',
    url: 'https://example.com',
    siteName: 'Md. Khalid Hasan',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Md. Khalid Hasan portfolio preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Md. Khalid Hasan | Portfolio',
    description:
      'Computer Science student and software developer portfolio featuring projects, skills, and contact details.',
    images: ['/og-image.svg'],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
