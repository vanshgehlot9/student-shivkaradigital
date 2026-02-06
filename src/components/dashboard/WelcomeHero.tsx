"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function WelcomeHero() {
    const [text, setText] = useState("");
    const fullText = "READY TO EXECUTE, VANSH?";

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, i + 1));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative mb-12 py-8 overflow-hidden">
            {/* Background Glitch Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F24E1E]/50 to-transparent opacity-20" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-20" />

            <div className="flex flex-col md:flex-row items-baseline gap-4">
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase relative z-10">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
                        {text}
                    </span>
                    <span className="animate-pulse text-[#F24E1E]">_</span>
                </h1>
            </div>
        </div>
    );
}
