'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Transaction } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Transaction>[] = [
  {
    id: 'pilih',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Pilih semua"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Pilih baris"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'customer_name',
    header: 'Nama Pelanggan'
  },
  {
    accessorKey: 'car_model',
    header: 'Model Mobil'
  },
  {
    accessorKey: 'rental_date',
    header: 'Tanggal Sewa'
  },
  {
    accessorKey: 'rental_time',
    header: 'Waktu Sewa'
  },
  {
    accessorKey: 'return_date',
    header: 'Tanggal Kembali'
  },
  {
    accessorKey: 'return_time',
    header: 'Waktu Kembali'
  },
  {
    accessorKey: 'total_amount',
    header: 'Jumlah Total'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    accessorKey: 'duration',
    header: 'Durasi'
  },
  {
    id: 'aksi',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
