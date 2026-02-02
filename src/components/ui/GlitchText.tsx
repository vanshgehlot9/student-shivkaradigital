"use client";

import React from "react";

export default function GlitchText({ text, className = "" }: { text: string, className?: string }) {
    return (
        <div className={`relative inline-block group ${className}`}>
            <span className="relative z-10">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-[#FF3D00] opacity-0 group-hover:opacity-70 animate-glitch translate-x-[2px]">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-[#00F3FF] opacity-0 group-hover:opacity-70 animate-glitch -translate-x-[2px] delay-75">{text}</span>
        </div>
    );
}
