import { Outfit } from "next/font/google";
import LiquidDock from "@/components/LiquidDock";
import { Toaster } from "@/components/ui/toaster";

const outfit = Outfit({ subsets: ["latin"] });

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`min-h-screen bg-[var(--void-black)] text-white overflow-x-hidden ${outfit.className} cursor-crosshair`}>
            {/* Global Neural Grid */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] invert theme-transition"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00F3FF] to-transparent opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF3D00] to-transparent opacity-50"></div>
            </div>

            {/* Main Content */}
            <main className="relative z-10 max-w-[1600px] mx-auto px-6 py-12 pb-32">
                {children}
            </main>

            {/* Liquid Dock Navigation */}
            <LiquidDock />
            <Toaster />
        </div>
    );
}
