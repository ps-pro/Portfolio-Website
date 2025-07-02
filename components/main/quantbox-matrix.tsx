"use client";

import { useEffect, useRef } from "react";

interface ClassicMatrixProps {
  fontSize?: number;
  speed?: number;
  trailOpacity?: number;
}

export const ClassicMatrix: React.FC<ClassicMatrixProps> = ({ 
  fontSize = 14, 
  speed = 28,
  trailOpacity = 0.1 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Financial symbols - same concept as the Greek letters
    const letters = '$€¥£₹₿₩₽¢₡₦₹₪₫';
    const lettersArray = letters.split('');

    let columns: number;
    let drops: number[] = [];

    // Setup canvas and drops
    const setupCanvas = () => {
      // Setting the width and height of the canvas
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Setting up the columns
      columns = Math.floor(canvas.width / fontSize);
      
      // Setting up the drops
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = 1;
      }
    };

    setupCanvas();

    // Setting up the draw function - EXACT same logic as reference
    function draw() {
      // Trail effect - same rgba approach
      ctx.fillStyle = `rgba(0, 0, 0, ${trailOpacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set font
      ctx.font = `${fontSize}px 'Courier New', monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        // Pick random letter - same logic
        const text = lettersArray[Math.floor(Math.random() * lettersArray.length)];
        
        // Green color - same as reference
        ctx.fillStyle = '#0f0';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Move drop down
        drops[i]++;
        
        // Reset drop when it reaches bottom - same condition
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
      }
    }

    // Loop the animation - using setInterval like the reference
    const intervalId = setInterval(draw, speed);

    // Resize handler - exact same logic
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setupCanvas();
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
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