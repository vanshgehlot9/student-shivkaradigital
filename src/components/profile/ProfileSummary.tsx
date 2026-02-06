"use client";

import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Mail, Phone, Calendar, MapPin, Shield, CheckCircle, ScanFace, Pencil } from "lucide-react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { ProfileFormModal } from "./ProfileFormModal";

interface UserProfile {
    name: string;
    initials: string;
    email: string;
    phone: string;
    location: string;
    dob: string;
    degree: string;
    rollId: string;
    status: 'active' | 'inactive';
}

export function ProfileSummary() {
    const [profile, setProfile] = useState<UserProfile>({
        name: "Loading...",
        initials: "...",
        email: "...",
        phone: "...",
        location: "...",
        dob: "...",
        degree: "...",
        rollId: "...",
        status: 'active'
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { user } = useAuth();

    const fetchProfile = useCallback(async () => {
        if (!user) return;

        try {
            // Query by uid field
            const userId = user.uid;
            const userQuery = query(
                collection(db, "students"),
                where("uid", "==", userId),
                limit(1)
            );
            const snapshot = await getDocs(userQuery);

            if (!snapshot.empty) {
                const data = snapshot.docs[0].data();
                const name = data.name || "Student";
                const nameParts = name.split(' ');
                const initials = nameParts.length >= 2
                    ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
                    : name.substring(0, 2).toUpperCase();

                setProfile({
                    name: name,
                    initials: initials,
                    email: data.email || user.email || "Not provided",
                    phone: data.phone || "Not provided",
                    location: data.location || "Not provided",
                    dob: data.dob || "Not provided",
                    degree: data.degree || "Not specified",
                    rollId: data.rollId || snapshot.docs[0].id,
                    status: data.status || 'active'
                });
            } else {
                // Fallback if no specific profile doc found but user is logged in
                setProfile({
                    name: user.displayName || "New Student",
                    initials: (user.displayName || "NS").substring(0, 2).toUpperCase(),
                    email: user.email || "Not provided",
                    phone: "Not provided",
                    location: "Not provided",
                    dob: "Not provided",
                    degree: "Not specified",
                    rollId: "Pending",
                    status: 'active'
                });
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchProfile();
        }
    }, [user, fetchProfile]);

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleSuccess = () => {
        fetchProfile();
    };

    return (
        <>
            <div className="relative group">
                {/* Holographic Projection Background */}
                <div className="absolute -inset-1 bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative bg-[#050505]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">

                    {/* Scanner Light Effect */}
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-blue-500 shadow-[0_0_20px_#3b82f6] opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_ease-in-out_infinite] z-50 pointer-events-none" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-10 pointer-events-none" />

                    {/* Header / ID Badge */}
                    <div className="p-8 pb-0 flex flex-col items-center text-center relative z-10">

                        {/* Edit Button */}
                        <button
                            onClick={handleEditClick}
                            className="absolute top-4 left-4 flex items-center gap-1.5 px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-[10px] font-bold text-blue-400 uppercase tracking-widest hover:bg-blue-500/20 hover:border-blue-500/40 transition-all"
                        >
                            <Pencil size={10} />
                            Edit
                        </button>

                        {/* Security Clearance Badge */}
                        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                            <Shield size={10} />
                            VERIFIED_ID
                        </div>

                        {/* Avatar with Animated Border */}
                        <div className="relative w-28 h-28 mb-6 group-hover:scale-105 transition-transform duration-500">
                            <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/20 animate-spin-slow" />
                            <div className="absolute inset-0 rounded-full border border-blue-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden relative">
                                {/* Placeholder Initials */}
                                <span className="text-3xl font-black text-white/20 z-10">{profile.initials}</span>
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 mix-blend-overlay" />
                            </div>
                        </div>

                        {/* Name & Role */}
                        <h2 className="text-2xl font-black text-white tracking-tight mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-400 transition-all">
                            {profile.name}
                        </h2>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400">
                            <ScanFace size={12} />
                            STUDENT_OPERATIVE
                        </div>
                    </div>

                    {/* Data Grid */}
                    <div className="p-6 space-y-6">

                        {/* Section: Academic Identity */}
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] border-b border-white/5 pb-2">
                                Academic Identity
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="bg-black/40 p-3 rounded border border-white/5 group-hover:border-blue-500/20 transition-colors">
                                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">Degree Program</label>
                                    <div className="text-sm font-bold text-white">{profile.degree}</div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="bg-black/40 p-3 rounded border border-white/5 flex-1 group-hover:border-blue-500/20 transition-colors">
                                        <label className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">Roll ID</label>
                                        <div className="text-sm font-mono text-zinc-300">{profile.rollId}</div>
                                    </div>
                                    <div className="bg-black/40 p-3 rounded border border-white/5 flex-1 group-hover:border-blue-500/20 transition-colors">
                                        <label className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">Status</label>
                                        <div className={cn("text-sm font-bold flex items-center gap-1.5", profile.status === 'active' ? 'text-emerald-400' : 'text-red-400')}>
                                            <div className={cn("w-1.5 h-1.5 rounded-full", profile.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-red-400')} />
                                            {profile.status === 'active' ? 'Active' : 'Inactive'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section: Contact Protocols */}
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] border-b border-white/5 pb-2">
                                Contact Protocols
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-xs text-zinc-400 group/item hover:text-white transition-colors">
                                    <div className="p-2 rounded bg-white/5 group-hover/item:bg-blue-500/20 group-hover/item:text-blue-400">
                                        <Mail size={14} />
                                    </div>
                                    <span className="font-mono">{profile.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-zinc-400 group/item hover:text-white transition-colors">
                                    <div className="p-2 rounded bg-white/5 group-hover/item:bg-blue-500/20 group-hover/item:text-blue-400">
                                        <Phone size={14} />
                                    </div>
                                    <span className="font-mono">{profile.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-zinc-400 group/item hover:text-white transition-colors">
                                    <div className="p-2 rounded bg-white/5 group-hover/item:bg-blue-500/20 group-hover/item:text-blue-400">
                                        <MapPin size={14} />
                                    </div>
                                    <span>{profile.location}</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer Info */}
                        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-600 font-mono">
                            <div className="flex items-center gap-1.5">
                                <Calendar size={10} />
                                DOB: {profile.dob}
                            </div>
                            <div className="uppercase">
                                SEC_LVL_4
                            </div>
                        </div>

                    </div>
                </div>

                {/* Decorative Corner Accents (External) */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-white/10 rounded-tr-3xl -z-10" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-white/10 rounded-bl-3xl -z-10" />
            </div>

            <ProfileFormModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSuccess={handleSuccess}
                currentData={{
                    name: profile.name,
                    phone: profile.phone,
                    location: profile.location,
                    dob: profile.dob,
                    degree: profile.degree,
                }}
            />
        </>
    );
}
