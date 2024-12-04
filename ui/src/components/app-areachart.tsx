import { TrendingDown, TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { restClient } from "@polygon.io/client-js";
import { useCallback, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useData } from "@/hooks/use-data";

function getPastWorkingDate(startDate: string, days: number): string {
  let currentDate = new Date(startDate); // Start from the given date

  while (days > 0) {
    // Move one day back
    currentDate.setDate(currentDate.getDate() - 1);

    // Check if it's a working day (Monday to Friday)
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      // 0 = Sunday, 6 = Saturday
      days--;
    }
  }

  return currentDate.toISOString().slice(0, 10);
}

type ValueOf<T> = T[keyof T];
const AggregateLabels = {
  fiveDays: "5d",
  oneMonth: "1m",
  threeMonths: "3m",
  sixMonths: "6m",
  oneYear: "1y",
  fiveYears: "5y",
};

type definition = {
  multiplier: number;
  timespan: string;
  numberOfDays: number;
};

const aggregatesDef: Record<ValueOf<typeof AggregateLabels>, definition> = {
  [AggregateLabels.fiveDays]: {
    numberOfDays: 5,
    multiplier: 30,
    timespan: "minute",
  },
  [AggregateLabels.oneMonth]: {
    numberOfDays: 30,
    multiplier: 1,
    timespan: "hour",
  },
  [AggregateLabels.threeMonths]: {
    numberOfDays: 90,
    multiplier: 4,
    timespan: "hour",
  },
  [AggregateLabels.sixMonths]: {
    numberOfDays: 180,
    multiplier: 1,
    timespan: "week",
  },
  [AggregateLabels.oneYear]: {
    numberOfDays: 365,
    multiplier: 1,
    timespan: "week",
  },
  [AggregateLabels.fiveYears]: {
    numberOfDays: 365 * 5,

    multiplier: 1,
    timespan: "week",
  },
};

function AppToggleGroup({
  selected,
  items,
  onChange,
}: {
  selected: string;
  items: string[];
  onChange: (value: string) => void;
}) {
  return (
    <ToggleGroup
      type="single"
      value={selected}
      onValueChange={(value) => value && onChange(value)}
    >
      {items.map((item) => (
        <ToggleGroupItem key={item} value={item} aria-label={`Toggle ${item}`}>
          {item}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

function getAggregates(
  ticker: string,
  aggregateLabel: ValueOf<typeof AggregateLabels>
) {
  const rest = restClient(import.meta.env.VITE_POLY_API_KEY);
  const { numberOfDays, multiplier, timespan } = aggregatesDef[aggregateLabel];
  const now = new Date().toISOString().slice(0, 10);

  return rest.stocks.aggregates(
    ticker,
    multiplier,
    timespan,
    getPastWorkingDate(now, numberOfDays),
    now,
    {
      sort: "asc",
    }
  );
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function AppAreaChart({ ticker }: { ticker: string }) {
  const [aggregateLabel, setAggregateLabel] =
    useState<ValueOf<typeof AggregateLabels>>("5d");

  const aggregatesCallback = useCallback(
    () => getAggregates(ticker, aggregateLabel),
    [aggregateLabel, ticker]
  );

  const { data } = useData(aggregatesCallback);
  const min = Math.floor(Math.min(...(data?.results?.map((d) => d.c!) || [])));
  const max = Math.ceil(Math.max(...(data?.results?.map((d) => d.c!) || [])));
  const percentage = useMemo(() => {
    if (!data) return 0;

    return Math.abs(
      Math.round(
        ((data?.results!.at(0)!.c! - data?.results!.at(-1)!.c!) /
          data?.results!.at(0)!.c!) *
          100
      )
    );
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{ticker}</CardTitle>
        {/* <CardDescription>
        </CardDescription> */}
        <AppToggleGroup
          selected={aggregateLabel}
          items={Object.values(AggregateLabels)}
          onChange={(val) => setAggregateLabel(val)}
        />
      </CardHeader>
      <CardContent>
        <ResponsiveContainer height={240}>
          <ChartContainer config={chartConfig}>
            <AreaChart
              height={100}
              accessibilityLayer
              data={data?.results}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="t"
                tickLine={false}
                axisLine={true}
                tickMargin={8}
                tickFormatter={(value) =>
                  new Date(value).toLocaleString("en-GB", {
                    timeZone: "UTC",
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <ChartTooltip
                cursor={true}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Date
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {new Date(payload[0].payload.t).toLocaleString(
                                "en-GB"
                              )}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Price
                            </span>
                            <span className="font-bold">
                              ${payload[0].payload.c}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <YAxis type="number" domain={[min, max]} />

              <Area dataKey="c" type="natural" fillOpacity={0.2} />
            </AreaChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {percentage > 0 ? (
                <>
                  Trending up by {percentage}% &nbsp;
                  <TrendingUp className="h-4 w-4 stroke-green-500 stroke-2" />
                </>
              ) : (
                <>
                  Trending down by {percentage}% &nbsp;
                  <TrendingDown className="h-4 w-4 stroke-red-600" />
                </>
              )}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
