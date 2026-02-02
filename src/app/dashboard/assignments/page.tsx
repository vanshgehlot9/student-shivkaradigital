"use client";

import React from "react";
import { Link as LinkIcon, ChevronRight, Filter } from "lucide-react";

export default function AssignmentsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#27272A]">
                <div>
                    <h1 className="text-2xl font-semibold text-white tracking-tight">Assignments</h1>
                    <p className="text-[#A1A1AA] text-sm mt-1">Manage and submit your bootcamp tasks.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#18181B] border border-[#27272A] text-xs text-[#A1A1AA] hover:text-white transition-colors">
                        <Filter size={14} /> Filter
                    </button>
                    <button className="px-3 py-1.5 rounded-md bg-white text-black text-xs font-medium hover:bg-[#E4E4E7] transition-colors">
                        New Submission
                    </button>
                </div>
            </div>

            {/* Assignments Table */}
            <div className="w-full border border-[#27272A] rounded-lg overflow-hidden bg-[#09090B]">
                <table className="w-full text-left text-sm">
                    <thead className="bg-[#18181B] border-b border-[#27272A] text-[#A1A1AA]">
                        <tr>
                            <th className="px-6 py-3 font-medium">Assignment</th>
                            <th className="px-6 py-3 font-medium">Status</th>
                            <th className="px-6 py-3 font-medium">Due Date</th>
                            <th className="px-6 py-3 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#27272A]">
                        {/* Row 1 */}
                        <tr className="hover:bg-[#18181B]/50 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="font-medium text-white">Landing Page V1</div>
                                <div className="text-xs text-[#71717A] mt-0.5">Replicate Saasify using auto-layout.</div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#7F1D1D]/20 text-[#F87171] border border-[#7F1D1D]/30">
                                    High Priority
                                </span>
                            </td>
                            <td className="px-6 py-4 text-[#A1A1AA]">Today, 5:00 PM</td>
                            <td className="px-6 py-4">
                                <button className="text-white hover:underline text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Submit <ChevronRight size={14} />
                                </button>
                            </td>
                        </tr>

                        {/* Row 2 */}
                        <tr className="hover:bg-[#18181B]/50 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="font-medium text-white">Figma Basics</div>
                                <div className="text-xs text-[#71717A] mt-0.5">Intro to frames and constraints.</div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#064E3B]/20 text-[#34D399] border border-[#064E3B]/30">
                                    Completed
                                </span>
                            </td>
                            <td className="px-6 py-4 text-[#A1A1AA]">Jan 28, 2026</td>
                            <td className="px-6 py-4">
                                <span className="text-[#A1A1AA] text-xs">Grade: A</span>
                            </td>
                        </tr>

                        {/* Row 3 */}
                        <tr className="hover:bg-[#18181B]/50 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="font-medium text-white">Design Systems I</div>
                                <div className="text-xs text-[#71717A] mt-0.5">Atomic design principles.</div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#18181B] text-[#A1A1AA] border border-[#27272A]">
                                    Locked
                                </span>
                            </td>
                            <td className="px-6 py-4 text-[#A1A1AA]">Feb 05, 2026</td>
                            <td className="px-6 py-4">
                                <span className="text-[#52525B] text-xs">Unlock required</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
