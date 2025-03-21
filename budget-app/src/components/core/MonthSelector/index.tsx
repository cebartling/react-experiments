import { FC } from 'react';
import { State } from '@/types/state.ts';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

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
      <button type="button" className="">
        <ChevronLeftIcon className="size-6 text-black" />
      </button>
      <div className="p-6">{date.toLocaleDateString()}</div>
      <button type="button" className="">
        <ChevronRightIcon className="size-6 text-black" />
      </button>
    </div>
  );
};
