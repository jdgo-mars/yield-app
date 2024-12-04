import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { variant: "bounds", percentage: 1500, fill: "var(--color-bounds)" },
  { variant: "stocks", percentage: 2300, fill: "var(--color-stocks)" },
  { variant: "crypto", percentage: 5000, fill: "var(--color-crypto)" },
  { variant: "etf", percentage: 6421, fill: "var(--color-etf)" },
];

const chartConfig = {
  percentage: {
    label: "Percentage",
  },
  bounds: {
    label: "Bounds",
    color: "hsl(var(--chart-1))",
  },
  stocks: {
    label: "Stocks",
    color: "hsl(var(--chart-2))",
  },
  crypto: {
    label: "Crypto",
    color: "hsl(var(--chart-3))",
  },
  etf: {
    label: "Etf",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

// TODO: pass props to set data and title
export function AppPieChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Pie data={chartData} dataKey="percentage" innerRadius={60} />
            <ChartLegend
              content={<ChartLegendContent nameKey="variant" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
