"use client";

import React, { useState, useEffect } from "react";
import { LearningHeader } from "@/components/learning/LearningHeader";
import { CourseCard, CourseLevel } from "@/components/learning/CourseCard";
import { LearningStatus } from "@/components/learning/StatusSegment";
import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "@/context/AuthContext";
import { CoursesService } from "@/services/courses";
import { Course } from "@/types/schema";

export default function LearningHubPage() {
    const [activeStatus, setActiveStatus] = useState<LearningStatus>("invited");
    const [courses, setCourses] = useState<Course[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchCourses = async () => {
            if (user) {
                const data = await CoursesService.getStudentCourses(user.uid);
                setCourses(data);
            }
        };
        fetchCourses();
    }, [user]);

    // Calculate Counts
    const counts = {
        invited: courses.filter(c => c.status === "invited").length,
        in_progress: courses.filter(c => c.status === "in_progress").length,
        completed: courses.filter(c => c.status === "completed").length,
        expired: courses.filter(c => c.status === "expired").length,
    };

    const filteredCourses = courses.filter(c => c.status === activeStatus);

    return (
        <div className="space-y-12 pb-24 min-h-screen">
            <LearningHeader
                activeStatus={activeStatus}
                onStatusChange={setActiveStatus}
                counts={counts}
            />

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeStatus}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={{
                        hidden: {},
                        show: {
                            transition: {
                                staggerChildren: 0.15
                            }
                        }
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredCourses.map((course, index) => (
                        <CourseCard
                            key={course.id}
                            index={index}
                            title={course.title}
                            tech={course.techStack}
                            level={course.level}
                            lessons={course.totalLessons}
                            assessments={course.totalAssessments}
                            endDate={course.endDate.toLocaleDateString()}
                            status={course.status}
                            gifUrl={course.gifUrl}
                            onClick={() => console.log("View Course", course.id)}
                        />
                    ))}
                </motion.div>
            </AnimatePresence>

            {filteredCourses.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-32 border border-dashed border-white/10 rounded-xl bg-white/[0.02]"
                >
                    <p className="text-zinc-500 font-medium mb-1 font-mono uppercase tracking-widest">No data stream found.</p>
                </motion.div>
            )}
        </div>
    );
}
