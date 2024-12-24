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
import DriverTable from './driver-tables';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Component as BarChart } from './bar-chart';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { ChartConfig, ChartTooltip } from '@/components/ui/chart';
import { ChartTooltipContent } from '@/components/ui/chart';
import { ChartContainer } from '@/components/ui/chart';
type TDriverListingPage = {};

export default async function DriverListingPage({}: TDriverListingPage) {
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

  // Create an array of card data
  const cardDataArray = [
    {
      title: 'Card Title 1',
      icon: <Plus />,
      value: 'Value 1',
      change: 'Change 1'
    },
    {
      title: 'Card Title 2',
      icon: <Plus />,
      value: 'Value 2',
      change: 'Change 2'
    },
    {
      title: 'Card Title 3',
      icon: <Plus />,
      value: 'Value 3',
      change: 'Change 3'
    },
    {
      title: 'Card Title 4',
      icon: <Plus />,
      value: 'Value 4',
      change: 'Change 4'
    }
  ];

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Booking (${totalBookings})`}
            description="Manage booking (Server side table functionalities.)"
          />

          <Link
            href={'/dashboard/driver/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <div className="flex w-full justify-between space-x-4">
          <div className="grid flex-grow grid-cols-2 gap-4">
            {cardDataArray.map((cardData, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {cardData.title}
                  </CardTitle>
                  {cardData.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{cardData.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {cardData.change}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <BarChart />
        </div>
        <Separator />
        <DriverTable data={booking} totalData={totalBookings} />
      </div>
    </PageContainer>
  );
}
