export interface DataPoint {
  date: Date;
  value: number;
}

export interface RadialAreaChartProps {
  width?: number;
  height?: number;
  data?: DataPoint[];
}
