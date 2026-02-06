"use client";

import React from "react";

export function BackgroundEffects() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#020202]">

            {/* 1. Dynamic Perspective Grid */}
            <div className="absolute inset-0 perspective-[500px] opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] transform rotate-x-[60deg] origin-top animate-grid-move" />
            </div>

            {/* 2. Global Noise Texture (High Frequency) */}
            <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

            {/* 3. Intense Ambient Glows (Vibrant) */}
            <div className="absolute top-[-20%] left-[10%] w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[150px] mix-blend-screen animate-pulse-slow" />
            <div className="absolute bottom-[-20%] right-[0%] w-[900px] h-[900px] bg-[#F24E1E]/15 rounded-full blur-[150px] mix-blend-screen animate-pulse-slow delay-1000" />

            {/* 4. Global Scanline Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_4px] opacity-20 pointer-events-none" />
            <div className="absolute inset-0 w-full h-[2px] bg-white/5 opacity-20 animate-scanline pointer-events-none" />

            {/* 5. Vignette */}
            <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%]" />
        </div>
    );
}
