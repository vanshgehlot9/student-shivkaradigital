"use client";

import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020204] flex font-sans text-white overflow-hidden">

      {/* Left: Visual Portal */}
      <div className="hidden lg:flex flex-1 relative bg-[#05050A] items-center justify-center overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen"></div>

        {/* Abstract Grid/Mesh */}
        <div className="relative z-10 w-full max-w-lg p-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30 mb-8">
            <span className="text-3xl font-bold">S</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-4 leading-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            Master the Future of Design.
          </h1>
          <p className="text-xl text-zinc-400 font-light leading-relaxed">
            Join the elite cohort of designers and engineers building the next generation of digital products.
          </p>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        {/* Background noise for depth */}
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5"></div>

        <div className="w-full max-w-sm space-y-8 relative z-10">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-semibold tracking-tight text-white">Welcome back</h2>
            <p className="mt-2 text-sm text-zinc-400">Enter your credentials to access the portal.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider ml-1">Email Address</label>
              <input
                type="email"
                placeholder="name@shivkara.com"
                className="w-full h-11 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider ml-1">Password</label>
              <input
                type="password"
                className="w-full h-11 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all"
              />
            </div>

            <Link href="/dashboard" className="block pt-2">
              <button className="w-full h-11 bg-white text-black font-semibold text-sm rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                Sign In <ArrowRight size={16} />
              </button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-600 uppercase tracking-widest mt-8">
            <Lock size={10} /> Secured by Shivkara Identity
          </div>
        </div>
      </div>

    </div>
  );
}
