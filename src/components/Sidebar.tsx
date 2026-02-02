"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    CheckSquare,
    BookOpen,
    BarChart2,
    Settings
} from "lucide-react";

const navItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Assignments", icon: CheckSquare, href: "/dashboard/assignments" },
    { name: "Resources", icon: BookOpen, href: "/dashboard/resources" },
    { name: "Performance", icon: BarChart2, href: "/dashboard/performance" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 h-screen border-r border-white/[0.08] bg-[#020204]/80 backdrop-blur-xl flex flex-col fixed left-0 top-0 z-50">
            {/* Logo Area */}
            <div className="p-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-indigo-500/20">S</div>
                    <span className="font-semibold text-white tracking-tight">Shivkara</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                                isActive
                                    ? "text-white bg-white/[0.08]"
                                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                            )}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-indigo-500 rounded-r-full shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
                            )}
                            <item.icon size={18} className={cn("transition-colors", isActive ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-300")} />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer / User Profile */}
            <div className="p-4 border-t border-white/[0.08] bg-black/20">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/[0.05] cursor-pointer transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-xs font-medium text-white group-hover:border-indigo-500/50 transition-colors">
                        VG
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate group-hover:text-indigo-300 transition-colors">Vansh Gehlot</p>
                        <p className="text-xs text-zinc-500 truncate">Student Account</p>
                    </div>
                    <Settings size={14} className="text-zinc-600 group-hover:text-white transition-colors" />
                </div>
            </div>
        </div>
    );
}
