import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Keuangan } from '@/constants/data';
import { fakeKeuangan } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import KeuanganTable from './keuangan-tables';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type TKeuanganListingPage = {};

export default async function KeuanganListingPage({}: TKeuanganListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const gender = searchParamsCache.get('gender');
  const pageLimit = searchParamsCache.get('limit');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(gender && { genders: gender })
  };

  // mock api call
  const data = await fakeKeuangan.getKeuangan(filters);
  const totalUsers = data.total_records;
  const keuangan: Keuangan[] = data.records;

  const dataCard = {
    totalRevenue: {
      title: 'Total Pendapatan',
      value: 'Rp. 100.000.000',
      change: '+12% dari bulan sebelumnya',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )
    },
    subscriptions: {
      title: 'Total Booking',
      value: '+80',
      change: '+30% dari bulan sebelumnya',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    sales: {
      title: 'Total Keuntungan',
      value: 'Rp. 20.000.000',
      change: '+5% dari bulan sebelumnya',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <path d="M2 10h20" />
        </svg>
      )
    },
    activeNow: {
      title: 'Total Mobil Saat Ini',
      value: '+24',
      change: '+2 dari bulan sebelumnya',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      )
    }
  };
  return (
    <PageContainer scrollable>
      <div className="flex items-start justify-between">
        <Heading title={`Keuangan`} description="Menampilkan data keuangan" />

        {/* <Link
          href={'/dashboard/keuangan/new'}
          className={cn(buttonVariants({ variant: 'default' }))}
        >
          <Plus className="mr-2 h-4 w-4" /> Tambah Data Keuangan
        </Link> */}
      </div>
      <div className="mb-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Object.values(dataCard).map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">{item.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="space-y-4">
        <KeuanganTable data={keuangan} totalData={totalUsers} />
      </div>
    </PageContainer>
  );
}
