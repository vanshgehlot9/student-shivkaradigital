"use client";

import React, { useState, useEffect, useCallback } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Share2, Lock, Unlock, Copy, Check, Users, Trophy, Gift, Sparkles } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit, doc, updateDoc, setDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

export default function ReferralsPage() {
    const [referralCount, setReferralCount] = useState(0);
    const [referralCode, setReferralCode] = useState("");
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const generateReferralCode = (uid: string): string => {
        // Generate a short, readable referral code from UID
        const hash = uid.split('').reduce((acc, char) => {
            return ((acc << 5) - acc) + char.charCodeAt(0);
        }, 0);
        return `SHIV${Math.abs(hash).toString(36).toUpperCase().slice(0, 6)}`;
    };

    const fetchReferralData = useCallback(async () => {
        if (!user) return;

        setLoading(true);
        try {
            const userId = user.uid;
            const userQuery = query(
                collection(db, "students"),
                where("uid", "==", userId),
                limit(1)
            );
            const snapshot = await getDocs(userQuery);

            if (!snapshot.empty) {
                const docRef = snapshot.docs[0].ref;
                const data = snapshot.docs[0].data();

                // Get or generate referral code
                let code = data.referralCode;
                if (!code) {
                    code = generateReferralCode(userId);
                    // Save the referral code to database
                    await updateDoc(docRef, { referralCode: code });
                }

                setReferralCode(code);
                setReferralCount(data.referralCount || 0);
            } else {
                // Create new student document with referral code
                const code = generateReferralCode(userId);
                await setDoc(doc(db, "students", userId), {
                    uid: userId,
                    email: user.email,
                    referralCode: code,
                    referralCount: 0,
                    createdAt: new Date(),
                });
                setReferralCode(code);
                setReferralCount(0);
            }
        } catch (error) {
            console.error("Error fetching referral data:", error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchReferralData();
        }
    }, [user, fetchReferralData]);

    const inviteLink = `https://shivkaradigital.com/ref/${referralCode}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(inviteLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };

    const handleShare = (platform: 'whatsapp' | 'telegram' | 'twitter') => {
        const message = `Join me at Shivkara Digital - India's premium design education platform! Use my referral link: ${inviteLink}`;

        const urls = {
            whatsapp: `https://wa.me/?text=${encodeURIComponent(message)}`,
            telegram: `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent("Join me at Shivkara Digital!")}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`,
        };

        window.open(urls[platform], '_blank');
    };

    const progressPercent = Math.min((referralCount / 25) * 100, 100);
    const currentTier = referralCount >= 25 ? 'ELITE' : referralCount >= 15 ? 'PRO' : referralCount >= 10 ? 'BOOST' : 'STARTER';
    const nextTierReq = referralCount < 10 ? 10 : referralCount < 15 ? 15 : referralCount < 25 ? 25 : 25;
    const remaining = Math.max(0, nextTierReq - referralCount);

    return (
        <div className="space-y-12 pb-24 animate-in fade-in">
            <header className="max-w-3xl">
                <div className="flex items-center gap-2 text-xs font-mono text-orange-400 uppercase tracking-widest mb-4 animate-pulse">
                    <Sparkles size={12} />
                    Referral Program
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-4">
                    GROWTH <br /><span className="text-orange-500">ENGINE.</span>
                </h1>
                <p className="text-xl text-gray-400 font-light leading-relaxed">
                    Unlock rewards by inviting friends. Share your unique link and earn perks for every student who joins.
                </p>
            </header>

            {/* Status Card */}
            <GlassCard className="p-8 md:p-12 relative overflow-visible">
                <div className="absolute top-0 right-0 p-[200px] bg-orange-600/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative z-10">
                    {/* Stats */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                                <Users className="text-orange-400" size={24} />
                            </div>
                            <div>
                                <div className="text-sm font-mono text-gray-500 uppercase tracking-widest">Total Referrals</div>
                                <div className="text-4xl font-black text-white tabular-nums tracking-tighter">
                                    {loading ? "..." : referralCount}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-xs font-mono text-gray-400">
                                <span className="flex items-center gap-2">
                                    <Trophy size={12} className="text-orange-400" />
                                    TIER: {currentTier}
                                </span>
                                <span>{remaining > 0 ? `${remaining} to next tier` : 'MAX TIER'}</span>
                            </div>
                            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-orange-600 to-amber-500 rounded-full transition-all duration-500"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-[10px] font-mono text-gray-600">
                                <span>0</span>
                                <span>10</span>
                                <span>15</span>
                                <span>25</span>
                            </div>
                        </div>
                    </div>

                    {/* Share Section */}
                    <div className="bg-black/50 rounded-2xl p-6 border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">Your Referral Link</div>
                            <div className="px-2 py-1 rounded bg-orange-500/10 border border-orange-500/20 text-[10px] font-bold text-orange-400 uppercase">
                                {referralCode || "..."}
                            </div>
                        </div>

                        <div className="flex gap-3 mb-4">
                            <div className="flex-1 bg-black/80 border border-white/10 rounded-lg px-4 py-3.5 text-gray-300 font-mono text-sm truncate">
                                {loading ? "Loading..." : inviteLink}
                            </div>
                            <button
                                onClick={handleCopy}
                                disabled={loading}
                                className={`px-5 py-3.5 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${copied
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-white text-black hover:bg-gray-200'
                                    }`}
                            >
                                {copied ? <Check size={18} /> : <Copy size={18} />}
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>

                        <div className="text-xs text-gray-500 mb-4 text-center">Share on</div>

                        <div className="grid grid-cols-3 gap-3">
                            <button
                                onClick={() => handleShare('whatsapp')}
                                className="py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#25D366]/20 border border-[#25D366]/30 rounded-lg hover:bg-[#25D366]/30 transition-colors flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp
                            </button>
                            <button
                                onClick={() => handleShare('telegram')}
                                className="py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#0088cc]/20 border border-[#0088cc]/30 rounded-lg hover:bg-[#0088cc]/30 transition-colors flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                </svg>
                                Telegram
                            </button>
                            <button
                                onClick={() => handleShare('twitter')}
                                className="py-3 text-xs font-bold uppercase tracking-wider text-white bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                                X / Twitter
                            </button>
                        </div>
                    </div>
                </div>
            </GlassCard>

            {/* Rewards Tiers */}
            <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest">
                    <Gift size={12} />
                    Reward Tiers
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <TierCard
                        level="01"
                        title="Boost"
                        req="10 Referrals"
                        unlocked={referralCount >= 10}
                        features={["₹500 Fee Reduction", "Priority Session Access"]}
                        icon={<Sparkles size={18} />}
                    />
                    <TierCard
                        level="02"
                        title="Pro"
                        req="15 Referrals"
                        unlocked={referralCount >= 15}
                        features={["100% Fee Waived", "1-on-1 Mentorship"]}
                        highlight
                        icon={<Trophy size={18} />}
                    />
                    <TierCard
                        level="03"
                        title="Elite"
                        req="25 Referrals"
                        unlocked={referralCount >= 25}
                        features={["Paid Project Role", "Shivkara Swag Kit"]}
                        icon={<Gift size={18} />}
                    />
                </div>
            </div>
        </div>
    );
}

interface TierCardProps {
    level: string;
    title: string;
    req: string;
    unlocked: boolean;
    features: string[];
    highlight?: boolean;
    icon: React.ReactNode;
}

const TierCard = ({ level, title, req, unlocked, features, highlight, icon }: TierCardProps) => (
    <GlassCard className={`p-8 h-full flex flex-col relative transition-all duration-300 ${unlocked
        ? 'border-orange-500/30 bg-orange-500/5'
        : 'opacity-60 grayscale hover:opacity-80'
        } ${highlight && unlocked ? 'ring-2 ring-orange-500/30' : ''}`}>
        <div className="flex justify-between items-start mb-6">
            <span className="text-xl font-black text-white/20">/{level}</span>
            <div className={`p-2 rounded-lg ${unlocked ? 'bg-orange-500/10 text-orange-400' : 'bg-white/5 text-gray-600'}`}>
                {unlocked ? <Unlock size={18} /> : <Lock size={18} />}
            </div>
        </div>

        <div className={`p-2 w-fit rounded-lg mb-4 ${unlocked ? 'bg-orange-500/10 text-orange-400' : 'bg-white/5 text-gray-500'}`}>
            {icon}
        </div>

        <h3 className={`text-2xl font-bold mb-2 ${unlocked ? 'text-white' : 'text-gray-400'}`}>{title}</h3>
        <div className="text-sm font-mono text-orange-500 mb-8 uppercase tracking-widest">{req}</div>

        <ul className="space-y-3 mt-auto">
            {features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <div className={`w-1.5 h-1.5 rounded-full ${unlocked ? 'bg-orange-500' : 'bg-gray-600'}`} />
                    {f}
                </li>
            ))}
        </ul>

        {unlocked && (
            <div className="absolute top-4 right-4">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
        )}
    </GlassCard>
);
