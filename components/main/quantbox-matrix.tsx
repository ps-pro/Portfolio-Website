"use client";

import { useEffect, useRef } from "react";

interface EnhancedMatrixProps {
  fontSize?: number;
  speed?: number;
  trailOpacity?: number;
}

export const EnhancedMatrix: React.FC<EnhancedMatrixProps> = ({ 
  fontSize = 14, 
  speed = 28,
  trailOpacity = 0.1 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const easterEggTimer = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ENHANCED QUANTITATIVE FINANCE SYMBOLS
    const quantSymbols = '$€¥£₹₿₩₽¢₡₦₨₪₫₴₸₺₼₾¤＄￥￠￡￢￣￤￦₳₵₶₷₺₻₼₽₾₿';
    const greekLetters = 'αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ';
    const mathSymbols = '∂∆∇∫∑∏∞≈≠≡≤≥√∝∀∃∈∉⊂⊃⊆⊇∪∩∧∨⊕⊗±×÷⌊⌋⌈⌉';
    const hexDigits = '0123456789ABCDEF';
    
    // ENHANCED EASTER EGG MESSAGES (More frequent appearances)
    const easterEggs = [
      'THE_BIG_SHORT',
      'MICHAEL_BURRY', 
      'CDO_SQUARED',
      'MORTGAGE_CRISIS',
      'DERIVATIVES',
      'BLACK_SCHOLES',
      'VOLATILITY_SMILE',
      'RISK_PARITY',
      'QUANT_LIFE',
      'MONTE_CARLO',
      'WALL_STREET',
      'CREDIT_SWAPS',
      'HOUSING_BUBBLE'
    ];
    
    const allSymbols = (quantSymbols + greekLetters + mathSymbols + hexDigits).split('');
    
    let columns: number;
    let drops: number[] = [];
    let easterEggActive = false;
    let easterEggColumn = -1;
    let easterEggMessage = '';
    let easterEggPosition = 0;
    let easterEggDuration = 0;
    const maxEasterEggDuration = 400; // Longer display time

    const setupCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      columns = Math.floor(canvas.width / fontSize);
      
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = 1;
      }
    };

    setupCanvas();

    function draw() {
      // Enhanced trail effect
      ctx.fillStyle = `rgba(0, 0, 0, ${trailOpacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Enhanced font with mathematical styling
      ctx.font = `${fontSize}px 'JetBrains Mono', 'Fira Code', monospace`;
      ctx.textAlign = 'center';
      
      // ENHANCED Easter egg timer - MORE FREQUENT (every 3-6 seconds instead of 15-30)
      easterEggTimer.current++;
      if (easterEggTimer.current > 50 && Math.random() < 0.02) { // SUPER frequent
        easterEggActive = true;
        easterEggColumn = Math.floor(Math.random() * columns);
        easterEggMessage = easterEggs[Math.floor(Math.random() * easterEggs.length)];
        easterEggPosition = 0;
        easterEggDuration = 0;
        easterEggTimer.current = 0;
      }
      
      // Manage easter egg duration
      if (easterEggActive) {
        easterEggDuration++;
        if (easterEggDuration > maxEasterEggDuration) {
          easterEggActive = false;
          easterEggPosition = 0;
        }
      }
      
      for (let i = 0; i < drops.length; i++) {
        let text: string;
        let isEasterEgg = false;
        
        // Enhanced Easter egg logic with better visibility
        if (easterEggActive && i === easterEggColumn && easterEggPosition < easterEggMessage.length) {
          text = easterEggMessage[easterEggPosition];
          isEasterEgg = true;
          
          // Slower character progression for better readability
          if (Math.random() < 0.3) { // Slower character reveal
            easterEggPosition++;
          }
        } else {
          // Enhanced symbol selection with weighted probabilities
          const rand = Math.random();
          if (rand < 0.4) {
            // 40% quantitative symbols
            text = quantSymbols[Math.floor(Math.random() * quantSymbols.length)];
          } else if (rand < 0.7) {
            // 30% Greek letters  
            text = greekLetters[Math.floor(Math.random() * greekLetters.length)];
          } else if (rand < 0.9) {
            // 20% mathematical symbols
            text = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
          } else {
            // 10% hex digits
            text = hexDigits[Math.floor(Math.random() * hexDigits.length)];
          }
        }
        
        // ENHANCED Easter egg styling - BIGGER AND BRIGHTER
        if (isEasterEgg) {
          // Easter egg: Keep original #FFD700 but make it BIGGER and BRIGHTER
          ctx.font = `${Math.round(fontSize * 1.4)}px 'JetBrains Mono', 'Fira Code', monospace`; // 40% bigger
          ctx.fillStyle = '#FFD700'; // Keep original golden color
          ctx.shadowColor = '#FFD700';
          ctx.shadowBlur = 25; // Increased glow (was 15)
          
          // Add pulsing effect
          const pulseIntensity = 0.8 + Math.sin(Date.now() * 0.01) * 0.2;
          ctx.globalAlpha = pulseIntensity;
        } else {
          // Regular matrix characters
          ctx.font = `${fontSize}px 'JetBrains Mono', 'Fira Code', monospace`;
          ctx.globalAlpha = 1;
          
          // Mathematical symbol highlighting
          const isGreek = greekLetters.includes(text);
          const isMath = mathSymbols.includes(text);
          const isQuant = quantSymbols.includes(text);
          
          if (isGreek) {
            // Greek letters: Slightly brighter green
            ctx.fillStyle = '#00FF66';
            ctx.shadowColor = '#00FF66';
            ctx.shadowBlur = 6;
          } else if (isMath) {
            // Math symbols: Pure matrix green with extra glow
            ctx.fillStyle = '#00FF41';
            ctx.shadowColor = '#00FF41';
            ctx.shadowBlur = 8;
          } else if (isQuant) {
            // Financial symbols: Slightly yellow-green
            ctx.fillStyle = '#33FF33';
            ctx.shadowColor = '#33FF33';
            ctx.shadowBlur = 5;
          } else {
            // Default hex: Standard matrix green
            ctx.fillStyle = '#0F0';
            ctx.shadowColor = '#0F0';
            ctx.shadowBlur = 4;
          }
        }
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Reset font size for next iteration
        if (isEasterEgg) {
          ctx.font = `${fontSize}px 'JetBrains Mono', 'Fira Code', monospace`;
        }
        
        // Enhanced drop movement
        drops[i] += Math.random() > 0.95 ? 2 : 1;
        
        // Enhanced reset condition with easter egg prioritization
        if (drops[i] * fontSize > canvas.height && Math.random() > (isEasterEgg ? 0.99 : 0.95)) {
          drops[i] = 0;
        }
      }
      
      // Reset shadow and alpha for other elements
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }

    const intervalId = setInterval(draw, speed);

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setupCanvas();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
    };
  }, [fontSize, speed, trailOpacity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 5,
        background: 'transparent'
      }}
    />
  );
};