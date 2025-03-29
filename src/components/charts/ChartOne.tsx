import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/lib/axios";
import toast from "react-hot-toast";

// Time period options
const timeOptions = [
  { value: "day", label: "يوم" },
  { value: "month", label: "شهر" },
  { value: "year", label: "سنة" },
];

// Chart configuration (single line)
const chartConfig = {
  number: {
    label: "عدد الحجوزات",
    color: "hsl(var(--chart-1))", // Blue by default
  },
} satisfies ChartConfig;

export function ChartOne() {
  const [selectedType, setSelectedType] = React.useState("month"); // Default to "month"
  const [chartData, setChartData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Fetch data based on selected type
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/reservations/completed-summary?type=${selectedType}`);
        const apiData = response.data.data;
        // Map API data to chart format
        const mappedData = apiData.map((item: any) => ({
          date: item.label, // e.g., "January"
          number: item.number, // e.g., 5
        }));
        setChartData(mappedData);
      } catch (error) {
        console.error("Error fetching completed reservations:", error);
        toast.error("حدث خطأ أثناء جلب بيانات الحجوزات");
        setChartData([]); // Empty chart on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedType]);

  if (loading) return <div>جاري التحميل...</div>;

  return (
    <Card className="w-full border">
      <CardHeader className="flex flex-col items-stretch space-y-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <CardTitle className="font-bold">إحصائيات الحجوزات المكتملة</CardTitle>
        </div>
        <Select
          value={selectedType}
          onValueChange={(value) => setSelectedType(value)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="اختر الفترة" />
          </SelectTrigger>
          <SelectContent>
            {timeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
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
                // Adjust formatting based on type
                if (selectedType === "month") {
                  return value; // Display month name as-is (e.g., "January")
                } else if (selectedType === "day") {
                  return value; // Assume API returns day labels (e.g., "1", "2")
                } else if (selectedType === "year") {
                  return value; // Assume API returns year labels (e.g., "2023")
                }
                return value;
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="number"
                  labelFormatter={(value) => value} // Display label as-is
                />
              }
            />
            <Line
              dataKey="number"
              type="monotone"
              stroke={chartConfig.number.color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}