"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Radar, Check, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";

interface FeedItem {
    id: string;
    title: string;
    time: string;
    type: 'live' | 'deadline' | 'task';
    status: 'pending' | 'done';
}

export function TacticalFeed() {
    const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
    const [scannedItems, setScannedItems] = useState<string[]>([]);

    useEffect(() => {
        const fetchFeedItems = async () => {
            try {
                // Fetch upcoming sessions and assignments
                const sessionsQuery = query(
                    collection(db, "sessions"),
                    orderBy("startTime", "asc"),
                    limit(2)
                );
                // Simplified query to avoid composite index requirement
                const assignmentsQuery = query(
                    collection(db, "assignments"),
                    orderBy("deadline", "asc"),
                    limit(6)
                );

                const [sessionsSnapshot, assignmentsSnapshot] = await Promise.all([
                    getDocs(sessionsQuery),
                    getDocs(assignmentsQuery)
                ]);

                const items: FeedItem[] = [];

                sessionsSnapshot.docs.forEach(doc => {
                    const data = doc.data();
                    items.push({
                        id: doc.id,
                        title: data.title,
                        time: data.startTime?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today',
                        type: 'live',
                        status: 'pending'
                    });
                });

                // Filter assignments client-side to avoid composite index requirement
                const filteredAssignments = assignmentsSnapshot.docs
                    .filter(doc => {
                        const status = doc.data().status;
                        return status === 'active' || status === 'upcoming' || !status;
                    })
                    .slice(0, 2);

                filteredAssignments.forEach(doc => {
                    const data = doc.data();
                    items.push({
                        id: doc.id,
                        title: data.title,
                        time: data.deadline?.toDate().toLocaleDateString() + ' Due',
                        type: 'deadline',
                        status: data.status === 'completed' ? 'done' : 'pending'
                    });
                });

                setFeedItems(items);
            } catch (error) {
                console.error("Error fetching feed items:", error);
            }
        };

        fetchFeedItems();
    }, []);

    const toggleItem = (id: string) => {
        setScannedItems(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    return (
        <Card className="col-span-1 border-white/[0.08] bg-[#0A0A0A] relative overflow-hidden h-full">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-zinc-300 text-sm font-bold uppercase tracking-wider">
                        <Radar size={16} className="text-blue-500 animate-spin-slow" />
                        Tactical Feed
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-1">
                    {feedItems.length === 0 ? (
                        <div className="text-center py-8 text-zinc-500 text-sm font-mono">
                            No upcoming events
                        </div>
                    ) : (
                        feedItems.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => toggleItem(item.id)}
                                className={cn(
                                    "group relative p-4 border-l-2 cursor-pointer transition-all duration-300 hover:bg-white/[0.02]",
                                    item.status === 'done' || scannedItems.includes(item.id)
                                        ? "border-emerald-500/50 opacity-50"
                                        : "border-[#F24E1E] bg-white/[0.02]"
                                )}
                            >
                                <div className="flex items-center justify-between relative z-10">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={cn(
                                                "text-[10px] font-mono uppercase px-1.5 py-0.5 rounded",
                                                item.type === 'live' ? "bg-red-500/10 text-red-500" :
                                                    item.type === 'deadline' ? "bg-amber-500/10 text-amber-500" :
                                                        "bg-zinc-800 text-zinc-500"
                                            )}>
                                                {item.type}
                                            </span>
                                            <span className="text-[10px] text-zinc-500 font-mono tracking-wider">
                                                {item.time}
                                            </span>
                                        </div>
                                        <h4 className="text-sm font-bold text-white group-hover:text-[#F24E1E] transition-colors">
                                            {item.title}
                                        </h4>
                                    </div>

                                    <div className={cn(
                                        "w-6 h-6 rounded flex items-center justify-center border transition-all",
                                        item.status === 'done' || scannedItems.includes(item.id)
                                            ? "bg-emerald-500/10 border-emerald-500 text-emerald-500"
                                            : "border-zinc-700 text-zinc-700 group-hover:border-[#F24E1E] group-hover:text-[#F24E1E]"
                                    )}>
                                        <Check size={12} />
                                    </div>
                                </div>

                                {/* Scanline Effect on Hover */}
                                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[#F24E1E]/50 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                            </div>
                        ))
                    )}
                </div>

                <button className="w-full mt-4 py-3 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-white hover:bg-white/5 border border-dashed border-white/10 rounded transition-all flex items-center justify-center gap-2">
                    View Full Intel <ChevronRight size={12} />
                </button>
            </CardContent>
        </Card>
    );
}

