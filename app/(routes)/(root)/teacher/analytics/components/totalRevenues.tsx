"use client";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import axios from "axios";

type TotalRevenuesProps = {
  month: string;
  revenue: number;
};


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#f4dfe2",
  },
} satisfies ChartConfig;

export function TotalRevenues() {
    const [data, setData] = useState<TotalRevenuesProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/analytics/revenuebymonch");
                setData(response.data);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total de los pagos</CardTitle>
        <CardDescription>Total de los pagos de los últimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
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
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="revenue"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
