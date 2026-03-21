"use client";

import { useState } from "react";
import { MOCK_RSVPS, RSVP } from "@/lib/mockData";
import { useAuthStore } from "@/lib/authStore";
import { Plus, X, Users, CheckCircle2 } from "lucide-react";

export default function GuestManager() {
  const [guests, setGuests] = useState<RSVP[]>(MOCK_RSVPS);
  const [isAdding, setIsAdding] = useState(false);
  const [newGuest, setNewGuest] = useState({ guestName: '', count: 1, status: 'PENDING' as const });

  const { hasRole } = useAuthStore();
  const canExport = hasRole(['COUPLE', 'ADMIN']);
  const attendingCount = guests.filter(r => r.status === 'ATTENDING').reduce((acc, curr) => acc + curr.count, 0);

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    const guest: RSVP = {
      id: Math.random().toString(36).substr(2, 9),
      guestName: newGuest.guestName,
      status: newGuest.status,
      count: newGuest.count
    };
    setGuests([guest, ...guests]);
    setNewGuest({ guestName: '', count: 1, status: 'PENDING' });
    setIsAdding(false);
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl text-text-main">Guest List & RSVPs</h1>
        <div className="flex gap-4">
          {canExport && (
            <button className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.2em] border border-brand-gold/20 px-4 py-2 rounded-xl hover:bg-brand-gold/5 transition-all">
              Export Excel
            </button>
          )}
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-2 bg-text-main text-white px-5 py-2.5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-all"
          >
            {isAdding ? <X className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
            {isAdding ? 'Cancel' : 'Add Guest'}
          </button>
        </div>
      </div>

      {isAdding && (
        <form onSubmit={handleAddGuest} className="mb-10 bg-[#FAF8F5] border border-brand-sage/20 p-8 rounded-[2.5rem] shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-top-4 duration-300">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-text-muted font-bold ml-1">Guest / Family Name</label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold/50" />
              <input 
                type="text" 
                required
                placeholder="The Sharma Family"
                value={newGuest.guestName}
                onChange={(e) => setNewGuest({ ...newGuest, guestName: e.target.value })}
                className="w-full bg-white border border-brand-sage/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-text-muted font-bold ml-1">Headcount</label>
            <input 
              type="number" 
              required
              min="1"
              value={newGuest.count}
              onChange={(e) => setNewGuest({ ...newGuest, count: Number(e.target.value) })}
              className="w-full bg-white border border-brand-sage/10 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-text-muted font-bold ml-1">Current Status</label>
            <div className="flex gap-2">
              <select 
                value={newGuest.status}
                onChange={(e) => setNewGuest({ ...newGuest, status: e.target.value as any })}
                className="flex-1 bg-white border border-brand-sage/10 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 appearance-none"
              >
                <option value="PENDING">Pending</option>
                <option value="ATTENDING">Attending</option>
                <option value="NOT_ATTENDING">Not Attending</option>
              </select>
              <button 
                type="submit"
                className="bg-brand-gold text-white px-6 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-text-main transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      )}

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
            {guests.map(guest => (
              <tr key={guest.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="py-4 font-medium text-text-main flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold text-[10px] font-bold">
                    {guest.guestName.charAt(0)}
                  </div>
                  {guest.guestName}
                </td>
                <td className="py-4">
                  <span className={`text-[9px] px-3 py-1.5 rounded-full uppercase tracking-[0.2em] font-bold ${
                    guest.status === 'ATTENDING' ? 'bg-green-50 text-green-700 border border-green-100' :
                    guest.status === 'NOT_ATTENDING' ? 'bg-red-50 text-red-600 border border-red-100' :
                    'bg-orange-50 text-orange-600 border border-orange-100'
                  }`}>
                    {guest.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="py-4 text-text-muted font-medium ml-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3" />
                    {guest.count}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
