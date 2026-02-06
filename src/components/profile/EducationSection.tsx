"use client";

import React, { useRef, useState, useEffect } from "react";
import { GraduationCap, Plus, Calendar, MapPin, Edit, Database } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit, orderBy } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

interface Education {
    id: string;
    school: string;
    degree: string;
    years: string;
    location: string;
}

// Reusable 3D Card Component for Education Items
function EducationCard({
    school,
    degree,
    years,
    location,
    delay = 0
}: {
    school: string,
    degree: string,
    years: string,
    location: string,
    delay?: number
}) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            const width = rect.width;
            const height = rect.height;
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const xPct = mouseX / width - 0.5;
            const yPct = mouseY / height - 0.5;
            x.set(xPct);
            y.set(yPct);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay, duration: 0.5 }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative perspective-1000"
        >
            <div className="relative bg-[#0A0A0A]/60 backdrop-blur-md border border-white/[0.08] rounded-xl p-8 transition-all duration-300 group-hover:bg-[#0A0A0A]/80 group-hover:border-blue-500/30 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">

                <button className="absolute top-6 right-6 text-zinc-600 hover:text-white transition-colors opacity-0 group-hover:opacity-100 z-20">
                    <Edit size={14} />
                </button>

                <div className="flex items-start gap-6 relative z-10" style={{ transform: "translateZ(20px)" }}>
                    <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <GraduationCap className="text-blue-400" size={24} />
                    </div>

                    <div className="flex-grow">
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                            {school}
                        </h3>
                        <p className="text-sm font-medium text-zinc-400 mt-1">{degree}</p>

                        <div className="flex items-center gap-6 mt-6">
                            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 bg-white/5 py-1.5 px-3 rounded border border-white/5">
                                <Calendar size={12} />
                                {years}
                            </div>
                            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                                <MapPin size={12} />
                                {location}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-white/10 rounded-br-xl group-hover:border-blue-500/30 transition-colors" />
            </div>
        </motion.div>
    );
}

export function EducationSection() {
    const [education, setEducation] = useState<Education[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchEducation = async () => {
            if (!user) return;

            try {
                // TODO: Replace with actual user ID from auth context
                const userId = user.uid;
                const q = query(
                    collection(db, "students", userId, "education"),
                    orderBy("startYear", "desc")
                );
                const snapshot = await getDocs(q);

                if (!snapshot.empty) {
                    const data = snapshot.docs.map(doc => ({
                        id: doc.id,
                        school: doc.data().school || "",
                        degree: doc.data().degree || "",
                        years: `${doc.data().startYear} - ${doc.data().endYear || "Present"}`,
                        location: doc.data().location || ""
                    }));
                    setEducation(data);
                }
            } catch (error) {
                console.error("Error fetching education:", error);
            }
        };

        if (user) {
            fetchEducation();
        }
    }, [user]);

    return (
        <div className="space-y-8 animate-in fade-in leading-relaxed">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#F24E1E] uppercase tracking-widest mb-2 animate-pulse">
                        <Database size={12} />
                        Academic Database
                    </div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight">Qualifications</h2>
                </div>
                <button className="flex items-center gap-2 text-xs font-bold bg-white text-black uppercase tracking-wider hover:bg-[#F24E1E] hover:text-white px-5 py-3 rounded transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    <Plus size={14} />
                    Add Entry
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {education.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
                        <GraduationCap className="mx-auto text-zinc-600 mb-4" size={32} />
                        <p className="text-zinc-500 font-mono text-sm">No education records found</p>
                        <p className="text-zinc-600 text-xs mt-1">Add your academic qualifications</p>
                    </div>
                ) : (
                    education.map((edu, index) => (
                        <EducationCard
                            key={edu.id}
                            school={edu.school}
                            degree={edu.degree}
                            years={edu.years}
                            location={edu.location}
                            delay={0.1 * index}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

