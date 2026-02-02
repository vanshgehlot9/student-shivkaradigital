import Link from "next/link";
import { ArrowRight, User, School } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl w-full text-center space-y-12">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
            SHIVKARA <span className="text-orange-500">STUDENT</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The industrial operating system for next-generation talent.
            Access your bootcamp, submissions, and credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Student Portal */}
          <Link href="/dashboard" className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-blue-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative h-full p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-sky-500/50 transition-all flex flex-col items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                <User size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Student Portal</h2>
                <p className="text-sm text-gray-400">Access your dashboard, assignments, and referrals.</p>
              </div>
              <div className="mt-auto pt-4 flex items-center gap-2 text-sky-400 font-bold text-sm uppercase tracking-wider">
                Enter Dashboard <ArrowRight size={16} />
              </div>
            </div>
          </Link>

          {/* Faculty Portal */}
          <Link href="/faculty" className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative h-full p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all flex flex-col items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                <School size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Faculty Hub</h2>
                <p className="text-sm text-gray-400">Manage sessions, grade submissions, and review metrics.</p>
              </div>
              <div className="mt-auto pt-4 flex items-center gap-2 text-orange-400 font-bold text-sm uppercase tracking-wider">
                Faculty Access <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
