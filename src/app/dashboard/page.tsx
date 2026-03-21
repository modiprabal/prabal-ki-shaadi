"use client";

import { useState } from "react";
import { MOCK_TODOS, Todo, MOCK_USERS } from "@/lib/mockData";

export default function DashboardTodos() {
  const [todos, setTodos] = useState<Todo[]>(MOCK_TODOS);

  // Toggle subtasks nested status
  const toggleSubtask = (parentId: string, subtaskId: string) => {
    setTodos(todos.map(t => {
      if (t.id === parentId && t.subtasks) {
        return {
          ...t,
          subtasks: t.subtasks.map(s => s.id === subtaskId ? { ...s, status: s.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED' } : s)
        }
      }
      return t;
    }));
  };

  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="font-serif text-3xl text-text-main mb-8">Pending Action Items</h1>

      <div className="flex flex-col gap-6">
        {todos.map(todo => {
          const assignee = MOCK_USERS.find(u => u.id === todo.assignedTo);
          // Calculate overall status based on subtasks
          const allCompleted = todo.subtasks && todo.subtasks.length > 0 && todo.subtasks.every(s => s.status === 'COMPLETED');

          return (
            <div 
              key={todo.id} 
              className={`p-5 rounded-3xl border transition-all flex flex-col gap-4 ${
                allCompleted ? 'bg-gray-50/50 border-gray-100 opacity-80' : 'bg-white border-gray-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div>
                  <h3 className={`font-serif text-xl ${allCompleted ? 'text-gray-400' : 'text-text-main'}`}>
                    {todo.title}
                  </h3>
                  {assignee && (
                    <span className="text-xs font-mono uppercase tracking-widest text-text-muted mt-1 block">
                      Lead: {assignee.name}
                    </span>
                  )}
                </div>
                <span className={`text-xs px-3 py-1 rounded-full uppercase tracking-wider ${
                  allCompleted ? 'bg-gray-100 text-gray-400' : 'bg-orange-50 text-orange-600'
                }`}>
                  {allCompleted ? 'Completed' : todo.status}
                </span>
              </div>

              {/* Render Subtasks */}
              {todo.subtasks && todo.subtasks.length > 0 && (
                <div className="flex flex-col gap-3 ml-2">
                  {todo.subtasks.map(sub => {
                     const subAssignee = MOCK_USERS.find(u => u.id === sub.assignedTo);
                     return (
                      <div key={sub.id} className="flex items-center gap-4 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                        <button 
                          onClick={() => toggleSubtask(todo.id, sub.id)}
                          className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors shadow-sm ${
                            sub.status === 'COMPLETED' ? 'bg-brand-sage border-brand-sage text-white' : 'border-gray-300 bg-white hover:border-brand-sage'
                          }`}
                        >
                          {sub.status === 'COMPLETED' && '✓'}
                        </button>
                        <div className="flex-1 flex justify-between items-center">
                          <span className={`${sub.status === 'COMPLETED' ? 'line-through text-gray-400' : 'text-gray-700'} text-sm`}>
                            {sub.title}
                          </span>
                          {subAssignee && (
                            <span className="text-xs text-gray-400 tracking-wider">
                              Assigned to {subAssignee.name}
                            </span>
                          )}
                        </div>
                      </div>
                     );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button className="mt-8 px-6 py-4 bg-gray-50 hover:bg-gray-100 text-text-main rounded-2xl font-medium text-sm transition-colors border border-gray-200 border-dashed w-full shadow-sm">
        + Delegate New Task Category
      </button>
    </div>
  );
}
