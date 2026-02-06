"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Calendar, Clock, BookOpen, CheckCircle, Video } from "lucide-react";
import { cn } from "@/lib/utils";

type ReminderType = "lecture" | "test" | "workshop";

interface Reminder {
    id: string;
    title: string;
    date: string;
    time: string;
    type: ReminderType;
    completed: boolean;
}

const initialReminders: Reminder[] = [
    {
        id: "1",
        title: "Design Systems Lecture",
        date: "Feb 06",
        time: "18:00",
        type: "lecture",
        completed: false
    },
    {
        id: "2",
        title: "Figma Variables Workshop",
        date: "Feb 08",
        time: "14:00",
        type: "workshop",
        completed: false
    },
    {
        id: "3",
        title: "Module 3 Assessment",
        date: "Feb 10",
        time: "10:00",
        type: "test",
        completed: false
    }
];

const TypeIcon = ({ type }: { type: ReminderType }) => {
    switch (type) {
        case "lecture": return <Video size={14} className="text-blue-400" />;
        case "test": return <BookOpen size={14} className="text-orange-400" />;
        case "workshop": return <Calendar size={14} className="text-purple-400" />;
    }
};

export function Reminders() {
    const [reminders, setReminders] = useState(initialReminders);

    const toggleComplete = (id: string) => {
        setReminders(reminders.map(r =>
            r.id === id ? { ...r, completed: !r.completed } : r
        ));
    };

    return (
        <Card className="h-full border-white/5 bg-white/[0.02]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base text-zinc-300 flex items-center gap-2">
                    <Clock size={16} className="text-zinc-500" />
                    Upcoming Schedule
                </CardTitle>
                <div className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">
                    Next 7 Days
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {reminders.map((reminder, index) => (
                    <div
                        key={reminder.id}
                        className={cn(
                            "flex items-center justify-between p-3 rounded-lg border transition-all",
                            reminder.completed
                                ? "bg-white/[0.02] border-white/[0.02] opacity-50"
                                : index === 0
                                    ? "bg-white/[0.05] border-[#F24E1E]/30"
                                    : "bg-white/[0.03] border-white/5"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => toggleComplete(reminder.id)}
                                className={cn(
                                    "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                                    reminder.completed
                                        ? "bg-green-500/20 border-green-500 text-green-500"
                                        : "border-zinc-700 hover:border-zinc-500"
                                )}
                            >
                                {reminder.completed && <CheckCircle size={12} />}
                            </button>

                            <div>
                                <h4 className={cn("text-sm font-medium transition-colors", reminder.completed ? "text-zinc-500 line-through" : "text-zinc-200")}>
                                    {reminder.title}
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex items-center gap-1 text-[10px] text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded">
                                        <TypeIcon type={reminder.type} />
                                        <span className="uppercase tracking-wider opacity-80">{reminder.type}</span>
                                    </div>
                                    <span className="text-[10px] text-zinc-600 font-mono">
                                        {reminder.date} • {reminder.time}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
