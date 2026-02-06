"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

export function WelcomeHero() {
    const [text, setText] = useState("");
    const [userName, setUserName] = useState("OPERATIVE");
    const { user } = useAuth();

    // Fetch user name from database
    useEffect(() => {
        const fetchUserName = async () => {
            if (!user) return;

            try {
                const userQuery = query(
                    collection(db, "students"),
                    where("uid", "==", user.uid),
                    limit(1)
                );
                const snapshot = await getDocs(userQuery);

                if (!snapshot.empty) {
                    const data = snapshot.docs[0].data();
                    const name = data.name || user.displayName || "OPERATIVE";
                    // Get first name only and uppercase it
                    const firstName = name.split(' ')[0].toUpperCase();
                    setUserName(firstName);
                } else if (user.displayName) {
                    const firstName = user.displayName.split(' ')[0].toUpperCase();
                    setUserName(firstName);
                }
            } catch (error) {
                console.error("Error fetching user name:", error);
            }
        };

        fetchUserName();
    }, [user]);

    // Dynamic greeting based on time of day
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return "GOOD MORNING";
        if (hour >= 12 && hour < 17) return "GOOD AFTERNOON";
        if (hour >= 17 && hour < 21) return "GOOD EVENING";
        return "READY TO EXECUTE";
    };

    const fullText = `${getGreeting()}, ${userName}!`;

    useEffect(() => {
        let i = 0;
        setText(""); // Reset text when fullText changes
        const interval = setInterval(() => {
            setText(fullText.slice(0, i + 1));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, [fullText]);

    return (
        <div className="relative mb-12 py-8 overflow-hidden">
            {/* Background Glitch Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F24E1E]/50 to-transparent opacity-20" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-20" />

            <div className="flex flex-col md:flex-row items-baseline gap-4">
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase relative z-10">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
                        {text}
                    </span>
                    <span className="animate-pulse text-[#F24E1E]">_</span>
                </h1>
            </div>
        </div>
    );
}

