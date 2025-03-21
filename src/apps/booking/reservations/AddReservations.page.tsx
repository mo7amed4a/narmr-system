import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import CustomerSelect from "@/components/selects/CustomerSelect";
import ServiceTypeSelect from "@/components/selects/ServicesTypeSelect";
import TimeSlotSelector from "@/components/Appointment/TimeSlotSelector";
import DoctorSelect from "@/components/selects/DoctorSelect";
import { Doctor } from "../doctors/doctors.page";
import BranchSelect from "@/components/selects/BranchSelect";
import ServiceSelect from "@/components/selects/ServiceSelect";

export default function AddReservationsPage() {
  const [doctor, setDoctor] = useState<Doctor|null>(null)

  const [formData, setFormData] = useState({
    customer_id: 0,
    branch_id: 0,
    service_id: 0,
    reservation_day: "",
    reservation_time: "",
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

  const timeSlots = doctor?.available_schedule
    ? Array.from(new Set(doctor?.available_schedule.map((s: any) => convertTo24Hour(s.from))))
    : [];

  const weekDays = [
    { name: "السبت", date: "4 يناير", enName: "Saturday" },
    { name: "الأحد", date: "5 يناير", enName: "Sunday" },
    { name: "الإثنين", date: "6 يناير", enName: "Monday" },
    { name: "الثلاثاء", date: "7 يناير", enName: "Tuesday" },
    { name: "الأربعاء", date: "8 يناير", enName: "Wednesday" },
    { name: "الخميس", date: "9 يناير", enName: "Thursday" },
    { name: "الجمعة", date: "10 يناير", enName: "Friday" },
  ];

  const reservedSlots = [
    { day: "jndnnj", time: "08:00" },
  ];

  const handleSlotSelect = (day: string, time: string) => {
    setFormData({
      ...formData,
      reservation_day: day,
      reservation_time: time,
    });
  };

  const handleSubmit = async () => {
    if (!formData.customer_id || !formData.reservation_day || !formData.reservation_time) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setIsSubmitting(true);
    try {
      const formattedTime = formatTimeTo12Hour(formData.reservation_time);
      const payload = {
        customer_id: formData.customer_id,
        branch_id: formData?.branch_id,
        doctor_id: doctor?.id,
        service_id: formData.service_id,
        reservation_day: formData.reservation_day,
        reservation_time: formattedTime,
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
                  setDoctor(value)
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
          weekDays={weekDays}
          timeSlots={timeSlots}
          reservedSlots={reservedSlots}
          availableSchedule={doctor?.available_schedule || []}
          selectedDay={formData.reservation_day}
          selectedTime={formData.reservation_time}
          onSlotSelect={handleSlotSelect}
        />
      </CardContent>
    </Card>
  );
}