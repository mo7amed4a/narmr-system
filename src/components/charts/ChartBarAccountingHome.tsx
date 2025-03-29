import * as React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/lib/axios";
import toast from "react-hot-toast";

// Time period options
const timeOptions = [
  { value: "day", label: "يوم" },
  { value: "month", label: "شهر" },
  { value: "year", label: "سنة" },
];

// Threshold-based color logic
const getLevelColor = (value: number) => {
  if (value < 10000) {
    return "#E87171"; // Red for low
  } else if (value < 20000) {
    return "#DFC875"; // Yellow for medium
  } else {
    return "#5EB18E"; // Green for high
  }
};

export default function ChartBarAccountingHome() {
  const [selectedType, setSelectedType] = React.useState("month"); // Default to "month"
  const [chartData, setChartData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Fetch data based on selected type
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/financial-flow/summary?type=${selectedType}`);
        const apiData = response.data.data;
        // Map API data to chart format
        const mappedData = apiData.map((item:any) => ({
          month: item.label, // e.g., "January"
          value: item.number, // e.g., 118169.0
        }));
        setChartData(mappedData);
      } catch (error) {
        console.error("Error fetching financial flow data:", error);
        toast.error("حدث خطأ أثناء جلب بيانات التدفق المالي");
        setChartData([]); // Empty chart on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedType]);
  if (loading) return <div>جاري التحميل...</div>;

  return (
    <Card className="w-full border" dir="rtl">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between">
        <CardTitle className="text-2xl">إحصائيات التدفق المالي</CardTitle>
        <div className="flex items-center flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#5EB18E]" />
            <span className="text-sm">عالي</span>
            <span className="h-3 w-3 rounded-full bg-[#DFC875]" />
            <span className="text-sm">متوسط</span>
            <span className="h-3 w-3 rounded-full bg-[#E87171]" />
            <span className="text-sm">منخفض</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-24">
                {timeOptions.find((opt) => opt.value === selectedType)?.label || selectedType}
                <ChevronDown className="mr-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {timeOptions.map((option) => (
                <DropdownMenuItem key={option.value} onClick={() => setSelectedType(option.value)}>
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <Bar
                dataKey="value"
                radius={[4, 4, 0, 0]}
                barSize={10}
                shape={(props:any) => {
                  const { x, y, width, height, payload } = props;
                  return (
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      fill={getLevelColor(payload.value)}
                      rx="4"
                      ry="4"
                    />
                  );
                }}
              />
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                width={40} // Adjusted for larger values
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}