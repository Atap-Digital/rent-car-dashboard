'use client';

import * as React from 'react';
import { TrendingDown } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

const chartData = [
  { kategori: 'Servis Mobil', jumlah: 500, fill: 'hsl(var(--chart-1))' },
  { kategori: 'Inventaris', jumlah: 300, fill: 'hsl(var(--chart-2))' },
  {
    kategori: 'Perlengkapan Kantor',
    jumlah: 150,
    fill: 'hsl(var(--chart-3))'
  },
  { kategori: 'Utilitas', jumlah: 200, fill: 'hsl(var(--chart-4))' },
  { kategori: 'Lain-lain', jumlah: 100, fill: 'hsl(var(--chart-5))' }
];

const chartConfig = {
  jumlah: {
    label: 'Jumlah'
  },
  'Servis Mobil': {
    label: 'Servis Mobil',
    color: 'hsl(var(--chart-1))'
  },
  Inventaris: {
    label: 'Inventaris',
    color: 'hsl(var(--chart-2))'
  },
  'Perlengkapan Kantor': {
    label: 'Perlengkapan Kantor',
    color: 'hsl(var(--chart-3))'
  },
  Utilitas: {
    label: 'Utilitas',
    color: 'hsl(var(--chart-4))'
  },
  'Lain-lain': {
    label: 'Lain-lain',
    color: 'hsl(var(--chart-5))'
  }
} satisfies ChartConfig;

export function PieGraph() {
  const totalPengeluaran = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.jumlah, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Rincian Pengeluaran Bulanan</CardTitle>
        <CardDescription>Januari - Juni 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[360px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="jumlah"
              nameKey="kategori"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalPengeluaran.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Pengeluaran
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Tren menurun sebesar 3.1% bulan ini{' '}
          <TrendingDown className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Menampilkan total pengeluaran selama 6 bulan terakhir
        </div>
      </CardFooter>
    </Card>
  );
}
