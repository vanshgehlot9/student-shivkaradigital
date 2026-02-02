"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    CheckSquare,
    BookOpen,
    BarChart2,
    Settings,
    LogOut
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
        <div className="w-64 h-screen border-r border-[#27272A] bg-[#09090B] flex flex-col fixed left-0 top-0">
            {/* Logo Area */}
            <div className="p-6 border-b border-[#27272A]">
                <div className="flex items-center gap-2 font-bold text-white tracking-tight">
                    <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center text-black text-xs font-black">S</div>
                    <span>SHIVKARA</span>
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
                                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-white text-black"
                                    : "text-[#A1A1AA] hover:text-white hover:bg-[#27272A]"
                            )}
                        >
                            <item.icon size={16} />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer / User Profile */}
            <div className="p-4 border-t border-[#27272A]">
                <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#27272A] cursor-pointer transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-[#27272A] border border-[#3F3F46] flex items-center justify-center text-xs font-medium text-white group-hover:bg-[#3F3F46]">
                        VG
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">Vansh Gehlot</p>
                        <p className="text-xs text-[#71717A] truncate">Student</p>
                    </div>
                    <Settings size={14} className="text-[#71717A] group-hover:text-white" />
                </div>
            </div>
        </div>
    );
}
