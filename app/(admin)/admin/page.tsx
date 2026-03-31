"use client";

import Card from "@/components/utils/Card";
import Typography from "@/components/utils/Typography";
import { useSession } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="space-y-6">
      <div className="border-b border-border-custom pb-4">
        <Typography variant="h3" className="text-text-head">
          Dashboard Overview
        </Typography>
        <Typography variant="body2" className="text-text-light mt-1">
          Welcome back, {session?.user?.name || "Admin"}!
        </Typography>
      </div>

      <Card className="bg-background-main border-border-custom p-4">
        <Typography variant="h4" className="text-accent mb-2">
          Quick Actions
        </Typography>
        <Typography variant="body2" className="text-text-mid">
          Use the sidebar to navigate and update your portfolio content
          securely.
        </Typography>
      </Card>
    </div>
  );
}
