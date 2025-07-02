// components/autoanalytix/AutoAnalytixBackground.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Road {
  start: { lat: number; lon: number };
  end: { lat: number; lon: number };
  type: 'highways' | 'arterials' | 'collectors' | 'local';
}

const AutoAnalytixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  // State
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [roads, setRoads] = useState<Road[]>([]);
  const [enabledTypes, setEnabledTypes] = useState({
    highways: true,
    arterials: true,
    collectors: true,
    local: true
  });

  // Viewport settings - MAXIMUM zoom out to see ENTIRE network
  const viewport = {
    centerLat: 37.55,    // Center of your data
    centerLon: -122.15,  // Center of your data  
    zoom: 1200           // VERY small = maximum zoom out
  };

  // Road styles
  const roadStyles = {
    highways: { color: '#00ff41', width: 3 },
    arterials: { color: '#00cc33', width: 2 },
    collectors: { color: '#0080ff', width: 1.5 },
    local: { color: '#666666', width: 1 }
  };

  // Load all road data
  const loadRoadData = async () => {
    try {
      setLoadingProgress(10);
      
      const layers = [
        { name: 'highways', file: '/GeoData/bay_area_roads_highways.geojson' },
        { name: 'arterials', file: '/GeoData/bay_area_roads_arterials.geojson' },
        { name: 'collectors', file: '/GeoData/bay_area_roads_collectors.geojson' },
        { name: 'local', file: '/GeoData/bay_area_roads_local.geojson' }
      ];

      const allRoads: Road[] = [];

      for (let i = 0; i < layers.length; i++) {
        const layer = layers[i];
        setLoadingProgress(20 + (i * 20));

        try {
          console.log(`Loading ${layer.name}...`);
          const response = await fetch(layer.file);
          
          if (!response.ok) {
            throw new Error(`Failed to load ${layer.name}: ${response.status}`);
          }

          const geoData = await response.json();
          console.log(`Loaded ${layer.name}: ${geoData.features?.length || 0} features`);
          
          if (geoData.features) {
            const layerRoads = geoData.features.map((feature: any) => {
              const coords = feature.geometry.coordinates;
              if (coords && coords.length >= 2) {
                return {
                  start: { lat: coords[0][1], lon: coords[0][0] },
                  end: { lat: coords[coords.length - 1][1], lon: coords[coords.length - 1][0] },
                  type: layer.name as Road['type']
                };
              }
              return null;
            }).filter(Boolean);

            allRoads.push(...layerRoads);
            console.log(`Processed ${layerRoads.length} ${layer.name} roads`);
          }
        } catch (error) {
          console.error(`Error loading ${layer.name}:`, error);
        }
      }

      console.log(`Total roads loaded: ${allRoads.length}`);
      setRoads(allRoads);
      setLoadingProgress(100);
      
      setTimeout(() => {
        setIsLoading(false);
      }, 500);

    } catch (error) {
      console.error('Failed to load road data:', error);
      setIsLoading(false);
    }
  };

  // Setup canvas
  const setupCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  };

  // Convert lat/lon to screen coordinates
  const projectToScreen = (lat: number, lon: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const x = (lon - viewport.centerLon) * viewport.zoom + canvas.width / 2;
    const y = (viewport.centerLat - lat) * viewport.zoom + canvas.height / 2;
    return { x, y };
  };

  // Draw roads
  const drawRoads = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw roads by type
    Object.entries(roadStyles).forEach(([type, style]) => {
      if (!enabledTypes[type as keyof typeof enabledTypes]) return;

      const typeRoads = roads.filter(road => road.type === type);
      
      ctx.strokeStyle = style.color;
      ctx.lineWidth = style.width;
      ctx.globalAlpha = 0.8;
      ctx.lineCap = 'round';

      ctx.beginPath();
      typeRoads.forEach(road => {
        const start = projectToScreen(road.start.lat, road.start.lon);
        const end = projectToScreen(road.end.lat, road.end.lon);
        
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
      });
      ctx.stroke();
    });
  };

  // Animation loop
  const animate = () => {
    drawRoads();
    animationRef.current = requestAnimationFrame(animate);
  };

  // Toggle road type
  const toggleRoadType = (type: keyof typeof enabledTypes) => {
    setEnabledTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Effects
  useEffect(() => {
    const cleanup = setupCanvas();
    loadRoadData();
    return cleanup;
  }, []);

  useEffect(() => {
    if (!isLoading && roads.length > 0) {
      animate();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isLoading, roads, enabledTypes]);

  return (
    <div className="fixed inset-0">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 bg-black"
      />

      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="text-center text-green-400 font-mono">
            <div className="text-2xl mb-4">Loading Bay Area Roads...</div>
            <div className="w-64 h-2 bg-gray-800 rounded">
              <div 
                className="h-full bg-green-400 rounded transition-all"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <div className="mt-2 text-sm opacity-75">
              {roads.length.toLocaleString()} roads loaded
            </div>
          </div>
        </div>
      )}

      {/* Road Type Controls */}
      {!isLoading && (
        <div className="fixed top-4 right-4 z-10">
          <div className="bg-black/80 border border-green-400 rounded-lg p-4 backdrop-blur">
            <div className="text-green-400 text-sm font-mono mb-3 text-center">
              ROAD TYPES
            </div>
            <div className="space-y-2">
              {Object.entries(roadStyles).map(([type, style]) => (
                <button
                  key={type}
                  onClick={() => toggleRoadType(type as keyof typeof enabledTypes)}
                  className={`w-full px-3 py-2 text-sm font-mono rounded border transition-all ${
                    enabledTypes[type as keyof typeof enabledTypes]
                      ? 'bg-green-500/20 border-green-400 text-green-400'
                      : 'border-gray-600 text-gray-400 hover:border-gray-500'
                  }`}
                  style={{
                    borderColor: enabledTypes[type as keyof typeof enabledTypes] 
                      ? style.color 
                      : undefined
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="capitalize">{type}</span>
                    <div 
                      className="w-4 h-1 rounded"
                      style={{ backgroundColor: style.color }}
                    />
                  </div>
                </button>
              ))}
            </div>
            
            {/* Stats */}
            <div className="mt-4 pt-3 border-t border-gray-700 text-xs text-gray-400 font-mono">
              <div>Total Roads: {roads.length.toLocaleString()}</div>
              <div>
                Active: {Object.entries(enabledTypes)
                  .filter(([_, enabled]) => enabled)
                  .length}/4 types
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!isLoading && (
        <div className="fixed bottom-4 left-4 z-10">
          <div className="bg-black/80 border border-blue-400 rounded-lg p-3 backdrop-blur">
            <div className="text-blue-400 text-xs font-mono">
              Use the controls to toggle road types on/off
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoAnalytixBackground;