'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

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
  { month: 'Januari', desktop: 320 },
  { month: 'Februari', desktop: 450 },
  { month: 'Maret', desktop: 380 },
  { month: 'April', desktop: 470 },
  { month: 'Mei', desktop: 520 },
  { month: 'Juni', desktop: 560 },
  { month: 'Juli', desktop: 480 },
  { month: 'Agustus', desktop: 510 },
  { month: 'September', desktop: 490 },
  { month: 'Oktober', desktop: 530 },
  { month: 'November', desktop: 600 },
  { month: 'Desember', desktop: 580 }
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig;

export function AreaGraph() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Grafik Area - Desktop</CardTitle>
        <CardDescription>
          Menampilkan total desktop selama 6 bulan terakhir
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <AreaChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Tren naik sebesar 5.2% bulan ini{' '}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Januari - Juni 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
