'use client';

import React from 'react';
import { format } from 'date-fns';
import {
  CalendarIcon,
  CarIcon,
  BadgeInfoIcon,
  BadgeCheckIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { RecentRentals } from '@/app/dashboard/overview/_components/recent-sales';
import { time } from 'console';

const RightContainer = () => {
  return (
    <div className="hidden h-full shrink-0 space-y-4 px-4 md:block md:w-[350px]">
      <CardWithForm />
      <RecentActivity />
    </div>
  );
};

export function CardWithForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Periksa Ketersediaan Mobil</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <Select>
            <SelectTrigger id="framework">
              <SelectValue placeholder="Pilih Tipe Mobil" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="next">Toyota</SelectItem>
              <SelectItem value="sveltekit">Honda</SelectItem>
              <SelectItem value="astro">Suzuki</SelectItem>
              <SelectItem value="nuxt">Mitsubishi</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex flex-col gap-4">
            <Label htmlFor="date">Pilih Tanggal</Label>
            <DatePickerDemo />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cek</Button>
      </CardFooter>
    </Card>
  );
}

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          {date ? format(date, 'PPP') : <span>Pilih tanggal</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export function RecentActivity() {
  const activityData = [
    {
      icon: <CalendarIcon />,
      customerName: 'Ahmad Junaidi',
      carType: 'Toyota Corolla',
      licensePlate: 'TX1234',
      rentalDate: 'Today',
      time: '10:15 AM',
      status: 'menyelesaikan perjalanan'
    },
    {
      icon: <BadgeInfoIcon />,
      customerName: 'Ahmad Syahroni',
      carType: 'Honda Civic',
      licensePlate: 'HX5678',
      rentalDate: 'Today',
      time: '11:30 AM',
      status: 'menunggu konfirmasi booking'
    },
    {
      icon: <BadgeCheckIcon />,
      customerName: 'Alwi Assegaf',
      carType: 'Ford Focus',
      licensePlate: 'FX9101',
      rentalDate: 'Yesterday',
      time: '09:45 AM',
      status: 'memesan mobil'
    },
    {
      icon: <CarIcon />,
      customerName: 'Diana ',
      carType: 'Chevrolet Malibu',
      licensePlate: 'CX2345',
      rentalDate: 'Yesterday',
      time: '02:20 PM',
      status: 'menyelesaikan perjalanan'
    },
    {
      icon: <BadgeInfoIcon />,
      customerName: 'Gilang',
      carType: 'Nissan Altima',
      licensePlate: 'NX6789',
      rentalDate: 'Yesterday',
      time: '03:10 PM',
      status: 'memesan mobil '
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aktivitas Terbaru</CardTitle>
      </CardHeader>
      <CardContent className="max-h-80 space-y-4 overflow-y-auto">
        {activityData.map((rental, index) => (
          <div key={index} className="relative flex items-start space-x-4">
            <div className="relative shrink-0">
              {rental.icon}
              {index < activityData.length - 1 && (
                <div className="absolute left-1/2 top-8 h-full w-px -translate-x-1/2 transform bg-gray-300"></div>
              )}
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                <span className="font-bold">{rental.customerName}</span>
              </p>
              <p className="text-sm font-medium leading-none">
                {rental.status}
              </p>
              <p className="text-sm font-medium leading-none">
                <span className="font-bold">{rental.carType}</span> (
                <span className="font-bold">{rental.licensePlate}</span>)
              </p>
              <p className="text-xs text-muted-foreground">
                {rental.rentalDate}
              </p>
            </div>
            <div className="ml-auto text-xs font-medium">{rental.time}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default RightContainer;
