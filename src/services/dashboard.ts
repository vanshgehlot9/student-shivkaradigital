import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit, orderBy } from "firebase/firestore";
import { Session } from "@/types/schema";

const mapSession = (doc: any): Session => {
    const data = doc.data();
    return {
        id: doc.id,
        title: data.title,
        description: data.description,
        startTime: data.startTime.toDate(),
        endTime: data.endTime.toDate(),
        meetLink: data.meetLink,
        status: data.status,
        batchIds: data.batchIds
    };
};

export const DashboardService = {
    async getUpcomingSessions(batchId: string): Promise<Session[]> {
        try {
            const now = new Date();
            // Simplified query to avoid composite index requirement
            const q = query(
                collection(db, "sessions"),
                orderBy("startTime", "asc"),
                limit(10)
            );

            const snapshot = await getDocs(q);
            const sessions = snapshot.docs.map(mapSession);

            // Filter and limit client-side
            return sessions
                .filter(s => s.startTime >= now && s.batchIds?.includes(batchId))
                .slice(0, 3);
        } catch (error) {
            console.error("Error fetching sessions:", error);
            return [];
        }
    },

    async getStats(userId: string) {
        try {
            // Fetch user's stats from Firestore
            const userDoc = await getDocs(query(collection(db, "students"), where("uid", "==", userId), limit(1)));
            if (!userDoc.empty) {
                const data = userDoc.docs[0].data();
                return {
                    assigned: data.stats?.assignmentsTotal || 0,
                    active: data.stats?.assignmentsActive || 0,
                    completed: data.stats?.assignmentsCompleted || 0,
                    modules: data.stats?.modulesEnrolled || 0
                };
            }
            return { assigned: 0, active: 0, completed: 0, modules: 0 };
        } catch (error) {
            console.error("Error fetching stats:", error);
            return { assigned: 0, active: 0, completed: 0, modules: 0 };
        }
    },

    async getAttendanceStats(userId: string) {
        try {
            // Try fetching from attendance collection directly for real-time accuracy
            const attendanceQuery = query(
                collection(db, "attendance"),
                where("studentId", "==", userId)
            );
            const snapshot = await getDocs(attendanceQuery);

            if (!snapshot.empty) {
                let present = 0;
                let absent = 0;
                let late = 0;

                snapshot.forEach(doc => {
                    const status = doc.data().status;
                    if (status === 'present') present++;
                    else if (status === 'absent') absent++;
                    else if (status === 'late') late++;
                });

                const total = present + absent + late;
                const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
                return { present, absent, late, total, percentage };
            }

            // Fallback: Fetch user's stats from Firestore student doc
            const userDoc = await getDocs(query(collection(db, "students"), where("uid", "==", userId), limit(1)));
            if (!userDoc.empty) {
                const data = userDoc.docs[0].data();
                const present = data.stats?.attendancePresent || 0;
                const absent = data.stats?.attendanceAbsent || 0;
                const late = data.stats?.attendanceLate || 0;
                const total = present + absent + late;
                const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
                return { present, absent, late, total, percentage };
            }
            return { present: 0, absent: 0, late: 0, total: 0, percentage: 0 };
        } catch (error) {
            console.error("Error fetching attendance stats:", error);
            return { present: 0, absent: 0, late: 0, total: 0, percentage: 0 };
        }
    },

    async getAttendanceHistory(userId: string) {
        try {
            const attendanceQuery = query(
                collection(db, "attendance"),
                where("studentId", "==", userId),
                orderBy("date", "desc"), // Assuming date field exists
                // If index missing, client-side sort:
                // limit(50) 
            );

            // Note: complex queries with orderBy require composite index. 
            // We'll fetch without orderBy if index issues arise, but let's try with basic query first
            // Actually, to be safe and avoid "index required" errors on new deployments:
            const q = query(
                collection(db, "attendance"),
                where("studentId", "==", userId)
            );

            const snapshot = await getDocs(q);
            const records = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                date: doc.data().date?.toDate() || new Date()
            }));

            // Sort client-side
            records.sort((a, b) => b.date.getTime() - a.date.getTime());

            return records.slice(0, 90); // Return last 90 days roughly
        } catch (error) {
            console.error("Error fetching attendance history:", error);
            return [];
        }
    }
};
