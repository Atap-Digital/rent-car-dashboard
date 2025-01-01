import Image from 'next/image';

type Rental = {
  carPhotoUrl: string;
  carType: string;
  licensePlate: string;
  amount: string;
  rentalDuration: string;
  rentalDate: string; // Added rentalDate field
};

const rentalData: Rental[] = [
  {
    carPhotoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/9/9d/2018_Toyota_Camry_SE.jpg',
    carType: 'Toyota Camry',
    licensePlate: 'B 1234 CD',
    amount: 'Rp. 500,000',
    rentalDuration: '2 hari',
    rentalDate: '2023-10-01'
  },
  {
    carPhotoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/7/7e/2018_Honda_Civic_SR_VTEC_CVT_1.0_Front.jpg',
    carType: 'Honda Civic',
    licensePlate: 'B 5678 EF',
    amount: 'Rp. 300,000',
    rentalDuration: '1 hari',
    rentalDate: '2023-10-02'
  },
  {
    carPhotoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/4/44/2019_BMW_X5_xDrive30d_M_Sport_Automatic_3.0_Front.jpg',
    carType: 'BMW X5',
    licensePlate: 'B 9101 GH',
    amount: 'Rp. 1,200,000',
    rentalDuration: '3 hari',
    rentalDate: '2023-10-03'
  },
  {
    carPhotoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/3/3e/2018_Ford_Fiesta_ST-Line_1.0.jpg',
    carType: 'Ford Fiesta',
    licensePlate: 'B 1122 IJ',
    amount: 'Rp. 250,000',
    rentalDuration: '1 hari',
    rentalDate: '2023-10-04'
  },
  {
    carPhotoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/3/3b/2018_Mercedes-Benz_S_450_Luxury.jpg',
    carType: 'Mercedes S-Class',
    licensePlate: 'B 3344 KL',
    amount: 'Rp. 2,000,000',
    rentalDuration: '5 hari',
    rentalDate: '2023-10-05'
  }
];

export function RecentRentals() {
  return (
    <div className="space-y-8">
      {rentalData.map((rental, index) => (
        <div key={index} className="flex items-center">
          <Image
            src="/Mercedes Car PNG.png"
            alt="Car Photo"
            className="object-cover"
            width={120}
            height={120}
          />
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{rental.carType}</p>
            <p className="text-sm text-muted-foreground">
              {rental.licensePlate}
            </p>
            <p className="text-sm text-muted-foreground">
              {rental.rentalDate} {/* Display rental date */}
            </p>
          </div>
          <div className="ml-auto font-medium">{rental.amount}</div>
          <div className="ml-4 text-sm text-muted-foreground">
            {rental.rentalDuration}
          </div>
        </div>
      ))}
    </div>
  );
}
