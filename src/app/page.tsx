"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Lock, Loader2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Access Denied",
        description: "Invalid credentials. Please verify your identity.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-[#000000] flex font-sans text-white selection:bg-[#F24E1E]">

      {/* Left: Industrial Visual Portal */}
      <div className="hidden lg:flex flex-1 relative bg-[#050505] items-center justify-center overflow-hidden">
        {/* Magma Glows - Amplified */}
        <div className="absolute top-[-20%] left-[-10%] w-[900px] h-[900px] bg-[#F24E1E]/20 rounded-full blur-[140px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-orange-600/10 rounded-full blur-[120px] mix-blend-screen"></div>

        {/* Abstract Grid/Mesh */}
        <div className="relative z-10 w-full max-w-lg p-12">
          <div className="w-16 h-16 rounded-2xl bg-[#F24E1E] flex items-center justify-center shadow-[0_0_30px_rgba(242,78,30,0.6)] mb-10 border border-white/20">
            <span className="text-3xl font-bold text-white">S</span>
          </div>
          <h1 className="text-6xl font-bold tracking-tighter mb-6 leading-none text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            Design.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F24E1E] to-orange-400">Manufacture.</span><br />
            Deploy.
          </h1>
          <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-md border-l-2 border-[#F24E1E] pl-6 mt-8">
            Welcome to the Shivkara Design Lab. <br /> Your industrial journey details await.
          </p>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative overflow-y-auto">
        {/* Background noise for depth */}
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 mix-blend-overlay"></div>

        <div className="w-full max-w-sm space-y-8 relative z-10">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold tracking-tight text-white">Identity Verification</h2>
            <p className="mt-2 text-sm text-zinc-500">Access the secure student portal.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Email Coordinates</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@shivkara.com"
                className="w-full h-12 px-4 rounded-lg bg-white/[0.03] border border-white/[0.1] text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-[#F24E1E] focus:bg-white/[0.05] focus:shadow-[0_0_15px_rgba(242,78,30,0.2)] transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Passkey</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-12 px-4 rounded-lg bg-white/[0.03] border border-white/[0.1] text-sm text-white focus:outline-none focus:border-[#F24E1E] focus:bg-white/[0.05] focus:shadow-[0_0_15px_rgba(242,78,30,0.2)] transition-all"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#F24E1E] hover:bg-[#D43D13] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold text-sm rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(242,78,30,0.4)] hover:shadow-[0_0_30px_rgba(242,78,30,0.6)] hover:scale-[1.02]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} /> Verifying...
                  </>
                ) : (
                  <>
                    Initialize Session <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-600 uppercase tracking-widest mt-12">
            <Lock size={10} /> Secure Connection • ShivkaraNet
          </div>
        </div>
      </div>

    </div>
  );
}

