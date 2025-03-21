// TimeSlotSelector.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

interface TimeSlotSelectorProps {
  weekDays: { name: string; date: string; enName: string }[];
  timeSlots: any[];
  reservedSlots: { day: string; time: string }[];
  availableSchedule: { day: string; from: string; to: string }[];
  selectedDay: string;
  selectedTime: string;
  onSlotSelect: (day: string, time: string) => void;
}

const dayMap: { [key: string]: string } = {
  Monday: "الإثنين",
  Tuesday: "الثلاثاء",
  Wednesday: "الأربعاء",
  Thursday: "الخميس",
  Friday: "الجمعة",
  Saturday: "السبت",
  Sunday: "الأحد",
};

const convertTo24Hour = (time: string) => {
  const [hourMinute, period] = time.split(" ");
  let [hour, minute] = hourMinute.split(":");
  let hourNum = parseInt(hour);
  if (period === "PM" && hourNum !== 12) hourNum += 12;
  if (period === "AM" && hourNum === 12) hourNum = 0;
  return `${hourNum.toString().padStart(2, "0")}:${minute}`;
};

export default function TimeSlotSelector({
  weekDays,
  timeSlots,
  reservedSlots,
  availableSchedule,
  selectedDay,
  selectedTime,
  onSlotSelect,
}: TimeSlotSelectorProps) {
  const handleSlotClick = (day: string, time: string) => {
    if (!reservedSlots.some((slot) => slot.day === day && slot.time === time)) {
      const selectedDayEn = weekDays.find((d) => d.name === day)?.enName || "";
      onSlotSelect(selectedDayEn, time);
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="md:text-lg font-semibold">الوقت والتاريخ</h3>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 gap-px bg-gray-200">
            <div className="bg-gray-50 p-2 text-xs md:text-base text-center font-medium">الوقت</div>
            {weekDays.map((day) => (
              <div key={day.name} className="space-y-1 bg-gray-50 md:p-2 text-center">
                <div className="text-xs md:text-base font-medium py-2">{day.name}</div>
                {/* <div className="text-sm text-gray-500">{day.date}</div> */}
              </div>
            ))}
            {timeSlots.map((time) => (
              <React.Fragment key={time}>
                <div className="border-t text-xs md:text-base bg-white p-2 text-center">{time}</div>
                {weekDays.map((day) => {
                  const isReserved = reservedSlots.some(
                    (slot) => slot.day === day.name && slot.time === time
                  );
                  const isAvailable = availableSchedule.some(
                    (s) =>
                      dayMap[s.day] === day.name &&
                      convertTo24Hour(s.from) <= time &&
                      convertTo24Hour(s.to) >= time
                  );
                  const isSelected = selectedDay === day.enName && selectedTime === time;

                  return (
                    <div
                      key={`${day.name}-${time}`}
                      className={cn(
                        "border-t bg-white p-2 text-center cursor-pointer",
                        isReserved && "bg-orange-50 cursor-not-allowed",
                        !isAvailable && !isReserved && "bg-gray-100 cursor-not-allowed",
                        isSelected && "bg-green-100"
                      )}
                      onClick={() => isAvailable && !isReserved && handleSlotClick(day.name, time)}
                    >
                      {isReserved && (
                        <span className="inline-flex items-center rounded-full bg-orange-100 px-2 md:py-1 text-xs text-orange-700">
                          محجوز
                        </span>
                      )}
                      {isSelected && (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2 md:py-1 text-xs text-green-700">
                          محدد
                        </span>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}