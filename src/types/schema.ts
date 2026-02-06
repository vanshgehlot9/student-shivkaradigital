export interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    role: 'student' | 'admin';
    batchId?: string;
    enrolledCourses: string[]; // Course IDs
    stats: {
        attendanceRate: number;
        assignmentsCompleted: number;
        testsTaken: number;
        averageScore: number;
    };
    createdAt: Date;
    updatedAt: Date;
}

export type AssignmentStatus = 'active' | 'completed' | 'upcoming' | 'overdue';
export type UrgencyLevel = 'critical' | 'high' | 'normal' | 'none';

export interface Assignment {
    id: string;
    title: string;
    subject: string;
    description?: string;
    status: AssignmentStatus;
    deadline: Date;
    duration?: string; // e.g., "45 mins"
    urgency: UrgencyLevel;
    batchIds: string[]; // Targeted batches
    link?: string;
}

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type CourseStatus = 'invited' | 'in_progress' | 'completed' | 'expired';

export interface Course {
    id: string;
    title: string;
    techStack: string; // e.g., "MERN Stack"
    level: CourseLevel;
    totalLessons: number;
    totalAssessments: number;
    startDate: Date;
    endDate: Date;
    gifUrl?: string; // For the cover effect
    status: CourseStatus; // User specific context usually, but here checking generally
}

export interface Session {
    id: string;
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    meetLink?: string;
    status: 'scheduled' | 'live' | 'completed';
    batchIds: string[];
}

export interface AttendanceRecord {
    id: string;
    userId: string;
    date: Date; // YYYY-MM-DD
    status: 'present' | 'absent' | 'late';
    sessionId?: string;
}
