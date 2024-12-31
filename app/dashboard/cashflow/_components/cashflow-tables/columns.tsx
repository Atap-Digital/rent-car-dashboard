'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Cashflow } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<Cashflow>[] = [
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
    accessorKey: 'expenses',
    header: 'Expenses'
  },
  {
    accessorKey: 'category',
    header: 'Category'
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity'
  },
  {
    accessorKey: 'amount',
    header: 'Amount'
  },
  {
    accessorKey: 'date',
    header: 'Tanggal'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColor =
        status === 'Approved'
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
