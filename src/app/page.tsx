"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-4 font-sans text-white">

      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-white text-[#09090B] font-black text-xl mb-6">S</div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Sign in to Shivkara Student</h1>
          <p className="mt-2 text-sm text-[#A1A1AA]">
            Welcome back. Please enter your details.
          </p>
        </div>

        <Card className="bg-[#09090B] border-[#27272A] shadow-none">
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#E4E4E7]">Email</label>
              <input
                type="email"
                placeholder="student@shivkara.com"
                className="w-full h-10 px-3 rounded-md bg-[#18181B] border border-[#27272A] text-sm text-white placeholder:text-[#52525B] focus:outline-none focus:ring-2 focus:ring-white/20 transition-all shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#E4E4E7]">Password</label>
              <input
                type="password"
                className="w-full h-10 px-3 rounded-md bg-[#18181B] border border-[#27272A] text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all shadow-sm"
              />
            </div>
          </CardContent>

          <CardFooter className="pt-2 flex flex-col gap-4">
            <Link href="/dashboard" className="w-full">
              <button className="w-full h-10 bg-white text-[#09090B] font-medium text-sm rounded-md hover:bg-[#E4E4E7] transition-colors flex items-center justify-center gap-2">
                Sign In <ArrowRight size={16} />
              </button>
            </Link>
            <p className="text-center text-xs text-[#52525B]">
              Don't have an account? <span className="text-white hover:underline cursor-pointer">Contact Faculty</span>
            </p>
          </CardFooter>
        </Card>

      </div>

    </div>
  );
}
