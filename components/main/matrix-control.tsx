"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MatrixSettings {
  fontSize: number;
  speed: number;
  trailOpacity: number;
}

interface EnhancedMatrixControlProps {
  settings: MatrixSettings;
  onSettingsChange: (settings: MatrixSettings) => void;
}

export const EnhancedMatrixControl: React.FC<EnhancedMatrixControlProps> = ({ 
  settings, 
  onSettingsChange 
}) => {
  const [showPanel, setShowPanel] = useState(false);
  const [presets] = useState([
    { name: "Classic Matrix", fontSize: 14, speed: 28, trailOpacity: 0.1 },
    { name: "Financial Dense", fontSize: 12, speed: 20, trailOpacity: 0.08 },
    { name: "Quant Thunder", fontSize: 16, speed: 15, trailOpacity: 0.05 },
    { name: "Elegant Flow", fontSize: 18, speed: 35, trailOpacity: 0.15 },
    { name: "Code Storm", fontSize: 10, speed: 12, trailOpacity: 0.06 }
  ]);

  const handleSettingChange = (key: keyof MatrixSettings, value: number) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  const applyPreset = (preset: typeof presets[0]) => {
    onSettingsChange({
      fontSize: preset.fontSize,
      speed: preset.speed,
      trailOpacity: preset.trailOpacity
    });
  };

  const resetSettings = () => {
    onSettingsChange({
      fontSize: 14,
      speed: 28,
      trailOpacity: 0.1
    });
  };

  const getSpeedDescription = (speed: number) => {
    if (speed <= 15) return "Ludicrous Speed ⚡";
    if (speed <= 25) return "High Velocity 🚀";
    if (speed <= 35) return "Standard Flow 📊";
    if (speed <= 50) return "Elegant Pace 🎯";
    return "Contemplative 🧘";
  };

  const getDensityDescription = (fontSize: number) => {
    if (fontSize <= 10) return "Ultra Dense 🌊";
    if (fontSize <= 14) return "High Density 📈";
    if (fontSize <= 16) return "Balanced 📊";
    if (fontSize <= 18) return "Readable 👁️";
    return "Spacious 🏛️";
  };

  return (
    <>
      {/* Enhanced Control Button */}
      <motion.button
        onClick={() => setShowPanel(!showPanel)}
        className="fixed top-4 right-4 z-50 px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-black font-mono font-bold text-sm rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-400/50 border border-green-400"
        whileHover={{ scale: 1.05, rotate: 1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          boxShadow: showPanel ? '0 0 20px rgba(0, 255, 65, 0.6)' : '0 0 10px rgba(0, 255, 65, 0.3)',
        }}
      >
        <span className="flex items-center gap-2">
          <span className="text-lg">🔓</span>
          Hack the Matrix
        </span>
      </motion.button>

      {/* Enhanced Control Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, x: 400, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 400, scale: 0.8 }}
            transition={{ 
              duration: 0.4, 
              ease: "easeInOut",
              type: "spring",
              stiffness: 120
            }}
            className="fixed top-20 right-4 z-50 w-96 p-8 bg-black bg-opacity-95 backdrop-blur-lg border-2 border-green-400 rounded-2xl font-mono shadow-2xl shadow-green-400/30"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 20, 0, 0.98) 100%)',
              borderImage: 'linear-gradient(135deg, #00FF41, #00CC33) 1'
            }}
          >
            {/* Header */}
            <div className="mb-8">
              <h3 className="text-green-400 font-bold text-xl mb-2 text-center tracking-wider">
                [QUANTRIX_CONTROL_SYSTEM]
              </h3>
              <div className="h-px bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60"></div>
              <p className="text-green-300 text-xs text-center mt-2 opacity-80">
                Mathematical Matrix Manipulation Interface
              </p>
            </div>
            
            {/* Quick Presets */}
            <div className="mb-8">
              <label className="block text-green-300 mb-3 font-semibold text-sm">
                📋 QUANTUM PRESETS
              </label>
              <div className="grid grid-cols-1 gap-2">
                {presets.map((preset, index) => (
                  <motion.button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="px-4 py-2 bg-gray-800 hover:bg-green-900 text-green-300 hover:text-green-100 text-xs rounded-lg transition-all duration-200 border border-green-400/20 hover:border-green-400/60"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {preset.name}
                  </motion.button>
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
              {/* Font Size Control */}
              <div>
                <label className="block text-green-300 mb-3 font-semibold flex items-center gap-2">
                  <span className="text-lg">🔤</span>
                  Symbol Size: {settings.fontSize}px
                </label>
                <div className="mb-2">
                  <input
                    type="range"
                    min="8"
                    max="22"
                    step="1"
                    value={settings.fontSize}
                    onChange={(e) => handleSettingChange('fontSize', parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500 hover:accent-green-400"
                  />
                </div>
                <div className="text-xs text-green-400 font-semibold">
                  {getDensityDescription(settings.fontSize)}
                </div>
              </div>
              
              {/* Speed Control */}
              <div>
                <label className="block text-green-300 mb-3 font-semibold flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  Flow Rate: {settings.speed}ms
                </label>
                <div className="mb-2">
                  <input
                    type="range"
                    min="10"
                    max="80"
                    step="2"
                    value={settings.speed}
                    onChange={(e) => handleSettingChange('speed', parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500 hover:accent-green-400"
                  />
                </div>
                <div className="text-xs text-green-400 font-semibold">
                  {getSpeedDescription(settings.speed)}
                </div>
              </div>
              
              {/* Trail Opacity Control */}
              <div>
                <label className="block text-green-300 mb-3 font-semibold flex items-center gap-2">
                  <span className="text-lg">👁️</span>
                  Trail Fade: {(settings.trailOpacity * 100).toFixed(0)}%
                </label>
                <div className="mb-2">
                  <input
                    type="range"
                    min="0.03"
                    max="0.25"
                    step="0.01"
                    value={settings.trailOpacity}
                    onChange={(e) => handleSettingChange('trailOpacity', parseFloat(e.target.value))}
                    className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500 hover:accent-green-400"
                  />
                </div>
                <div className="text-xs text-green-400">
                  Higher = Shorter Trails | Lower = Longer Trails
                </div>
              </div>
              
              {/* System Info */}
              <div className="bg-gray-900/50 p-4 rounded-lg border border-green-400/20">
                <div className="text-xs text-green-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Columns:</span>
                    <span className="text-green-400">{Math.floor(window.innerWidth / settings.fontSize)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>FPS Target:</span>
                    <span className="text-green-400">{Math.round(1000 / settings.speed)}fps</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Easter Eggs:</span>
                    <span className="text-yellow-400">ACTIVE 🥚</span>
                  </div>
                </div>
              </div>
              
              {/* Reset Button */}
              <div className="pt-4 border-t border-green-400/30">
                <motion.button
                  onClick={resetSettings}
                  className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-black font-mono font-bold text-sm rounded-lg transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <span className="text-lg">⚡</span>
                    RESTORE_QUANTUM_DEFAULTS
                  </span>
                </motion.button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-green-400/20">
              <p className="text-green-500/60 text-xs text-center">
                v2.1.α • Quantum Financial Matrix System
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};