"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Loader2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, doc, updateDoc, limit, setDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

interface ProfileData {
    name: string;
    phone: string;
    location: string;
    dob: string;
    degree: string;
}

interface ProfileFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    currentData: ProfileData;
}

export function ProfileFormModal({ isOpen, onClose, onSuccess, currentData }: ProfileFormModalProps) {
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<ProfileData>({
        name: "",
        phone: "",
        location: "",
        dob: "",
        degree: "",
    });

    // Populate form with current data when modal opens
    useEffect(() => {
        if (isOpen && currentData) {
            setFormData({
                name: currentData.name === "Loading..." || currentData.name === "New Student" ? "" : currentData.name,
                phone: currentData.phone === "Not provided" ? "" : currentData.phone,
                location: currentData.location === "Not provided" ? "" : currentData.location,
                dob: currentData.dob === "Not provided" ? "" : currentData.dob,
                degree: currentData.degree === "Not specified" ? "" : currentData.degree,
            });
        }
    }, [isOpen, currentData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsSubmitting(true);
        try {
            // Find the student document
            const userQuery = query(
                collection(db, "students"),
                where("uid", "==", user.uid),
                limit(1)
            );
            const snapshot = await getDocs(userQuery);

            const updateData = {
                name: formData.name || user.displayName || "Student",
                phone: formData.phone || "Not provided",
                location: formData.location || "Not provided",
                dob: formData.dob || "Not provided",
                degree: formData.degree || "Not specified",
                updatedAt: new Date().toISOString(),
            };

            if (!snapshot.empty) {
                // Update existing document
                const docRef = doc(db, "students", snapshot.docs[0].id);
                await updateDoc(docRef, updateData);
            } else {
                // Create new document if it doesn't exist
                const newDocRef = doc(collection(db, "students"));
                await setDoc(newDocRef, {
                    ...updateData,
                    uid: user.uid,
                    email: user.email,
                    createdAt: new Date().toISOString(),
                    status: "active",
                });
            }

            onSuccess();
            onClose();
        } catch (error) {
            console.error("Error saving profile:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">

                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                        <User className="text-emerald-400" size={20} />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-white">Edit Personal Details</h2>
                                        <p className="text-xs text-zinc-500">Update your profile information</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-500 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-5">

                                {/* Full Name */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g., John Doe"
                                        className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25 transition-all text-sm"
                                    />
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="e.g., +91 9876543210"
                                        className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25 transition-all text-sm"
                                    />
                                </div>

                                {/* Location */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="e.g., Jodhpur, Rajasthan"
                                        className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25 transition-all text-sm"
                                    />
                                </div>

                                {/* Date of Birth and Degree */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={formData.dob}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25 transition-all text-sm [color-scheme:dark]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                            Degree Program
                                        </label>
                                        <input
                                            type="text"
                                            name="degree"
                                            value={formData.degree}
                                            onChange={handleChange}
                                            placeholder="e.g., B.Tech"
                                            className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25 transition-all text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 px-4 py-3 text-sm font-bold text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-lg hover:from-emerald-500 hover:to-emerald-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            "Save Changes"
                                        )}
                                    </button>
                                </div>
                            </form>

                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
