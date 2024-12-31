import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import RightContainer from './right-container';

export default function PageContainer({
  children,
  scrollable = true,
  showRightContainer = false
}: {
  children: React.ReactNode;
  scrollable?: boolean;
  showRightContainer?: boolean;
}) {
  return (
    <>
      {scrollable ? (
        <div className="flex h-full w-full justify-between">
          <ScrollArea className="h-[calc(100dvh-52px)] w-full">
            <div className="h-full p-4 md:px-6">{children}</div>
          </ScrollArea>
          {showRightContainer && <RightContainer />}
        </div>
      ) : (
        <div className="h-full p-4 md:px-6">{children}</div>
      )}
    </>
  );
}
