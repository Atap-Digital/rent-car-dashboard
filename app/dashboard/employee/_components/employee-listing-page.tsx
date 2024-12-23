import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Transaction } from '@/constants/data';
import { fakeTransactions } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import TransactionTable from './employee-tables';

type TTransactionListingPage = {};

export default async function TransactionListingPage({}: TTransactionListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const statuses = searchParamsCache.get('statuses');
  const pageLimit = searchParamsCache.get('limit');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(statuses && { statuses: statuses })
  };

  // mock api call
  const data = await fakeTransactions.getTransactions(filters);
  const totalTransactions = data.total_transactions;
  const transactions: Transaction[] = data.transactions;

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Transaction (${totalTransactions})`}
            description="Manage transactions (Server side table functionalities.)"
          />

          <Link
            href={'/dashboard/employee/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <TransactionTable data={transactions} totalData={totalTransactions} />
      </div>
    </PageContainer>
  );
}
