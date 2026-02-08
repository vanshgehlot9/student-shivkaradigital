import React, { useState } from 'react';
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths,
    isToday
} from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Check, X, Clock, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import SpotlightCard from '@/components/ui/SpotlightCard';

export interface AttendanceDay {
    date: Date;
    status: 'present' | 'absent' | 'late' | 'excused';
}

interface AttendanceCalendarProps {
    attendanceData: AttendanceDay[];
}

export const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({ attendanceData }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const daysInInterval = eachDayOfInterval({
        start: startDate,
        end: endDate,
    });

    const getDayStatus = (date: Date) => {
        const record = attendanceData.find(d => isSameDay(d.date, date));
        return record ? record.status : null;
    };

    const getStatusConfig = (status: string | null) => {
        switch (status) {
            case 'present':
                return {
                    bg: "bg-[#051C14]", // Deep Emerald
                    border: "border-emerald-500/30",
                    text: "text-emerald-400",
                    glow: "shadow-[0_0_15px_rgba(16,185,129,0.15),inset_0_0_10px_rgba(16,185,129,0.05)]",
                    icon: <Check size={12} strokeWidth={3} className="drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />,
                    indicator: "bg-emerald-500 shadow-[0_0_10px_#10B981]"
                };
            case 'absent':
                return {
                    bg: "bg-[#1C0505]", // Deep Red
                    border: "border-red-500/30",
                    text: "text-red-500",
                    glow: "shadow-[0_0_15px_rgba(239,68,68,0.15),inset_0_0_10px_rgba(239,68,68,0.05)]",
                    icon: <X size={12} strokeWidth={3} className="drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />,
                    indicator: "bg-red-500 shadow-[0_0_10px_#EF4444]"
                };
            case 'late':
                return {
                    bg: "bg-[#1C1405]", // Deep Amber
                    border: "border-amber-500/30",
                    text: "text-amber-400",
                    glow: "shadow-[0_0_15px_rgba(245,158,11,0.15),inset_0_0_10px_rgba(245,158,11,0.05)]",
                    icon: <Clock size={12} strokeWidth={3} className="drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />,
                    indicator: "bg-amber-500 shadow-[0_0_10px_#F59E0B]"
                };
            default:
                return {
                    bg: "bg-[#0A0A0A]",
                    border: "border-white/5",
                    text: "text-zinc-600",
                    glow: "hover:bg-white/5",
                    icon: null,
                    indicator: "bg-zinc-800"
                };
        }
    };

    return (
        <SpotlightCard className="w-full relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl">
            {/* Cyberpunk Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />

            <div className="relative z-10 p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6 md:gap-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                    <div className="flex items-center gap-3 sm:gap-6">
                        <div className="relative group hidden sm:block">
                            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative w-10 h-10 sm:w-14 sm:h-14 bg-[#0F0F0F] rounded-xl sm:rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl">
                                <Terminal size={20} className="text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                            </div>
                        </div>
                        <div>
                            <motion.h2
                                key={currentMonth.toISOString()}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tighter uppercase leading-none"
                            >
                                {format(currentMonth, 'MMMM')}
                            </motion.h2>
                            <div className="flex items-center gap-2 sm:gap-3 mt-1">
                                <span className="text-sm sm:text-lg text-zinc-500 font-bold tracking-widest">{format(currentMonth, 'yyyy')}</span>
                                <div className="h-4 w-px bg-white/10" />
                                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em] flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-[pulse_2s_ease-in-out_infinite]" />
                                    System Active
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 bg-[#050505] p-1.5 rounded-xl border border-white/10 shadow-inner">
                        <button
                            onClick={prevMonth}
                            className="p-3 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-all active:scale-95 group"
                        >
                            <ChevronLeft size={20} className="group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all" />
                        </button>
                        <div className="w-px h-6 bg-white/5 mx-1" />
                        <button
                            onClick={nextMonth}
                            className="p-3 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-all active:scale-95 group"
                        >
                            <ChevronRight size={20} className="group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all" />
                        </button>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="w-full">
                    {/* Weekday Headers */}
                    <div className="grid grid-cols-7 mb-2 sm:mb-4 px-1">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                            <div key={i} className="text-center text-[8px] sm:text-[10px] font-black text-zinc-700 uppercase tracking-wider sm:tracking-[0.2em]">
                                <span className="hidden sm:inline">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i]}</span>
                                <span className="sm:hidden">{day}</span>
                            </div>
                        ))}
                    </div>

                    {/* Days */}
                    <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-3">
                        <AnimatePresence mode="popLayout">
                            {daysInInterval.map((date, idx) => {
                                const status = getDayStatus(date);
                                const config = getStatusConfig(status);
                                const isCurrentMonth = isSameMonth(date, monthStart);
                                const isTodayDate = isToday(date);

                                return (
                                    <motion.div
                                        key={date.toISOString()}
                                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.8, y: -20 }}
                                        transition={{
                                            delay: idx * 0.02,
                                            type: "spring",
                                            stiffness: 200,
                                            damping: 20
                                        }}
                                        className={cn(
                                            "aspect-square relative flex flex-col items-center sm:items-start justify-center sm:justify-between p-1.5 sm:p-2 md:p-3 rounded-lg sm:rounded-xl border transition-all duration-300 group overflow-hidden",
                                            !isCurrentMonth && "opacity-5 grayscale pointer-events-none border-transparent",
                                            config.bg,
                                            config.border,
                                            config.glow,
                                            isTodayDate && !status && "bg-white/[0.03] border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]",
                                            "sm:hover:scale-[1.05] sm:hover:z-20 hover:border-white/20"
                                        )}
                                    >
                                        {/* Scanline Effect for Active Days */}
                                        {status && (
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-700 ease-in-out" />
                                        )}

                                        <div className="flex justify-between w-full items-center sm:items-start">
                                            <span className={cn(
                                                "text-[10px] sm:text-xs md:text-sm font-bold font-mono tracking-tighter transition-colors duration-300",
                                                config.text,
                                                isTodayDate && !status && "text-blue-400"
                                            )}>
                                                {format(date, 'd')}
                                            </span>

                                            {/* Status Icon */}
                                            {config.icon && (
                                                <motion.div
                                                    initial={{ scale: 0, rotate: -45 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    transition={{ type: "spring", stiffness: 400, delay: 0.2 + (idx * 0.01) }}
                                                >
                                                    {config.icon}
                                                </motion.div>
                                            )}
                                        </div>

                                        {/* Bottom Indicator Line - Hidden on mobile, visible on sm+ */}
                                        <div className="w-full mt-auto hidden sm:block">
                                            <div className={cn(
                                                "h-0.5 sm:h-1 w-full rounded-full transition-all duration-300",
                                                status ? config.indicator : "bg-zinc-800/50 group-hover:bg-zinc-700",
                                                isTodayDate && !status && "bg-blue-500 shadow-[0_0_10px_#3B82F6]"
                                            )} />
                                        </div>

                                        {/* Hover Label */}
                                        {status && (
                                            <div className={cn(
                                                "absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                            )}>
                                                <span className={cn(
                                                    "text-[10px] uppercase font-black tracking-widest",
                                                    config.text
                                                )}>
                                                    {status}
                                                </span>
                                            </div>
                                        )}

                                        {/* Today Badge */}
                                        {isTodayDate && (
                                            <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_#3B82F6]" />
                                        )}
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Footer Legend */}
                <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3 sm:gap-4 pt-4 border-t border-white/5">
                    <div className="flex gap-3 sm:gap-6">
                        {[
                            { label: 'Present', color: 'bg-emerald-500', shadow: 'shadow-emerald-500/50' },
                            { label: 'Absent', color: 'bg-red-500', shadow: 'shadow-red-500/50' },
                            { label: 'Late', color: 'bg-amber-500', shadow: 'shadow-amber-500/50' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 group cursor-default">
                                <div className={cn("w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-125 shadow-[0_0_10px_currentColor]", item.color, item.shadow)} />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors">{item.label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                        // END OF LOG
                    </div>
                </div>
            </div>
        </SpotlightCard>
    );
};
