import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Booking } from '@/constants/data';

import { fakeBookings } from '@/constants/mock-api';

import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Component as BarChart } from './bar-chart';

type TBookingListingPage = {};
import BookingTable from './booking-tables';

export default async function BookingListingPage({}: TBookingListingPage) {
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
  const data = await fakeBookings.getBookings(filters);
  const totalBookings = data.total_bookings;
  const booking: Booking[] = data.bookings;

  const dataBooking = {
    totalRevenue: {
      title: 'Total Booking',
      value: '312',
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
      title: 'Mobil Ready',
      value: '80',
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
      title: 'Perjalanan Selesai',
      value: '15',
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
      title: 'Perjalanan On Going',
      value: '24',
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
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Booking`}
            description="Menampilkan daftar booking mobil"
          />

          <Link
            href={'/dashboard/booking/new'}
            className={cn(
              buttonVariants({ variant: 'default' }),
              'pointer-events-none'
            )}
          >
            <Plus className="mr-2 h-4 w-4" /> Tambah Data Booking
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-4">
          {Object.values(dataBooking).map((item, index) => (
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
        {/* <div className="md:w-6/12">
            <BarChart />
          </div> */}
        <Separator />
        <BookingTable data={booking} totalData={totalBookings} />
      </div>
    </PageContainer>
  );
}
