"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getCurrentUser } from '@/lib/mockData';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const user = getCurrentUser();

  const navItems = [
    { name: 'Overview & To-Dos', path: '/dashboard' },
    { name: 'Budget Tracker', path: '/dashboard/budget' },
    { name: 'Guests & RSVPs', path: '/dashboard/guests' },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 pt-32 pb-20 px-6 md:px-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar Config */}
      <aside className="w-full md:w-64 flex flex-col gap-6">
        <div>
          <h2 className="font-serif text-3xl text-text-main mb-1">Portal</h2>
          <p className="text-text-muted text-sm uppercase tracking-widest block">Role: {user.role}</p>
          <p className="text-gray-400 text-xs">Logged in as {user.name}</p>
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
  );
}
