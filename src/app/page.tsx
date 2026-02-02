"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Lock, User, Terminal, Code2, Cpu } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { GlassCard } from "@/components/ui/GlassCard";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Liquid Background */}
      <div className="absolute inset-0 liquid-gradient opacity-40 z-0"></div>

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0 mix-blend-overlay"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 z-0 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left: Brand / Intro */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#FF4D00] animate-pulse"></span>
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">System Online v2.0</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white">
            SHIVKARA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] to-[#FF8A00]">STUDENT</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            The industrial operating system for next-generation talent.
            <span className="text-white font-medium"> Access your bootcamp, track submissions, and verify credentials.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-xs font-bold text-gray-500">
                  <User size={16} />
                </div>
              ))}
            </div>
            <div className="flex flex-col text-left justify-center pl-2">
              <span className="font-bold text-white">450+ Students</span>
              <span className="text-xs text-gray-500">Joined this cohort</span>
            </div>
          </div>
        </div>

        {/* Right: Login Card */}
        <div className="lg:pl-12">
          <GlassCard className="glass-card-premium p-8 md:p-10 transform perspective-1000 hover:rotate-y-2 transition-transform duration-500">
            <div className="mb-8 text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#FF4D00] to-[#FF8A00] rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,77,0,0.3)] mb-6 animate-float">
                <Terminal size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Student Access</h2>
              <p className="text-sm text-gray-400">Authenticate to access your dashboard</p>
            </div>

            <div className="space-y-4">
              <MagneticButton className="w-full group">
                <Link href="/dashboard" className="flex items-center justify-center gap-3 w-full py-4 bg-white text-black font-bold uppercase tracking-wider text-sm rounded-xl hover:bg-gray-200 transition-colors relative overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">Enter Dashboard <ArrowRight size={18} /></span>
                </Link>
              </MagneticButton>

              <div className="border-t border-white/10 my-4"></div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors text-center group cursor-not-allowed">
                  <Code2 size={24} className="mx-auto text-gray-600 mb-2 group-hover:text-white transition-colors" />
                  <div className="text-xs font-mono text-gray-600">ID Verification</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors text-center group cursor-not-allowed">
                  <Cpu size={24} className="mx-auto text-gray-600 mb-2 group-hover:text-white transition-colors" />
                  <div className="text-xs font-mono text-gray-600">Hardware Check</div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">
                Restricted Access • Student ID Required
              </p>
            </div>
          </GlassCard>
        </div>

      </div>

      {/* Footer Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF4D00] to-transparent opacity-20"></div>
    </div>
  );
}
