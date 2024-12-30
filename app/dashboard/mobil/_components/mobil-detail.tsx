'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/constants/mock-api';

export default function ProductDetail({
  initialData,
  pageTitle
}: {
  initialData: Product | null;
  pageTitle: string;
}) {
  const product = {
    photo: initialData?.photo_url || '',
    name: initialData?.nama_mobil || '',
    price: initialData?.harga_sewa || 0,
    description: initialData?.deskripsi || '',
    plate_number: initialData?.plat_nomor || ''
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{product.name}</span>
            <Button variant="outline">Edit</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Badge>{product.plate_number}</Badge>
            <span className="text-xl font-bold">${product.price} / day</span>
          </div>
          <p className="mt-4">{product.description}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p>Total Distance this year</p>
          </div>
          <div className="mt-4">
            <p>Traveled in last month</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Car Features</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Reminders</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
