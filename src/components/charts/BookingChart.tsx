import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Card, CardContent } from "../ui/card";
import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/lib/axios";
import toast from "react-hot-toast";

const EMPTY_COLOR = "#F2F4F7"; // Gray for empty parts

// Options for the select dropdown
const timeOptions = [
  { value: "day", label: "يوم" },
  { value: "month", label: "شهر" },
  { value: "year", label: "سنة" },
];

// Mapping API response to chart data with colors (4 statuses)
const mapApiToChartData = (apiData:any) => [
  { name: "مكتملة", value: apiData.completed, color: "#4CAF50" }, // Green
  { name: "قيد الانتظار", value: apiData.pending, color: "#FBC02D" }, // Yellow
  { name: "ملغاة", value: apiData.canceled, color: "#F44336" }, // Red
  { name: "مؤكدة", value: apiData.confirmed, color: "#2196F3" }, // Blue for confirmed
];

export default function BookingChart() {
  const [selectedType, setSelectedType] = useState("day"); // Default to "day"
  const [chartData, setChartData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch data based on selected type
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/reservations/status-summary?type=${selectedType}`
        );
        const apiData = response.data.data;
        const mappedData = mapApiToChartData(apiData);
        setChartData(mappedData);
        const totalReservations:any = Object.values(apiData).reduce(
          (sum:any, val:any) => sum + val,
          0
        );
        setTotal(totalReservations || 350); // Fallback to 350 if total is 0
      } catch (error) {
        console.error("Error fetching reservation data:", error);
        toast.error("حدث خطأ أثناء جلب بيانات الحجوزات");
        setChartData([
          { name: "مكتملة", value: 0, color: "#4CAF50" },
          { name: "قيد الانتظار", value: 0, color: "#FBC02D" },
          { name: "ملغاة", value: 0, color: "#F44336" },
          { name: "مؤكدة", value: 0, color: "#2196F3" },
        ]);
        setTotal(350);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedType]);

  if (loading) return <div>جاري التحميل...</div>;

  return (
    <Card className="border">
      <CardContent>
        <div className="flex flex-col items-center text-center rtl relative">
          {/* Dropdown for selecting time period */}
          <div className="mb-4 w-40 ms-auto">
            <Select
              value={selectedType}
              onValueChange={(value) => setSelectedType(value)}
            >
              <SelectTrigger className="h-10">
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
          </div>

          {/* Pie Chart */}
          <div className="text-lg font-bold relative text-center flex justify-center items-center">
            <PieChart
              width={250}
              height={250}
              className="!size-full absolute inset-0 z-10"
            >
              {chartData.map((entry:any, index) => {
                const startAngle = 90;
                const filledAngle = (entry.value / total) * 360;
                const endAngle = startAngle + filledAngle;

                return (
                  <React.Fragment key={index}>
                    {/* Colored segment */}
                    <Pie
                      data={[entry]}
                      cx={125}
                      cy={125}
                      innerRadius={55 + index * 15} // Adjusted to fit 4 rings
                      outerRadius={70 + index * 15}
                      startAngle={startAngle}
                      endAngle={endAngle}
                      dataKey="value"
                      stroke="none"
                      cornerRadius={5}
                    >
                      <Cell fill={entry.color} />
                    </Pie>
                    {/* Empty segment */}
                    <Pie
                      data={[{ name: "فارغ", value: total - entry.value }]}
                      cx={125}
                      cy={125}
                      innerRadius={55 + index * 15}
                      outerRadius={70 + index * 15}
                      startAngle={endAngle}
                      endAngle={startAngle + 360}
                      dataKey="value"
                      stroke="none"
                    >
                      <Cell fill={EMPTY_COLOR} />
                    </Pie>
                  </React.Fragment>
                );
              })}
            </PieChart>
            <span className="flex items-center size-full absolute top-1/2 -translate-y-1/2 justify-center">
              {total}
            </span>
          </div>

          <p className="text-gray-600">إجمالي الحجوزات</p>

          {/* Legend */}
          <div className="flex gap-4 mt-4 text-sm">
            {chartData.map((entry:any, index) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></span>
                <span>
                  {entry.value} {entry.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}