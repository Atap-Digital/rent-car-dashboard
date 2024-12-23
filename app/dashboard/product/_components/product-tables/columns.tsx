'use client';
import { Product } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'photo_url',
    header: 'Gambar',
    cell: ({ row }) => {
      return (
        <div className="relative aspect-square">
          <Image
            src={row.getValue('photo_url')}
            alt={row.getValue('name')}
            fill
            className="rounded-lg"
          />
        </div>
      );
    }
  },
  {
    accessorKey: 'nama_mobil',
    header: 'Nama Mobil'
  },
  {
    accessorKey: 'plat_nomor',
    header: 'Plat Nomor'
  },
  {
    accessorKey: 'harga_sewa_display',
    header: 'Harga Sewa'
  },
  {
    accessorKey: 'profit_display',
    header: 'Profit'
  },
  {
    accessorKey: 'deskripsi',
    header: 'Deskripsi'
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
