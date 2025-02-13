import { FC } from 'react';
import { Transaction } from '@/types/transaction';
import { MonthSelector } from '@/components/core/MonthSelector';
import { AppTitle } from '@/components/core/AppTitle';
import { TotalSpend } from '@/components/core/TotalSpend';

type DashboardPageProps = {
  data: Transaction[];
};

export const DashboardPage: FC<DashboardPageProps> = () => {
  return (
    <div className="flex flex-col items-center w-full h-full rounded-2xl bg-purple-200 text-neutral-800">
      <div className="flex flex-row">
        <AppTitle />
        <MonthSelector />
      </div>
      <TotalSpend />
      <div className=""></div>
    </div>
  );
};
