"use client";

/*********************** */
const militaryStyles = `
.military-classified {
    font-family: 'Courier New', monospace;
    font-weight: 900;
    font-size: 1.1em;
    letter-spacing: 0.3em;
    color: #ef4444;
    text-shadow: 
        0 0 10px #ef4444,
        0 0 20px #ef4444,
        0 0 30px #ef4444,
        2px 2px 0px #000000,
        -2px -2px 0px #000000,
        2px -2px 0px #000000,
        -2px 2px 0px #000000;
    background: linear-gradient(45deg, #1f1f1f 25%, transparent 25%),
                linear-gradient(-45deg, #1f1f1f 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #1f1f1f 75%),
                linear-gradient(-45deg, transparent 75%, #1f1f1f 75%);
    background-size: 4px 4px;
    background-position: 0 0, 0 2px, 2px -2px, -2px 0px;
    padding: 16px 24px;
    margin: 30px 0;
    border: 2px solid #ef4444;
    border-radius: 4px;
    display: inline-block;
    position: relative;
    overflow: hidden;
    animation: militaryPulse 2s infinite alternate;
    }
  
  .military-classified::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.2), transparent);
    animation: militaryScan 3s infinite;
  }
  
  @keyframes militaryPulse {
    0% { box-shadow: 0 0 5px #ef4444; }
    100% { box-shadow: 0 0 20px #ef4444, 0 0 30px #ef4444; }
  }
  
  @keyframes militaryScan {
    0% { left: -100%; }
    100% { left: 100%; }
  }
`;
/*******************************/

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";

export const CyberpunkResearch = () => {
  const router = useRouter();

  const handleContactClick = () => {
    router.push('/contact');
  };
    // Inject military styles into the document
    // Inject military styles
React.useEffect(() => {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = militaryStyles;
  document.head.appendChild(styleElement);
  return () => document.head.removeChild(styleElement);
}, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Cyberpunk Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
      
      {/* Matrix Rain Effect */}
        <div className="absolute inset-0" suppressHydrationWarning>
        {Array.from({ length: 50 }).map((_, i) => (
            <div
            key={i}
            className="absolute text-green-500/20 text-xs font-mono animate-pulse"
            style={{
                left: `${(i * 7) % 100}%`,
                top: `${(i * 13) % 100}%`,
                animationDelay: `${(i * 0.1) % 5}s`,
                animationDuration: `${2 + (i % 3)}s`,
            }}
            >
            {i % 2 === 0 ? '01' : '10'}
            </div>
        ))}
        </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          {/* Main Title */}
          <motion.h1 
            className="text-5xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
            Research Protocol
            </span>
            <span className="military-classified">
            CLASSIFIED
            </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-pulse ml-4">
            🕵️
            </span>
          </motion.h1>
          
          {/* Gradient Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "400px" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mb-8"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-2xl lg:text-3xl text-gray-300 mb-12 font-light"
          >
            Contact for Details
          </motion.p>
        </motion.div>

        {/* Cyberpunk Contact Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="relative group"
        >
          {/* Button Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-60 transition-all duration-500 animate-pulse" />
          
          <motion.button
            onClick={handleContactClick}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 50px rgba(139, 92, 246, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            className="relative px-12 py-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-purple-500/30 rounded-xl text-white font-bold text-xl transition-all duration-300 hover:border-purple-400/60 group"
          >
            {/* Button Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <span className="relative z-10 flex items-center gap-3">
              <span>ACCESS RESEARCH</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-purple-400"
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>

        {/* Glitch Text Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="mt-12 text-xs text-green-400/60 font-mono"
        >
          <motion.span
            animate={{ opacity: [0.5, 1,1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Just kidding 😂 I would be glad to discuss! Contact me for more info.
          </motion.span>
        </motion.div>
      </div>

      {/* Scanlines Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent animate-pulse" />
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-purple-500/10 to-transparent"
            style={{
              top: `${(i + 1) * 5}%`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
};