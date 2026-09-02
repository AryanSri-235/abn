import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ABN Thermocare',
  description: 'Official corporate website of ABN Thermocare - Service Provider & Manufacturer of Utility Pipeline Installation, Steam Pipe Insulation, Electric Suction Heaters, Fire Alarm Systems, and Industrial Chimneys in Greater Noida, UP.',
  icons: {
    icon: '/images/img_3.JPG',
    shortcut: '/images/img_3.JPG',
    apple: '/images/img_3.JPG',
  },
  keywords: [
    'ABN Thermocare System',
    'ABN Servo Care System',
    'Utility Pipeline Installation',
    'Steam Pipe Insulation',
    'Electric Suction Heater',
    'Industrial Chimney Greater Noida',
    'Fire Alarm System Service',
    'Storage Tanks'
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-950 text-slate-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
