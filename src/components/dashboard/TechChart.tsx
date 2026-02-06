"use client";

import React, { useState, useEffect } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Activity } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";

interface PerformanceData {
    name: string;
    score: number;
    status: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-black border border-[#F24E1E]/30 p-4 rounded-none shadow-[0_0_15px_rgba(242,78,30,0.2)]">
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Unit {label}</div>
                <div className="text-2xl font-bold text-white tabular-nums">
                    {payload[0].value}<span className="text-sm text-zinc-500">%</span>
                </div>
                <div className="text-xs text-[#F24E1E] font-mono mt-1">
                    {'>'} {payload[0].payload.status}
                </div>
            </div>
        );
    }
    return null;
};

export function TechChart() {
    const [data, setData] = useState<PerformanceData[]>([]);

    useEffect(() => {
        const fetchPerformanceData = async () => {
            try {
                // Fetch last 6 assignment scores for the user
                const q = query(
                    collection(db, "assignments"),
                    orderBy("deadline", "desc"),
                    limit(6)
                );
                const snapshot = await getDocs(q);

                if (!snapshot.empty) {
                    const metrics = snapshot.docs.map((doc, index) => {
                        const d = doc.data();
                        return {
                            name: String(index + 1).padStart(2, '0'),
                            score: d.score || 0,
                            status: d.status || 'Pending'
                        };
                    }).reverse();
                    setData(metrics);
                }
            } catch (error) {
                console.error("Error fetching performance data:", error);
            }
        };

        fetchPerformanceData();
    }, []);

    return (
        <Card className="col-span-1 lg:col-span-2 border-white/[0.08] bg-[#0A0A0A] relative overflow-hidden group">

            {/* Holographic Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-white/20" />
            <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-white/20" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-white/20" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-white/20" />

            <CardHeader className="relative z-10">
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-zinc-300 text-sm font-bold uppercase tracking-wider">
                        <Activity size={16} className="text-[#F24E1E]" />
                        Performance Metrics
                    </div>
                </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10">
                <div className="h-[300px] w-full mt-4">
                    {data.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-zinc-500 text-sm font-mono">
                            No performance data available
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%" minHeight={200}>
                            <BarChart data={data} barSize={20}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    stroke="rgba(255,255,255,0.05)"
                                />
                                <XAxis
                                    dataKey="name"
                                    stroke="#52525b"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    dy={10}
                                    tickFormatter={(val) => `U-${val}`}
                                />
                                <YAxis
                                    stroke="#52525b"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}%`}
                                />
                                <Tooltip
                                    content={<CustomTooltip />}
                                    cursor={{ fill: 'rgba(242, 78, 30, 0.05)' }}
                                />
                                <Bar dataKey="score" radius={[2, 2, 0, 0]}>
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.score > 0 ? '#F24E1E' : '#27272a'}
                                            className="transition-all duration-300 hover:opacity-100 opacity-80"
                                            style={{
                                                filter: entry.score > 0 ? 'drop-shadow(0 0 8px rgba(242, 78, 30, 0.4))' : 'none'
                                            }}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

