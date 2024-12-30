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
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
// Assuming you have this icon or similar
interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const router = useRouter();
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
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
