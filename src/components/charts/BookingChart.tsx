"use client";

import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Card, CardContent } from "../ui/card";

const data = [
  { name: "مكتملة", value: 300, color: "#4CAF50" }, // أخضر
  { name: "قيد الانتظار", value: 50, color: "#FBC02D" }, // أصفر
  { name: "ملغاة", value: 2, color: "#F44336" }, // أحمر
];

const TOTAL = 350;
const EMPTY_COLOR = "#F2F4F7"; // اللون الرمادي للأجزاء الفارغة

export default function BookingChart() {
  return (
    <Card>
      <CardContent>

    <div className="flex flex-col items-center text-center rtl">
      <PieChart width={250} height={250}>
        {data.map((entry, index) => {
          const startAngle = 90;
          const filledAngle = (entry.value / TOTAL) * 360;
          const endAngle = startAngle + filledAngle;

          return (
            <React.Fragment key={index}>
              {/* الجزء الملون */}
              <Pie
                 key={index}
                 data={[entry]}
                 cx={125}
                 cy={125}
                 innerRadius={70 + index * 15}
                 outerRadius={85 + index * 15}
                 startAngle={90}
                 endAngle={90 + (entry.value / 350) * 360}
                 dataKey="value"
                 stroke="none"
                 cornerRadius={5} // جعل الحواف دائرية
              >
                <Cell fill={entry.color} />
              </Pie>
              {/* الجزء الفارغ */}
              <Pie
                data={[{ name: "فارغ", value: TOTAL - entry.value }]}
                cx={125}
                cy={125}
                innerRadius={70 + index * 15}
                outerRadius={85 + index * 15}
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
      <div className="text-lg font-bold mt-[-100px] absolute">350</div>
      <p className="text-gray-600">إجمالي الحجوزات</p>
      <div className="flex gap-4 mt-4 text-sm">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
            <span>{entry.value} {entry.name}</span>
          </div>
        ))}
      </div>
    </div>
      </CardContent>
    </Card>
  );
}
