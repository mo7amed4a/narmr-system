import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useParams } from "react-router-dom";
import useFetch from "@/hooks/use-fetch";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import CustomerSelect from "@/components/selects/CustomerSelect";
import ServiceTypeSelect from "@/components/selects/ServicesTypeSelect";
import TimeSlotSelector, { days } from "@/components/Appointment/TimeSlotSelector";
import ServiceSelect from "@/components/selects/ServiceSelect";

export default function AddAppointmentFormPage() {
  const { id } = useParams();
  const { data: doctorData, loading: doctorLoading, error: doctorError } = useFetch(`/doctor/${id}`);

  const [formData, setFormData] = useState({
    customer_id: 0,
    branch_id: 0,
    doctor_id: parseInt(id || "0"),
    service_id: 0,
    reservation_date: "", // استبدلنا reservation_day و reservation_time
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
    const dayName = reservationDate.toLocaleString("en-US", { weekday: "long" });
    return { day: dayName, time: timePart.slice(0, 5) };
  };

  const { day: selectedDay, time: selectedTime } = parseReservationDate(formData.reservation_date);

  const timeSlots = doctorData?.data?.available_schedule
    ? Array.from(new Set(doctorData.data.available_schedule.map((s: any) => convertTo24Hour(s.from))))
    : [];

  const reservedSlots = [
    { day: "السبت", time: "08:00" }, // إصلاح jndnnj
  ];

  const handleSlotSelect = (fullDate: string) => {
    setFormData({
      ...formData,
      reservation_date: fullDate, // استخدام التاريخ الكامل
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.customer_id ||
      !formData.reservation_date ||
      !formData.service_id ||
      !formData.doctor_id
    ) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setIsSubmitting(true);
    try {
      const [datePart, timePart] = formData.reservation_date.split(" ");
      const formattedTime = formatTimeTo12Hour(timePart);
      const payload = {
        customer_id: formData.customer_id,
        branch_id: doctorData.data.branch_ids[0],
        doctor_id: formData.doctor_id,
        service_id: formData.service_id,
        reservation_day: days[new Date(datePart).getDay()], // YYYY-MM-DD
        reservation_date: datePart, // YYYY-MM-DD
        reservation_time: formattedTime,
        reservation_type: formData.reservation_type,
        service_type: formData.service_type,
      };
      await api.post("/reservation/add", payload);
      toast.success("تم إضافة الحجز بنجاح");
      setFormData({
        customer_id: 0,
        branch_id: 0,
        doctor_id: parseInt(id || "0"),
        service_id: 0,
        reservation_date: "",
        reservation_type: "new",
        service_type: "consultation",
      });
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
        <h2 className="text-lg md:text-xl font-bold">حجز جديد - {doctorData?.data?.name}</h2>
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
              value={formData.customer_id.toString()}
              onValueChange={(value) => setFormData({ ...formData, customer_id: parseInt(value) })}
            />
            <ServiceSelect
              value={formData.service_id.toString()}
              onValueChange={(value) => setFormData({ ...formData, service_id: parseInt(value) })}
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
          availableSchedule={doctorData?.data?.available_schedule || []}
          selectedDay={selectedDay}
          selectedTime={selectedTime}
          onSlotSelect={handleSlotSelect}
        />
      </CardContent>
    </Card>
  );
}