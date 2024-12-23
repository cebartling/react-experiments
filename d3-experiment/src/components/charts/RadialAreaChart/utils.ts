import { DataPoint } from '~/components/charts/RadialAreaChart/types';

export function generateSampleData(): DataPoint[] {
  const now = new Date();
  const data: DataPoint[] = [];

  for (let i = 0; i < 12; i++) {
    data.push({
      date: new Date(now.getFullYear(), i, 1),
      value: Math.random() * 100 + 50
    });
  }

  return data;
}
