import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Link as LinkIcon, CheckCircle, Clock, AlertTriangle, UploadCloud, FileCode } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

export default function AssignmentsPage() {
    return (
        <div className="space-y-10">
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/10 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                    <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest">Active Bootcamp Phase</span>
                </div>
                <h1 className="text-5xl font-black text-white tracking-tighter mb-2">MISSION <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] to-[#FF8A00]">LOG.</span></h1>
                <p className="text-gray-400 max-w-2xl">Execute directives with precision. Deployments are graded on code quality, speed, and aesthetics.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Active Mission Card */}
                <GlassCard className="p-8 border-t-4 border-t-[#FF4D00] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-32 bg-[#FF4D00] opacity-[0.03] blur-[80px] rounded-full pointer-events-none group-hover:opacity-[0.06] transition-opacity"></div>

                    <div className="flex justify-between items-start mb-8 relative z-10">
                        <div className="px-3 py-1.5 rounded-md bg-[#FF4D00]/10 border border-[#FF4D00]/20 text-[#FF4D00] text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                            <Clock size={12} /> Priority Alpha
                        </div>
                        <div className="text-right">
                            <div className="text-white font-mono font-bold text-2xl tracking-tighter">02:45:00</div>
                            <div className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">T-Minus</div>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-3">Landing Page V1</h2>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed font-light">
                        Replicate the "Saasify" landing page. Your file must be handoff-ready. <br />
                        <span className="text-gray-500 mt-2 block font-mono text-xs border-l-2 border-[#FF4D00]/50 pl-2">Constraints: Auto-layout everywhere. Max 4 distinct colors. Variables for spacing.</span>
                    </p>

                    <div className="bg-black/60 rounded-xl p-6 border border-white/5 mb-6 backdrop-blur-sm relative">
                        <label className="block text-[10px] font-mono uppercase text-gray-500 mb-2 tracking-widest">Deployment URL</label>
                        <div className="flex gap-2">
                            <div className="flex-1 relative group/input">
                                <LinkIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within/input:text-[#FF4D00] transition-colors" />
                                <input
                                    type="text"
                                    placeholder="figma.com/file/..."
                                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3.5 text-white focus:border-[#FF4D00]/50 focus:bg-white/10 outline-none transition-all text-sm font-mono placeholder:text-gray-700"
                                />
                            </div>
                            <MagneticButton>
                                <button className="px-6 py-3.5 bg-white text-black font-bold rounded-lg hover:bg-[#FF4D00] hover:text-white transition-colors uppercase text-xs tracking-wider flex items-center gap-2">
                                    <UploadCloud size={16} /> Deploy
                                </button>
                            </MagneticButton>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-gray-600 font-mono uppercase tracking-widest">
                        <span><AlertTriangle size={10} className="inline mb-0.5" /> Access: Viewer Only</span>
                        <span>Rev: 1.0.4</span>
                    </div>
                </GlassCard>

                {/* Mission History */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-lg font-bold text-white">Archives</h3>
                        <span className="text-xs text-gray-500 font-mono">2 / 12 Completed</span>
                    </div>

                    {/* Graded Item */}
                    <GlassCard className="p-6 opacity-80 hover:opacity-100 transition-all border-l-2 border-l-green-500 hover:translate-x-1 duration-300">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-lg font-bold text-white flex items-center gap-2">
                                <FileCode size={18} className="text-gray-500" /> Figma Basics
                            </span>
                            <span className="px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-bold uppercase rounded flex items-center gap-1 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                                <CheckCircle size={10} /> Passed
                            </span>
                        </div>

                        <div className="p-4 bg-white/5 rounded-lg border border-white/5 relative mt-4">
                            <div className="absolute -top-1.5 left-4 px-2 bg-[#050505] text-[9px] text-gray-500 uppercase tracking-widest border border-white/10 rounded">Faculty Feedback</div>
                            <p className="text-sm text-gray-300 italic mb-3 font-light">"Good use of constraints. Next time, try to name your layers more descriptively."</p>

                            <a href="#" className="flex items-center gap-3 text-[#FF4D00] hover:text-white transition-colors group">
                                <span className="w-6 h-6 rounded-full bg-[#FF4D00]/20 flex items-center justify-center group-hover:bg-[#FF4D00] group-hover:text-black transition-colors">
                                    <Clock size={12} />
                                </span>
                                <span className="text-xs font-bold uppercase tracking-wider">Watch Video Analysis</span>
                            </a>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-6 opacity-50 hover:opacity-80 transition-all border-l-2 border-l-gray-700 hover:translate-x-1 duration-300">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-lg font-bold text-gray-400">Moodboard Setup</span>
                            <span className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-bold uppercase rounded flex items-center gap-1">
                                <CheckCircle size={10} /> Elite
                            </span>
                        </div>
                        <p className="text-xs text-gray-600 font-mono">Submission: figma.com/file/abc...</p>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
