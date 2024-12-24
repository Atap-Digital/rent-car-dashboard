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

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};
export type Driver = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
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
export type Booking = {
  id: number;
  booking_date: string;
  customer_name: string;
  car_model: string;
  isWithDriver: boolean;
  driver_name?: string;
  duration: number;
  status: string;
  amount: number;
  payment_status: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
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
    title: 'Driver',
    url: '/dashboard/driver',
    icon: 'carTaxi',
    shortcut: ['d', 'd'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Karyawan',
    url: '/dashboard/karyawan',
    icon: 'user',
    shortcut: ['k', 'k'],
    isActive: false,
    items: [] // No child items
  },

  {
    title: 'Service',
    url: '/dashboard/service',
    icon: 'wrench',
    shortcut: ['s', 's'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Tugas Harian',
    url: '/dashboard/tugas',
    icon: 'kanban',
    shortcut: ['k', 'k'],
    isActive: false,
    items: [] // No child items
  }
];

export const navItemsAccounting: NavItem[] = [
  {
    title: 'Catatan Keuangan',
    url: '/dashboard/catatan-keuangan',
    icon: 'wallet',
    shortcut: ['w', 'w']
  },
  {
    title: 'Cashflow',
    shortcut: ['c', 'c'],
    url: '/dashboard/cashflow',
    icon: 'piggyBank'
  },
  {
    title: 'Riwayat Transaksi',
    url: '/dashboard/riwayat-transaksi',
    icon: 'bookOpenText',
    shortcut: ['t', 't'],
    isActive: false,
    items: [] // No child items
  }
];
