import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useParams } from "react-router-dom";
import useFetch from "@/hooks/use-fetch";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import CustomerSelect from "@/components/selects/CustomerSelect";
import ServiceTypeSelect from "@/components/selects/ServicesTypeSelect";
import { Input } from "@/components/ui/input";

export default function AddAppointmentFormPage() {
  const { id } = useParams();
  const { data: doctorData, loading: doctorLoading, error: doctorError } = useFetch(`/doctor/${id}`);

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [formData, setFormData] = useState({
    customer_id: "",
    branch_id: 0,
    doctor_id: parseInt(id || "0"),
    service_id: 4,
    reservation_day: "",
    reservation_time: "",
    reservation_date: "", // الحقل الجديد
    reservation_type: "new",
    service_type: "consultation",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const formatTimeTo12Hour = (time: string): string => {
    const [hour, minute] = time.split(":");
    const hourNum = parseInt(hour);
    const period = hourNum >= 12 ? "PM" : "AM";
    const formattedHour = hourNum % 12 || 12;
    return `${formattedHour.toString().padStart(2, "0")}:${minute} ${period}`;
  };

  const getWeekDays = (dateStr: string) => {
    if (!dateStr) return [];
    const selected = new Date(dateStr);
    const saturday = new Date(selected);
    saturday.setDate(selected.getDate() - ((selected.getDay() + 1) % 7));

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(saturday);
      day.setDate(saturday.getDate() + i);
      weekDays.push({
        name: dayMap[day.toLocaleString("en-US", { weekday: "long" })],
        date: day.toLocaleString("ar-EG", { day: "numeric", month: "long" }),
        enName: day.toLocaleString("en-US", { weekday: "long" }),
        fullDate: day.toISOString().split("T")[0], // التاريخ بصيغة YYYY-MM-DD
      });
    }
    return weekDays;
  };

  const weekDays = getWeekDays(selectedDate);

  const timeSlots = doctorData?.data?.available_schedule
    ? Array.from(new Set(doctorData.data.available_schedule.map((s: any) => convertTo24Hour(s.from))))
    : [];

  const reservedSlots = [
    { day: "السبت", time: "08:00" },
    { day: "السبت", time: "13:00" },
    { day: "الأحد", time: "09:00" },
    { day: "الثلاثاء", time: "09:00" },
  ];

  const handleSlotClick = (day: string, time: string) => {
    if (!reservedSlots.some((slot) => slot.day === day && slot.time === time)) {
      const selectedDay = weekDays.find((d) => d.name === day);
      const reservationDate = selectedDay
        ? `${selectedDay.fullDate} ${time}:00`
        : "";
      setFormData({
        ...formData,
        reservation_day: selectedDay?.enName || "",
        reservation_time: time,
        reservation_date: reservationDate, // YYYY-MM-DD HH:MM:SS
      });
    }
  };

  const handleSubmit = async () => {
    if (!formData.customer_id || !formData.reservation_day || !formData.reservation_time || !formData.reservation_date) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setIsSubmitting(true);
    try {
      const formattedTime = formatTimeTo12Hour(formData.reservation_time);
      const payload = {
        customer_id: parseInt(formData.customer_id),
        branch_id: doctorData.data.branch_ids[0],
        doctor_id: formData.doctor_id,
        service_id: formData.service_id,
        reservation_day: formData.reservation_day,
        reservation_time: formattedTime,
        reservation_date: formData.reservation_date, // YYYY-MM-DD HH:MM:SS
        reservation_type: formData.reservation_type,
        service_type: formData.service_type,
      };
      await api.post("/reservation/add", payload);
      toast.success("تم إضافة الحجز بنجاح");
      setFormData({
        customer_id: "",
        branch_id: 0,
        doctor_id: parseInt(id || "0"),
        service_id: 4,
        reservation_day: "",
        reservation_time: "",
        reservation_date: "",
        reservation_type: "new",
        service_type: "consultation",
      });
      setSelectedDate("");
    } catch (error) {
      console.error("Error adding reservation:", error);
      toast.error("حدث خطأ أثناء إضافة الحجز");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (doctorLoading) return <div>جاري التحميل...</div>;
  if (doctorError) return <div>خطأ: {doctorError.message}</div>;

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
        <h2 className="text-xl font-bold">حجز جديد - {doctorData?.data?.name}</h2>
        <div className="gap-x-2 flex">
          <Button variant="green" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "جاري الحفظ..." : "حفظ"}
          </Button>
          <Button variant="ghost" className="text-primary">
            إلغاء
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold">بيانات الحجز</h3>
          <div className="grid gap-6 lg:grid-cols-4">
            <CustomerSelect
              value={formData.customer_id}
              onValueChange={(value) => setFormData({ ...formData, customer_id: value })}
            />
            <div className="space-y-2">
              <Label>اختر تاريخ</Label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mb-8 space-y-6">
          <div className="gap-4 flex items-center">
            <Label>نوع الحجز</Label>
            <RadioGroup
              value={formData.reservation_type}
              onValueChange={(value) => setFormData({ ...formData, reservation_type: value })}
              className="flex gap-4"
            >
              <div className="flex items-center gap-x-2">
                <RadioGroupItem value="new" id="new" />
                <Label htmlFor="new">حجز جديد</Label>
              </div>
              <div className="flex items-center gap-x-2">
                <RadioGroupItem value="followup" id="followup" />
                <Label htmlFor="followup">متابعة</Label>
              </div>
            </RadioGroup>
          </div>

          <ServiceTypeSelect
            value={formData.service_type}
            onValueChange={(value) => setFormData({ ...formData, service_type: value })}
          />
        </div>

        {selectedDate && weekDays.length > 0 && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">الوقت والتاريخ</h3>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-8 gap-px bg-gray-200">
                  <div className="bg-gray-50 p-2 text-center font-medium">الوقت</div>
                  {weekDays.map((day) => (
                    <div key={day.name} className="space-y-1 bg-gray-50 p-2 text-center">
                      <div className="font-medium">{day.name}</div>
                      <div className="text-sm text-gray-500">{day.date}</div>
                    </div>
                  ))}
                  {timeSlots.map((time: any) => (
                    <React.Fragment key={time}>
                      <div className="border-t bg-white p-2 text-center">{time}</div>
                      {weekDays.map((day) => {
                        const isReserved = reservedSlots.some(
                          (slot) => slot.day === day.name && slot.time === time
                        );
                        const isAvailable = doctorData?.data?.available_schedule.some(
                          (s: any) =>
                            dayMap[s.day] === day.name &&
                            convertTo24Hour(s.from) <= time &&
                            convertTo24Hour(s.to) >= time
                        );
                        const isSelected =
                          formData.reservation_day === day.enName && formData.reservation_time === time;

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
                              <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-1 text-xs text-orange-700">
                                محجوز
                              </span>
                            )}
                            {isSelected && (
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
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
        )}
      </CardContent>
    </Card>
  );
} 