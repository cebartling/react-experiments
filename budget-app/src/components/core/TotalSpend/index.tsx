import { FC } from 'react';
import { State } from '@/types/state';
import { Transaction } from '@/types/transaction.ts';

type TotalSpendProps = {
  state: State;
};

export const TotalSpend: FC<TotalSpendProps> = ({
  state: { transactions },
}: TotalSpendProps) => {
  const totalAmount = transactions.reduce(
    (sum: number, transaction: Transaction) => sum + transaction.amount,
    0
  );

  return (
    <div className="flex flex-row">
      <div className="text-xl font-bold text-neutral-500 uppercase">
        Total spent this month
      </div>
      <div className="text-4xl font-bold text-neutral-900 ml-auto">
        ${totalAmount.toFixed(2)}
      </div>
    </div>
  );
};
