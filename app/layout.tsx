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
  metadataBase: new URL('https://khalid-portfolio-ochre.vercel.app'),
  title: 'Md. Khalid Hasan | Full-Stack & Backend Developer',
  description:
    'Portfolio of Md. Khalid Hasan — Final-semester CSE student at AIUB specializing in ASP.NET Core, Node.js, NestJS, Next.js, and scalable web architectures.',
  openGraph: {
    title: 'Md. Khalid Hasan | Full-Stack & Backend Developer',
    description:
      'Explore projects, engineering case studies, academic milestones, and technical skills of Md. Khalid Hasan.',
    url: 'https://khalid-portfolio-ochre.vercel.app',
    siteName: 'Md. Khalid Hasan Portfolio',
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
