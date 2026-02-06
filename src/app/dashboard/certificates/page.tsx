"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Award, Download, ExternalLink, QrCode, Calendar, Shield, Loader2, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

interface Certificate {
    id: string;
    studentName: string;
    bootcampName: string;
    bootcampCategory: string;
    completionDate: Date;
    issuedAt: Date;
    status: 'valid' | 'revoked' | 'expired';
    qrCodeDataUrl?: string;
    description?: string;
}

// --- 3D Holographic Card Component ---
const HolographicCard = ({ cert, onView, onDownload }: { cert: Certificate; onView: () => void; onDownload: (e: React.MouseEvent) => void }) => {
    const statusColors = {
        valid: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", glow: "shadow-emerald-500/20" },
        revoked: { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-400", glow: "shadow-red-500/20" },
        expired: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", glow: "shadow-amber-500/20" }
    };

    const colors = statusColors[cert.status] || statusColors.valid;

    // 3D Tilt Logic
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            const width = rect.width;
            const height = rect.height;
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const xPct = mouseX / width - 0.5;
            const yPct = mouseY / height - 0.5;
            x.set(xPct);
            y.set(yPct);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ perspective: 1000 }}
            className="group relative h-full"
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className={cn(
                    "relative h-full bg-[#050505]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-white/20",
                    "shadow-xl", colors.glow
                )}
            >
                {/* Visuals */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" style={{ transform: "translateZ(40px)" }} />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br", cert.status === 'valid' ? "from-emerald-500/20 to-blue-500/20" : "from-red-500/20 to-orange-500/20")} />

                <div className="p-8 relative z-10 flex flex-col h-full" style={{ transform: "translateZ(20px)" }}>
                    {/* Header: Status & ID */}
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Award className={cn("transition-colors", colors.text)} size={24} />
                        </div>
                        <div className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest border backdrop-blur-md", colors.bg, colors.border, colors.text)}>
                            <Shield size={10} /> {cert.status}
                        </div>
                    </div>

                    {/* Main Text */}
                    <div className="mb-6 flex-grow">
                        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-white/30" /> {cert.bootcampCategory}
                        </div>
                        <h3 className="text-2xl font-black text-white leading-tight mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all">
                            {cert.bootcampName}
                        </h3>
                        <p className="text-xs text-zinc-400 leading-relaxed max-w-[90%]">Issued to {cert.studentName} upon successful completion of curriculum requirements.</p>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8 bg-black/20 rounded-lg p-4 border border-white/5">
                        <div>
                            <div className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1">Issued On</div>
                            <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                                <Calendar size={10} />
                                {cert.issuedAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </div>
                        </div>
                        <div>
                            <div className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1">Cert ID</div>
                            <div className="text-xs font-mono text-zinc-500 truncate" title={cert.id}>#{cert.id.slice(0, 8)}...</div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-auto">
                        <button
                            onClick={onView}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-emerald-400 hover:text-black hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        >
                            <ExternalLink size={14} /> Verify Credential
                        </button>
                        <button
                            onClick={onDownload}
                            className="w-12 flex items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
                            title="Download / View Certificate"
                        >
                            <Download size={16} />
                        </button>
                    </div>
                </div>

                {/* Decorative Corners */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
            </motion.div>
        </motion.div>
    );
};

export default function CertificatesPage() {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    // Replaced complex print logic with simple redirect to main website
    const handleDownload = (e: React.MouseEvent, cert: Certificate) => {
        e.stopPropagation();
        window.open(`https://shivkaradigital.com/certificate/${cert.id}`, '_blank');
    };

    useEffect(() => {
        const fetchCertificates = async () => {
            if (!user) return;

            try {
                const userId = user.uid;
                const userEmail = user.email;

                // 1. Query by studentId (Auth UID)
                const idQuery = query(
                    collection(db, "certificates"),
                    where("studentId", "==", userId)
                );

                let snapshot = await getDocs(idQuery);

                let docs = snapshot.docs;
                // 2. Fallback: Query by Email
                if (userEmail) {
                    const emailQuery = query(
                        collection(db, "certificates"),
                        where("studentEmail", "==", userEmail)
                    );
                    const emailSnapshot = await getDocs(emailQuery);

                    const combinedDocs = [...docs, ...emailSnapshot.docs];
                    // Uniqueness by ID
                    const uniqueDocs = Array.from(new Map(combinedDocs.map(item => [item.id, item])).values());
                    docs = uniqueDocs;
                }

                const certs: Certificate[] = docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        studentName: data.studentName,
                        bootcampName: data.bootcampName,
                        bootcampCategory: data.bootcampCategory || "Training",
                        completionDate: data.completionDate?.toDate() || new Date(),
                        issuedAt: data.issuedAt?.toDate() || new Date(),
                        status: data.status || 'valid',
                        qrCodeDataUrl: data.qrCodeDataUrl,
                        description: data.description
                    };
                });

                certs.sort((a, b) => b.issuedAt.getTime() - a.issuedAt.getTime());
                setCertificates(certs);
            } catch (error) {
                console.error("Error fetching certificates:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchCertificates();
        }
    }, [user]);

    return (
        <div className="space-y-12 animate-in fade-in duration-700 pb-32">
            {/* Header Section */}
            <div className="relative">
                <div className="absolute -left-10 -top-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
                <div className="relative z-10">
                    <div className="flex items-center gap-2 text-xs font-mono text-blue-500 uppercase tracking-widest mb-3 animate-pulse">
                        <Shield size={14} /> Blockchain-Ready Verification
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
                        Credential <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Vault</span>.
                    </h1>
                    <p className="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                        Your secure repository of verifiable achievements. Each certificate is cryptographically signed and instantly verifiable with one click.
                    </p>
                </div>
            </div>

            {loading && (
                <div className="flex flex-col items-center justify-center py-32 space-y-4">
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                    <p className="text-xs font-mono text-zinc-500 animate-pulse">DECRYPTING SECURE VAULT...</p>
                </div>
            )}

            {!loading && certificates.length === 0 && (
                <div className="flex flex-col items-center justify-center py-32 border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
                    <div className="w-24 h-24 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center mb-6">
                        <Award className="text-zinc-700" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Vault Empty</h3>
                    <p className="text-zinc-500 max-w-md text-center leading-relaxed mb-8">No verified credentials found associated with your identity.</p>
                </div>
            )}

            {!loading && certificates.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 perspective-[2000px]">
                    {certificates.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 50, rotateX: 10 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
                            className="h-full"
                        >
                            <HolographicCard
                                cert={cert}
                                onView={() => window.open(`https://shivkaradigital.com/verify/${cert.id}`, '_blank')}
                                onDownload={(e) => handleDownload(e, cert)}
                            />
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Trust Footer */}
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 opacity-60 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-4">
                    <QrCode className="text-zinc-600" size={32} />
                    <div>
                        <div className="text-sm font-bold text-white">Cryptographically Signed</div>
                        <div className="text-xs text-zinc-500">Tamper-proof digital credentials</div>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-600">
                    <Share2 size={12} />
                    <span>Instant LinkedIn Integration Enabled</span>
                </div>
            </div>
        </div>
    );
}
