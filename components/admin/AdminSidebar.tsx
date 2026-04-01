"use client";

import Typography from "@/components/utils/Typography";
import {
  Briefcase,
  CalendarDays,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  User,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Hero", href: "/admin/hero", icon: User },
  { name: "About", href: "/admin/about", icon: User },
  { name: "Experience", href: "/admin/experience", icon: Briefcase },
  { name: "Events", href: "/admin/event", icon: CalendarDays },
  { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { name: "Contact", href: "/admin/contact", icon: MessageSquare },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-background-main border-r border-border-custom h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-border-custom">
        <Typography variant="h4" className="text-text-head mb-1">
          Admin Panel
        </Typography>
        <Typography variant="body2" className="text-text-light">
          Manage Portfolio
        </Typography>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-accent text-white"
                  : "text-text-mid hover:bg-background-alt hover:text-accent"
              }`}
            >
              <Icon
                className={`w-5 h-5 mr-3 ${
                  isActive ? "text-white" : "text-text-light"
                }`}
              />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border-custom">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}
