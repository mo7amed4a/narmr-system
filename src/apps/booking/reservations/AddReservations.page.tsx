import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import CustomerSelect from "@/components/selects/CustomerSelect";
import ServiceTypeSelect from "@/components/selects/ServicesTypeSelect";
import TimeSlotSelector, { days, getKeyByValue } from "@/components/Appointment/TimeSlotSelector";
import DoctorSelect from "@/components/selects/DoctorSelect";
import BranchSelect from "@/components/selects/BranchSelect";
import ServiceSelect from "@/components/selects/ServiceSelect";
import { Doctor } from "../doctors/doctors.page";

export default function AddReservationsPage() {
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  const [formData, setFormData] = useState({
    customer_id: 0,
    branch_id: 0,
    service_id: 0,
    reservation_day: "",
    reservation_time: "",
    reservation_date: "", // "YYYY-MM-DD HH:mm"
    reservation_type: "new",
    service_type: "consultation",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const convertTo24Hour = (time: string) => {
    const [hourMinute, period] = time.split(" ");
    let [hour, minute] = hourMinute.split(":");
    let hourNum = parseInt(hour);
    if (period === "PM" && hourNum !== 12) hourNum += 12;
    if (period === "AM" && hourNum === 12) hourNum = 0;
    return `${hourNum.toString().padStart(2, "0")}:${minute}`;
  };

  const formatTimeTo12Hour = (time: string): string => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    const hourNum = parseInt(hour);
    const period = hourNum >= 12 ? "PM" : "AM";
    const formattedHour = hourNum % 12 || 12;
    return `${formattedHour.toString().padStart(2, "0")}:${minute} ${period}`;
  };

  const parseReservationDate = (date: string) => {
    if (!date) return { day: "", time: "" };
    const [datePart, timePart] = date.split(" ");
    const reservationDate = new Date(datePart);
    const dayName = days[reservationDate.getDay()]; // Arabic day name
    return { day: dayName, time: timePart || "" }; // HH:mm
  };

  const generateTimeSlots = (schedule: { day: string; from: string; to: string }[]) => {
    const slots: string[] = [];
    schedule.forEach((s) => {
      const start = convertTo24Hour(s.from);
      const end = convertTo24Hour(s.to);
      const [startHour, startMinute] = start.split(":").map(Number);
      const [endHour, endMinute] = end.split(":").map(Number);
      let currentHour = startHour;
      let currentMinute = startMinute;

      while (
        currentHour < endHour ||
        (currentHour === endHour && currentMinute <= endMinute)
      ) {
        slots.push(
          `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`
        );
        currentMinute += 30; // 30-minute intervals
        if (currentMinute >= 60) {
          currentMinute -= 60;
          currentHour += 1;
        }
      }
    });
    return Array.from(new Set(slots)).sort();
  };

  const { day: selectedDay, time: selectedTime } = parseReservationDate(formData.reservation_date);

  const timeSlots = doctor?.available_schedule
    ? generateTimeSlots(doctor.available_schedule)
    : [];

  const reservedSlots = [
    { day: "njnrjn", time: "08:00" },
  ];

  const handleSlotSelect = (fullDate: string) => {
    const time = fullDate.split(" ")[1];
    setFormData({
      ...formData,
      reservation_day: getKeyByValue(days[new Date(fullDate.split(" ")[0]).getDay()]) as string,
      reservation_time: formatTimeTo12Hour(time),
      reservation_date: fullDate, // "YYYY-MM-DD HH:mm"
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.customer_id ||
      !formData.branch_id ||
      !formData.reservation_date ||
      !doctor?.id ||
      !formData.service_id
    ) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }
    setIsSubmitting(true);
    try {
      const [datePart, timePart] = formData.reservation_date.split(" ");
      if (!timePart) throw new Error("Invalid reservation_date format");
      const payload = {
        customer_id: formData.customer_id,
        branch_id: formData.branch_id,
        doctor_id: doctor.id,
        service_id: formData.service_id,
        reservation_day: formData.reservation_day,
        reservation_time: formData.reservation_time,
        reservation_date: datePart, // YYYY-MM-DD
        reservation_type: formData.reservation_type,
        service_type: formData.service_type,
      };
      await api.post("/reservation/add", payload);
      toast.success("تم إضافة الحجز بنجاح");
      setFormData({
        customer_id: 0,
        branch_id: 0,
        service_id: 0,
        reservation_day: "",
        reservation_time: "",
        reservation_date: "",
        reservation_type: "new",
        service_type: "consultation",
      });
      setDoctor(null);
    } catch (error) {
      console.error("Error adding reservation:", error);
      toast.error("حدث خطأ أثناء إضافة الحجز");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
        <h2 className="text-lg md:text-xl font-bold">حجز جديد</h2>
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
          <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4">
            <CustomerSelect
              value={formData.customer_id.toString()}
              onValueChange={(value) => setFormData({ ...formData, customer_id: parseInt(value) })}
            />
            <BranchSelect
              value={formData.branch_id.toString()}
              onValueChange={(value) => setFormData({ ...formData, branch_id: parseInt(value) })}
            />
            <ServiceSelect
              value={formData.service_id.toString()}
              onValueChange={(value) => setFormData({ ...formData, service_id: parseInt(value) })}
            />
            <DoctorSelect
              value={doctor?.id?.toString() || ""}
              allData
              onValueChange={(value) => {
                if (typeof value === "object") {
                  setDoctor(value);
                }
              }}
            />
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
                <RadioGroupItem value="follow_up" id="follow_up" />
                <Label htmlFor="follow_up">متابعة</Label>
              </div>
            </RadioGroup>
          </div>

          <ServiceTypeSelect
            value={formData.service_type}
            onValueChange={(value) => setFormData({ ...formData, service_type: value })}
          />
        </div>

        <TimeSlotSelector
          timeSlots={timeSlots}
          reservedSlots={reservedSlots}
          availableSchedule={doctor?.available_schedule || []}
          selectedDay={selectedDay}
          selectedTime={selectedTime}
          onSlotSelect={handleSlotSelect}
        />
      </CardContent>
    </Card>
  );
}