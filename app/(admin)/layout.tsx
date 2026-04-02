"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import Providers from "@/components/admin/Providers";
import { Menu } from "lucide-react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Providers>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex min-h-screen bg-background-alt">
        <AdminSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}
        <div className="flex-1 lg:ml-72 p-4 md:p-8">
          <button
            className="lg:hidden p-2 mb-4"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu size={24} />
          </button>
          <main className="container mx-auto bg-white rounded-xl shadow-sm border border-border-custom p-4 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </Providers>
  );
}
