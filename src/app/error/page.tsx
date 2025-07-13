'use client';

import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const msg = searchParams.get('message');
    if (msg) setErrorMessage(decodeURIComponent(msg));
  }, [searchParams]);

  const handleTryAgain = () => {
    router.refresh();
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-8 px-4"
      >
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl text-primary">
            Oops! Something went wrong
          </h1>
          <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
            {errorMessage ||
              'We apologize for the inconvenience. An unexpected error has occurred.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="default"
            size="lg"
            onClick={handleTryAgain}
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
