import data from '@/mocks/transactions.json';
import { Transaction } from '@/types/transaction.ts';

export const initialState = {
  transactions: data as Transaction[],
  selectedMonth: new Date().getMonth() + 1, // Default to current month
  selectedYear: new Date().getFullYear(), // Default to current year
};

export type State = typeof initialState;

export enum ActionType {
  SET_MONTH_YEAR = 'SET_MONTH_YEAR',
}

export type MonthYearPayload = { month: number; year: number };

export type Action = { type: ActionType; payload: MonthYearPayload };
