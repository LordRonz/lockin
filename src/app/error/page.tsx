'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-8 px-4"
      >
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl text-primary">
            Oops! Something went wrong
          </h1>
          <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
            We apologize for the inconvenience. An unexpected error has
            occurred.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="default"
            size="lg"
            onClick={() => reset()}
            className="min-w-[200px]"
          >
            Try Again
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push('/')}
            className="min-w-[200px]"
          >
            Go Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
