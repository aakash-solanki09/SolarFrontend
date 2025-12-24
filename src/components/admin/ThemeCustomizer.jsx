import React, { useState, useRef } from 'react';
import { Check, Info, Palette, Pen } from 'lucide-react';
import { cn } from '../../lib/utils';
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'; // Removed Shadcn
// import Label from '@/components/common/Label'; // Removed

const COLOR_DESCRIPTIONS = {
  primary: {
    default: '(Buttons and headers)',
    active: '(Hover state)',
    inverse: '(Text on primary)',
    light: '(Background accents)',
    clarity: '(Transparent overlays)'
  },
  secondary: {
    default: '(Backgrounds)',
    active: '(Cards and surfaces)',
    inverse: '(Text on secondary)',
    light: '(Subtle backgrounds)',
    clarity: '(Transparent overlays)'
  }
};

const PRESETS = [
  {
    name: 'Emerald',
    colors: {
      primary: {
        default: '#1bb57f',
        active: '#17a673',
        light: '#c7f0e3',
        clarity: '#1bb57f33',
        inverse: '#ffffff'
      },
      secondary: {
        default: '#F9F9F9',
        active: '#FCFCFC',
        light: '#FFFFFF',
        clarity: '#f9f9f933',
        inverse: '#4B5675'
      }
    }
  },
  {
    name: 'Ocean',
    colors: {
      primary: {
        default: '#2563eb',
        active: '#1d4ed8',
        light: '#dbeafe',
        clarity: '#2563eb33',
        inverse: '#ffffff'
      },
      secondary: {
        default: '#f8fafc',
        active: '#f1f5f9',
        light: '#e2e8f0',
        clarity: '#f8fafc33',
        inverse: '#0f172a'
      }
    }
  },
  {
    name: 'Sunset',
    colors: {
      primary: {
        default: '#ea580c',
        active: '#c2410c',
        light: '#ffedd5',
        clarity: '#ea580c33',
        inverse: '#ffffff'
      },
      secondary: {
        default: '#fff7ed',
        active: '#ffedd5',
        light: '#fed7aa',
        clarity: '#fff7ed33',
        inverse: '#431407'
      }
    }
  }
];

const createSegmentPath = (startAngle, endAngle, innerRadius, outerRadius) => {
  const x1 = 50 + outerRadius * Math.cos((Math.PI * startAngle) / 180);
  const y1 = 50 + outerRadius * Math.sin((Math.PI * startAngle) / 180);
  const x2 = 50 + outerRadius * Math.cos((Math.PI * endAngle) / 180);
  const y2 = 50 + outerRadius * Math.sin((Math.PI * endAngle) / 180);

  const x3 = 50 + innerRadius * Math.cos((Math.PI * endAngle) / 180);
  const y3 = 50 + innerRadius * Math.sin((Math.PI * endAngle) / 180);
  const x4 = 50 + innerRadius * Math.cos((Math.PI * startAngle) / 180);
  const y4 = 50 + innerRadius * Math.sin((Math.PI * startAngle) / 180);

  if (innerRadius === 0) {
    return `M50,50 L${x1},${y1} A${outerRadius},${outerRadius} 0 0,1 ${x2},${y2} Z`;
  }
  return `M${x4},${y4} L${x1},${y1} A${outerRadius},${outerRadius} 0 0,1 ${x2},${y2} L${x3},${y3} A${innerRadius},${innerRadius} 0 0,0 ${x4},${y4} Z`;
};

const THEME_SEGMENTS = [
  // Primary (Left)
  { section: 'primary', key: 'default', start: 162, end: 234, inner: 20, outer: 48 },
  { section: 'primary', key: 'active', start: 90, end: 162, inner: 20, outer: 48 },
  { section: 'primary', key: 'light', start: 234, end: 270, inner: 20, outer: 48 },
  { section: 'primary', key: 'inverse', start: 90, end: 234, inner: 0, outer: 20 },
  { section: 'primary', key: 'clarity', start: 234, end: 270, inner: 0, outer: 20 },

  // Secondary (Right)
  { section: 'secondary', key: 'default', start: 306, end: 18, inner: 20, outer: 48 },
  { section: 'secondary', key: 'active', start: 18, end: 90, inner: 20, outer: 48 },
  { section: 'secondary', key: 'light', start: 270, end: 306, inner: 20, outer: 48 },
  { section: 'secondary', key: 'inverse', start: 306, end: 90, inner: 0, outer: 20 },
  { section: 'secondary', key: 'clarity', start: 270, end: 306, inner: 0, outer: 20 }
];

