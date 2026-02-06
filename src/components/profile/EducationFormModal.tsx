"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, GraduationCap, Loader2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

interface EducationData {
    id?: string;
    school: string;
    degree: string;
    startYear: string;
    endYear: string;
    location: string;
}

interface EducationFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    editData?: EducationData | null;
}

export function EducationFormModal({ isOpen, onClose, onSuccess, editData }: EducationFormModalProps) {
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<EducationData>({
        school: "",
        degree: "",
        startYear: "",
        endYear: "",
        location: "",
    });

    // Populate form when editing
    useEffect(() => {
        if (editData) {
            setFormData({
                id: editData.id,
                school: editData.school,
                degree: editData.degree,
                startYear: editData.startYear,
                endYear: editData.endYear,
                location: editData.location,
            });
        } else {
            setFormData({
                school: "",
                degree: "",
                startYear: "",
                endYear: "",
                location: "",
            });
        }
    }, [editData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsSubmitting(true);
        try {
            const educationRef = collection(db, "students", user.uid, "education");

            if (editData?.id) {
                // Update existing entry
                const docRef = doc(db, "students", user.uid, "education", editData.id);
                await updateDoc(docRef, {
                    school: formData.school,
                    degree: formData.degree,
                    startYear: formData.startYear,
                    endYear: formData.endYear || "Present",
                    location: formData.location,
                    updatedAt: serverTimestamp(),
                });
            } else {
                // Add new entry
                await addDoc(educationRef, {
                    school: formData.school,
                    degree: formData.degree,
                    startYear: formData.startYear,
                    endYear: formData.endYear || "Present",
                    location: formData.location,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                });
            }

            onSuccess();
            onClose();
        } catch (error) {
            console.error("Error saving education:", error);
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
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                        <GraduationCap className="text-blue-400" size={20} />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-white">
                                            {editData ? "Edit Education" : "Add Education"}
                                        </h2>
                                        <p className="text-xs text-zinc-500">Enter your academic qualification details</p>
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

                                {/* School/University */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                        School / University *
                                    </label>
                                    <input
                                        type="text"
                                        name="school"
                                        value={formData.school}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g., Stanford University"
                                        className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all text-sm"
                                    />
                                </div>

                                {/* Degree */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                        Degree / Program *
                                    </label>
                                    <input
                                        type="text"
                                        name="degree"
                                        value={formData.degree}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g., Bachelor of Computer Science"
                                        className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all text-sm"
                                    />
                                </div>

                                {/* Year Range */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                            Start Year *
                                        </label>
                                        <input
                                            type="text"
                                            name="startYear"
                                            value={formData.startYear}
                                            onChange={handleChange}
                                            required
                                            placeholder="e.g., 2020"
                                            className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                            End Year
                                        </label>
                                        <input
                                            type="text"
                                            name="endYear"
                                            value={formData.endYear}
                                            onChange={handleChange}
                                            placeholder="e.g., 2024 or leave blank"
                                            className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                        Location *
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g., California, USA"
                                        className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all text-sm"
                                    />
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
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            editData ? "Update Details" : "Save Details"
                                        )}
                                    </button>
                                </div>
                            </form>

                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
