"use client";

import { useRef } from "react";
import { MotionValue, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Terminal, Zap, Layers } from "lucide-react";

export default function LiquidDock() {
    let mouseX = useMotionValue(Infinity);

    return (
        <div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 flex h-16 items-end gap-4 rounded-2xl bg-white/[0.05] px-4 pb-3 backdrop-blur-md border border-white/10 z-50 pointer-events-auto"
        >
            <AppIcon mouseX={mouseX} href="/dashboard" icon={<Home size={24} />} />
            <AppIcon mouseX={mouseX} href="/dashboard/assignments" icon={<Terminal size={24} />} />
            <AppIcon mouseX={mouseX} href="/dashboard/resources" icon={<Layers size={24} />} />
            <AppIcon mouseX={mouseX} href="/dashboard/profile" icon={<Zap size={24} />} />
        </div>
    );
}

function AppIcon({ mouseX, href, icon }: { mouseX: MotionValue, href: string, icon: React.ReactNode }) {
    let ref = useRef<HTMLDivElement>(null);

    let distance = useTransform(mouseX, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    let widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link href={href}>
            <motion.div
                ref={ref}
                style={{ width }}
                className={`aspect-square rounded-full flex items-center justify-center relative group
                    ${isActive ? 'bg-[#00F3FF] text-black shadow-[0_0_20px_#00F3FF]' : 'bg-gray-800 text-gray-400 hover:bg-white/20 hover:text-white'}
                `}
            >
                {icon}
            </motion.div>
        </Link>
    );
}
