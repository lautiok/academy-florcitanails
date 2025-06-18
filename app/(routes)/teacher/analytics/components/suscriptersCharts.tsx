"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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
export const description = "A bar chart";

type SuscriptersChartsProps = {
  month: string;
  users: number;
};

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#f4dfe2",
  },
} satisfies ChartConfig;

export const SuscriptersCharts = () => {
  const [data, setData] = useState<SuscriptersChartsProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/analytics/totalsuscriptors");
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
        <CardTitle>Ultimos Suscriptores</CardTitle>
        <CardDescription>Suscriptores de los últimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-60 animate-pulse space-y-4 p-4">
            <div className="h-6 w-1/3 bg-gray-300 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
            <div className="h-40 bg-gray-100 rounded" />
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="users" fill="var(--color-desktop)" radius={8} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};
