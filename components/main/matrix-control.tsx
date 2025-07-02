"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MatrixSettings {
  fontSize: number;
  speed: number;
  trailOpacity: number;
}

interface SimpleMatrixControlProps {
  settings: MatrixSettings;
  onSettingsChange: (settings: MatrixSettings) => void;
}

export const SimpleMatrixControl: React.FC<SimpleMatrixControlProps> = ({ 
  settings, 
  onSettingsChange 
}) => {
  const [showPanel, setShowPanel] = useState(false);

  const handleSettingChange = (key: keyof MatrixSettings, value: number) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  const resetSettings = () => {
    onSettingsChange({
      fontSize: 14,
      speed: 28,
      trailOpacity: 0.1
    });
  };

  return (
    <>
      {/* Control Button */}
      <motion.button
        onClick={() => setShowPanel(!showPanel)}
        className="fixed top-4 right-4 z-50 px-6 py-3 bg-green-600 hover:bg-green-500 text-black font-mono font-bold text-sm rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-400/50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        🔓 HACK_REALITY
      </motion.button>

      {/* Control Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-20 right-4 z-50 w-80 p-6 bg-black bg-opacity-90 backdrop-blur-sm border-2 border-green-400 rounded-xl font-mono shadow-2xl shadow-green-400/20"
          >
            <div className="mb-6">
              <h3 className="text-green-400 font-bold text-lg mb-2 text-center">
                [CLASSIC_MATRIX_CONTROL]
              </h3>
              <div className="h-px bg-green-400 opacity-50"></div>
            </div>
            
            <div className="space-y-6">
              {/* Font Size Control */}
              <div>
                <label className="block text-green-300 mb-2 font-semibold">
                  Font Size: {settings.fontSize}px
                </label>
                <input
                  type="range"
                  min="8"
                  max="20"
                  step="1"
                  value={settings.fontSize}
                  onChange={(e) => handleSettingChange('fontSize', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
              </div>
              
              {/* Speed Control */}
              <div>
                <label className="block text-green-300 mb-2 font-semibold">
                  Speed: {settings.speed}ms
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="2"
                  value={settings.speed}
                  onChange={(e) => handleSettingChange('speed', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <div className="text-xs text-green-500 mt-1">
                  Lower = Faster
                </div>
              </div>
              
              {/* Trail Opacity Control */}
              <div>
                <label className="block text-green-300 mb-2 font-semibold">
                  Trail Opacity: {(settings.trailOpacity * 100).toFixed(0)}%
                </label>
                <input
                  type="range"
                  min="0.05"
                  max="0.3"
                  step="0.01"
                  value={settings.trailOpacity}
                  onChange={(e) => handleSettingChange('trailOpacity', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <div className="text-xs text-green-500 mt-1">
                  Higher = Shorter Trails
                </div>
              </div>
              
              {/* Reset Button */}
              <div className="pt-4 border-t border-green-400 border-opacity-30">
                <button
                  onClick={resetSettings}
                  className="w-full px-4 py-3 bg-green-600 hover:bg-green-500 text-black font-mono font-bold text-sm rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  ⚡ RESET_TO_CLASSIC
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};