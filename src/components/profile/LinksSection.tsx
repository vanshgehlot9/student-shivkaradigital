"use client";

import React from "react";
import { Link2, Plus, Github, Linkedin, Globe } from "lucide-react";

export function LinksSection() {
    return (
        <div className="space-y-8 animate-in fade-in leading-relaxed">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white">Example Links</h2>
                    <p className="text-sm text-zinc-500 mt-1">Profile links visible to recruiters.</p>
                </div>
                <button className="flex items-center gap-2 text-xs font-bold text-[#F24E1E] uppercase tracking-wider hover:bg-[#F24E1E]/10 px-3 py-2 rounded-lg transition-colors">
                    <Plus size={14} />
                    Add Link
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {/* LinkedIn */}
                <div className="bg-[#0A0A0A] border border-white/[0.08] rounded-xl p-4 flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded bg-[#0077b5]/10 flex items-center justify-center text-[#0077b5]">
                            <Linkedin size={20} />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-white">LinkedIn</div>
                            <div className="text-xs text-zinc-500 mt-0.5">linkedin.com/in/vanshgehlot</div>
                        </div>
                    </div>
                    <button className="text-xs text-zinc-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">Edit</button>
                </div>

                {/* GitHub */}
                <div className="bg-[#0A0A0A] border border-white/[0.08] rounded-xl p-4 flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-white">
                            <Github size={20} />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-white">GitHub</div>
                            <div className="text-xs text-zinc-500 mt-0.5">github.com/vanshgehlot</div>
                        </div>
                    </div>
                    <button className="text-xs text-zinc-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">Edit</button>
                </div>

                {/* Portfolio */}
                <div className="bg-[#0A0A0A] border border-white/[0.08] rounded-xl p-4 flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded bg-[#F24E1E]/10 flex items-center justify-center text-[#F24E1E]">
                            <Globe size={20} />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-white">Portfolio</div>
                            <div className="text-xs text-zinc-500 mt-0.5">vansh.design</div>
                        </div>
                    </div>
                    <button className="text-xs text-zinc-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">Edit</button>
                </div>
            </div>
        </div>
    );
}
