import { NavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];
export type Service = {
  id: number;
  car_name: string;
  description: string;
  date_start: string;
  date_end: string;
  status: string;
  location: string;
  fee: number;
  photo_url: string;
};
export type Booking = {
  id: number;
  first_name: string;
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};
export type RiwayatTransaksi = {
  id: number;
  first_name: string;
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export type Product = {
  photo_url: string;
  nama_mobil: string;
  plat_nomor: string;
  created_at: string;
  harga_sewa: number;
  deskripsi: string;
  profit: number;
  id: number;
  updated_at: string;
};

export type Client = {
  id: number;
  email: string;
  name: string;
  phone: string; // Changed to string to support phone formatting
  address: string;
  document: string; // e.g., could be a URL or document type
};

export type Driver = {
  id: number;
  email: string;
  name: string;
  phone: string; // Changed to string to support phone formatting
  status: string; // Changed to string to support phone formatting
};

export type Keuangan = {
  id: number;
  invoice_id: number;
  client_name: string;
  car_model: string;
  rate_per_day: number;
  rate: number;
  rental_period: string;
  amount: string;
  due_date: string;
  status: string;
};
export type Cashflow = {
  id: number;
  expenses: string;
  category: string;
  quantity: string;
  amount: string;
  date: string;
  status: string;
};
export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Mobil',
    url: '/dashboard/mobil',
    icon: 'car',
    shortcut: ['m', 'm'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Booking',
    url: '/dashboard/booking',
    icon: 'order',
    shortcut: ['m', 'm'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Client',
    url: '/dashboard/client',
    icon: 'user',
    shortcut: ['k', 'k'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Driver',
    url: '/dashboard/driver',
    icon: 'carTaxi',
    shortcut: ['d', 'd'],
    isActive: false,
    items: [] // No child items
  }
];

export const navItemsAccounting: NavItem[] = [
  {
    title: 'Catatan Keuangan',
    url: '/dashboard/keuangan',
    icon: 'wallet',
    shortcut: ['w', 'w']
  },
  {
    title: 'Cashflow',
    shortcut: ['c', 'c'],
    url: '/dashboard/cashflow',
    icon: 'piggyBank'
  }
];
