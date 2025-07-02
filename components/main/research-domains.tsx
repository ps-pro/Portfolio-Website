"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';

const RESEARCH_DOMAINS = [
  {
    id: 'rl',
    title: 'Reinforcement Learning',
    subtitle: 'Agent-Environment Optimization',
    description: 'Deep Q Networks and UAV workload optimization for IoT applications',
    paperUrl: 'https://doi.org/10.1109/ICVES61986.2024.10928164',
    theme: {
      primary: '#00d4ff',
      secondary: '#00ff88',
      accent: '#0088ff',
      gradient: 'from-cyan-500/20 via-blue-500/20 to-green-500/20'
    },
    icon: '🧠',
    particles: 25
  },
  {
    id: 'fl',
    title: 'Federated Learning', 
    subtitle: 'Distributed Intelligence',
    description: 'Privacy-preserving machine learning across distributed networks',
    paperUrl: 'https://doi.org/10.1109/ICVES61986.2024.10927919',
    theme: {
      primary: '#ff00ff',
      secondary: '#8000ff',
      accent: '#ff0080',
      gradient: 'from-purple-500/20 via-pink-500/20 to-violet-500/20'
    },
    icon: '🌐',
    particles: 20
  },
  {
    id: 'qml',
    title: 'Quantum ML',
    subtitle: 'Quantum Computing & AI',
    description: 'Quantum algorithms for machine learning and optimization problems',
    paperUrl: 'https://doi.org/10.1109/ICCAR61844.2024.10569440',
    theme: {
      primary: '#00ffff',
      secondary: '#ff6600',
      accent: '#ffff00',
      gradient: 'from-teal-500/20 via-cyan-500/20 to-orange-500/20'
    },
    icon: '⚛️',
    particles: 30
  }
];

const DomainCard = ({ domain, index }: { domain: typeof RESEARCH_DOMAINS[0], index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]));
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]));

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 100,
      scale: 0.8,
      rotateX: -15
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1,
        delay: index * 0.3,
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative h-full w-full group perspective-1000"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{
        transformStyle: "preserve-3d"
      }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: domain.particles }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: `linear-gradient(45deg, ${domain.theme.primary}, ${domain.theme.secondary})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Domain-Specific Animations */}
      {domain.id === 'rl' && (
        <div className="absolute inset-0">
          {/* Neural Network Connections */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              style={{
                height: '100%',
                left: `${10 + i * 10}%`,
                transform: 'rotate(45deg)',
              }}
              animate={{
                opacity: [0, 1, 0],
                scaleY: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {domain.id === 'fl' && (
        <div className="absolute inset-0">
          {/* Network Nodes */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full border-2 border-purple-400"
              style={{
                left: `${20 + (i % 3) * 30}%`,
                top: `${20 + Math.floor(i / 3) * 30}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                borderColor: [domain.theme.primary, domain.theme.secondary, domain.theme.primary],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {domain.id === 'qml' && (
        <div className="absolute inset-0">
          {/* Quantum Wave Functions */}
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 border border-teal-400/30 rounded-full"
              style={{
                transformOrigin: 'center',
              }}
              animate={{
                scale: [0.5, 1.5, 0.5],
                rotate: [0, 360],
                opacity: [0.8, 0.2, 0.8],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      )}

      {/* Main Card */}
      <motion.div
        className={`relative h-full bg-gradient-to-br ${domain.theme.gradient} backdrop-blur-xl border border-white/10 group-hover:border-white/20 transition-all duration-500 overflow-hidden`}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        whileHover={{
          scale: 1.02,
          boxShadow: `0 25px 80px ${domain.theme.primary}40`,
        }}
      >
        {/* Cursor Following Light */}
        {isHovered && (
          <motion.div
            className="absolute w-96 h-96 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${domain.theme.primary}20 0%, transparent 70%)`,
              left: mousePosition.x - 192,
              top: mousePosition.y - 192,
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}

        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-6 h-6 border border-white/20"
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
              animate={{
                rotate: [0, 360],
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 text-center">
          {/* Icon */}
          <motion.div 
            className="text-8xl mb-6"
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
              rotate: isHovered ? [0, 5, -5, 0] : 0,
            }}
            transition={{
              duration: 0.5,
              type: "spring"
            }}
          >
            {domain.icon}
          </motion.div>

          {/* Title */}
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold mb-4"
            style={{
              background: `linear-gradient(135deg, ${domain.theme.primary}, ${domain.theme.secondary})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
            animate={{
              textShadow: isHovered 
                ? `0 0 20px ${domain.theme.primary}80` 
                : `0 0 0px ${domain.theme.primary}00`,
            }}
          >
            {domain.title}
          </motion.h2>

          {/* Subtitle */}
          <motion.p 
            className="text-xl text-gray-300 mb-6 font-medium"
            animate={{
              opacity: isHovered ? 1 : 0.8,
            }}
          >
            {domain.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p 
            className="text-gray-400 leading-relaxed mb-8 max-w-sm"
            animate={{
              opacity: isHovered ? 1 : 0.7,
            }}
          >
            {domain.description}
          </motion.p>

          {/* Research Button */}
          <Link href={domain.paperUrl} target="_blank" rel="noopener noreferrer">
            <motion.button
              className="px-8 py-4 rounded-xl font-bold text-white border-2 transition-all duration-300 group/btn overflow-hidden relative"
              style={{
                borderColor: domain.theme.primary,
                background: `linear-gradient(135deg, ${domain.theme.primary}20, ${domain.theme.secondary}20)`,
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: `0 10px 30px ${domain.theme.primary}40`,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Read Research</span>
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${domain.theme.primary}40, ${domain.theme.secondary}40)`,
                }}
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>
        </div>

        {/* Glowing Border Effect */}
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            background: `linear-gradient(135deg, ${domain.theme.primary}20, transparent, ${domain.theme.secondary}20)`,
            filter: 'blur(1px)',
          }}
          animate={{
            opacity: isHovered ? 0.6 : 0.2,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

export const ResearchDomains = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative py-20">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-20 mb-16"
      >
        <motion.h1 
            className="text-5xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
              Research Domains
            </span>
          </motion.h1>
        <motion.div
            initial={{ width: "100px" }}
            animate={{ 
              width: ["150px","650px", "150px"]
            }}
            transition={{ 
              duration: 4,
              delay: 0.7,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
            className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"
          />
      </motion.div>

      {/* Cards Container */}
      <div className="w-full flex-1 flex gap-6 px-6 max-w-7xl mx-auto">
        {RESEARCH_DOMAINS.map((domain, index) => (
          <div key={domain.id} className="flex-1">
            <DomainCard domain={domain} index={index} />
          </div>
        ))}
      </div>

      {/* Additional Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </section>
  );
};