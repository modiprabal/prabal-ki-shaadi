export type Role = 'GUEST' | 'COORDINATOR' | 'ADMIN' | 'COUPLE';

export interface User {
  id: string;
  name: string;
  role: Role;
}

export interface RSVP {
  id: string;
  guestName: string;
  status: 'ATTENDING' | 'NOT_ATTENDING' | 'PENDING';
  count: number;
}

export interface Todo {
  id: string;
  title: string;
  status: 'PENDING' | 'COMPLETED';
  assignedTo?: string; // User ID
  subtasks?: Todo[];
}

export interface BudgetItem {
  id: string;
  title: string;
  estimated: number;
  actual: number;
  paid: boolean;
}

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Prabal (Groom)', role: 'COUPLE' },
  { id: '2', name: 'Wedding Planner', role: 'ADMIN' },
  { id: '3', name: 'Rohan (Brother)', role: 'COORDINATOR' },
  { id: '4', name: 'Event Coordinator', role: 'COORDINATOR' },
];

export const MOCK_RSVPS: RSVP[] = [
  { id: 'r1', guestName: 'Sharma Family', status: 'ATTENDING', count: 4 },
  { id: 'r2', guestName: 'Mehta Family', status: 'PENDING', count: 0 },
];

export const MOCK_TODOS: Todo[] = [
  { 
    id: 'cat-venue', 
    title: 'Venue & Accommodation', 
    status: 'PENDING', 
    assignedTo: '1',
    subtasks: [
      { id: 'v1', title: 'Finalize Hotel Booking', status: 'COMPLETED', assignedTo: '1' },
      { id: 'v2', title: 'Assign Guest Rooms', status: 'PENDING', assignedTo: '2' },
      { id: 'v3', title: 'Welcome Bags Distribution', status: 'PENDING', assignedTo: '3' },
    ]
  },
  { 
    id: 'cat-decor', 
    title: 'Decor & Vendor Logistics', 
    status: 'PENDING', 
    assignedTo: '2',
    subtasks: [
      { id: 'd1', title: 'Confirm Florist Order', status: 'COMPLETED', assignedTo: '2' },
      { id: 'd2', title: 'Finalize Mandap Design', status: 'PENDING', assignedTo: '1' },
      { id: 'd3', title: 'Book DJ & Sound System', status: 'PENDING', assignedTo: '2' },
    ]
  },
  { 
    id: 'cat-attire', 
    title: 'Outfits & Styling', 
    status: 'PENDING', 
    subtasks: [
      { id: 'o1', title: 'Bridal Lehenga Trial', status: 'COMPLETED' },
      { id: 'o2', title: 'Groom Sherwani Fitting', status: 'COMPLETED', assignedTo: '1' },
      { id: 'o3', title: 'Book Makeup Artist', status: 'COMPLETED' },
    ]
  },
  {
    id: 'cat-food',
    title: 'Catering & Menu',
    status: 'PENDING',
    assignedTo: '2',
    subtasks: [
      { id: 'f1', title: 'Food Tasting', status: 'COMPLETED', assignedTo: '1' },
      { id: 'f2', title: 'Finalize Drinks/Bar Menu', status: 'PENDING', assignedTo: '3' },
    ]
  }
];

export const MOCK_BUDGET: BudgetItem[] = [
  { id: 'b1', title: 'Venue & Accommodation', estimated: 1500000, actual: 1480000, paid: true },
  { id: 'b2', title: 'Catering (All Events)', estimated: 1200000, actual: 1250000, paid: false },
  { id: 'b3', title: 'Decor & Florist', estimated: 800000, actual: 800000, paid: false },
  { id: 'b4', title: 'Photography & DJ', estimated: 500000, actual: 0, paid: false },
];

export const getCurrentUser = (): User => MOCK_USERS[0]; 
