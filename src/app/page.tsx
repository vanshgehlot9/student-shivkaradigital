"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Fingerprint, ScanEye } from "lucide-react";
import GlitchText from "@/components/ui/GlitchText";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans">

      <AnimatePresence>
        {!unlocked ? (
          <motion.div
            exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
            className="text-center z-10 cursor-pointer group"
            onClick={() => setUnlocked(true)}
          >
            <div className="relative w-32 h-32 mx-auto mb-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-[#00F3FF] opacity-30 animate-ping"></div>
              <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-[#00F3FF] transition-colors duration-500"></div>
              <Fingerprint size={64} className="text-white group-hover:text-[#00F3FF] transition-colors duration-300" />
            </div>

            <h1 className="text-3xl font-bold text-white tracking-[0.5em] mb-2 uppercase">Identify</h1>
            <p className="text-[#00F3FF] text-xs font-mono animate-pulse">Touch to Authenticate</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="relative z-20 w-full max-w-lg"
          >
            <div className="glass-holo p-12 rounded-3xl text-center border-t border-t-[#00F3FF]/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00F3FF] to-transparent animate-scan"></div>

              <h2 className="text-4xl font-black text-white mb-2">ACCESS GRANTED</h2>
              <GlitchText text="WELCOME RECRUIT" className="text-xl text-gray-400 font-mono mb-12 block" />

              <Link href="/dashboard" className="block w-full">
                <button className="w-full py-4 bg-[#00F3FF] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-white transition-colors flex items-center justify-center gap-3">
                  Enter Neural Hub <ArrowRight size={18} />
                </button>
              </Link>

              <div className="mt-8 flex justify-center gap-4 text-[10px] text-gray-600 font-mono uppercase">
                <span className="flex items-center gap-1"><ScanEye size={12} /> Retina Verified</span>
                <span className="flex items-center gap-1">Encryption: AES-256</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
