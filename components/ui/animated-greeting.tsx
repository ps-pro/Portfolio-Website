"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LANGUAGES = [
  { text: "Hi!", lang: "English" },
  { text: "नमस्ते!", lang: "Hindi" },
  { text: "¡Hola!", lang: "Spanish" },
  { text: "Salut!", lang: "French" },
  { text: "Hi!", lang: "English" }, // Every 4th
  { text: "ಹಾಯ್!", lang: "Kannada" },
  { text: "Hallo!", lang: "German" },
  { text: "Привет!", lang: "Russian" },
  { text: "Hi!", lang: "English" }, // Every 4th
  { text: "హాయ్!", lang: "Telugu" },
  { text: "こんにちは!", lang: "Japanese" },
  { text: "안녕!", lang: "Korean" },
  { text: "Hi!", lang: "English" }, // Every 4th
  { text: "வணக্কம்!", lang: "Tamil" },
  { text: "مرحبا!", lang: "Arabic" },
  { text: "你好!", lang: "Chinese" },
  { text: "Hi!", lang: "English" }, // Every 4th
  { text: "নমস্কার!", lang: "Bengali" },
  { text: "Olá!", lang: "Portuguese" },
  { text: "Ciao!", lang: "Italian" },
];

export const AnimatedGreeting = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % LANGUAGES.length);
    }, 2500); // 2.5 seconds total (1s fade in/out + 1.5s display)

    return () => clearInterval(interval);
  }, []);

  const currentGreeting = LANGUAGES[currentIndex];

  const wordVariants = {
    initial: { 
      opacity: 0, 
      y: 30,
      scale: 0.9,
      filter: "blur(8px)"
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      y: -30,
      scale: 0.9,
      filter: "blur(8px)",
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  return (
    <div className="text-6xl font-bold text-white max-w-[800px] w-auto h-auto whitespace-nowrap">
      <span className="inline-flex items-baseline">
        {/* Animated Greeting */}
        <span className="relative inline-block">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentIndex}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500"
              variants={wordVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{
                fontFamily: getFontFamily(currentGreeting.lang),
                willChange: "transform, opacity, filter"
              }}
            >
              {currentGreeting.text}
            </motion.span>
          </AnimatePresence>
        </span>
        
        {/* Space + Static "I'm Priyansh" */}
        <motion.span 
          className="ml-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          I'm Priyansh.
        </motion.span>
      </span>
    </div>
  );
};

// Simplified font family helper with better fallbacks
const getFontFamily = (language: string): string => {
  const fontMap: { [key: string]: string } = {
    'Hindi': 'system-ui, -apple-system, "Segoe UI", "Arial Unicode MS", sans-serif',
    'Kannada': 'system-ui, -apple-system, "Segoe UI", "Arial Unicode MS", sans-serif',
    'Telugu': 'system-ui, -apple-system, "Segoe UI", "Arial Unicode MS", sans-serif',
    'Tamil': 'system-ui, -apple-system, "Segoe UI", "Arial Unicode MS", sans-serif',
    'Bengali': 'system-ui, -apple-system, "Segoe UI", "Arial Unicode MS", sans-serif',
    'Russian': 'system-ui, -apple-system, "Segoe UI", "Arial Unicode MS", sans-serif',
    'Japanese': 'system-ui, -apple-system, "Segoe UI", "Yu Gothic", "Meiryo", "Arial Unicode MS", sans-serif',
    'Korean': 'system-ui, -apple-system, "Segoe UI", "Malgun Gothic", "Arial Unicode MS", sans-serif',
    'Arabic': 'system-ui, -apple-system, "Segoe UI", "Arial Unicode MS", sans-serif',
    'Chinese': 'system-ui, -apple-system, "Segoe UI", "Microsoft YaHei", "SimSun", "Arial Unicode MS", sans-serif',
  };
  
  return fontMap[language] || 'system-ui, -apple-system, "Segoe UI", "Inter", "Arial Unicode MS", sans-serif';
};