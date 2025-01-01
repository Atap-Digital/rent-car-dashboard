'use client';
import { Product } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'photo_url',
    header: () => <div className="text-center">Gambar</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <Image
            src={row.getValue('photo_url')}
            alt={row.getValue('name')}
            width={100}
            height={100}
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
    accessorKey: 'harga_sewa',
    header: 'Harga Sewa'
  },
  {
    accessorKey: 'profit',
    header: 'Profit'
  },
  {
    accessorKey: 'deskripsi',
    header: 'Deskripsi'
  },
  {
    accessorKey: 'owner',
    header: 'Owner'
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
