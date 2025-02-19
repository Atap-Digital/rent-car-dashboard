import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface Booking {
  id: number;
  title: string;
  start: Date;
  end: Date;
  resourceId: number;
  customer: string;
  phone: string;
}

interface Vehicle {
  id: number;
  title: string;
  color: string;
}

interface BookingDetailsProps {
  booking: Booking;
  onClose: () => void;
  vehicles: Vehicle[];
}

export function BookingDetails({
  booking,
  onClose,
  vehicles
}: BookingDetailsProps) {
  const vehicle = vehicles.find((v: Vehicle) => v.id === booking.resourceId);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{booking.title}</DialogTitle>
          <DialogDescription>Detail Booking</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customer" className="text-right">
              Nama
            </Label>
            <div id="customer" className="col-span-3">
              {booking.customer}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Kontak
            </Label>
            <div id="phone" className="col-span-3">
              {booking.phone}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="vehicle" className="text-right">
              Mobil
            </Label>
            <div id="vehicle" className="col-span-3">
              {vehicle ? vehicle.title : 'Unknown'}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="start" className="text-right">
              Berangkat
            </Label>
            <div id="start" className="col-span-3">
              {booking.start.toLocaleString()}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="end" className="text-right">
              Kembali
            </Label>
            <div id="end" className="col-span-3">
              {booking.end.toLocaleString()}
            </div>
          </div>
          {vehicle && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color" className="text-right">
                Warna Mobil
              </Label>
              <div id="color" className="col-span-3 flex items-center">
                <div
                  className="mr-2 h-6 w-6 rounded-full"
                  style={{ backgroundColor: vehicle.color }}
                ></div>
              </div>
            </div>
          )}
        </div>
        <Button onClick={onClose} className="mt-4 w-full">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
