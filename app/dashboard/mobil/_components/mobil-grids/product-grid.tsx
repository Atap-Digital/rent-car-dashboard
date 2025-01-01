'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Product } from '@/constants/mock-api';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Eye, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { AlertModal } from '@/components/modal/alert-modal';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <Card
          key={product.id}
          className="transform shadow-md transition-transform hover:scale-105"
        >
          <CardHeader>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <CardTitle className="text-sm">{product.nama_mobil}</CardTitle>
                <CardDescription className="text-xs">
                  {product.deskripsi}
                </CardDescription>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-primary">
                  Rp {product.harga_sewa.toLocaleString('id-ID')}{' '}
                  <span className="text-xs font-normal text-accent-foreground">
                    / hari
                  </span>
                </p>
              </div>
            </div>
            <div className="flex justify-center p-4">
              <Image
                src={product.photo_url}
                alt={product.nama_mobil}
                className="object-cover"
                width={250}
                height={250}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row items-center justify-between">
              <Badge className="rounded bg-primary px-2 py-1 text-xs font-normal">
                Tersedia
              </Badge>
              <span className="rounded bg-secondary px-2 py-1 text-xs font-normal">
                {product.plat_nomor}
              </span>
            </div>
            <div className="mt-2 flex flex-row space-x-2">
              <span className="rounded bg-secondary px-2 py-1 text-xs">
                Manual
              </span>
              <span className="rounded bg-secondary px-2 py-1 text-xs">
                5 kursi
              </span>
              <span className="rounded bg-secondary px-2 py-1 text-xs">
                Bensin
              </span>
            </div>
            <div className="mt-4 flex flex-row items-center space-x-2">
              <Button
                className="pointer-events-none w-full text-xs"
                onClick={() => router.push(`/dashboard/mobil/${product.id}`)}
              >
                Pilih Mobil
              </Button>
              <Button
                className="pointer-events-none p-2 text-xs"
                variant="secondary"
              >
                <MoreHorizontal className="h-5 w-5" />
              </Button>
              <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={() => {}}
                loading={loading}
              />
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/dashboard/mobil/${product.id}`)
                    }
                  >
                    <Eye className="mr-2 h-4 w-4" /> Detail
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/dashboard/mobil/${product.id}`)
                    }
                  >
                    <Edit className="mr-2 h-4 w-4" /> Update
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => setOpen(true)}>
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
