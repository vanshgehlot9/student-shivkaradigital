"use client";

import React from "react";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { TechChart } from "@/components/dashboard/TechChart";
import { TacticalFeed } from "@/components/dashboard/TacticalFeed";
import { WelcomeHero } from "@/components/dashboard/WelcomeHero";

export default function StudentDashboard() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">

            {/* 1. Command Center Hero */}
            <WelcomeHero />

            {/* 2. Stats Cards Section */}
            <section>
                <DashboardStats />
            </section>

            {/* 3. Charts & Feed Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Tech Chart — Recent Assignments */}
                <TechChart />

                {/* Tactical Feed — Upcoming Schedule */}
                <TacticalFeed />
            </div>

        </div>
    );
}
