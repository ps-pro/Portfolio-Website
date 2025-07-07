"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { EnhancedMatrix } from "@/components/main/quantbox-matrix";
import { EnhancedMatrixControl } from "@/components/main/matrix-control";

interface MatrixSettings {
  fontSize: number;
  speed: number;
  trailOpacity: number;
}

interface BreathingState {
  phase: number;
  intensity: number;
  glow: number;
}

// Framer Motion Variants
const slideInFromTop = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const slideInFromLeft = (delay: number = 0) => ({
  hidden: { x: -100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.8, delay, ease: "easeOut" }
  }
});

const slideInFromRight = (delay: number = 0) => ({
  hidden: { x: 100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.8, delay, ease: "easeOut" }
  }
});

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const fadeInUp = {
  hidden: { y: 60, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function QuantBoxPage() {
  const [matrixSettings, setMatrixSettings] = useState<MatrixSettings>({
    fontSize: 14,
    speed: 28,
    trailOpacity: 0.1
  });

  // Simple breathing animation for glow effect
  const [breathing, setBreathing] = useState<BreathingState>({
    phase: 0,
    intensity: 1,
    glow: 20
  });

  // Smooth breathing animation
  useEffect(() => {
    let animationFrame: number;
    
    const updateBreathing = () => {
      setBreathing(prev => {
        const newPhase = prev.phase + 0.02;
        const intensity = 0.8 + Math.sin(newPhase) * 0.2; // 0.6 to 1.0 range
        const glow = 15 + Math.sin(newPhase * 1.1) * 10; // 15px to 25px
        
        return {
          phase: newPhase,
          intensity,
          glow
        };
      });
      
      animationFrame = requestAnimationFrame(updateBreathing);
    };

    updateBreathing();
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <>
      {/* Enhanced Matrix Rain with Better Easter Eggs */}
      <EnhancedMatrix 
        fontSize={matrixSettings.fontSize}
        speed={matrixSettings.speed}
        trailOpacity={matrixSettings.trailOpacity}
      />
      
      {/* Enhanced Matrix Control System */}
      <EnhancedMatrixControl 
        settings={matrixSettings}
        onSettingsChange={setMatrixSettings}
      />
      
      {/* Main Content */}
      <main className="relative z-10 flex min-h-screen items-center justify-center px-6 sm:px-16 pb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-6xl text-center"
        >
          
          {/* Simple QuantBox Title - Same style as Experience page */}
          <motion.div
            variants={slideInFromTop}
            className="mb-16 mt-20"
          >
            {/* Main Title: QuantBox - Same heading style as Experience */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <motion.h1 
                className="text-6xl lg:text-8xl xl:text-9xl font-bold mb-6"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  letterSpacing: 'normal' // Fixed: removed excessive letter spacing
                }}
              >
                <span 
                  className="animate-pulse"
                  style={{
                    background: `linear-gradient(45deg, 
                      #00FF41, 
                      #33FF66, 
                      #00CC33, 
                      #66FF99, 
                      #00FF41)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: `0 0 ${breathing.glow}px rgba(0, 255, 65, ${breathing.intensity * 0.5})`
                  }}
                >
                  QuantBo𝕏
                </span>
              </motion.h1>
              
              {/* Underline - Same style as Experience page but green */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "200px" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full"
                style={{
                  boxShadow: `0 0 ${breathing.glow}px rgba(0, 255, 65, ${breathing.intensity * 0.6})`
                }}
              />
            </motion.div>
            
            {/* Subtitle: From Mortgages To Markets - SMALLER SIZE */}
            <div className="relative">
              <h2 
                className="text-lg sm:text-xl md:text-3xl font-medium text-green-300 opacity-90"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  letterSpacing: '0.05em'
                }}
              >
                From Mortgages To Markets
              </h2>
            </div>
          </motion.div>

          {/* Professional Description */}
          <motion.div
            variants={slideInFromLeft(0.3)}
            className="mb-16"
          >
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-5xl mx-auto font-light"
               style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>
              Inspired by <span className="text-green-400 font-semibold">"The Big Short"</span> — A comprehensive simulation environment for 
              creating, testing, and stress-testing financial products including{' '}
              <span className="text-green-400 font-mono">MBS</span>,{' '}
              <span className="text-green-400 font-mono">CDO</span>,{' '}
              <span className="text-green-400 font-mono">CDS</span>, and{' '}
              <span className="text-green-400 font-mono">Synthetic CDOs</span>.{' '}
              Build and refine quantitative trading algorithms in a realistic market sandbox.
            </p>
          </motion.div>

          {/* Clickable Development Status Badge - Links to GitHub */}
          <motion.div
            variants={slideInFromLeft(0.6)}
            className="mb-16"
          >
            <Link
              href="https://github.com/ps-research/quantbox"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 border-2 border-green-400 rounded-xl bg-black bg-opacity-60 backdrop-blur-sm hover:bg-opacity-80 hover:border-green-300 transition-all duration-300 group cursor-pointer"
            >
              <span className="text-green-400 font-mono text-lg sm:text-xl font-bold animate-pulse group-hover:animate-none group-hover:text-green-300">
                [STATUS: UNDER_DEVELOPMENT]
              </span>
            </Link>
          </motion.div>

          {/* Compact Feature Matrix Grid */}
          <motion.div
            variants={slideInFromRight(0.9)}
            className="mb-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { 
                  code: 'MBS', 
                  name: 'Mortgage-Backed Securities',
                  symbol: '∫',
                  url: 'https://corporatefinanceinstitute.com/resources/fixed-income/mortgage-backed-security-mbs/'
                },
                { 
                  code: 'CDO', 
                  name: 'Collateralized Debt Obligations',
                  symbol: 'Δ',
                  url: 'https://corporatefinanceinstitute.com/resources/fixed-income/collateralized-debt-obligation-cdo/'
                },
                { 
                  code: 'CDS', 
                  name: 'Credit Default Swaps',
                  symbol: 'λ',
                  url: 'https://corporatefinanceinstitute.com/resources/derivatives/credit-default-swap-cds/'
                },
                { 
                  code: 'QUANT', 
                  name: 'Quantitative Trading',
                  symbol: 'α',
                  url: 'https://corporatefinanceinstitute.com/resources/career-map/sell-side/capital-markets/quantitative-trading/'
                }
              ].map((feature, index) => (
                <motion.a
                  key={feature.code}
                  href={feature.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeInUp}
                  className="block border-2 border-green-400 border-opacity-40 p-4 rounded-xl bg-black bg-opacity-60 hover:bg-opacity-80 transition-all duration-300 hover:border-opacity-90 hover:scale-105 hover:shadow-xl hover:shadow-green-400/20 group cursor-pointer relative"
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Compact Header with code and symbol */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-green-400 text-xl font-bold font-mono flex items-center gap-1">
                      <span className="text-green-500">█</span>
                      {feature.code}
                    </div>
                    <div className="text-green-300 text-3xl font-light opacity-60 group-hover:opacity-100 transition-all duration-300"
                         style={{ fontFamily: "'Computer Modern', 'Times New Roman', serif" }}>
                      {feature.symbol}
                    </div>
                  </div>
                  
                  {/* Compact Full Name */}
                  <div className="text-white text-sm font-bold text-center group-hover:text-green-100 transition-colors leading-tight">
                    {feature.name}
                  </div>
                  
                  {/* Click indicator */}
                  <motion.div 
                    className="absolute bottom-2 right-2 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.2 }}
                  >
                    <span className="text-sm">↗</span>
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Michael Burry Quote Attribution */}
          <motion.div
            variants={slideInFromRight(1.2)}
            className="max-w-3xl mx-auto"
          >
            <blockquote className="text-green-400 font-mono text-sm sm:text-base opacity-100 italic border-l-2 border-green-400/30 pl-6 mb-4">
              "It takes genius to bet against the majority with the right timing."
            </blockquote>
            <p className="text-green-300 font-mono text-xs sm:text-sm opacity-80">
              — Dr. Michael Burry, <em>The Big Short</em>
            </p>
          </motion.div>          
        </motion.div>
      </main>
    </>
  );
}