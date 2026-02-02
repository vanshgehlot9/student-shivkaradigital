"use client";

import React from "react";
import { Filter, ChevronRight, Lock } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function AssignmentsPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Mission Log</h1>
                    <p className="text-zinc-400 text-sm mt-1">Manage current operations and submissions.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs text-zinc-300 hover:text-white hover:bg-white/[0.1] transition-colors font-medium">
                        <Filter size={14} /> Filter View
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">
                        New Submission
                    </button>
                </div>
            </div>

            {/* Premium Table Container */}
            <Card className="overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/[0.02] border-b border-white/[0.05] text-zinc-500 font-medium text-xs uppercase tracking-wider">
                        <tr>
                            <th className="px-8 py-4">Operation</th>
                            <th className="px-8 py-4">Status</th>
                            <th className="px-8 py-4">Timeline</th>
                            <th className="px-8 py-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.05]">
                        {/* High Priority Row */}
                        <tr className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                            <td className="px-8 py-5">
                                <div className="font-semibold text-white group-hover:text-indigo-400 transition-colors">Landing Page V1</div>
                                <div className="text-xs text-zinc-500 mt-1">Clone Saasify architecture.</div>
                            </td>
                            <td className="px-8 py-5">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                                    ACTIVE MISSION
                                </span>
                            </td>
                            <td className="px-8 py-5 text-zinc-400 font-mono text-xs">Due: 05:00 PM</td>
                            <td className="px-8 py-5">
                                <button className="text-indigo-400 hover:text-white text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                                    Proceed <ChevronRight size={14} />
                                </button>
                            </td>
                        </tr>

                        {/* Completed Row */}
                        <tr className="hover:bg-white/[0.02] transition-colors group">
                            <td className="px-8 py-5">
                                <div className="font-medium text-zinc-300">Figma Basics</div>
                                <div className="text-xs text-zinc-600 mt-1">Frames & Constraints.</div>
                            </td>
                            <td className="px-8 py-5">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                    COMPLETED
                                </span>
                            </td>
                            <td className="px-8 py-5 text-zinc-600 font-mono text-xs">Jan 28, 2026</td>
                            <td className="px-8 py-5">
                                <span className="text-emerald-500 text-xs font-bold">Grade: 98/100</span>
                            </td>
                        </tr>

                        {/* Locked Row */}
                        <tr className="bg-black/20 hover:bg-black/30 transition-colors group">
                            <td className="px-8 py-5 opacity-50">
                                <div className="font-medium text-zinc-500 flex items-center gap-2">
                                    Design Systems I <Lock size={12} />
                                </div>
                                <div className="text-xs text-zinc-700 mt-1">Atomic Principles.</div>
                            </td>
                            <td className="px-8 py-5">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-zinc-800 text-zinc-500 border border-zinc-700">
                                    LOCKED
                                </span>
                            </td>
                            <td className="px-8 py-5 text-zinc-700 font-mono text-xs">Feb 05, 2026</td>
                            <td className="px-8 py-5">
                                <span className="text-zinc-700 text-xs font-mono uppercase tracking-widest">Encrypted</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        </div>
    );
}
