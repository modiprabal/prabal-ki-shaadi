"use client";

import { MOCK_RSVPS } from "@/lib/mockData";

export default function GuestManager() {
  const attendingCount = MOCK_RSVPS.filter(r => r.status === 'ATTENDING').reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <h1 className="font-serif text-3xl text-text-main">Guest List & RSVPs</h1>
        <button className="text-brand-sage text-sm font-medium hover:underline">
          Export to Excel
        </button>
      </div>

      <div className="mb-10 p-6 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-sm tracking-widest uppercase text-text-muted mb-1">Total Confirmed Guests</p>
          <p className="text-3xl font-serif text-text-main">{attendingCount}</p>
        </div>
        <div>
          <p className="text-sm tracking-widest uppercase text-text-muted mb-1">Pending Responses</p>
          <p className="text-3xl font-serif text-text-main">{MOCK_RSVPS.filter(r => r.status === 'PENDING').length}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-xs tracking-widest text-text-muted uppercase">
              <th className="pb-4 font-medium">Guest / Family Name</th>
              <th className="pb-4 font-medium">Status</th>
              <th className="pb-4 font-medium">Headcount</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_RSVPS.map(guest => (
              <tr key={guest.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="py-4 font-medium text-text-main">{guest.guestName}</td>
                <td className="py-4">
                  <span className={`text-xs px-3 py-1 rounded-full uppercase tracking-wider ${
                    guest.status === 'ATTENDING' ? 'bg-green-50 text-green-700' :
                    guest.status === 'NOT_ATTENDING' ? 'bg-red-50 text-red-600' :
                    'bg-orange-50 text-orange-600'
                  }`}>
                    {guest.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="py-4 text-text-muted">{guest.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
