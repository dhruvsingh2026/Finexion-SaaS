import React from 'react'

export const WorldMap: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-40 select-none">
      {/* Soft Cyan Center Glow */}
      <div className="absolute w-[600px] h-[350px] bg-[#129FE3]/15 rounded-full blur-3xl -z-10" />

      <svg
        viewBox="0 0 1000 480"
        className="w-full max-w-5xl h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dotPattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="1.5" fill="#129FE3" opacity="0.65" />
          </pattern>
          <radialGradient id="mapFade" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stop-color="#fff" stop-opacity="1" />
            <stop offset="100%" stop-color="#fff" stop-opacity="0" />
          </radialGradient>
          <mask id="mapMask">
            <rect width="1000" height="480" fill="url(#mapFade)" />
          </mask>
        </defs>

        <g mask="url(#mapMask)">
          {/* North America */}
          <path
            d="M120 70 Q160 50 250 80 Q320 110 300 200 Q240 220 200 210 Q160 250 140 180 Z"
            fill="url(#dotPattern)"
          />
          {/* South America */}
          <path
            d="M240 240 Q310 240 330 310 Q310 420 270 440 Q240 370 230 300 Z"
            fill="url(#dotPattern)"
          />
          {/* Europe */}
          <path
            d="M450 70 Q540 60 560 130 Q510 170 450 150 Q430 110 450 70 Z"
            fill="url(#dotPattern)"
          />
          {/* Africa */}
          <path
            d="M450 180 Q560 180 570 270 Q540 370 490 390 Q440 310 430 230 Z"
            fill="url(#dotPattern)"
          />
          {/* Asia */}
          <path
            d="M580 60 Q760 40 850 140 Q840 230 730 250 Q660 220 590 150 Z"
            fill="url(#dotPattern)"
          />
          {/* Australia */}
          <path
            d="M740 310 Q830 300 850 360 Q810 410 740 390 Q720 350 740 310 Z"
            fill="url(#dotPattern)"
          />

          {/* Connected Network Arcs */}
          <path
            d="M240 140 Q400 90 520 120"
            stroke="#129FE3"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.6"
          />
          <path
            d="M520 120 Q620 100 680 180"
            stroke="#129FE3"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.6"
          />
        </g>

        {/* Pin 1: USA Flag Pin (New York) */}
        <g transform="translate(240, 130)">
          <circle cx="0" cy="0" r="10" fill="#FFFFFF" stroke="#129FE3" strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))" />
          <circle cx="0" cy="0" r="6" fill="#002868" />
          <circle cx="0" cy="0" r="2" fill="#BF0A30" />
        </g>

        {/* Pin 2: UAE Flag Pin (Dubai) */}
        <g transform="translate(630, 210)">
          <circle cx="0" cy="0" r="10" fill="#FFFFFF" stroke="#129FE3" strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))" />
          <circle cx="0" cy="0" r="6" fill="#00732F" />
          <rect x="-4" y="-2" width="8" height="4" fill="#FFFFFF" />
          <rect x="-4" y="2" width="8" height="2" fill="#000000" />
        </g>

        {/* Pin 3: London/Europe Red Accent Pin */}
        <g transform="translate(485, 115)">
          <circle cx="0" cy="0" r="8" fill="#EF4444" opacity="0.25" className="animate-ping" />
          <circle cx="0" cy="0" r="5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  )
}
