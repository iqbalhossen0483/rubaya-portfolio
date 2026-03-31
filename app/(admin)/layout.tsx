import Providers from "@/components/admin/Providers";

import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="flex min-h-screen bg-background-alt">
        <AdminSidebar />
        <div className="flex-1 ml-64 p-8">
          <main className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-border-custom p-8">
            {children}
          </main>
        </div>
      </div>
    </Providers>
  );
}
