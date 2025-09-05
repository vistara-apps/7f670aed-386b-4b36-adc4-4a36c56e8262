import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PollStore - Engage your audience, sell your products',
  description: 'A platform for influencers to create interactive storefronts and leverage polls for product discovery and sales, optimized for Farcaster frames.',
  keywords: ['influencer', 'storefront', 'polls', 'farcaster', 'base', 'web3'],
  authors: [{ name: 'PollStore Team' }],
  openGraph: {
    title: 'PollStore - Engage your audience, sell your products',
    description: 'Create interactive storefronts with polls for product discovery and sales',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
