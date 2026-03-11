import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { labInfo } from '@/data/siteData';

export const metadata: Metadata = {
  title: { default: labInfo.name, template: `%s | ${labInfo.shortName}` },
  description: labInfo.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
