'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, RefreshCw } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-a via-white-orange to-gray-b relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-orange-a/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-gray-c/10 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white-orange/20 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <motion.div
        className="relative z-10 text-center space-y-8 px-4 max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 404 Number with floating animation */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="relative"
        >
          <motion.h1
            variants={itemVariants}
            className="text-9xl md:text-[12rem] font-bold text-transparent bg-gradient-to-r from-orange-a via-gray-c to-orange-a bg-clip-text leading-none"
            style={{
              textShadow: '0 0 40px rgba(249, 143, 65, 0.3)',
            }}
          >
            404
          </motion.h1>
          <motion.div
            className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-orange-a/10 blur-sm"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            404
          </motion.div>
        </motion.div>

        {/* Main content card */}
        <motion.div variants={itemVariants}>
          <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-2xl">
            <CardContent className="p-8 space-y-6">
              <motion.div variants={itemVariants} className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-black-a">
                  Page Not Found
                </h2>
                <p className="text-lg text-gray-c max-w-md mx-auto leading-relaxed">
                  Oops! The page you{"'"}re looking for seems to have wandered
                  off into the digital void. Don{"'"}t worry, even the best
                  explorers sometimes take a wrong turn.
                </p>
              </motion.div>

              {/* Action buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
              >
                <Button
                  onClick={() => router.push('/')}
                  size="lg"
                  className="min-w-[180px] bg-orange-a hover:bg-orange-a/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Go Home
                </Button>

                <Button
                  onClick={() => router.back()}
                  variant="outline"
                  size="lg"
                  className="min-w-[180px] border-gray-c/30 hover:border-orange-a/50 hover:bg-orange-a/5 transition-all duration-300 group"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Go Back
                </Button>
              </motion.div>

              {/* Additional helpful links */}
              <motion.div
                variants={itemVariants}
                className="pt-6 border-t border-gray-b/50"
              >
                <p className="text-sm text-gray-c mb-4">Or try one of these:</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button
                    onClick={() => router.push('/resume')}
                    variant="ghost"
                    size="sm"
                    className="text-gray-c hover:text-orange-a hover:bg-orange-a/10 transition-all duration-300"
                  >
                    <RefreshCw className="w-3 h-3 mr-2" />
                    Resume Builder
                  </Button>
                  <Button
                    onClick={() => router.push('/login')}
                    variant="ghost"
                    size="sm"
                    className="text-gray-c hover:text-orange-a hover:bg-orange-a/10 transition-all duration-300"
                  >
                    <Search className="w-3 h-3 mr-2" />
                    Login
                  </Button>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Fun fact or tip */}
        <motion.div variants={itemVariants} className="text-center">
          <motion.p
            className="text-sm text-gray-c/80 italic"
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            💡 Fun fact: HTTP 404 errors were named after room 404 at CERN,
            where the web was born!
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}
