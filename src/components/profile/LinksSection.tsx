"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Link2, Plus, Github, Linkedin, Globe, Pencil, ExternalLink, Trash2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, orderBy, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { LinkFormModal } from "./LinkFormModal";

interface LinkItem {
    id: string;
    platform: string;
    url: string;
}

const platformConfig: Record<string, { icon: React.ReactNode; color: string; bgColor: string }> = {
    linkedin: {
        icon: <Linkedin size={20} />,
        color: "#0077b5",
        bgColor: "bg-[#0077b5]/10"
    },
    github: {
        icon: <Github size={20} />,
        color: "#ffffff",
        bgColor: "bg-white/5"
    },
    portfolio: {
        icon: <Globe size={20} />,
        color: "#F24E1E",
        bgColor: "bg-[#F24E1E]/10"
    },
    twitter: {
        icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
        color: "#1DA1F2",
        bgColor: "bg-[#1DA1F2]/10"
    },
    behance: {
        icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.5 11c1.38 0 2.5-1.12 2.5-2.5S8.88 6 7.5 6H3v5h4.5zm0-3.5c.55 0 1 .45 1 1s-.45 1-1 1H4.5v-2h3zM3 12.5h4.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5H3v-5zm4.5 3.5c.55 0 1-.45 1-1s-.45-1-1-1H4.5v2h3zM15 6h6v1.5h-6zM18 10c-2.21 0-4 1.79-4 4s1.79 4 4 4c1.5 0 2.82-.83 3.5-2.06l-1.73-1c-.35.61-1.01 1.03-1.77 1.03-1.1 0-2-.9-2-2s.9-2 2-2c.76 0 1.42.42 1.77 1.03l1.73-1C20.82 10.83 19.5 10 18 10z" /></svg>,
        color: "#1769FF",
        bgColor: "bg-[#1769FF]/10"
    },
    dribbble: {
        icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.96 6.04c1.12 1.4 1.8 3.17 1.83 5.09-1.63-.33-3.45-.47-5.14-.25-.14-.35-.29-.69-.45-1.03 1.23-.5 2.59-1.4 3.76-3.81zM12 4c1.82 0 3.49.65 4.8 1.73-1.04 2.07-2.1 2.84-3.14 3.25-.88-1.61-1.86-3.08-2.93-4.35.41-.08.84-.13 1.27-.13zm-2.5.53c1.13 1.24 2.16 2.72 3.07 4.35-1.52.43-3.27.65-5.18.61-.67-2.07-1.2-4.22-1.55-5.12.73-.52 1.56-.91 2.46-1.09l1.2 1.25zm-4.32 2.59c.38.84.93 2.96 1.58 4.96-1.67-.07-3.41-.41-4.87-1.12.3-1.74 1.54-3.2 3.29-3.84zM4 12c0-.57.06-1.12.16-1.66 1.78.73 3.77 1.09 5.71 1.13.16.34.32.69.47 1.03-2.04.61-3.89 1.72-5.15 3.3-.78-1.14-1.19-2.51-1.19-3.8zm2.28 5.23c1.11-1.42 2.78-2.41 4.61-2.96.6 1.36 1.13 2.78 1.57 4.24-1.98.74-4.35.44-6.18-1.28zm5.72 2.37c-.5-1.46-1.06-2.87-1.68-4.2 1.35-.22 2.79-.2 4.18.06.01 1.57-.47 3.05-1.34 4.26-.36-.04-.75-.09-1.16-.12zm4.73-1.51c.59-.92.97-1.96 1.11-3.08 1.23.2 2.4.54 3.32.93-.45 1.48-1.47 2.75-2.82 3.59-.53-.55-1.08-1.02-1.61-1.44z" /></svg>,
        color: "#EA4C89",
        bgColor: "bg-[#EA4C89]/10"
    },
    other: {
        icon: <Link2 size={20} />,
        color: "#6B7280",
        bgColor: "bg-zinc-500/10"
    },
};

const getPlatformLabel = (platform: string): string => {
    const labels: Record<string, string> = {
        linkedin: "LinkedIn",
        github: "GitHub",
        portfolio: "Portfolio",
        twitter: "Twitter / X",
        behance: "Behance",
        dribbble: "Dribbble",
        other: "Other",
    };
    return labels[platform] || platform;
};

const getDisplayUrl = (url: string): string => {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname + urlObj.pathname.replace(/\/$/, '');
    } catch {
        return url;
    }
};

export function LinksSection() {
    const [links, setLinks] = useState<LinkItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLink, setEditingLink] = useState<LinkItem | null>(null);
    const { user } = useAuth();

    const fetchLinks = useCallback(async () => {
        if (!user) return;

        try {
            const q = query(
                collection(db, "students", user.uid, "links"),
                orderBy("createdAt", "desc")
            );
            const snapshot = await getDocs(q);

            if (!snapshot.empty) {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    platform: doc.data().platform || "other",
                    url: doc.data().url || "",
                }));
                setLinks(data);
            } else {
                setLinks([]);
            }
        } catch (error) {
            console.error("Error fetching links:", error);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchLinks();
        }
    }, [user, fetchLinks]);

    const handleAddNew = () => {
        setEditingLink(null);
        setIsModalOpen(true);
    };

    const handleEdit = (link: LinkItem) => {
        setEditingLink(link);
        setIsModalOpen(true);
    };

    const handleDelete = async (linkId: string) => {
        if (!user) return;

        try {
            await deleteDoc(doc(db, "students", user.uid, "links", linkId));
            fetchLinks();
        } catch (error) {
            console.error("Error deleting link:", error);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingLink(null);
    };

    const handleSuccess = () => {
        fetchLinks();
    };

    return (
        <>
            <div className="space-y-8 animate-in fade-in leading-relaxed">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest mb-2 animate-pulse">
                            <Link2 size={12} />
                            Network Database
                        </div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tight">Net Links</h2>
                    </div>
                    <button
                        onClick={handleAddNew}
                        className="flex items-center gap-2 text-xs font-bold bg-white text-black uppercase tracking-wider hover:bg-purple-500 hover:text-white px-5 py-3 rounded transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    >
                        <Plus size={14} />
                        Add Link
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {links.length === 0 ? (
                        <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
                            <Link2 className="mx-auto text-zinc-600 mb-4" size={32} />
                            <p className="text-zinc-500 font-mono text-sm">No links added yet</p>
                            <p className="text-zinc-600 text-xs mt-1">Click &quot;Add Link&quot; to add your profile links</p>
                        </div>
                    ) : (
                        links.map((link) => {
                            const config = platformConfig[link.platform] || platformConfig.other;
                            return (
                                <div
                                    key={link.id}
                                    className="bg-[#0A0A0A] border border-white/[0.08] rounded-xl p-4 flex items-center justify-between group hover:border-white/20 transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`w-10 h-10 rounded flex items-center justify-center ${config.bgColor}`}
                                            style={{ color: config.color }}
                                        >
                                            {config.icon}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white">{getPlatformLabel(link.platform)}</div>
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-zinc-500 hover:text-purple-400 transition-colors flex items-center gap-1 mt-0.5"
                                            >
                                                {getDisplayUrl(link.url)}
                                                <ExternalLink size={10} />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleEdit(link)}
                                            className="p-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                        >
                                            <Pencil size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(link.id)}
                                            className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            <LinkFormModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSuccess={handleSuccess}
                editData={editingLink}
            />
        </>
    );
}

