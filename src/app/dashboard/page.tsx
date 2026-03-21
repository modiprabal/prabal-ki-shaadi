import { useState } from "react";
import { MOCK_TODOS, Todo, MOCK_USERS } from "@/lib/mockData";
import { useAuthStore } from "@/lib/authStore";

export default function DashboardTodos() {
  const [todos, setTodos] = useState<Todo[]>(MOCK_TODOS);
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', assignedTo: MOCK_USERS[0].id });
  
  const { hasRole } = useAuthStore();
  const canDelegate = hasRole(['COUPLE', 'ADMIN']);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const todo: Todo = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTask.title,
      status: 'PENDING',
      assignedTo: newTask.assignedTo,
      subtasks: []
    };
    setTodos([todo, ...todos]);
    setNewTask({ title: '', assignedTo: MOCK_USERS[0].id });
    setIsAdding(false);
  };

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
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl text-text-main">Pending Action Items</h1>
        {canDelegate && (
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-2 bg-text-main text-white px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-brand-gold transition-all shadow-md active:scale-95"
          >
            {isAdding ? 'Cancel' : '+ Delegate Task'}
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleAddTask} className="mb-10 bg-white border border-brand-gold/10 p-6 rounded-3xl shadow-sm flex flex-col md:flex-row gap-4 animate-in slide-in-from-top-4 duration-300">
          <div className="flex-1 space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-text-muted font-bold ml-1">Task Description</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Confirm floral arrangements..."
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20"
            />
          </div>
          <div className="md:w-48 space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-text-muted font-bold ml-1">Assign Lead</label>
            <select 
              value={newTask.assignedTo}
              onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 appearance-none"
            >
              {MOCK_USERS.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
          <button 
            type="submit"
            className="md:self-end bg-brand-gold text-white h-[46px] px-8 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-text-main transition-colors"
          >
            Assign Task
          </button>
        </form>
      )}

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
    </div>
  );
}
