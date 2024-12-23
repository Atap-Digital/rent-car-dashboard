import { ScrollArea } from '@/components/ui/scroll-area';
import TransactionForm from './employee-form';
import PageContainer from '@/components/layout/page-container';

export default function TransactionViewPage() {
  return (
    <PageContainer>
      <TransactionForm />
    </PageContainer>
  );
}
