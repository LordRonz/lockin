import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";
import { useRef } from "react";

const Stars = () => {
  const stars = Array.from({ length: 12 });

  return (
    <>
      {stars.map((_, index) => (
        <motion.div
          key={index}
          className="absolute h-1 w-1 rounded-full bg-yellow-400"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.5 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </>
  );
};

export function AIStarLogo() {
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      className="relative h-32 w-32 cursor-pointer rounded-full bg-indigo-600 p-4"
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    >
      {/* Stars */}
      <div className="relative h-full w-full">
        <Stars />
      </div>

      {/* AI Icon */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <BrainCircuit className="h-16 w-16 text-white" />
      </motion.div>

      {/* Glow Effect */}
      <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-indigo-400/30 blur-xl" />
    </motion.div>
  );
}
