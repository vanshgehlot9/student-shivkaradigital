"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Link2, Loader2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

interface LinkData {
    id?: string;
    platform: string;
    url: string;
}

interface LinkFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    editData?: LinkData | null;
}

const platformOptions = [
    { value: "linkedin", label: "LinkedIn", color: "#0077b5" },
    { value: "github", label: "GitHub", color: "#ffffff" },
    { value: "portfolio", label: "Portfolio", color: "#F24E1E" },
    { value: "twitter", label: "Twitter / X", color: "#1DA1F2" },
    { value: "behance", label: "Behance", color: "#1769FF" },
    { value: "dribbble", label: "Dribbble", color: "#EA4C89" },
    { value: "other", label: "Other", color: "#6B7280" },
];

export function LinkFormModal({ isOpen, onClose, onSuccess, editData }: LinkFormModalProps) {
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<LinkData>({
        platform: "linkedin",
        url: "",
    });

    // Populate form when editing
    useEffect(() => {
        if (editData) {
            setFormData({
                id: editData.id,
                platform: editData.platform,
                url: editData.url,
            });
        } else {
            setFormData({
                platform: "linkedin",
                url: "",
            });
        }
    }, [editData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsSubmitting(true);
        try {
            const linksRef = collection(db, "students", user.uid, "links");

            if (editData?.id) {
                // Update existing entry
                const docRef = doc(db, "students", user.uid, "links", editData.id);
                await updateDoc(docRef, {
                    platform: formData.platform,
                    url: formData.url,
                    updatedAt: serverTimestamp(),
                });
            } else {
                // Add new entry
                await addDoc(linksRef, {
                    platform: formData.platform,
                    url: formData.url,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                });
            }

            onSuccess();
            onClose();
        } catch (error) {
            console.error("Error saving link:", error);
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
                        <div className="relative w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">

                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                                        <Link2 className="text-purple-400" size={20} />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-white">
                                            {editData ? "Edit Link" : "Add Link"}
                                        </h2>
                                        <p className="text-xs text-zinc-500">Add your profile or portfolio link</p>
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

                                {/* Platform */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                        Platform *
                                    </label>
                                    <select
                                        name="platform"
                                        value={formData.platform}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all text-sm appearance-none cursor-pointer"
                                    >
                                        {platformOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* URL */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                        URL *
                                    </label>
                                    <input
                                        type="url"
                                        name="url"
                                        value={formData.url}
                                        onChange={handleChange}
                                        required
                                        placeholder="https://linkedin.com/in/yourprofile"
                                        className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all text-sm"
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
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg hover:from-purple-500 hover:to-purple-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            editData ? "Update Link" : "Add Link"
                                        )}
                                    </button>
                                </div>
                            </form>

                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
