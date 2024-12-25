'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Keuangan } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<Keuangan>[] = [
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
    accessorKey: 'invoice_id',
    header: 'Invoice ID'
  },
  {
    accessorKey: 'client_name',
    header: 'Client Name'
  },
  {
    accessorKey: 'car_model',
    header: 'Car Model'
  },
  {
    accessorKey: 'rate_per_day',
    header: 'Rate per Day'
  },
  {
    accessorKey: 'rental_period',
    header: 'Periode Rental'
  },
  {
    accessorKey: 'rate',
    header: 'Harga'
  },
  {
    accessorKey: 'due_date',
    header: 'Due Date'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColor =
        status === 'Paid'
          ? 'bg-green-100 text-green-800'
          : status === 'Pending'
          ? 'bg-yellow-100 text-yellow-800'
          : 'bg-red-100 text-red-800';
      return (
        <Badge
          className={`mb-4 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium hover:bg-white ${statusColor}`}
        >
          {status}
        </Badge>
      );
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
