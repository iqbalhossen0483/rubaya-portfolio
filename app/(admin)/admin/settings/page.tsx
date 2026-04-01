"use client";

import Typography from "@/components/utils/Typography";
import { useState } from "react";
import GeneralSettingsForm from "./GeneralSettingsForm";
import ProfileSettingsForm from "./ProfileSettingsForm";

type Tab = "general" | "profile";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("general");

  return (
    <div className="space-y-6">
      <div className="border-b border-border-custom pb-4 mb-6">
        <Typography variant="h3" className="text-text-head">
          Settings
        </Typography>
        <Typography variant="body2" className="text-text-light mt-1">
          Manage your website and profile settings.
        </Typography>
      </div>

      <div className="flex border-b border-border-custom">
        <button
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "general"
              ? "text-accent border-b-2 border-accent"
              : "text-text-mid hover:text-text-head"
          }`}
          onClick={() => setActiveTab("general")}
        >
          General Settings
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "profile"
              ? "text-accent border-b-2 border-accent"
              : "text-text-mid hover:text-text-head"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile Settings
        </button>
      </div>

      <div className="pt-6">
        {activeTab === "general" && <GeneralSettingsForm />}
        {activeTab === "profile" && <ProfileSettingsForm />}
      </div>
    </div>
  );
}
