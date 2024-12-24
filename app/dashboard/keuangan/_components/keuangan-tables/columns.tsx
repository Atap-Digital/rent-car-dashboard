'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Keuangan } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

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
    header: 'Status'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
