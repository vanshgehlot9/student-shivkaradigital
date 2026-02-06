"use client";

import React, { useState } from "react";
import { ProfileTabs, ProfileTab } from "@/components/profile/ProfileTabs";
import { ProfileSummary } from "@/components/profile/ProfileSummary";
import { EducationSection } from "@/components/profile/EducationSection";
import { LinksSection } from "@/components/profile/LinksSection";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<ProfileTab>("education");

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-24">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                {/* Left Column: Editable Data */}
                <div className="lg:col-span-8">
                    <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

                    <div className="mt-8">
                        {activeTab === "education" && <EducationSection />}
                        {activeTab === "links" && <LinksSection />}
                    </div>
                </div>

                {/* Right Column: Authority Panel */}
                <div className="lg:col-span-4">
                    <ProfileSummary />
                </div>

            </div>
        </div>
    );
}
