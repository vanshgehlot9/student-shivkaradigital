"use client";

import React, { useState } from "react";
import { AssignmentsHeader } from "@/components/assignments/AssignmentsHeader";
import { SmartTabs } from "@/components/assignments/SmartTabs";
import { AssignmentCard, AssignmentStatus, UrgencyLevel } from "@/components/assignments/AssignmentCard";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

import { AssignmentsService } from "@/services/assignments";
import { Assignment } from "@/types/schema";
import { format } from "date-fns";

export default function AssignmentsPage() {
    const [activeTab, setActiveTab] = useState<"active" | "completed">("active");
    const [assignments, setAssignments] = useState<Assignment[]>([]);

    // Simulate real data fetching
    React.useEffect(() => {
        // TODO: Get real batchId from AuthContext
        const mockBatchId = "batch-2025-01";

        const fetchAssignments = async () => {
            const data = await AssignmentsService.getStudentAssignments(mockBatchId);
            if (data.length > 0) {
                setAssignments(data);
            } else {
                // If API returns empty (no connection yet), keep using mock data for demo purposes?
                // Or better, let's inject some dummy data if API fails or returns nothing, to preserve the "demo" feel for now.
                // Actually, let's try to stick to the "Real Functionality" request.
                // If DB is empty, it should show empty state.
                // But to test the UI, I'll inject a fallback if empty, or just rely on what I put in Firestore (which is nothing yet).
                // Let's create a local mock fallback inside here if empty, just so the user sees SOMETHING.
                // But the user asked to "remove mock data". So I should respect that.
                // I will initialize state as empty array. If nothing in DB, show empty state.
                setAssignments(data);
            }
        };

        fetchAssignments();
    }, []);

    const activeAssignments = assignments.filter(d => d.status === "active" || d.status === "upcoming" || d.status === "overdue");
    const completedAssignments = assignments.filter(d => d.status === "completed");

    const displayedAssignments = activeTab === "active" ? activeAssignments : completedAssignments;

    return (
        <div className="pb-24 min-h-screen">

            {/* Contextual Header */}
            <AssignmentsHeader />

            {/* Controls Row */}
            <div className="flex items-center justify-center lg:justify-start mb-12">
                <SmartTabs
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    counts={{
                        active: activeAssignments.length,
                        completed: completedAssignments.length
                    }}
                />
            </div>

            {/* Main Grid with Staggered Entrance */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={{
                        hidden: {},
                        show: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {displayedAssignments.map((assignment, index) => (
                        <AssignmentCard
                            key={assignment.id}
                            index={index}
                            title={assignment.title}
                            subject={assignment.subject}
                            status={assignment.status}
                            deadline={format(assignment.deadline, "MMM dd, HH:mm")}
                            duration={assignment.duration}
                            urgency={assignment.urgency}
                            startsIn={undefined} // Schema doesn't have startsIn yet, can compute if needed
                        />
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* Empty State System Idle Visualization */}
            {displayedAssignments.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-32 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]"
                >
                    <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-4 border border-zinc-800">
                        <AlertCircle className="text-zinc-600" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-1">System Idle</h3>
                    <p className="text-zinc-500 text-sm font-mono">No missions pending in this sector.</p>
                </motion.div>
            )}
        </div>
    );
}
