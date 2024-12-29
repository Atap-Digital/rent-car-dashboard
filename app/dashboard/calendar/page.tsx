import PageContainer from '@/components/layout/page-container';
import AdvancedRentalCarCalendar from './_components/AdvancedRentalCarCalendar.tsx';

export default function Home() {
  return (
    <PageContainer scrollable showRightContainer={false}>
      <AdvancedRentalCarCalendar />
    </PageContainer>
  );
}
