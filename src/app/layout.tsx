import './globals.css';

import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { cn } from '@/lib/utils';
import { Suspense, unstable_ViewTransition as ViewTransition } from 'react';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'LockedIn',
  description: 'LockedIn is a resume builder powered by AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransition>
      <html lang="en">
        <body
          className={cn(
            GeistSans.variable,
            GeistMono.variable,
            'antialiased transition-all bg-gray-a duration-500',
          )}
        >
          <Suspense>
            {children}
            <Toaster />
          </Suspense>
        </body>
      </html>
    </ViewTransition>
  );
}
