import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Client } from '@/constants/data';
import { fakeClients } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import ClientTable from './client-tables';

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
  const data = await fakeClients.getClients(filters);
  const totalUsers = data.total_clients;
  const client: Client[] = data.clients;

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title={`Client`} description="Menampilkan data client" />

          <Link
            href={'/dashboard/client/new'}
            className={cn(
              buttonVariants({ variant: 'default' }),
              'pointer-events-none'
            )}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Client
          </Link>
        </div>
        <Separator />
        <ClientTable data={client} totalData={totalUsers} />
      </div>
    </PageContainer>
  );
}
