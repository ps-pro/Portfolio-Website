// app/projects/autoanalytix/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import AutoAnalytixBackground from '@/components/main/AutoAnalytixBackground';

interface ProjectAspect {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  metrics: string[];
  color: string;
}

export default function AutoAnalytixPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const projectAspects: ProjectAspect[] = [
    {
      id: 'data-engineering',
      title: 'Data Engineering',
      subtitle: 'ETL Pipeline & Infrastructure',
      description: 'Engineered robust ETL pipeline processing massive sensor data streams from fleet vehicles with enterprise-grade reliability and performance.',
      metrics: [
        '11 vehicles monitored',
        '95%+ data retention rate',
        '1M+ sensor readings processed',
        'Real-time data ingestion'
      ],
      color: 'green'
    },
    {
      id: 'data-analytics',
      title: 'Data Analytics',
      subtitle: 'Anomaly Detection & Intelligence',
      description: 'Deployed advanced cross-sensor anomaly detection algorithms to identify fleet inefficiencies and security threats in real-time operations.',
      metrics: [
        '936 fuel theft events detected',
        '42.3% fleet utilization calculated',
        'Cross-sensor anomaly detection',
        'Real-time monitoring algorithms'
      ],
      color: 'cyan'
    },
    {
      id: 'business-intelligence',
      title: 'Business Intelligence',
      subtitle: 'ROI Analysis & Cost Optimization',
      description: 'Quantified operational inefficiencies and projected cost savings through automated reporting and intelligent risk classification systems.',
      metrics: [
        '$385K inefficiency costs identified',
        '$192K projected annual savings',
        '4-tier risk classification system',
        'Automated reporting dashboard'
      ],
      color: 'purple'
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return {
          border: 'border-green-500',
          bg: 'bg-green-500',
          text: 'text-green-400',
          hover: 'hover:border-green-400 hover:shadow-green-500/20'
        };
      case 'cyan':
        return {
          border: 'border-cyan-500',
          bg: 'bg-cyan-500',
          text: 'text-cyan-400',
          hover: 'hover:border-cyan-400 hover:shadow-cyan-500/20'
        };
      case 'purple':
        return {
          border: 'border-purple-500',
          bg: 'bg-purple-500',
          text: 'text-purple-400',
          hover: 'hover:border-purple-400 hover:shadow-purple-500/20'
        };
      default:
        return {
          border: 'border-gray-500',
          bg: 'bg-gray-500',
          text: 'text-gray-400',
          hover: 'hover:border-gray-400 hover:shadow-gray-500/20'
        };
    }
  };

  return (
    <>
      {/* Google Fonts for Automotive Theme */}
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&family=Exo+2:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>

      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Background Network Animation */}
        <AutoAnalytixBackground />
        
        {/* Left Content Panel - 33% WIDTH */}
        <div className="fixed left-0 top-0 bottom-0 w-[33%] z-20 flex flex-col">
          {/* Main Content Container - Full Height */}
          <div className="flex-1 flex flex-col justify-start px-8 py-8">
            {/* Transparent Panel - No Background */}
            <div className="h-full flex flex-col">
              
              {/* Project Header */}
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-3"></div>
                  <span 
                    className="text-green-400 text-base tracking-widest uppercase font-bold"
                    style={{ 
                      fontFamily: "'Rajdhani', sans-serif",
                      letterSpacing: '0.2em'
                    }}
                  >
                    FLEET ANALYTICS
                  </span>
                </div>
                
                <h1 
                  className="text-7xl font-black text-white mb-8 tracking-tight leading-none"
                  style={{ 
                    fontFamily: "'Orbitron', monospace",
                    fontWeight: 900,
                    textShadow: '0 0 20px rgba(0, 255, 65, 0.3)'
                  }}
                >
                  Auto<span className="text-green-400">AnalytiX</span>
                </h1>
                
                <p 
                  className="text-gray-200 leading-relaxed text-xl font-medium"
                  style={{ 
                    fontFamily: "'Exo 2', sans-serif",
                    lineHeight: '1.6',
                    fontWeight: 500
                  }}
                >
                  Fleet telemetry analytics platform delivering real-time insights, 
                  anomaly detection, and cost optimization for modern fleet management.
                </p>
              </div>

              {/* Analytics Modules - Accordion Style */}
              <div className="space-y-3 mb-8 flex-1">
                {projectAspects.map((aspect) => {
                  const colors = getColorClasses(aspect.color);
                  const isExpanded = expandedSection === aspect.id;
                  
                  return (
                    <div key={aspect.id} className="border-2 border-white/20 rounded-lg overflow-hidden">
                      {/* Accordion Header */}
                      <button
                        onClick={() => toggleSection(aspect.id)}
                        className={`w-full text-left p-6 transition-all duration-300 ${colors.border} ${colors.hover} hover:shadow-xl group hover:scale-[1.01] bg-black/10 backdrop-blur-sm border-2`}
                        style={{
                          borderStyle: 'solid',
                          borderImage: 'linear-gradient(45deg, transparent, currentColor, transparent) 1'
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 
                              className="text-white font-bold text-xl mb-1"
                              style={{ 
                                fontFamily: "'Rajdhani', sans-serif",
                                fontWeight: 700
                              }}
                            >
                              {aspect.title}
                            </h3>
                            <p 
                              className="text-gray-400 text-sm font-medium"
                              style={{ 
                                fontFamily: "'Exo 2', sans-serif",
                                letterSpacing: '0.05em'
                              }}
                            >
                              {aspect.subtitle}
                            </p>
                          </div>
                          <div className={`w-8 h-8 border-2 border-current rounded-lg transition-transform duration-300 flex items-center justify-center ${isExpanded ? 'rotate-45' : ''}`}>
                            <div className="relative">
                              <div className="w-4 h-0.5 bg-current"></div>
                              <div className="w-0.5 h-4 bg-current absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                            </div>
                          </div>
                        </div>
                      </button>

                      {/* Accordion Content */}
                      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-6 bg-black/20 backdrop-blur-sm">
                          <p 
                            className="text-gray-300 mb-4 leading-relaxed text-base"
                            style={{ 
                              fontFamily: "'Exo 2', sans-serif",
                              lineHeight: '1.7'
                            }}
                          >
                            {aspect.description}
                          </p>
                          
                          <div className="space-y-2">
                            {aspect.metrics.map((metric, index) => (
                              <div key={index} className="flex items-center space-x-3">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <span 
                                  className="text-gray-300 font-medium"
                                  style={{ 
                                    fontFamily: "'Exo 2', sans-serif"
                                  }}
                                >
                                  {metric}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mt-auto">
                <a
                  href="https://github.com/ps-research/AutoAnalytiX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-8 py-4 bg-green-600/80 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-green-500/90 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{ 
                    fontFamily: "'Rajdhani', sans-serif",
                    letterSpacing: '0.05em'
                  }}
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                  VIEW SOURCE
                </a>
                
                <Link
                  href="/projects"
                  className="flex items-center px-8 py-4 border-2 border-white/30 text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                  style={{ 
                    fontFamily: "'Rajdhani', sans-serif",
                    letterSpacing: '0.05em'
                  }}
                >
                  ← ALL PROJECTS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}