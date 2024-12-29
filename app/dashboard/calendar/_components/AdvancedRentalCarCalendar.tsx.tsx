'use client';

import React, { useState } from 'react';
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views
} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { BookingDetails } from './BookingDetails';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const localizer = momentLocalizer(moment);

// Data kendaraan
const vehicles = [
  { id: 1, title: 'Toyota Avanza', color: 'hsl(var(--primary))' },
  { id: 2, title: 'Honda CR-V', color: 'hsl(var(--primary))' },
  { id: 3, title: 'Suzuki Ertiga', color: 'hsl(var(--primary))' },
  { id: 4, title: 'Mitsubishi Xpander', color: 'hsl(var(--primary))' },
  { id: 5, title: 'Daihatsu Terios', color: 'hsl(var(--primary))' }
];

// Data pemesanan
const generateBookings = () => {
  const bookings = [];
  const startDate = new Date();
  startDate.setDate(1); // Set to the first day of the current month
  const endDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + 1,
    0
  ); // Last day of the current month

  for (let i = 1; i <= 200; i++) {
    // Increased number of bookings for better monthly view
    const bookingDate = new Date(
      startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime())
    );
    const startHour = 8 + Math.floor(Math.random() * 8); // Start between 8 AM and 4 PM
    const duration = 2 + Math.floor(Math.random() * 6); // Duration 2-8 hours

    const start = new Date(bookingDate);
    start.setHours(startHour, 0, 0, 0);
    const end = new Date(start);
    end.setHours(start.getHours() + duration);

    bookings.push({
      id: i,
      title: `Customer ${i}`,
      start,
      end,
      resourceId: Math.floor(Math.random() * 5) + 1, // Random vehicle (1-5)
      customer: `Customer ${i}`,
      phone: `08${Math.floor(Math.random() * 1000000000)
        .toString()
        .padStart(9, '0')}`
    });
  }

  return bookings;
};

const bookings = generateBookings();

export default function AdvancedRentalCarCalendar() {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBookings, setFilteredBookings] = useState(bookings);
  const [currentView, setCurrentView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());

  const handleSelectEvent = (event: any) => {
    setSelectedBooking(event);
  };

  const handleCloseDetails = () => {
    setSelectedBooking(null);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filtered = bookings.filter(
      (booking) =>
        booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.phone.includes(searchTerm)
    );
    setFilteredBookings(filtered);
  };

  const eventStyleGetter = (
    event: any,
    start: any,
    end: any,
    isSelected: any
  ) => {
    const vehicle = vehicles.find((v) => v.id === event.resourceId);
    return {
      style: {
        backgroundColor: vehicle ? vehicle.color : 'hsl(var(--primary))',
        borderRadius: 'var(--radius)',
        opacity: 0.8,
        color: 'hsl(var(--primary-foreground))',
        border: '0px',
        display: 'block'
      }
    };
  };

  const handleViewChange = (view: any) => {
    setCurrentView(view);
  };

  const handleNavigate = (date: any) => {
    setDate(date);
  };

  const handleDrillDown = (date: any, view: any) => {
    setCurrentView(view);
    setDate(date);
  };

  return (
    <Card className="h-screen w-full">
      <CardHeader>
        <CardTitle>Rental Car Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
          <form onSubmit={handleSearch} className="flex space-x-2">
            <div className="space-y-2">
              <Label htmlFor="search">Search Customer or Phone</Label>
              <Input
                id="search"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>
        <div className="h-[calc(100vh-250px)]">
          <BigCalendar
            localizer={localizer}
            events={filteredBookings}
            date={date}
            view={currentView}
            onNavigate={handleNavigate}
            onView={handleViewChange}
            defaultView={Views.MONTH}
            views={[Views.DAY, Views.WEEK, Views.MONTH]}
            step={60}
            showMultiDayTimes
            defaultDate={new Date()}
            onSelectEvent={handleSelectEvent}
            eventPropGetter={eventStyleGetter}
            className="rounded-md border shadow-sm"
            components={{
              toolbar: CustomToolbar
            }}
            onDrillDown={(date) => handleDrillDown(date, Views.DAY)}
          />
        </div>
      </CardContent>
      {selectedBooking && (
        <BookingDetails
          booking={selectedBooking}
          onClose={handleCloseDetails}
          vehicles={vehicles}
        />
      )}
    </Card>
  );
}

function CustomToolbar({
  label,
  onNavigate,
  onView,
  views
}: {
  label: string;
  onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY', date?: Date) => void;
  onView: (view: string) => void;
  views: string[];
}) {
  const [activeButton, setActiveButton] = useState('month');

  const handleNavigate = (action: 'PREV' | 'NEXT' | 'TODAY') => {
    onNavigate(action);
    setActiveButton(action);
  };

  const handleView = (view: string) => {
    onView(view);
    setActiveButton(view);
  };

  return (
    <div className="mb-4 flex items-center justify-between rounded-md bg-muted p-2">
      <div>
        <Button
          variant="outline"
          onClick={() => handleNavigate('PREV')}
          className="hover:bg-primary hover:text-primary-foreground"
        >
          Back
        </Button>
        <Button
          variant="outline"
          onClick={() => handleNavigate('TODAY')}
          className="mx-2 hover:bg-primary hover:text-primary-foreground"
        >
          Today
        </Button>
        <Button
          variant="outline"
          onClick={() => handleNavigate('NEXT')}
          className="hover:bg-primary hover:text-primary-foreground"
        >
          Next
        </Button>
      </div>
      <span className="text-lg font-semibold">{label}</span>
      <div>
        {views.map((name) => (
          <Button
            key={name}
            variant={activeButton === name ? 'default' : 'outline'}
            onClick={() => handleView(name)}
            className="ml-2"
            style={{
              backgroundColor:
                activeButton === name ? 'hsl(var(--primary))' : '',
              color:
                activeButton === name ? 'hsl(var(--primary-foreground))' : ''
            }}
          >
            {name}
          </Button>
        ))}
      </div>
    </div>
  );
}
