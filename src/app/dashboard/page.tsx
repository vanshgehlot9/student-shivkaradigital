"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Activity, BookOpen, CheckSquare, Clock, Zap, Target } from "lucide-react";

export default function StudentDashboard() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-4">

            {/* Header Area */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Afternoon, Vansh</h1>
                    <p className="text-zinc-400 mt-2 text-base">You've completed 75% of your goals for the Foundations module.</p>
                </div>
                <div className="flex gap-4">
                    <div className="text-right">
                        <div className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Cohort Rank</div>
                        <div className="text-xl font-bold text-white">#04</div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Total XP</div>
                        <div className="text-xl font-bold text-indigo-400">450</div>
                    </div>
                </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PremiumMetricCard
                    title="Assignments"
                    value="2 Pending"
                    sub="1 High Priority"
                    icon={CheckSquare}
                    gradient="from-orange-500/20 to-red-500/5"
                    accentColor="text-orange-400"
                />
                <PremiumMetricCard
                    title="Course Progress"
                    value="12%"
                    sub="Foundations Phase"
                    icon={BookOpen}
                    gradient="from-blue-500/20 to-cyan-500/5"
                    accentColor="text-blue-400"
                />
                <PremiumMetricCard
                    title="Activity Streak"
                    value="5 Days"
                    sub="Personal Best: 12"
                    icon={Zap}
                    gradient="from-purple-500/20 to-indigo-500/5"
                    accentColor="text-purple-400"
                />
            </div>

            {/* Main Content Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left: Active Tasks */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                            <Target size={18} className="text-indigo-500" />
                            Priority Focus
                        </h2>
                    </div>

                    <Card className="group cursor-pointer">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-lg font-medium text-white group-hover:text-indigo-400 transition-colors">Landing Page V1</h3>
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">Active Mission</span>
                                    </div>
                                    <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
                                        Reconstruct the 'Saasify' landing page using advanced Auto-Layout techniques. Ensure pixel-perfect responsiveness across 3 breakpoints.
                                    </p>
                                </div>
                                <div className="p-3 rounded-xl bg-white/[0.05] border border-white/[0.05] group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-all">
                                    <Clock size={20} className="text-zinc-400 group-hover:text-indigo-400" />
                                </div>
                            </div>

                            <div className="w-full h-1 bg-white/[0.05] rounded-full overflow-hidden">
                                <div className="h-full w-3/4 bg-gradient-to-r from-indigo-500 to-purple-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-zinc-500 font-medium">
                                <span>Progress: 75%</span>
                                <span>Due Today @ 5pm</span>
                            </div>
                        </div>
                    </Card>

                    <Card className="opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-not-allowed">
                        <div className="p-6 flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-medium text-zinc-300">Design Systems I</h3>
                                <p className="text-sm text-zinc-500">Locked until previous mission complete.</p>
                            </div>
                            <div className="px-3 py-1 bg-white/[0.05] rounded text-xs text-zinc-500 font-mono">LOCKED</div>
                        </div>
                    </Card>

                </div>

                {/* Right: Activity Feed */}
                <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Activity size={18} className="text-zinc-500" />
                        Live Feed
                    </h2>
                    <div className="space-y-0 relative">
                        {/* Timeline Line */}
                        <div className="absolute left-[19px] top-2 bottom-2 w-[1px] bg-white/[0.08]"></div>

                        <ActivityItem
                            text="Assignment 'Figma Basics' graded"
                            time="2h ago"
                            type="success"
                        />
                        <ActivityItem
                            text="New Resource: 'Auto Layout Guide'"
                            time="5h ago"
                            type="info"
                        />
                        <ActivityItem
                            text="Joined session 'Design Systems I'"
                            time="Yesterday"
                            type="neutral"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

function PremiumMetricCard({ title, value, sub, icon: Icon, gradient, accentColor }: any) {
    return (
        <Card className="relative overflow-hidden group">
            <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${gradient} blur-2xl opacity-40 group-hover:opacity-60 transition-opacity`}></div>
            <div className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-sm font-medium text-zinc-400">{title}</span>
                    <div className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.05]">
                        <Icon size={16} className="text-zinc-300" />
                    </div>
                </div>
                <div className={`text-3xl font-bold tracking-tight text-white mb-1 group-hover:${accentColor} transition-colors`}>{value}</div>
                <p className="text-xs text-zinc-500 font-medium">{sub}</p>
            </div>
        </Card>
    )
}

function ActivityItem({ text, time, type }: { text: string, time: string, type: 'success' | 'info' | 'neutral' }) {
    const colors = {
        success: "bg-emerald-500 shadow-emerald-500/20",
        info: "bg-blue-500 shadow-blue-500/20",
        neutral: "bg-zinc-500 shadow-zinc-500/20"
    }

    return (
        <div className="flex gap-4 p-3 hover:bg-white/[0.02] rounded-lg transition-colors relative z-10">
            <div className={`w-2.5 h-2.5 rounded-full mt-2 flex-shrink-0 shadow-lg ${colors[type]}`} />
            <div>
                <p className="text-sm text-zinc-300 font-medium leading-normal">{text}</p>
                <p className="text-xs text-zinc-600 mt-1">{time}</p>
            </div>
        </div>
    )
}
