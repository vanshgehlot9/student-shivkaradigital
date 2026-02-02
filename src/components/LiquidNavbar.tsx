"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Terminal, Zap, Layers, LogOut } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
    { name: "Command Center", icon: Home, path: "/dashboard" },
    { name: "Missions", icon: Terminal, path: "/dashboard/assignments" },
    { name: "Resources", icon: Layers, path: "/dashboard/resources" },
];

export default function LiquidNavbar() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 pointer-events-none">
            <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl px-2 py-2 flex items-center gap-2 pointer-events-auto shadow-[0_10px_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
                {/* Liquid Glow Effect */}
                <div className="absolute inset-0 liquid-gradient opacity-20 pointer-events-none"></div>

                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link href={item.path} key={item.path} className="relative group">
                            <div className={`
                                px-4 py-3 rounded-xl flex items-center gap-2 transition-all duration-300
                                ${isActive ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white hover:bg-white/5'}
                            `}>
                                <item.icon size={20} className={isActive ? 'text-[#FF4D00]' : ''} />
                                <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'block' : 'hidden group-hover:block transition-all duration-300'}`}>
                                    {item.name}
                                </span>
                            </div>
                            {isActive && (
                                <motion.div
                                    layoutId="nav-highlight"
                                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#FF4D00] rounded-full shadow-[0_0_10px_#FF4D00]"
                                />
                            )}
                        </Link>
                    )
                })}

                <div className="w-[1px] h-6 bg-white/10 mx-1"></div>

                <button className="px-3 py-3 rounded-xl text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-colors">
                    <LogOut size={20} />
                </button>
            </div>
        </div>
    );
}