export default function ThemeCustomizer({ theme, onThemeChange, onPresetChange }) {
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const svgRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const scaleX = 100 / rect.width;
    const scaleY = 100 / rect.height;
    const svgX = x * scaleX;
    const svgY = y * scaleY;

    const dx = svgX - 50;
    const dy = svgY - 50;
    const distance = Math.sqrt(dx * dx + dy * dy);

    let angle = Math.atan2(dx, -dy) * (180 / Math.PI);
    if (angle < 0) angle += 360;
    const dataAngle = (angle + 270) % 360;

    const EPSILON = 0.01;
    const sortedSegments = [...THEME_SEGMENTS].sort((a, b) => a.outer - b.outer);

    const match = sortedSegments.find((seg) => {
      if (distance < seg.inner - EPSILON || distance > seg.outer + EPSILON) return false;
      if (seg.start > seg.end) {
        return dataAngle >= seg.start || dataAngle <= seg.end;
      } else {
        return dataAngle >= seg.start && dataAngle <= seg.end;
      }
    });

    if (match) {
      setHoveredSegment({ section: match.section, key: match.key });
    }
  };

  return (
    <div className="space-y-8">
      {/* Presets */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Presets</label>
        <div className="flex flex-wrap gap-4">
          <div className="h-16 w-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors bg-transparent" title="Custom">
             <Pen className="h-6 w-6 text-gray-400" />
          </div>
          {PRESETS.map((preset) => (
            <div key={preset.name} className="group relative cursor-pointer" onClick={() => onPresetChange(preset.colors)}>
              <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-transparent hover:border-blue-500 hover:scale-105 transition-all shadow-md">
                <div className="h-full w-1/2 float-left" style={{ backgroundColor: preset.colors.primary.default }}></div>
                <div className="h-full w-1/2 float-left" style={{ backgroundColor: preset.colors.secondary.default }}></div>
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {preset.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Customizer */}
      <div className="flex flex-col md:flex-row items-start gap-12 bg-white p-6 rounded-xl border border-gray-200">
        
        {/* Left: The Wheel */}
        <div className="relative h-64 w-64 shrink-0 mx-auto md:mx-0">
          <svg
            ref={svgRef}
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-xl mt-4"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredSegment(null)}
          >
            <rect x="0" y="0" width="100" height="100" fill="transparent" />
            {THEME_SEGMENTS.map((seg) => {
              const color = theme?.[seg.section]?.[seg.key] || '#cccccc';
              const isHovered = hoveredSegment?.section === seg.section && hoveredSegment?.key === seg.key;
              return (
                <g
                  key={`${seg.section}-${seg.key}`}
                  className="cursor-pointer transition-opacity duration-200"
                  onClick={() => {
                    document.getElementById(`color-input-${seg.section}-${seg.key}`)?.click();
                  }}
                  style={{ opacity: hoveredSegment && !isHovered ? 0.6 : 1 }}
                >
                  <path
                    d={createSegmentPath(seg.start, seg.end, seg.inner, seg.outer)}
                    fill={color}
                    stroke="white"
                    strokeWidth="1"
                  />
                </g>
              );
            })}
          </svg>

          {/* Hidden Inputs */}
          {['primary', 'secondary'].map((section) =>
            Object.keys(theme?.[section] || {}).map((key) => { // Safely iterate keys if they exist
                 const val = theme?.[section]?.[key];
              return (
                <input
                  key={`${section}-${key}`}
                  id={`color-input-${section}-${key}`}
                  type="color"
                  className="sr-only"
                  value={val}
                  onChange={(e) => onThemeChange(section, key, e.target.value)}
                />
              );
            })
          )}
        </div>

        {/* Right: Legend */}
        <div className="flex-1 w-full flex flex-col gap-6">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 p-1 shadow-sm h-full min-h-[300px]">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 h-full flex flex-col items-center justify-center text-center space-y-4">
              <h4 className="font-semibold text-xs text-gray-400 uppercase tracking-wider">Active Selection</h4>
              
              {hoveredSegment ? (
                <div className="space-y-4 w-full">
                  <div 
                    className="relative mx-auto w-24 h-24 rounded-full shadow-lg ring-4 ring-white transition-colors"
                    style={{ backgroundColor: theme[hoveredSegment.section][hoveredSegment.key] }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <span className="bg-black/50 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-md">Click to Edit</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold capitalize text-primary">
                      {hoveredSegment.section} <span className="text-gray-900">{hoveredSegment.key}</span>
                    </h3>
                    <p className="text-gray-500 font-medium">{COLOR_DESCRIPTIONS[hoveredSegment.section]?.[hoveredSegment.key]}</p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-xs font-mono border border-gray-200">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme[hoveredSegment.section][hoveredSegment.key] }} />
                    {theme[hoveredSegment.section][hoveredSegment.key]}
                  </div>
                </div>
              ) : (
                <div className="py-8 text-gray-400 flex flex-col items-center gap-3">
                  <Palette className="h-10 w-10 opacity-20" />
                  <p className="text-sm">Hover over the color wheel segments to reveal detailed usage information.</p>
                </div>
              )}
            </div>
          </div>
          
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-sm">Primary Context</span>
                </div>
                <p className="text-xs text-gray-500">Defines your main brand identity (Buttons, Active states).</p>
             </div>
             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-gray-600" />
                    <span className="font-semibold text-sm">Secondary Context</span>
                </div>
                <p className="text-xs text-gray-500">Supporting visual hierarchy (Backgrounds, Cards).</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
