"use client";

import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen relative font-sans text-zinc-100 selection:bg-white/20">
            <BackgroundEffects />

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center bg-[#050505]/80 backdrop-blur-xl border-b border-white/10">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-white tracking-tighter">
                        SHIVKARA<span className="text-[#F24E1E]">.</span>
                    </span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-lg border border-white/10 hover:bg-white/5 active:scale-95 transition-all text-white"
                >
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            <div className="flex">

                {/* Desktop Sidebar */}
                <div className="hidden lg:block w-64 fixed left-0 top-0 h-screen z-50">
                    <Sidebar />
                </div>

                {/* Mobile Sidebar Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
                            />
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="fixed left-0 top-16 bottom-0 w-64 z-50 lg:hidden border-r border-white/10 bg-[#050505]"
                            >
                                <Sidebar isMobile onClose={() => setIsMobileMenuOpen(false)} />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Main Content Area */}
                <main className="flex-1 w-full lg:ml-64 min-h-screen relative bg-transparent pt-20 lg:pt-0">
                    <div className="max-w-[1400px] mx-auto p-4 lg:p-12 relative z-10 w-full overflow-x-hidden">
                        {children}
                    </div>
                </main>

                <Toaster />
            </div>
        </div>
    );
}
