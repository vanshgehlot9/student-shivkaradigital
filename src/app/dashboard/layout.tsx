```
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Search, Bell } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`min - h - screen bg - [#020204] text - white flex ${ inter.className } `}>
            
            {/* Sidebar Navigation */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 ml-64 min-h-screen relative">
                {/* Top Header */}
                <header className="h-16 border-b border-white/[0.08] bg-[#020204]/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">
                     <div className="text-sm font-medium text-zinc-400">Dashboard / <span className="text-white">Overview</span></div>
                     
                     <div className="flex items-center gap-4">
                         <div className="relative group">
                             <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                             <input 
                                type="text" 
                                placeholder="Search..." 
                                className="h-9 w-64 rounded-full bg-white/[0.05] border border-white/[0.05] pl-9 pr-4 text-xs text-white focus:outline-none focus:bg-white/[0.1] focus:border-white/[0.1] transition-all"
                             />
                         </div>
                         <button className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center hover:bg-white/[0.1] transition-colors relative">
                             <Bell size={14} className="text-zinc-400" />
                             <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-indigo-500 rounded-full border border-black"></span>
                         </button>
                     </div>
                </header>

                <div className="max-w-[1200px] mx-auto p-8 md:p-12 relative z-10">
                     {children}
                </div>
            </main>

            <Toaster />
        </div>
    );
}
