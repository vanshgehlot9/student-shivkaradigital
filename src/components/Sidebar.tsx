"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Radio,
    BookOpen,
    ShieldCheck,
    Award,
    ScanFace,
    Share2,
    LogOut
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Sessions", href: "/dashboard/sessions", icon: Radio },
    { name: "Assignments", href: "/dashboard/assignments", icon: BookOpen },
    { name: "Attendance", href: "/dashboard/attendance", icon: ShieldCheck },
    { name: "Certificates", href: "/dashboard/certificates", icon: Award },
    { name: "Referrals", href: "/dashboard/referrals", icon: Share2 },
    { name: "Profile", href: "/dashboard/profile", icon: ScanFace },
];

interface SidebarProps {
    isMobile?: boolean;
    onClose?: () => void;
}

export default function Sidebar({ isMobile = false, onClose }: SidebarProps) {
    const pathname = usePathname();
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);
    const { signOut } = useAuth();

    return (
        <div className={cn(
            "h-full flex flex-col bg-[#050505]/80 backdrop-blur-xl border-r border-white/10",
            isMobile ? "w-full border-none" : "w-64 fixed left-0 top-0 z-50 border-r"
        )}>

            {/* Logo Area - Hide on mobile if rendered inside layout header, but show if inside drawer */}
            {/* For consistency, we'll keep it simple: Hide in desktop mode (since layout might handle it?) 
                Wait, keeping it consistent. The layout handles desktop positioning. 
                We'll hide logo in mobile drawer mode since header has it? 
                Actually nice to have it in drawer too. */}
            <div className="p-8 pb-10">
                <div className="flex items-center gap-2 group cursor-pointer">
                    <span className="text-2xl font-black text-white tracking-tighter transition-transform group-hover:scale-105">
                        SHIVKARA<span className="text-[#F24E1E]">.</span>
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            onMouseEnter={() => setHoveredPath(item.href)}
                            onMouseLeave={() => setHoveredPath(null)}
                            className={cn(
                                "relative flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-300",
                                isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                            )}
                        >
                            {/* Active/Hover Background */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeSidebar"
                                        className="absolute inset-0 bg-white/5 border border-white/10 rounded-lg"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                {hoveredPath === item.href && !isActive && (
                                    <motion.div
                                        layoutId="hoverSidebar"
                                        className="absolute inset-0 bg-white/[0.02] rounded-lg"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                            </AnimatePresence>

                            {/* Active Indicator Line */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[2px] bg-[#F24E1E] shadow-[0_0_10px_#F24E1E] rounded-r-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}

                            {/* Icon & Text */}
                            <div className="relative z-10 flex items-center gap-3">
                                <Icon
                                    size={18}
                                    className={cn(
                                        "transition-colors duration-300",
                                        isActive ? "text-[#F24E1E]" : "text-zinc-500 group-hover:text-zinc-300"
                                    )}
                                />
                                <span>{item.name}</span>
                            </div>

                            {/* Active Glow Effect */}
                            {isActive && (
                                <div className="absolute inset-0 bg-gradient-to-r from-[#F24E1E]/5 to-transparent rounded-lg opacity-50" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Status */}
            <div className="p-8 space-y-6">
                <button
                    onClick={() => signOut()}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-zinc-500 hover:text-white hover:bg-white/5 transition-colors group"
                >
                    <LogOut size={18} className="group-hover:text-red-500 transition-colors" />
                    <span>Sign Out</span>
                </button>

                <div>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        System Online
                    </div>
                    <div className="mt-2 text-[10px] text-zinc-700 font-mono">
                        v2.0.5 <span className="text-zinc-800">/ SHIVKARA</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
