"use client";

import { MOCK_BUDGET } from "@/lib/mockData";

export default function BudgetTracker() {
  const totalEstimated = MOCK_BUDGET.reduce((acc, curr) => acc + curr.estimated, 0);
  const totalActual = MOCK_BUDGET.reduce((acc, curr) => acc + curr.actual, 0);

  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="font-serif text-3xl text-text-main mb-8">Budget Tracker</h1>

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
            {MOCK_BUDGET.map(item => (
              <tr key={item.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="py-4 font-medium text-text-main">{item.title}</td>
                <td className="py-4 text-text-muted">₹{item.estimated.toLocaleString('en-IN')}</td>
                <td className="py-4 text-text-main">₹{item.actual.toLocaleString('en-IN')}</td>
                <td className="py-4">
                  <span className={`text-xs px-3 py-1 rounded-full uppercase tracking-wider ${
                    item.paid ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                  }`}>
                    {item.paid ? 'Paid' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
