"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
    { name: "Unit 1", score: 85, status: "Completed" },
    { name: "Unit 2", score: 92, status: "Completed" },
    { name: "Unit 3", score: 78, status: "Review" },
    { name: "Unit 4", score: 65, status: "Active" },
    { name: "Unit 5", score: 0, status: "Pending" },
    { name: "Mid-Term", score: 88, status: "Completed" },
    { name: "Final", score: 0, status: "Locked" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-black/90 border border-white/10 p-3 rounded-lg backdrop-blur-md shadow-xl">
                <p className="text-white font-bold text-sm mb-1">{label}</p>
                <p className="text-[#F24E1E] text-xs font-mono">
                    Score: {payload[0].value}%
                </p>
                <p className="text-zinc-500 text-[10px] uppercase tracking-wider mt-1">
                    {payload[0].payload.status}
                </p>
            </div>
        );
    }
    return null;
};

export function AssignmentChart() {
    return (
        <Card className="col-span-1 lg:col-span-2 border-white/5 bg-white/[0.02]">
            <CardHeader>
                <CardTitle className="text-base text-zinc-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F24E1E]"></span>
                    Recent Activity
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%" minHeight={200}>
                        <BarChart data={data} barSize={40}>
                            <XAxis
                                dataKey="name"
                                stroke="#52525b"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                dy={10}
                            />
                            <YAxis
                                stroke="#52525b"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}%`}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                            <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.score > 0 ? '#F24E1E' : '#27272a'}
                                        className="hover:opacity-80 transition-opacity cursor-pointer"
                                        style={{
                                            filter: `drop-shadow(0px 4px 8px ${entry.score > 0 ? 'rgba(242, 78, 30, 0.2)' : 'transparent'})`
                                        }}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
