"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Activity, BookOpen, CheckSquare, Clock } from "lucide-react";

export default function StudentDashboard() {
    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-white tracking-tight">Overview</h1>
                    <p className="text-[#A1A1AA] text-sm mt-1">Welcome back, Vansh. Here's what's happening today.</p>
                </div>
                <div className="text-sm text-[#71717A] bg-[#18181B] px-3 py-1 rounded border border-[#27272A]">
                    Feb 02, 2026
                </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricCard
                    title="Assignments Due"
                    value="2"
                    sub="1 High Priority"
                    icon={CheckSquare}
                />
                <MetricCard
                    title="Bootcamp Progress"
                    value="12%"
                    sub="Foundations Phase"
                    icon={BookOpen}
                />
                <MetricCard
                    title="Current Streak"
                    value="5 Days"
                    sub="Keep it up!"
                    icon={Activity}
                />
            </div>

            {/* Main Content Split */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left: Active Tasks */}
                <div className="md:col-span-2 space-y-4">
                    <h2 className="text-lg font-medium text-white">Priority Tasks</h2>

                    <Card className="bg-[#09090B] border-[#27272A]">
                        <CardHeader className="border-b border-[#27272A] p-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-white">Landing Page V1</span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#7F1D1D]/20 text-[#F87171] border border-[#7F1D1D]/30 uppercase">High Priority</span>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4">
                            <p className="text-sm text-[#A1A1AA] mb-4 leading-relaxed">
                                Replicate the SaaS landing page structure using auto-layout. Ensure all constraints are set correctly for responsiveness.
                            </p>
                            <div className="flex items-center gap-4 text-xs text-[#71717A]">
                                <span className="flex items-center gap-1"><Clock size={12} /> Due Today at 5pm</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#09090B] border-[#27272A] opacity-75">
                        <CardHeader className="border-b border-[#27272A] p-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-white">Component Library Init</span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#18181B] text-[#A1A1AA] border border-[#27272A] uppercase">Upcoming</span>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4">
                            <p className="text-sm text-[#A1A1AA]">
                                Set up the basic folder structure for your design system components.
                            </p>
                        </CardContent>
                    </Card>

                </div>

                {/* Right: Recent Activity / Feed */}
                <div className="space-y-4">
                    <h2 className="text-lg font-medium text-white">Recent Activity</h2>
                    <div className="space-y-6 pt-2">
                        <ActivityItem
                            text="Assignments 'Figma Basics' graded"
                            time="2h ago"
                        />
                        <ActivityItem
                            text="New resource added: 'Auto Layout Guide'"
                            time="5h ago"
                        />
                        <ActivityItem
                            text="Joined session 'Design Systems I'"
                            time="Yesterday"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

function MetricCard({ title, value, sub, icon: Icon }: any) {
    return (
        <Card className="bg-[#09090B] border-[#27272A]">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-sm font-medium text-[#A1A1AA]">{title}</span>
                    <Icon size={16} className="text-[#52525B]" />
                </div>
                <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
                <p className="text-xs text-[#52525B] mt-1">{sub}</p>
            </CardContent>
        </Card>
    )
}

function ActivityItem({ text, time }: { text: string, time: string }) {
    return (
        <div className="flex gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#27272A] mt-2 flex-shrink-0" />
            <div>
                <p className="text-sm text-[#E4E4E7]">{text}</p>
                <p className="text-xs text-[#52525B]">{time}</p>
            </div>
        </div>
    )
}
