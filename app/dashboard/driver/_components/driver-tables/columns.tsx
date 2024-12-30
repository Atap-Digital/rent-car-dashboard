'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Driver } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<Driver>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: 'Nama'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'phone',
    header: 'Nomor Handphone'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColor =
        status === 'Aktif'
          ? 'bg-green-100 text-green-800'
          : status === 'Izin'
          ? 'bg-yellow-100 text-yellow-800'
          : status === 'Pasif'
          ? 'bg-gray-100 text-gray-800'
          : 'bg-red-100 text-red-800';
      return (
        <div className="flex justify-center">
          <Badge
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium hover:bg-white ${statusColor}`}
          >
            {status === 'Aktif' && 'On Duty'}
            {status === 'Izin' && 'Izin'}
            {status === 'Pasif' && 'Stand By'}
            {status !== 'Aktif' &&
              status !== 'Izin' &&
              status !== 'Pasif' &&
              'Sakit'}
          </Badge>
        </div>
      );
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
