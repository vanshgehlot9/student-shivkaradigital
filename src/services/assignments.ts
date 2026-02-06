import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, doc, getDoc, orderBy, limit, Timestamp } from "firebase/firestore";
import { Assignment, AssignmentStatus, UrgencyLevel } from "@/types/schema";

// Map Firestore data to our Interface
const mapAssignment = (doc: any): Assignment => {
    const data = doc.data();
    return {
        id: doc.id,
        title: data.title,
        subject: data.subject,
        description: data.description,
        status: data.status as AssignmentStatus,
        deadline: (data.deadline as Timestamp)?.toDate() || new Date(),
        duration: data.duration,
        urgency: data.urgency as UrgencyLevel,
        batchIds: data.batchIds,
        link: data.link
    };
};

export const AssignmentsService = {
    // Fetch assignments for a specific batch or user
    async getStudentAssignments(batchId: string): Promise<Assignment[]> {
        try {
            // Query without orderBy to avoid composite index requirement
            // Sort client-side instead
            const q = query(
                collection(db, "assignments"),
                where("batchIds", "array-contains", batchId)
            );

            const snapshot = await getDocs(q);
            const assignments = snapshot.docs.map(mapAssignment);

            // Sort by deadline ascending client-side
            return assignments.sort((a, b) => a.deadline.getTime() - b.deadline.getTime());
        } catch (error) {
            console.error("Error fetching assignments:", error);
            // Fallback to empty if error (or handle UI error state)
            return [];
        }
    },

    // Fetch urgent/active assignments only
    async getActiveAssignments(batchId: string): Promise<Assignment[]> {
        const all = await this.getStudentAssignments(batchId);
        return all.filter(a => a.status === 'active' || a.status === 'upcoming');
    }
};

