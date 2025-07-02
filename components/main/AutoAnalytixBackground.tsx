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
  
  // State - Only highways and arterials
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [roads, setRoads] = useState<Road[]>([]);
  const [viewport, setViewport] = useState({
    centerLat: 37.55,
    centerLon: -122.25,
    zoom: 1200
  });

  // Only load highways and arterials
  const enabledTypes = {
    highways: true,
    arterials: true,
    collectors: false,
    local: false
  };

  // Calculate bounds and fit perfectly to browser screen
  const fitNetworkToScreen = (roadData: Road[]) => {
    if (roadData.length === 0) return;

    // Find the actual bounds of all roads
    let minLat = Infinity, maxLat = -Infinity;
    let minLon = Infinity, maxLon = -Infinity;

    roadData.forEach(road => {
      // Check start point
      minLat = Math.min(minLat, road.start.lat);
      maxLat = Math.max(maxLat, road.start.lat);
      minLon = Math.min(minLon, road.start.lon);
      maxLon = Math.max(maxLon, road.start.lon);
      
      // Check end point  
      minLat = Math.min(minLat, road.end.lat);
      maxLat = Math.max(maxLat, road.end.lat);
      minLon = Math.min(minLon, road.end.lon);
      maxLon = Math.max(maxLon, road.end.lon);
    });

    console.log(`Data bounds: Lat ${minLat} to ${maxLat}, Lon ${minLon} to ${maxLon}`);

    // Calculate center point of the data
    const centerLat = (minLat + maxLat) / 2;
    const centerLon = (minLon + maxLon) / 2 - 0.2;

    // Calculate actual data dimensions
    const latSpan = maxLat - minLat;
    const lonSpan = maxLon - minLon;

    // Get EXACT browser viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const navbarHeight = 80; // Account for navbar
    
    // Available screen space for the map
    const availableWidth = viewportWidth;
    const availableHeight = viewportHeight - navbarHeight;

    console.log(`Screen: ${availableWidth}x${availableHeight}, Data span: ${lonSpan}°x${latSpan}°`);

    // Calculate zoom to fit perfectly (use 85% to add some padding)
    const zoomForLongitude = (availableWidth * 1.0) / lonSpan;
    const zoomForLatitude = (availableHeight * 1.8) / latSpan;
    
    // Use the smaller zoom so everything fits on screen
    const perfectZoom = Math.min(zoomForLongitude, zoomForLatitude);

    console.log(`Zoom calc: Width=${zoomForLongitude}, Height=${zoomForLatitude}, Using=${perfectZoom}`);

    // Update viewport to perfectly fit the data
    setViewport({
      centerLat,
      centerLon, 
      zoom: perfectZoom
    });
  };

  // Road styles
  const roadStyles = {
    highways: { color: '#00ff41', width: 3 },
    arterials: { color: '#00cc33', width: 2 },
    collectors: { color: '#0080ff', width: 1.5 },
    local: { color: '#666666', width: 1 }
  };

  // Load only highways and arterials
  const loadRoadData = async () => {
    try {
      setLoadingProgress(10);
      
      // Only load highways and arterials
      const layers = [
        { name: 'highways', file: '/GeoData/bay_area_roads_highways.geojson' },
        { name: 'arterials', file: '/GeoData/bay_area_roads_arterials.geojson' }
      ];

      const allRoads: Road[] = [];

      for (let i = 0; i < layers.length; i++) {
        const layer = layers[i];
        setLoadingProgress(30 + (i * 35)); // Adjust progress for 2 layers

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
      
      // Calculate perfect fit for the screen
      fitNetworkToScreen(allRoads);
      
      setLoadingProgress(100);
      
      setTimeout(() => {
        setIsLoading(false);
      }, 500);

    } catch (error) {
      console.error('Failed to load road data:', error);
      setIsLoading(false);
    }
  };

  // Setup canvas with proper sizing for navbar/footer
  const setupCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      
      // Account for navbar (typically 80px) and any footer
      const navbarHeight = 80; // Adjust this to match your navbar height
      const footerHeight = 0;  // Adjust if you have a footer
      
      const availableWidth = window.innerWidth;
      const availableHeight = window.innerHeight - navbarHeight - footerHeight;
      
      // Set canvas size to fill available space
      canvas.width = availableWidth * dpr;
      canvas.height = availableHeight * dpr;
      canvas.style.width = availableWidth + 'px';
      canvas.style.height = availableHeight + 'px';
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      // Recalculate fit when screen size changes
      if (roads.length > 0) {
        fitNetworkToScreen(roads);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  };

  // Convert lat/lon to screen coordinates (accounting for proper canvas size)
  const projectToScreen = (lat: number, lon: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    // Use actual canvas dimensions for projection
    const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
    const canvasHeight = canvas.height / (window.devicePixelRatio || 1);

    const x = (lon - viewport.centerLon) * viewport.zoom + canvasWidth / 2;
    const y = (viewport.centerLat - lat) * viewport.zoom + canvasHeight / 2;
    return { x, y };
  };

  // Draw roads
  const drawRoads = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get actual display dimensions
    const displayWidth = canvas.width / (window.devicePixelRatio || 1);
    const displayHeight = canvas.height / (window.devicePixelRatio || 1);

    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, displayWidth, displayHeight);

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

  // Remove the toggleRoadType function since we don't need it anymore

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
  }, [isLoading, roads, viewport]); // Only need viewport dependency

  return (
    <div className="fixed inset-0" style={{ top: '80px' }}>
      {/* Canvas positioned below navbar */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 bg-black"
      />

      {/* Loading Screen Only */}
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
    </div>
  );
};

export default AutoAnalytixBackground;