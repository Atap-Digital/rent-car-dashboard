import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Driver } from '@/constants/data';
import { fakeDriver } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import DriverTable from './driver-tables';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';

type TClientListingPage = {};

export default async function ClientListingPage({}: TClientListingPage) {
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
  const data = await fakeDriver.getDrivers(filters);
  const totalUsers = data.total_drivers;
  const driver: Driver[] = data.drivers;
  const date = new Date();
  // const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          {/* Main Content */}
          <div className="flex-1 lg:w-8/12">
            {' '}
            {/* Equivalent to col-lg-9 */}
            <div className="flex items-start justify-between">
              <Heading title={`Driver`} description="Menampilkan data driver" />

              <Link
                href={'/dashboard/driver/new'}
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'pointer-events-none'
                )}
              >
                <Plus className="mr-2 h-4 w-4" /> Tambah Driver
              </Link>
            </div>
            <Separator />
            <DriverTable data={driver} totalData={totalUsers} />
          </div>
          {/* Sidebar */}
          {/* <Card className="mt-4 lg:mt-0 lg:w-3/12">
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>John Doe</CardTitle>
                <Badge
                  className={`inline-flex items-center rounded-full bg-green-100 text-xs font-medium text-green-800 hover:bg-white`}
                >
                  On Duty
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="rounded-md">
              <ul className="mb-4 space-y-2 text-sm">
                <li>
                  <strong>Email: </strong> john.doe@example.com
                </li>
                <li>
                  <strong>Nomor Handphone: </strong> (123) 456-7890
                </li>
                <li>
                  <strong>Alamat: </strong>
                  <span className="break-words">
                    Jl. Ancar 1 No 1 BTN Kekalik Baru
                  </span>
                </li>
              </ul>
              <Separator />
              <div className="mt-4 flex items-center space-x-2">
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <div className="text-sm font-medium ">Total Jam Kerja</div>
                  <div className="text-xs text-gray-500">380 Jam</div>
                </div>
              </div>
            </CardContent>
            <Separator />
            <CardContent className="mt-4 rounded-md">
              <CardTitle className="mb-2">Jadwal Keberangkatan</CardTitle>
              <Calendar
                mode="single"
                selected={date}
                className="w-fit rounded-md border"
              />
              <div className="mt-4 max-h-64 overflow-y-auto">
                <ul className="space-y-2 text-sm">
                  <li className="mb-4 flex justify-between">
                    <div className="font-semibold">Aug 1</div>
                    <div>
                      <strong className="mr-2">Alice Johnson</strong>
                      <div className="flex items-center">
                        <svg
                          className="mr-1 h-4 w-4 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="mr-2">11:00 AM</span>
                        <svg
                          className="mr-1 h-4 w-4 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 11h14M5 7h14M5 15h14"
                          />
                        </svg>
                        <span>Toyota Camri</span>
                      </div>
                    </div>
                  </li>
                  <Separator />
                  <li className="mb-4 flex justify-between">
                    <div className="font-semibold">Aug 1</div>
                    <div>
                      <strong className="mr-2">Alice Johnson</strong>
                      <div className="flex items-center">
                        <svg
                          className="mr-1 h-4 w-4 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="mr-2">11:00 AM</span>
                        <svg
                          className="mr-1 h-4 w-4 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 11h14M5 7h14M5 15h14"
                          />
                        </svg>
                        <span>Toyota Camri</span>
                      </div>
                    </div>
                  </li>
                  <Separator />
                  <li className="mb-4 flex justify-between">
                    <div className="font-semibold">Aug 1</div>
                    <div>
                      <strong className="mr-2">Alice Johnson</strong>
                      <div className="flex items-center">
                        <svg
                          className="mr-1 h-4 w-4 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="mr-2">11:00 AM</span>
                        <svg
                          className="mr-1 h-4 w-4 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 11h14M5 7h14M5 15h14"
                          />
                        </svg>
                        <span>Toyota Camri</span>
                      </div>
                    </div>
                  </li>
                  <Separator />
                  <li className="mb-4 flex justify-between">
                    <div className="font-semibold">Aug 1</div>
                    <div>
                      <strong className="mr-2">Alice Johnson</strong>
                      <div className="flex items-center">
                        <svg
                          className="mr-1 h-4 w-4 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="mr-2">11:00 AM</span>
                        <svg
                          className="mr-1 h-4 w-4 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 11h14M5 7h14M5 15h14"
                          />
                        </svg>
                        <span>Toyota Camri</span>
                      </div>
                    </div>
                  </li>
                  <Separator />
                  <li className="mb-4 flex justify-between">
                    <div className="font-semibold">Aug 1</div>
                    <div>
                      <strong className="mr-2">Alice Johnson</strong>
                      <div className="flex items-center">
                        <svg
                          className="mr-1 h-4 w-4 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="mr-2">11:00 AM</span>
                        <svg
                          className="mr-1 h-4 w-4 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 11h14M5 7h14M5 15h14"
                          />
                        </svg>
                        <span>Toyota Camri</span>
                      </div>
                    </div>
                  </li>
                  <Separator />
                </ul>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </PageContainer>
  );
}
