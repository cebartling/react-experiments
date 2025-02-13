import { FC } from 'react';

export const TotalSpend: FC = () => {
  return (
    <div className="flex flex-row">
      <div className="text-xl font-bold text-neutral-500 uppercase">
        Total spent this month
      </div>
      <div className="text-4xl font-bold text-neutral-900 ml-auto">$0.00</div>
    </div>
  );
};
