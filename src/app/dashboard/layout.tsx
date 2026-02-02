import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`min-h-screen bg-[#09090B] text-white flex ${inter.className}`}>

            {/* Sidebar Navigation */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 ml-64 min-h-screen">
                <div className="max-w-[1200px] mx-auto p-8 md:p-12">
                    {children}
                </div>
            </main>

            <Toaster />
        </div>
    );
}
