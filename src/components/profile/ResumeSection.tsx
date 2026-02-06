"use client";

import React from "react";
import { UploadCloud, FileText, Trash2, Eye } from "lucide-react";

export function ResumeSection() {
    return (
        <div className="space-y-8 animate-in fade-in leading-relaxed">
            <div>
                <h2 className="text-xl font-bold text-white">Resume</h2>
                <p className="text-sm text-zinc-500 mt-1">Manage your professional CV for recruitment opportunities.</p>
            </div>

            {/* Existing Resume Item */}
            <div className="bg-[#0A0A0A] border border-white/[0.08] rounded-xl p-6 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-[#F24E1E]/10 flex items-center justify-center text-[#F24E1E]">
                        <FileText size={20} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-white">Vansh_Gehlot_CV_2026.pdf</div>
                        <div className="text-xs text-zinc-500 mt-0.5">Uploaded on Feb 01, 2026 • 2.4 MB</div>
                    </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-white/5 rounded text-zinc-400 hover:text-white transition-colors" title="View">
                        <Eye size={16} />
                    </button>
                    <button className="p-2 hover:bg-red-500/10 rounded text-zinc-400 hover:text-red-500 transition-colors" title="Delete">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            {/* Upload Area */}
            <div className="border border-dashed border-white/10 rounded-xl p-12 flex flex-col items-center text-center hover:bg-white/[0.02] hover:border-white/20 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center mb-4 text-zinc-500">
                    <UploadCloud size={20} />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Click to upload or drag and drop</h3>
                <p className="text-xs text-zinc-500 max-w-xs">
                    PDF, DOCX up to 10MB. Make sure your contact details are up to date in the file.
                </p>
            </div>
        </div>
    );
}
