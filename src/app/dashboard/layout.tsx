"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuthStore();

  if (!user) return null; // ProtectedRoute handles the redirect

  const navItems = [
    { name: 'Overview & To-Dos', path: '/dashboard' },
    { name: 'Budget Tracker', path: '/dashboard/budget' },
    { name: 'Guests & RSVPs', path: '/dashboard/guests' },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#FAF8F5] pt-32 pb-20 px-6 md:px-12 flex flex-col md:flex-row gap-8">
        {/* Sidebar Config */}
        <aside className="w-full md:w-64 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-brand-sage/20">
            <h2 className="font-serif text-2xl text-text-main mb-1">Member Portal</h2>
            <div className="flex flex-col gap-1">
              <span className="text-brand-gold text-[10px] font-bold uppercase tracking-widest">{user.role}</span>
              <p className="text-text-muted text-xs font-medium">{user.name}</p>
            </div>
          </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`px-5 py-4 rounded-2xl transition-all font-medium text-sm ${
                  isActive 
                  ? 'bg-text-main text-white shadow-md' 
                  : 'bg-white shadow-sm hover:shadow-md text-text-muted hover:text-text-main'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>
      </aside>
      
      {/* Main Render Area */}
      <main className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 min-h-[600px]">
        {children}
      </main>
      </div>
    </ProtectedRoute>
  );
}
