import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { Course, CourseLevel, CourseStatus } from "@/types/schema";

const mapCourse = (doc: any): Course => {
    const data = doc.data();
    return {
        id: doc.id,
        title: data.title,
        techStack: data.techStack,
        level: data.level as CourseLevel,
        totalLessons: data.totalLessons,
        totalAssessments: data.totalAssessments,
        startDate: data.startDate.toDate(),
        endDate: data.endDate.toDate(),
        gifUrl: data.gifUrl,
        status: data.status as CourseStatus
    };
};

export const CoursesService = {
    async getStudentCourses(userId: string): Promise<Course[]> {
        try {
            // In real app, might fetch user's enrolled courses or all available courses
            // For now, let's fetch 'courses' collection
            const q = query(collection(db, "courses"), orderBy("startDate", "desc"));
            const snapshot = await getDocs(q);
            return snapshot.docs.map(mapCourse);
        } catch (error) {
            console.error("Error fetching courses:", error);
            return [];
        }
    }
};
