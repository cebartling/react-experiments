import { FC } from 'react';
import { State } from '@/types/state.ts';

type MonthSelectorProps = {
  state: State;
  onChange: (month: number, year: number) => void;
};

export const MonthSelector: FC<MonthSelectorProps> = ({
  state,
}: MonthSelectorProps) => {
  const date = new Date(state.selectedYear, state.selectedMonth - 1, 1);

  return (
    <div className="flex flex-row">
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Back
      </button>
      <div className="">{date.toLocaleDateString()}</div>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Forward
      </button>
    </div>
  );
};
