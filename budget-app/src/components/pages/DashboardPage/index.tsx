import { FC, useReducer } from 'react';
import { MonthSelector } from '@/components/core/MonthSelector';
import { AppTitle } from '@/components/core/AppTitle';
import { TotalSpend } from '@/components/core/TotalSpend';
import { ExpensesByCategoryPieChart } from '@/components/core/ExpensesByCategoryPieChart';
import { TransactionsListing } from '@/components/core/TransactionsListing';
import { Action, ActionType, initialState, State } from '@/types/state.ts';

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SET_MONTH_YEAR:
      return {
        ...state,
        selectedMonth: action.payload.month,
        selectedYear: action.payload.year,
      };
    default:
      return state;
  }
};

export const DashboardPage: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleChangeMonthSelector(month: number, year: number) {
    dispatch({ type: ActionType.SET_MONTH_YEAR, payload: { month, year } });
  }

  return (
    <div className="flex flex-col items-center w-full h-full rounded-2xl bg-purple-200 text-neutral-800">
      <div className="flex flex-row">
        <AppTitle />
        <MonthSelector onChange={handleChangeMonthSelector} state={state} />
      </div>
      <TotalSpend state={state} />
      <div className="flex flex-row">
        <ExpensesByCategoryPieChart />
        <TransactionsListing />
      </div>
    </div>
  );
};
