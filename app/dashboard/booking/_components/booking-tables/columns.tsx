'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Booking } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Badge } from '@/components/ui/badge'; // Import Badge component
import { X } from 'lucide-react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Import Button component
import { ArrowUpDown } from 'lucide-react'; // Import ArrowUpDown icon

export const columns: ColumnDef<Booking>[] = [
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
      <div className="flex justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'booking_code',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Kode
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center ">{row.original.booking_code}</div>
    ),
    enableSorting: true
  },
  {
    accessorKey: 'date',
    header: 'Tanggal',
    cell: ({ row }) => {
      const startDate = new Date(row.original.start_date);
      const endDate = new Date(row.original.end_date);
      const formatDate = (date: Date) =>
        date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      return (
        <div className="flex min-w-[200px] gap-1">
          <span className="font-normal">{formatDate(startDate)}</span>
          <span className="text-muted-foreground">-</span>
          <span className="font-normal">{formatDate(endDate)}</span>
        </div>
      );
    },
    enableSorting: true
  },
  // {
  //   accessorKey: 'booking_date',
  //   header: ({ column }) => (
  //     <Button
  //       variant="ghost"
  //       onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //     >
  //       Tanggal
  //       <ArrowUpDown className="ml-2 h-4 w-4" />
  //     </Button>
  //   ),
  //   cell: ({ row }) => {
  //     const date = new Date(row.original.booking_date);
  //     return (
  //       <div>
  //         {date.toLocaleDateString('en-US', {
  //           year: 'numeric',
  //           month: 'long',
  //           day: 'numeric'
  //         })}
  //       </div>
  //     );
  //   },
  //   enableSorting: true
  // },
  {
    accessorKey: 'customer_name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Pelanggan
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex ">{row.original.customer_name}</div>
    ),
    enableSorting: true
  },
  {
    accessorKey: 'car_model',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Mobil
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">{row.original.car_model}</div>
    ),
    enableSorting: true
  },

  {
    accessorKey: 'duration',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Durasi
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const duration = row.original.duration;
      return (
        <div className="flex justify-center">
          {`${duration} ${duration === 1 ? 'day' : 'days'}`}
        </div>
      );
    },
    enableSorting: true
  },

  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Total
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = row.original.amount;
      const formatToRupiah = (amount: number) => {
        return amount.toLocaleString('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        });
      };
      return (
        <div className="flex justify-center">{formatToRupiah(amount)}</div>
      );
    },
    enableSorting: true
  },
  {
    accessorKey: 'payment_status',
    header: ({ column }) => (
      <div className="min-w-[160px]">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Payment Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Badge
          variant={
            row.original.payment_status === 'Paid' ? 'default' : 'destructive'
          }
        >
          {row.original.payment_status}
        </Badge>
      </div>
    ),
    enableSorting: true
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <div className="min-w-[150px]">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Booking Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Badge
          variant={
            row.original.status === 'Pending'
              ? 'secondary'
              : row.original.status === 'Confirmed'
              ? 'default'
              : 'destructive'
          }
        >
          {row.original.status}
        </Badge>
      </div>
    ),
    enableSorting: true
  },
  // {
  //   accessorKey: 'isWithDriver',
  //   header: 'Driver',
  //   cell: ({ row }) => (
  //     <div className="flex justify-center">
  //       <Badge
  //         variant={row.original.isWithDriver ? 'default' : 'destructive'}
  //         className="flex aspect-square h-6 w-6 items-center justify-center rounded-full p-1 opacity-100"
  //       >
  //         {row.original.isWithDriver ? (
  //           <Check className="h-4 w-4" />
  //         ) : (
  //           <X className="h-4 w-4 " />
  //         )}
  //       </Badge>
  //     </div>
  //   ),
  //   enableSorting: true
  // },

  {
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <CellAction data={row.original} />
      </div>
    )
  }
];
