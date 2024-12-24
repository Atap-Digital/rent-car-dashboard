'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

export const description = 'An interactive bar chart';

const chartData = [
  { date: '2024-04-01', desktop: 3 },
  { date: '2024-04-02', desktop: 7 },
  { date: '2024-04-03', desktop: 16 },
  { date: '2024-04-04', desktop: 22 },
  { date: '2024-04-05', desktop: 3 },
  { date: '2024-04-06', desktop: 3 },
  { date: '2024-04-07', desktop: 5 },
  { date: '2024-04-08', desktop: 9 },
  { date: '2024-04-09', desktop: 5 },
  { date: '2024-04-10', desktop: 1 },
  { date: '2024-04-11', desktop: 2 },
  { date: '2024-04-12', desktop: 22 },
  { date: '2024-04-13', desktop: 32 },
  { date: '2024-04-14', desktop: 47 },
  { date: '2024-04-15', desktop: 20 },
  { date: '2024-04-16', desktop: 8 },
  { date: '2024-04-17', desktop: 3 },
  { date: '2024-04-18', desktop: 64 },
  { date: '2024-04-19', desktop: 43 },
  { date: '2024-04-20', desktop: 4 },
  { date: '2024-04-21', desktop: 2 },
  { date: '2024-04-22', desktop: 24 },
  { date: '2024-04-23', desktop: 18 },
  { date: '2024-04-24', desktop: 3 },
  { date: '2024-04-25', desktop: 25 },
  { date: '2024-04-26', desktop: 5 },
  { date: '2024-04-27', desktop: 8 },
  { date: '2024-04-28', desktop: 22 },
  { date: '2024-04-29', desktop: 35 },
  { date: '2024-04-30', desktop: 44 },
  { date: '2024-05-01', desktop: 15 },
  { date: '2024-05-02', desktop: 4 },
  { date: '2024-05-03', desktop: 5 },
  { date: '2024-05-04', desktop: 5 },
  { date: '2024-05-05', desktop: 1 },
  { date: '2024-05-06', desktop: 3 },
  { date: '2024-05-07', desktop: 2 },
  { date: '2024-05-08', desktop: 4 },
  { date: '2024-05-09', desktop: 7 },
  { date: '2024-05-10', desktop: 13 },
  { date: '2024-05-11', desktop: 2 },
  { date: '2024-05-12', desktop: 17 },
  { date: '2024-05-13', desktop: 4 },
  { date: '2024-05-14', desktop: 8 },
  { date: '2024-05-15', desktop: 3 },
  { date: '2024-05-16', desktop: 1 },
  { date: '2024-05-17', desktop: 4 },
  { date: '2024-05-18', desktop: 5 },
  { date: '2024-05-19', desktop: 3 },
  { date: '2024-05-21', desktop: 2 },
  { date: '2024-05-22', desktop: 8 },
  { date: '2024-05-23', desktop: 2 },
  { date: '2024-05-24', desktop: 4 },
  { date: '2024-05-25', desktop: 1 },
  { date: '2024-05-26', desktop: 2 },
  { date: '2024-05-27', desktop: 4 },
  { date: '2024-05-28', desktop: 3 },
  { date: '2024-05-29', desktop: 8 },
  { date: '2024-05-30', desktop: 4 },
  { date: '2024-05-31', desktop: 18 },
  { date: '2024-06-01', desktop: 8 },
  { date: '2024-06-02', desktop: 7 },
  { date: '2024-06-03', desktop: 13 },
  { date: '2024-06-04', desktop: 9 },
  { date: '2024-06-05', desktop: 8 },
  { date: '2024-06-06', desktop: 4 },
  { date: '2024-06-07', desktop: 23 },
  { date: '2024-06-08', desktop: 3 },
  { date: '2024-06-09', desktop: 4 },
  { date: '2024-06-10', desktop: 15 },
  { date: '2024-06-11', desktop: 9 },
  { date: '2024-06-12', desktop: 2 },
  { date: '2024-06-13', desktop: 21 },
  { date: '2024-06-14', desktop: 4 },
  { date: '2024-06-15', desktop: 37 },
  { date: '2024-06-16', desktop: 31 },
  { date: '2024-06-17', desktop: 45 },
  { date: '2024-06-18', desktop: 17 },
  { date: '2024-06-19', desktop: 31 },
  { date: '2024-06-20', desktop: 50 },
  { date: '2024-06-21', desktop: 30 },
  { date: '2024-06-22', desktop: 31 },
  { date: '2024-06-23', desktop: 40 },
  { date: '2024-06-24', desktop: 32 },
  { date: '2024-06-25', desktop: 14 },
  { date: '2024-06-26', desktop: 44 },
  { date: '2024-06-27', desktop: 48 },
  { date: '2024-06-28', desktop: 14 },
  { date: '2024-06-29', desktop: 13 },
  { date: '2024-06-30', desktop: 46 }
];

const chartConfig = {
  views: {
    label: 'Jumlah'
  },
  desktop: {
    label: 'Total Transaksi',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig;

export function BarGraph() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('desktop');

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0)
    }),
    []
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Grafik Transaksi</CardTitle>
          <CardDescription>
            Menampilkan grafik data transaksi 3 bulan terakhir
          </CardDescription>
        </div>
        <div className="flex">
          {['desktop'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[280px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
