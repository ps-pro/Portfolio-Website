"use client";

import { useState } from "react";
import { ClassicMatrix } from "@/components/main/quantbox-matrix";
import { SimpleMatrixControl } from "@/components/main/matrix-control";

interface MatrixSettings {
  fontSize: number;
  speed: number;
  trailOpacity: number;
}

export default function QuantBoxPage() {
  const [matrixSettings, setMatrixSettings] = useState<MatrixSettings>({
    fontSize: 14,
    speed: 28,
    trailOpacity: 0.1
  });

  return (
    <main className="relative min-h-screen w-full">
      {/* Classic Matrix Rain - EXACT same behavior as FQE website */}
      <ClassicMatrix 
        fontSize={matrixSettings.fontSize}
        speed={matrixSettings.speed}
        trailOpacity={matrixSettings.trailOpacity}
      />
      
      {/* Matrix Control Button */}
      <SimpleMatrixControl 
        settings={matrixSettings}
        onSettingsChange={setMatrixSettings}
      />
      
      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 sm:px-16">
        <div className="text-center text-green-400">
          <h1 className="text-6xl font-mono font-bold mb-4 text-green-400">
            QuantBoX
          </h1>
          <p className="font-mono text-lg mb-8">
            Financial Simulation Sandbox
          </p>
          <div className="text-sm font-mono text-green-500 opacity-70">
            Classic Matrix Rain • Financial Symbols • Interactive Controls
          </div>
        </div>
      </div>
    </main>
  );
}