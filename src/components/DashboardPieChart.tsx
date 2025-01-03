"use client";

import { Pie, PieChart, Tooltip } from "recharts";
import { TooltipProps } from 'recharts';
import {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { TAccountHolders } from "./columns/topAccountHoldersColumn";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];


const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{label}</p>
        {payload.map((entry:any, index) => (
          <p key={index} className="intro">
             <span className="value">{((parseFloat(entry.value))/Math.pow( 10, 18)).toFixed(6)}</span>
          </p>
        ))}
      </div>
    );
  }

  return null;

};



export function DashboardChart({
  chartData,
  chartConfig,
}: {
  chartData: TAccountHolders[];
  chartConfig: ChartConfig;
}) {

  
  return (
    <Card className="flex flex-col ">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top Coin Holders</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px] w-full"
        >
          <PieChart>
            <Pie
              data={chartData.map((i, index) => ({
                ...i,
                fill: `hsl(var(--chart-${index}))`,
              }))}
              dataKey="balance"
            />
            <Tooltip content={<CustomTooltip />}/>
            <ChartLegend
              content={<ChartLegendContent nameKey="address" />}
              className="-translate-y-2 flex-wrap  "
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
