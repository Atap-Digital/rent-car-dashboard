'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '@/constants/mock-api';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <Card key={product.id} className="shadow-md">
          <CardHeader>
            <img
              src={product.photo_url}
              alt={product.nama_mobil}
              className="h-48 w-full object-cover"
            />
          </CardHeader>
          <CardContent>
            <CardTitle>{product.nama_mobil}</CardTitle>
            <p>{product.deskripsi}</p>
            <p className="text-lg font-semibold">${product.harga_sewa}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
