// components/autoanalytix/AutoAnalytixBackground.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Road {
  start: { lat: number; lon: number };
  end: { lat: number; lon: number };
  type: 'highways' | 'arterials';
}

interface AlertDot {
  id: number;
  road: Road;
  position: number;        // 0.0 to 1.0 along the road (fixed position)
  life: number;           // 1.0 to 0.0 countdown
  pulsePhase: number;     // For SOS pulse animation
  startTime: number;      // When this dot was created
}

const AutoAnalytixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const lastSpawnRef = useRef<number>(0);
  const alertIdRef = useRef<number>(0);
  const alertDotsRef = useRef<AlertDot[]>([]);
  const lastTimeRef = useRef<number>(0);
  
  // State
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [roads, setRoads] = useState<Road[]>([]);
  
  const [viewport, setViewport] = useState({
    centerLat: 37.55,
    centerLon: -122.25,
    zoom: 1200
  });

  // Hardcoded Alert System Settings
  const ALERT_SETTINGS = {
    maxDots: 500,           // Target number of active dots
    spawnRate: 80,          // Milliseconds between spawns
    dotLifespan: 1000,      // 1 second lifespan
    dotSize: 2.5,           // Small dot size
    alertColor: '#FF0000',  // Bright red
    pulseSpeed: 0.15        // SOS pulse animation speed
  };

  // Road styles (same as your perfected version)
  const roadStyles = {
    highways: { color: '#00ff41', width: 3 },
    arterials: { color: '#00cc33', width: 2 }
  };

  // Calculate bounds and fit perfectly to browser screen (YOUR EXACT SETTINGS)
  const fitNetworkToScreen = (roadData: Road[]) => {
    if (roadData.length === 0) return;

    let minLat = Infinity, maxLat = -Infinity;
    let minLon = Infinity, maxLon = -Infinity;

    roadData.forEach(road => {
      minLat = Math.min(minLat, road.start.lat, road.end.lat);
      maxLat = Math.max(maxLat, road.start.lat, road.end.lat);
      minLon = Math.min(minLon, road.start.lon, road.end.lon);
      maxLon = Math.max(maxLon, road.start.lon, road.end.lon);
    });

    // YOUR EXACT SETTINGS - preserved!
    const centerLat = (minLat + maxLat) / 2;
    const centerLon = (minLon + maxLon) / 2 - 0.2; // Your right-side cutoff

    const latSpan = maxLat - minLat;
    const lonSpan = maxLon - minLon;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const navbarHeight = 80;
    
    const availableWidth = viewportWidth;
    const availableHeight = viewportHeight - navbarHeight;

    // YOUR EXACT ZOOM CALCULATION - preserved!
    const zoomForLongitude = (availableWidth * 1.0) / lonSpan;
    const zoomForLatitude = (availableHeight * 1.8) / latSpan;
    const perfectZoom = Math.min(zoomForLongitude, zoomForLatitude);

    setViewport({ centerLat, centerLon, zoom: perfectZoom });
  };

  // Load road data (your exact approach)
  const loadRoadData = async () => {
    try {
      setLoadingProgress(10);
      
      const layers = [
        { name: 'highways', file: '/GeoData/bay_area_roads_highways.geojson' },
        { name: 'arterials', file: '/GeoData/bay_area_roads_arterials.geojson' }
      ];

      const allRoads: Road[] = [];

      for (let i = 0; i < layers.length; i++) {
        const layer = layers[i];
        setLoadingProgress(30 + (i * 35));

        try {
          const response = await fetch(layer.file);
          if (!response.ok) throw new Error(`Failed to load ${layer.name}`);

          const geoData = await response.json();
          
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
          }
        } catch (error) {
          console.error(`Error loading ${layer.name}:`, error);
        }
      }

      console.log(`✅ Loaded road network: ${allRoads.length} roads`);
      setRoads(allRoads);
      fitNetworkToScreen(allRoads);
      setLoadingProgress(100);
      
      setTimeout(() => setIsLoading(false), 500);
    } catch (error) {
      console.error('Failed to load road data:', error);
      setIsLoading(false);
    }
  };

  // Setup canvas (same as before)
  const setupCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const navbarHeight = 80;
      
      const availableWidth = window.innerWidth;
      const availableHeight = window.innerHeight - navbarHeight;
      
      canvas.width = availableWidth * dpr;
      canvas.height = availableHeight * dpr;
      canvas.style.width = availableWidth + 'px';
      canvas.style.height = availableHeight + 'px';
      
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);

      if (roads.length > 0) fitNetworkToScreen(roads);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  };

  // Project coordinates to screen (same as before)
  const projectToScreen = (lat: number, lon: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
    const canvasHeight = canvas.height / (window.devicePixelRatio || 1);

    const x = (lon - viewport.centerLon) * viewport.zoom + canvasWidth / 2;
    const y = (viewport.centerLat - lat) * viewport.zoom + canvasHeight / 2;
    return { x, y };
  };

  // Create new alert dot
  const createAlertDot = (currentTime: number): AlertDot | null => {
    if (roads.length === 0) return null;

    // Pick random road (prefer highways for alerts)
    const highwayRoads = roads.filter(r => r.type === 'highways');
    const arterialRoads = roads.filter(r => r.type === 'arterials');
    
    const selectedRoads = Math.random() < 0.7 ? highwayRoads : arterialRoads;
    if (selectedRoads.length === 0) return null;

    const road = selectedRoads[Math.floor(Math.random() * selectedRoads.length)];
    
    return {
      id: alertIdRef.current++,
      road,
      position: Math.random(), // Random position along road
      life: 1.0,              // Full life
      pulsePhase: 0,          // Start pulse cycle
      startTime: currentTime
    };
  };

  // Update alert dots
  const updateAlertDots = (currentTime: number, deltaTime: number) => {
    // Spawn new dots if needed
    if (currentTime - lastSpawnRef.current > ALERT_SETTINGS.spawnRate && 
        alertDotsRef.current.length < ALERT_SETTINGS.maxDots) {
      const newDot = createAlertDot(currentTime);
      if (newDot) {
        alertDotsRef.current.push(newDot);
        lastSpawnRef.current = currentTime;
      }
    }

    // Update existing dots
    alertDotsRef.current = alertDotsRef.current.map(dot => {
      // Calculate life remaining
      const age = currentTime - dot.startTime;
      dot.life = Math.max(0, 1 - (age / ALERT_SETTINGS.dotLifespan));
      
      // Update pulse animation
      dot.pulsePhase += ALERT_SETTINGS.pulseSpeed;
      
      return dot;
    }).filter(dot => dot.life > 0);
  };

  // Draw roads (your exact rendering)
  const drawRoads = (ctx: CanvasRenderingContext2D) => {
    const displayWidth = canvasRef.current!.width / (window.devicePixelRatio || 1);
    const displayHeight = canvasRef.current!.height / (window.devicePixelRatio || 1);

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    Object.entries(roadStyles).forEach(([type, style]) => {
      const typeRoads = roads.filter(road => road.type === type);
      
      if (typeRoads.length === 0) return;
      
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

  // Draw alert dots with SOS pulse pattern
  const drawAlertDots = (ctx: CanvasRenderingContext2D) => {
    alertDotsRef.current.forEach(dot => {
      // Calculate position along road
      const lat = dot.road.start.lat + (dot.road.end.lat - dot.road.start.lat) * dot.position;
      const lon = dot.road.start.lon + (dot.road.end.lon - dot.road.start.lon) * dot.position;
      const pos = projectToScreen(lat, lon);

      // SOS pulse pattern: . . . - - - . . .
      // Short pulse: 0.2s on, 0.2s off
      // Long pulse: 0.6s on, 0.2s off
      const cycleTime = dot.pulsePhase % (Math.PI * 4); // 4-second cycle
      let pulseIntensity = 0;

      // Simple alert pulse - grows and shrinks
      const simpleGrow = Math.sin(dot.pulsePhase * 3) * 0.5 + 0.5;
      pulseIntensity = 0.3 + (simpleGrow * 0.7); // Pulse between 0.3 and 1.0

      // Size based on pulse and life remaining
      const baseSize = ALERT_SETTINGS.dotSize;
      const currentSize = baseSize * pulseIntensity;
      
      // Alpha fades out as life decreases
      const alpha = dot.life * 0.9; // Strong visibility throughout life

      // Draw the alert dot
      ctx.globalAlpha = alpha;
      ctx.fillStyle = ALERT_SETTINGS.alertColor;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, currentSize, 0, Math.PI * 2);
      ctx.fill();

      // Add slight glow for alert effect
      ctx.globalAlpha = alpha * 0.3;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, currentSize * 2, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  // Main animation loop
  const animate = (currentTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calculate delta time
    const deltaTime = lastTimeRef.current ? currentTime - lastTimeRef.current : 16;
    lastTimeRef.current = currentTime;

    // Update alert system
    updateAlertDots(currentTime, deltaTime);

    // Draw everything
    drawRoads(ctx);
    drawAlertDots(ctx);

    animationRef.current = requestAnimationFrame(animate);
  };

  // Effects
  useEffect(() => {
    const cleanup = setupCanvas();
    loadRoadData();
    return cleanup;
  }, []);

  useEffect(() => {
    if (!isLoading && roads.length > 0) {
      lastTimeRef.current = 0;
      animate(0);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isLoading, roads, viewport]);

  return (
    <div className="fixed inset-0" style={{ top: '80px' }}>
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 bg-black"
      />

      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="text-center text-green-400 font-mono">
            <div className="text-2xl mb-4">Initializing AutoAnalytix...</div>
            <div className="w-64 h-2 bg-gray-800 rounded">
              <div 
                className="h-full bg-green-400 rounded transition-all"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <div className="mt-2 text-sm opacity-75">
              Loading Bay Area fleet network
            </div>
          </div>
        </div>
      )}

      {/* Alert System Status (minimal, clean)
      {!isLoading && (
        <div className="fixed bottom-6 right-6 z-20 bg-black/70 border border-red-500 rounded-lg px-4 py-2 backdrop-blur-lg font-mono text-sm">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-400">ALERT SYSTEM ACTIVE</span>
            <span className="text-red-300">({alertDotsRef.current.length})</span>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default AutoAnalytixBackground;