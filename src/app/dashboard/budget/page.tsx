"use client";

import { useState } from "react";
import { MOCK_BUDGET, BudgetItem } from "@/lib/mockData";
import { useAuthStore } from "@/lib/authStore";
import { Plus, X, IndianRupee } from "lucide-react";

export default function BudgetTracker() {
  const [items, setItems] = useState<BudgetItem[]>(MOCK_BUDGET);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', estimated: 0 });
  
  const { hasRole } = useAuthStore();
  const canViewBudget = hasRole(['COUPLE', 'ADMIN']);

  const totalEstimated = items.reduce((acc, curr) => acc + curr.estimated, 0);
  const totalActual = items.reduce((acc, curr) => acc + curr.actual, 0);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const item: BudgetItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: newItem.title,
      estimated: newItem.estimated,
      actual: 0,
      paid: false
    };
    setItems([...items, item]);
    setNewItem({ title: '', estimated: 0 });
    setIsAdding(false);
  };

  if (!canViewBudget) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        </div>
        <h2 className="font-serif text-2xl text-text-main mb-2">Access Restricted</h2>
        <p className="text-text-muted max-w-sm">Only the Wedding Couple and Admins have permission to view the financial budget.</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl text-text-main">Budget Tracker</h1>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 bg-brand-gold text-white px-5 py-2.5 rounded-2xl text-sm font-bold uppercase tracking-widest shadow-lg shadow-brand-gold/10 hover:bg-text-main transition-all active:scale-95"
        >
          {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isAdding ? 'Cancel' : 'Add Expense'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddItem} className="mb-10 bg-white border border-brand-gold/10 p-6 rounded-3xl shadow-sm flex flex-col md:flex-row gap-4 animate-in slide-in-from-top-4 duration-300">
          <div className="flex-1 space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-text-muted font-bold ml-1">Expense Title</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Photography, Catering..."
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20"
            />
          </div>
          <div className="md:w-48 space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-text-muted font-bold ml-1">Estimated Cost (₹)</label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
              <input 
                type="number" 
                required
                placeholder="0"
                value={newItem.estimated || ''}
                onChange={(e) => setNewItem({ ...newItem, estimated: Number(e.target.value) })}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-8 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20"
              />
            </div>
          </div>
          <button 
            type="submit"
            className="md:self-end bg-text-main text-white h-[46px] px-8 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-gold transition-colors"
          >
            Save Item
          </button>
        </form>
      )}

      <div className="grid grid-cols-2 gap-6 mb-10">
        <div className="p-6 rounded-2xl bg-brand-peach/30 border border-brand-peach">
          <p className="text-sm tracking-widest uppercase text-text-muted mb-2">Total Estimated</p>
          <p className="text-3xl font-serif text-text-main">₹{totalEstimated.toLocaleString('en-IN')}</p>
        </div>
        <div className="p-6 rounded-2xl bg-brand-mint/40 border border-brand-mint/50">
          <p className="text-sm tracking-widest uppercase text-text-muted mb-2">Actual Spent</p>
          <p className="text-3xl font-serif text-text-main">₹{totalActual.toLocaleString('en-IN')}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-xs tracking-widest text-text-muted uppercase">
              <th className="pb-4 font-medium">Item</th>
              <th className="pb-4 font-medium">Estimated</th>
              <th className="pb-4 font-medium">Actual</th>
              <th className="pb-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="py-4 font-medium text-text-main">{item.title}</td>
                <td className="py-4 text-text-muted">₹{item.estimated.toLocaleString('en-IN')}</td>
                <td className="py-4 text-text-main font-semibold">₹{item.actual.toLocaleString('en-IN')}</td>
                <td className="py-4">
                  <button 
                    onClick={() => {
                      setItems(items.map(i => i.id === item.id ? { ...i, paid: !i.paid } : i));
                    }}
                    className={`text-[10px] px-3 py-1.5 rounded-full uppercase tracking-widest font-bold transition-all ${
                      item.paid ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600 hover:bg-red-100'
                    }`}
                  >
                    {item.paid ? 'Paid ✓' : 'Pending'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
