'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PageContainer from '@/components/layout/page-container';

import { Product } from '@/constants/data';
import { ChartDetailMobil } from './area-chart';

export default function ProductDetail({
  initialData,
  pageTitle
}: {
  initialData: Product | null;
  pageTitle: string;
}) {
  const [periodeTerpilih, setPeriodeTerpilih] = useState('8 Bulan Terakhir');

  const product = {
    photo: initialData?.photo_url || '',
    name: initialData?.nama_mobil || '',
    price: initialData?.harga_sewa || 0,
    description: initialData?.deskripsi || '',
    plate_number: initialData?.plat_nomor || ''
  };

  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid gap-6">
            <Card>
              <Image
                src={product.photo || '/placeholder.svg'}
                alt={product.name || 'Car Image'}
                width={800}
                height={400}
                className="h-full w-full object-cover"
              />
            </Card>

            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Sedan</div>
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <div className="mt-2 flex items-center space-x-2">
                  <Badge>{product.plate_number}</Badge>
                  <span className="text-sm text-muted-foreground">12 Unit</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">
                  Rp {product.price.toLocaleString('id-ID')}
                </div>
                <div className="text-sm text-muted-foreground">/hari</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Tentang</h3>
              <p className="mt-2 text-muted-foreground">
                {product.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Spesifikasi</h3>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Transmisi</div>
                  <div className="font-medium">Otomatis</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Kapasitas</div>
                  <div className="font-medium">5 kursi</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    Jarak Tempuh
                  </div>
                  <div className="font-medium">400 mil dengan tangki penuh</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    Kecepatan Maksimal
                  </div>
                  <div className="font-medium">120 mph</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <ChartDetailMobil />

          <Card className="p-6">
            <h3 className="text-lg font-semibold">Fitur Mobil</h3>
            <div className="mt-4 space-y-3">
              {[
                'AC',
                'Konektivitas Bluetooth',
                'Kamera Mundur',
                'Kontrol Jelajah',
                'Masuk Tanpa Kunci',
                'Jendela dan Kunci Daya',
                'Radio AM/FM dengan Pemutar CD',
                'Port Pengisian USB',
                'Bagasi Luas',
                'Fitur Keamanan Canggih (misalnya, Peringatan Keberangkatan Jalur, Pengereman Darurat Otomatis)'
              ].map((fitur) => (
                <div key={fitur} className="flex items-center space-x-2">
                  <svg
                    className="h-4 w-4 text-green-500"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">{fitur}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Pengingat</h3>
              <Button variant="link" className="text-sm">
                Lihat Semua
              </Button>
            </div>
            <div className="mt-4 space-y-4">
              {[
                {
                  title: 'Pemeliharaan Terjadwal untuk Toyota Corolla',
                  date: '2028-08-10',
                  time: '10:00 AM'
                },
                {
                  title: 'Pengembalian Unit untuk Honda Civic',
                  date: '2028-08-12',
                  time: '02:00 PM'
                },
                {
                  title: 'Penggantian Ban untuk BMW X5',
                  date: '2028-08-15',
                  time: '09:00 AM'
                },
                {
                  title: 'Ganti Oli untuk Audi Q7',
                  date: '2028-08-18',
                  time: '11:30 AM'
                }
              ].map((pengingat) => (
                <Card key={pengingat.title} className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-blue-100 p-2">
                      <Bell className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <div className="font-medium">{pengingat.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {pengingat.date} pada {pengingat.time}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
