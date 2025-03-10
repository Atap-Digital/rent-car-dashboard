import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import ProductViewPage from '../_components/mobil-view-page';

export const metadata = {
  title: 'Dashboard : Mobil View'
};

type PageProps = { params: { mobilId: string } };

export default function Page({ params }: PageProps) {
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <ProductViewPage productId={params.mobilId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
